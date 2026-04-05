import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, StatusBar } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { C, SAFE_TOP, SERIF } from "../theme";
import { GRAMMAR_DATA, getGrammarTopic, type GrammarTopic, type GrammarExercise } from "../data/grammarData";

export default function GrammarDetailScreen() {
  const router = useRouter();
  const { topicId, sectionId } = useLocalSearchParams<{ topicId?: string; sectionId?: string }>();
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<number, string>>({});
  const [exerciseChecked, setExerciseChecked] = useState<Record<number, boolean>>({});

  // Topic detail view
  if (topicId) {
    const topic = getGrammarTopic(topicId);
    if (!topic) return <View style={s.container}><Text>Thema nicht gefunden</Text></View>;
    return <TopicDetail topic={topic} router={router} exerciseAnswers={exerciseAnswers} setExerciseAnswers={setExerciseAnswers} exerciseChecked={exerciseChecked} setExerciseChecked={setExerciseChecked} />;
  }

  // Section overview (list of topics)
  if (sectionId) {
    const section = GRAMMAR_DATA.find(s => s.id === sectionId);
    if (!section) return <View style={s.container}><Text>Sektion nicht gefunden</Text></View>;
    return (
      <View style={s.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ height: SAFE_TOP }} />
        <View style={s.flagStrip}>
          <View style={[s.flag, { backgroundColor: C.flagBlack }]} />
          <View style={[s.flag, { backgroundColor: C.flagRed }]} />
          <View style={[s.flag, { backgroundColor: C.flagGold }]} />
        </View>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <Text style={s.backText}>← Bibliothek</Text>
          </TouchableOpacity>
          <Text style={s.title}>{section.emoji} {section.title}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          {section.topics.map(topic => (
            <TouchableOpacity
              key={topic.id}
              style={s.topicCard}
              onPress={() => router.push(`/grammar-detail?topicId=${topic.id}`)}
              activeOpacity={0.7}
            >
              <View style={s.topicHeader}>
                <View style={[s.levelBadge, { backgroundColor: levelColor(topic.level) }]}>
                  <Text style={s.levelText}>{topic.level}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.topicTitle}>{topic.title}</Text>
                  <Text style={s.topicTitleEn}>{topic.titleEn}</Text>
                </View>
                <Text style={{ color: C.gold, fontSize: 16 }}>→</Text>
              </View>
              <Text style={s.topicDesc}>{topic.shortDesc}</Text>
            </TouchableOpacity>
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }

  return <View style={s.container}><Text>Fehler</Text></View>;
}

function TopicDetail({ topic, router, exerciseAnswers, setExerciseAnswers, exerciseChecked, setExerciseChecked }: {
  topic: GrammarTopic; router: any;
  exerciseAnswers: Record<number, string>; setExerciseAnswers: (a: Record<number, string>) => void;
  exerciseChecked: Record<number, boolean>; setExerciseChecked: (a: Record<number, boolean>) => void;
}) {
  return (
    <View style={s.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: SAFE_TOP }} />
      <View style={s.flagStrip}>
        <View style={[s.flag, { backgroundColor: C.flagBlack }]} />
        <View style={[s.flag, { backgroundColor: C.flagRed }]} />
        <View style={[s.flag, { backgroundColor: C.flagGold }]} />
      </View>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>← Zurück</Text>
        </TouchableOpacity>
        <View style={[s.levelBadge, { backgroundColor: levelColor(topic.level), alignSelf: "flex-start" }]}>
          <Text style={s.levelText}>{topic.level}</Text>
        </View>
        <Text style={s.title}>{topic.title}</Text>
        <Text style={s.titleEn}>{topic.titleEn}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Erklärung */}
        <View style={s.card}>
          <Text style={s.cardLabel}>ERKLÄRUNG</Text>
          {topic.explanation.split("\n\n").map((para, i) => (
            <Text key={i} style={s.explanationText}>{formatBold(para)}</Text>
          ))}
        </View>

        {/* Tabellen */}
        {topic.tables?.map((table, ti) => (
          <View key={ti} style={s.card}>
            <Text style={s.cardLabel}>TABELLE</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <View style={s.tableHeaderRow}>
                  {table.headers.map((h, i) => (
                    <View key={i} style={[s.tableCell, s.tableHeaderCell, { minWidth: cellWidth(table.headers.length) }]}>
                      <Text style={s.tableHeaderText}>{h}</Text>
                    </View>
                  ))}
                </View>
                {table.rows.map((row, ri) => (
                  <View key={ri} style={[s.tableRow, ri % 2 === 0 ? { backgroundColor: C.bg } : {}]}>
                    {row.map((cell, ci) => (
                      <View key={ci} style={[s.tableCell, { minWidth: cellWidth(table.headers.length) }]}>
                        <Text style={[s.tableCellText, ci === 0 ? { fontWeight: "700" } : {}]}>{cell}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        ))}

        {/* Beispiele */}
        <View style={s.card}>
          <Text style={s.cardLabel}>BEISPIELE</Text>
          {topic.examples.map((ex, i) => (
            <View key={i} style={s.exampleRow}>
              <Text style={s.exampleDe}>{ex.de}</Text>
              <Text style={s.exampleEn}>{ex.en}</Text>
            </View>
          ))}
        </View>

        {/* Tipps */}
        <View style={s.card}>
          <Text style={s.cardLabel}>TIPPS & MERKHILFEN</Text>
          {topic.tips.map((tip, i) => (
            <View key={i} style={s.tipRow}>
              <Text style={s.tipEmoji}>{tip.emoji}</Text>
              <Text style={s.tipText}>{tip.text}</Text>
            </View>
          ))}
        </View>

        {/* Übungen */}
        {topic.exercises.length > 0 && (
          <View style={s.card}>
            <Text style={s.cardLabel}>ÜBUNGEN</Text>
            {topic.exercises.map((ex, i) => (
              <ExerciseItem
                key={i}
                exercise={ex}
                index={i}
                answer={exerciseAnswers[i] || ""}
                checked={exerciseChecked[i] || false}
                onAnswer={(ans) => setExerciseAnswers({ ...exerciseAnswers, [i]: ans })}
                onCheck={() => setExerciseChecked({ ...exerciseChecked, [i]: true })}
              />
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

function ExerciseItem({ exercise, index, answer, checked, onAnswer, onCheck }: {
  exercise: GrammarExercise; index: number; answer: string; checked: boolean;
  onAnswer: (a: string) => void; onCheck: () => void;
}) {
  const isCorrect = answer.toLowerCase().trim() === exercise.answer.toLowerCase().trim();

  return (
    <View style={[s.exerciseBox, checked ? (isCorrect ? s.exerciseCorrect : s.exerciseWrong) : {}]}>
      <Text style={s.exerciseQ}>{index + 1}. {exercise.question}</Text>

      {exercise.type === "choice" && exercise.options ? (
        <View style={s.optionsGrid}>
          {exercise.options.map((opt, oi) => (
            <TouchableOpacity
              key={oi}
              style={[
                s.optionBtn,
                answer === opt ? s.optionSelected : {},
                checked && opt === exercise.answer ? s.optionCorrectBorder : {},
              ]}
              onPress={() => { if (!checked) onAnswer(opt); }}
              activeOpacity={0.7}
            >
              <Text style={[s.optionText, answer === opt ? s.optionTextSelected : {}]}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <TextInput
          style={s.fillInput}
          placeholder="Deine Antwort..."
          placeholderTextColor={C.muted}
          value={answer}
          onChangeText={onAnswer}
          editable={!checked}
        />
      )}

      {!checked && answer.length > 0 && (
        <TouchableOpacity style={s.checkBtn} onPress={onCheck} activeOpacity={0.7}>
          <Text style={s.checkBtnText}>Prüfen</Text>
        </TouchableOpacity>
      )}

      {checked && (
        <View style={s.feedbackBox}>
          <Text style={[s.feedbackText, { color: isCorrect ? C.green : C.red }]}>
            {isCorrect ? "✓ Richtig!" : `✗ Falsch. Richtige Antwort: ${exercise.answer}`}
          </Text>
          {exercise.explanation && <Text style={s.feedbackExpl}>{exercise.explanation}</Text>}
        </View>
      )}
    </View>
  );
}

function formatBold(text: string): string {
  return text.replace(/\*\*/g, "");
}

function levelColor(level: string): string {
  const colors: Record<string, string> = { A1: "#2E8B57", A2: "#2563EB", B1: "#B8922A", B2: "#7C3AED", C1: "#CC0000", C2: "#1A1A1A" };
  return colors[level] || C.gold;
}

function cellWidth(cols: number): number {
  if (cols <= 3) return 120;
  if (cols <= 4) return 100;
  return 85;
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  flagStrip: { flexDirection: "row", height: 3 },
  flag: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 8 },
  backBtn: { paddingVertical: 8 },
  backText: { fontSize: 14, color: C.gold, fontWeight: "700" },
  title: { fontFamily: SERIF, fontSize: 24, fontWeight: "700", color: C.text, marginTop: 4 },
  titleEn: { fontSize: 14, color: C.muted, marginTop: 2 },
  scroll: { paddingHorizontal: 24, paddingBottom: 100 },

  topicCard: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 18, marginBottom: 10 },
  topicHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  topicTitle: { fontSize: 16, fontWeight: "700", color: C.text },
  topicTitleEn: { fontSize: 12, color: C.muted, marginTop: 2 },
  topicDesc: { fontSize: 13, color: C.textSec, marginTop: 8, lineHeight: 19 },

  levelBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  levelText: { fontSize: 11, fontWeight: "900", color: "#FFF" },

  card: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 20, marginBottom: 16, marginTop: 4 },
  cardLabel: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 12 },

  explanationText: { fontSize: 15, color: C.text, lineHeight: 23, marginBottom: 12 },

  tableHeaderRow: { flexDirection: "row", borderBottomWidth: 2, borderBottomColor: C.gold },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: C.border },
  tableCell: { paddingHorizontal: 10, paddingVertical: 8 },
  tableHeaderCell: { backgroundColor: C.goldDim },
  tableHeaderText: { fontSize: 12, fontWeight: "900", color: C.text },
  tableCellText: { fontSize: 13, color: C.text },

  exampleRow: { marginBottom: 12, paddingLeft: 12, borderLeftWidth: 3, borderLeftColor: C.goldLine },
  exampleDe: { fontSize: 15, fontWeight: "600", color: C.text, fontStyle: "italic" },
  exampleEn: { fontSize: 13, color: C.muted, marginTop: 3 },

  tipRow: { flexDirection: "row", gap: 10, marginBottom: 10, alignItems: "flex-start" },
  tipEmoji: { fontSize: 18, marginTop: 1 },
  tipText: { flex: 1, fontSize: 14, color: C.textSec, lineHeight: 20 },

  exerciseBox: { backgroundColor: C.bg, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: C.border },
  exerciseCorrect: { borderColor: C.green, backgroundColor: C.greenDim },
  exerciseWrong: { borderColor: C.red, backgroundColor: C.redDim },
  exerciseQ: { fontSize: 15, fontWeight: "600", color: C.text, marginBottom: 12 },

  optionsGrid: { gap: 8 },
  optionBtn: { backgroundColor: C.card, borderRadius: 10, borderWidth: 1, borderColor: C.border, paddingVertical: 12, paddingHorizontal: 16 },
  optionSelected: { borderColor: C.gold, backgroundColor: C.goldDim },
  optionCorrectBorder: { borderColor: C.green, borderWidth: 2 },
  optionText: { fontSize: 14, color: C.text },
  optionTextSelected: { fontWeight: "700", color: C.gold },

  fillInput: { backgroundColor: C.card, borderRadius: 10, borderWidth: 1, borderColor: C.border, paddingVertical: 12, paddingHorizontal: 16, fontSize: 15, color: C.text },

  checkBtn: { backgroundColor: C.gold, borderRadius: 10, paddingVertical: 10, alignItems: "center", marginTop: 10 },
  checkBtnText: { fontSize: 14, fontWeight: "700", color: "#FFF" },

  feedbackBox: { marginTop: 10 },
  feedbackText: { fontSize: 14, fontWeight: "700" },
  feedbackExpl: { fontSize: 13, color: C.muted, marginTop: 4, fontStyle: "italic" },
});
