const fs = require('fs');
const content = `import { Audio } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "./services/supabase";

type Lesson = {
  id: string;
  title: string;
  level: string;
  duration: string;
  content: {
    goals: string[];
    chunks: string[];
    mnemonic: string[];
    speak: string[];
    science: string;
  };
};

export default function Lesson() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [tab, setTab] = useState<"chunks" | "mnemonic" | "ueben">("chunks");
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!id) {
      setError("Keine Lektion-ID gefunden.");
      setLoading(false);
      return;
    }
    supabase
      .from("lessons")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error: sbError }) => {
        if (sbError) {
          setError(sbError.message);
        } else if (data) {
          setLesson(data);
        }
        setLoading(false);
      });
  }, [id]);

  async function handlePlay() {
    if (playing && sound) {
      await sound.pauseAsync();
      setPlaying(false);
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
        { shouldPlay: true }
      );
      setSound(newSound);
      setPlaying(true);
    }
  }

  const toggleCheck = (i: number) => setChecked((p) => ({ ...p, [i]: !p[i] }));

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#FFCE00" size="large" />
        <Text style={styles.loadingText}>Lektion laden...</Text>
      </View>
    );
  }

  if (error || !lesson) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Lektion nicht gefunden</Text>
        <Text style={styles.errorSub}>{error ?? "Unbekannter Fehler"}</Text>
        <Text style={styles.errorId}>ID: {id}</Text>
      </View>
    );
  }

  const { goals = [], chunks = [], mnemonic = [], speak = [], science = "" } = lesson.content ?? {};
  const LEVEL_COLOR = lesson.level === "A1" ? "#27AE60" : "#FFCE00";
  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={[styles.level, { color: LEVEL_COLOR }]}>{lesson.level} · {lesson.duration}</Text>
        <Text style={styles.title}>{lesson.title}</Text>
        {goals.length > 0 && (
          <View style={styles.goalsCard}>
            <Text style={styles.goalsTitle}>✅ Nach dieser Lektion kannst du...</Text>
            {goals.map((g, i) => (
              <Text key={i} style={styles.goalItem}>✓ {g}</Text>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.player, { backgroundColor: lesson.level === "A1" ? "#27AE60" : "#DD0000" }]}
        onPress={handlePlay}
        activeOpacity={0.85}
      >
        <View style={styles.playerLeft}>
          <Text style={styles.playerIcon}>{playing ? "⏸" : "▶"}</Text>
          <View>
            <Text style={styles.playerTitle}>Podcast · {lesson.title}</Text>
            <Text style={styles.playerSub}>{playing ? "Läuft..." : "Jetzt anhören"}</Text>
          </View>
        </View>
        <Text style={styles.playerDuration}>{lesson.duration}</Text>
      </TouchableOpacity>

      {science ? (
        <View style={styles.scienceBanner}>
          <Text style={styles.scienceIcon}>🧠</Text>
          <Text style={styles.scienceText}>{science}</Text>
        </View>
      ) : null}

      <View style={styles.tabs}>
        {(["chunks", "mnemonic", "ueben"] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === "chunks" ? "📚 Regeln" : t === "mnemonic" ? "🎯 Tricks" : "🗣️ Üben"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === "chunks" && (
        <View style={styles.section}>
          {chunks.length === 0 ? (
            <Text style={styles.empty}>Inhalte folgen bald.</Text>
          ) : (
            chunks.map((chunk, i) => (
              <View key={i} style={styles.chunkCard}>
                <Text style={styles.chunkText}>{chunk}</Text>
              </View>
            ))
          )}
        </View>
      )}

      {tab === "mnemonic" && (
        <View style={styles.section}>
          {mnemonic.length === 0 ? (
            <Text style={styles.empty}>Keine Eselsbrücken für diese Lektion.</Text>
          ) : (
            <View style={styles.mnemonicCard}>
              <Text style={styles.mnemonicTitle}>🎯 Eselsbrücken</Text>
              {mnemonic.map((m, i) => (
                <Text key={i} style={styles.mnemonicItem}>{m}</Text>
              ))}
            </View>
          )}
        </View>
      )}

      {tab === "ueben" && (
        <View style={styles.section}>
          {speak.length === 0 ? (
            <Text style={styles.empty}>Übungen folgen bald.</Text>
          ) : (
            <>
              <Text style={styles.exerciseTitle}>🗣️ Sofort sprechen!</Text>
              {speak.map((s, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.sentenceCard, checked[i] && styles.sentenceCardDone]}
                  onPress={() => toggleCheck(i)}
                >
                  <View style={[styles.checkbox, checked[i] && styles.checkboxDone]}>
                    {checked[i] && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={[styles.sentence, checked[i] && styles.sentenceDone]}>{s}</Text>
                </TouchableOpacity>
              ))}
              {doneCount === speak.length && (
                <View style={styles.successCard}>
                  <Text style={styles.successText}>🎉 Lektion abgeschlossen!</Text>
                </View>
              )}
            </>
          )}
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F1621" },
  center: { flex: 1, backgroundColor: "#0F1621", justifyContent: "center", alignItems: "center", padding: 24 },
  loadingText: { color: "#8895A7", marginTop: 12, fontSize: 14 },
  errorIcon: { fontSize: 40, marginBottom: 12 },
  errorTitle: { fontSize: 18, fontWeight: "700", color: "#fff", marginBottom: 8 },
  errorSub: { fontSize: 13, color: "#DD0000", marginBottom: 6, textAlign: "center" },
  errorId: { fontSize: 11, color: "#4B5563" },
  header: { padding: 24, paddingTop: 60 },
  level: { fontSize: 12, fontWeight: "700", letterSpacing: 2, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: "800", color: "#fff", marginBottom: 16 },
  goalsCard: { backgroundColor: "#1C2535", borderRadius: 14, padding: 16 },
  goalsTitle: { fontSize: 13, fontWeight: "700", color: "#fff", marginBottom: 10 },
  goalItem: { color: "#B0C0D8", fontSize: 13, marginBottom: 5, lineHeight: 20 },
  player: { marginHorizontal: 24, borderRadius: 16, padding: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  playerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  playerIcon: { fontSize: 24, color: "#fff" },
  playerTitle: { color: "#fff", fontWeight: "700", fontSize: 15 },
  playerSub: { color: "rgba(255,255,255,0.7)", fontSize: 12 },
  playerDuration: { color: "#fff", fontWeight: "600", fontSize: 13 },
  scienceBanner: { marginHorizontal: 24, backgroundColor: "#0A1120", borderRadius: 12, padding: 14, flexDirection: "row", gap: 10, marginBottom: 16 },
  scienceIcon: { fontSize: 18 },
  scienceText: { flex: 1, color: "#8895A7", fontSize: 12, lineHeight: 18 },
  tabs: { flexDirection: "row", marginHorizontal: 24, marginBottom: 16, backgroundColor: "#1C2535", borderRadius: 12, padding: 4 },
  tab: { flex: 1, padding: 10, borderRadius: 10, alignItems: "center" },
  tabActive: { backgroundColor: "#FFCE00" },
  tabText: { fontSize: 12, fontWeight: "600", color: "#8895A7" },
  tabTextActive: { color: "#0F1621" },
  section: { paddingHorizontal: 24 },
  empty: { color: "#4B5563", fontSize: 14, textAlign: "center", marginTop: 20 },
  chunkCard: { backgroundColor: "#1C2535", borderRadius: 12, padding: 14, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: "#FFCE00" },
  chunkText: { color: "#B0C0D8", fontSize: 13, lineHeight: 20, fontFamily: "monospace" },
  mnemonicCard: { backgroundColor: "#1C2535", borderRadius: 14, padding: 16 },
  mnemonicTitle: { fontSize: 15, fontWeight: "700", color: "#fff", marginBottom: 12 },
  mnemonicItem: { color: "#B0C0D8", fontSize: 13, lineHeight: 22, marginBottom: 4 },
  exerciseTitle: { fontSize: 17, fontWeight: "800", color: "#fff", marginBottom: 14 },
  sentenceCard: { backgroundColor: "#1C2535", borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: "row", alignItems: "flex-start", gap: 12 },
  sentenceCardDone: { backgroundColor: "#0A2A1A", borderColor: "#27AE60", borderWidth: 1 },
  checkbox: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: "#FFCE00", alignItems: "center", justifyContent: "center", marginTop: 1 },
  checkboxDone: { backgroundColor: "#27AE60", borderColor: "#27AE60" },
  checkmark: { color: "#fff", fontWeight: "800", fontSize: 13 },
  sentence: { flex: 1, color: "#fff", fontSize: 14, lineHeight: 21 },
  sentenceDone: { color: "#4B5563", textDecorationLine: "line-through" },
  successCard: { backgroundColor: "#0A2A1A", borderRadius: 14, padding: 16, alignItems: "center", marginTop: 8 },
  successText: { color: "#27AE60", fontWeight: "700", fontSize: 15 },
});
`;
fs.writeFileSync('./lesson.tsx', content);
console.log('Done! lesson.tsx written successfully.');
