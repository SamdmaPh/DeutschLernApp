import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { C, SAFE_TOP, SERIF } from "../../theme";

const GRAMMAR_SECTIONS = [
  { id: "verben", title: "Verben", emoji: "🔤", items: ["Konjugation Präsens", "Perfekt (haben/sein)", "Präteritum", "Modalverben", "Trennbare Verben", "Reflexive Verben", "Passiv", "Konjunktiv I & II"] },
  { id: "zeitformen", title: "Zeitformen", emoji: "⏰", items: ["Präsens", "Perfekt", "Präteritum", "Plusquamperfekt", "Futur I", "Futur II"] },
  { id: "nomen", title: "Nomen & Artikel", emoji: "📦", items: ["der/die/das", "Plural", "Komposita", "Nominalisierung"] },
  { id: "deklination", title: "Deklination", emoji: "📐", items: ["Nominativ", "Akkusativ", "Dativ", "Genitiv", "Adjektivdeklination"] },
  { id: "satzbau", title: "Satzbau", emoji: "🧱", items: ["Hauptsatz", "Nebensatz (weil, dass, wenn)", "Relativsätze", "Indirekte Rede", "Konnektoren"] },
  { id: "praepo", title: "Präpositionen", emoji: "📍", items: ["mit Akkusativ", "mit Dativ", "Wechselpräpositionen", "Lokale Präpositionen"] },
  { id: "pronomen", title: "Pronomen", emoji: "👆", items: ["Personal", "Possessiv", "Reflexiv", "Relativ", "Demonstrativ"] },
  { id: "adjektive", title: "Adjektive & Adverbien", emoji: "🎨", items: ["Komparativ", "Superlativ", "Partizip als Adjektiv"] },
];

const WORDS_PREVIEW = [
  { word: "Fernweh", meaning: "Sehnsucht nach der Ferne", level: "B1" },
  { word: "Geborgenheit", meaning: "Gefühl der Sicherheit und Wärme", level: "B2" },
  { word: "Wanderlust", meaning: "Lust am Wandern und Reisen", level: "A2" },
  { word: "Weltschmerz", meaning: "Schmerz über den Zustand der Welt", level: "C1" },
  { word: "Zweisamkeit", meaning: "Innige Gemeinsamkeit zu zweit", level: "B2" },
];

export default function LibraryScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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
        <Text style={s.title}>Bibliothek</Text>
        <Text style={s.subtitle}>Nachschlagen, lernen, verstehen</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Search */}
        <View style={s.searchBox}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Wort oder Grammatik suchen..."
            placeholderTextColor={C.muted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Wort des Tages */}
        <TouchableOpacity style={s.wodCard} onPress={() => router.push("/word-of-day")} activeOpacity={0.8}>
          <Text style={s.wodLabel}>WORT DES TAGES</Text>
          <Text style={s.wodWord}>{WORDS_PREVIEW[new Date().getDate() % WORDS_PREVIEW.length].word}</Text>
          <Text style={s.wodMeaning}>{WORDS_PREVIEW[new Date().getDate() % WORDS_PREVIEW.length].meaning}</Text>
          <Text style={s.wodLink}>Alle Wörter entdecken →</Text>
        </TouchableOpacity>

        {/* Grammatik-Referenz */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>GRAMMATIK</Text>
          {GRAMMAR_SECTIONS.map(section => (
            <View key={section.id}>
              <TouchableOpacity
                style={s.grammarCard}
                onPress={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                activeOpacity={0.7}
              >
                <Text style={s.grammarEmoji}>{section.emoji}</Text>
                <Text style={s.grammarTitle}>{section.title}</Text>
                <Text style={s.grammarArrow}>{expandedSection === section.id ? "▼" : "▶"}</Text>
              </TouchableOpacity>
              {expandedSection === section.id && (
                <View style={s.grammarItems}>
                  {section.items.map((item, i) => (
                    <View key={i} style={s.grammarItem}>
                      <View style={s.grammarBullet} />
                      <Text style={s.grammarItemText}>{item}</Text>
                    </View>
                  ))}
                  <Text style={s.comingSoon}>Detailseiten kommen bald</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Vokabeln */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>VOKABELN</Text>
          <View style={s.vocabCard}>
            <Text style={s.vocabTitle}>Dein Wortschatz</Text>
            <Text style={s.vocabDesc}>Alle Wörter die du in Lektionen gelernt hast — durchsuchbar, mit Audio und Beispielsätzen.</Text>
            <Text style={s.comingSoon}>Wird mit jeder abgeschlossenen Lektion gefüllt</Text>
          </View>
        </View>

        {/* Prüfungsvorbereitung */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>GOETHE-PRÜFUNG</Text>
          {["A1", "A2", "B1", "B2", "C1", "C2"].map(level => {
            const info = { A1: "Start Deutsch 1", A2: "Goethe-Zertifikat A2", B1: "Goethe-Zertifikat B1", B2: "Goethe-Zertifikat B2", C1: "Goethe-Zertifikat C1", C2: "Großes Deutsches Sprachdiplom" };
            return (
              <View key={level} style={s.examCard}>
                <Text style={s.examLevel}>{level}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.examName}>{info[level]}</Text>
                  <Text style={s.examModules}>Lesen · Hören · Schreiben · Sprechen</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Einstufungstest */}
        <TouchableOpacity style={s.placementCard} onPress={() => router.push("/placement")} activeOpacity={0.8}>
          <Text style={{ fontSize: 24 }}>🎯</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.placementTitle}>Einstufungstest</Text>
            <Text style={s.placementDesc}>Finde dein aktuelles Niveau heraus</Text>
          </View>
          <Text style={{ color: C.gold, fontSize: 16 }}>→</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
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
  scroll: { paddingHorizontal: 24, paddingBottom: 100 },

  searchBox: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, paddingHorizontal: 16, marginTop: 12, marginBottom: 20 },
  searchIcon: { fontSize: 16, marginRight: 10 },
  searchInput: { flex: 1, paddingVertical: 14, fontSize: 15, color: C.text },

  wodCard: { backgroundColor: C.card, borderRadius: 18, borderWidth: 1, borderColor: C.goldLine, padding: 20, marginBottom: 24 },
  wodLabel: { fontSize: 9, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 8 },
  wodWord: { fontFamily: SERIF, fontSize: 28, fontWeight: "700", color: C.text, fontStyle: "italic" },
  wodMeaning: { fontSize: 14, color: C.muted, marginTop: 6, lineHeight: 20 },
  wodLink: { fontSize: 13, color: C.gold, fontWeight: "700", marginTop: 12 },

  section: { marginBottom: 24 },
  sectionLabel: { fontSize: 10, fontWeight: "900", color: C.muted, letterSpacing: 2, marginBottom: 12 },

  grammarCard: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16, marginBottom: 8, gap: 12 },
  grammarEmoji: { fontSize: 22 },
  grammarTitle: { flex: 1, fontSize: 16, fontWeight: "700", color: C.text },
  grammarArrow: { fontSize: 12, color: C.muted },
  grammarItems: { paddingLeft: 50, paddingBottom: 12 },
  grammarItem: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 6 },
  grammarBullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.gold },
  grammarItemText: { fontSize: 14, color: C.textSec },

  vocabCard: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 20 },
  vocabTitle: { fontSize: 16, fontWeight: "700", color: C.text, marginBottom: 6 },
  vocabDesc: { fontSize: 14, color: C.muted, lineHeight: 20 },

  examCard: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 8, gap: 14 },
  examLevel: { fontSize: 16, fontWeight: "900", color: C.gold, width: 32 },
  examName: { fontSize: 14, fontWeight: "700", color: C.text },
  examModules: { fontSize: 11, color: C.muted, marginTop: 3 },

  placementCard: { flexDirection: "row", alignItems: "center", backgroundColor: C.goldDim, borderRadius: 16, borderWidth: 1, borderColor: C.goldLine, padding: 18, gap: 14 },
  placementTitle: { fontSize: 15, fontWeight: "700", color: C.text },
  placementDesc: { fontSize: 12, color: C.muted, marginTop: 2 },

  comingSoon: { fontSize: 12, color: C.muted2, fontStyle: "italic", marginTop: 8 },
});
