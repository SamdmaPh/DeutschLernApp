import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, StatusBar, Image, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ALL_STATIC_LESSONS } from "../data/lessonData";
import { SITUATION_IMAGES } from "../data/images";
import { Progress } from "../services/progress";
import { SRS } from "../services/srs";
import { ElevenLabs, VOICES } from "../services/elevenlabs";
import { getStory } from "../data/storyData";
import { C, SAFE_TOP, SERIF } from "../theme";

const BACKEND = "https://deutschlernappbackend2-production.up.railway.app";

const AGENT_IDS: Record<string, string> = {
  "a1-0-1": "agent_5401knrqf0wtep1ap9j8mddqem14",
};

const SFX: Record<string, string> = {
  "a1-0-1": "busy airport terminal, flight announcements, luggage wheels",
  "a1-0-2": "hotel lobby, quiet reception, key card beep",
  "a1-1-1": "cozy cafe, coffee machine, cups clinking",
  "a1-1-2": "supermarket, shopping cart, checkout beep",
  "a1-1-3": "train station, train arriving, crowd",
};

// ═══════════════════════════════════════════════════
// 7 SCREENS: Scene → Listen → Read → Practice → Speak → Write → Done
// All UI in ENGLISH (student speaks English, learns German)
// ═══════════════════════════════════════════════════

export default function LessonV2() {
  const { lessonId } = useLocalSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [xp, setXp] = useState(0);

  // Audio
  const [playing, setPlaying] = useState(false);
  const [listened, setListened] = useState(false);
  const [showTrans, setShowTrans] = useState(false);

  // Read
  const [readAns, setReadAns] = useState<Record<number, number>>({});

  // Practice
  const [fillAns, setFillAns] = useState<Record<number, string>>({});
  const [fillOk, setFillOk] = useState<Record<number, boolean>>({});

  // Speak
  const [chatHistory, setChatHistory] = useState<{ who: string; text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);

  // Write
  const [writeTxt, setWriteTxt] = useState("");
  const [writeDone, setWriteDone] = useState(false);
  const [writeFb, setWriteFb] = useState("");

  const ref = React.useRef<ScrollView>(null);

  // ── Data ──
  const lesson = ALL_STATIC_LESSONS.find(l => l.id === lessonId) as any;
  if (!lesson) return <View style={s.center}><Text style={{ color: C.red }}>Lesson not found</Text><TouchableOpacity onPress={() => router.back()}><Text style={{ color: C.gold, marginTop: 12 }}>← Back</Text></TouchableOpacity></View>;

  const img = SITUATION_IMAGES[lesson.id] || "";
  const story = getStory(lesson.id);
  const quest = story.quest;

  // Parse listening
  const lines = (lesson.listening?.transcript || "").split("\n").filter(Boolean);
  const transLines = (lesson.listening?.english_translation || "").split("\n").filter(Boolean);
  const keywords = lesson.listening?.vocabulary_highlighted || [];
  const questions = lesson.exercises?.[0]?.tasks?.filter((t: any) => t.options) || [];
  const fillTasks = lesson.exercises?.[2]?.tasks || [];

  // ── Audio helpers ──
  const speak = (text: string, voice = VOICES.male) => ElevenLabs.playText(text, voice);
  const speakEn = (text: string) => speak(text, VOICES.female);

  // ── Nav ──
  const STEPS = 7;
  const go = (n: number) => { setStep(n); ref.current?.scrollTo({ y: 0 }); };
  const pct = ((step + 1) / STEPS) * 100;
  const labels = ["Scene", "Listen", "Read", "Practice", "Speak", "Write", "Done"];

  // ── Chat (Speak phase) ──
  const startChat = async () => {
    setChatStarted(true); setChatBusy(true);
    try {
      const r = await fetch(`${BACKEND}/api/conversation`, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: `Du bist ${story.npcName}. Situation: "${lesson.description}". Sprich einfaches Deutsch (A1). Begrüße den Schüler. 1-2 kurze Sätze.` }], topic: lesson.description, level: "A1" }) });
      const d = await r.json();
      if (d.text) { setChatHistory([{ who: "npc", text: d.text }]); speak(d.text); }
    } catch {} setChatBusy(false);
  };

  const sendChat = async () => {
    if (!chatInput.trim() || chatBusy) return;
    const msg = chatInput.trim(); setChatInput(""); setChatBusy(true);
    setChatHistory(h => [...h, { who: "you", text: msg }]); setXp(x => x + 10);
    try {
      const msgs = [...chatHistory, { who: "you", text: msg }].map(m => ({ role: m.who === "you" ? "user" as const : "assistant" as const, content: m.text }));
      const r = await fetch(`${BACKEND}/api/conversation`, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: msgs, topic: lesson.description, level: "A1" }) });
      const d = await r.json();
      if (d.text) { setChatHistory(h => [...h, { who: "npc", text: d.text }]); speak(d.text); }
    } catch {} setChatBusy(false); ref.current?.scrollToEnd?.({ animated: true });
  };

  // ── Write submit ──
  const submitWrite = async () => {
    if (!writeTxt.trim()) return;
    setWriteDone(true); setXp(x => x + 15);
    try {
      const r = await fetch(`${BACKEND}/api/conversation`, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: `A beginner (A1) wrote this in German: "${writeTxt}". Task: "${lesson.description}". Give brief feedback in ENGLISH: 1) Could you understand it? 2) Any corrections? 3) Encourage them. 2-3 sentences max.` }], topic: "writing", level: "A1" }) });
      const d = await r.json();
      if (d.text) setWriteFb(d.text);
    } catch { setWriteFb("Good effort! Keep practicing."); }
  };

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: SAFE_TOP }} />

      {/* Top bar */}
      <View style={s.top}>
        <TouchableOpacity onPress={() => router.back()}><Text style={s.x}>✕</Text></TouchableOpacity>
        <View style={s.bar}><View style={[s.barFill, { width: `${pct}%` }]} /></View>
        <Text style={s.phase}>{labels[step]}</Text>
      </View>

      <ScrollView ref={ref} showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>

        {/* ═══ 1. SCENE ═══ */}
        {step === 0 && <>
          {/* Image */}
          {img ? (
            <View style={s.imgWrap}>
              <Image source={{ uri: img }} style={s.img} resizeMode="cover" />
              <View style={s.imgOverlay}>
                <Text style={s.imgLabel}>LESSON {lesson.order_index}</Text>
                <Text style={s.imgTitle}>{lesson.title}</Text>
              </View>
            </View>
          ) : (
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Text style={{ fontSize: 64 }}>{story.hookEmoji}</Text>
              <Text style={s.imgTitle}>{lesson.title}</Text>
            </View>
          )}

          {/* English narration */}
          <View style={s.dark}>
            <TouchableOpacity onPress={() => speakEn(story.hookNarrationEn || lesson.description)} style={s.listenRow}>
              <Text style={{ fontSize: 16 }}>🔊</Text>
              <Text style={s.listenLabel}>Listen to the story</Text>
            </TouchableOpacity>
            <Text style={s.darkTxt}>{story.hookNarrationEn || lesson.description}</Text>
          </View>

          {/* NPC intro */}
          <View style={s.npcCard}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
              <Text style={{ fontSize: 40 }}>{story.npcEmoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.npcLabel}>YOU MEET</Text>
                <Text style={s.npcName}>{story.npcName}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => speak(story.npcGreeting)} style={s.npcBubble}>
              <Text style={s.npcGreetDe}>🔊 "{story.npcGreeting}"</Text>
              <Text style={s.npcGreetEn}>
                {story.npcGreeting === "Guten Tag! Wohin?" ? '"Good day! Where to?"' :
                 story.npcGreeting === "Guten Abend! Haben Sie eine Reservierung?" ? '"Good evening! Do you have a reservation?"' :
                 story.npcGreeting === "Guten Morgen! Was möchten Sie bestellen?" ? '"Good morning! What would you like to order?"' :
                 story.npcGreeting === "Das macht 12,50 Euro. Brauchen Sie eine Tüte?" ? '"That\'ll be 12.50 euros. Need a bag?"' :
                 story.npcGreeting === "Die Fahrkarte bitte! Wohin fahren Sie?" ? '"Ticket please! Where are you going?"' :
                 '"(tap to hear)"'}
              </Text>
              <Text style={{ fontSize: 11, color: C.gold, marginTop: 8 }}>Tap to hear it</Text>
            </TouchableOpacity>
          </View>

          {/* Mission */}
          <View style={s.mission}>
            <Text style={s.missionLabel}>YOUR MISSION</Text>
            <Text style={s.missionTxt}>{lesson.description}</Text>
          </View>

          {/* Ambient */}
          {SFX[lesson.id] && (
            <TouchableOpacity style={s.ambient} onPress={() => ElevenLabs.playSoundEffect(SFX[lesson.id], 5)}>
              <Text style={{ fontSize: 13, color: C.muted }}>🎧 Hear the atmosphere</Text>
            </TouchableOpacity>
          )}
        </>}

        {/* ═══ 2. LISTEN ═══ */}
        {step === 1 && <>
          <Text style={s.hint}>{story.listenIntroEn || "Listen to the conversation. Focus on the words you recognize."}</Text>

          <View style={s.dark}>
            <Text style={s.darkLabel}>🎧 LISTENING</Text>
            <Text style={s.darkSub}>You'll hear German. Don't panic — just listen for words you know!</Text>

            {/* Play each line */}
            {lines.map((line: string, i: number) => {
              const [spk, ...rest] = line.split(":");
              const de = rest.join(":").trim();
              const en = transLines[i]?.split(":").slice(1).join(":").trim() || "";
              const isYou = spk.trim() === "You";
              return (
                <TouchableOpacity key={i} onPress={() => speak(de, isYou ? VOICES.female : VOICES.male)}
                  style={[s.lineCard, isYou && { borderLeftColor: C.gold }]}>
                  <Text style={s.lineSpeaker}>{isYou ? "You" : spk.trim()}</Text>
                  <Text style={s.lineDe}>🔊 {de}</Text>
                  {showTrans && <Text style={s.lineEn}>{en}</Text>}
                </TouchableOpacity>
              );
            })}

            {!showTrans ? (
              <TouchableOpacity style={{ alignItems: "center", marginTop: 12 }} onPress={() => setShowTrans(true)}>
                <Text style={{ color: C.gold, fontSize: 14 }}>Show translations ↓</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Key words */}
          <View style={s.kwBox}>
            <Text style={s.kwTitle}>KEY WORDS — tap to hear</Text>
            {keywords.slice(0, 8).map((h: string, i: number) => {
              const [de, en] = h.split("::").map((x: string) => x.trim());
              return (
                <TouchableOpacity key={i} style={s.kwRow} onPress={() => ElevenLabs.playWord(de)}>
                  <Text style={s.kwDe}>🔊 {de}</Text>
                  <Text style={s.kwEn}>{en}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>}

        {/* ═══ 3. READ ═══ */}
        {step === 2 && <>
          <Text style={s.secTitle}>📖 READING COMPREHENSION</Text>
          <Text style={s.hint}>Read the text and answer the questions below.</Text>

          <View style={s.readBox}>
            {lines.map((line: string, i: number) => {
              const [spk, ...rest] = line.split(":");
              const de = rest.join(":").trim();
              const en = transLines[i]?.split(":").slice(1).join(":").trim() || "";
              return (
                <View key={i} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 15, fontWeight: "700", color: C.text }}>{spk.trim()}: {de}</Text>
                  <Text style={{ fontSize: 13, color: C.muted, fontStyle: "italic" }}>{en}</Text>
                </View>
              );
            })}
          </View>

          {questions.map((q: any, i: number) => {
            const picked = readAns[i];
            const correct = picked !== undefined && picked === (q.correct ?? q.answer ?? 0);
            return (
              <View key={i} style={{ marginBottom: 18 }}>
                <Text style={s.qText}>{i + 1}. {q.question}</Text>
                {q.options.map((opt: string, oi: number) => (
                  <TouchableOpacity key={oi}
                    style={[s.opt, picked !== undefined && oi === (q.correct ?? q.answer) && s.optG, picked !== undefined && picked === oi && picked !== (q.correct ?? q.answer) && s.optR]}
                    onPress={() => { if (picked === undefined) { setReadAns({ ...readAns, [i]: oi }); if (oi === (q.correct ?? q.answer)) setXp(x => x + 5); } }}>
                    <Text style={[s.optTxt, picked !== undefined && oi === (q.correct ?? q.answer) && { color: C.green, fontWeight: "700" }]}>{opt}</Text>
                  </TouchableOpacity>
                ))}
                {picked !== undefined && <Text style={{ fontSize: 13, color: correct ? C.green : C.red, fontWeight: "600", marginTop: 4 }}>{correct ? "✅ Correct!" : "❌ Not quite."}</Text>}
              </View>
            );
          })}
        </>}

        {/* ═══ 4. PRACTICE ═══ */}
        {step === 3 && <>
          <Text style={s.secTitle}>🔤 PRACTICE</Text>

          {/* Grammar explanation */}
          <View style={s.gramCard}>
            <Text style={s.gramTitle}>{lesson.grammar?.concept}</Text>
            <Text style={s.gramRule}>{lesson.grammar?.rule}</Text>
          </View>

          {lesson.grammar?.patterns && (
            <View style={s.table}>
              {lesson.grammar.patterns.map((p: any, i: number) => (
                <TouchableOpacity key={i} style={[s.tRow, i % 2 === 0 && { backgroundColor: C.bg2 }]}
                  onPress={() => speak(p.examples?.[0]?.split("'")[0] || p.sound || "")}>
                  <Text style={s.tKey}>{p.sound || p.person}</Text>
                  <Text style={s.tVal}>{p.english_trick || p.example || p.conjugation || ""}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Fill in the blank */}
          <Text style={[s.secTitle, { marginTop: 20 }]}>FILL IN THE BLANK</Text>
          <Text style={s.hint}>Type the missing German word.</Text>
          {fillTasks.slice(0, 5).map((t: any, i: number) => {
            const checked = fillOk[i];
            const ans = fillAns[i] || "";
            const ok = checked && ans.toLowerCase().trim() === (t.expected || "").toLowerCase().trim();
            return (
              <View key={i} style={{ marginBottom: 14 }}>
                <Text style={s.fillQ}>{t.prompt}</Text>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <TextInput style={[s.fillIn, checked && ok && { borderColor: C.green }, checked && !ok && { borderColor: C.red }]}
                    value={ans} onChangeText={v => setFillAns({ ...fillAns, [i]: v })} placeholder="..." placeholderTextColor={C.muted} editable={!checked} autoCapitalize="none" />
                  {!checked && ans.length > 0 && (
                    <TouchableOpacity style={s.fillBtn} onPress={() => { setFillOk({ ...fillOk, [i]: true }); if (ans.toLowerCase().trim() === (t.expected || "").toLowerCase().trim()) setXp(x => x + 5); }}>
                      <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "700" }}>✓</Text>
                    </TouchableOpacity>
                  )}
                </View>
                {checked && <Text style={{ fontSize: 13, color: ok ? C.green : C.red, fontWeight: "600", marginTop: 4 }}>{ok ? "✅ Correct!" : `→ ${t.expected}`}</Text>}
              </View>
            );
          })}
        </>}

        {/* ═══ 5. SPEAK ═══ */}
        {step === 4 && <>
          {/* Quest goals */}
          {quest && (
            <View style={s.dark}>
              <Text style={s.darkLabel}>🎯 QUEST</Text>
              <Text style={{ fontFamily: SERIF, fontSize: 20, fontWeight: "700", color: "#FFF" }}>{quest.titleEn || quest.title}</Text>
              <View style={{ marginTop: 14, gap: 8 }}>
                {quest.goals.map((g: any) => (
                  <View key={g.id} style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <Text style={{ fontSize: 16 }}>⬜</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, color: "#FFF" }}>{g.textEn || g.text}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Start conversation */}
          {!chatStarted && (
            <TouchableOpacity style={s.startBtn} onPress={startChat}>
              <Text style={{ fontSize: 40 }}>{story.npcEmoji}</Text>
              <Text style={{ fontSize: 17, fontWeight: "900", color: "#FFF", marginTop: 8 }}>Start conversation</Text>
              <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Talk to {story.npcName} in German!</Text>
            </TouchableOpacity>
          )}

          {/* Chat bubbles */}
          {chatHistory.map((m, i) => (
            <View key={i} style={m.who === "you" ? s.bR : s.bL}>
              <Text style={s.bWho}>{m.who === "you" ? "You" : story.npcName}</Text>
              <Text style={[s.bTxt, m.who === "you" && { color: "#FFF" }]}>{m.text}</Text>
            </View>
          ))}

          {chatBusy && <Text style={{ color: C.muted, fontSize: 13, marginTop: 8 }}>💬 {story.npcName} is thinking...</Text>}

          {/* Hint */}
          {chatStarted && quest && (
            <View style={s.tipBox}>
              <Text style={{ fontSize: 10, fontWeight: "800", color: C.blue, letterSpacing: 1 }}>💡 HINT</Text>
              <Text style={{ fontSize: 14, color: C.blue, marginTop: 4 }}>{quest.goals[0]?.textEn || quest.goals[0]?.text}</Text>
            </View>
          )}

          {/* Input */}
          {chatStarted && !chatBusy && (
            <View style={{ flexDirection: "row", gap: 8, marginTop: 14 }}>
              <TextInput style={s.chatIn} value={chatInput} onChangeText={setChatInput}
                placeholder="Type in German... (e.g. Guten Tag!)" placeholderTextColor={C.muted}
                onSubmitEditing={sendChat} returnKeyType="send" />
              <TouchableOpacity style={s.chatSend} onPress={sendChat}>
                <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "700" }}>→</Text>
              </TouchableOpacity>
            </View>
          )}
        </>}

        {/* ═══ 6. WRITE ═══ */}
        {step === 5 && <>
          <Text style={s.secTitle}>✍️ WRITING</Text>

          <View style={s.writePrompt}>
            <Text style={s.writeLabel}>YOUR TASK</Text>
            <Text style={s.writeTxt}>
              Write a short message (like a text/SMS) to a friend:{"\n\n"}
              You just arrived in Berlin!{"\n"}
              • Where are you?{"\n"}
              • How was the trip?{"\n"}
              • What will you do next?{"\n\n"}
              Try to use German words you learned in this lesson.
              It's OK to mix German and English!
            </Text>
          </View>

          {!writeDone ? <>
            <TextInput style={s.writeArea} value={writeTxt} onChangeText={setWriteTxt}
              placeholder="Hallo! Ich bin in Berlin..." placeholderTextColor={C.muted}
              multiline numberOfLines={6} textAlignVertical="top" />
            {writeTxt.trim().length > 5 && (
              <TouchableOpacity style={s.writeBtn} onPress={submitWrite}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#FFF" }}>Submit ✓</Text>
              </TouchableOpacity>
            )}
          </> : <>
            <View style={{ backgroundColor: C.greenDim, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: C.greenLine, marginTop: 12 }}>
              <Text style={{ color: C.green, fontWeight: "700" }}>✅ Submitted! +15 XP</Text>
            </View>
            <View style={{ backgroundColor: C.card, borderRadius: 14, padding: 16, marginTop: 12, borderWidth: 1, borderColor: C.border }}>
              <Text style={{ fontSize: 11, fontWeight: "800", color: C.gold, letterSpacing: 1, marginBottom: 6 }}>FEEDBACK</Text>
              <Text style={{ fontSize: 14, color: C.text, lineHeight: 22 }}>{writeFb || "Checking..."}</Text>
            </View>
            <View style={{ backgroundColor: C.bg2, borderRadius: 14, padding: 16, marginTop: 12 }}>
              <Text style={{ fontSize: 11, fontWeight: "800", color: C.muted, letterSpacing: 1, marginBottom: 6 }}>YOUR TEXT</Text>
              <Text style={{ fontSize: 14, color: C.text, fontStyle: "italic" }}>{writeTxt}</Text>
            </View>
          </>}
        </>}

        {/* ═══ 7. DONE ═══ */}
        {step === 6 && (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 64, marginBottom: 12 }}>🎉</Text>
            <Text style={{ fontFamily: SERIF, fontSize: 26, fontWeight: "700", color: C.text, textAlign: "center" }}>Lesson Complete!</Text>

            <View style={s.dark}>
              <Text style={s.darkTxt}>{story.outroNarration}</Text>
            </View>

            {/* Stats */}
            <View style={{ flexDirection: "row", marginTop: 16, gap: 14, width: "100%" }}>
              <View style={s.statBox}><Text style={s.statN}>{xp + (lesson.xp_reward || 50)}</Text><Text style={s.statL}>XP earned</Text></View>
              <View style={s.statBox}><Text style={s.statN}>{lesson.vocabulary?.core?.length || 0}</Text><Text style={s.statL}>Words learned</Text></View>
            </View>

            {/* Skills covered */}
            <View style={{ backgroundColor: C.card, borderRadius: 14, padding: 16, marginTop: 16, width: "100%", borderWidth: 1, borderColor: C.border }}>
              <Text style={{ fontSize: 10, fontWeight: "900", color: C.muted, letterSpacing: 2, marginBottom: 10 }}>SKILLS PRACTICED</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {["👂 Listening", "📖 Reading", "🎤 Speaking", "✍️ Writing"].map(sk => (
                  <View key={sk} style={{ backgroundColor: C.greenDim, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 }}>
                    <Text style={{ fontSize: 12, fontWeight: "700", color: C.green }}>{sk}</Text>
                  </View>
                ))}
              </View>
            </View>

            <TouchableOpacity style={s.doneBtn} onPress={async () => {
              await Progress.addXP(xp + (lesson.xp_reward || 50));
              await Progress.markComplete(lesson.id);
              if (lesson.vocabulary?.core) {
                const w = lesson.vocabulary.core.map((x: string) => { const p = x.split("::"); return { word: p[0]?.trim() || x, meaning: p[1]?.trim() || "" }; });
                await SRS.addWordsFromLesson(lesson.id, w);
              }
              router.back();
            }}>
              <Text style={s.doneTxt}>Continue →</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>

      {/* Bottom nav */}
      {step < 6 && (
        <View style={s.bot}>
          {step > 0 && <TouchableOpacity style={s.back} onPress={() => go(step - 1)}><Text style={{ color: C.muted, fontSize: 15 }}>← Back</Text></TouchableOpacity>}
          <TouchableOpacity style={s.next} onPress={() => { go(step + 1); if (step === 0) setXp(x => x + 5); }}>
            <Text style={s.nextTxt}>{step === 0 ? "Let's go! →" : "Continue →"}</Text>
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
  top: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 8, gap: 10 },
  x: { color: C.muted, fontSize: 22, width: 28 },
  bar: { flex: 1, height: 6, backgroundColor: C.bg2, borderRadius: 3, overflow: "hidden" },
  barFill: { height: "100%", backgroundColor: C.gold, borderRadius: 3 },
  phase: { fontSize: 12, fontWeight: "800", color: C.gold, width: 60, textAlign: "right" },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40, flexGrow: 1 },

  // Image
  imgWrap: { borderRadius: 20, overflow: "hidden", marginBottom: 4 },
  img: { width: "100%", height: 260 },
  imgOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 22, backgroundColor: "rgba(0,0,0,0.65)" },
  imgLabel: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 3 },
  imgTitle: { fontFamily: SERIF, fontSize: 24, fontWeight: "700", color: "#FFF", marginTop: 4 },

  // Dark card
  dark: { backgroundColor: "#1A1A2E", borderRadius: 18, padding: 22, marginTop: 16, marginBottom: 8 },
  darkLabel: { fontSize: 11, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 10 },
  darkSub: { fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 16, lineHeight: 20 },
  darkTxt: { fontSize: 16, color: "#E2E8F0", lineHeight: 28 },

  // Listen row
  listenRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  listenLabel: { fontSize: 12, color: C.gold, fontWeight: "700" },

  // NPC
  npcCard: { backgroundColor: C.card, borderRadius: 18, padding: 20, marginTop: 14, borderWidth: 1, borderColor: C.goldLine },
  npcLabel: { fontSize: 11, fontWeight: "900", color: C.gold, letterSpacing: 1.5 },
  npcName: { fontSize: 18, fontWeight: "700", color: C.text, marginTop: 2 },
  npcBubble: { backgroundColor: C.bg2, borderRadius: 14, padding: 16, marginTop: 14 },
  npcGreetDe: { fontSize: 20, fontWeight: "700", color: C.text },
  npcGreetEn: { fontSize: 14, color: C.muted, marginTop: 6, fontStyle: "italic" },

  // Mission
  mission: { backgroundColor: C.goldDim, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: C.gold, padding: 18, marginTop: 14 },
  missionLabel: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 6 },
  missionTxt: { fontSize: 15, color: C.text, lineHeight: 22 },

  // Ambient
  ambient: { alignItems: "center", marginTop: 14, backgroundColor: C.bg2, borderRadius: 14, padding: 14 },

  // Hint
  hint: { fontSize: 14, color: C.muted, lineHeight: 21, marginBottom: 16 },

  // Lines (Listen)
  lineCard: { backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 14, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: "rgba(255,255,255,0.2)" },
  lineSpeaker: { fontSize: 10, fontWeight: "800", color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginBottom: 4 },
  lineDe: { fontSize: 16, fontWeight: "600", color: "#FFF" },
  lineEn: { fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4, fontStyle: "italic" },

  // Keywords
  kwBox: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16 },
  kwTitle: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 10 },
  kwRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: C.bg2 },
  kwDe: { fontSize: 15, fontWeight: "700", color: C.text },
  kwEn: { fontSize: 14, color: C.muted },

  // Read
  secTitle: { fontSize: 11, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 8 },
  readBox: { backgroundColor: C.card, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: C.border, marginBottom: 20 },
  qText: { fontSize: 15, fontWeight: "700", color: C.text, marginBottom: 10, lineHeight: 22 },
  opt: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 8 },
  optG: { borderColor: C.green, backgroundColor: C.greenDim },
  optR: { borderColor: C.red, backgroundColor: C.redDim },
  optTxt: { fontSize: 14, color: C.text },

  // Practice
  gramCard: { backgroundColor: C.card, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: C.border, marginBottom: 16 },
  gramTitle: { fontFamily: SERIF, fontSize: 18, fontWeight: "700", color: C.text, marginBottom: 8 },
  gramRule: { fontSize: 14, color: C.textSec, lineHeight: 22 },
  table: { backgroundColor: C.card, borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: C.border, marginBottom: 16 },
  tRow: { flexDirection: "row", paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.bg2 },
  tKey: { width: 80, fontSize: 14, fontWeight: "800", color: C.gold },
  tVal: { flex: 1, fontSize: 13, color: C.text },
  fillQ: { fontSize: 15, fontWeight: "700", color: C.text, marginBottom: 8, lineHeight: 22 },
  fillIn: { flex: 1, backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 12, fontSize: 16, color: C.text },
  fillBtn: { backgroundColor: C.gold, borderRadius: 12, width: 44, alignItems: "center", justifyContent: "center" },

  // Speak
  startBtn: { backgroundColor: C.gold, borderRadius: 18, padding: 24, alignItems: "center", marginBottom: 16 },
  bL: { backgroundColor: C.card, borderRadius: 16, borderTopLeftRadius: 4, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 8, maxWidth: "85%", alignSelf: "flex-start" as const },
  bR: { backgroundColor: C.gold, borderRadius: 16, borderTopRightRadius: 4, padding: 14, marginBottom: 8, maxWidth: "85%", alignSelf: "flex-end" as const },
  bWho: { fontSize: 10, fontWeight: "800", color: C.muted, marginBottom: 4 },
  bTxt: { fontSize: 15, color: C.text, lineHeight: 22 },
  tipBox: { backgroundColor: C.blueDim, borderRadius: 12, padding: 12, marginTop: 10, borderWidth: 1, borderColor: C.blueLine },
  chatIn: { flex: 1, backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 14, fontSize: 15, color: C.text },
  chatSend: { backgroundColor: C.gold, borderRadius: 14, width: 50, alignItems: "center", justifyContent: "center" },

  // Write
  writePrompt: { backgroundColor: C.card, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: C.goldLine, marginBottom: 16 },
  writeLabel: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 8 },
  writeTxt: { fontSize: 15, color: C.text, lineHeight: 24 },
  writeArea: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 16, fontSize: 16, color: C.text, minHeight: 140, lineHeight: 24 },
  writeBtn: { backgroundColor: C.gold, borderRadius: 14, paddingVertical: 14, alignItems: "center", marginTop: 12 },

  // Done
  statBox: { flex: 1, backgroundColor: C.card, borderRadius: 14, padding: 16, alignItems: "center", borderWidth: 1, borderColor: C.border },
  statN: { fontSize: 24, fontWeight: "900", color: C.gold },
  statL: { fontSize: 11, color: C.muted, marginTop: 4 },
  doneBtn: { backgroundColor: C.gold, borderRadius: 18, paddingVertical: 18, paddingHorizontal: 40, marginTop: 24, width: "100%", alignItems: "center" },
  doneTxt: { fontSize: 17, fontWeight: "900", color: "#FFF" },

  // Bottom
  bot: { flexDirection: "row", gap: 10, paddingHorizontal: 20, paddingVertical: 12, paddingBottom: 28, borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.bg },
  back: { paddingHorizontal: 20, paddingVertical: 16, borderRadius: 14, backgroundColor: C.bg2, justifyContent: "center" },
  next: { flex: 1, backgroundColor: C.gold, borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  nextTxt: { fontSize: 16, fontWeight: "900", color: "#FFF" },
});
