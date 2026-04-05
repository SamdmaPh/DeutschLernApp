import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { C, SAFE_TOP, SERIF } from "../theme";
import { EXAM_DATA, getExamByLevel, type ExamLevel, type ExamModule, type ExamPart } from "../data/examData";

export default function ExamDetailScreen() {
  const router = useRouter();
  const { level } = useLocalSearchParams<{ level?: string }>();
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [expandedPart, setExpandedPart] = useState<string | null>(null);

  const exam = level ? getExamByLevel(level) : null;

  if (!exam) {
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
          <Text style={s.title}>Goethe-Prüfungen</Text>
          <Text style={s.subtitle}>Wähle ein Level für Details</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          {EXAM_DATA.map(ex => (
            <TouchableOpacity
              key={ex.level}
              style={s.levelCard}
              onPress={() => router.push(`/exam-detail?level=${ex.level}`)}
              activeOpacity={0.7}
            >
              <View style={[s.levelBadge, { backgroundColor: levelColor(ex.level) }]}>
                <Text style={s.levelBadgeText}>{ex.level}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.levelName}>{ex.name}</Text>
                <Text style={s.levelDesc}>{ex.description}</Text>
              </View>
              <Text style={{ color: C.gold, fontSize: 16 }}>→</Text>
            </TouchableOpacity>
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }

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
        <View style={[s.levelBadge, { backgroundColor: levelColor(exam.level), alignSelf: "flex-start" }]}>
          <Text style={s.levelBadgeText}>{exam.level}</Text>
        </View>
        <Text style={s.title}>{exam.name}</Text>
        <Text style={s.subtitle}>{exam.fullName}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Überblick */}
        <View style={s.card}>
          <Text style={s.cardLabel}>ÜBERBLICK</Text>
          <Text style={s.desc}>{exam.description}</Text>
          <View style={s.infoGrid}>
            <InfoItem emoji="⏰" label="Dauer" value={exam.duration} />
            <InfoItem emoji="✅" label="Bestehen" value={exam.passing} />
            <InfoItem emoji="💶" label="Gebühr" value={exam.fee} />
          </View>
        </View>

        {/* Kannst du... */}
        <View style={s.card}>
          <Text style={s.cardLabel}>DAS KANNST DU NACH {exam.level}</Text>
          {exam.canDo.map((item, i) => (
            <View key={i} style={s.canDoRow}>
              <Text style={s.canDoCheck}>✓</Text>
              <Text style={s.canDoText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Module */}
        <Text style={s.sectionLabel}>PRÜFUNGSMODULE</Text>
        {exam.modules.map(mod => (
          <View key={mod.name}>
            <TouchableOpacity
              style={s.moduleCard}
              onPress={() => setExpandedModule(expandedModule === mod.name ? null : mod.name)}
              activeOpacity={0.7}
            >
              <View style={s.moduleHeader}>
                <Text style={s.moduleIcon}>{moduleIcon(mod.nameEn)}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.moduleName}>{mod.name}</Text>
                  <Text style={s.moduleMeta}>{mod.duration} · {mod.points} Punkte</Text>
                </View>
                <Text style={s.moduleArrow}>{expandedModule === mod.name ? "▼" : "▶"}</Text>
              </View>
            </TouchableOpacity>

            {expandedModule === mod.name && (
              <View style={s.moduleParts}>
                {mod.parts.map((part, pi) => (
                  <PartCard
                    key={pi}
                    part={part}
                    expanded={expandedPart === `${mod.name}-${pi}`}
                    onToggle={() => setExpandedPart(expandedPart === `${mod.name}-${pi}` ? null : `${mod.name}-${pi}`)}
                  />
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Allgemeine Tipps */}
        <View style={s.card}>
          <Text style={s.cardLabel}>ALLGEMEINE TIPPS FÜR {exam.level}</Text>
          {exam.generalTips.map((tip, i) => (
            <View key={i} style={s.tipRow}>
              <Text style={s.tipNum}>{i + 1}.</Text>
              <Text style={s.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Materialien */}
        <View style={s.card}>
          <Text style={s.cardLabel}>EMPFOHLENE MATERIALIEN</Text>
          {exam.resources.map((res, i) => (
            <View key={i} style={s.resourceRow}>
              <Text style={s.resourceIcon}>📚</Text>
              <Text style={s.resourceText}>{res}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

function PartCard({ part, expanded, onToggle }: { part: ExamPart; expanded: boolean; onToggle: () => void }) {
  return (
    <View style={s.partCard}>
      <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
        <Text style={s.partName}>{part.name}</Text>
        <Text style={s.partDesc}>{part.description}</Text>
        <Text style={s.partType}>{part.taskType}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={s.partExpanded}>
          {/* Beispielaufgabe */}
          {part.example && (
            <View style={s.exampleBox}>
              <Text style={s.exampleLabel}>BEISPIELAUFGABE</Text>
              <Text style={s.exampleInstruction}>{part.example.instruction}</Text>
              <View style={s.exampleContent}>
                <Text style={s.exampleContentText}>{part.example.content}</Text>
              </View>
              <Text style={s.exampleQuestion}>{part.example.question}</Text>
              {part.example.options && (
                <View style={s.exampleOptions}>
                  {part.example.options.map((opt, i) => (
                    <View key={i} style={[s.exampleOption, opt === part.example!.answer ? s.exampleOptionCorrect : {}]}>
                      <Text style={[s.exampleOptionText, opt === part.example!.answer ? { fontWeight: "700", color: C.green } : {}]}>
                        {opt === part.example!.answer ? "✓ " : "  "}{opt}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
              {!part.example.options && (
                <View style={s.exampleAnswer}>
                  <Text style={s.exampleAnswerLabel}>Beispielantwort:</Text>
                  <Text style={s.exampleAnswerText}>{part.example.answer}</Text>
                </View>
              )}
              <Text style={s.exampleExplanation}>{part.example.explanation}</Text>
            </View>
          )}

          {/* Tipps */}
          <View style={{ marginTop: 12 }}>
            <Text style={s.partTipsLabel}>Tipps:</Text>
            {part.tips.map((tip, i) => (
              <View key={i} style={s.partTipRow}>
                <Text style={s.partTipBullet}>•</Text>
                <Text style={s.partTipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

function InfoItem({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <View style={s.infoItem}>
      <Text style={{ fontSize: 20 }}>{emoji}</Text>
      <Text style={s.infoLabel}>{label}</Text>
      <Text style={s.infoValue}>{value}</Text>
    </View>
  );
}

function moduleIcon(nameEn: string): string {
  switch (nameEn) {
    case "Reading": return "📖";
    case "Listening": return "👂";
    case "Writing": return "✍️";
    case "Speaking": return "🗣️";
    default: return "📝";
  }
}

function levelColor(level: string): string {
  const colors: Record<string, string> = { A1: "#2E8B57", A2: "#2563EB", B1: "#B8922A", B2: "#7C3AED", C1: "#CC0000", C2: "#1A1A1A" };
  return colors[level] || C.gold;
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  flagStrip: { flexDirection: "row", height: 3 },
  flag: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 8 },
  backBtn: { paddingVertical: 8 },
  backText: { fontSize: 14, color: C.gold, fontWeight: "700" },
  title: { fontFamily: SERIF, fontSize: 24, fontWeight: "700", color: C.text, marginTop: 4 },
  subtitle: { fontSize: 13, color: C.muted, marginTop: 2 },
  scroll: { paddingHorizontal: 24, paddingBottom: 100 },

  card: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 20, marginBottom: 16 },
  cardLabel: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 12 },
  desc: { fontSize: 15, color: C.text, lineHeight: 22, marginBottom: 12 },

  infoGrid: { flexDirection: "row", gap: 12, marginTop: 8 },
  infoItem: { flex: 1, backgroundColor: C.bg, borderRadius: 12, padding: 12, alignItems: "center", gap: 4 },
  infoLabel: { fontSize: 10, fontWeight: "700", color: C.muted, textTransform: "uppercase" },
  infoValue: { fontSize: 12, fontWeight: "700", color: C.text, textAlign: "center" },

  canDoRow: { flexDirection: "row", gap: 10, marginBottom: 8, alignItems: "flex-start" },
  canDoCheck: { fontSize: 14, color: C.green, fontWeight: "700", marginTop: 1 },
  canDoText: { flex: 1, fontSize: 14, color: C.textSec, lineHeight: 20 },

  sectionLabel: { fontSize: 10, fontWeight: "900", color: C.muted, letterSpacing: 2, marginBottom: 12, marginTop: 8 },

  moduleCard: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16, marginBottom: 6 },
  moduleHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  moduleIcon: { fontSize: 24 },
  moduleName: { fontSize: 16, fontWeight: "700", color: C.text },
  moduleMeta: { fontSize: 12, color: C.muted, marginTop: 2 },
  moduleArrow: { fontSize: 12, color: C.muted },

  moduleParts: { paddingLeft: 8, paddingBottom: 12 },
  partCard: { backgroundColor: C.bg, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 6, marginTop: 4 },
  partName: { fontSize: 14, fontWeight: "700", color: C.text },
  partDesc: { fontSize: 13, color: C.textSec, marginTop: 4, lineHeight: 19 },
  partType: { fontSize: 11, color: C.gold, fontWeight: "600", marginTop: 6 },

  partExpanded: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.border },

  exampleBox: { backgroundColor: C.card, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: C.goldLine },
  exampleLabel: { fontSize: 9, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 8 },
  exampleInstruction: { fontSize: 13, fontWeight: "600", color: C.text, marginBottom: 8 },
  exampleContent: { backgroundColor: C.bg, borderRadius: 8, padding: 12, marginBottom: 8 },
  exampleContentText: { fontSize: 13, color: C.textSec, lineHeight: 20 },
  exampleQuestion: { fontSize: 14, fontWeight: "700", color: C.text, marginBottom: 8 },
  exampleOptions: { gap: 6 },
  exampleOption: { backgroundColor: C.bg, borderRadius: 8, padding: 10, borderWidth: 1, borderColor: C.border },
  exampleOptionCorrect: { borderColor: C.green, backgroundColor: C.greenDim },
  exampleOptionText: { fontSize: 13, color: C.text },
  exampleAnswer: { backgroundColor: C.greenDim, borderRadius: 8, padding: 12, marginBottom: 8 },
  exampleAnswerLabel: { fontSize: 11, fontWeight: "700", color: C.green, marginBottom: 4 },
  exampleAnswerText: { fontSize: 13, color: C.text, lineHeight: 20 },
  exampleExplanation: { fontSize: 12, color: C.muted, fontStyle: "italic", marginTop: 8, lineHeight: 18 },

  partTipsLabel: { fontSize: 12, fontWeight: "700", color: C.textSec, marginBottom: 6 },
  partTipRow: { flexDirection: "row", gap: 8, marginBottom: 4 },
  partTipBullet: { fontSize: 13, color: C.gold, marginTop: 1 },
  partTipText: { flex: 1, fontSize: 13, color: C.textSec, lineHeight: 19 },

  tipRow: { flexDirection: "row", gap: 8, marginBottom: 8, alignItems: "flex-start" },
  tipNum: { fontSize: 14, fontWeight: "700", color: C.gold, width: 20 },
  tipText: { flex: 1, fontSize: 14, color: C.textSec, lineHeight: 20 },

  resourceRow: { flexDirection: "row", gap: 10, marginBottom: 8, alignItems: "center" },
  resourceIcon: { fontSize: 16 },
  resourceText: { flex: 1, fontSize: 14, color: C.text },

  levelCard: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 18, marginBottom: 10, gap: 14 },
  levelBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  levelBadgeText: { fontSize: 14, fontWeight: "900", color: "#FFF" },
  levelName: { fontSize: 16, fontWeight: "700", color: C.text },
  levelDesc: { fontSize: 13, color: C.muted, marginTop: 3, lineHeight: 18 },
});
