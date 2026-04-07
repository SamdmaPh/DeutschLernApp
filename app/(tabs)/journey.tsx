import { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Progress, LEVEL_NAMES } from "../../services/progress";
import { ALL_STATIC_LESSONS } from "../../data/lessonData";
import { JOURNEY_CITIES } from "../../data/journeyData";
import { C, SAFE_TOP, SERIF } from "../../theme";

export default function ProfilScreen() {
  const router = useRouter();
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("A1");

  useFocusEffect(useCallback(() => {
    Progress.getAll().then(p => {
      setXp(p.xp); setStreak(p.streak); setDone(p.done); setName(p.name); setLevel(p.studyLevel);
    });
  }, []));

  const appLevel = Progress.getAppLevel(xp);
  const totalLessons = ALL_STATIC_LESSONS.length;
  const completedLessons = done.length;

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: SAFE_TOP }} />
      <View style={s.flagStrip}>
        <View style={[s.flag, { backgroundColor: C.flagBlack }]} />
        <View style={[s.flag, { backgroundColor: C.flagRed }]} />
        <View style={[s.flag, { backgroundColor: C.flagGold }]} />
      </View>

      <View style={s.header}>
        <Text style={s.title}>Profil</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Name + Level */}
        <View style={s.profileCard}>
          <Text style={s.profileName}>{name || "Deutschlerner"}</Text>
          <Text style={s.profileLevel}>{LEVEL_NAMES[appLevel]} · {level}</Text>
        </View>

        {/* Stats Grid */}
        <View style={s.statsGrid}>
          <View style={s.statCard}>
            <Text style={s.statNum}>{xp}</Text>
            <Text style={s.statLabel}>XP</Text>
          </View>
          <View style={s.statCard}>
            <Text style={[s.statNum, { color: C.red }]}>{streak}</Text>
            <Text style={s.statLabel}>Streak 🔥</Text>
          </View>
          <View style={s.statCard}>
            <Text style={[s.statNum, { color: C.green }]}>{completedLessons}</Text>
            <Text style={s.statLabel}>Lektionen</Text>
          </View>
          <View style={s.statCard}>
            <Text style={s.statNum}>{totalLessons - completedLessons}</Text>
            <Text style={s.statLabel}>Übrig</Text>
          </View>
        </View>

        {/* Fortschritt pro Stadt */}
        <Text style={s.sectionLabel}>FORTSCHRITT</Text>
        {JOURNEY_CITIES.filter(c => c.lessonIds.some(id => done.includes(id)) || c.level === "A1").map(city => {
          const completed = city.lessonIds.filter(id => done.includes(id)).length;
          const total = city.lessonIds.length;
          const pct = total > 0 ? (completed / total) * 100 : 0;
          return (
            <View key={city.id} style={s.progressRow}>
              <Text style={{ fontSize: 18 }}>{city.emoji}</Text>
              <View style={{ flex: 1 }}>
                <View style={s.progressHeader}>
                  <Text style={s.progressCity}>{city.name}</Text>
                  <Text style={s.progressCount}>{completed}/{total}</Text>
                </View>
                <View style={s.progressBar}>
                  <View style={[s.progressFill, { width: `${pct}%` }]} />
                </View>
              </View>
            </View>
          );
        })}

        {/* Einstellungen */}
        <Text style={s.sectionLabel}>EINSTELLUNGEN</Text>
        <TouchableOpacity style={s.settingRow} onPress={() => router.push("/settings")}>
          <Text style={s.settingText}>⚙️  Einstellungen</Text>
          <Text style={{ color: C.muted }}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.settingRow} onPress={() => router.push("/placement")}>
          <Text style={s.settingText}>🎯  Einstufungstest</Text>
          <Text style={{ color: C.muted }}>→</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  flagStrip: { flexDirection: "row", height: 3 },
  flag: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 14, paddingBottom: 8 },
  title: { fontFamily: SERIF, fontSize: 28, fontWeight: "700", color: C.text },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },

  profileCard: { backgroundColor: C.card, borderRadius: 20, padding: 24, alignItems: "center", marginTop: 8, marginBottom: 20, borderWidth: 1, borderColor: C.border },
  profileName: { fontSize: 24, fontWeight: "800", color: C.text },
  profileLevel: { fontSize: 14, color: C.gold, fontWeight: "600", marginTop: 4 },

  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 },
  statCard: { flex: 1, minWidth: "45%", backgroundColor: C.card, borderRadius: 16, padding: 18, alignItems: "center", borderWidth: 1, borderColor: C.border },
  statNum: { fontSize: 28, fontWeight: "900", color: C.gold },
  statLabel: { fontSize: 11, color: C.muted, fontWeight: "600", marginTop: 4 },

  sectionLabel: { fontSize: 10, fontWeight: "900", color: C.muted, letterSpacing: 2, marginBottom: 12, marginTop: 8 },

  progressRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
  progressHeader: { flexDirection: "row", justifyContent: "space-between" },
  progressCity: { fontSize: 14, fontWeight: "700", color: C.text },
  progressCount: { fontSize: 12, color: C.muted },
  progressBar: { height: 6, backgroundColor: C.bg2, borderRadius: 3, marginTop: 6, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: C.gold, borderRadius: 3 },

  settingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: C.card, borderRadius: 14, padding: 16, marginBottom: 8, borderWidth: 1, borderColor: C.border },
  settingText: { fontSize: 15, fontWeight: "600", color: C.text },
});
