import { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Progress } from "../../services/progress";
import { ALL_STATIC_LESSONS } from "../../data/lessonData";
import { getWordOfTheDay } from "../../data/vocabData";
import { C, SAFE_TOP, SERIF } from "../../theme";

export default function HeuteScreen() {
  const router = useRouter();
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState<string[]>([]);
  const [name, setName] = useState("");

  useFocusEffect(useCallback(() => {
    Progress.getAll().then(p => {
      setXp(p.xp); setStreak(p.streak); setDone(p.done); setName(p.name);
    });
  }, []));

  // Einfach die nächste unerledigte Lektion nach order_index
  const sortedLessons = [...ALL_STATIC_LESSONS].sort((a: any, b: any) => a.order_index - b.order_index);
  const nextLesson = sortedLessons.find((l: any) => !done.includes(l.id)) as any;
  const completedCount = done.length;
  const totalCount = ALL_STATIC_LESSONS.length;
  const wotd = getWordOfTheDay();
  const greeting = new Date().getHours() < 12 ? "Guten Morgen" : new Date().getHours() < 18 ? "Guten Tag" : "Guten Abend";

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: SAFE_TOP }} />
      <View style={s.flagStrip}>
        <View style={[s.flag, { backgroundColor: C.flagBlack }]} />
        <View style={[s.flag, { backgroundColor: C.flagRed }]} />
        <View style={[s.flag, { backgroundColor: C.flagGold }]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>{greeting},</Text>
            <Text style={s.name}>{name || "Deutschlerner"}</Text>
          </View>
          <View style={s.statsRow}>
            <View style={[s.statPill, { backgroundColor: C.redDim }]}>
              <Text style={[s.statText, { color: C.red }]}>🔥 {streak}</Text>
            </View>
            <View style={[s.statPill, { backgroundColor: C.goldDim }]}>
              <Text style={[s.statText, { color: C.gold }]}>⚡ {xp}</Text>
            </View>
          </View>
        </View>

        {/* Nächste Lektion */}
        {nextLesson && (
          <TouchableOpacity
            style={s.heroCard}
            onPress={() => router.push({ pathname: "/lesson-v2", params: { lessonId: nextLesson.id } })}
            activeOpacity={0.85}
          >
            <Text style={s.heroLabel}>NÄCHSTE LEKTION</Text>
            <View style={s.heroProgressBar}>
              <View style={[s.heroProgressFill, { width: `${(completedCount / totalCount) * 100}%` }]} />
            </View>
            <Text style={s.heroProgress}>{completedCount} von {totalCount} Lektionen</Text>

            <Text style={s.heroTitle}>{nextLesson.title_de || nextLesson.title}</Text>
            <Text style={s.heroDesc} numberOfLines={2}>{nextLesson.description}</Text>

            <View style={s.heroCTA}>
              <Text style={s.heroCTAText}>▶  LEKTION STARTEN</Text>
            </View>
          </TouchableOpacity>
        )}

        {!nextLesson && (
          <View style={s.heroCard}>
            <Text style={{ fontSize: 48, textAlign: "center", marginBottom: 12 }}>🎉</Text>
            <Text style={[s.heroTitle, { textAlign: "center" }]}>Alle Lektionen abgeschlossen!</Text>
          </View>
        )}

        {/* Tägliche Wiederholung */}
        <TouchableOpacity style={s.reviewCard} onPress={() => router.push("/review")} activeOpacity={0.8}>
          <Text style={{ fontSize: 24 }}>🔄</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.reviewTitle}>Tägliche Wiederholung</Text>
            <Text style={s.reviewSub}>Vokabeln festigen · 5 Min</Text>
          </View>
          <Text style={{ fontSize: 18, color: C.gold }}>→</Text>
        </TouchableOpacity>

        {/* Wort des Tages */}
        <View style={s.wotdCard}>
          <View style={s.wotdHeader}>
            <Text style={s.wotdLabel}>WORT DES TAGES</Text>
            <Text style={s.wotdLevel}>{wotd.level}</Text>
          </View>
          <Text style={s.wotdWord}>{wotd.article ? `${wotd.article} ` : ""}{wotd.word}</Text>
          <Text style={s.wotdMeaning}>{wotd.meaningDe}</Text>
          <Text style={s.wotdMeaningEn}>{wotd.meaningEn}</Text>
          <View style={s.wotdDivider} />
          <Text style={s.wotdExample}>"{wotd.example}"</Text>
          <Text style={s.wotdExampleEn}>{wotd.exampleEn}</Text>
        </View>

        {/* Schnellzugriff */}
        <View style={s.quickRow}>
          <TouchableOpacity style={s.quickCard} onPress={() => router.push("/conversation")} activeOpacity={0.8}>
            <Text style={{ fontSize: 24 }}>🎤</Text>
            <Text style={s.quickTitle}>Live-Gespräch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.quickCard} onPress={() => router.push("/placement")} activeOpacity={0.8}>
            <Text style={{ fontSize: 24 }}>🎯</Text>
            <Text style={s.quickTitle}>Einstufungstest</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  flagStrip: { flexDirection: "row", height: 3 },
  flag: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingTop: 18, paddingBottom: 20 },
  greeting: { fontSize: 14, color: C.muted },
  name: { fontSize: 26, fontWeight: "800", color: C.text, marginTop: 2 },
  statsRow: { flexDirection: "row", gap: 8, marginTop: 8 },
  statPill: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  statText: { fontSize: 14, fontWeight: "800" },
  heroCard: { backgroundColor: C.card, borderRadius: 22, padding: 22, marginBottom: 16, borderWidth: 1, borderColor: C.border, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  heroLabel: { fontSize: 10, fontWeight: "900", color: C.muted, letterSpacing: 2, marginBottom: 10 },
  heroProgressBar: { height: 4, backgroundColor: C.bg2, borderRadius: 2, marginBottom: 6, overflow: "hidden" },
  heroProgressFill: { height: "100%", backgroundColor: C.gold, borderRadius: 2 },
  heroProgress: { fontSize: 12, color: C.muted, marginBottom: 16 },
  heroTitle: { fontFamily: SERIF, fontSize: 24, fontWeight: "700", color: C.text },
  heroDesc: { fontSize: 14, color: C.muted, lineHeight: 21, marginTop: 8 },
  heroCTA: { backgroundColor: C.gold, borderRadius: 16, paddingVertical: 16, alignItems: "center", marginTop: 18 },
  heroCTAText: { fontSize: 16, fontWeight: "900", color: "#FFF", letterSpacing: 1 },
  reviewCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: C.card, borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: C.border },
  reviewTitle: { fontSize: 15, fontWeight: "700", color: C.text },
  reviewSub: { fontSize: 12, color: C.muted, marginTop: 2 },
  wotdCard: { backgroundColor: C.card, borderRadius: 20, padding: 22, marginBottom: 16, borderWidth: 1, borderColor: C.goldLine },
  wotdHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  wotdLabel: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2 },
  wotdLevel: { fontSize: 10, fontWeight: "800", color: C.muted, backgroundColor: C.bg2, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  wotdWord: { fontFamily: SERIF, fontSize: 30, fontWeight: "700", color: C.text, fontStyle: "italic" },
  wotdMeaning: { fontSize: 15, color: C.textSec, marginTop: 6 },
  wotdMeaningEn: { fontSize: 13, color: C.muted, marginTop: 2 },
  wotdDivider: { height: 1, backgroundColor: C.border, marginVertical: 14 },
  wotdExample: { fontSize: 15, color: C.text, fontStyle: "italic", lineHeight: 22 },
  wotdExampleEn: { fontSize: 13, color: C.muted, marginTop: 4 },
  quickRow: { flexDirection: "row", gap: 12 },
  quickCard: { flex: 1, backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 18, alignItems: "center", gap: 8 },
  quickTitle: { fontSize: 12, fontWeight: "700", color: C.textSec, textAlign: "center" },
});
