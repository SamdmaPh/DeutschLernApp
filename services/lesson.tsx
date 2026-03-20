import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, StatusBar, Platform, Animated
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../services/supabase";
import { Progress } from "../services/progress";

const C = {
  navy:       "#070B18", navy2: "#0A1020", navy3: "#0F1628",
  border:     "#1E2D45",
  gold:       "#C9A84C", goldBg: "rgba(201,168,76,0.10)", goldBorder: "rgba(201,168,76,0.25)",
  red:        "#CC0000", redBg: "rgba(204,0,0,0.10)", redBorder: "rgba(204,0,0,0.3)",
  green:      "#22C55E", greenBg: "rgba(34,197,94,0.12)",
  black:      "#111111", white: "#FFFFFF", text: "#E2E8F0", muted: "#64748B",
};
const SAFE_TOP = Platform.OS === "ios" ? 54 : 30;

const STEPS = [
  { label: "Einführung", icon: "🎯" },
  { label: "Kernsätze",  icon: "💬" },
  { label: "Grammatik",  icon: "📚" },
  { label: "Goldene Regeln", icon: "💡" },
  { label: "Übung",      icon: "🏋️" },
  { label: "Quiz",       icon: "🧠" },
];

interface QuizQ { question: string; options: string[]; correctIndex: number; }

function generateQuiz(speak: string[]): QuizQ[] {
  const pairs = speak
    .map(s => { const [de, en] = s.split(" :: "); return { de: de?.trim(), en: en?.trim() }; })
    .filter(p => p.de && p.en);
  if (pairs.length < 3) return [];

  const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);
  const questions: QuizQ[] = [];

  // 10 DE→EN + 10 EN→DE, cycling through pairs
  for (let pass = 0; pass < 2; pass++) {
    const shuffledPairs = shuffle(pairs);
    shuffledPairs.forEach(pair => {
      const others = shuffle(pairs.filter(p => p !== pair)).slice(0, 3);
      if (pass === 0) {
        const opts = shuffle([pair.en, ...others.map(o => o.en)]);
        questions.push({ question: `Was bedeutet:\n"${pair.de}"`, options: opts, correctIndex: opts.indexOf(pair.en) });
      } else {
        const opts = shuffle([pair.de, ...others.map(o => o.de)]);
        questions.push({ question: `Wie sagt man auf Deutsch:\n"${pair.en}"`, options: opts, correctIndex: opts.indexOf(pair.de) });
      }
    });
  }
  // Cap at 20
  return shuffle(questions).slice(0, 20);
}

function FlagBar() {
  return (
    <View style={{ flexDirection: "row", height: 3 }}>
      <View style={{ flex: 1, backgroundColor: C.black }} />
      <View style={{ flex: 1, backgroundColor: C.red }} />
      <View style={{ flex: 1, backgroundColor: C.gold }} />
    </View>
  );
}

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [step, setStep] = useState(0);
  const [xp, setXp] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const xpAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    supabase.from("lessons").select("*").eq("id", id).single()
      .then(({ data }) => setLesson(data));
    Progress.getXP().then(setXp);
    Progress.isComplete(String(id)).then(setIsComplete);
  }, [id]);

  async function handleComplete(earnedXP: number) {
    const newXP = await Progress.addXP(earnedXP);
    await Progress.markComplete(String(id));
    setXp(newXP);
    setIsComplete(true);
    // Animate XP number
    Animated.sequence([
      Animated.timing(xpAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(xpAnim, { toValue: 0, duration: 300, delay: 800, useNativeDriver: true }),
    ]).start();
  }

  if (!lesson) return (
    <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
      <Text style={{ color: C.gold, fontSize: 16 }}>Lädt…</Text>
    </View>
  );

  const content = lesson.content || {};
  const quizQuestions = generateQuiz(content.speak || []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{ height: SAFE_TOP }} />
      <FlagBar />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 72 }}>
          <Text style={styles.backText}>‹ Zurück</Text>
        </TouchableOpacity>
        <Text style={styles.lessonNum}>#{lesson.order_index} · {lesson.level}</Text>
        {/* XP Badge */}
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>⚡ {xp} XP</Text>
        </View>
      </View>

      {/* Step progress dots — tappable to revisit any visited step */}
      <View style={styles.stepsRow}>
        {STEPS.map((s, i) => {
          const canTap = i <= step;
          return (
            <TouchableOpacity
              key={i}
              style={styles.stepItem}
              onPress={() => canTap && setStep(i)}
              activeOpacity={canTap ? 0.7 : 1}
              disabled={!canTap}
            >
              <View style={[
                styles.stepDot,
                i < step && styles.stepDotDone,
                i === step && styles.stepDotActive,
                !canTap && { opacity: 0.35 },
              ]}>
                {i < step
                  ? <Text style={{ fontSize: 10 }}>✓</Text>
                  : <Text style={{ fontSize: 11 }}>{s.icon}</Text>
                }
              </View>
              <Text style={[
                styles.stepDotLabel,
                i === step && { color: C.gold },
                !canTap && { opacity: 0.35 },
              ]} numberOfLines={1}>
                {s.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${(step / (STEPS.length - 1)) * 100}%` }]} />
      </View>

      {/* Lesson title */}
      <Text style={styles.title}>{lesson.title}</Text>

      {/* Step content */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {step === 0 && <IntroStep content={content} />}
        {step === 1 && <SpeakStep content={content} />}
        {step === 2 && <GrammarStep content={content} />}
        {step === 3 && <TricksStep content={content} />}
        {step === 4 && <PracticeStep content={content} />}
        {step === 5 && (
          <QuizStep
            questions={quizQuestions}
            onComplete={handleComplete}
            onBack={() => router.back()}
            lessonTitle={lesson.title}
            alreadyDone={isComplete}
          />
        )}
        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Footer nav — hidden on quiz step */}
      {step < 5 && (
        <View style={styles.footer}>
          {step > 0 && (
            <TouchableOpacity style={styles.prevBtn} onPress={() => setStep(s => s - 1)}>
              <Text style={styles.prevText}>‹</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => setStep(s => s + 1)}
          >
            <Text style={styles.nextText}>
              {step === 4 ? "Zum Quiz →" : "Weiter →"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// ─── STEP 0: EINFÜHRUNG ───────────────────────────────────────
function IntroStep({ content }: any) {
  const goals: string[] = content.goals || [];
  const science: string = content.science || "";
  return (
    <View style={s.card}>
      {!!science && (
        <View style={s.scienceBox}>
          <Text style={s.scienceIcon}>🔬</Text>
          <Text style={s.scienceText}>{science}</Text>
        </View>
      )}
      {goals.length > 0 && (
        <>
          <Text style={s.sectionHeader}>🎯 LERNZIELE</Text>
          {goals.map((g, i) => (
            <View key={i} style={s.goalRow}>
              <View style={[s.goalNum, { backgroundColor: i === 0 ? C.goldBg : i === 1 ? C.redBg : "rgba(255,255,255,0.05)" }]}>
                <Text style={[s.goalNumText, { color: i === 0 ? C.gold : i === 1 ? C.red : C.muted }]}>{i + 1}</Text>
              </View>
              <Text style={s.goalText}>{g}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
}

// ─── STEP 1: KERNSÄTZE ────────────────────────────────────────
function SpeakStep({ content }: any) {
  const speak: string[] = content.speak || [];
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  function toggle(i: number) {
    setFlipped(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  }
  return (
    <View style={s.card}>
      <Text style={s.sectionHeader}>💬 KERNSÄTZE — Tippe zum Umdrehen</Text>
      {speak.map((line, i) => {
        const [de, en] = line.split(" :: ");
        const shown = flipped.has(i);
        return (
          <TouchableOpacity key={i} onPress={() => toggle(i)} activeOpacity={0.75}
            style={[s.flashCard, { borderLeftColor: i % 2 === 0 ? C.gold : C.red }]}>
            <Text style={s.flashDE}>{de?.trim()}</Text>
            {shown
              ? <Text style={s.flashEN}>{en?.trim()}</Text>
              : <Text style={s.flashHint}>Tippen für Übersetzung ↓</Text>
            }
          </TouchableOpacity>
        );
      })}
      {speak.length === 0 && <Text style={s.empty}>Keine Sätze vorhanden.</Text>}
    </View>
  );
}

// ─── STEP 2: GRAMMATIK ───────────────────────────────────────
function GrammarStep({ content }: any) {
  const chunks: string[] = content.chunks || [];
  return (
    <View style={s.card}>
      <Text style={s.sectionHeader}>📚 GRAMMATIK & REGELN</Text>
      {chunks.map((chunk, i) => {
        const isHeader = chunk.startsWith("━") || chunk.startsWith("REGEL") || chunk.startsWith("⚠️") || chunk.startsWith("RAHMEN");
        const isArrow = chunk.startsWith("→");
        return (
          <View key={i} style={[
            isHeader ? s.chunkHeader : isArrow ? s.chunkArrow : s.chunkBody
          ]}>
            <Text style={isHeader ? s.chunkHeaderText : isArrow ? s.chunkArrowText : s.chunkBodyText}>
              {chunk}
            </Text>
          </View>
        );
      })}
      {chunks.length === 0 && <Text style={s.empty}>Keine Grammatik vorhanden.</Text>}
    </View>
  );
}

// ─── STEP 3: GOLDENE REGELN ──────────────────────────────────
function TricksStep({ content }: any) {
  const mnemonics: string[] = content.mnemonic || [];
  return (
    <View style={s.card}>
      <Text style={s.sectionHeader}>💡 GOLDENE REGELN & MERKTRICKS</Text>
      {mnemonics.map((m, i) => {
        const isHeader = m.startsWith("━") || m.startsWith("TRICK") || m.startsWith("REGEL");
        return (
          <View key={i} style={[s.trickRow, { borderLeftColor: isHeader ? C.red : C.gold }]}>
            <Text style={isHeader ? s.trickHeaderText : s.trickText}>{m}</Text>
          </View>
        );
      })}
      {mnemonics.length === 0 && <Text style={s.empty}>Keine Tipps vorhanden.</Text>}
    </View>
  );
}

// ─── STEP 4: ÜBUNG ───────────────────────────────────────────
function PracticeStep({ content }: any) {
  const speak: string[] = content.speak || [];
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [done, setDone] = useState<Set<number>>(new Set());

  function reveal(i: number) {
    setRevealed(prev => { const n = new Set(prev); n.add(i); return n; });
  }
  function markDone(i: number) {
    setDone(prev => { const n = new Set(prev); n.add(i); return n; });
  }

  return (
    <View style={s.card}>
      <Text style={s.sectionHeader}>🏋️ ÜBUNG — Schau dir jeden Satz an</Text>
      <Text style={s.practiceSubtitle}>{done.size} / {speak.length} geübt</Text>
      <View style={s.practiceProgressTrack}>
        <View style={[s.practiceProgressFill, { width: `${speak.length ? (done.size / speak.length) * 100 : 0}%` }]} />
      </View>
      {speak.map((line, i) => {
        const [de, en] = line.split(" :: ");
        const isRevealed = revealed.has(i);
        const isDone = done.has(i);
        return (
          <View key={i} style={[s.practiceCard, isDone && s.practiceCardDone]}>
            <Text style={s.practiceDE}>{de?.trim()}</Text>
            {isRevealed
              ? <>
                  <Text style={s.practiceEN}>{en?.trim()}</Text>
                  {!isDone && (
                    <TouchableOpacity style={s.gotItBtn} onPress={() => markDone(i)}>
                      <Text style={s.gotItText}>✓ Verstanden!</Text>
                    </TouchableOpacity>
                  )}
                  {isDone && <Text style={s.doneText}>✓ Geübt</Text>}
                </>
              : <TouchableOpacity style={s.revealBtn} onPress={() => reveal(i)}>
                  <Text style={s.revealText}>Übersetzung zeigen →</Text>
                </TouchableOpacity>
            }
          </View>
        );
      })}
      {speak.length === 0 && <Text style={s.empty}>Keine Übungen vorhanden.</Text>}
    </View>
  );
}

// ─── STEP 5: QUIZ ────────────────────────────────────────────
function QuizStep({ questions, onComplete, onBack, lessonTitle, alreadyDone }: {
  questions: QuizQ[];
  onComplete: (xp: number) => void;
  onBack: () => void;
  lessonTitle: string;
  alreadyDone: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [done, setDone] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [showXpPop, setShowXpPop] = useState(false);

  const XP_PER_Q = 10;
  const BONUS_PERFECT = 50;

  if (questions.length === 0) return (
    <View style={s.card}>
      <Text style={s.empty}>Kein Quiz für diese Lektion verfügbar.</Text>
      <TouchableOpacity style={s.finishBtn} onPress={onBack}>
        <Text style={s.finishBtnText}>✓ Lektion abschließen</Text>
      </TouchableOpacity>
    </View>
  );

  function handleAnswer(i: number) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const correct = i === questions[idx].correctIndex;
    let earned = 0;
    if (correct) {
      earned = XP_PER_Q;
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak(ms => Math.max(ms, newStreak));
      setScore(sc => sc + 1);
      setXpEarned(x => x + earned);
      setShowXpPop(true);
      setTimeout(() => setShowXpPop(false), 800);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (idx < questions.length - 1) {
        setIdx(i => i + 1);
        setSelected(null);
        setAnswered(false);
      } else {
        const bonus = score + (correct ? 1 : 0) === questions.length ? BONUS_PERFECT : 0;
        setXpEarned(x => x + bonus);
        setDone(true);
        if (!alreadyDone) onComplete(xpEarned + earned + bonus);
      }
    }, 900);
  }

  if (done) {
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    const emoji = pct === 100 ? "🏆" : pct >= 80 ? "🌟" : pct >= 60 ? "👍" : "📖";
    const msg = pct === 100 ? "Perfekt! Makellos!" : pct >= 80 ? "Sehr gut gemacht!" : pct >= 60 ? "Gut — weiter so!" : "Übe weiter!";
    return (
      <View style={[s.card, { alignItems: "center", gap: 16 }]}>
        <Text style={{ fontSize: 64 }}>{emoji}</Text>
        <Text style={s.completionTitle}>{lessonTitle}</Text>
        <Text style={s.completionSub}>Abgeschlossen!</Text>

        {/* Score ring */}
        <View style={s.scoreRing}>
          <Text style={s.scoreNum}>{score}</Text>
          <Text style={s.scoreDen}>/{total}</Text>
        </View>
        <Text style={{ color: C.muted, fontSize: 15 }}>{pct}% richtig</Text>

        {/* Stats row */}
        <View style={s.statsRow}>
          <View style={s.statBox}>
            <Text style={s.statVal}>⚡ +{xpEarned}</Text>
            <Text style={s.statLabel}>XP verdient</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statVal}>🔥 {maxStreak}</Text>
            <Text style={s.statLabel}>Beste Serie</Text>
          </View>
          <View style={s.statBox}>
            <Text style={[s.statVal, { color: pct >= 60 ? C.green : C.red }]}>{pct}%</Text>
            <Text style={s.statLabel}>Genauigkeit</Text>
          </View>
        </View>

        <Text style={{ color: C.gold, fontSize: 16, fontWeight: "700" }}>{msg}</Text>

        {score < total && (
          <TouchableOpacity style={s.retryBtn} onPress={() => {
            setIdx(0); setSelected(null); setAnswered(false);
            setScore(0); setStreak(0); setMaxStreak(0); setDone(false); setXpEarned(0);
          }}>
            <Text style={s.retryBtnText}>↺ Nochmal versuchen</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={s.finishBtn} onPress={onBack}>
          <Text style={s.finishBtnText}>✓ Lektion abschließen</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = questions[idx];
  const optionColors = (i: number) => {
    if (!answered) return { bg: C.navy3, border: C.border, text: C.text };
    if (i === q.correctIndex) return { bg: C.greenBg, border: C.green, text: C.green };
    if (i === selected) return { bg: C.redBg, border: C.red, text: C.red };
    return { bg: C.navy3, border: C.border, text: C.muted };
  };

  return (
    <View style={s.quizContainer}>
      {/* Quiz header */}
      <View style={s.quizHeader}>
        <View style={s.quizProgressTrack}>
          <View style={[s.quizProgressFill, { width: `${((idx) / questions.length) * 100}%` }]} />
        </View>
        <View style={s.quizMeta}>
          <Text style={s.quizCounter}>{idx + 1} / {questions.length}</Text>
          <View style={s.streakBox}>
            <Text style={s.streakText}>{streak >= 3 ? "🔥" : "⚡"} {streak}</Text>
          </View>
          {showXpPop && (
            <View style={s.xpPop}>
              <Text style={s.xpPopText}>+{XP_PER_Q} XP!</Text>
            </View>
          )}
        </View>
      </View>

      {/* Score dots */}
      <View style={s.scoreDots}>
        {questions.map((_, i) => (
          <View key={i} style={[
            s.scoreDot,
            i < idx && (i < score ? s.scoreDotCorrect : s.scoreDotWrong),
            i === idx && s.scoreDotCurrent,
          ]} />
        ))}
      </View>

      {/* Question */}
      <View style={s.questionCard}>
        <Text style={s.questionText}>{q.question}</Text>
      </View>

      {/* Options */}
      <View style={s.optionsGrid}>
        {q.options.map((opt, i) => {
          const col = optionColors(i);
          return (
            <TouchableOpacity
              key={i}
              style={[s.optionBtn, { backgroundColor: col.bg, borderColor: col.border }]}
              onPress={() => handleAnswer(i)}
              activeOpacity={0.75}
            >
              <View style={[s.optionLetter, { borderColor: col.border }]}>
                <Text style={[s.optionLetterText, { color: col.border }]}>
                  {String.fromCharCode(65 + i)}
                </Text>
              </View>
              <Text style={[s.optionText, { color: col.text }]}>{opt}</Text>
              {answered && i === q.correctIndex && <Text style={s.checkmark}>✓</Text>}
              {answered && i === selected && i !== q.correctIndex && <Text style={s.xmark}>✗</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ─── COMPONENT STYLES ────────────────────────────────────────
const s = StyleSheet.create({
  card:               { margin: 20, backgroundColor: C.navy2, borderRadius: 20, borderWidth: 1, borderColor: C.border, padding: 20, gap: 12 },

  sectionHeader:      { color: C.gold, fontSize: 11, fontWeight: "800", letterSpacing: 2, marginBottom: 4 },
  empty:              { color: C.muted, textAlign: "center", fontSize: 14 },

  // Intro
  scienceBox:         { backgroundColor: C.navy3, borderRadius: 12, padding: 14, flexDirection: "row", gap: 10, alignItems: "flex-start" },
  scienceIcon:        { fontSize: 20 },
  scienceText:        { flex: 1, color: C.text, fontSize: 14, lineHeight: 22 },
  goalRow:            { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  goalNum:            { width: 28, height: 28, borderRadius: 8, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  goalNumText:        { fontSize: 13, fontWeight: "800" },
  goalText:           { flex: 1, color: C.text, fontSize: 14, lineHeight: 22 },

  // Speak / flashcards
  flashCard:          { backgroundColor: C.navy3, borderRadius: 12, padding: 16, borderLeftWidth: 3, gap: 6 },
  flashDE:            { color: C.white, fontSize: 16, fontWeight: "700" },
  flashEN:            { color: C.gold, fontSize: 14, fontStyle: "italic" },
  flashHint:          { color: C.muted, fontSize: 12, fontStyle: "italic" },

  // Grammar chunks
  chunkHeader:        { paddingTop: 8, paddingBottom: 2 },
  chunkHeaderText:    { color: C.gold, fontSize: 13, fontWeight: "800" },
  chunkArrow:         { paddingLeft: 12 },
  chunkArrowText:     { color: C.text, fontSize: 13, lineHeight: 22 },
  chunkBody:          { paddingLeft: 4 },
  chunkBodyText:      { color: C.text, fontSize: 13, lineHeight: 20 },

  // Tricks
  trickRow:           { borderLeftWidth: 3, paddingLeft: 12, paddingVertical: 6 },
  trickHeaderText:    { color: C.red, fontSize: 13, fontWeight: "800" },
  trickText:          { color: C.text, fontSize: 13, lineHeight: 22 },

  // Practice
  practiceSubtitle:   { color: C.muted, fontSize: 13 },
  practiceProgressTrack: { height: 4, backgroundColor: C.navy3, borderRadius: 2, marginBottom: 4 },
  practiceProgressFill:  { height: 4, backgroundColor: C.gold, borderRadius: 2 },
  practiceCard:       { backgroundColor: C.navy3, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: C.border, gap: 8 },
  practiceCardDone:   { borderColor: C.green, backgroundColor: "rgba(34,197,94,0.05)" },
  practiceDE:         { color: C.white, fontSize: 16, fontWeight: "700" },
  practiceEN:         { color: C.gold, fontSize: 14, fontStyle: "italic" },
  revealBtn:          { alignSelf: "flex-start", backgroundColor: C.goldBg, borderWidth: 1, borderColor: C.goldBorder, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  revealText:         { color: C.gold, fontSize: 13, fontWeight: "600" },
  gotItBtn:           { alignSelf: "flex-start", backgroundColor: C.greenBg, borderWidth: 1, borderColor: C.green, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  gotItText:          { color: C.green, fontSize: 13, fontWeight: "600" },
  doneText:           { color: C.green, fontSize: 13, fontWeight: "600" },

  // Quiz container
  quizContainer:      { margin: 20, gap: 16 },
  quizHeader:         { gap: 8 },
  quizProgressTrack:  { height: 6, backgroundColor: C.navy3, borderRadius: 3, overflow: "hidden" },
  quizProgressFill:   { height: 6, backgroundColor: C.gold, borderRadius: 3 },
  quizMeta:           { flexDirection: "row", alignItems: "center", gap: 10 },
  quizCounter:        { flex: 1, color: C.muted, fontSize: 13 },
  streakBox:          { backgroundColor: C.navy3, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  streakText:         { color: C.gold, fontSize: 13, fontWeight: "700" },
  xpPop:              { backgroundColor: C.gold, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  xpPopText:          { color: C.navy, fontSize: 13, fontWeight: "800" },

  // Score dots
  scoreDots:          { flexDirection: "row", flexWrap: "wrap", gap: 4, justifyContent: "center" },
  scoreDot:           { width: 10, height: 10, borderRadius: 5, backgroundColor: C.navy3 },
  scoreDotCorrect:    { backgroundColor: C.green },
  scoreDotWrong:      { backgroundColor: C.red },
  scoreDotCurrent:    { backgroundColor: C.gold, transform: [{ scale: 1.3 }] },

  // Question
  questionCard:       { backgroundColor: C.navy2, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 20 },
  questionText:       { color: C.white, fontSize: 20, fontWeight: "800", lineHeight: 28, textAlign: "center" },

  // Options
  optionsGrid:        { gap: 10 },
  optionBtn:          { flexDirection: "row", alignItems: "center", borderRadius: 14, borderWidth: 1, padding: 14, gap: 12 },
  optionLetter:       { width: 28, height: 28, borderRadius: 8, borderWidth: 1, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  optionLetterText:   { fontSize: 13, fontWeight: "800" },
  optionText:         { flex: 1, fontSize: 15, fontWeight: "500" },
  checkmark:          { color: C.green, fontSize: 18, fontWeight: "800" },
  xmark:              { color: C.red, fontSize: 18, fontWeight: "800" },

  // Completion
  completionTitle:    { color: C.white, fontSize: 22, fontWeight: "800", textAlign: "center" },
  completionSub:      { color: C.gold, fontSize: 15, letterSpacing: 2, textTransform: "uppercase" },
  scoreRing:          { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: C.gold, alignItems: "center", justifyContent: "center", flexDirection: "row" },
  scoreNum:           { color: C.gold, fontSize: 36, fontWeight: "800" },
  scoreDen:           { color: C.muted, fontSize: 20, marginTop: 8 },
  statsRow:           { flexDirection: "row", gap: 10, width: "100%" },
  statBox:            { flex: 1, backgroundColor: C.navy3, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 12, alignItems: "center", gap: 4 },
  statVal:            { color: C.gold, fontSize: 16, fontWeight: "800" },
  statLabel:          { color: C.muted, fontSize: 11 },
  retryBtn:           { width: "100%", height: 48, borderRadius: 14, backgroundColor: C.navy3, borderWidth: 1, borderColor: C.border, alignItems: "center", justifyContent: "center" },
  retryBtnText:       { color: C.muted, fontSize: 15, fontWeight: "600" },
  finishBtn:          { width: "100%", height: 52, borderRadius: 14, backgroundColor: C.gold, alignItems: "center", justifyContent: "center" },
  finishBtnText:      { color: C.navy, fontSize: 16, fontWeight: "800" },
});

// ─── SCREEN STYLES ───────────────────────────────────────────
const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: C.navy },
  header:         { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 14, paddingBottom: 10 },
  backText:       { color: C.gold, fontSize: 16, fontWeight: "600" },
  lessonNum:      { color: C.muted, fontSize: 12, letterSpacing: 1 },
  xpBadge:        { backgroundColor: C.goldBg, borderWidth: 1, borderColor: C.goldBorder, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  xpText:         { color: C.gold, fontSize: 13, fontWeight: "700" },

  stepsRow:       { flexDirection: "row", paddingHorizontal: 16, gap: 4, marginBottom: 8 },
  stepItem:       { flex: 1, alignItems: "center", gap: 4 },
  stepDot:        { width: 30, height: 30, borderRadius: 15, backgroundColor: C.navy3, borderWidth: 1, borderColor: C.border, alignItems: "center", justifyContent: "center" },
  stepDotActive:  { borderColor: C.gold, backgroundColor: C.goldBg },
  stepDotDone:    { borderColor: C.green, backgroundColor: C.greenBg },
  stepDotLabel:   { fontSize: 9, color: C.muted, textAlign: "center" },

  progressTrack:  { height: 2, backgroundColor: C.navy3, marginHorizontal: 20, marginBottom: 12 },
  progressFill:   { height: 2, backgroundColor: C.gold },

  title:          { fontSize: 22, fontWeight: "800", color: C.white, paddingHorizontal: 20, marginBottom: 8, letterSpacing: -0.5 },

  footer:         { flexDirection: "row", gap: 10, paddingHorizontal: 20, paddingVertical: 16, paddingBottom: Platform.OS === "ios" ? 36 : 20 },
  prevBtn:        { width: 52, height: 52, borderRadius: 14, backgroundColor: C.navy3, borderWidth: 1, borderColor: C.border, alignItems: "center", justifyContent: "center" },
  prevText:       { color: C.muted, fontSize: 22 },
  nextBtn:        { flex: 1, height: 52, borderRadius: 14, backgroundColor: C.goldBg, borderWidth: 1, borderColor: C.goldBorder, alignItems: "center", justifyContent: "center" },
  nextText:       { color: C.gold, fontSize: 16, fontWeight: "700" },
});
