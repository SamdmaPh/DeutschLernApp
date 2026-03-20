import {
  View, Text, TouchableOpacity, ScrollView, TextInput,
  StyleSheet, StatusBar, Platform, Alert, Switch
} from "react-native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Progress } from "../services/progress";

const C = {
  navy: "#070B18", navy2: "#0A1020", navy3: "#0F1628", border: "#1E2D45",
  gold: "#C9A84C", goldBg: "rgba(201,168,76,0.10)", goldBorder: "rgba(201,168,76,0.25)",
  red: "#CC0000", redBg: "rgba(204,0,0,0.10)", redBorder: "rgba(204,0,0,0.3)",
  green: "#22C55E",
  white: "#FFFFFF", text: "#E2E8F0", muted: "#64748B",
};
const SAFE_TOP = Platform.OS === "ios" ? 54 : 30;

const GOALS = [
  { id: "travel",  emoji: "✈️",  label: "Reisen" },
  { id: "work",    emoji: "💼",  label: "Arbeit" },
  { id: "family",  emoji: "👨‍👩‍👧", label: "Familie" },
  { id: "culture", emoji: "🎭",  label: "Kultur" },
  { id: "love",    emoji: "❤️",  label: "Liebe" },
  { id: "brain",   emoji: "🧠",  label: "Gehirn" },
];

const STUDY_LEVELS = [
  { id: "A1", label: "A1 — Anfänger",    sub: "Ich fange gerade an" },
  { id: "A2", label: "A2 — Grundlagen",  sub: "Ich kenne die Basics" },
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
      setName(p.name);
      setGoal(p.goal);
      setStudyLevel(p.studyLevel);
      setXp(p.xp);
      setDone(p.done);
    });
  }, []));

  async function saveName() {
    await Progress.setName(nameDraft);
    setName(nameDraft);
    setNameEditing(false);
  }

  async function changeGoal(g: string) {
    await Progress.setGoal(g);
    setGoal(g);
  }

  async function changeLevel(l: string) {
    await Progress.setStudyLevel(l);
    setStudyLevel(l);
  }

  function confirmReset() {
    Alert.alert(
      "Fortschritt zurücksetzen?",
      "XP, abgeschlossene Lektionen und Streak werden gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.",
      [
        { text: "Abbrechen", style: "cancel" },
        { text: "Zurücksetzen", style: "destructive", onPress: async () => {
          await Progress.resetProgress();
          setXp(0); setDone([]);
          Alert.alert("Erledigt", "Dein Fortschritt wurde zurückgesetzt.");
        }},
      ]
    );
  }

  function confirmReOnboard() {
    Alert.alert(
      "Onboarding wiederholen?",
      "Du wirst beim nächsten Start das Onboarding erneut sehen.",
      [
        { text: "Abbrechen", style: "cancel" },
        { text: "Ja", onPress: async () => {
          await AsyncStorage.removeItem("wv_onboarded");
          Alert.alert("Erledigt", "Starte die App neu um das Onboarding zu sehen.");
        }},
      ]
    );
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <View style={{ height: SAFE_TOP }} />
      <View style={{ flexDirection: "row", height: 3 }}>
        <View style={{ flex: 1, backgroundColor: "#111" }} />
        <View style={{ flex: 1, backgroundColor: C.red }} />
        <View style={{ flex: 1, backgroundColor: C.gold }} />
      </View>

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 72 }}>
          <Text style={s.backText}>‹ Zurück</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Einstellungen</Text>
        <View style={{ width: 72 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

        {/* ── PROFIL ── */}
        <View style={s.sectionHeader}>
          <View style={s.sectionAccent} />
          <Text style={s.sectionLabel}>PROFIL</Text>
        </View>
        <View style={s.card}>
          <View style={s.rowBetween}>
            <Text style={s.rowLabel}>Name</Text>
            {nameEditing ? (
              <View style={s.nameEditRow}>
                <TextInput
                  style={s.nameInput}
                  value={nameDraft}
                  onChangeText={setNameDraft}
                  autoFocus
                  placeholderTextColor={C.muted}
                  placeholder="Dein Name"
                />
                <TouchableOpacity style={s.saveBtn} onPress={saveName}>
                  <Text style={s.saveBtnText}>✓</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => { setNameDraft(name); setNameEditing(true); }} style={s.editRow}>
                <Text style={s.rowValue}>{name || "Nicht gesetzt"}</Text>
                <Text style={s.editIcon}>✏️</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={s.divider} />
          <View style={s.rowBetween}>
            <Text style={s.rowLabel}>XP gesamt</Text>
            <Text style={[s.rowValue, { color: C.gold }]}>⚡ {xp} XP</Text>
          </View>
          <View style={s.divider} />
          <View style={s.rowBetween}>
            <Text style={s.rowLabel}>Lektionen abgeschlossen</Text>
            <Text style={[s.rowValue, { color: C.green }]}>✅ {done.length}</Text>
          </View>
        </View>

        {/* ── LERNZIEL ── */}
        <View style={s.sectionHeader}>
          <View style={s.sectionAccent} />
          <Text style={s.sectionLabel}>LERNZIEL</Text>
        </View>
        <View style={[s.card, { gap: 0 }]}>
          <Text style={s.cardDesc}>Dein Ziel beeinflusst die Begrüßung und Gesprächsvorschläge.</Text>
          <View style={s.goalsGrid}>
            {GOALS.map(g => (
              <TouchableOpacity
                key={g.id}
                style={[s.goalChip, goal === g.id && s.goalChipActive]}
                onPress={() => changeGoal(g.id)}
                activeOpacity={0.75}
              >
                <Text style={s.goalEmoji}>{g.emoji}</Text>
                <Text style={[s.goalLabel, goal === g.id && { color: C.gold }]}>{g.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── NIVEAU ── */}
        <View style={s.sectionHeader}>
          <View style={s.sectionAccent} />
          <Text style={s.sectionLabel}>SPRACHNIVEAU</Text>
        </View>
        <View style={[s.card, { gap: 10 }]}>
          <Text style={s.cardDesc}>Bestimmt welche Lektionen angezeigt werden und das KI-Gesprächsniveau.</Text>
          {STUDY_LEVELS.map(l => (
            <TouchableOpacity
              key={l.id}
              style={[s.levelCard, studyLevel === l.id && s.levelCardActive]}
              onPress={() => changeLevel(l.id)}
              activeOpacity={0.75}
            >
              <View style={{ flex: 1 }}>
                <Text style={[s.levelLabel, studyLevel === l.id && { color: C.gold }]}>{l.label}</Text>
                <Text style={s.levelSub}>{l.sub}</Text>
              </View>
              {studyLevel === l.id && (
                <View style={s.checkCircle}>
                  <Text style={{ color: C.navy, fontSize: 12, fontWeight: "800" }}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
          <View style={s.autoUpgradeInfo}>
            <Text style={s.autoUpgradeText}>
              💡 Das Niveau wird automatisch auf A2 angehoben sobald du alle A1-Lektionen abgeschlossen hast.
            </Text>
          </View>
        </View>

        {/* ── APP ── */}
        <View style={s.sectionHeader}>
          <View style={s.sectionAccent} />
          <Text style={s.sectionLabel}>APP</Text>
        </View>
        <View style={s.card}>
          <TouchableOpacity style={s.rowBetween} onPress={confirmReOnboard}>
            <Text style={s.rowLabel}>Onboarding wiederholen</Text>
            <Text style={s.rowArrow}>→</Text>
          </TouchableOpacity>
          <View style={s.divider} />
          <View style={s.rowBetween}>
            <Text style={s.rowLabel}>Version</Text>
            <Text style={s.rowValue}>1.0.0</Text>
          </View>
          <View style={s.divider} />
          <View style={s.rowBetween}>
            <Text style={s.rowLabel}>Erstellt von</Text>
            <Text style={[s.rowValue, { color: C.gold }]}>Philipp ✨</Text>
          </View>
        </View>

        {/* ── DANGER ZONE ── */}
        <View style={s.sectionHeader}>
          <View style={[s.sectionAccent, { backgroundColor: C.red }]} />
          <Text style={[s.sectionLabel, { color: C.red }]}>GEFAHRENZONE</Text>
        </View>
        <View style={s.card}>
          <TouchableOpacity style={s.dangerBtn} onPress={confirmReset}>
            <Text style={s.dangerBtnText}>🗑 Lernfortschritt zurücksetzen</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container:      { flex: 1, backgroundColor: C.navy },
  header:         { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 14, paddingBottom: 16 },
  backText:       { color: C.gold, fontSize: 16, fontWeight: "600" },
  headerTitle:    { color: C.white, fontSize: 16, fontWeight: "700" },

  sectionHeader:  { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 20, marginTop: 20, marginBottom: 10 },
  sectionAccent:  { width: 3, height: 14, backgroundColor: C.gold, borderRadius: 2 },
  sectionLabel:   { color: C.muted, fontSize: 10, fontWeight: "800", letterSpacing: 2 },

  card:           { marginHorizontal: 20, backgroundColor: C.navy2, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 16, gap: 0 },
  cardDesc:       { color: C.muted, fontSize: 13, lineHeight: 20, marginBottom: 14 },
  divider:        { height: 1, backgroundColor: C.border, marginVertical: 12 },
  rowBetween:     { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rowLabel:       { color: C.text, fontSize: 15 },
  rowValue:       { color: C.muted, fontSize: 15 },
  rowArrow:       { color: C.muted, fontSize: 18 },

  nameEditRow:    { flexDirection: "row", alignItems: "center", gap: 8 },
  nameInput:      { backgroundColor: C.navy3, borderRadius: 10, borderWidth: 1, borderColor: C.border, paddingHorizontal: 12, paddingVertical: 6, color: C.white, fontSize: 15, minWidth: 140 },
  saveBtn:        { width: 34, height: 34, borderRadius: 10, backgroundColor: C.gold, alignItems: "center", justifyContent: "center" },
  saveBtnText:    { color: C.navy, fontSize: 16, fontWeight: "800" },
  editRow:        { flexDirection: "row", alignItems: "center", gap: 8 },
  editIcon:       { fontSize: 14 },

  goalsGrid:      { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
  goalChip:       { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: C.navy3, borderRadius: 12, borderWidth: 1, borderColor: C.border, paddingHorizontal: 12, paddingVertical: 8 },
  goalChipActive: { borderColor: C.goldBorder, backgroundColor: C.goldBg },
  goalEmoji:      { fontSize: 16 },
  goalLabel:      { color: C.text, fontSize: 13, fontWeight: "600" },

  levelCard:      { flexDirection: "row", alignItems: "center", backgroundColor: C.navy3, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 14 },
  levelCardActive:{ borderColor: C.goldBorder, backgroundColor: C.goldBg },
  levelLabel:     { color: C.white, fontSize: 15, fontWeight: "700" },
  levelSub:       { color: C.muted, fontSize: 12, marginTop: 2 },
  checkCircle:    { width: 24, height: 24, borderRadius: 12, backgroundColor: C.gold, alignItems: "center", justifyContent: "center" },
  autoUpgradeInfo:{ backgroundColor: C.navy3, borderRadius: 10, padding: 12, borderLeftWidth: 3, borderLeftColor: C.gold },
  autoUpgradeText:{ color: C.muted, fontSize: 12, lineHeight: 18 },

  dangerBtn:      { backgroundColor: C.redBg, borderRadius: 12, borderWidth: 1, borderColor: C.redBorder, padding: 14, alignItems: "center" },
  dangerBtnText:  { color: C.red, fontSize: 15, fontWeight: "700" },
});
