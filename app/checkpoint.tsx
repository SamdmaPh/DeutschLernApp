import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, StatusBar } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ALL_STATIC_LESSONS } from "../data/lessonData";
import { JOURNEY_CITIES } from "../data/journeyData";
import { Avatar } from "../services/avatar";
import { Progress } from "../services/progress";
import { C, SAFE_TOP, SERIF } from "../theme";

// ── Checkpoint: Boss-Fight am Ende jeder Stadt ──
// Tests all skills from that city's lessons

interface Question {
  type: "choice" | "fill" | "translate" | "listen";
  question: string;
  options?: string[];
  answer: string;
  hint?: string;
}

function generateQuestions(cityId: string): Question[] {
  const city = JOURNEY_CITIES.find(c => c.id === cityId);
  if (!city) return [];

  const lessons = ALL_STATIC_LESSONS.filter((l: any) => city.lessonIds.includes(l.id));
  const questions: Question[] = [];

  for (const lesson of lessons) {
    // Pull from exercises
    for (const exerciseGroup of (lesson as any).exercises || []) {
      for (const task of exerciseGroup.tasks || []) {
        if (task.options && task.question) {
          questions.push({
            type: "choice",
            question: task.question,
            options: task.options,
            answer: task.options[task.correct ?? task.answer ?? 0],
          });
        }
        if (task.prompt && task.expected) {
          questions.push({
            type: "fill",
            question: task.prompt,
            answer: task.expected,
            hint: task.expected[0] + "_".repeat(task.expected.length - 1),
          });
        }
      }
    }

    // Pull from vocabulary
    const coreWords = (lesson as any).vocabulary?.core?.slice(0, 3) || [];
    for (const w of coreWords) {
      const [de, en] = w.split("::").map((s: string) => s.trim());
      if (de && en) {
        questions.push({ type: "translate", question: `Übersetze: "${en}"`, answer: de });
      }
    }
  }

  // Shuffle and limit to 10
  return questions.sort(() => Math.random() - 0.5).slice(0, 10);
}

export default function CheckpointScreen() {
  const router = useRouter();
  const { cityId } = useLocalSearchParams<{ cityId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);

  const city = JOURNEY_CITIES.find(c => c.id === cityId);

  useEffect(() => {
    if (cityId) {
      setQuestions(generateQuestions(cityId));
    }
  }, [cityId]);

  if (!city || questions.length === 0) {
    return (
      <View style={s.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ height: SAFE_TOP + 20, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: C.text, fontSize: 16 }}>Checkpoint wird geladen...</Text>
        </View>
      </View>
    );
  }

  const q = questions[current];
  const isCorrect = checked && answer.toLowerCase().trim() === q?.answer?.toLowerCase().trim();
  const progress = ((current + (checked ? 1 : 0)) / questions.length) * 100;
  const passed = score >= Math.ceil(questions.length * 0.6);

  const checkAnswer = () => {
    setChecked(true);
    if (answer.toLowerCase().trim() === q.answer.toLowerCase().trim()) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setAnswer("");
      setChecked(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <View style={s.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ height: SAFE_TOP }} />
        <ScrollView contentContainerStyle={s.scroll}>
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text style={{ fontSize: 64, marginBottom: 16 }}>{passed ? "🏆" : "💪"}</Text>
            <Text style={[s.title, { textAlign: "center" }]}>
              {passed ? `${city.emoji} ${city.name} — Checkpoint bestanden!` : `${city.emoji} ${city.name} — Noch nicht bestanden`}
            </Text>
            <Text style={{ fontSize: 40, fontWeight: "900", color: passed ? C.green : C.red, marginTop: 16 }}>
              {score}/{questions.length}
            </Text>
            <Text style={{ fontSize: 15, color: C.muted, marginTop: 8 }}>
              {passed ? "Du hast bewiesen, dass du bereit bist für die nächste Stadt!" : "Übe die Lektionen nochmal und versuche es erneut."}
            </Text>

            {passed && (
              <View style={{ backgroundColor: C.greenDim, borderRadius: 16, padding: 20, marginTop: 24, width: "100%", borderWidth: 1, borderColor: C.greenLine }}>
                <Text style={{ fontSize: 13, fontWeight: "800", color: C.green, letterSpacing: 1 }}>BELOHNUNG</Text>
                <Text style={{ fontSize: 20, fontWeight: "700", color: C.text, marginTop: 8 }}>🗺️ Neue Stadt freigeschaltet!</Text>
                <Text style={{ fontSize: 14, color: C.textSec, marginTop: 4 }}>Dein Avatar reist weiter auf der Karte.</Text>
              </View>
            )}

            <TouchableOpacity
              style={[s.finishBtn, { marginTop: 30 }]}
              onPress={async () => {
                if (passed) {
                  await Progress.addXP(50);
                }
                router.back();
              }}
            >
              <Text style={s.finishBtnText}>{passed ? "Weiterreisen →" : "Zurück zum Üben"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: SAFE_TOP }} />

      {/* Top bar */}
      <View style={s.topRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.closeBtn}>✕</Text>
        </TouchableOpacity>
        <View style={s.progressTrack}><View style={[s.progressFill, { width: `${progress}%` }]} /></View>
        <View style={s.scoreBadge}><Text style={s.scoreText}>✓{score}</Text></View>
      </View>

      {/* Boss header */}
      <View style={{ paddingHorizontal: 24, marginTop: 8 }}>
        <Text style={{ fontSize: 11, fontWeight: "900", color: C.red, letterSpacing: 2 }}>⚔️ CHECKPOINT — {city.name.toUpperCase()}</Text>
        <Text style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Frage {current + 1} von {questions.length}</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.cardInner}>
          {/* Question */}
          <Text style={s.questionText}>{q.question}</Text>

          {/* Hint for fill questions */}
          {q.type === "fill" && q.hint && !checked && (
            <Text style={{ fontSize: 12, color: C.blue, marginTop: 4 }}>💡 {q.hint}</Text>
          )}

          {/* Choice options */}
          {q.type === "choice" && q.options && (
            <View style={{ marginTop: 16, gap: 8 }}>
              {q.options.map((opt, i) => {
                const isSelected = answer === opt;
                const isRight = checked && opt === q.answer;
                const isWrong = checked && isSelected && opt !== q.answer;
                return (
                  <TouchableOpacity
                    key={i}
                    style={[s.optBtn, isRight && s.optCorrect, isWrong && s.optWrong, !checked && isSelected && { borderColor: C.gold, backgroundColor: C.goldDim }]}
                    onPress={() => { if (!checked) setAnswer(opt); }}
                    activeOpacity={checked ? 1 : 0.7}
                  >
                    <Text style={[s.optText, isRight && { color: C.green, fontWeight: "700" }]}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* Fill/Translate input */}
          {(q.type === "fill" || q.type === "translate") && (
            <TextInput
              style={[s.input, checked && isCorrect && { borderColor: C.green }, checked && !isCorrect && { borderColor: C.red }]}
              value={answer}
              onChangeText={setAnswer}
              placeholder="Antwort eingeben..."
              placeholderTextColor={C.muted}
              editable={!checked}
              autoCapitalize="none"
            />
          )}

          {/* Check / Next */}
          {!checked && answer.length > 0 && (
            <TouchableOpacity style={s.checkBtn} onPress={checkAnswer}>
              <Text style={s.checkBtnText}>Prüfen ✓</Text>
            </TouchableOpacity>
          )}

          {checked && (
            <View style={{ marginTop: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: isCorrect ? C.green : C.red }}>
                {isCorrect ? "✅ Richtig!" : `❌ Falsch — Antwort: "${q.answer}"`}
              </Text>
              <TouchableOpacity style={s.nextBtn} onPress={nextQuestion}>
                <Text style={s.nextBtnText}>{current < questions.length - 1 ? "Nächste Frage →" : "Ergebnis sehen →"}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingHorizontal: 24, paddingBottom: 100 },
  topRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 8, gap: 12 },
  closeBtn: { fontSize: 20, color: C.muted, fontWeight: "700" },
  progressTrack: { flex: 1, height: 8, backgroundColor: C.bg3, borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: C.red, borderRadius: 4 },
  scoreBadge: { backgroundColor: C.greenDim, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  scoreText: { fontSize: 14, fontWeight: "900", color: C.green },
  title: { fontFamily: SERIF, fontSize: 24, fontWeight: "700", color: C.text },
  cardInner: { marginTop: 20 },
  questionText: { fontSize: 18, fontWeight: "700", color: C.text, lineHeight: 26 },
  optBtn: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16 },
  optCorrect: { borderColor: C.green, backgroundColor: C.greenDim },
  optWrong: { borderColor: C.red, backgroundColor: C.redDim },
  optText: { fontSize: 15, color: C.text },
  input: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16, fontSize: 16, color: C.text, marginTop: 16 },
  checkBtn: { backgroundColor: C.gold, borderRadius: 14, paddingVertical: 14, alignItems: "center", marginTop: 16 },
  checkBtnText: { fontSize: 16, fontWeight: "700", color: "#FFF" },
  nextBtn: { backgroundColor: C.gold, borderRadius: 14, paddingVertical: 14, alignItems: "center", marginTop: 16 },
  nextBtnText: { fontSize: 16, fontWeight: "700", color: "#FFF" },
  finishBtn: { backgroundColor: C.gold, borderRadius: 16, paddingVertical: 16, paddingHorizontal: 40, alignItems: "center" },
  finishBtnText: { fontSize: 16, fontWeight: "700", color: "#FFF" },
});
