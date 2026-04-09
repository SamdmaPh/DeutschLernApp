import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, StatusBar, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ALL_STATIC_LESSONS } from "../data/lessonData";
import { SITUATION_IMAGES } from "../data/images";
import { Progress } from "../services/progress";
import { SRS } from "../services/srs";
import { getStory } from "../data/storyData";
import { C, SAFE_TOP, SERIF } from "../theme";

const BACKEND = "https://deutschlernappbackend2-production.up.railway.app";

// ═══════════════════════════════════════════════════════════════
// LESSON V2 — 7 Screens: Szene, Hören, Lesen, Üben, Sprechen, Schreiben, Abschluss
// Alle 4 Prüfungs-Fertigkeiten abgedeckt
// ═══════════════════════════════════════════════════════════════

export default function LessonV2Screen() {
  const { lessonId } = useLocalSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [totalXP, setTotalXP] = useState(0);

  // Hören state
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [listened, setListened] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  // Lesen state
  const [readAnswers, setReadAnswers] = useState<Record<number, number>>({});

  // Üben state
  const [fillAnswers, setFillAnswers] = useState<Record<number, string>>({});
  const [fillChecked, setFillChecked] = useState<Record<number, boolean>>({});

  // Sprechen state
  const [dialogHistory, setDialogHistory] = useState<{speaker: string; text: string}[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [dlgInput, setDlgInput] = useState("");
  const [dlgPlaying, setDlgPlaying] = useState(false);
  const [questStarted, setQuestStarted] = useState(false);
  const [dlgFeedback, setDlgFeedback] = useState("");

  // Schreiben state
  const [writeText, setWriteText] = useState("");
  const [writeSubmitted, setWriteSubmitted] = useState(false);
  const [writeFeedback, setWriteFeedback] = useState("");

  const scrollRef = React.useRef<ScrollView>(null);

  const lesson = ALL_STATIC_LESSONS.find((l) => l.id === lessonId) as any;
  if (!lesson) {
    return (
      <View style={s.center}><Text style={{ color: C.red, fontSize: 16 }}>Lektion nicht gefunden</Text>
        <TouchableOpacity onPress={() => router.back()}><Text style={{ color: C.gold, marginTop: 12 }}>← Zurück</Text></TouchableOpacity>
      </View>
    );
  }

  const img = SITUATION_IMAGES[lesson.id] || "";
  const story = getStory(lesson.id);
  const quest = story.quest;
  const addXP = (n: number) => setTotalXP(prev => prev + n);

  // Quest goal tracking
  const completedGoals = quest ? quest.goals.filter(goal =>
    dialogHistory.some(msg => msg.speaker === "You" && goal.keywords.some(kw => msg.text.toLowerCase().includes(kw)))
  ).map(g => g.id) : [];
  const allGoalsDone = quest ? completedGoals.length >= quest.goals.length : dialogHistory.length >= 6;

  // Parse lesson data
  const fullGerman = lesson.listening?.transcript?.split("\n").filter(Boolean).map((l: string) => { const p = l.split(":"); return p.length > 1 ? p.slice(1).join(":").trim() : l; }).join(" ") || "";
  const fullEnglish = lesson.listening?.english_translation?.split("\n").filter(Boolean).map((l: string) => { const p = l.split(":"); return p.length > 1 ? p.slice(1).join(":").trim() : l; }).join(" ") || "";
  const highlights = lesson.listening?.vocabulary_highlighted || [];
  const compTasks = lesson.exercises?.[0]?.tasks?.filter((t: any) => t.options) || [];
  const prodTasks = lesson.exercises?.[2]?.tasks || [];

  // Navigation
  const TOTAL = 7;
  const goNext = () => { if (step < TOTAL - 1) { setStep(step + 1); scrollRef.current?.scrollTo({ y: 0 }); } };
  const goBack = () => { if (step > 0) { setStep(step - 1); scrollRef.current?.scrollTo({ y: 0 }); } };
  const pct = ((step + 1) / TOTAL) * 100;

  // TTS helper
  const playTTS = async (text: string, voice = "male") => {
    try {
      const res = await fetch(`${BACKEND}/api/speak`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text, voice }) });
      const data = await res.json();
      if (data.audio) {
        const A = await import("expo-av");
        await A.Audio.setAudioModeAsync({ playsInSilentModeIOS: true, allowsRecordingIOS: false });
        await A.Audio.Sound.createAsync({ uri: `data:audio/mpeg;base64,${data.audio}` }, { shouldPlay: true });
      }
    } catch {}
  };

  // Quest helpers
  const startQuest = async () => {
    setQuestStarted(true); setChatLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/conversation`, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: `Du bist ${story.npcName}. Situation: "${lesson.description}". Sprich einfaches Deutsch (A1). Begrüße den Schüler. Nur 1-2 kurze Sätze.` }], topic: lesson.description, level: "A1" }) });
      const data = await res.json();
      if (data.text) { setDialogHistory([{ speaker: story.npcName, text: data.text }]); playTTS(data.text); }
    } catch {} setChatLoading(false);
  };

  const sendMessage = async () => {
    if (!dlgInput.trim() || chatLoading) return;
    const userText = dlgInput.trim(); setDlgInput(""); setChatLoading(true);
    setDialogHistory(h => [...h, { speaker: "You", text: userText }]); addXP(10);
    try {
      const allMsgs = [...dialogHistory, { speaker: "You", text: userText }].map(m => ({ role: m.speaker === "You" ? "user" as const : "assistant" as const, content: m.text }));
      const res = await fetch(`${BACKEND}/api/conversation`, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMsgs, topic: lesson.description, level: "A1" }) });
      const data = await res.json();
      if (data.text) { setDialogHistory(h => [...h, { speaker: story.npcName, text: data.text }]); playTTS(data.text);
        if (data.corrections?.length) setDlgFeedback(data.corrections.map((c: any) => `"${c.original}" → "${c.corrected}"`).join("\n"));
      }
    } catch {} setChatLoading(false); scrollRef.current?.scrollToEnd?.({ animated: true });
  };

  // Write submission
  const submitWriting = async () => {
    if (!writeText.trim()) return;
    setWriteSubmitted(true); addXP(15);
    try {
      const res = await fetch(`${BACKEND}/api/conversation`, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: `Der Schüler (A1 Niveau) hat folgende Nachricht geschrieben: "${writeText}". Aufgabe war: "${lesson.description}". Gib kurzes Feedback auf Deutsch: 1) War es verständlich? 2) Korrekturen wenn nötig. 3) Lobe den Schüler. Antworte in 2-3 Sätzen.` }], topic: "writing feedback", level: "A1" }) });
      const data = await res.json();
      if (data.text) setWriteFeedback(data.text);
    } catch { setWriteFeedback("Gut gemacht! Weiter so."); }
  };

  // Phase labels
  const PHASE_LABELS = ["Szene", "Hören", "Lesen", "Üben", "Sprechen", "Schreiben", "Abschluss"];

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: SAFE_TOP }} />

      {/* Top bar */}
      <View style={s.topRow}>
        <TouchableOpacity onPress={() => router.back()}><Text style={s.closeX}>✕</Text></TouchableOpacity>
        <View style={s.progressTrack}><View style={[s.progressFill, { width: `${pct}%` }]} /></View>
        <Text style={s.phaseLabel}>{PHASE_LABELS[step]}</Text>
      </View>

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* ═══ 1. SZENE ═══ */}
        {step === 0 && (
          <View>
            {img ? (
              <View style={{ borderRadius: 20, overflow: "hidden", marginBottom: 4 }}>
                <Image source={{ uri: img }} style={{ width: "100%", height: 240 }} resizeMode="cover" />
                <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: "rgba(0,0,0,0.6)" }}>
                  <Text style={{ fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 3 }}>LEKTION {lesson.order_index}</Text>
                  <Text style={{ fontFamily: SERIF, fontSize: 22, fontWeight: "700", color: "#FFF", marginTop: 4 }}>{lesson.title_de || lesson.title}</Text>
                </View>
              </View>
            ) : (
              <View style={{ alignItems: "center", marginBottom: 16 }}>
                <Text style={{ fontSize: 56 }}>{story.hookEmoji}</Text>
                <Text style={{ fontFamily: SERIF, fontSize: 24, fontWeight: "700", color: C.text, marginTop: 8, textAlign: "center" }}>{lesson.title_de || lesson.title}</Text>
              </View>
            )}
            <View style={s.storyBox}><Text style={s.storyText}>{story.hookNarration}</Text></View>
            <View style={s.npcBox}>
              <Text style={{ fontSize: 36 }}>{story.npcEmoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 11, fontWeight: "900", color: C.gold, letterSpacing: 1.5 }}>DU TRIFFST</Text>
                <Text style={{ fontSize: 17, fontWeight: "700", color: C.text, marginTop: 2 }}>{story.npcName}</Text>
                <Text style={{ fontSize: 13, color: C.muted, fontStyle: "italic", marginTop: 4 }}>"{story.npcGreeting}"</Text>
              </View>
            </View>
          </View>
        )}

        {/* ═══ 2. HÖREN (Listening) ═══ */}
        {step === 1 && (
          <View>
            <View style={s.transitionBox}><Text style={s.transitionText}>{story.listenIntro}</Text></View>
            <View style={s.darkCard}>
              <Text style={s.darkLabel}>🎧 HÖRTEXT</Text>
              <TouchableOpacity style={s.playBtn} onPress={async () => { setAudioPlaying(true); await playTTS(fullGerman); setAudioPlaying(false); setListened(true); }} disabled={audioPlaying}>
                <Text style={{ fontSize: 24 }}>{audioPlaying ? "🔊" : "▶️"}</Text>
                <Text style={s.playBtnText}>{audioPlaying ? "Hör zu..." : listened ? "Nochmal anhören" : "Anhören"}</Text>
              </TouchableOpacity>
              <Text style={s.darkText}>{fullGerman}</Text>
              {showTranslation ? (
                <View style={s.translationBox}>
                  <Text style={s.translationLabel}>ÜBERSETZUNG</Text>
                  <Text style={s.translationText}>{fullEnglish}</Text>
                </View>
              ) : (
                <TouchableOpacity style={{ marginTop: 16, alignItems: "center" }} onPress={() => setShowTranslation(true)}>
                  <Text style={{ fontSize: 14, color: C.gold }}>Übersetzung anzeigen ↓</Text>
                </TouchableOpacity>
              )}
            </View>
            {highlights.length > 0 && (
              <View style={s.keywordsBox}>
                <Text style={s.keywordsLabel}>SCHLÜSSELWÖRTER</Text>
                {highlights.slice(0, 8).map((h: string, i: number) => {
                  const [de, en] = h.split("::").map((x: string) => x.trim());
                  return (<View key={i} style={s.keywordRow}><Text style={s.keywordDe}>{de}</Text><Text style={s.keywordEn}>{en}</Text></View>);
                })}
              </View>
            )}
          </View>
        )}

        {/* ═══ 3. LESEN (Reading) ═══ */}
        {step === 2 && (
          <View>
            <Text style={s.sectionTitle}>📖 LESEVERSTÄNDNIS</Text>
            <Text style={s.subtitle}>Lies den Text und beantworte die Fragen.</Text>
            <View style={s.readingBox}><Text style={s.readingText}>{fullGerman}</Text></View>
            {compTasks.map((task: any, i: number) => {
              const answered = readAnswers[i] !== undefined;
              const correct = answered && readAnswers[i] === (task.correct ?? task.answer ?? 0);
              return (
                <View key={i} style={s.questionBox}>
                  <Text style={s.questionText}>{i + 1}. {task.question}</Text>
                  {task.options.map((opt: string, oi: number) => (
                    <TouchableOpacity key={oi}
                      style={[s.optBtn, answered && oi === (task.correct ?? task.answer) && s.optCorrect, answered && readAnswers[i] === oi && readAnswers[i] !== (task.correct ?? task.answer) && s.optWrong]}
                      onPress={() => { if (!answered) { setReadAnswers({ ...readAnswers, [i]: oi }); if (oi === (task.correct ?? task.answer)) addXP(5); } }}
                      activeOpacity={answered ? 1 : 0.7}>
                      <Text style={[s.optText, answered && oi === (task.correct ?? task.answer) && { color: C.green, fontWeight: "700" }]}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                  {answered && <Text style={{ fontSize: 13, color: correct ? C.green : C.red, fontWeight: "700", marginTop: 6 }}>{correct ? "✅ Richtig!" : "❌ Nicht ganz."}</Text>}
                </View>
              );
            })}
          </View>
        )}

        {/* ═══ 4. ÜBEN (Grammatik + Vokabeln) ═══ */}
        {step === 3 && (
          <View>
            <Text style={s.sectionTitle}>🔤 ÜBEN</Text>
            {/* Grammatik-Erklärung */}
            <View style={s.grammarCard}>
              <Text style={s.grammarTitle}>{lesson.grammar?.concept}</Text>
              <Text style={s.grammarRule}>{lesson.grammar?.rule}</Text>
            </View>
            {/* Tabelle */}
            {lesson.grammar?.patterns && (
              <View style={s.tableCard}>
                {lesson.grammar.patterns.map((p: any, i: number) => (
                  <View key={i} style={[s.tableRow, i % 2 === 0 && { backgroundColor: C.bg2 }]}>
                    <Text style={s.tableKey}>{p.sound || p.person}</Text>
                    <Text style={s.tableVal}>{p.english_trick || p.example || p.conjugation || ""}</Text>
                  </View>
                ))}
              </View>
            )}
            {/* Platz für illustriertes Bild (manuell generiert) */}
            <View style={s.imagePlaceholder}>
              <Text style={{ fontSize: 40 }}>🖼️</Text>
              <Text style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>Illustriertes Grammatik-Bild</Text>
            </View>
            {/* Lückentext-Übungen */}
            <Text style={[s.sectionTitle, { marginTop: 20 }]}>LÜCKENTEXT</Text>
            {prodTasks.slice(0, 5).map((task: any, i: number) => {
              const checked = fillChecked[i];
              const answer = fillAnswers[i] || "";
              const correct = checked && answer.toLowerCase().trim() === (task.expected || "").toLowerCase().trim();
              return (
                <View key={i} style={s.fillBox}>
                  <Text style={s.fillPrompt}>{task.prompt}</Text>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <TextInput style={[s.fillInput, checked && correct && { borderColor: C.green }, checked && !correct && { borderColor: C.red }]}
                      value={answer} onChangeText={t => setFillAnswers({ ...fillAnswers, [i]: t })} placeholder="..." placeholderTextColor={C.muted} editable={!checked} autoCapitalize="none" />
                    {!checked && answer.trim().length > 0 && (
                      <TouchableOpacity style={s.fillCheckBtn} onPress={() => { setFillChecked({ ...fillChecked, [i]: true }); if (answer.toLowerCase().trim() === (task.expected || "").toLowerCase().trim()) addXP(5); }}>
                        <Text style={s.fillCheckText}>✓</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {checked && <Text style={{ fontSize: 13, color: correct ? C.green : C.red, fontWeight: "600", marginTop: 4 }}>{correct ? "✅ Richtig!" : `→ ${task.expected}`}</Text>}
                </View>
              );
            })}
          </View>
        )}

        {/* ═══ 5. SPRECHEN (Quest) ═══ */}
        {step === 4 && (
          <View>
            {quest && (
              <View style={s.darkCard}>
                <Text style={s.darkLabel}>🎯 QUEST</Text>
                <Text style={{ fontFamily: SERIF, fontSize: 20, fontWeight: "700", color: "#FFF" }}>{quest.title}</Text>
                <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{quest.titleEn}</Text>
                <View style={{ marginTop: 14, gap: 8 }}>
                  {quest.goals.map((goal: any) => {
                    const done = completedGoals.includes(goal.id);
                    return (
                      <View key={goal.id} style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <Text style={{ fontSize: 18 }}>{done ? "✅" : "⬜"}</Text>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 14, color: done ? "#4ADE80" : "#FFF" }}>{goal.text}</Text>
                          <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{goal.textEn}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            {!questStarted && (
              <TouchableOpacity style={s.startQuestBtn} onPress={startQuest}>
                <Text style={{ fontSize: 36 }}>{story.npcEmoji}</Text>
                <Text style={{ fontSize: 17, fontWeight: "900", color: "#FFF", marginTop: 8 }}>Gespräch starten</Text>
              </TouchableOpacity>
            )}
            {dialogHistory.map((msg, i) => (
              <View key={i} style={msg.speaker === "You" ? s.bubbleRight : s.bubbleLeft}>
                <Text style={s.bubbleSpeaker}>{msg.speaker === "You" ? "Du" : msg.speaker}</Text>
                <Text style={[s.bubbleText, msg.speaker === "You" && { color: "#fff" }]}>{msg.text}</Text>
              </View>
            ))}
            {chatLoading && <Text style={{ color: C.muted, fontSize: 13, marginTop: 8 }}>💬 {story.npcName} antwortet...</Text>}
            {dlgFeedback && !chatLoading && (
              <View style={{ backgroundColor: C.goldDim, borderRadius: 12, padding: 12, marginTop: 8, borderWidth: 1, borderColor: C.goldLine }}>
                <Text style={{ fontSize: 11, fontWeight: "800", color: C.gold }}>KORREKTUR</Text>
                <Text style={{ fontSize: 13, color: C.text, marginTop: 4 }}>{dlgFeedback}</Text>
              </View>
            )}
            {questStarted && !allGoalsDone && !chatLoading && quest && (() => {
              const nextGoal = quest.goals.find((g: any) => !completedGoals.includes(g.id));
              return nextGoal ? (
                <View style={{ backgroundColor: C.blueDim, borderRadius: 12, padding: 12, marginTop: 10, borderWidth: 1, borderColor: C.blueLine }}>
                  <Text style={{ fontSize: 10, fontWeight: "800", color: C.blue }}>💡 TIPP</Text>
                  <Text style={{ fontSize: 14, color: C.blue, marginTop: 4 }}>{nextGoal.text}</Text>
                  <Text style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{nextGoal.textEn}</Text>
                </View>
              ) : null;
            })()}
            {questStarted && !allGoalsDone && !chatLoading && (
              <View style={{ marginTop: 16 }}>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <TextInput style={s.chatInput} value={dlgInput} onChangeText={setDlgInput} placeholder="Auf Deutsch sprechen oder tippen..." placeholderTextColor={C.muted} onSubmitEditing={sendMessage} returnKeyType="send" />
                  <TouchableOpacity style={s.sendBtn} onPress={sendMessage}><Text style={{ color: "#FFF", fontSize: 18, fontWeight: "700" }}>→</Text></TouchableOpacity>
                </View>
              </View>
            )}
            {allGoalsDone && questStarted && (
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text style={{ fontSize: 48 }}>🏆</Text>
                <Text style={{ fontFamily: SERIF, fontSize: 20, fontWeight: "700", color: C.text, marginTop: 8 }}>Quest geschafft!</Text>
              </View>
            )}
          </View>
        )}

        {/* ═══ 6. SCHREIBEN (Writing) ═══ */}
        {step === 5 && (
          <View>
            <Text style={s.sectionTitle}>✍️ SCHREIBEN</Text>
            <View style={s.writePromptBox}>
              <Text style={s.writePromptLabel}>AUFGABE</Text>
              <Text style={s.writePromptText}>
                Schreibe eine kurze Nachricht (SMS) an einen Freund:{"\n\n"}
                Du bist gerade in Berlin angekommen.{"\n"}
                • Wo bist du?{"\n"}
                • Wie war die Reise?{"\n"}
                • Was machst du als nächstes?
              </Text>
              <Text style={s.writePromptHint}>Tipp: 2-4 Sätze reichen. Benutze die Wörter aus dieser Lektion!</Text>
            </View>
            {!writeSubmitted ? (
              <View>
                <TextInput style={s.writeArea} value={writeText} onChangeText={setWriteText} placeholder="Lieber Tom, ich bin gerade..." placeholderTextColor={C.muted}
                  multiline numberOfLines={6} textAlignVertical="top" />
                {writeText.trim().length > 10 && (
                  <TouchableOpacity style={s.writeSubmitBtn} onPress={submitWriting}>
                    <Text style={s.writeSubmitText}>Abschicken ✓</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View>
                <View style={{ backgroundColor: C.greenDim, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: C.greenLine, marginTop: 12 }}>
                  <Text style={{ fontSize: 13, fontWeight: "700", color: C.green }}>✅ Abgeschickt! +15 XP</Text>
                </View>
                <View style={{ backgroundColor: C.card, borderRadius: 14, padding: 16, marginTop: 12, borderWidth: 1, borderColor: C.border }}>
                  <Text style={{ fontSize: 11, fontWeight: "800", color: C.gold, letterSpacing: 1, marginBottom: 6 }}>FEEDBACK</Text>
                  <Text style={{ fontSize: 14, color: C.text, lineHeight: 22 }}>{writeFeedback || "Wird geprüft..."}</Text>
                </View>
                <View style={{ backgroundColor: C.bg2, borderRadius: 14, padding: 16, marginTop: 12 }}>
                  <Text style={{ fontSize: 11, fontWeight: "800", color: C.muted, letterSpacing: 1, marginBottom: 6 }}>DEIN TEXT</Text>
                  <Text style={{ fontSize: 14, color: C.text, fontStyle: "italic", lineHeight: 22 }}>{writeText}</Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* ═══ 7. ABSCHLUSS ═══ */}
        {step === 6 && (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 64, marginBottom: 12 }}>🎉</Text>
            <Text style={{ fontFamily: SERIF, fontSize: 26, fontWeight: "700", color: C.text, textAlign: "center" }}>Lektion geschafft!</Text>
            <View style={s.storyBox}><Text style={s.storyText}>{story.outroNarration}</Text></View>
            <View style={{ flexDirection: "row", marginTop: 20, gap: 16, width: "100%" }}>
              <View style={s.statBox}><Text style={s.statNum}>{totalXP + (lesson.xp_reward || 50)}</Text><Text style={s.statLabel}>XP</Text></View>
              <View style={s.statBox}><Text style={s.statNum}>{lesson.vocabulary?.core?.length || 0}</Text><Text style={s.statLabel}>Wörter</Text></View>
            </View>
            <View style={{ backgroundColor: C.card, borderRadius: 14, padding: 16, marginTop: 16, width: "100%", borderWidth: 1, borderColor: C.border }}>
              <Text style={{ fontSize: 10, fontWeight: "900", color: C.muted, letterSpacing: 2 }}>ABGEDECKTE FERTIGKEITEN</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                {["👂 Hören", "📖 Lesen", "🎤 Sprechen", "✍️ Schreiben"].map(s => (
                  <View key={s} style={{ backgroundColor: C.greenDim, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 }}>
                    <Text style={{ fontSize: 12, fontWeight: "700", color: C.green }}>{s}</Text>
                  </View>
                ))}
              </View>
            </View>
            <TouchableOpacity style={s.finishBtn} onPress={async () => {
              await Progress.addXP(totalXP + (lesson.xp_reward || 50));
              await Progress.markComplete(lesson.id);
              if (lesson.vocabulary?.core) {
                const words = lesson.vocabulary.core.map((w: string) => { const p = w.split("::"); return { word: p[0]?.trim() || w, meaning: p[1]?.trim() || "" }; });
                await SRS.addWordsFromLesson(lesson.id, words);
              }
              router.back();
            }}>
              <Text style={s.finishBtnText}>Weiter →</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>

      {/* Bottom nav */}
      {step < 6 && (
        <View style={s.bottomBar}>
          {step > 0 && <TouchableOpacity style={s.backBtn} onPress={goBack}><Text style={{ fontSize: 15, color: C.muted }}>← Zurück</Text></TouchableOpacity>}
          <TouchableOpacity style={s.nextBtn} onPress={goNext}><Text style={s.nextBtnText}>{step === 0 ? "Los geht's! →" : "Weiter →"}</Text></TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  center: { flex: 1, backgroundColor: C.bg, justifyContent: "center", alignItems: "center" },
  topRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 8, gap: 10 },
  closeX: { color: C.muted, fontSize: 22, width: 28 },
  progressTrack: { flex: 1, height: 6, backgroundColor: C.bg2, borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: C.gold, borderRadius: 3 },
  phaseLabel: { fontSize: 12, fontWeight: "800", color: C.gold, width: 70, textAlign: "right" },
  scroll: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40, flexGrow: 1 },

  // Story/Transition
  storyBox: { backgroundColor: C.card2, borderRadius: 16, padding: 20, marginTop: 16, borderLeftWidth: 4, borderLeftColor: C.gold },
  storyText: { fontSize: 15, color: C.text, lineHeight: 26, fontStyle: "italic" },
  transitionBox: { backgroundColor: C.card2, borderRadius: 14, padding: 16, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: C.gold },
  transitionText: { fontSize: 14, color: C.text, lineHeight: 22, fontStyle: "italic" },
  npcBox: { flexDirection: "row", alignItems: "center", backgroundColor: C.goldDim, borderRadius: 14, padding: 16, marginTop: 14, gap: 14, borderWidth: 1, borderColor: C.goldLine },

  // Dark card (Hören, Quest)
  darkCard: { backgroundColor: "#1A1A2E", borderRadius: 20, padding: 24, marginBottom: 16 },
  darkLabel: { fontSize: 11, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 14 },
  darkText: { fontSize: 17, color: "#E2E8F0", lineHeight: 28 },
  playBtn: { backgroundColor: C.gold, borderRadius: 16, padding: 18, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 12, marginBottom: 20 },
  playBtnText: { fontSize: 16, fontWeight: "700", color: "#1A1A2E" },
  translationBox: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.1)" },
  translationLabel: { fontSize: 10, fontWeight: "900", color: "rgba(255,255,255,0.4)", letterSpacing: 1.5, marginBottom: 6 },
  translationText: { fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 24 },
  keywordsBox: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16, marginTop: 16 },
  keywordsLabel: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 10 },
  keywordRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: C.bg2 },
  keywordDe: { fontSize: 15, fontWeight: "700", color: C.text },
  keywordEn: { fontSize: 14, color: C.muted },

  // Lesen
  sectionTitle: { fontSize: 11, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 8 },
  subtitle: { fontSize: 13, color: C.muted, marginBottom: 16 },
  readingBox: { backgroundColor: C.card, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: C.border, marginBottom: 20 },
  readingText: { fontSize: 16, color: C.text, lineHeight: 26 },
  questionBox: { marginBottom: 16 },
  questionText: { fontSize: 15, fontWeight: "700", color: C.text, marginBottom: 10, lineHeight: 22 },
  optBtn: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 8 },
  optCorrect: { borderColor: C.green, backgroundColor: C.greenDim },
  optWrong: { borderColor: C.red, backgroundColor: C.redDim },
  optText: { fontSize: 14, color: C.text },

  // Üben
  grammarCard: { backgroundColor: C.card, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: C.border, marginBottom: 16 },
  grammarTitle: { fontFamily: SERIF, fontSize: 18, fontWeight: "700", color: C.text, marginBottom: 8 },
  grammarRule: { fontSize: 14, color: C.textSec, lineHeight: 22 },
  tableCard: { backgroundColor: C.card, borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: C.border, marginBottom: 16 },
  tableRow: { flexDirection: "row", paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.bg2 },
  tableKey: { width: 80, fontSize: 14, fontWeight: "800", color: C.gold },
  tableVal: { flex: 1, fontSize: 13, color: C.text },
  imagePlaceholder: { backgroundColor: C.bg2, borderRadius: 16, height: 160, alignItems: "center", justifyContent: "center", marginBottom: 16, borderWidth: 1, borderStyle: "dashed", borderColor: C.border },
  fillBox: { marginBottom: 14 },
  fillPrompt: { fontSize: 15, fontWeight: "700", color: C.text, marginBottom: 8, lineHeight: 22 },
  fillInput: { flex: 1, backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 12, fontSize: 16, color: C.text },
  fillCheckBtn: { backgroundColor: C.gold, borderRadius: 12, width: 44, alignItems: "center", justifyContent: "center" },
  fillCheckText: { color: "#FFF", fontSize: 18, fontWeight: "700" },

  // Sprechen
  startQuestBtn: { backgroundColor: C.gold, borderRadius: 18, padding: 24, alignItems: "center", marginBottom: 16 },
  bubbleLeft: { backgroundColor: C.card, borderRadius: 16, borderTopLeftRadius: 4, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 8, maxWidth: "85%", alignSelf: "flex-start" as const },
  bubbleRight: { backgroundColor: C.gold, borderRadius: 16, borderTopRightRadius: 4, padding: 14, marginBottom: 8, maxWidth: "85%", alignSelf: "flex-end" as const },
  bubbleSpeaker: { fontSize: 10, fontWeight: "800", color: C.muted, marginBottom: 4 },
  bubbleText: { fontSize: 15, color: C.text, lineHeight: 22 },
  chatInput: { flex: 1, backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 14, fontSize: 15, color: C.text },
  sendBtn: { backgroundColor: C.gold, borderRadius: 14, width: 50, alignItems: "center", justifyContent: "center" },

  // Schreiben
  writePromptBox: { backgroundColor: C.card, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: C.goldLine, marginBottom: 16 },
  writePromptLabel: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 8 },
  writePromptText: { fontSize: 15, color: C.text, lineHeight: 24 },
  writePromptHint: { fontSize: 12, color: C.muted, marginTop: 12, fontStyle: "italic" },
  writeArea: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 16, fontSize: 16, color: C.text, minHeight: 140, lineHeight: 24 },
  writeSubmitBtn: { backgroundColor: C.gold, borderRadius: 14, paddingVertical: 14, alignItems: "center", marginTop: 12 },
  writeSubmitText: { fontSize: 16, fontWeight: "700", color: "#FFF" },

  // Abschluss
  statBox: { flex: 1, backgroundColor: C.card, borderRadius: 14, padding: 16, alignItems: "center", borderWidth: 1, borderColor: C.border },
  statNum: { fontSize: 24, fontWeight: "900", color: C.gold },
  statLabel: { fontSize: 11, color: C.muted, marginTop: 4 },
  finishBtn: { backgroundColor: C.gold, borderRadius: 18, paddingVertical: 18, paddingHorizontal: 40, marginTop: 24, width: "100%", alignItems: "center" },
  finishBtnText: { fontSize: 17, fontWeight: "900", color: "#FFF" },

  // Bottom
  bottomBar: { flexDirection: "row", gap: 10, paddingHorizontal: 20, paddingVertical: 12, paddingBottom: 28, borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.bg },
  backBtn: { paddingHorizontal: 20, paddingVertical: 16, borderRadius: 14, backgroundColor: C.bg2, alignItems: "center", justifyContent: "center" },
  nextBtn: { flex: 1, backgroundColor: C.gold, borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  nextBtnText: { fontSize: 16, fontWeight: "900", color: "#FFF" },
});
