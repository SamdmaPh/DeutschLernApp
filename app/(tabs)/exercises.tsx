import { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { ALL_STATIC_LESSONS } from "../../data/lessonData";
import { LEVEL_INFO } from "../../data/journeyData";
import { Progress } from "../../services/progress";
import { C, SAFE_TOP, SERIF } from "../../theme";

export default function ExercisesScreen() {
  const router = useRouter();
  const [done, setDone] = useState<string[]>([]);
  const [activeLevel, setActiveLevel] = useState("A1");

  useFocusEffect(useCallback(() => {
    Progress.getAll().then(p => setDone(p.done || []));
  }, []));

  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const lessons = ALL_STATIC_LESSONS.filter(l => l.level === activeLevel).sort((a, b) => a.order_index - b.order_index);
  const sublevels = [...new Set(lessons.map(l => l.sublevel))];
  const info = LEVEL_INFO[activeLevel];

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
        <Text style={s.title}>Üben</Text>
        <Text style={s.subtitle}>Alle Lektionen & Übungen</Text>
      </View>

      {/* Level tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.tabs}>
        {levels.map(lv => {
          const lvInfo = LEVEL_INFO[lv];
          const active = lv === activeLevel;
          const lvDone = ALL_STATIC_LESSONS.filter(l => l.level === lv && done.includes(l.id)).length;
          const lvTotal = ALL_STATIC_LESSONS.filter(l => l.level === lv).length;
          return (
            <TouchableOpacity
              key={lv} activeOpacity={0.7}
              style={[s.tab, active && { backgroundColor: lvInfo.color + "15", borderColor: lvInfo.color }]}
              onPress={() => setActiveLevel(lv)}
            >
              <Text style={[s.tabText, active && { color: lvInfo.color }]}>{lv}</Text>
              <Text style={[s.tabCount, active && { color: lvInfo.color }]}>{lvDone}/{lvTotal}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {sublevels.map(sublevel => {
          const subs = lessons.filter(l => l.sublevel === sublevel);
          return (
            <View key={sublevel} style={s.group}>
              <Text style={[s.groupLabel, { color: info?.color }]}>{sublevel}</Text>
              {subs.map(lesson => {
                const isDone = done.includes(lesson.id);
                return (
                  <TouchableOpacity
                    key={lesson.id}
                    style={[s.lessonCard, isDone && { borderLeftColor: info?.color, borderLeftWidth: 3 }]}
                    onPress={() => router.push({ pathname: "/lesson", params: { lessonId: lesson.id } })}
                    activeOpacity={0.7}
                  >
                    <View style={s.lessonNum}>
                      <Text style={[s.lessonNumText, isDone && { color: info?.color }]}>{lesson.order_index}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={s.lessonTitle}>{lesson.title}</Text>
                      <Text style={s.lessonMeta}>{lesson.duration} min · +{lesson.xp_reward} XP</Text>
                    </View>
                    {isDone ? <Text>✅</Text> : <Text style={{ color: C.muted }}>→</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  flagStrip: { flexDirection: "row", height: 3 },
  flag: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 14, paddingBottom: 8 },
  title: { fontFamily: SERIF, fontSize: 28, fontWeight: "700", color: C.text },
  subtitle: { fontSize: 13, color: C.muted, marginTop: 4 },
  tabs: { paddingHorizontal: 20, gap: 8, paddingBottom: 4 },
  tab: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: C.border, backgroundColor: C.card },
  tabText: { fontSize: 14, fontWeight: "800", color: C.muted, textAlign: "center" },
  tabCount: { fontSize: 10, color: C.muted, textAlign: "center", marginTop: 2 },
  scroll: { padding: 20, paddingBottom: 100 },
  group: { marginBottom: 20 },
  groupLabel: { fontSize: 12, fontWeight: "900", letterSpacing: 2, marginBottom: 10 },
  lessonCard: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 8, gap: 14 },
  lessonNum: { width: 36, height: 36, borderRadius: 10, backgroundColor: C.bg2, alignItems: "center", justifyContent: "center" },
  lessonNumText: { fontSize: 14, fontWeight: "800", color: C.muted },
  lessonTitle: { fontSize: 15, fontWeight: "700", color: C.text },
  lessonMeta: { fontSize: 12, color: C.muted, marginTop: 3 },
});
