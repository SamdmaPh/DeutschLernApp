import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, StatusBar, Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ElevenLabs, VOICES } from "../services/elevenlabs";
import { Progress } from "../services/progress";
import { SRS } from "../services/srs";
import { C, SAFE_TOP, SERIF } from "../theme";

// ═══ LESSON SCRIPTS ═══
// Each lesson is a conversation script with explanations
const LESSON_SCRIPTS: Record<string, any> = {
  "a1-0-1": {
    title: "Arrival at the Airport",
    character: "Klaus",
    characterRole: "Taxi driver",
    characterEmoji: "🚕",
    characterVoice: VOICES.male,
    intro: "You just landed in Berlin. You don't speak any German yet. A friendly taxi driver named Klaus is waiting outside. Let's get you to your hostel!",
    steps: [
      {
        type: "npc_speaks",
        german: "Guten Tag!",
        english: "Good day!",
        explain: "This is how Germans greet people during the day. 'Guten' means 'good' and 'Tag' means 'day'.",
        newWords: [{ word: "Guten Tag", meaning: "Good day" }],
      },
      {
        type: "user_speaks",
        prompt: "Say 'Good day' back to Klaus:",
        target: "Guten Tag",
        hint: "Guten Tag",
        explain: "Great! You just greeted someone in German for the first time!",
      },
      {
        type: "npc_speaks",
        german: "Wohin möchten Sie?",
        english: "Where would you like to go?",
        explain: "'Wohin' means 'where to'. He's asking your destination. 'Sie' is the formal 'you' — used with strangers.",
        newWords: [{ word: "Wohin", meaning: "Where to" }, { word: "Sie", meaning: "You (formal)" }],
      },
      {
        type: "user_speaks",
        prompt: "Tell him to go to the hostel. Say 'To the hostel, please':",
        target: "Zum Hostel, bitte",
        hint: "Zum Hostel, bitte",
        explain: "'Zum' means 'to the'. 'Bitte' means 'please'. You can use 'Zum [place], bitte' to go anywhere!",
        newWords: [{ word: "bitte", meaning: "please" }, { word: "Zum", meaning: "to the" }],
      },
      {
        type: "npc_speaks",
        german: "Alles klar. Willkommen in Berlin!",
        english: "Got it. Welcome to Berlin!",
        explain: "'Alles klar' means 'all clear' or 'got it'. 'Willkommen' means 'welcome'. Notice the W sounds like a V — 'Villkommen'!",
        newWords: [{ word: "Willkommen", meaning: "Welcome" }, { word: "Alles klar", meaning: "Got it / All clear" }],
      },
      {
        type: "user_speaks",
        prompt: "Say 'Thank you':",
        target: "Danke",
        hint: "Danke",
        explain: "'Danke' is 'thank you'. For 'thank you very much', say 'Danke schön'!",
        newWords: [{ word: "Danke", meaning: "Thank you" }],
      },
      {
        type: "npc_speaks",
        german: "Sprechen Sie Deutsch?",
        english: "Do you speak German?",
        explain: "'Sprechen' means 'to speak'. He's asking if you speak German. The polite form uses 'Sie' again.",
        newWords: [{ word: "Sprechen", meaning: "To speak" }],
      },
      {
        type: "user_speaks",
        prompt: "Tell him 'A little bit':",
        target: "Ein bisschen",
        hint: "Ein bisschen",
        explain: "'Ein bisschen' means 'a little bit'. After this lesson, that's already true!",
        newWords: [{ word: "Ein bisschen", meaning: "A little bit" }],
      },
      {
        type: "npc_speaks",
        german: "Sehr gut! Berlin ist toll!",
        english: "Very good! Berlin is great!",
        explain: "'Sehr gut' means 'very good' — he's impressed! 'Toll' means 'great' or 'awesome'.",
        newWords: [{ word: "Sehr gut", meaning: "Very good" }, { word: "toll", meaning: "great / awesome" }],
      },
    ],
    summary: {
      wordsLearned: ["Guten Tag (Good day)", "bitte (please)", "Danke (thank you)", "Willkommen (Welcome)", "Wohin (Where to)", "Zum (to the)", "Ein bisschen (a little)", "Sehr gut (very good)", "toll (great)"],
      phrasesLearned: ["Guten Tag! — Good day!", "Zum Hostel, bitte. — To the hostel, please.", "Danke! — Thank you!", "Ein bisschen. — A little bit."],
      xp: 80,
    },
  },
};

export default function LiveLessonScreen() {
  const { lessonId } = useLocalSearchParams();
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
  const [phase, setPhase] = useState<"intro" | "conversation" | "summary">("intro");
  const [userInput, setUserInput] = useState("");
  const [stepDone, setStepDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const scrollRef = React.useRef<ScrollView>(null);

  const script = LESSON_SCRIPTS[lessonId as string];
  if (!script) {
    return (
      <View style={s.center}>
        <Text style={s.errorText}>Lesson not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.errorLink}>← Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentStep = script.steps[stepIdx];
  const isLastStep = stepIdx >= script.steps.length - 1;

  const addXP = (amount: number) => {
    setTotalXP(prev => prev + amount);
  };

  const playNPCLine = async (text: string) => {
    setIsPlaying(true);
    await ElevenLabs.playText(text, script.characterVoice);
    setIsPlaying(false);
  };

  const handleUserSubmit = () => {
    const input = userInput.trim().toLowerCase();
    const target = (currentStep?.target || "").toLowerCase();
    const isCorrect = input === target || target.includes(input) && input.length >= 3;

    setHistory([...history, {
      type: "user",
      german: userInput.trim() || currentStep.hint,
      correct: isCorrect,
    }]);

    addXP(isCorrect ? 10 : 5);
    setStepDone(true);
    setUserInput("");
  };

  const handleUseSuggestion = () => {
    setHistory([...history, {
      type: "user",
      german: currentStep.hint,
      correct: true,
    }]);
    addXP(5);
    setStepDone(true);
  };

  const goNextStep = () => {
    if (isLastStep) {
      setPhase("summary");
      return;
    }

    const nextIdx = stepIdx + 1;
    const nextStep = script.steps[nextIdx];

    // If next step is NPC speaking, add to history and auto-play
    if (nextStep.type === "npc_speaks") {
      setHistory(prev => [...prev, {
        type: "npc",
        german: nextStep.german,
        english: nextStep.english,
        explain: nextStep.explain,
        newWords: nextStep.newWords,
      }]);
      playNPCLine(nextStep.german);
    }

    setStepIdx(nextIdx);
    setStepDone(false);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 200);
  };

  // Start conversation
  const startConversation = () => {
    const firstStep = script.steps[0];
    setHistory([{
      type: "npc",
      german: firstStep.german,
      english: firstStep.english,
      explain: firstStep.explain,
      newWords: firstStep.newWords,
    }]);
    playNPCLine(firstStep.german);
    setPhase("conversation");
  };

  // ═══ RENDER ═══

  if (phase === "intro") {
    return (
      <View style={s.root}>
        <StatusBar barStyle="dark-content" />
        <View style={{ height: SAFE_TOP }} />
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={s.closeBtn}>✕</Text>
          </TouchableOpacity>
          <View style={s.xpBadge}><Text style={s.xpText}>⚡{totalXP}</Text></View>
        </View>

        <View style={s.introWrap}>
          <Text style={s.introEmoji}>{script.characterEmoji}</Text>
          <Text style={s.introTitle}>{script.title}</Text>
          <Text style={s.introDesc}>{script.intro}</Text>

          <View style={s.characterCard}>
            <Text style={{ fontSize: 36 }}>{script.characterEmoji}</Text>
            <View>
              <Text style={s.charName}>{script.character}</Text>
              <Text style={s.charRole}>{script.characterRole}</Text>
              <Text style={s.charNote}>Will speak German to you</Text>
            </View>
          </View>

          <View style={s.tipsBox}>
            <Text style={s.tipsTitle}>💡 HOW THIS WORKS</Text>
            <Text style={s.tipsText}>• {script.character} will speak German to you</Text>
            <Text style={s.tipsText}>• You'll see English translations for everything</Text>
            <Text style={s.tipsText}>• When it's your turn, type or speak the German phrase</Text>
            <Text style={s.tipsText}>• Don't worry about mistakes — {script.character} is patient!</Text>
          </View>

          <TouchableOpacity style={s.startBtn} onPress={startConversation} activeOpacity={0.85}>
            <Text style={s.startBtnText}>Start Conversation 🎙</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (phase === "summary") {
    return (
      <View style={s.root}>
        <StatusBar barStyle="dark-content" />
        <View style={{ height: SAFE_TOP }} />
        <ScrollView contentContainerStyle={s.summaryWrap}>
          <Text style={{ fontSize: 64, textAlign: "center" }}>🎉</Text>
          <Text style={s.summaryTitle}>Conversation Complete!</Text>
          <Text style={s.summarySub}>{script.title}</Text>

          <View style={s.summaryStats}>
            <View style={s.summaryStat}>
              <Text style={s.summaryStatNum}>{totalXP + script.summary.xp}</Text>
              <Text style={s.summaryStatLabel}>Total XP</Text>
            </View>
            <View style={s.summaryStat}>
              <Text style={s.summaryStatNum}>{script.summary.wordsLearned.length}</Text>
              <Text style={s.summaryStatLabel}>Words</Text>
            </View>
            <View style={s.summaryStat}>
              <Text style={s.summaryStatNum}>{script.summary.phrasesLearned.length}</Text>
              <Text style={s.summaryStatLabel}>Phrases</Text>
            </View>
          </View>

          <View style={s.summarySection}>
            <Text style={s.summarySectionTitle}>WORDS YOU LEARNED</Text>
            {script.summary.wordsLearned.map((w: string, i: number) => (
              <Text key={i} style={s.summaryWord}>• {w}</Text>
            ))}
          </View>

          <View style={s.summarySection}>
            <Text style={s.summarySectionTitle}>PHRASES YOU CAN SAY</Text>
            {script.summary.phrasesLearned.map((p: string, i: number) => (
              <Text key={i} style={s.summaryPhrase}>"{p}"</Text>
            ))}
          </View>

          <TouchableOpacity style={s.finishBtn} onPress={async () => {
            await Progress.addXP(totalXP + script.summary.xp);
            await Progress.markComplete(lessonId as string);
            const words = script.summary.wordsLearned.map((w: string) => {
              const parts = w.split("(");
              return { word: parts[0].trim(), meaning: parts[1]?.replace(")", "").trim() || "" };
            });
            await SRS.addWordsFromLesson(lessonId as string, words);
            router.back();
          }}>
            <Text style={s.finishBtnText}>Continue your journey →</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // ═══ CONVERSATION ═══
  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: SAFE_TOP }} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.closeBtn}>✕</Text>
        </TouchableOpacity>
        <View style={s.progressTrack}>
          <View style={[s.progressFill, { width: `${((stepIdx + 1) / script.steps.length) * 100}%` }]} />
        </View>
        <View style={s.xpBadge}><Text style={s.xpText}>⚡{totalXP}</Text></View>
      </View>

      {/* Conversation */}
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={s.convScroll}>

        {history.map((item, i) => {
          if (item.type === "npc") {
            return (
              <View key={i}>
                {/* NPC bubble */}
                <View style={s.npcBubble}>
                  <Text style={s.npcName}>{script.character}</Text>
                  <Text style={s.npcGerman}>{item.german}</Text>
                  <Text style={s.npcEnglish}>{item.english}</Text>
                </View>
                {/* Explanation */}
                <View style={s.explainBox}>
                  <Text style={s.explainText}>💡 {item.explain}</Text>
                </View>
                {/* New words */}
                {item.newWords?.map((w: any, j: number) => (
                  <View key={j} style={s.newWordBadge}>
                    <Text style={s.newWordText}>✨ New word: <Text style={s.newWordBold}>{w.word}</Text> = {w.meaning}</Text>
                  </View>
                ))}
                {/* Replay button */}
                <TouchableOpacity style={s.replayBtn} onPress={() => playNPCLine(item.german)} disabled={isPlaying}>
                  <Text style={s.replayBtnText}>{isPlaying ? "⏳ Playing..." : "🔊 Listen again"}</Text>
                </TouchableOpacity>
              </View>
            );
          } else {
            return (
              <View key={i} style={s.userBubble}>
                <Text style={s.userName}>You</Text>
                <Text style={s.userGerman}>{item.german}</Text>
                {item.correct && <Text style={s.userCorrect}>✅</Text>}
              </View>
            );
          }
        })}

        {/* Current step: user input */}
        {currentStep?.type === "user_speaks" && !stepDone && (
          <View style={s.inputSection}>
            <View style={s.yourTurnBox}>
              <Text style={s.yourTurnLabel}>YOUR TURN</Text>
              <Text style={s.yourTurnText}>{currentStep.prompt}</Text>
            </View>

            <View style={s.inputRow}>
              <TextInput
                style={s.input}
                value={userInput}
                onChangeText={setUserInput}
                placeholder="Type in German..."
                placeholderTextColor={C.muted}
                onSubmitEditing={handleUserSubmit}
                returnKeyType="send"
                autoFocus
              />
              <TouchableOpacity style={s.sendBtn} onPress={handleUserSubmit}>
                <Text style={s.sendBtnText}>→</Text>
              </TouchableOpacity>
            </View>

            {/* Suggestion */}
            <TouchableOpacity style={s.suggestionBtn} onPress={handleUseSuggestion}>
              <Text style={s.suggestionText}>💡 Not sure? Use: <Text style={s.suggestionBold}>"{currentStep.hint}"</Text></Text>
            </TouchableOpacity>

            {/* Mic button */}
            <TouchableOpacity style={s.micBtn} onPress={() => {
              if (Platform.OS === "web" && (window as any).webkitSpeechRecognition) {
                const SR = (window as any).webkitSpeechRecognition;
                const recognition = new SR();
                recognition.lang = "de-DE";
                recognition.onresult = (e: any) => setUserInput(e.results[0][0].transcript);
                recognition.start();
              }
            }}>
              <Text style={s.micBtnText}>🎤 Speak instead</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Explanation after user speaks */}
        {currentStep?.type === "user_speaks" && stepDone && (
          <View>
            <View style={s.explainBox}>
              <Text style={s.explainText}>💡 {currentStep.explain}</Text>
            </View>
            {currentStep.newWords?.map((w: any, j: number) => (
              <View key={j} style={s.newWordBadge}>
                <Text style={s.newWordText}>✨ New word: <Text style={s.newWordBold}>{w.word}</Text> = {w.meaning}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom: Continue button */}
      {stepDone && (
        <View style={s.bottomBar}>
          <TouchableOpacity style={s.continueBtn} onPress={goNextStep} activeOpacity={0.85}>
            <Text style={s.continueBtnText}>{isLastStep ? "See what you learned →" : "Continue →"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  center: { flex: 1, backgroundColor: C.bg, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: C.red },
  errorLink: { color: C.gold, fontSize: 16, marginTop: 16 },

  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 10, gap: 10 },
  closeBtn: { color: C.muted, fontSize: 22, width: 28 },
  progressTrack: { flex: 1, height: 8, backgroundColor: C.bg3, borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: C.gold, borderRadius: 4 },
  xpBadge: { backgroundColor: C.goldDim, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  xpText: { fontSize: 13, fontWeight: "800", color: C.gold },

  // Intro
  introWrap: { flex: 1, paddingHorizontal: 24, paddingTop: 20, alignItems: "center" },
  introEmoji: { fontSize: 64, marginBottom: 16 },
  introTitle: { fontFamily: SERIF, fontSize: 26, fontWeight: "700", color: C.text, textAlign: "center" },
  introDesc: { fontSize: 15, color: C.textSec, textAlign: "center", lineHeight: 22, marginTop: 12, marginBottom: 24 },
  characterCard: { flexDirection: "row", alignItems: "center", gap: 16, backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.goldLine, padding: 18, width: "100%", marginBottom: 20 },
  charName: { fontSize: 18, fontWeight: "800", color: C.text },
  charRole: { fontSize: 13, color: C.muted, marginTop: 2 },
  charNote: { fontSize: 12, color: C.gold, marginTop: 4, fontWeight: "600" },
  tipsBox: { backgroundColor: C.bg2, borderRadius: 16, padding: 18, width: "100%", marginBottom: 24 },
  tipsTitle: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 10 },
  tipsText: { fontSize: 14, color: C.textSec, lineHeight: 22 },
  startBtn: { backgroundColor: C.gold, borderRadius: 16, paddingVertical: 18, paddingHorizontal: 40 },
  startBtnText: { fontSize: 17, fontWeight: "800", color: "#fff" },

  // Conversation
  convScroll: { paddingHorizontal: 20, paddingBottom: 100 },

  npcBubble: { backgroundColor: C.card, borderRadius: 18, borderTopLeftRadius: 4, borderWidth: 1, borderColor: C.border, padding: 16, marginTop: 16, maxWidth: "88%" },
  npcName: { fontSize: 11, fontWeight: "800", color: C.gold, marginBottom: 6 },
  npcGerman: { fontSize: 18, fontWeight: "700", color: C.text, lineHeight: 26 },
  npcEnglish: { fontSize: 14, color: C.muted, marginTop: 6, fontStyle: "italic" },

  userBubble: { backgroundColor: C.gold, borderRadius: 18, borderTopRightRadius: 4, padding: 16, marginTop: 12, alignSelf: "flex-end", maxWidth: "88%", flexDirection: "row", alignItems: "center", gap: 8 },
  userName: { fontSize: 11, fontWeight: "800", color: "rgba(255,255,255,0.7)", position: "absolute", top: 6, left: 16 },
  userGerman: { fontSize: 17, fontWeight: "700", color: "#fff", marginTop: 14 },
  userCorrect: { fontSize: 16 },

  explainBox: { backgroundColor: C.blueDim, borderRadius: 12, padding: 14, marginTop: 10 },
  explainText: { fontSize: 14, color: C.blue, lineHeight: 21 },

  newWordBadge: { backgroundColor: C.goldDim, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8, marginTop: 6, alignSelf: "flex-start" },
  newWordText: { fontSize: 13, color: C.gold },
  newWordBold: { fontWeight: "800" },

  replayBtn: { alignSelf: "flex-start", marginTop: 8, paddingVertical: 6 },
  replayBtnText: { fontSize: 13, color: C.muted, fontWeight: "600" },

  // Input
  inputSection: { marginTop: 16 },
  yourTurnBox: { backgroundColor: C.greenDim, borderRadius: 14, borderLeftWidth: 3, borderLeftColor: C.green, padding: 16, marginBottom: 12 },
  yourTurnLabel: { fontSize: 10, fontWeight: "900", color: C.green, letterSpacing: 2, marginBottom: 4 },
  yourTurnText: { fontSize: 15, color: C.text, lineHeight: 22 },

  inputRow: { flexDirection: "row", gap: 8 },
  input: { flex: 1, backgroundColor: C.card, borderRadius: 14, borderWidth: 1.5, borderColor: C.border, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: C.text },
  sendBtn: { width: 52, height: 52, borderRadius: 14, backgroundColor: C.gold, alignItems: "center", justifyContent: "center" },
  sendBtnText: { fontSize: 22, fontWeight: "800", color: "#fff" },

  suggestionBtn: { backgroundColor: C.bg2, borderRadius: 12, padding: 14, marginTop: 10 },
  suggestionText: { fontSize: 13, color: C.muted },
  suggestionBold: { fontWeight: "800", color: C.gold },

  micBtn: { backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 14, marginTop: 8, alignItems: "center" },
  micBtnText: { fontSize: 14, fontWeight: "600", color: C.text },

  // Bottom
  bottomBar: { paddingHorizontal: 20, paddingVertical: 12, paddingBottom: 24, borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.bg },
  continueBtn: { backgroundColor: C.gold, borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  continueBtnText: { fontSize: 16, fontWeight: "800", color: "#fff" },

  // Summary
  summaryWrap: { padding: 24, paddingBottom: 60, alignItems: "center" },
  summaryTitle: { fontFamily: SERIF, fontSize: 28, fontWeight: "700", color: C.text, marginTop: 12 },
  summarySub: { fontSize: 14, color: C.muted, marginTop: 4 },
  summaryStats: { flexDirection: "row", gap: 24, marginTop: 24, marginBottom: 24 },
  summaryStat: { alignItems: "center" },
  summaryStatNum: { fontSize: 24, fontWeight: "900", color: C.gold },
  summaryStatLabel: { fontSize: 11, color: C.muted, marginTop: 2 },
  summarySection: { width: "100%", marginBottom: 20 },
  summarySectionTitle: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 10 },
  summaryWord: { fontSize: 14, color: C.text, lineHeight: 24 },
  summaryPhrase: { fontSize: 15, fontWeight: "600", color: C.text, lineHeight: 26 },
  finishBtn: { backgroundColor: C.gold, borderRadius: 16, paddingVertical: 18, paddingHorizontal: 40, marginTop: 12 },
  finishBtnText: { fontSize: 17, fontWeight: "800", color: "#fff" },
});
