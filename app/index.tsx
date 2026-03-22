import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Platform, StatusBar, Animated,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Progress, LEVEL_THRESHOLDS, LEVEL_NAMES } from "../services/progress";
import { ALL_STATIC_LESSONS } from "../data/lessonData";

const C = {
  navy: "#070B18", navy2: "#0A1020", navy3: "#0F1628",
  card: "#0D1525",
  border: "#1E2D45",
  gold: "#C9A84C", goldBg: "rgba(201,168,76,0.10)", goldBorder: "rgba(201,168,76,0.25)",
  red: "#CC0000", redBg: "rgba(204,0,0,0.10)", redDim: "rgba(204,0,0,0.10)",
  green: "#22C55E", greenDim: "rgba(34,197,94,0.10)",
  purple: "#8B5CF6", purpleDim: "rgba(139,92,246,0.10)",
  blue: "#3B82F6", blueDim: "rgba(59,130,246,0.10)",
  white: "#FFFFFF", text: "#E2E8F0", muted: "#64748B",
  flagRed: "#CC0000", flagGold: "#C9A84C", flagBlack: "#1A1A1A",
};
const SAFE_TOP = Platform.OS === "ios" ? 54 : 30;

const GOAL_LABELS: Record<string, string> = {
  travel: "Reisen", work: "Arbeit", family: "Familie",
  culture: "Kultur", love: "Liebe", brain: "Gehirn",
};

const WORDS_OF_DAY = [
  "Fernweh", "Weltschmerz", "Zweisamkeit", "Sehnsucht", "Geborgenheit",
  "Wanderlust", "Fingerspitzengefühl", "Torschlusspanik", "Schadenfreude",
  "Verschlimmbessern", "Zwischenraum", "Lebensfreude", "Waldeinsamkeit",
  "Kopfkino", "Sturmfrei", "Erklärungsnot", "Heimweh", "Gemütlichkeit",
  "Augenblick", "Drachenfutter", "Treppenwitz", "Verschwiegen",
  "Traumhaft", "Weltanschauung", "Wundervoll",
];

function getTodayWord(): string {
  const start = new Date(2025, 0, 1).getTime();
  const now = Date.now();
  const dayIndex = Math.floor((now - start) / 86400000) % WORDS_OF_DAY.length;
  return WORDS_OF_DAY[dayIndex];
}

export default function HomeScreen() {
  const [data, setData] = useState<{
    xp: number; done: string[]; streak: number;
    name: string; goal: string; studyLevel: string; appLevel: number;
  } | null>(null);
  const fadeAnim = useState(() => new Animated.Value(0))[0];

  const loadData = async () => {
    const d = await Progress.getAll();
    setData(d);
  };

  useFocusEffect(useCallback(() => { loadData(); }, []));

  useEffect(() => {
    if (data) {
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    }
  }, [data]);

  if (!data) return <View style={S.container} />;

  const { xp, done, streak, goal, studyLevel, appLevel } = data;
  const levelName = LEVEL_NAMES[appLevel] || "Anfänger";
  const nextThreshold = LEVEL_THRESHOLDS[appLevel + 1] || LEVEL_THRESHOLDS[appLevel];
  const currentThreshold = LEVEL_THRESHOLDS[appLevel];
  const xpInLevel = xp - currentThreshold;
  const xpNeeded = nextThreshold - currentThreshold;
  const progressPct = xpNeeded > 0 ? Math.min(1, xpInLevel / xpNeeded) : 1;
  const xpToNext = Math.max(0, nextThreshold - xp);

  const totalLessons = ALL_STATIC_LESSONS.filter(l => l.level === studyLevel).length;
  const completedCount = done.length;
  const lessonPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Find next lesson
  const sortedLessons = ALL_STATIC_LESSONS
    .filter(l => l.level === studyLevel)
    .sort((a, b) => a.order_index - b.order_index);
  const nextLesson = sortedLessons.find(l => !done.includes(l.id));

  const studyLevelLabel = studyLevel === "A1" ? "beginner" : "elementary";
  const todayWord = getTodayWord();

  return (
    <View style={S.container}>
      <StatusBar barStyle="light-content" />

      {/* German flag line */}
      <View style={{ flexDirection: "row", height: 3 }}>
        <View style={{ flex: 1, backgroundColor: C.flagBlack }} />
        <View style={{ flex: 1, backgroundColor: C.flagRed }} />
        <View style={{ flex: 1, backgroundColor: C.flagGold }} />
      </View>

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>

          {/* Header */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 28, fontWeight: "900", color: C.white }}>
                Willkommen! 👋
              </Text>
              <Text style={{ fontSize: 14, color: C.muted, marginTop: 4 }}>
                Entdecke Deutschland durch die Sprache!
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/settings")}
              style={{
                width: 44, height: 44, borderRadius: 22,
                backgroundColor: C.navy2, alignItems: "center", justifyContent: "center",
                borderWidth: 1, borderColor: C.border,
              }}
            >
              <Text style={{ fontSize: 20, color: C.muted }}>⚙️</Text>
            </TouchableOpacity>
          </View>

          {/* XP & Level Card */}
          <View style={{
            backgroundColor: C.card, borderRadius: 16, padding: 20,
            borderWidth: 1, borderColor: C.goldBorder, marginBottom: 16,
          }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text style={{ color: C.muted, fontSize: 11, fontWeight: "700", letterSpacing: 1 }}>
                  LEVEL {appLevel + 1} — {levelName}
                </Text>
                <Text style={{ color: C.white, fontSize: 36, fontWeight: "900", marginTop: 4 }}>
                  ⚡ {xp} XP
                </Text>
              </View>
              {streak > 0 && (
                <View style={{
                  backgroundColor: C.redDim, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8,
                }}>
                  <Text style={{ color: "#FF6B6B", fontSize: 15, fontWeight: "800" }}>
                    🔥 {streak} Tage
                  </Text>
                </View>
              )}
            </View>
            {/* Progress bar */}
            <View style={{
              height: 8, backgroundColor: C.navy2, borderRadius: 4, marginTop: 14, overflow: "hidden",
            }}>
              <View style={{
                height: 8, backgroundColor: C.gold, borderRadius: 4,
                width: `${Math.max(5, progressPct * 100)}%`,
              }} />
            </View>
            <Text style={{ color: C.muted, fontSize: 12, marginTop: 6 }}>
              {xpToNext} XP bis Level {appLevel + 2}
            </Text>
          </View>

          {/* Lektionen Card */}
          <TouchableOpacity
            onPress={() => router.push("/lessons")}
            style={{
              backgroundColor: C.card, borderRadius: 16, padding: 20,
              borderWidth: 1, borderColor: C.goldBorder, marginBottom: 6,
            }}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 36, marginRight: 14 }}>📚</Text>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <Text style={{ color: C.white, fontSize: 20, fontWeight: "900" }}>Lektionen</Text>
                  <View style={{ backgroundColor: C.goldBg, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 }}>
                    <Text style={{ color: C.gold, fontSize: 12, fontWeight: "700" }}>{studyLevelLabel}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                  <Text style={{ color: C.muted, fontSize: 13 }}>
                    {studyLevelLabel} · {completedCount}/{totalLessons} abgeschlossen
                  </Text>
                  <Text style={{ color: C.gold, fontSize: 18, marginLeft: "auto" }}>→</Text>
                </View>
              </View>
            </View>
            {/* Mini progress bar */}
            <View style={{ height: 3, backgroundColor: C.navy2, borderRadius: 2, marginTop: 12, overflow: "hidden" }}>
              <View style={{
                height: 3, backgroundColor: C.gold, borderRadius: 2,
                width: `${Math.max(2, lessonPct)}%`,
              }} />
            </View>
          </TouchableOpacity>

          {/* Feature Grid - 2x2 */}
          <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
            {/* KI-Gespräch */}
            <TouchableOpacity
              style={[S.featureCard, { backgroundColor: C.redDim, borderColor: "rgba(204,0,0,0.20)", flex: 1 }]}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 28, marginBottom: 10 }}>🎙️</Text>
              <Text style={{ color: C.red, fontSize: 16, fontWeight: "900" }}>KI-Gespräch</Text>
              <Text style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>Sprich Deutsch{"\n"}mit KI</Text>
            </TouchableOpacity>

            {/* Wort des Tages */}
            <TouchableOpacity
              onPress={() => router.push("/word-of-day")}
              style={[S.featureCard, { backgroundColor: C.purpleDim, borderColor: "rgba(139,92,246,0.20)", flex: 1 }]}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 28, marginBottom: 10 }}>✨</Text>
              <Text style={{ color: C.purple, fontSize: 16, fontWeight: "900" }}>Wort des Tages</Text>
              <Text style={{ color: C.purple, fontSize: 13, marginTop: 4 }}>{todayWord}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
            {/* Fortschritt */}
            <TouchableOpacity
              onPress={() => router.push("/progress-screen")}
              style={[S.featureCard, { backgroundColor: C.greenDim, borderColor: "rgba(34,197,94,0.20)", flex: 1 }]}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 28, marginBottom: 10 }}>📊</Text>
              <Text style={{ color: C.green, fontSize: 16, fontWeight: "900" }}>Fortschritt</Text>
              <Text style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>{lessonPct}% abge-{"\n"}schlossen</Text>
            </TouchableOpacity>

            {/* Mein Ziel */}
            <TouchableOpacity
              onPress={() => router.push("/settings")}
              style={[S.featureCard, { backgroundColor: C.blueDim, borderColor: "rgba(59,130,246,0.20)", flex: 1 }]}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 28, marginBottom: 10 }}>🎭</Text>
              <Text style={{ color: C.blue, fontSize: 16, fontWeight: "900" }}>Mein Ziel</Text>
              <Text style={{ color: C.blue, fontSize: 13, marginTop: 4 }}>{GOAL_LABELS[goal] || "Reisen"}</Text>
            </TouchableOpacity>
          </View>

          {/* Als nächstes */}
          {nextLesson && (
            <View style={{ marginTop: 24 }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                <View style={{ width: 3, height: 18, backgroundColor: C.gold, borderRadius: 2, marginRight: 8 }} />
                <Text style={{ color: C.muted, fontSize: 13, fontWeight: "800", letterSpacing: 1 }}>
                  Als nächstes
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => router.push({ pathname: "/lesson", params: { lessonId: nextLesson.id } })}
                style={{
                  backgroundColor: C.card, borderRadius: 16, padding: 16,
                  borderWidth: 1, borderColor: C.border,
                  flexDirection: "row", alignItems: "center",
                }}
                activeOpacity={0.7}
              >
                <View style={{
                  backgroundColor: C.goldBg, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 6, marginRight: 14,
                }}>
                  <Text style={{ color: C.gold, fontSize: 11, fontWeight: "800" }}>
                    {studyLevelLabel.slice(0, 5) + "\n" + studyLevelLabel.slice(5)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: C.white, fontSize: 16, fontWeight: "800" }}>
                    Lektion {nextLesson.order_index} weitermachen
                  </Text>
                  <Text style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>
                    Mach weiter wo du aufgehört hast →
                  </Text>
                </View>
                <View style={{
                  width: 40, height: 40, borderRadius: 20,
                  backgroundColor: C.goldBg, alignItems: "center", justifyContent: "center",
                }}>
                  <Text style={{ color: C.gold, fontSize: 18 }}>▶</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

        </ScrollView>
      </Animated.View>
    </View>
  );
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.navy,
    paddingTop: SAFE_TOP,
  },
  featureCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    minHeight: 140,
  },
});
