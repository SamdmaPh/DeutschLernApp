import {
  View, Text, TouchableOpacity, ScrollView, TextInput,
  StyleSheet, StatusBar, Platform, Alert,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Progress } from "../services/progress";
import { C, SAFE_TOP, SERIF } from "../theme";

const GOALS = [
  { id: "travel",  emoji: "✈️",  label: "Reisen" },
  { id: "work",    emoji: "💼",  label: "Arbeit" },
  { id: "family",  emoji: "👨‍👩‍👧", label: "Familie" },
  { id: "culture", emoji: "🎭",  label: "Kultur" },
  { id: "love",    emoji: "❤️",  label: "Liebe" },
  { id: "brain",   emoji: "🧠",  label: "Gehirn" },
];

const STUDY_LEVELS = [
  { id: "A1", label: "A1 — Anfänger",       sub: "Ich fange gerade an" },
  { id: "A2", label: "A2 — Grundlagen",     sub: "Ich kenne die Basics" },
  { id: "B1", label: "B1 — Mittelstufe",    sub: "Ich kann mich verständigen" },
  { id: "B2", label: "B2 — Fortgeschritten", sub: "Ich diskutiere auf Deutsch" },
  { id: "C1", label: "C1 — Fachkundig",     sub: "Ich lese Kafka" },
  { id: "C2", label: "C2 — Meisterschaft",  sub: "Ich träume auf Deutsch" },
];

export default function SettingsScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("travel");
  const [studyLevel, setStudyLevel] = useState("A1");
  const [xp, setXp] = useState(0);
  const [done, setDone] = useState<string[]>([]);
  const [nameEditing, setNameEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState("");

  useFocusEffect(useCallback(() => {
    Progress.getAll().then(p => {
      setName(p.name); setGoal(p.goal); setStudyLevel(p.studyLevel); setXp(p.xp); setDone(p.done);
    });
  }, []));

  async function saveName() {
    await Progress.setName(nameDraft); setName(nameDraft); setNameEditing(false);
  }
  async function changeGoal(g: string) { await Progress.setGoal(g); setGoal(g); }
  async function changeLevel(l: string) { await Progress.setStudyLevel(l); setStudyLevel(l); }

  function confirmReset() {
    Alert.alert("Fortschritt zurücksetzen?", "XP, Lektionen und Streak werden gelöscht.", [
      { text: "Abbrechen", style: "cancel" },
      { text: "Zurücksetzen", style: "destructive", onPress: async () => {
        await Progress.resetProgress(); setXp(0); setDone([]);
      }},
    ]);
  }

  function confirmReOnboard() {
    Alert.alert("Onboarding wiederholen?", "Du siehst das Onboarding beim nächsten Start.", [
      { text: "Abbrechen", style: "cancel" },
      { text: "Ja", onPress: async () => {
        if (Platform.OS === "web") {
          if (typeof window !== "undefined") window.localStorage.removeItem("wv_onboarded");
        } else {
          const AS = require("@react-native-async-storage/async-storage").default;
          await AS.removeItem("wv_onboarded");
        }
      }},
    ]);
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
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.backBtn}>‹ Zurück</Text>
        </TouchableOpacity>
        <Text style={s.title}>Einstellungen</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

        {/* PROFIL */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>PROFIL</Text>
          <View style={s.card}>
            <View style={s.row}>
              <Text style={s.rowLabel}>Name</Text>
              {nameEditing ? (
                <View style={s.nameRow}>
                  <TextInput style={s.nameInput} value={nameDraft} onChangeText={setNameDraft} autoFocus placeholderTextColor={C.muted} placeholder="Dein Name" />
                  <TouchableOpacity style={s.saveBtn} onPress={saveName}>
                    <Text style={s.saveBtnText}>✓</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={() => { setNameDraft(name); setNameEditing(true); }} style={s.editRow}>
                  <Text style={s.rowValue}>{name || "Nicht gesetzt"}</Text>
                  <Text>✏️</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={s.divider} />
            <View style={s.row}>
              <Text style={s.rowLabel}>XP gesamt</Text>
              <Text style={[s.rowValue, { color: C.gold, fontWeight: "700" }]}>⚡ {xp}</Text>
            </View>
            <View style={s.divider} />
            <View style={s.row}>
              <Text style={s.rowLabel}>Lektionen</Text>
              <Text style={[s.rowValue, { color: C.green, fontWeight: "700" }]}>✅ {done.length}</Text>
            </View>
          </View>
        </View>

        {/* LERNZIEL */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>LERNZIEL</Text>
          <View style={s.goalsGrid}>
            {GOALS.map(g => (
              <TouchableOpacity key={g.id} style={[s.goalChip, goal === g.id && s.goalActive]} onPress={() => changeGoal(g.id)}>
                <Text style={s.goalEmoji}>{g.emoji}</Text>
                <Text style={[s.goalText, goal === g.id && { color: C.gold, fontWeight: "700" }]}>{g.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* SPRACHNIVEAU */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>SPRACHNIVEAU</Text>
          {STUDY_LEVELS.map(l => (
            <TouchableOpacity key={l.id} style={[s.levelRow, studyLevel === l.id && s.levelActive]} onPress={() => changeLevel(l.id)}>
              <View style={{ flex: 1 }}>
                <Text style={[s.levelLabel, studyLevel === l.id && { color: C.gold }]}>{l.label}</Text>
                <Text style={s.levelSub}>{l.sub}</Text>
              </View>
              {studyLevel === l.id && (
                <View style={s.checkDot}><Text style={{ color: "#fff", fontSize: 12, fontWeight: "800" }}>✓</Text></View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* APP */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>APP</Text>
          <View style={s.card}>
            <TouchableOpacity style={s.row} onPress={() => router.push("/placement")}>
              <Text style={s.rowLabel}>🎯 Einstufungstest</Text>
              <Text style={s.rowArrow}>→</Text>
            </TouchableOpacity>
            <View style={s.divider} />
            <TouchableOpacity style={s.row} onPress={confirmReOnboard}>
              <Text style={s.rowLabel}>🔄 Onboarding wiederholen</Text>
              <Text style={s.rowArrow}>→</Text>
            </TouchableOpacity>
            <View style={s.divider} />
            <View style={s.row}>
              <Text style={s.rowLabel}>Version</Text>
              <Text style={s.rowValue}>1.0.0</Text>
            </View>
            <View style={s.divider} />
            <View style={s.row}>
              <Text style={s.rowLabel}>Erstellt von</Text>
              <Text style={[s.rowValue, { color: C.gold }]}>Philipp</Text>
            </View>
          </View>
        </View>

        {/* DANGER */}
        <View style={s.section}>
          <Text style={[s.sectionLabel, { color: C.red }]}>GEFAHRENZONE</Text>
          <TouchableOpacity style={s.dangerBtn} onPress={confirmReset}>
            <Text style={s.dangerText}>🗑 Lernfortschritt zurücksetzen</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  flagStrip: { flexDirection: "row", height: 3 },
  flag: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 14, paddingBottom: 8 },
  backBtn: { color: C.gold, fontSize: 16, fontWeight: "600", marginBottom: 8 },
  title: { fontFamily: SERIF, fontSize: 28, fontWeight: "700", color: C.text },

  section: { paddingHorizontal: 24, marginTop: 20 },
  sectionLabel: { fontSize: 10, fontWeight: "900", color: C.muted, letterSpacing: 2, marginBottom: 10 },

  card: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 16 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rowLabel: { color: C.text, fontSize: 15 },
  rowValue: { color: C.muted, fontSize: 15 },
  rowArrow: { color: C.muted, fontSize: 18 },
  divider: { height: 1, backgroundColor: C.border, marginVertical: 12 },

  nameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  nameInput: { backgroundColor: C.bg2, borderRadius: 10, borderWidth: 1, borderColor: C.border, paddingHorizontal: 12, paddingVertical: 6, color: C.text, fontSize: 15, minWidth: 140 },
  saveBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: C.gold, alignItems: "center", justifyContent: "center" },
  saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
  editRow: { flexDirection: "row", alignItems: "center", gap: 8 },

  goalsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  goalChip: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, paddingHorizontal: 14, paddingVertical: 10 },
  goalActive: { borderColor: C.goldLine, backgroundColor: C.goldDim },
  goalEmoji: { fontSize: 18 },
  goalText: { color: C.text, fontSize: 14 },

  levelRow: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 8 },
  levelActive: { borderColor: C.goldLine, backgroundColor: C.goldDim },
  levelLabel: { fontSize: 15, fontWeight: "700", color: C.text },
  levelSub: { fontSize: 12, color: C.muted, marginTop: 2 },
  checkDot: { width: 26, height: 26, borderRadius: 13, backgroundColor: C.gold, alignItems: "center", justifyContent: "center" },

  dangerBtn: { backgroundColor: C.redDim, borderRadius: 14, borderWidth: 1, borderColor: C.redLine, padding: 16, alignItems: "center" },
  dangerText: { color: C.red, fontSize: 15, fontWeight: "700" },
});
