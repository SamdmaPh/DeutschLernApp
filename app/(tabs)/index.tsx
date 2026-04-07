import { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Progress } from "../../services/progress";
import { ALL_STATIC_LESSONS } from "../../data/lessonData";
import { JOURNEY_CITIES } from "../../data/journeyData";
import { getWordOfTheDay } from "../../data/vocabData";
import { getStory } from "../../data/storyData";
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

  const currentCity = JOURNEY_CITIES.find(c => !c.lessonIds.every(id => done.includes(id))) || JOURNEY_CITIES[0];
  const nextLesson = ALL_STATIC_LESSONS
    .filter((l: any) => currentCity.lessonIds.includes(l.id))
    .sort((a: any, b: any) => a.order_index - b.order_index)
    .find((l: any) => !done.includes(l.id)) as any;
  const cityDone = currentCity.lessonIds.filter(id => done.includes(id)).length;
  const cityTotal = currentCity.lessonIds.length;
  const story = nextLesson ? getStory(nextLesson.id) : null;
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

        {/* ── Header ── */}
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

        {/* ── Nächste Lektion (Hero Card) ── */}
        {nextLesson && (
          <TouchableOpacity
            style={s.heroCard}
            onPress={() => router.push({ pathname: "/lesson", params: { lessonId: nextLesson.id } })}
            activeOpacity={0.85}
          >
            <View style={s.heroTop}>
              <View style={s.heroCityBadge}>
                <Text style={s.heroCityEmoji}>{currentCity.emoji}</Text>
                <Text style={s.heroCityName}>{currentCity.name}</Text>
              </View>
              <Text style={s.heroProgress}>{cityDone}/{cityTotal}</Text>
            </View>

            <View style={s.heroProgressBar}>
              <View style={[s.heroProgressFill, { width: `${(cityDone / cityTotal) * 100}%` }]} />
            </View>

            <Text style={s.heroTitle}>{nextLesson.title_de || nextLesson.title}</Text>

            {story && (
              <Text style={s.heroStory} numberOfLines={2}>{story.hookNarration}</Text>
            )}

            {story && (
              <View style={s.heroNPC}>
                <Text style={{ fontSize: 20 }}>{story.npcEmoji}</Text>
                <Text style={s.heroNPCText}>Du triffst: {story.npcName}</Text>
              </View>
            )}

            <View style={s.heroCTA}>
              <Text style={s.heroCTAText}>▶  LEKTION STARTEN</Text>
              <Text style={s.heroCTAXP}>+{nextLesson.xp_reward || 50} XP</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* ── Tägliche Wiederholung ── */}
        <TouchableOpacity style={s.reviewCard} onPress={() => router.push("/review")} activeOpacity={0.8}>
          <View style={s.reviewLeft}>
            <Text style={{ fontSize: 24 }}>🔄</Text>
            <View>
              <Text style={s.reviewTitle}>Tägliche Wiederholung</Text>
              <Text style={s.reviewSub}>Vokabeln festigen · 5 Min</Text>
            </View>
          </View>
          <Text style={s.reviewArrow}>→</Text>
        </TouchableOpacity>

        {/* ── Wort des Tages ── */}
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

        {/* ── Schnellzugriff ── */}
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

  // Hero lesson card
  heroCard: { backgroundColor: C.card, borderRadius: 22, padding: 22, marginBottom: 16, borderWidth: 1, borderColor: C.border, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  heroTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  heroCityBadge: { flexDirection: "row", alignItems: "center", gap: 8 },
  heroCityEmoji: { fontSize: 20 },
  heroCityName: { fontSize: 12, fontWeight: "800", color: C.muted, letterSpacing: 1, textTransform: "uppercase" },
  heroProgress: { fontSize: 12, fontWeight: "700", color: C.muted },
  heroProgressBar: { height: 4, backgroundColor: C.bg2, borderRadius: 2, marginBottom: 16, overflow: "hidden" },
  heroProgressFill: { height: "100%", backgroundColor: C.gold, borderRadius: 2 },
  heroTitle: { fontFamily: SERIF, fontSize: 24, fontWeight: "700", color: C.text },
  heroStory: { fontSize: 14, color: C.muted, lineHeight: 21, marginTop: 8 },
  heroNPC: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 14, backgroundColor: C.bg2, borderRadius: 12, padding: 10 },
  heroNPCText: { fontSize: 13, fontWeight: "600", color: C.textSec },
  heroCTA: { backgroundColor: C.gold, borderRadius: 16, paddingVertical: 16, alignItems: "center", marginTop: 18, flexDirection: "row", justifyContent: "center", gap: 12 },
  heroCTAText: { fontSize: 16, fontWeight: "900", color: "#FFF", letterSpacing: 1 },
  heroCTAXP: { fontSize: 13, fontWeight: "700", color: "rgba(255,255,255,0.7)" },

  // Review
  reviewCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: C.card, borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: C.border },
  reviewLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  reviewTitle: { fontSize: 15, fontWeight: "700", color: C.text },
  reviewSub: { fontSize: 12, color: C.muted, marginTop: 2 },
  reviewArrow: { fontSize: 18, color: C.gold, fontWeight: "700" },

  // Wort des Tages
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

  // Quick access
  quickRow: { flexDirection: "row", gap: 12 },
  quickCard: { flex: 1, backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 18, alignItems: "center", gap: 8 },
  quickTitle: { fontSize: 12, fontWeight: "700", color: C.textSec, textAlign: "center" },
});
