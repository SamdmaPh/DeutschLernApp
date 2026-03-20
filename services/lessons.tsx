import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Platform } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { supabase } from "../services/supabase";
import { Progress } from "../services/progress";

const PREVIEW_WORDS = ["Fernweh", "Weltschmerz", "Geborgenheit", "Sehnsucht", "Wanderlust", "Fingerspitzengefühl", "Lebensfreude"];
function getTodayPreviewWord() {
  const day = Math.floor(Date.now() / 86400000);
  return PREVIEW_WORDS[day % PREVIEW_WORDS.length];
}
import { WORDS } from "./word-of-day";

const C = {
  navy:       "#070B18", navy2: "#0A1020", navy3: "#0F1628",
  border:     "#1E2D45",
  gold:       "#C9A84C", goldBg: "rgba(201,168,76,0.10)", goldBorder: "rgba(201,168,76,0.25)",
  red:        "#CC0000", redBg: "rgba(204,0,0,0.10)",
  green:      "#22C55E", greenBg: "rgba(34,197,94,0.10)",
  black:      "#111111", white: "#FFFFFF", text: "#E2E8F0", muted: "#64748B",
};
const SAFE_TOP = Platform.OS === "ios" ? 54 : 30;

export default function LessonsScreen() {
  const router = useRouter();
  const [lessons, setLessons] = useState<any[]>([]);
  const [activeLevel, setActiveLevel] = useState<"A1" | "A2">("A1");
  const [loading, setLoading] = useState(true);
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);

  // Reload XP and completed every time screen comes into focus
  useFocusEffect(useCallback(() => {
    Progress.getXP().then(setXp);
    Progress.getCompleted().then(setCompleted);
  }, []));

  useEffect(() => { fetchLessons(); }, [activeLevel]);

  async function fetchLessons() {
    setLoading(true);
    const { data, error } = await supabase
      .from("lessons").select("*")
      .eq("level", activeLevel).order("order_index");
    if (error) console.error(error.message);
    setLessons(data || []);
    setLoading(false);
  }

  const totalLessons = lessons.length;
  const completedCount = lessons.filter(l => completed.includes(String(l.id))).length;
  const progressPct = totalLessons ? (completedCount / totalLessons) * 100 : 0;

  // XP level thresholds
  const XP_LEVELS = [0, 200, 500, 1000, 2000, 5000];
  const currentLevel = XP_LEVELS.filter(t => xp >= t).length;
  const nextThreshold = XP_LEVELS[currentLevel] || XP_LEVELS[XP_LEVELS.length - 1];
  const prevThreshold = XP_LEVELS[currentLevel - 1] || 0;
  const xpPct = nextThreshold > prevThreshold
    ? ((xp - prevThreshold) / (nextThreshold - prevThreshold)) * 100
    : 100;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{ height: SAFE_TOP }} />

      {/* Flag bar */}
      <View style={{ flexDirection: "row", height: 3 }}>
        <View style={{ flex: 1, backgroundColor: C.black }} />
        <View style={{ flex: 1, backgroundColor: C.red }} />
        <View style={{ flex: 1, backgroundColor: C.gold }} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>Wundervoll</Text>
          <Text style={styles.tagline}>German, made wonderful</Text>
        </View>
        <TouchableOpacity style={styles.convBtn} onPress={() => router.push("/conversation")}>
          <Text style={styles.convBtnText}>💬 KI Gespräch</Text>
        </TouchableOpacity>
      </View>

      {/* XP + Level bar */}
      <View style={styles.xpCard}>
        <View style={styles.xpRow}>
          <View style={styles.xpLevelBadge}>
            <Text style={styles.xpLevelText}>Lvl {currentLevel}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.xpBarTrack}>
              <View style={[styles.xpBarFill, { width: `${Math.min(xpPct, 100)}%` }]} />
            </View>
          </View>
          <Text style={styles.xpAmount}>⚡ {xp} XP</Text>
        </View>
      </View>

      {/* Wort des Tages Card */}
      <TouchableOpacity
        style={styles.wotdCard}
        onPress={() => router.push("/word-of-day")}
        activeOpacity={0.85}
      >
        <View style={styles.wotdLeft}>
          <Text style={styles.wotdLabel}>🇩🇪 WORT DES TAGES</Text>
          <Text style={styles.wotdWord}>{getTodayPreviewWord()}</Text>
          <Text style={styles.wotdSub}>Bedeutung & Schönheit entdecken →</Text>
        </View>
        <Text style={styles.wotdIcon}>✨</Text>
      </TouchableOpacity>

      {/* Level Switcher */}
      <View style={styles.levelRow}>
        {(["A1", "A2"] as const).map((lvl) => (
          <TouchableOpacity key={lvl}
            style={[styles.levelBtn, activeLevel === lvl && styles.levelBtnActive]}
            onPress={() => setActiveLevel(lvl)}>
            <Text style={[styles.levelText, activeLevel === lvl && styles.levelTextActive]}>{lvl}</Text>
            <Text style={styles.levelSub}>{lvl === "A1" ? "Anfänger" : "Grundlagen"}</Text>
          </TouchableOpacity>
        ))}
        {activeLevel === "A2" && (
          <View style={styles.lockBadge}>
            <Text style={styles.lockText}>🔒 Premium</Text>
          </View>
        )}
      </View>

      {/* Progress summary */}
      <View style={styles.progressCard}>
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            <Text style={{ color: C.gold, fontWeight: "800" }}>{completedCount}</Text>
            <Text style={{ color: C.muted }}> / {totalLessons} Lektionen abgeschlossen</Text>
          </Text>
          <Text style={styles.progressPct}>{Math.round(progressPct)}%</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>
      </View>

      {/* Lessons list */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={{ paddingHorizontal: 20, gap: 10, marginTop: 8 }}>
            {[1, 2, 3, 4].map(i => (
              <View key={i} style={styles.skeleton} />
            ))}
          </View>
        ) : (
          lessons.map((lesson, i) => {
            const isDone = completed.includes(String(lesson.id));
            return (
              <TouchableOpacity
                key={lesson.id}
                style={[styles.card, isDone && styles.cardDone, i === 0 && !isDone && styles.cardFirst]}
                onPress={() => router.push({ pathname: "/lesson", params: { id: lesson.id } })}
                activeOpacity={0.75}
              >
                {/* Number badge */}
                <View style={[styles.numBadge, isDone && styles.numBadgeDone]}>
                  {isDone
                    ? <Text style={{ fontSize: 16 }}>✓</Text>
                    : <Text style={styles.numText}>{lesson.order_index || i + 1}</Text>
                  }
                </View>

                {/* Content */}
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Text style={[styles.cardTitle, isDone && { color: C.muted }]}>{lesson.title}</Text>
                    {isDone && (
                      <View style={styles.donePill}>
                        <Text style={styles.donePillText}>Fertig</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.cardSub} numberOfLines={1}>{lesson.description || ""}</Text>
                </View>

                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            );
          })
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: C.navy },
  header:          { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  logo:            { fontSize: 22, fontWeight: "700", color: C.white, letterSpacing: 0.5 },
  tagline:         { fontSize: 11, color: C.muted, letterSpacing: 1, marginTop: 2 },
  convBtn:         { backgroundColor: C.goldBg, borderWidth: 1, borderColor: C.goldBorder, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  convBtnText:     { color: C.gold, fontSize: 13, fontWeight: "600" },

  xpCard:          { marginHorizontal: 20, backgroundColor: C.navy2, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 12, marginBottom: 14 },
  xpRow:           { flexDirection: "row", alignItems: "center", gap: 10 },
  xpLevelBadge:    { backgroundColor: C.goldBg, borderWidth: 1, borderColor: C.goldBorder, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  xpLevelText:     { color: C.gold, fontSize: 12, fontWeight: "800" },
  xpBarTrack:      { height: 6, backgroundColor: C.navy3, borderRadius: 3, overflow: "hidden" },
  xpBarFill:       { height: 6, backgroundColor: C.gold, borderRadius: 3 },
  xpAmount:        { color: C.gold, fontSize: 13, fontWeight: "700" },

  levelRow:        { flexDirection: "row", paddingHorizontal: 20, gap: 10, alignItems: "center", marginBottom: 12 },
  levelBtn:        { flex: 1, backgroundColor: C.navy3, borderWidth: 1, borderColor: C.border, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 },
  levelBtnActive:  { backgroundColor: C.goldBg, borderColor: C.goldBorder },
  levelText:       { fontSize: 20, fontWeight: "800", color: C.muted },
  levelTextActive: { color: C.gold },
  levelSub:        { fontSize: 11, color: C.muted, marginTop: 2 },
  lockBadge:       { backgroundColor: C.redBg, borderWidth: 1, borderColor: "rgba(204,0,0,0.25)", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  lockText:        { color: C.red, fontSize: 11, fontWeight: "600" },

  progressCard:    { marginHorizontal: 20, marginBottom: 12, gap: 8 },
  progressRow:     { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progressText:    { fontSize: 13 },
  progressPct:     { color: C.gold, fontSize: 13, fontWeight: "700" },
  progressTrack:   { height: 6, backgroundColor: C.navy3, borderRadius: 3, overflow: "hidden" },
  progressFill:    { height: 6, backgroundColor: C.gold, borderRadius: 3 },

  skeleton:        { height: 72, backgroundColor: C.navy3, borderRadius: 14 },

  card:            { flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginBottom: 8, backgroundColor: C.navy2, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 14, gap: 14 },
  cardFirst:       { borderColor: C.goldBorder, backgroundColor: "rgba(201,168,76,0.04)" },
  cardDone:        { borderColor: "rgba(34,197,94,0.2)", backgroundColor: "rgba(34,197,94,0.03)" },
  numBadge:        { width: 38, height: 38, borderRadius: 10, backgroundColor: C.navy3, borderWidth: 1, borderColor: C.border, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  numBadgeDone:    { backgroundColor: C.greenBg, borderColor: C.green },
  numText:         { fontSize: 14, fontWeight: "700", color: C.gold },
  cardTitle:       { fontSize: 15, fontWeight: "700", color: C.white },
  donePill:        { backgroundColor: C.greenBg, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  donePillText:    { color: C.green, fontSize: 10, fontWeight: "700" },
  cardSub:         { fontSize: 12, color: C.muted, marginTop: 2 },
  arrow:           { fontSize: 22, color: C.muted },
  wotdCard:        { marginHorizontal: 20, marginBottom: 12, backgroundColor: C.navy2, borderRadius: 16, borderWidth: 1, borderColor: C.goldBorder, padding: 16, flexDirection: "row", alignItems: "center" },
  wotdLeft:        { flex: 1, gap: 3 },
  wotdLabel:       { color: C.gold, fontSize: 10, fontWeight: "800", letterSpacing: 2 },
  wotdWord:        { color: C.white, fontSize: 22, fontWeight: "900", letterSpacing: -0.5 },
  wotdSub:         { color: C.muted, fontSize: 12 },
  wotdIcon:        { fontSize: 28 },
});
