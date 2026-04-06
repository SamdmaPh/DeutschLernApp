import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, StatusBar, Image, Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ALL_STATIC_LESSONS } from "../data/lessonData";
import { SITUATION_IMAGES } from "../data/images";
import { Progress } from "../services/progress";
import { SRS } from "../services/srs";
import { Avatar, ALL_ITEMS } from "../services/avatar";
import { getStory } from "../data/storyData";
import { C, SAFE_TOP, SERIF } from "../theme";

const BACKEND = "https://deutschlernappbackend2-production.up.railway.app";
const { width: SW } = Dimensions.get("window");

// ═══════════════════════════════════════════════════════════════
// LESSON SCREEN — 4 Screens: Szene → Hören → Sprechen → Belohnung
// ═══════════════════════════════════════════════════════════════

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(0); // 0-3
  const [totalXP, setTotalXP] = useState(0);

  // Listening state
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [listened, setListened] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  // Quest/Speak state
  const [dialogHistory, setDialogHistory] = useState<{speaker: string; text: string}[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [dlgInput, setDlgInput] = useState("");
  const [dlgPlaying, setDlgPlaying] = useState(false);
  const [dlgFeedback, setDlgFeedback] = useState("");
  const [questStarted, setQuestStarted] = useState(false);

  const scrollRef = React.useRef<ScrollView>(null);

  const lesson = ALL_STATIC_LESSONS.find((l) => l.id === lessonId) as any;
  if (!lesson) {
    return (
      <View style={s.center}>
        <Text style={{ fontSize: 18, color: C.red }}>Lektion nicht gefunden</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: C.gold, fontSize: 16, marginTop: 16 }}>← Zurück</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const img = SITUATION_IMAGES[lesson.id] || "";
  const story = getStory(lesson.id);
  const quest = story.quest;

  const addXP = (n: number) => setTotalXP(prev => prev + n);

  // Quest goal tracking
  const completedGoals = quest ? quest.goals.filter(goal =>
    dialogHistory.some(msg =>
      msg.speaker === "You" && goal.keywords.some(kw => msg.text.toLowerCase().includes(kw))
    )
  ).map(g => g.id) : [];
  const allGoalsDone = quest ? completedGoals.length >= quest.goals.length : dialogHistory.length >= 6;

  // ── Listening: play text via TTS ──
  const playListening = async () => {
    const fullText = lesson.listening?.transcript?.split("\n").filter(Boolean).map((line: string) => {
      const parts = line.split(":");
      return parts.length > 1 ? parts.slice(1).join(":").trim() : line;
    }).join(" ") || "";
    if (!fullText) return;

    setAudioPlaying(true);
    try {
      const res = await fetch(`${BACKEND}/api/speak`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: fullText, voice: "male" }),
      });
      const data = await res.json();
      if (data.audio) {
        const AudioModule = await import("expo-av");
        await AudioModule.Audio.setAudioModeAsync({ playsInSilentModeIOS: true, allowsRecordingIOS: false });
        const { sound } = await AudioModule.Audio.Sound.createAsync(
          { uri: `data:audio/mpeg;base64,${data.audio}` }, { shouldPlay: true }
        );
        await new Promise<void>(resolve => {
          sound.setOnPlaybackStatusUpdate(status => {
            if (status.isLoaded && status.didJustFinish) { sound.unloadAsync(); resolve(); }
          });
          setTimeout(() => { sound.unloadAsync(); resolve(); }, 15000);
        });
      }
    } catch {}
    setAudioPlaying(false);
    setListened(true);
  };

  // ── Quest: Start conversation ──
  const startQuest = async () => {
    setQuestStarted(true);
    setChatLoading(true);
    try {
      const sysMsg = `Du bist ${story.npcName} in dieser Situation: "${lesson.description}". Sprich einfaches Deutsch (A1 Niveau). Begrüße den Schüler passend zur Situation. Nur 1-2 kurze Sätze. Sei freundlich.`;
      const res = await fetch(`${BACKEND}/api/conversation`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: sysMsg }], topic: lesson.description, level: "A1" }),
      });
      const data = await res.json();
      if (data.text) {
        setDialogHistory([{ speaker: story.npcName, text: data.text }]);
        playTTS(data.text);
      }
    } catch (e: any) { setDlgFeedback("Verbindungsfehler"); }
    setChatLoading(false);
  };

  // ── Quest: Send text message ──
  const sendMessage = async () => {
    if (!dlgInput.trim() || chatLoading) return;
    const userText = dlgInput.trim();
    setDlgInput("");
    setChatLoading(true);
    const newHistory = [...dialogHistory, { speaker: "You", text: userText }];
    setDialogHistory(newHistory);
    addXP(10);

    try {
      const allMsgs = newHistory.map(m => ({
        role: m.speaker === "You" ? "user" as const : "assistant" as const,
        content: m.text,
      }));
      const res = await fetch(`${BACKEND}/api/conversation`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMsgs, topic: lesson.description, level: "A1" }),
      });
      const data = await res.json();
      if (data.text) {
        setDialogHistory(h => [...h, { speaker: story.npcName, text: data.text }]);
        playTTS(data.text);
        if (data.corrections?.length) {
          setDlgFeedback(data.corrections.map((c: any) => `"${c.original}" → "${c.corrected}"`).join("\n"));
        }
      }
    } catch {}
    setChatLoading(false);
    scrollRef.current?.scrollToEnd?.({ animated: true });
  };

  // ── Quest: Voice recording ──
  const recordAndSend = async () => {
    try {
      const AudioModule = await import("expo-av");
      const { granted } = await AudioModule.Audio.requestPermissionsAsync();
      if (!granted) { setDlgFeedback("Mikrofon-Zugriff verweigert"); return; }
      await AudioModule.Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

      if (!dlgPlaying) {
        const { recording } = await AudioModule.Audio.Recording.createAsync(AudioModule.Audio.RecordingOptionsPresets.HIGH_QUALITY);
        setDlgPlaying(true);
        (globalThis as any).__rec = recording;
      } else {
        const recording = (globalThis as any).__rec;
        if (recording) {
          await recording.stopAndUnloadAsync();
          const uri = recording.getURI();
          (globalThis as any).__rec = null;
          setDlgPlaying(false);
          if (uri) {
            const response = await fetch(uri);
            const blob = await response.blob();
            const base64 = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve((reader.result as string).split(",")[1]);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
            // Send voice to backend
            setChatLoading(true);
            try {
              const allMsgs = dialogHistory.map(m => ({ role: m.speaker === "You" ? "user" as const : "assistant" as const, content: m.text }));
              const res = await fetch(`${BACKEND}/api/audio-conversation`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ audio: base64, messages: allMsgs, level: "A1" }),
              });
              const data = await res.json();
              if (data.userText) {
                const npcText = data.assistantText || "...";
                setDialogHistory(h => [...h, { speaker: "You", text: data.userText }, { speaker: story.npcName, text: npcText }]);
                addXP(15);
                playTTS(npcText);
                if (data.corrections?.length) {
                  setDlgFeedback(data.corrections.map((c: any) => `"${c.original}" → "${c.corrected}"`).join("\n"));
                }
              }
            } catch {}
            setChatLoading(false);
            scrollRef.current?.scrollToEnd?.({ animated: true });
          }
        }
      }
    } catch (err: any) {
      setDlgFeedback("Aufnahme-Fehler: " + err.message);
      setDlgPlaying(false);
    }
  };

  // ── TTS helper ──
  const playTTS = async (text: string) => {
    try {
      const res = await fetch(`${BACKEND}/api/speak`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice: "male" }),
      });
      const data = await res.json();
      if (data.audio) {
        const AudioModule = await import("expo-av");
        await AudioModule.Audio.setAudioModeAsync({ playsInSilentModeIOS: true, allowsRecordingIOS: false });
        await AudioModule.Audio.Sound.createAsync({ uri: `data:audio/mpeg;base64,${data.audio}` }, { shouldPlay: true });
      }
    } catch {}
  };

  // ── Navigation ──
  const goNext = () => { if (step < 3) { setStep(step + 1); scrollRef.current?.scrollTo({ y: 0 }); } };
  const goBack = () => { if (step > 0) { setStep(step - 1); scrollRef.current?.scrollTo({ y: 0 }); } };
  const pct = ((step + 1) / 4) * 100;

  // Listening text
  const fullGerman = lesson.listening?.transcript?.split("\n").filter(Boolean).map((line: string) => {
    const parts = line.split(":");
    return parts.length > 1 ? parts.slice(1).join(":").trim() : line;
  }).join(" ") || "";

  const fullEnglish = lesson.listening?.english_translation?.split("\n").filter(Boolean).map((line: string) => {
    const parts = line.split(":");
    return parts.length > 1 ? parts.slice(1).join(":").trim() : line;
  }).join(" ") || "";

  const highlights = lesson.listening?.vocabulary_highlighted || [];
  const itemForLesson = ALL_ITEMS.find(i => i.lessonId === lesson.id);
  const nextLesson = ALL_STATIC_LESSONS.find((l: any) => l.order_index === lesson.order_index + 1);

  // ═══ RENDER ═══
  return (
    <View style={s.root}>
      <StatusBar barStyle={step === 0 ? "light-content" : "dark-content"} />
      <View style={{ height: SAFE_TOP }} />

      {/* Top bar */}
      <View style={s.topRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.closeX}>✕</Text>
        </TouchableOpacity>
        <View style={s.progressTrack}><View style={[s.progressFill, { width: `${pct}%` }]} /></View>
        <View style={s.xpBadge}><Text style={s.xpText}>⚡{totalXP}</Text></View>
      </View>

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* ═══ SCREEN 1: SZENE ═══ */}
        {step === 0 && (
          <View>
            {/* Hero image/video */}
            {img ? (
              <View style={{ borderRadius: 20, overflow: "hidden", marginBottom: 4 }}>
                <Image source={{ uri: img }} style={{ width: "100%", height: 240 }} resizeMode="cover" />
                <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: "rgba(0,0,0,0.65)" }}>
                  <Text style={{ fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 3 }}>KAPITEL {lesson.order_index}</Text>
                  <Text style={{ fontFamily: SERIF, fontSize: 24, fontWeight: "700", color: "#FFF", marginTop: 4 }}>{lesson.title_de || lesson.title}</Text>
                </View>
              </View>
            ) : (
              <View style={{ alignItems: "center", marginBottom: 16 }}>
                <Text style={{ fontSize: 64 }}>{story.hookEmoji}</Text>
                <Text style={{ fontFamily: SERIF, fontSize: 24, fontWeight: "700", color: C.text, marginTop: 8 }}>{lesson.title_de || lesson.title}</Text>
              </View>
            )}

            {/* Story narration */}
            <View style={{ backgroundColor: "#1C1C2E", borderRadius: 16, padding: 22, marginTop: 16 }}>
              <Text style={{ fontSize: 16, color: "#E2E8F0", lineHeight: 28, fontStyle: "italic" }}>{story.hookNarration}</Text>
            </View>

            {/* NPC preview */}
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: C.goldDim, borderRadius: 14, padding: 16, marginTop: 14, gap: 14, borderWidth: 1, borderColor: C.goldLine }}>
              <Text style={{ fontSize: 40 }}>{story.npcEmoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 11, fontWeight: "900", color: C.gold, letterSpacing: 1.5 }}>DU TRIFFST</Text>
                <Text style={{ fontSize: 18, fontWeight: "700", color: C.text, marginTop: 2 }}>{story.npcName}</Text>
                <Text style={{ fontSize: 14, color: C.muted, fontStyle: "italic", marginTop: 4 }}>"{story.npcGreeting}"</Text>
              </View>
            </View>
          </View>
        )}

        {/* ═══ SCREEN 2: HÖREN ═══ */}
        {step === 1 && (
          <View>
            {/* Story transition */}
            <View style={{ backgroundColor: C.card2, borderRadius: 14, padding: 16, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: C.gold }}>
              <Text style={{ fontSize: 14, color: C.text, lineHeight: 22, fontStyle: "italic" }}>{story.listenIntro}</Text>
            </View>

            {/* Listening card */}
            <View style={{ backgroundColor: "#1C1C2E", borderRadius: 20, padding: 24 }}>
              <Text style={{ fontSize: 11, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 14 }}>🎧 HÖRTEXT</Text>

              {/* Play button */}
              <TouchableOpacity
                style={{ backgroundColor: audioPlaying ? "rgba(255,255,255,0.15)" : C.gold, borderRadius: 16, padding: 20, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 12, marginBottom: 20 }}
                onPress={playListening} disabled={audioPlaying} activeOpacity={0.7}
              >
                <Text style={{ fontSize: 28 }}>{audioPlaying ? "🔊" : "▶️"}</Text>
                <Text style={{ fontSize: 17, fontWeight: "700", color: audioPlaying ? "#FFF" : "#1C1C2E" }}>
                  {audioPlaying ? "Hör zu..." : listened ? "Nochmal anhören" : "Anhören"}
                </Text>
              </TouchableOpacity>

              {/* German text */}
              <Text style={{ fontSize: 18, color: "#E2E8F0", lineHeight: 30 }}>{fullGerman}</Text>

              {/* Translation */}
              {showTranslation ? (
                <View style={{ marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.1)" }}>
                  <Text style={{ fontSize: 10, fontWeight: "900", color: "rgba(255,255,255,0.4)", letterSpacing: 1.5, marginBottom: 6 }}>ÜBERSETZUNG</Text>
                  <Text style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 24 }}>{fullEnglish}</Text>
                </View>
              ) : (
                <TouchableOpacity style={{ marginTop: 16, alignItems: "center" }} onPress={() => setShowTranslation(true)}>
                  <Text style={{ fontSize: 14, color: C.gold, fontWeight: "600" }}>Übersetzung anzeigen ↓</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Key words */}
            {highlights.length > 0 && (
              <View style={{ backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16, marginTop: 16 }}>
                <Text style={{ fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 10 }}>SCHLÜSSELWÖRTER</Text>
                {highlights.slice(0, 8).map((h: string, i: number) => {
                  const [de, en] = h.split("::").map((s: string) => s.trim());
                  return (
                    <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 7, borderBottomWidth: i < highlights.length - 1 ? 1 : 0, borderBottomColor: C.bg2 }}>
                      <Text style={{ fontSize: 15, fontWeight: "700", color: C.text }}>{de}</Text>
                      <Text style={{ fontSize: 14, color: C.muted }}>{en}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        )}

        {/* ═══ SCREEN 3: SPRECHEN (Quest) ═══ */}
        {step === 2 && (
          <View>
            {/* Quest header */}
            {quest && (
              <View style={{ backgroundColor: "#1C1C2E", borderRadius: 16, padding: 20, marginBottom: 16 }}>
                <Text style={{ fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 8 }}>🎯 QUEST</Text>
                <Text style={{ fontFamily: SERIF, fontSize: 20, fontWeight: "700", color: "#FFF" }}>{quest.title}</Text>
                <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{quest.titleEn}</Text>

                {/* Goals checklist */}
                <View style={{ marginTop: 14, gap: 8 }}>
                  {quest.goals.map((goal) => {
                    const done = completedGoals.includes(goal.id);
                    return (
                      <View key={goal.id} style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <Text style={{ fontSize: 18 }}>{done ? "✅" : "⬜"}</Text>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 14, color: done ? "#4ADE80" : "#FFF", fontWeight: done ? "700" : "400" }}>{goal.text}</Text>
                          <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{goal.textEn}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Start button */}
            {!questStarted && (
              <TouchableOpacity style={{ backgroundColor: C.gold, borderRadius: 18, padding: 22, alignItems: "center", marginBottom: 16 }} onPress={startQuest} activeOpacity={0.85}>
                <Text style={{ fontSize: 40, marginBottom: 8 }}>{story.npcEmoji}</Text>
                <Text style={{ fontSize: 18, fontWeight: "900", color: "#1C1C2E" }}>Gespräch starten</Text>
                <Text style={{ fontSize: 13, color: "rgba(0,0,0,0.5)", marginTop: 4 }}>Sprich mit {story.npcName}</Text>
              </TouchableOpacity>
            )}

            {/* Chat history */}
            {dialogHistory.map((msg, i) => (
              <View key={i} style={msg.speaker === "You" ? s.bubbleRight : s.bubbleLeft}>
                <Text style={s.bubbleSpeaker}>{msg.speaker === "You" ? "Du" : msg.speaker}</Text>
                <Text style={[s.bubbleText, msg.speaker === "You" && { color: "#fff" }]}>{msg.text}</Text>
              </View>
            ))}

            {/* Loading */}
            {chatLoading && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 }}>
                <Text style={{ fontSize: 16 }}>💬</Text>
                <Text style={{ color: C.muted, fontSize: 13 }}>{story.npcName} antwortet...</Text>
              </View>
            )}

            {/* Corrections */}
            {dlgFeedback && !chatLoading && (
              <View style={{ backgroundColor: C.goldDim, borderRadius: 12, padding: 12, marginTop: 8, borderWidth: 1, borderColor: C.goldLine }}>
                <Text style={{ fontSize: 11, fontWeight: "800", color: C.gold, letterSpacing: 1 }}>KORREKTUR</Text>
                <Text style={{ fontSize: 13, color: C.text, lineHeight: 19, marginTop: 4 }}>{dlgFeedback}</Text>
              </View>
            )}

            {/* Hint for next goal */}
            {questStarted && !allGoalsDone && !chatLoading && quest && (() => {
              const nextGoal = quest.goals.find(g => !completedGoals.includes(g.id));
              if (!nextGoal) return null;
              return (
                <View style={{ backgroundColor: C.blueDim, borderRadius: 12, padding: 14, marginTop: 10, borderWidth: 1, borderColor: C.blueLine }}>
                  <Text style={{ fontSize: 10, fontWeight: "800", color: C.blue, letterSpacing: 1 }}>💡 TIPP</Text>
                  <Text style={{ fontSize: 15, color: C.blue, marginTop: 4 }}>{nextGoal.text}</Text>
                  <Text style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{nextGoal.textEn}</Text>
                </View>
              );
            })()}

            {/* Voice + Text input */}
            {questStarted && !allGoalsDone && !chatLoading && (
              <View style={{ alignItems: "center", marginTop: 20 }}>
                {/* Mic */}
                <TouchableOpacity
                  style={{ backgroundColor: dlgPlaying ? C.red : C.gold, borderRadius: 50, width: 80, height: 80, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6 }}
                  onPress={recordAndSend} activeOpacity={0.7}
                >
                  <Text style={{ fontSize: 36 }}>{dlgPlaying ? "⏹" : "🎤"}</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: "center", fontSize: 13, fontWeight: "700", color: dlgPlaying ? C.red : C.gold, marginTop: 8 }}>
                  {dlgPlaying ? "Sprich jetzt..." : "Tippe & sprich laut"}
                </Text>

                {/* Text input */}
                <View style={{ width: "100%", marginTop: 16, borderTopWidth: 1, borderTopColor: C.border, paddingTop: 12 }}>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <TextInput
                      style={{ flex: 1, backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 14, fontSize: 15, color: C.text }}
                      value={dlgInput} onChangeText={setDlgInput}
                      placeholder="Oder tippe auf Deutsch..."
                      placeholderTextColor={C.muted}
                      onSubmitEditing={sendMessage} returnKeyType="send"
                    />
                    <TouchableOpacity style={{ backgroundColor: C.gold, borderRadius: 14, width: 50, alignItems: "center", justifyContent: "center" }} onPress={sendMessage}>
                      <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "700" }}>→</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

            {/* Quest complete */}
            {allGoalsDone && questStarted && (
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text style={{ fontSize: 52, marginBottom: 8 }}>🏆</Text>
                <Text style={{ fontFamily: SERIF, fontSize: 22, fontWeight: "700", color: C.text }}>Quest geschafft!</Text>
                {quest?.successItem && (
                  <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: C.goldDim, borderRadius: 16, padding: 16, marginTop: 16, gap: 14, borderWidth: 1, borderColor: C.goldLine }}>
                    <Text style={{ fontSize: 40 }}>{quest.successItem}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 11, fontWeight: "900", color: C.gold, letterSpacing: 1.5 }}>ITEM ERHALTEN!</Text>
                      <Text style={{ fontSize: 16, fontWeight: "700", color: C.text }}>{quest.successItemName}</Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        )}

        {/* ═══ SCREEN 4: BELOHNUNG ═══ */}
        {step === 3 && (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 64, marginBottom: 12 }}>🎉</Text>
            <Text style={{ fontFamily: SERIF, fontSize: 26, fontWeight: "700", color: C.text, textAlign: "center" }}>Mission geschafft!</Text>

            {/* Story outro */}
            <View style={{ backgroundColor: "#1C1C2E", borderRadius: 16, padding: 20, marginTop: 16, width: "100%" }}>
              <Text style={{ fontSize: 15, color: "#E2E8F0", lineHeight: 26, fontStyle: "italic" }}>{story.outroNarration}</Text>
            </View>

            {/* Stats */}
            <View style={{ flexDirection: "row", marginTop: 20, gap: 16 }}>
              <View style={{ flex: 1, backgroundColor: C.card, borderRadius: 14, padding: 16, alignItems: "center", borderWidth: 1, borderColor: C.border }}>
                <Text style={{ fontSize: 24, fontWeight: "900", color: C.gold }}>{totalXP + (lesson.xp_reward || 50)}</Text>
                <Text style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>XP</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: C.card, borderRadius: 14, padding: 16, alignItems: "center", borderWidth: 1, borderColor: C.border }}>
                <Text style={{ fontSize: 24, fontWeight: "900", color: C.green }}>{lesson.vocabulary?.core?.length || 0}</Text>
                <Text style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>Wörter</Text>
              </View>
            </View>

            {/* Item */}
            {itemForLesson && (
              <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: C.goldDim, borderRadius: 16, padding: 18, marginTop: 16, gap: 14, borderWidth: 1, borderColor: C.goldLine, width: "100%" }}>
                <Text style={{ fontSize: 44 }}>{itemForLesson.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 11, fontWeight: "900", color: C.gold, letterSpacing: 1.5 }}>NEUES ITEM!</Text>
                  <Text style={{ fontSize: 17, fontWeight: "700", color: C.text }}>{itemForLesson.name}</Text>
                  <Text style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{itemForLesson.description}</Text>
                </View>
              </View>
            )}

            {/* Next mission */}
            {nextLesson && (
              <View style={{ backgroundColor: C.card, borderRadius: 14, padding: 16, marginTop: 16, borderWidth: 1, borderColor: C.border, width: "100%" }}>
                <Text style={{ fontSize: 10, fontWeight: "900", color: C.muted, letterSpacing: 2 }}>NÄCHSTE MISSION</Text>
                <Text style={{ fontSize: 16, fontWeight: "700", color: C.text, marginTop: 6 }}>{nextLesson.title_de || nextLesson.title}</Text>
              </View>
            )}

            {/* Finish button */}
            <TouchableOpacity
              style={{ backgroundColor: C.gold, borderRadius: 18, paddingVertical: 18, paddingHorizontal: 40, marginTop: 24, width: "100%", alignItems: "center" }}
              onPress={async () => {
                const earned = totalXP + (lesson.xp_reward || 50);
                await Progress.addXP(earned);
                await Progress.markComplete(lesson.id);
                await Avatar.completeLesson(lesson.id, earned);
                if (lesson.vocabulary?.core) {
                  const words = lesson.vocabulary.core.map((w: string) => { const p = w.split("::"); return { word: p[0]?.trim() || w, meaning: p[1]?.trim() || "" }; });
                  await SRS.addWordsFromLesson(lesson.id, words);
                }
                router.back();
              }}
              activeOpacity={0.85}
            >
              <Text style={{ fontSize: 17, fontWeight: "900", color: "#1C1C2E" }}>Weiter auf deiner Reise →</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>

      {/* Bottom navigation */}
      {step < 3 && (
        <View style={s.bottomBar}>
          {step > 0 && (
            <TouchableOpacity style={s.backBtn} onPress={goBack}>
              <Text style={{ fontSize: 15, fontWeight: "600", color: C.muted }}>← Zurück</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[s.nextBtn, step === 0 && { flex: 1 }]}
            onPress={goNext} activeOpacity={0.85}
          >
            <Text style={s.nextBtnText}>
              {step === 0 ? "Los geht's! →" : step === 1 ? "Verstanden! →" : step === 2 && allGoalsDone ? "Weiter →" : "Überspringen →"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// ═══ STYLES ═══
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  center: { flex: 1, backgroundColor: C.bg, justifyContent: "center", alignItems: "center" },
  topRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 8, gap: 10 },
  closeX: { color: C.muted, fontSize: 22, width: 28 },
  progressTrack: { flex: 1, height: 8, backgroundColor: C.bg3, borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: C.gold, borderRadius: 4 },
  xpBadge: { backgroundColor: C.goldDim, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  xpText: { fontSize: 13, fontWeight: "800", color: C.gold },
  scroll: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40, flexGrow: 1 },

  // Chat bubbles
  bubbleLeft: { backgroundColor: C.card, borderRadius: 16, borderTopLeftRadius: 4, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 8, maxWidth: "85%", alignSelf: "flex-start" as const },
  bubbleRight: { backgroundColor: C.gold, borderRadius: 16, borderTopRightRadius: 4, padding: 14, marginBottom: 8, maxWidth: "85%", alignSelf: "flex-end" as const },
  bubbleSpeaker: { fontSize: 10, fontWeight: "800", color: C.muted, marginBottom: 4 },
  bubbleText: { fontSize: 15, color: C.text, lineHeight: 22 },

  // Bottom bar
  bottomBar: { flexDirection: "row", gap: 10, paddingHorizontal: 20, paddingVertical: 12, paddingBottom: 28, borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.bg },
  backBtn: { paddingHorizontal: 20, paddingVertical: 16, borderRadius: 14, backgroundColor: C.bg2, alignItems: "center", justifyContent: "center" },
  nextBtn: { flex: 1, backgroundColor: C.gold, borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  nextBtnText: { fontSize: 16, fontWeight: "900", color: "#1C1C2E" },
});
