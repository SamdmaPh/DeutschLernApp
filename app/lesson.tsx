import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, StatusBar, Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ALL_STATIC_LESSONS } from "../data/lessonData";
import { SITUATION_IMAGES } from "../data/images";
import { Progress } from "../services/progress";
import { AI, ChatMessage } from "../services/ai";
import { TTS } from "../services/tts";
import { ElevenLabs, CHARACTER_VOICES, VOICES } from "../services/elevenlabs";
import { SRS } from "../services/srs";
import { C, SAFE_TOP, SERIF } from "../theme";

// Cross-platform audio player (not used anymore — ElevenLabs handles playback)

// ═══ XP TRACKER ═══
function XPPopup({ amount }: { amount: number }) {
  if (!amount) return null;
  return (
    <View style={s.xpPopup}>
      <Text style={s.xpPopupText}>+{amount} XP</Text>
    </View>
  );
}

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [lastXP, setLastXP] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [matched, setMatched] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [wordOrder, setWordOrder] = useState<string[]>([]);
  const [wordOrderChecked, setWordOrderChecked] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [selfRating, setSelfRating] = useState(0);
  const [matchSelected, setMatchSelected] = useState<number | null>(null);
  const [matchPairs, setMatchPairs] = useState<Record<number, number>>({});
  const [showNav, setShowNav] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [tappedWord, setTappedWord] = useState<{ word: string; meaning: string } | null>(null);
  const [writeAnswers, setWriteAnswers] = useState<Record<number, string>>({});
  const [writeChecked, setWriteChecked] = useState<Record<number, boolean>>({});
  const [pronIdx, setPronIdx] = useState(0);
  const [pronPlaying, setPronPlaying] = useState(false);
  const [pronDone, setPronDone] = useState<number[]>([]);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [compIdx, setCompIdx] = useState(0);
  const [woIdx, setWoIdx] = useState(0);
  const [woWords, setWoWords] = useState<string[]>([]);
  const [woChecked, setWoChecked] = useState(false);
  const [dialogStep, setDialogStep] = useState(0);
  const [dialogHistory, setDialogHistory] = useState<{speaker: string; text: string}[]>([]);
  const [dialogAnswered, setDialogAnswered] = useState(false);
  const [pronUserInput, setPronUserInput] = useState("");
  const [pronChecked, setPronChecked] = useState(false);
  const [pronResult, setPronResult] = useState<"correct" | "close" | "wrong" | null>(null);
  const [pronFeedback, setPronFeedback] = useState("");
  const [pronFeedbackLoading, setPronFeedbackLoading] = useState(false);
  // Dialog state (live conversation)
  const [dlgPhase, setDlgPhase] = useState<"intro" | "npc" | "hint" | "feedback" | "done">("intro");
  const [dlgInput, setDlgInput] = useState("");
  const [dlgPlaying, setDlgPlaying] = useState(false);
  const [dlgFeedback, setDlgFeedback] = useState("");
  const [dlgFeedbackLoading, setDlgFeedbackLoading] = useState(false);
  const scrollRef = React.useRef<ScrollView>(null);

  const lesson = ALL_STATIC_LESSONS.find((l) => l.id === lessonId) as any;
  if (!lesson) {
    return (
      <View style={s.center}>
        <Text style={s.errorText}>Lesson not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.errorLink}>← Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const img = SITUATION_IMAGES[lesson.id] || "";

  // ═══ HELPER: Add XP ═══
  const addXP = (amount: number) => {
    setTotalXP(prev => prev + amount);
    setLastXP(amount);
    setTimeout(() => setLastXP(0), 1500);
  };

  // ═══ BUILD 12 CARDS ═══
  const cards: any[] = [];

  // 1. HOOK
  cards.push({ type: "hook", title: lesson.title, description: lesson.description, image: img });

  // 2. LISTEN
  if (lesson.listening?.transcript) {
    cards.push({ type: "listen", title: lesson.listening.title, transcript: lesson.listening.transcript, translation: lesson.listening.english_translation, highlights: lesson.listening.vocabulary_highlighted });
  }

  // 3. COMPREHENSION — multiple questions about the dialogue
  const compTasks = lesson.exercises?.[0]?.tasks?.filter((t: any) => t.options) || [];
  if (compTasks.length > 0) {
    cards.push({ type: "comprehensionMulti", tasks: compTasks.map((t: any) => ({ question: t.question, options: t.options, answer: t.answer ?? t.correct ?? 0 })) });
  }

  // 4. MATCH — connect words
  if (lesson.vocabulary?.core) {
    const matchWords = lesson.vocabulary.core.slice(0, 5).map((w: string) => {
      const [de, en] = w.split("::").map((s: string) => s.trim());
      return { de, en };
    });
    cards.push({ type: "match", words: matchWords });
  }

  // 5. PRONUNCIATION — Listen & Repeat with CORE VOCABULARY
  if (lesson.vocabulary?.core) {
    const pronWords = lesson.vocabulary.core.slice(0, 5).map((w: string) => {
      const [de, en] = w.split("::").map((s: string) => s.trim());
      return { de, en };
    });
    cards.push({ type: "pronunciation", words: pronWords, rules: lesson.grammar?.patterns?.slice(0, 3) });
  }

  // 6. USE IT — Apply phrases in context (fill-in-the-blank, not quiz)
  if (lesson.vocabulary?.phrases) {
    const useItTasks = lesson.vocabulary.phrases.slice(0, 4).map((p: string) => {
      const [de, en] = p.split("::").map((s: string) => s.trim());
      // Create fill-in-the-blank: remove a key word
      const words = de.split(" ");
      const blankIdx = Math.max(0, Math.floor(words.length / 2));
      const answer = words[blankIdx];
      const withBlank = words.map((w: string, i: number) => i === blankIdx ? "_____" : w).join(" ");
      return { sentence: withBlank, answer, fullSentence: de, meaning: en };
    });
    cards.push({ type: "useIt", tasks: useItTasks, situation: lesson.description });
  }

  // 7. GRAMMAR + mini quiz (use recall tasks that have options)
  if (lesson.grammar) {
    // ALL recall tasks as grammar quizzes
    const grammarQuizzes = (lesson.exercises?.[1]?.tasks || []).filter((t: any) => t.options).map((t: any) => ({
      question: t.question, options: t.options, answer: t.answer ?? t.correct ?? 0,
    }));
    cards.push({
      type: "grammar",
      concept: lesson.grammar.concept,
      rule: lesson.grammar.rule,
      patterns: lesson.grammar.patterns,
      commonMistakes: lesson.grammar.common_mistakes,
      mnemonic: lesson.grammar.mnemonic,
      quizzes: grammarQuizzes,
    });
  }

  // 8. VOCAB — words + chunks (phrases)
  if (lesson.vocabulary) {
    cards.push({
      type: "vocab",
      words: lesson.vocabulary.core?.slice(0, 6) || [],
      phrases: lesson.vocabulary.phrases?.slice(0, 3) || [],
    });
  }

  // 9. WORD ORDER — multiple sentences to build
  if (lesson.vocabulary?.phrases) {
    const allPhrases = lesson.vocabulary.phrases
      .map((p: string) => p.split("::")[0].trim())
      .filter((p: string) => p.replace(/[.,!?]/g, "").split(" ").length >= 2);
    // Take up to 4 phrases for word order exercises
    const wordOrderPhrases = allPhrases.slice(0, 4);
    if (wordOrderPhrases.length > 0) {
      cards.push({ type: "wordOrderMulti", phrases: wordOrderPhrases });
    }
  }

  // 9b. WRITING EXERCISE (production tasks)
  const writeTasks = lesson.exercises?.[2]?.tasks || [];
  if (writeTasks.length > 0) {
    cards.push({
      type: "write",
      instruction: lesson.exercises[2].instruction || "Write the German sentence.",
      tasks: writeTasks.slice(0, 3),
    });
  }

  // 10. INTERACTIVE DIALOG (natural AI conversation like live-lesson)
  const dialogSteps = lesson.listening?.transcript?.split("\n").filter(Boolean) || [];
  const translationLines = lesson.listening?.english_translation?.split("\n").filter(Boolean) || [];
  const character = dialogSteps[0]?.split(":")[0]?.trim() || "Partner";
  const liveDialogSteps: any[] = [];
  for (let i = 0; i < dialogSteps.length; i++) {
    const line = dialogSteps[i];
    const [speaker, ...rest] = line.split(":");
    const text = rest.join(":").trim();
    const transLine = translationLines[i] || "";
    const [, ...transRest] = transLine.split(":");
    const translation = transRest.join(":").trim() || transLine;
    if (speaker.trim() === "You" && text) {
      liveDialogSteps.push({ type: "user", text, translation, hint: translation || "Respond in German!" });
    } else if (text) {
      liveDialogSteps.push({ type: "npc", speaker: speaker.trim(), text, translation });
    }
  }
  if (liveDialogSteps.length > 0) {
    cards.push({ type: "dialog", character, steps: liveDialogSteps, situation: lesson.description });
  }

  // 11. SELF-RATE
  cards.push({ type: "selfrate" });

  // 12. CELEBRATION
  cards.push({ type: "finish", title: lesson.title, xp: lesson.xp_reward || 50, wordsLearned: lesson.vocabulary?.core?.length || 0 });

  const total = cards.length;
  const pct = total > 0 ? ((step + 1) / total) * 100 : 0;
  const card = cards[step];

  const goNext = () => {
    if (step < total - 1) {
      setStep(step + 1);
      setWordOrder([]);
      setWordOrderChecked(false);
      setShowNav(false);
      // Reset dialog state for fresh conversation
      setDialogStep(0);
      setDialogHistory([]);
      setDialogAnswered(false);
      setDlgPhase("intro");
      setDlgInput("");
      setDlgFeedback("");
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setShowNav(false);
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }
  };

  const goToCard = (idx: number) => {
    setStep(idx);
    setShowNav(false);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const CARD_LABELS = ["🎬", "🎧", "✅", "🔗", "🔊", "💬", "💡", "📦", "🧩", "✍️", "🎙", "⭐", "🎉"];

  // ═══ AI CHAT ═══
  const sendChat = async (msg?: string) => {
    const text = msg || chatInput.trim();
    if (!text || chatLoading) return;
    setChatInput("");
    setChatLoading(true);
    const newMsgs: ChatMessage[] = [...chatMessages, { role: "user", content: text }];
    setChatMessages(newMsgs);

    const systemPrompt = `You are ${card?.character}, a friendly character in Berlin. The student just arrived at the airport and needs a taxi. Stay in character. Speak simple German (A1 level). Use ONLY words the student knows: Guten Tag, Danke, Bitte, Willkommen, Sprechen Sie Deutsch, Ein bisschen, Ja, Nein, Zum Hostel. Keep responses to 1-2 short sentences. If the student makes a mistake, gently correct them. After 3-4 exchanges, end the conversation naturally. Always be encouraging.`;

    const res = await AI.chat(
      [{ role: "assistant", content: systemPrompt }, ...newMsgs],
      card?.topic || "", card?.level || "A1"
    );
    setChatMessages([...newMsgs, { role: "assistant", content: res.text }]);
    setChatLoading(false);
    // Read AI response aloud with character voice
    const charName = card?.character || "default";
    ElevenLabs.playCharacterLine(charName, res.text);
    if (newMsgs.filter(m => m.role === "user").length === 1) addXP(15);
    if (newMsgs.filter(m => m.role === "user").length === 3) addXP(10);
  };

  // ═══ RENDER ═══
  const renderCard = () => {
    if (!card) return null;

    switch (card.type) {

      // ── 1. HOOK ──
      case "hook":
        return (
          <View style={s.cardInner}>
            {card.image ? (
              <Image source={{ uri: card.image }} style={s.heroImage} resizeMode="cover" />
            ) : (
              <View style={s.heroPlaceholder}><Text style={{ fontSize: 48 }}>✈️🏛️🚕</Text></View>
            )}
            <Text style={s.hookChapter}>CHAPTER {lesson.order_index}</Text>
            <Text style={s.hookTitle}>{card.title}</Text>
            <View style={s.missionBox}>
              <Text style={s.missionLabel}>YOUR MISSION</Text>
              <Text style={s.missionText}>{card.description}</Text>
            </View>
          </View>
        );

      // ── 2. LISTEN (Interactive line-by-line) ──
      case "listen": {
        const dialogLines = card.transcript.split("\n").filter(Boolean).map((line: string) => {
          const [speaker, ...rest] = line.split(":");
          return { speaker: speaker.trim(), text: rest.join(":").trim() };
        }).filter((l: any) => l.text);

        const transLines = (card.translation || "").split("\n").filter(Boolean).map((line: string) => {
          const [, ...rest] = line.split(":");
          return rest.join(":").trim();
        });

        // Current line index tracked via dialogStep (reused state)
        const listenIdx = dialogStep;
        const currentLine = dialogLines[listenIdx];
        const allHeard = listenIdx >= dialogLines.length;

        const playLine = async (text: string, speaker: string) => {
          setAudioPlaying(true);
          if (speaker === "You") {
            await ElevenLabs.playText(text, VOICES.female);
          } else {
            await ElevenLabs.playCharacterLine(speaker, text);
          }
          setAudioPlaying(false);
        };

        return (
          <View style={s.cardInner}>
            <Text style={s.label}>LISTEN & FOLLOW</Text>
            <Text style={s.pronSubtitle}>Hear each line, read along, then tap "Next" when you understand.</Text>

            {/* Progress */}
            <Text style={s.sceneProgress}>Line {Math.min(listenIdx + 1, dialogLines.length)} of {dialogLines.length}</Text>

            {/* Already heard lines */}
            <View style={s.dialogBox}>
              {dialogLines.slice(0, listenIdx).map((line: any, i: number) => (
                <View key={i} style={line.speaker === "You" ? s.bubbleRight : s.bubbleLeft}>
                  <Text style={s.bubbleSpeaker}>{line.speaker}</Text>
                  <Text style={[s.bubbleText, line.speaker === "You" && { color: "#fff" }]}>{line.text}</Text>
                  <Text style={[s.bubbleTranslation, line.speaker === "You" && { color: "rgba(255,255,255,0.7)" }]}>{transLines[i] || ""}</Text>
                </View>
              ))}
            </View>

            {/* Current line — interactive */}
            {currentLine && !allHeard && (
              <View style={{ marginTop: 8 }}>
                <View style={[currentLine.speaker === "You" ? s.bubbleRight : s.bubbleLeft, { borderWidth: 2, borderColor: C.gold }]}>
                  <Text style={s.bubbleSpeaker}>{currentLine.speaker}</Text>
                  <Text style={[s.bubbleText, currentLine.speaker === "You" && { color: "#fff" }, { fontSize: 18 }]}>{currentLine.text}</Text>
                  {dialogAnswered && <Text style={[s.bubbleTranslation, currentLine.speaker === "You" && { color: "rgba(255,255,255,0.7)" }]}>{transLines[listenIdx] || ""}</Text>}
                </View>

                {/* Listen button */}
                <TouchableOpacity style={s.bigPlayBtn} onPress={() => { playLine(currentLine.text, currentLine.speaker); setDialogAnswered(true); }} disabled={audioPlaying} activeOpacity={0.7}>
                  <Text style={s.bigPlayIcon}>{audioPlaying ? "🔊" : "▶"}</Text>
                  <Text style={s.bigPlayText}>{audioPlaying ? "Playing..." : `Hear "${currentLine.text.slice(0, 20)}${currentLine.text.length > 20 ? "..." : ""}"`}</Text>
                </TouchableOpacity>

                {/* Show translation button */}
                {!dialogAnswered && (
                  <TouchableOpacity style={{ alignItems: "center", marginTop: 8 }} onPress={() => setDialogAnswered(true)}>
                    <Text style={{ fontSize: 13, color: C.gold }}>Show translation</Text>
                  </TouchableOpacity>
                )}

                {/* Next line */}
                {dialogAnswered && (
                  <TouchableOpacity style={[s.nextBtn, { marginTop: 12 }]} onPress={() => { setDialogStep(listenIdx + 1); setDialogAnswered(false); addXP(3); scrollRef.current?.scrollToEnd?.({ animated: true }); }}>
                    <Text style={s.nextBtnText}>{listenIdx < dialogLines.length - 1 ? "Next line →" : "Done listening! →"}</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* All heard */}
            {allHeard && (
              <View>
                <View style={s.pronComplete}>
                  <Text style={s.pronCompleteText}>You heard the full conversation!</Text>
                </View>
                {/* Key words */}
                {card.highlights && (
                  <View style={s.keyWordsBox}>
                    <Text style={s.keyWordsTitle}>KEY WORDS</Text>
                    {card.highlights.slice(0, 8).map((h: string, i: number) => {
                      const [de, en] = h.split("::").map((s: string) => s.trim());
                      return (
                        <View key={i} style={s.keyWordRow}>
                          <Text style={s.keyWordDe}>{de}</Text>
                          <Text style={s.keyWordEn}>{en}</Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            )}
          </View>
        );
      }

      // ── 3. COMPREHENSION ──
      // Old single comprehension (fallback)
      case "comprehension": {
        const ans = answers[step];
        const answered = ans !== undefined;
        const correct = ans === card.answer;
        return (
          <View style={s.cardInner}>
            <Text style={s.label}>DID YOU UNDERSTAND?</Text>
            <Text style={s.quizQ}>{card.question}</Text>
            {card.options.map((opt: string, i: number) => (
              <TouchableOpacity key={i} style={[s.optBtn, answered && i === card.answer && s.optCorrect, answered && ans === i && ans !== card.answer && s.optWrong]} onPress={() => { if (!answered) { setAnswers({ ...answers, [step]: i }); if (i === card.answer) addXP(5); } }} activeOpacity={answered ? 1 : 0.7}>
                <Text style={[s.optText, answered && i === card.answer && { color: C.green, fontWeight: "700" }]}>{opt}</Text>
              </TouchableOpacity>
            ))}
            {answered && <TouchableOpacity style={s.nextBtn} onPress={goNext}><Text style={s.nextBtnText}>{correct ? "Correct! ✓" : "Continue →"}</Text></TouchableOpacity>}
          </View>
        );
      }

      // Multi-comprehension (all check questions in one card)
      case "comprehensionMulti": {

        const compTask = card.tasks?.[compIdx];
        const compAns = answers[`comp-${compIdx}`];
        const compAnswered = compAns !== undefined;
        const compCorrect = compAns === compTask?.answer;
        const allCompDone = compIdx >= (card.tasks?.length || 0);

        return (
          <View style={s.cardInner}>
            <Text style={s.label}>DID YOU UNDERSTAND?</Text>

            {!allCompDone && compTask ? (
              <>
                <Text style={s.sceneProgress}>Question {compIdx + 1} of {card.tasks?.length || 0}</Text>
                <Text style={s.quizQ}>{compTask.question}</Text>
                {compTask.options.map((opt: string, i: number) => (
                  <TouchableOpacity key={i} style={[s.optBtn, compAnswered && i === compTask.answer && s.optCorrect, compAnswered && compAns === i && compAns !== compTask.answer && s.optWrong]} onPress={() => { if (!compAnswered) { setAnswers({ ...answers, [`comp-${compIdx}`]: i }); if (i === compTask.answer) addXP(5); } }} activeOpacity={compAnswered ? 1 : 0.7}>
                    <Text style={[s.optText, compAnswered && i === compTask.answer && { color: C.green, fontWeight: "700" }]}>{opt}</Text>
                    {compAnswered && i === compTask.answer && <Text style={{ color: C.green, fontWeight: "800" }}>✓</Text>}
                  </TouchableOpacity>
                ))}
                {compAnswered && (
                  <TouchableOpacity style={s.nextBtn} onPress={() => { setCompIdx(compIdx + 1); }}>
                    <Text style={s.nextBtnText}>{compCorrect ? "Correct! Next →" : "Next question →"}</Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <View style={s.pronComplete}>
                <Text style={s.pronCompleteText}>🎉 All questions answered! +{(card.tasks?.length || 0) * 5} XP</Text>
              </View>
            )}
          </View>
        );
      }

      // ── 4. MATCH (real tap-tap pairing) ──
      case "match": {
        // Shuffle English meanings (but keep them stable via step)
        const shuffledEn = [...card.words].sort((a: any, b: any) => a.en > b.en ? -1 : 1);
        const allMatched = Object.keys(matchPairs).length === card.words.length;
        return (
          <View style={s.cardInner}>
            <Text style={s.cardEmoji}>🔗</Text>
            <Text style={s.label}>MATCH THE WORDS</Text>
            <Text style={s.matchHint}>Step 1: Tap a German word. Step 2: Tap its English meaning.</Text>

            <View style={s.matchColumns}>
              {/* German column */}
              <View style={s.matchCol}>
                <Text style={s.matchColTitle}>German</Text>
                {card.words.map((w: any, i: number) => {
                  const paired = matchPairs[i] !== undefined;
                  const selected = matchSelected === i;
                  return (
                    <TouchableOpacity key={i} style={[s.matchItem, selected && s.matchItemSelected, paired && s.matchItemDone]} onPress={() => { if (!paired) setMatchSelected(i); }} activeOpacity={paired ? 1 : 0.7}>
                      <Text style={[s.matchItemText, paired && { color: C.green }]}>{w.de}</Text>
                      {paired && <Text style={{ color: C.green, fontSize: 12 }}>✓</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* English column */}
              <View style={s.matchCol}>
                <Text style={s.matchColTitle}>English</Text>
                {shuffledEn.map((w: any, j: number) => {
                  const origIdx = card.words.findIndex((orig: any) => orig.en === w.en);
                  const paired = Object.values(matchPairs).includes(origIdx);
                  return (
                    <TouchableOpacity key={j} style={[s.matchItem, paired && s.matchItemDone]} onPress={() => {
                      if (matchSelected !== null && !paired) {
                        const isCorrect = card.words[matchSelected].en === w.en;
                        if (isCorrect) {
                          setMatchPairs({ ...matchPairs, [matchSelected]: origIdx });
                          addXP(5);
                        }
                        setMatchSelected(null);
                      }
                    }} activeOpacity={paired ? 1 : 0.7}>
                      <Text style={[s.matchItemText, paired && { color: C.green }]}>{w.en}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {allMatched && <TouchableOpacity style={s.nextBtn} onPress={goNext}><Text style={s.nextBtnText}>All matched! 🎉 Continue →</Text></TouchableOpacity>}
          </View>
        );
      }

      // ── 5. PRONUNCIATION QUIZ ──
      case "pronunciation": {
        const currentWord = card.words?.[pronIdx];
        const allPronDone = pronDone.length === (card.words?.length || 0);
        const playWord = async (text: string) => {
          setPronPlaying(true);
          await ElevenLabs.playText(text);
          setPronPlaying(false);
        };

        const markDone = () => {
          if (!pronDone.includes(pronIdx)) {
            setPronDone([...pronDone, pronIdx]);
            addXP(5);
          }
          setPronChecked(false);
          setPronResult(null);
          setPronUserInput("");
          setPronFeedback("");
          if (pronIdx < (card.words?.length || 0) - 1) {
            setPronIdx(pronIdx + 1);
          }
        };

        const checkPronunciation = async (input: string) => {
          if (!currentWord) return;
          const expected = currentWord.de.toLowerCase().replace(/[!?.,"]/g, "").trim();
          const user = input.toLowerCase().replace(/[!?.,"]/g, "").trim();
          setPronChecked(true);
          setPronFeedback("");

          // Quick string check first
          if (user === expected) {
            setPronResult("correct");
            setPronFeedback("Perfekt! Your pronunciation was spot on.");
          } else if (expected.includes(user) || user.includes(expected) || levenshtein(user, expected) <= 2) {
            setPronResult("close");
            // Get AI feedback for "close" attempts
            setPronFeedbackLoading(true);
            try {
              const res = await AI.chat(
                [{ role: "user", content: `I tried to say "${currentWord.de}" (meaning: ${currentWord.en}) but the speech recognition heard "${input}". Compare these two and give me specific, short pronunciation feedback in 1-2 sentences. What sounds did I get wrong? How should I move my mouth differently? Be encouraging. Answer in English.` }],
                "pronunciation correction", "A1"
              );
              setPronFeedback(res.text);
            } catch { setPronFeedback(`Almost! The correct word is "${currentWord.de}". Try listening again.`); }
            setPronFeedbackLoading(false);
          } else {
            setPronResult("wrong");
            // Get AI feedback for wrong attempts
            setPronFeedbackLoading(true);
            try {
              const res = await AI.chat(
                [{ role: "user", content: `I tried to say "${currentWord.de}" (meaning: ${currentWord.en}) but the speech recognition heard "${input}". This was quite different from the expected word. Give me specific, short pronunciation tips in 1-2 sentences. What German sounds are tricky here? How should I pronounce it? Be encouraging. Answer in English.` }],
                "pronunciation correction", "A1"
              );
              setPronFeedback(res.text);
            } catch { setPronFeedback(`The word is "${currentWord.de}". Listen to it again and try once more!`); }
            setPronFeedbackLoading(false);
          }
        };

        function levenshtein(a: string, b: string): number {
          const m = a.length, n = b.length;
          const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0));
          for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
            dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
          return dp[m][n];
        }

        return (
          <View style={s.cardInner}>
            <Text style={s.label}>PRONUNCIATION PRACTICE</Text>
            <Text style={s.pronSubtitle}>Listen, repeat out loud, then check yourself!</Text>

            {/* Progress dots */}
            <View style={s.pronDots}>
              {card.words?.map((_: any, i: number) => (
                <View key={i} style={[s.pronDot, pronDone.includes(i) && s.pronDotDone, pronIdx === i && s.pronDotActive]} />
              ))}
            </View>

            {/* Current word */}
            {currentWord && !allPronDone && (
              <View style={s.pronCard}>
                <Text style={s.pronWord}>{currentWord.de}</Text>
                <Text style={s.pronMeaning}>{currentWord.en}</Text>

                {/* Step 1: Listen */}
                <TouchableOpacity style={s.pronListenBtn} onPress={() => playWord(currentWord.de)} disabled={pronPlaying} activeOpacity={0.7}>
                  <Text style={s.pronListenIcon}>{pronPlaying ? "⏳" : "🔊"}</Text>
                  <Text style={s.pronListenText}>{pronPlaying ? "Playing..." : "Step 1: Listen"}</Text>
                </TouchableOpacity>

                {/* Step 2: Speak or Type */}
                {!pronChecked && (
                  <View>
                    <Text style={s.pronStepHint}>Step 2: Tap the microphone and say it!</Text>

                    {/* Big mic button */}
                    <TouchableOpacity style={s.bigMicBtn} onPress={async () => {
                      setPronPlaying(true);
                      const result = await ElevenLabs.speechToText();
                      setPronPlaying(false);
                      if (result) {
                        setPronUserInput(result);
                        checkPronunciation(result);
                      }
                    }} disabled={pronPlaying} activeOpacity={0.7}>
                      <Text style={s.bigMicIcon}>{pronPlaying ? "⏳ Listening..." : "🎤"}</Text>
                      <Text style={s.bigMicText}>{pronPlaying ? "Speak now!" : "Tap to speak"}</Text>
                    </TouchableOpacity>

                    {/* Or type fallback */}
                    <Text style={{ fontSize: 12, color: C.muted, textAlign: "center", marginVertical: 8 }}>— or type it —</Text>
                    <View style={s.pronActions}>
                      <TextInput
                        style={[s.input, { flex: 1 }]}
                        value={pronUserInput}
                        onChangeText={setPronUserInput}
                        placeholder="Type what you said..."
                        placeholderTextColor={C.muted}
                        autoCapitalize="none"
                      />
                      {pronUserInput.trim().length > 0 && (
                        <TouchableOpacity style={s.sendBtn} onPress={() => checkPronunciation(pronUserInput)}>
                          <Text style={s.sendText}>✓</Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    {/* Skip */}
                    <TouchableOpacity style={{ marginTop: 10, alignItems: "center" }} onPress={markDone}>
                      <Text style={{ fontSize: 13, color: C.muted }}>Skip this word →</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Feedback */}
                {pronChecked && pronResult === "correct" && (
                  <View style={[s.rateFeedback, { marginTop: 12 }]}>
                    <Text style={s.rateFeedbackText}>✅ Perfect! +5 XP</Text>
                    {pronFeedback ? <Text style={[s.rateFeedbackText, { marginTop: 6, fontWeight: "400" }]}>{pronFeedback}</Text> : null}
                  </View>
                )}
                {pronChecked && pronResult === "close" && (
                  <View style={[s.rateAction, { marginTop: 12 }]}>
                    <Text style={s.rateActionText}>🤏 Almost! You said: "{pronUserInput}"</Text>
                    <Text style={[s.rateActionText, { marginTop: 4, fontWeight: "400" }]}>Expected: "{currentWord.de}"</Text>
                    {pronFeedbackLoading && <Text style={{ color: C.muted, marginTop: 8, fontSize: 13 }}>🤖 Analyzing your pronunciation...</Text>}
                    {pronFeedback ? <Text style={{ color: C.gold, marginTop: 8, fontSize: 14, lineHeight: 20 }}>{pronFeedback}</Text> : null}
                    <TouchableOpacity style={[s.pronListenBtn, { marginTop: 10 }]} onPress={() => playWord(currentWord.de)} disabled={pronPlaying}>
                      <Text style={s.pronListenIcon}>🔊</Text>
                      <Text style={s.pronListenText}>Listen again</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {pronChecked && pronResult === "wrong" && (
                  <View style={[s.mistakesBox, { marginTop: 12, padding: 14 }]}>
                    <Text style={{ color: C.red, fontWeight: "700" }}>You said: "{pronUserInput}"</Text>
                    <Text style={{ color: C.green, fontWeight: "700", marginTop: 4 }}>Expected: "{currentWord.de}"</Text>
                    {pronFeedbackLoading && <Text style={{ color: C.muted, marginTop: 8, fontSize: 13 }}>🤖 Analyzing your pronunciation...</Text>}
                    {pronFeedback ? <Text style={{ color: C.text, marginTop: 8, fontSize: 14, lineHeight: 20 }}>{pronFeedback}</Text> : null}
                    <TouchableOpacity style={[s.pronListenBtn, { marginTop: 10 }]} onPress={() => playWord(currentWord.de)} disabled={pronPlaying}>
                      <Text style={s.pronListenIcon}>🔊</Text>
                      <Text style={s.pronListenText}>Listen again</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Next word button after check */}
                {pronChecked && (
                  <TouchableOpacity style={[s.nextBtn, { marginTop: 12 }]} onPress={markDone}>
                    <Text style={s.nextBtnText}>{pronIdx < (card.words?.length || 0) - 1 ? "Next word →" : "Done! →"}</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Pronunciation tips */}
            {card.rules && card.rules.length > 0 && (
              <View style={s.pronTips}>
                <Text style={s.pronTipsTitle}>💡 PRONUNCIATION TIPS</Text>
                {card.rules.map((r: any, i: number) => (
                  <View key={i} style={s.pronTipRow}>
                    <Text style={s.pronTipRule}>{r.sound || r.person}</Text>
                    <Text style={s.pronTipTrick}>{r.english_trick || r.example || ""}</Text>
                  </View>
                ))}
              </View>
            )}

            {allPronDone && (
              <View style={s.pronComplete}>
                <Text style={s.pronCompleteText}>🎉 All phrases practiced!</Text>
              </View>
            )}
          </View>
        );
      }

      // ── 6. SCENE ──
      // Old scene (kept as fallback)
      case "scene":
        return <View style={s.cardInner}><Text style={s.label}>SCENE</Text></View>;

      // ── 6. USE IT — fill in the blank in context ──
      case "useIt": {
        const useTask = card.tasks?.[sceneIdx];
        const useChecked = writeChecked[`use-${sceneIdx}`];
        const useAnswer = writeAnswers[`use-${sceneIdx}`] || "";
        const useCorrect = useChecked && useAnswer.trim().toLowerCase() === useTask?.answer?.toLowerCase();
        const allUseDone = sceneIdx >= (card.tasks?.length || 0);

        return (
          <View style={s.cardInner}>
            <Text style={s.label}>USE IT!</Text>
            <Text style={s.pronSubtitle}>Complete the phrase. Fill in the missing word.</Text>

            <View style={s.sceneSituation}>
              <Text style={s.sceneSituationText}>📍 {card.situation}</Text>
            </View>

            {!allUseDone && useTask ? (
              <View style={{ marginTop: 12 }}>
                <Text style={s.sceneProgress}>Phrase {sceneIdx + 1} of {card.tasks?.length || 0}</Text>

                {/* The sentence with blank */}
                <View style={s.useItCard}>
                  <Text style={s.useItSentence}>{useTask.sentence}</Text>
                  <Text style={s.useItMeaning}>{useTask.meaning}</Text>
                </View>

                {/* Input */}
                {!useChecked && (
                  <View>
                    <TextInput
                      style={s.writeInput}
                      value={useAnswer}
                      onChangeText={(t) => setWriteAnswers({ ...writeAnswers, [`use-${sceneIdx}`]: t })}
                      placeholder="Type the missing word..."
                      placeholderTextColor={C.muted}
                      autoCapitalize="none"
                    />
                    {useAnswer.trim().length > 0 && (
                      <TouchableOpacity style={s.writeCheckBtn} onPress={() => {
                        setWriteChecked({ ...writeChecked, [`use-${sceneIdx}`]: true });
                        if (useAnswer.trim().toLowerCase() === useTask.answer.toLowerCase()) addXP(10);
                      }}>
                        <Text style={s.writeCheckText}>Check ✓</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                {/* Feedback */}
                {useChecked && useCorrect && (
                  <Text style={s.correctFeedback}>✅ "{useTask.fullSentence}"</Text>
                )}
                {useChecked && !useCorrect && (
                  <View>
                    <Text style={s.wrongFeedback}>The word is: "{useTask.answer}"</Text>
                    <Text style={[s.correctFeedback, { marginTop: 4 }]}>→ {useTask.fullSentence}</Text>
                  </View>
                )}

                {useChecked && (
                  <TouchableOpacity style={[s.nextBtn, { marginTop: 12 }]} onPress={() => setSceneIdx(sceneIdx + 1)}>
                    <Text style={s.nextBtnText}>{sceneIdx < (card.tasks?.length || 0) - 1 ? "Next phrase →" : "Done! →"}</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View style={s.pronComplete}>
                <Text style={s.pronCompleteText}>🎉 All phrases completed!</Text>
              </View>
            )}
          </View>
        );
      }

      // ── 7. GRAMMAR + QUIZ ──
      case "grammar": {
        const quizzes = card.quizzes || (card.quiz ? [card.quiz] : []);
        const q = quizzes[0]; // for backward compat
        const ans = answers[step];
        const answered = q && ans !== undefined;
        return (
          <View style={s.cardInner}>
            <Text style={s.label}>GRAMMAR</Text>
            <Text style={s.grammarTitle}>{card.concept}</Text>

            {/* Rule explanation */}
            <View style={s.grammarBox}>
              <Text style={s.grammarText}>{card.rule}</Text>
            </View>

            {/* Conjugation table (like Grammatik aktiv) */}
            {card.patterns && card.patterns.length > 0 && card.patterns[0]?.person && (
              <View style={s.conjugTable}>
                <Text style={s.conjugTitle}>CONJUGATION TABLE</Text>
                {card.patterns.map((p: any, i: number) => (
                  <View key={i} style={[s.conjugRow, i % 2 === 0 && { backgroundColor: C.bg2 }]}>
                    <Text style={s.conjugPerson}>{p.person || p.sound}</Text>
                    <Text style={s.conjugForm}>
                      {(p.conjugation || p.form || "").split("").map((char: string, j: number) => {
                        // Highlight the ending in gold (last 1-3 chars that differ)
                        const form = p.conjugation || p.form || "";
                        const isEnding = j >= form.length - 3 && form.length > 2;
                        return <Text key={j} style={isEnding ? { color: C.gold, fontWeight: "900" } : {}}>{char}</Text>;
                      })}
                    </Text>
                    <Text style={s.conjugExample}>{p.example || ""}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Pronunciation patterns (for lesson 1 style) */}
            {card.patterns && card.patterns.length > 0 && card.patterns[0]?.sound && !card.patterns[0]?.person && (
              <View style={s.conjugTable}>
                <Text style={s.conjugTitle}>PRONUNCIATION RULES</Text>
                {card.patterns.map((p: any, i: number) => (
                  <View key={i} style={[s.conjugRow, i % 2 === 0 && { backgroundColor: C.bg2 }]}>
                    <Text style={[s.conjugPerson, { color: C.gold }]}>{p.sound}</Text>
                    <Text style={s.conjugExample}>{p.english_trick || p.examples?.[0] || ""}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Common mistakes */}
            {card.commonMistakes && card.commonMistakes.length > 0 && (
              <View style={s.mistakesBox}>
                <Text style={s.mistakesTitle}>⚠️ COMMON MISTAKES</Text>
                {card.commonMistakes.map((m: any, i: number) => (
                  <View key={i} style={s.mistakeRow}>
                    <Text style={s.mistakeWrong}>❌ {m.wrong}</Text>
                    <Text style={s.mistakeRight}>✅ {m.right}</Text>
                    <Text style={s.mistakeExpl}>{m.explanation}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Mnemonic */}
            {card.mnemonic && (
              <View style={s.mnemonicBox}>
                <Text style={s.mnemonicText}>🧠 {card.mnemonic}</Text>
              </View>
            )}

            {/* Practice quizzes — ALL recall tasks */}
            {quizzes.length > 0 && (
              <View style={{ marginTop: 20 }}>
                <Text style={s.conjugTitle}>PRACTICE ({quizzes.length} questions)</Text>
                {quizzes.map((quiz: any, qi: number) => {
                  const qAns = answers[`grammar-${qi}`];
                  const qAnswered = qAns !== undefined;
                  const qCorrect = qAns === quiz.answer;
                  return (
                    <View key={qi} style={{ marginBottom: 16 }}>
                      <Text style={s.quizQ}>{quiz.question}</Text>
                      {quiz.options.map((opt: string, i: number) => (
                        <TouchableOpacity key={i} style={[s.optBtn, qAnswered && i === quiz.answer && s.optCorrect, qAnswered && qAns === i && qAns !== quiz.answer && s.optWrong]} onPress={() => { if (!qAnswered) { setAnswers({ ...answers, [`grammar-${qi}`]: i }); if (i === quiz.answer) addXP(10); } }} activeOpacity={qAnswered ? 1 : 0.7}>
                          <Text style={[s.optText, qAnswered && i === quiz.answer && { color: C.green, fontWeight: "700" }]}>{opt}</Text>
                        </TouchableOpacity>
                      ))}
                      {qAnswered && qCorrect && <Text style={s.correctFeedback}>✅ Correct! +10 XP</Text>}
                      {qAnswered && !qCorrect && <Text style={s.wrongFeedback}>Answer: {quiz.options[quiz.answer]}</Text>}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        );
      }

      // ── 8. VOCAB (words + chunks) ──
      case "vocab": {
        const allFlipped = card.words.every((_: any, i: number) => flipped[`${step}-${i}`]);
        return (
          <View style={s.cardInner}>
            <Text style={s.cardEmoji}>📦</Text>
            <Text style={s.label}>YOUR NEW WORDS</Text>
            <Text style={s.vocabHint}>Tap each card to flip it.</Text>
            {card.words.map((w: string, i: number) => {
              const [de, en] = (w.includes("::") ? w.split("::") : [w, ""]).map((s: string) => s.trim());
              const key = `${step}-${i}`;
              const fl = flipped[key];
              return (
                <TouchableOpacity key={i} style={[s.vocabCard, fl && { borderColor: C.greenLine, backgroundColor: C.greenDim }]} onPress={() => { if (!fl) { setFlipped({ ...flipped, [key]: true }); addXP(2); } }} activeOpacity={fl ? 1 : 0.7}>
                  <Text style={s.vocabDe}>{de}</Text>
                  {fl ? <Text style={s.vocabEn}>{en}</Text> : <Text style={s.vocabFlip}>tap ↻</Text>}
                </TouchableOpacity>
              );
            })}
            {card.phrases.length > 0 && (
              <>
                <Text style={[s.label, { marginTop: 20 }]}>USEFUL PHRASES</Text>
                {card.phrases.map((p: string, i: number) => {
                  const [de, en] = p.split("::").map((s: string) => s.trim());
                  return (
                    <View key={i} style={s.phraseRow}>
                      <Text style={s.phraseDe}>"{de}"</Text>
                      <Text style={s.phraseEn}>{en}</Text>
                    </View>
                  );
                })}
              </>
            )}
            {/* Active recall after flipping */}
            {allFlipped && (
              <View style={{ marginTop: 20 }}>
                <Text style={s.label}>QUICK TEST — Type the German word!</Text>
                {card.words.slice(0, 3).map((w: string, i: number) => {
                  const [de, en] = (w.includes("::") ? w.split("::") : [w, ""]).map((s: string) => s.trim());
                  const wKey = `vocab-write-${i}`;
                  const userAns = writeAnswers[wKey] || "";
                  const checked = writeChecked[wKey];
                  const correct = checked && userAns.trim().toLowerCase() === de.toLowerCase();
                  return (
                    <View key={i} style={{ marginBottom: 12 }}>
                      <Text style={s.writePrompt}>"{en}" in German:</Text>
                      <TextInput style={[s.writeInput, checked && correct && s.writeInputCorrect, checked && !correct && s.writeInputWrong]} value={userAns} onChangeText={(t) => setWriteAnswers({ ...writeAnswers, [wKey]: t })} placeholder="Type..." placeholderTextColor={C.muted} editable={!checked} />
                      {!checked && userAns.trim().length > 0 && (
                        <TouchableOpacity style={s.writeCheckBtn} onPress={() => { setWriteChecked({ ...writeChecked, [wKey]: true }); if (userAns.trim().toLowerCase() === de.toLowerCase()) addXP(5); }}>
                          <Text style={s.writeCheckText}>Check ✓</Text>
                        </TouchableOpacity>
                      )}
                      {checked && correct && <Text style={s.correctFeedback}>✅ {de}</Text>}
                      {checked && !correct && <Text style={s.wrongFeedback}>→ {de}</Text>}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        );
      }

      // ── 9. WORD ORDER ──
      case "wordOrder": {
        const shuffled = [...card.words].sort(() => 0.5 - Math.random());
        const available = (wordOrder.length === 0 ? shuffled : card.words).filter((w: string) => !wordOrder.includes(w));
        const result = wordOrder.join(" ");
        const isCorrect = wordOrderChecked && result.toLowerCase().trim() === card.expected.toLowerCase().replace(/[.,!?]/g, "").trim();
        return (
          <View style={s.cardInner}>
            <Text style={s.cardEmoji}>🧩</Text>
            <Text style={s.label}>BUILD THE SENTENCE</Text>
            <Text style={s.wordOrderHint}>Tap the words in the correct order:</Text>
            <View style={s.wordOrderResult}>
              {wordOrder.length > 0 ? (
                <Text style={s.wordOrderText}>{wordOrder.join(" ")}</Text>
              ) : (
                <Text style={s.wordOrderPlaceholder}>Tap words below...</Text>
              )}
            </View>
            <View style={s.wordOrderChips}>
              {(wordOrder.length === 0 ? shuffled : card.words.filter((w: string) => !wordOrder.includes(w))).map((w: string, i: number) => (
                <TouchableOpacity key={`${w}-${i}`} style={s.wordOrderChip} onPress={() => setWordOrder([...wordOrder, w])}>
                  <Text style={s.wordOrderChipText}>{w}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {wordOrder.length > 0 && !wordOrderChecked && (
              <View style={s.wordOrderActions}>
                <TouchableOpacity style={s.resetBtn} onPress={() => setWordOrder([])}>
                  <Text style={s.resetBtnText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.checkBtn} onPress={() => { setWordOrderChecked(true); if (result.toLowerCase().trim() === card.expected.toLowerCase().replace(/[.,!?]/g, "").trim()) addXP(10); }}>
                  <Text style={s.checkBtnText}>Check ✓</Text>
                </TouchableOpacity>
              </View>
            )}
            {wordOrderChecked && isCorrect && <Text style={s.correctFeedback}>✅ Perfect! "{card.expected}"</Text>}
            {wordOrderChecked && !isCorrect && <Text style={s.wrongFeedback}>Correct order: "{card.expected}"</Text>}
            {wordOrderChecked && <TouchableOpacity style={s.nextBtn} onPress={goNext}><Text style={s.nextBtnText}>Continue →</Text></TouchableOpacity>}
          </View>
        );
      }

      // ── 9. WORD ORDER MULTI (multiple sentences) ──
      case "wordOrderMulti": {



        const currentPhrase = card.phrases?.[woIdx] || "";
        const cleanPhrase = currentPhrase.replace(/[!?,\.]/g, "").trim();
        const expectedWords = cleanPhrase.split(" ").filter(Boolean);
        const shuffled = [...expectedWords].sort(() => 0.5 - Math.random());
        const result = woWords.join(" ");
        const isCorrect = woChecked && result.toLowerCase() === cleanPhrase.toLowerCase();
        const allWoDone = woIdx >= (card.phrases?.length || 0);

        return (
          <View style={s.cardInner}>
            <Text style={s.label}>BUILD THE SENTENCE</Text>
            <Text style={s.wordOrderHint}>Sentence {Math.min(woIdx + 1, card.phrases?.length || 0)} of {card.phrases?.length || 0}</Text>

            {!allWoDone ? (
              <>
                <View style={s.wordOrderResult}>
                  {woWords.length > 0 ? (
                    <Text style={s.wordOrderText}>{woWords.join(" ")}</Text>
                  ) : (
                    <Text style={s.wordOrderPlaceholder}>Tap words below...</Text>
                  )}
                </View>
                <View style={s.wordOrderChips}>
                  {(woWords.length === 0 ? shuffled : expectedWords.filter(w => !woWords.includes(w))).map((w, i) => (
                    <TouchableOpacity key={`${w}-${i}`} style={s.wordOrderChip} onPress={() => setWoWords([...woWords, w])}>
                      <Text style={s.wordOrderChipText}>{w}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {woWords.length > 0 && !woChecked && (
                  <View style={s.wordOrderActions}>
                    <TouchableOpacity style={s.resetBtn} onPress={() => setWoWords([])}>
                      <Text style={s.resetBtnText}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.checkBtn} onPress={() => { setWoChecked(true); if (result.toLowerCase() === cleanPhrase.toLowerCase()) addXP(10); }}>
                      <Text style={s.checkBtnText}>Check ✓</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {woChecked && isCorrect && <Text style={s.correctFeedback}>✅ Perfect! "{currentPhrase}"</Text>}
                {woChecked && !isCorrect && <Text style={s.wrongFeedback}>Correct: "{currentPhrase}"</Text>}
                {woChecked && (
                  <TouchableOpacity style={s.nextBtn} onPress={() => { setWoIdx(woIdx + 1); setWoWords([]); setWoChecked(false); }}>
                    <Text style={s.nextBtnText}>{woIdx < (card.phrases?.length || 0) - 1 ? "Next sentence →" : "Done! →"}</Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <View style={s.pronComplete}>
                <Text style={s.pronCompleteText}>🎉 All sentences built! +{(card.phrases?.length || 0) * 10} XP</Text>
              </View>
            )}
          </View>
        );
      }

      // ── 9b. WRITING EXERCISE (easier with hints) ──
      case "write": {
        return (
          <View style={s.cardInner}>
            <Text style={s.label}>WRITE IT</Text>
            <Text style={s.writeInstruction}>{card.instruction}</Text>
            {card.tasks.map((task: any, i: number) => {
              const userAnswer = writeAnswers[i] || "";
              const checked = writeChecked[i];
              const expected = (task.expected || "").trim().toLowerCase();
              const answer = userAnswer.trim().toLowerCase();
              const isCorrect = checked && (
                answer === expected ||
                expected.includes(answer) && answer.length >= 3 ||
                answer.replace(/[.,!?]/g, "") === expected.replace(/[.,!?]/g, "")
              );
              // Generate hint: show first letter + length
              const hintText = task.expected ? `${task.expected[0]}${"_".repeat(task.expected.length - 1)} (${task.expected.length} letters)` : "";
              return (
                <View key={i} style={s.writeTask}>
                  <Text style={s.writePrompt}>{task.prompt}</Text>

                  {/* Hint box */}
                  <View style={{ backgroundColor: C.blueDim, borderRadius: 10, padding: 10, marginBottom: 8 }}>
                    <Text style={{ fontSize: 12, color: C.blue, fontWeight: "600" }}>💡 Hint: {hintText}</Text>
                  </View>

                  <TextInput
                    style={[s.writeInput, checked && isCorrect && s.writeInputCorrect, checked && !isCorrect && s.writeInputWrong]}
                    value={userAnswer}
                    onChangeText={(t) => setWriteAnswers({ ...writeAnswers, [i]: t })}
                    placeholder="Type the missing word..."
                    placeholderTextColor={C.muted}
                    editable={!checked}
                    autoCapitalize="none"
                  />
                  {!checked && userAnswer.trim().length > 0 && (
                    <TouchableOpacity style={s.writeCheckBtn} onPress={() => {
                      setWriteChecked({ ...writeChecked, [i]: true });
                      const a = userAnswer.trim().toLowerCase();
                      const e = (task.expected || "").trim().toLowerCase();
                      if (a === e || (e.includes(a) && a.length >= 3) || a.replace(/[.,!?]/g, "") === e.replace(/[.,!?]/g, "")) addXP(10);
                    }}>
                      <Text style={s.writeCheckText}>Check ✓</Text>
                    </TouchableOpacity>
                  )}
                  {checked && isCorrect && <Text style={s.correctFeedback}>✅ Richtig! +10 XP</Text>}
                  {checked && !isCorrect && (
                    <View>
                      <Text style={s.wrongFeedback}>Die Antwort ist:</Text>
                      <Text style={s.writeExpected}>{task.expected}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        );
      }

      // ── 10. LIVE AI CONVERSATION ──
      case "dialog": {
        const currentDlgStep = card.steps?.[dialogStep];
        const dlgDone = dialogStep >= (card.steps?.length || 0);
        const charName = card.character || "Partner";

        const playNpcAndAdvance = async () => {
          if (!currentDlgStep || currentDlgStep.type !== "npc") return;
          setDlgPlaying(true);
          setDialogHistory(h => [...h, { speaker: currentDlgStep.speaker, text: currentDlgStep.text }]);
          await ElevenLabs.playCharacterLine(currentDlgStep.speaker, currentDlgStep.text);
          setDlgPlaying(false);
          // Check if next step is user — go to hint
          const nextIdx = dialogStep + 1;
          const nextStep = card.steps?.[nextIdx];
          setDialogStep(nextIdx);
          if (nextStep?.type === "user") {
            setDlgPhase("hint");
          } else if (nextIdx >= (card.steps?.length || 0)) {
            setDlgPhase("done");
          } else {
            setDlgPhase("npc");
          }
          scrollRef.current?.scrollToEnd?.({ animated: true });
        };

        const handleDlgRespond = async () => {
          if (!currentDlgStep) return;
          const response = dlgInput.trim() || currentDlgStep.text;
          setDialogHistory(h => [...h, { speaker: "You", text: response }]);
          setDlgInput("");
          addXP(10);

          // Get AI feedback on user's response
          const expected = currentDlgStep.text;
          if (response.toLowerCase().replace(/[!?.,"]/g, "") !== expected.toLowerCase().replace(/[!?.,"]/g, "")) {
            setDlgFeedbackLoading(true);
            try {
              const res = await AI.chat(
                [{ role: "user", content: `In a German conversation (A1 level), the expected response was "${expected}" (meaning: "${currentDlgStep.translation}"). The student said "${response}". Give brief feedback in 1 sentence: was it correct/acceptable? If not, what should they say instead? Be encouraging. Answer in English.` }],
                "conversation feedback", "A1"
              );
              setDlgFeedback(res.text);
            } catch { setDlgFeedback(""); }
            setDlgFeedbackLoading(false);
          } else {
            setDlgFeedback("Perfect response!");
          }
          setDlgPhase("feedback");
          scrollRef.current?.scrollToEnd?.({ animated: true });
        };

        const advanceAfterFeedback = () => {
          setDlgFeedback("");
          const nextIdx = dialogStep + 1;
          const nextStep = card.steps?.[nextIdx];
          if (nextIdx >= (card.steps?.length || 0)) {
            setDlgPhase("done");
          } else {
            setDialogStep(nextIdx);
            if (nextStep?.type === "npc") {
              setDlgPhase("npc");
            } else {
              setDlgPhase("hint");
            }
          }
        };

        return (
          <View style={s.cardInner}>
            <Text style={s.label}>LIVE CONVERSATION</Text>
            <Text style={s.dialogSituation}>📍 {card.situation}</Text>

            {/* Intro */}
            {dlgPhase === "intro" && dialogHistory.length === 0 && (
              <View style={{ alignItems: "center", marginTop: 12 }}>
                <Text style={{ fontSize: 48, marginBottom: 12 }}>🎭</Text>
                <Text style={{ fontFamily: SERIF, fontSize: 20, fontWeight: "700", color: C.text, textAlign: "center" }}>Talk to {charName}</Text>
                <Text style={{ fontSize: 14, color: C.muted, textAlign: "center", marginTop: 8, lineHeight: 20 }}>They'll speak German. You'll get hints to help you respond. Listen, understand, and speak!</Text>
                <TouchableOpacity style={[s.nextBtn, { marginTop: 20, paddingHorizontal: 40 }]} onPress={() => {
                  // Start with first step
                  if (currentDlgStep?.type === "npc") {
                    setDlgPhase("npc");
                  } else {
                    setDlgPhase("hint");
                  }
                }} activeOpacity={0.85}>
                  <Text style={s.nextBtnText}>Start Conversation 🎤</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Chat history */}
            {dialogHistory.map((msg, i) => (
              <View key={i} style={msg.speaker === "You" ? s.bubbleRight : s.bubbleLeft}>
                <Text style={s.bubbleSpeaker}>{msg.speaker}</Text>
                <Text style={[s.bubbleText, msg.speaker === "You" && { color: "#fff" }]}>{msg.text}</Text>
              </View>
            ))}

            {/* NPC speaking indicator */}
            {dlgPlaying && <Text style={{ color: C.purple, fontWeight: "700", fontSize: 13, marginTop: 8 }}>🔊 {charName} is speaking...</Text>}

            {/* NPC line — tap to hear */}
            {!dlgDone && dlgPhase === "npc" && currentDlgStep?.type === "npc" && !dlgPlaying && (
              <TouchableOpacity style={s.npcPlayBtn} onPress={playNpcAndAdvance} activeOpacity={0.7}>
                <Text style={s.npcPlayText}>🔊 Hear {currentDlgStep.speaker} speak</Text>
              </TouchableOpacity>
            )}

            {/* User turn — Multiple choice + optional free input */}
            {!dlgDone && dlgPhase === "hint" && currentDlgStep?.type === "user" && (
              <View style={{ marginTop: 12 }}>
                {/* What to say hint */}
                <View style={{ backgroundColor: C.blueDim, borderRadius: 14, padding: 16, marginBottom: 12 }}>
                  <Text style={{ fontSize: 12, fontWeight: "800", color: C.blue, letterSpacing: 1, marginBottom: 4 }}>YOUR TURN</Text>
                  <Text style={{ fontSize: 14, color: C.blue, lineHeight: 20 }}>{currentDlgStep.hint || currentDlgStep.translation}</Text>
                </View>

                {/* Multiple choice options — correct answer + 2 distractors */}
                <Text style={{ fontSize: 11, fontWeight: "700", color: C.muted, letterSpacing: 1, marginBottom: 8 }}>CHOOSE YOUR RESPONSE:</Text>
                {(() => {
                  const correctText = currentDlgStep.text;
                  // Generate plausible wrong options from other dialog steps or common phrases
                  const otherUserLines = card.steps?.filter((s: any) => s.type === "user" && s.text !== correctText).map((s: any) => s.text) || [];
                  const fallbackOptions = ["Ich verstehe nicht.", "Nein, danke.", "Wie bitte?", "Ja, natürlich!", "Entschuldigung."];
                  const wrongOptions = [...otherUserLines, ...fallbackOptions].filter(o => o !== correctText).slice(0, 2);
                  const allOptions = [correctText, ...wrongOptions].sort(() => Math.random() - 0.5);

                  return allOptions.map((opt, i) => {
                    const isSelected = dlgInput === opt;
                    const isCorrect = opt === correctText;
                    return (
                      <TouchableOpacity
                        key={i}
                        style={[s.optBtn, isSelected && isCorrect && s.optCorrect, isSelected && !isCorrect && s.optWrong]}
                        onPress={() => {
                          if (!dialogAnswered) {
                            setDlgInput(opt);
                            setDialogAnswered(true);
                            if (isCorrect) {
                              // Auto-respond after short delay
                              setTimeout(() => handleDlgRespond(), 800);
                            }
                          }
                        }}
                        activeOpacity={dialogAnswered ? 1 : 0.7}
                      >
                        <Text style={[s.optText, isSelected && isCorrect && { color: C.green, fontWeight: "700" }]}>{opt}</Text>
                        {isSelected && isCorrect && <Text style={{ color: C.green, fontWeight: "800" }}>✓</Text>}
                        {isSelected && !isCorrect && <Text style={{ color: C.red, fontWeight: "800" }}>✗</Text>}
                      </TouchableOpacity>
                    );
                  });
                })()}

                {/* Wrong answer feedback */}
                {dialogAnswered && dlgInput !== currentDlgStep.text && (
                  <View style={{ marginTop: 8 }}>
                    <Text style={{ fontSize: 13, color: C.red, marginBottom: 4 }}>The correct response is:</Text>
                    <TouchableOpacity style={[s.optBtn, { borderColor: C.green, backgroundColor: C.greenDim }]} onPress={() => { setDlgInput(currentDlgStep.text); setTimeout(() => handleDlgRespond(), 500); }}>
                      <Text style={{ fontSize: 15, fontWeight: "700", color: C.green }}>{currentDlgStep.text}</Text>
                      <Text style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{currentDlgStep.translation}</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Or type freely (collapsed) */}
                {!dialogAnswered && (
                  <View style={{ marginTop: 12 }}>
                    <Text style={{ fontSize: 12, color: C.muted, textAlign: "center", marginBottom: 6 }}>— or type your own response —</Text>
                    <View style={s.chatInputRow}>
                      <TextInput style={s.chatInput} value={dlgInput} onChangeText={setDlgInput} placeholder="Type in German..." placeholderTextColor={C.muted} onSubmitEditing={handleDlgRespond} returnKeyType="send" />
                      <TouchableOpacity style={s.sendBtn} onPress={handleDlgRespond} activeOpacity={0.7}>
                        <Text style={s.sendBtnText}>→</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            )}

            {/* Feedback */}
            {!dlgDone && dlgPhase === "feedback" && (
              <View style={{ marginTop: 12 }}>
                <View style={[s.rateFeedback, { marginBottom: 12 }]}>
                  <Text style={s.rateFeedbackText}>✅ +10 XP</Text>
                  {dlgFeedbackLoading && <Text style={{ color: C.muted, marginTop: 6, fontSize: 13 }}>🤖 Checking your response...</Text>}
                  {dlgFeedback ? <Text style={[s.rateFeedbackText, { marginTop: 6, fontWeight: "400" }]}>{dlgFeedback}</Text> : null}
                </View>
                <TouchableOpacity style={s.nextBtn} onPress={advanceAfterFeedback} activeOpacity={0.85}>
                  <Text style={s.nextBtnText}>Continue →</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Done */}
            {(dlgDone || dlgPhase === "done") && (
              <View style={[s.pronComplete, { marginTop: 12 }]}>
                <Text style={{ fontSize: 40, marginBottom: 8 }}>🎉</Text>
                <Text style={s.pronCompleteText}>Conversation complete!</Text>
                <Text style={{ fontSize: 13, color: C.green, marginTop: 4 }}>You talked to {charName} in German!</Text>
              </View>
            )}
          </View>
        );
      }

      // Keep old chat as fallback
      case "chat":
        return (
          <View style={s.cardInner}>
            <Text style={s.label}>CONVERSATION</Text>
            <View style={s.chatInputRow}>
              <TextInput style={s.chatInput} value={chatInput} onChangeText={setChatInput} placeholder="Type in German..." placeholderTextColor={C.muted} onSubmitEditing={() => sendChat()} returnKeyType="send" />
              {/* Microphone button (Web Speech API) */}
              <TouchableOpacity style={s.micBtn} onPress={() => {
                if (typeof window !== "undefined" && (window as any).webkitSpeechRecognition) {
                  const SpeechRecognition = (window as any).webkitSpeechRecognition;
                  const recognition = new SpeechRecognition();
                  recognition.lang = "de-DE";
                  recognition.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    setChatInput(transcript);
                  };
                  recognition.start();
                } else {
                  alert("Speech recognition is not supported in this browser. Try Chrome.");
                }
              }} activeOpacity={0.7}>
                <Text style={s.micBtnText}>🎤</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.sendBtn} onPress={() => sendChat()}><Text style={s.sendBtnText}>→</Text></TouchableOpacity>
            </View>
            {chatMessages.filter(m => m.role === "user").length >= 3 && (
              <View>
                <Text style={s.chatSuccess}>🎉 Amazing! You just had a real conversation in German!</Text>
                <TouchableOpacity style={s.nextBtn} onPress={goNext}><Text style={s.nextBtnText}>Continue →</Text></TouchableOpacity>
              </View>
            )}
            {chatMessages.filter(m => m.role === "user").length > 0 && chatMessages.filter(m => m.role === "user").length < 3 && (
              <Text style={s.chatProgress}>{3 - chatMessages.filter(m => m.role === "user").length} more message(s) to complete</Text>
            )}
          </View>
        );

      // ── 11. SELF-RATE (with visible consequences) ──
      case "selfrate":
        return (
          <View style={s.cardInner}>
            <Text style={s.cardEmoji}>⭐</Text>
            <Text style={s.label}>WIE SICHER FÜHLST DU DICH?</Text>
            <Text style={s.rateTitle}>How confident are you with this lesson?</Text>
            <Text style={s.rateDesc}>Your rating decides what happens next!</Text>
            <View style={s.rateRow}>
              {[1, 2, 3, 4, 5].map(n => (
                <TouchableOpacity key={n} style={[s.rateStar, selfRating >= n && s.rateStarActive]} onPress={() => { setSelfRating(n); if (n >= 3) addXP(n * 5); }}>
                  <Text style={[s.rateStarText, selfRating >= n && { color: C.gold }]}>{selfRating >= n ? "★" : "☆"}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={s.rateLabels}><Text style={s.rateLabelText}>Unsicher</Text><Text style={s.rateLabelText}>Sehr sicher</Text></View>
            {selfRating > 0 && (
              <View>
                {/* Consequence 1: Review or Skip */}
                <View style={[s.rateAction, selfRating <= 2 ? { backgroundColor: C.redDim, borderColor: C.redLine } : { backgroundColor: C.greenDim, borderColor: C.greenLine }]}>
                  <Text style={[s.rateActionText, { color: selfRating <= 2 ? C.red : C.green, fontSize: 15, fontWeight: "700" }]}>
                    {selfRating <= 2 ? "🔄 Lektion wird zur täglichen Review hinzugefügt" : "✅ Lektion abgeschlossen!"}
                  </Text>
                </View>

                {/* Consequence 2: XP Bonus */}
                <View style={[s.rateAction, { backgroundColor: C.goldDim, borderColor: C.goldLine, marginTop: 8 }]}>
                  <Text style={[s.rateActionText, { color: C.gold, fontSize: 15, fontWeight: "700" }]}>
                    +{selfRating * 5} Bonus-XP {selfRating >= 4 ? "🎉" : ""}
                  </Text>
                </View>

                {/* Consequence 3: Character reward */}
                <View style={[s.rateAction, { marginTop: 8 }]}>
                  <Text style={s.rateActionText}>
                    {selfRating <= 2 ? "📝 Dein Avatar übt diese Wörter morgen nochmal" :
                     selfRating === 3 ? "🗺️ Dein Avatar bewegt sich etwas weiter auf der Karte" :
                     selfRating === 4 ? "🌭 Dein Avatar bekommt eine Bratwurst als Belohnung!" :
                     "🏆 Dein Avatar hat einen neuen Skill freigeschaltet!"}
                  </Text>
                </View>
              </View>
            )}
          </View>
        );

      // ── 12. CELEBRATION ──
      case "finish": {
        const rewards = ["🌭 You earned a Bratwurst!", "🍺 You earned a Berliner Weisse!", "🥨 You earned a Pretzel!", "🧳 Your character got a new suitcase!"];
        const reward = rewards[lesson.order_index % rewards.length];
        const nextLessonTitle = ALL_STATIC_LESSONS.find((l: any) => l.order_index === lesson.order_index + 1)?.title;
        return (
          <View style={[s.cardInner, { alignItems: "center" }]}>
            <Text style={{ fontSize: 64, marginBottom: 8 }}>🎉</Text>
            <Text style={s.finishTitle}>Mission Complete!</Text>
            <Text style={s.finishSub}>{card.title}</Text>

            {/* Stats */}
            <View style={s.finishStats}>
              <View style={s.finishStat}><Text style={s.finishStatNum}>{totalXP + card.xp}</Text><Text style={s.finishStatLabel}>Total XP</Text></View>
              <View style={s.finishStat}><Text style={s.finishStatNum}>{card.wordsLearned}</Text><Text style={s.finishStatLabel}>Words</Text></View>
              <View style={s.finishStat}><Text style={s.finishStatNum}>{selfRating > 0 ? `${selfRating}/5` : "—"}</Text><Text style={s.finishStatLabel}>Confidence</Text></View>
            </View>

            {/* Reward */}
            <View style={s.rewardBox}>
              <Text style={s.rewardText}>{reward}</Text>
            </View>

            {/* What XP does */}
            <View style={s.xpExplain}>
              <Text style={s.xpExplainTitle}>WHAT YOUR XP DOES:</Text>
              <Text style={s.xpExplainText}>🗺️ Moves your character across Germany</Text>
              <Text style={s.xpExplainText}>🌳 Unlocks new skills in your skill tree</Text>
              <Text style={s.xpExplainText}>🏛️ Opens new cities to explore</Text>
            </View>

            {/* Next mission preview */}
            {nextLessonTitle && (
              <View style={s.nextPreview}>
                <Text style={s.nextPreviewLabel}>NEXT MISSION:</Text>
                <Text style={s.nextPreviewTitle}>{nextLessonTitle}</Text>
              </View>
            )}

            <TouchableOpacity style={s.finishBtn} onPress={async () => {
              await Progress.addXP(totalXP + card.xp);
              await Progress.markComplete(lesson.id);
              if (lesson.vocabulary?.core) {
                const words = lesson.vocabulary.core.map((w: string) => { const p = w.split("::"); return { word: p[0]?.trim() || w, meaning: p[1]?.trim() || "" }; });
                await SRS.addWordsFromLesson(lesson.id, words);
              }
              router.back();
            }}>
              <Text style={s.finishBtnText}>Continue your journey →</Text>
            </TouchableOpacity>
          </View>
        );
      }

      default: return null;
    }
  };

  // Phase names for the navigation bar
  const PHASE_NAMES = ["Start", "Listen", "Check", "Match", "Sound", "Use it", "Grammar", "Words", "Build", "Write", "Speak!", "Rate", "Done"];

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: SAFE_TOP }} />

      {/* ═══ TOP BAR: Close + XP ═══ */}
      <View style={s.topRow}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Text style={s.closeBtn}>✕</Text>
        </TouchableOpacity>
        <View style={s.progressTrack}><View style={[s.progressFill, { width: `${pct}%` }]} /></View>
        <View style={s.xpBadge}><Text style={s.xpBadgeText}>⚡{totalXP}</Text></View>
      </View>

      {/* ═══ MODERN PHASE INDICATOR ═══ */}
      <View style={s.phaseNav}>
        {/* Dots */}
        <View style={s.phaseDotsRow}>
          {CARD_LABELS.slice(0, total).map((_, i) => (
            <TouchableOpacity key={i} onPress={() => goToCard(i)} activeOpacity={0.6}
              style={[s.phaseNavDot, i < step && s.phaseNavDotDone, i === step && s.phaseNavDotActive]}
            />
          ))}
        </View>
        {/* Label */}
        <View style={s.phaseNavLabel}>
          <Text style={s.phaseNavEmoji}>{CARD_LABELS[step]}</Text>
          <Text style={s.phaseNavText}>{PHASE_NAMES[step]}</Text>
          <Text style={s.phaseNavCount}>{step + 1}/{total}</Text>
        </View>
      </View>

      {lastXP > 0 && <XPPopup amount={lastXP} />}

      {/* ═══ CONTENT ═══ */}
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {renderCard()}
      </ScrollView>

      {/* ═══ FIXED BOTTOM: Back + Continue ═══ */}
      {card && !["finish"].includes(card.type) && (
        <View style={s.bottomBar}>
          {step > 0 && (
            <TouchableOpacity style={s.bottomBackBtn} onPress={goBack} activeOpacity={0.7}>
              <Text style={s.bottomBackText}>← Back</Text>
            </TouchableOpacity>
          )}
          {step < total - 1 && (
            <TouchableOpacity style={[s.bottomBtn, step === 0 && { flex: 1 }]} onPress={goNext} activeOpacity={0.85}>
              <Text style={s.bottomBtnText}>{step === 0 ? "Let's go! →" : "Continue →"}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

// ═══ STYLES ═══
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  center: { flex: 1, backgroundColor: C.bg, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: C.red }, errorLink: { color: C.gold, fontSize: 16, marginTop: 16 },
  topRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 8, gap: 10 },
  closeBtn: { color: C.muted, fontSize: 22, width: 28 },

  // Modern phase navigation
  phaseNav: { paddingHorizontal: 20, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: C.border },
  phaseDotsRow: { flexDirection: "row", gap: 3, justifyContent: "center", marginBottom: 6 },
  phaseNavDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.bg3 },
  phaseNavDotDone: { backgroundColor: C.green },
  phaseNavDotActive: { backgroundColor: C.gold, width: 24, height: 10, borderRadius: 5 },
  phaseNavLabel: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 },
  phaseNavEmoji: { fontSize: 14 },
  phaseNavText: { fontSize: 13, fontWeight: "700", color: C.text },
  phaseNavCount: { fontSize: 11, fontWeight: "600", color: C.muted },
  progressTrack: { flex: 1, height: 8, backgroundColor: C.bg3, borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: C.gold, borderRadius: 4 },
  xpBadge: { backgroundColor: C.goldDim, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  xpBadgeText: { fontSize: 13, fontWeight: "800", color: C.gold },
  xpPopup: { position: "absolute", top: 60, right: 20, backgroundColor: C.gold, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 8, zIndex: 100 },
  xpPopupText: { color: "#fff", fontSize: 16, fontWeight: "900" },
  scroll: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 40, flexGrow: 1 },
  cardInner: { paddingTop: 4 },
  cardEmoji: { fontSize: 24, marginBottom: 4 },
  label: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 8 },

  // Hook
  heroImage: { width: "100%", height: 220, borderRadius: 18, marginBottom: 16 },
  heroPlaceholder: { width: "100%", height: 180, borderRadius: 18, backgroundColor: C.bg2, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  hookChapter: { fontSize: 11, fontWeight: "900", color: C.muted, letterSpacing: 3 },
  hookTitle: { fontFamily: SERIF, fontSize: 28, fontWeight: "700", color: C.text, marginTop: 4 },
  hookDesc: { fontSize: 15, color: C.textSec, lineHeight: 22, marginTop: 8 },
  missionBox: { backgroundColor: C.goldDim, borderRadius: 14, borderLeftWidth: 3, borderLeftColor: C.gold, padding: 16, marginTop: 16 },
  missionLabel: { fontSize: 9, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 4 },
  missionText: { fontSize: 14, color: C.text, lineHeight: 20 },

  // Interactive dialog
  dialogSituation: { fontSize: 14, color: C.gold, backgroundColor: C.goldDim, borderRadius: 12, padding: 14, marginBottom: 16, lineHeight: 20 },
  dialogChoiceBox: { marginTop: 12 },
  dialogChoiceTitle: { fontSize: 14, fontWeight: "700", color: C.text, marginBottom: 10 },
  dialogChoice: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1.5, borderColor: C.goldLine, padding: 16, marginBottom: 10 },
  dialogChoiceText: { fontSize: 16, fontWeight: "600", color: C.text },
  npcPlayBtn: { backgroundColor: C.goldDim, borderRadius: 14, borderWidth: 1, borderColor: C.goldLine, padding: 16, alignItems: "center", marginTop: 8 },
  npcPlayText: { fontSize: 14, fontWeight: "700", color: C.gold },

  // Listen - big play
  bigPlayBtn: { backgroundColor: C.gold, borderRadius: 18, paddingVertical: 20, alignItems: "center", marginBottom: 16 },
  bigPlayIcon: { fontSize: 28, color: "#fff" },
  bigPlayText: { fontSize: 16, fontWeight: "700", color: "#fff", marginTop: 4 },

  // Listen interactive (kept for future use)
  listenCurrentLine: { marginTop: 12 },
  listenYourTurn: { fontSize: 13, fontWeight: "700", color: C.gold, marginBottom: 8 },
  listenNpcTurn: { fontSize: 13, fontWeight: "700", color: C.purple, marginBottom: 8 },
  listenLineCard: { backgroundColor: C.goldDim, borderRadius: 14, borderWidth: 1, borderColor: C.goldLine, padding: 18, marginBottom: 12 },
  listenLineGerman: { fontSize: 20, fontWeight: "700", color: C.text },
  listenLineEnglish: { fontSize: 14, color: C.muted, marginTop: 6, fontStyle: "italic" },
  listenPlayLine: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16, marginBottom: 12 },
  listenPlayIcon: { fontSize: 24, color: C.gold },
  listenPlayGerman: { fontSize: 18, fontWeight: "700", color: C.text },
  listenPlayEnglish: { fontSize: 13, color: C.muted, marginTop: 4, fontStyle: "italic" },

  // Audio
  audioPlayBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, backgroundColor: C.card, borderRadius: 14, borderWidth: 1.5, borderColor: C.goldLine, padding: 16, marginBottom: 10 },
  audioPlayIcon: { fontSize: 20, color: C.gold },
  audioPlayText: { fontSize: 15, fontWeight: "700", color: C.gold },
  tapWordHint: { fontSize: 12, color: C.muted, marginBottom: 10 },
  tappableWord: { color: C.gold, textDecorationLine: "underline", fontWeight: "600" },
  wordPopup: { backgroundColor: C.card, borderRadius: 14, borderWidth: 2, borderColor: C.gold, padding: 18, marginVertical: 10, alignItems: "center" },
  wordPopupDe: { fontSize: 20, fontWeight: "800", color: C.text },
  wordPopupEn: { fontSize: 16, color: C.gold, marginTop: 4 },
  wordPopupClose: { fontSize: 11, color: C.muted, marginTop: 8 },

  // Listen / Chat bubbles
  dialogBox: { marginBottom: 16 },
  chatBubble: { borderRadius: 16, padding: 14, marginBottom: 8, maxWidth: "85%" },
  bubbleLeft: { backgroundColor: C.card, borderRadius: 16, borderTopLeftRadius: 4, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 8, maxWidth: "85%", alignSelf: "flex-start" },
  bubbleRight: { backgroundColor: C.gold, borderRadius: 16, borderTopRightRadius: 4, padding: 14, marginBottom: 8, maxWidth: "85%", alignSelf: "flex-end" },
  bubbleSpeaker: { fontSize: 10, fontWeight: "800", color: C.muted, marginBottom: 4 },
  bubbleText: { fontSize: 15, color: C.text, lineHeight: 22 },
  keyWordsBox: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16 },
  keyWordsTitle: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 10 },
  keyWordRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: C.bg2 },
  keyWordDe: { fontSize: 15, fontWeight: "700", color: C.text },
  keyWordEn: { fontSize: 14, color: C.muted },

  // Quiz
  quizQ: { fontFamily: SERIF, fontSize: 20, fontWeight: "700", color: C.text, marginBottom: 16, lineHeight: 28 },
  optBtn: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1.5, borderColor: C.border, padding: 18, marginBottom: 12, flexDirection: "row", alignItems: "center", minHeight: 56 },
  optCorrect: { borderColor: C.green, backgroundColor: C.greenDim },
  optWrong: { borderColor: C.red, backgroundColor: C.redDim },
  optText: { fontSize: 16, color: C.text, flex: 1 },
  correctFeedback: { fontSize: 14, color: C.green, fontWeight: "700", marginTop: 8 },
  wrongFeedback: { fontSize: 14, color: C.red, fontWeight: "600", marginTop: 8 },

  // Match (columns)
  matchColumns: { flexDirection: "row", gap: 12 },
  matchCol: { flex: 1 },
  matchColTitle: { fontSize: 10, fontWeight: "800", color: C.muted, letterSpacing: 1.5, marginBottom: 8, textAlign: "center" },
  matchItem: { backgroundColor: C.card, borderRadius: 12, borderWidth: 1.5, borderColor: C.border, padding: 14, marginBottom: 8, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 6 },
  matchItemSelected: { borderColor: C.gold, backgroundColor: C.goldDim },
  matchItemDone: { borderColor: C.green, backgroundColor: C.greenDim },
  matchItemText: { fontSize: 14, fontWeight: "600", color: C.text },
  matchHint: { fontSize: 13, color: C.muted, marginBottom: 14 },
  matchRow: { flexDirection: "row", alignItems: "center", marginBottom: 10, gap: 10 },
  matchDe: { flex: 1, backgroundColor: C.card, borderRadius: 12, borderWidth: 1.5, borderColor: C.border, padding: 12, alignItems: "center" },
  matchDone: { borderColor: C.green, backgroundColor: C.greenDim },
  matchDeText: { fontSize: 15, fontWeight: "700", color: C.text },
  matchArrow: { fontSize: 16, color: C.muted },
  matchEn: { flex: 1, backgroundColor: C.bg2, borderRadius: 12, padding: 12, alignItems: "center" },
  matchEnText: { fontSize: 14, color: C.textSec },

  // Scene
  sceneSituation: { backgroundColor: C.goldDim, borderRadius: 12, padding: 14, marginBottom: 12 },
  sceneSituationText: { fontSize: 14, color: C.gold, lineHeight: 20 },
  sceneProgress: { fontSize: 11, fontWeight: "700", color: C.muted, marginBottom: 12 },
  useItCard: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 20, marginBottom: 14 },
  useItSentence: { fontSize: 20, fontWeight: "700", color: C.text, textAlign: "center", lineHeight: 28 },
  useItMeaning: { fontSize: 14, color: C.muted, textAlign: "center", marginTop: 8, fontStyle: "italic" },
  sceneImage: { width: "100%", height: 160, borderRadius: 14, marginBottom: 14 },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: { backgroundColor: C.card, borderRadius: 20, borderWidth: 1.5, borderColor: C.border, paddingHorizontal: 18, paddingVertical: 12 },
  chipCorrect: { borderColor: C.green, backgroundColor: C.greenDim },
  chipWrong: { borderColor: C.red, backgroundColor: C.redDim },
  chipText: { fontSize: 15, fontWeight: "600", color: C.text },

  // Grammar
  grammarTitle: { fontFamily: SERIF, fontSize: 22, fontWeight: "700", color: C.text, marginBottom: 12 },
  grammarBox: { backgroundColor: C.card, borderRadius: 14, borderLeftWidth: 3, borderLeftColor: C.purple, padding: 18, marginBottom: 16 },
  grammarText: { fontSize: 15, color: C.text, lineHeight: 24 },

  // Conjugation table (like Grammatik aktiv)
  conjugTable: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, overflow: "hidden", marginBottom: 16 },
  conjugTitle: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, padding: 14, paddingBottom: 8 },
  conjugRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 10, borderTopWidth: 1, borderTopColor: C.bg2 },
  conjugPerson: { width: 70, fontSize: 13, fontWeight: "800", color: C.purple },
  conjugForm: { width: 80, fontSize: 16, fontWeight: "700", color: C.text },
  conjugExample: { flex: 1, fontSize: 12, color: C.muted, fontStyle: "italic" },

  // Common mistakes
  mistakesBox: { backgroundColor: C.redDim, borderRadius: 14, borderWidth: 1, borderColor: C.redLine, padding: 16, marginBottom: 16 },
  mistakesTitle: { fontSize: 10, fontWeight: "900", color: C.red, letterSpacing: 2, marginBottom: 12 },
  mistakeRow: { marginBottom: 12 },
  mistakeWrong: { fontSize: 14, color: C.red, fontWeight: "600", textDecorationLine: "line-through" },
  mistakeRight: { fontSize: 14, color: C.green, fontWeight: "700", marginTop: 4 },
  mistakeExpl: { fontSize: 12, color: C.muted, marginTop: 4, fontStyle: "italic" },
  mnemonicBox: { backgroundColor: C.greenDim, borderRadius: 12, padding: 14 },
  mnemonicText: { fontSize: 14, color: C.green, lineHeight: 20 },
  ruleCard: { backgroundColor: C.blueDim, borderRadius: 12, padding: 14, marginBottom: 14 },
  ruleCardText: { fontSize: 14, color: C.blue, lineHeight: 20 },

  // Vocab
  vocabHint: { fontSize: 13, color: C.muted, marginBottom: 12 },
  vocabCard: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: C.card, borderRadius: 12, borderWidth: 1.5, borderColor: C.border, padding: 16, marginBottom: 8 },
  vocabDe: { fontSize: 16, fontWeight: "700", color: C.text },
  vocabEn: { fontSize: 14, color: C.green, fontWeight: "600" },
  vocabFlip: { fontSize: 12, color: C.muted },
  phraseRow: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: C.bg2 },
  phraseDe: { fontSize: 15, fontWeight: "700", color: C.text },
  phraseEn: { fontSize: 13, color: C.muted, marginTop: 2 },

  // Write exercise
  writeInstruction: { fontSize: 14, color: C.textSec, marginBottom: 16 },
  writeTask: { marginBottom: 20 },
  writePrompt: { fontSize: 16, fontWeight: "700", color: C.text, marginBottom: 10, lineHeight: 24 },
  writeInput: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1.5, borderColor: C.border, padding: 16, fontSize: 16, color: C.text, minHeight: 52 },
  writeInputCorrect: { borderColor: C.green, backgroundColor: C.greenDim },
  writeInputWrong: { borderColor: C.red, backgroundColor: C.redDim },
  writeCheckBtn: { backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.gold, paddingVertical: 12, alignItems: "center", marginTop: 10 },
  writeCheckText: { fontSize: 14, fontWeight: "700", color: C.gold },
  writeExpected: { fontSize: 16, fontWeight: "700", color: C.green, backgroundColor: C.greenDim, borderRadius: 10, padding: 12, marginTop: 6 },

  // Pronunciation
  pronSubtitle: { fontSize: 14, color: C.textSec, marginBottom: 16 },
  pronDots: { flexDirection: "row", justifyContent: "center", gap: 8, marginBottom: 20 },
  pronDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.bg3 },
  pronDotDone: { backgroundColor: C.green },
  pronDotActive: { borderWidth: 2, borderColor: C.gold, backgroundColor: C.card },
  pronCard: { backgroundColor: C.card, borderRadius: 20, borderWidth: 1, borderColor: C.border, padding: 28, alignItems: "center", marginBottom: 16 },
  pronWord: { fontFamily: SERIF, fontSize: 28, fontWeight: "700", color: C.text, textAlign: "center" },
  pronMeaning: { fontSize: 14, color: C.muted, marginTop: 6, textAlign: "center" },
  pronListenBtn: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: C.goldDim, borderRadius: 14, borderWidth: 1, borderColor: C.goldLine, paddingHorizontal: 24, paddingVertical: 14, marginTop: 20 },
  pronListenIcon: { fontSize: 20 },
  pronListenText: { fontSize: 15, fontWeight: "700", color: C.gold },
  pronStepHint: { fontSize: 13, color: C.muted, textAlign: "center", marginTop: 12, lineHeight: 20 },
  bigMicBtn: { backgroundColor: C.gold, borderRadius: 20, paddingVertical: 24, alignItems: "center", marginTop: 12 },
  bigMicIcon: { fontSize: 32, color: "#fff" },
  bigMicText: { fontSize: 16, fontWeight: "700", color: "#fff", marginTop: 6 },
  pronActions: { flexDirection: "row", gap: 12, marginTop: 12, width: "100%" },
  pronSkipBtn: { flex: 1, backgroundColor: C.greenDim, borderRadius: 14, borderWidth: 1, borderColor: C.greenLine, paddingVertical: 14, alignItems: "center" },
  pronSkipText: { fontSize: 14, fontWeight: "700", color: C.green },
  pronTips: { backgroundColor: C.bg2, borderRadius: 14, padding: 16, marginBottom: 12 },
  pronTipsTitle: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 10 },
  pronTipRow: { flexDirection: "row", gap: 10, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: C.border },
  pronTipRule: { fontSize: 13, fontWeight: "800", color: C.text, width: 70 },
  pronTipTrick: { fontSize: 13, color: C.muted, flex: 1 },
  pronComplete: { backgroundColor: C.greenDim, borderRadius: 14, padding: 16, alignItems: "center" },
  pronCompleteText: { fontSize: 15, fontWeight: "700", color: C.green },

  // Word Order
  wordOrderHint: { fontSize: 14, color: C.textSec, marginBottom: 12 },
  wordOrderResult: { backgroundColor: C.card, borderRadius: 14, borderWidth: 2, borderColor: C.border, borderStyle: "dashed", padding: 18, marginBottom: 14, minHeight: 56, justifyContent: "center" },
  wordOrderText: { fontSize: 18, fontWeight: "700", color: C.text, textAlign: "center" },
  wordOrderPlaceholder: { fontSize: 14, color: C.muted, textAlign: "center" },
  wordOrderChips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 14 },
  wordOrderChip: { backgroundColor: C.goldDim, borderRadius: 12, borderWidth: 1, borderColor: C.goldLine, paddingHorizontal: 16, paddingVertical: 10 },
  wordOrderChipText: { fontSize: 15, fontWeight: "700", color: C.gold },
  wordOrderActions: { flexDirection: "row", gap: 10 },
  resetBtn: { flex: 1, backgroundColor: C.bg2, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  resetBtnText: { fontSize: 14, fontWeight: "700", color: C.muted },
  checkBtn: { flex: 1, backgroundColor: C.gold, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  checkBtnText: { fontSize: 14, fontWeight: "700", color: "#fff" },

  // Chat
  chatBox: { marginBottom: 12, minHeight: 80 },
  characterBadge: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.goldLine, padding: 14, marginBottom: 14 },
  characterName: { fontSize: 16, fontWeight: "800", color: C.text },
  characterRole: { fontSize: 12, color: C.muted },
  suggestBox: { marginBottom: 12 },
  suggestTitle: { fontSize: 12, color: C.muted, marginBottom: 8 },
  suggestChips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  suggestChip: { backgroundColor: C.goldDim, borderRadius: 20, borderWidth: 1, borderColor: C.goldLine, paddingHorizontal: 14, paddingVertical: 8 },
  suggestText: { fontSize: 13, fontWeight: "600", color: C.gold },
  chatInputRow: { flexDirection: "row", gap: 8, marginBottom: 8 },
  chatInput: { flex: 1, backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, color: C.text },
  micBtn: { width: 48, height: 48, borderRadius: 14, backgroundColor: C.bg2, borderWidth: 1, borderColor: C.border, alignItems: "center", justifyContent: "center" },
  micBtnText: { fontSize: 20 },
  sendBtn: { width: 48, height: 48, borderRadius: 14, backgroundColor: C.gold, alignItems: "center", justifyContent: "center" },
  sendBtnText: { fontSize: 20, fontWeight: "800", color: "#fff" },
  chatSuccess: { fontSize: 15, fontWeight: "700", color: C.green, textAlign: "center", marginVertical: 12 },
  chatProgress: { fontSize: 12, color: C.muted, textAlign: "center", marginTop: 8 },

  // Self-rate
  rateTitle: { fontFamily: SERIF, fontSize: 20, fontWeight: "700", color: C.text, marginBottom: 8 },
  rateDesc: { fontSize: 14, color: C.muted, marginBottom: 20 },
  rateRow: { flexDirection: "row", justifyContent: "center", gap: 12 },
  rateStar: { width: 48, height: 48, borderRadius: 24, backgroundColor: C.bg2, borderWidth: 1, borderColor: C.border, alignItems: "center", justifyContent: "center" },
  rateStarActive: { backgroundColor: C.goldDim, borderColor: C.gold },
  rateStarText: { fontSize: 24, color: C.muted },
  rateLabels: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 8, marginTop: 8 },
  rateLabelText: { fontSize: 11, color: C.muted },
  rateFeedback: { backgroundColor: C.greenDim, borderRadius: 14, padding: 16, marginTop: 16 },
  rateFeedbackText: { fontSize: 14, color: C.green, lineHeight: 21 },
  rateAction: { backgroundColor: C.goldDim, borderRadius: 12, borderWidth: 1, borderColor: C.goldLine, padding: 14, marginTop: 10, alignItems: "center" },
  rateActionText: { fontSize: 13, fontWeight: "700", color: C.gold },

  // Finish
  finishTitle: { fontFamily: SERIF, fontSize: 28, fontWeight: "700", color: C.text },
  finishSub: { fontSize: 14, color: C.muted, marginTop: 4 },
  finishStats: { flexDirection: "row", gap: 24, marginTop: 24 },
  finishStat: { alignItems: "center" },
  finishStatNum: { fontSize: 24, fontWeight: "900", color: C.gold },
  finishStatLabel: { fontSize: 11, color: C.muted, marginTop: 2 },
  rewardBox: { backgroundColor: C.goldDim, borderRadius: 16, borderWidth: 1, borderColor: C.goldLine, paddingVertical: 16, paddingHorizontal: 24, marginTop: 16, alignItems: "center" },
  rewardText: { fontSize: 18, fontWeight: "700", color: C.gold },
  xpExplain: { backgroundColor: C.bg2, borderRadius: 14, padding: 16, marginTop: 16, width: "100%" },
  xpExplainTitle: { fontSize: 9, fontWeight: "900", color: C.muted, letterSpacing: 2, marginBottom: 10 },
  xpExplainText: { fontSize: 13, color: C.textSec, lineHeight: 22 },
  nextPreview: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.goldLine, padding: 16, marginTop: 16, width: "100%", alignItems: "center" },
  nextPreviewLabel: { fontSize: 9, fontWeight: "900", color: C.gold, letterSpacing: 2 },
  nextPreviewTitle: { fontSize: 16, fontWeight: "700", color: C.text, marginTop: 6 },
  finishBtn: { backgroundColor: C.gold, borderRadius: 16, paddingVertical: 18, paddingHorizontal: 40, marginTop: 20 },
  finishBtnText: { fontSize: 17, fontWeight: "800", color: "#fff" },

  // Next button (inline, used within cards)
  nextBtn: { backgroundColor: C.gold, borderRadius: 14, paddingVertical: 16, alignItems: "center", marginTop: 20 },
  nextBtnText: { fontSize: 16, fontWeight: "800", color: "#fff" },

  // Fixed bottom bar
  bottomBar: { flexDirection: "row", gap: 10, paddingHorizontal: 20, paddingVertical: 12, paddingBottom: 24, borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.bg },
  bottomBackBtn: { paddingHorizontal: 20, paddingVertical: 16, borderRadius: 14, backgroundColor: C.bg2, alignItems: "center", justifyContent: "center" },
  bottomBackText: { fontSize: 14, fontWeight: "700", color: C.muted },
  bottomBtn: { flex: 2, backgroundColor: C.gold, borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  bottomBtnText: { fontSize: 16, fontWeight: "800", color: "#fff" },
});
