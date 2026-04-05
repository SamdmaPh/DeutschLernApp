import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { C, SAFE_TOP, SERIF } from "../../theme";
import { GRAMMAR_DATA } from "../../data/grammarData";
import { VOCAB_CATEGORIES, VOCAB_DATA, searchVocab, getWordOfTheDay } from "../../data/vocabData";
import { EXAM_DATA } from "../../data/examData";

export default function LibraryScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const wotd = getWordOfTheDay();
  const searchResults = search.length >= 2 ? searchVocab(search) : [];
  const isSearching = search.length >= 2;

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
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Text style={{ fontSize: 16, color: C.muted }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Search Results */}
        {isSearching ? (
          <View style={s.section}>
            <Text style={s.sectionLabel}>SUCHERGEBNISSE ({searchResults.length})</Text>
            {searchResults.length === 0 ? (
              <View style={s.emptyBox}>
                <Text style={s.emptyText}>Kein Ergebnis für "{search}"</Text>
              </View>
            ) : (
              searchResults.slice(0, 20).map((word, i) => (
                <TouchableOpacity
                  key={`${word.word}-${i}`}
                  style={s.searchResultCard}
                  onPress={() => { setSearch(""); router.push(`/vocab-detail?categoryId=${word.category}`); }}
                  activeOpacity={0.7}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={s.searchWord}>
                      {word.article ? `${word.article} ` : ""}{word.word}
                    </Text>
                    <Text style={s.searchMeaning}>{word.meaningEn}</Text>
                  </View>
                  <View style={[s.levelBadge, { backgroundColor: levelColor(word.level) }]}>
                    <Text style={s.levelBadgeText}>{word.level}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
            {searchResults.length > 20 && (
              <TouchableOpacity
                style={s.moreBtn}
                onPress={() => { router.push("/vocab-detail"); }}
                activeOpacity={0.7}
              >
                <Text style={s.moreBtnText}>Alle {searchResults.length} Ergebnisse im Wörterbuch →</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <>
            {/* Wort des Tages */}
            <TouchableOpacity style={s.wodCard} onPress={() => router.push("/vocab-detail")} activeOpacity={0.8}>
              <Text style={s.wodLabel}>WORT DES TAGES</Text>
              <Text style={s.wodWord}>{wotd.article ? `${wotd.article} ` : ""}{wotd.word}</Text>
              <Text style={s.wodMeaning}>{wotd.meaningDe}</Text>
              <Text style={s.wodMeaningEn}>{wotd.meaningEn}</Text>
              <Text style={s.wodLink}>Alle Wörter entdecken →</Text>
            </TouchableOpacity>

            {/* Vokabel-Duden */}
            <View style={s.section}>
              <Text style={s.sectionLabel}>WÖRTERBUCH</Text>
              <TouchableOpacity
                style={s.dudenCard}
                onPress={() => router.push("/vocab-detail")}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: 28 }}>📖</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.dudenTitle}>Vokabel-Duden</Text>
                  <Text style={s.dudenDesc}>{VOCAB_DATA.length} Wörter · Durchsuchbar · Mit Beispielen & Konjugationen</Text>
                </View>
                <Text style={{ color: C.gold, fontSize: 16 }}>→</Text>
              </TouchableOpacity>

              {/* Quick Category Preview */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.catScroll}>
                {VOCAB_CATEGORIES.slice(0, 8).map(cat => (
                  <TouchableOpacity
                    key={cat.id}
                    style={s.catChip}
                    onPress={() => router.push(`/vocab-detail?categoryId=${cat.id}`)}
                    activeOpacity={0.7}
                  >
                    <Text style={s.catChipEmoji}>{cat.emoji}</Text>
                    <Text style={s.catChipText}>{cat.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Grammatik-Referenz */}
            <View style={s.section}>
              <Text style={s.sectionLabel}>GRAMMATIK</Text>
              {GRAMMAR_DATA.map(section => {
                const topicCount = section.topics.length;
                const levels = [...new Set(section.topics.map(t => t.level))].join(", ");
                return (
                  <TouchableOpacity
                    key={section.id}
                    style={s.grammarCard}
                    onPress={() => router.push(`/grammar-detail?sectionId=${section.id}`)}
                    activeOpacity={0.7}
                  >
                    <Text style={s.grammarEmoji}>{section.emoji}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={s.grammarTitle}>{section.title}</Text>
                      <Text style={s.grammarMeta}>{topicCount} Themen · {levels}</Text>
                    </View>
                    <Text style={{ color: C.gold, fontSize: 14 }}>→</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Prüfungsvorbereitung */}
            <View style={s.section}>
              <Text style={s.sectionLabel}>GOETHE-PRÜFUNG</Text>
              {EXAM_DATA.map(exam => (
                <TouchableOpacity
                  key={exam.level}
                  style={s.examCard}
                  onPress={() => router.push(`/exam-detail?level=${exam.level}`)}
                  activeOpacity={0.7}
                >
                  <View style={[s.levelBadge, { backgroundColor: levelColor(exam.level) }]}>
                    <Text style={s.levelBadgeText}>{exam.level}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.examName}>{exam.name}</Text>
                    <Text style={s.examModules}>{exam.modules.map(m => m.name).join(" · ")} · {exam.duration}</Text>
                  </View>
                  <Text style={{ color: C.gold, fontSize: 14 }}>→</Text>
                </TouchableOpacity>
              ))}
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
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

function levelColor(level: string): string {
  const colors: Record<string, string> = { A1: "#2E8B57", A2: "#2563EB", B1: "#B8922A", B2: "#7C3AED", C1: "#CC0000", C2: "#1A1A1A" };
  return colors[level] || C.gold;
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
  wodMeaning: { fontSize: 14, color: C.textSec, marginTop: 6, lineHeight: 20 },
  wodMeaningEn: { fontSize: 13, color: C.muted, marginTop: 2 },
  wodLink: { fontSize: 13, color: C.gold, fontWeight: "700", marginTop: 12 },

  section: { marginBottom: 24 },
  sectionLabel: { fontSize: 10, fontWeight: "900", color: C.muted, letterSpacing: 2, marginBottom: 12 },

  dudenCard: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.goldLine, padding: 18, gap: 14, marginBottom: 10 },
  dudenTitle: { fontSize: 16, fontWeight: "700", color: C.text },
  dudenDesc: { fontSize: 12, color: C.muted, marginTop: 3, lineHeight: 17 },

  catScroll: { marginTop: 4 },
  catChip: { backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, paddingHorizontal: 14, paddingVertical: 10, marginRight: 8, alignItems: "center", gap: 4 },
  catChipEmoji: { fontSize: 20 },
  catChipText: { fontSize: 10, color: C.textSec, fontWeight: "600" },

  grammarCard: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16, marginBottom: 8, gap: 12 },
  grammarEmoji: { fontSize: 22 },
  grammarTitle: { fontSize: 16, fontWeight: "700", color: C.text },
  grammarMeta: { fontSize: 11, color: C.muted, marginTop: 3 },

  examCard: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 8, gap: 14 },
  examName: { fontSize: 14, fontWeight: "700", color: C.text },
  examModules: { fontSize: 11, color: C.muted, marginTop: 3 },

  levelBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  levelBadgeText: { fontSize: 11, fontWeight: "900", color: "#FFF" },

  placementCard: { flexDirection: "row", alignItems: "center", backgroundColor: C.goldDim, borderRadius: 16, borderWidth: 1, borderColor: C.goldLine, padding: 18, gap: 14 },
  placementTitle: { fontSize: 15, fontWeight: "700", color: C.text },
  placementDesc: { fontSize: 12, color: C.muted, marginTop: 2 },

  searchResultCard: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 6, gap: 12 },
  searchWord: { fontSize: 15, fontWeight: "700", color: C.text },
  searchMeaning: { fontSize: 13, color: C.muted, marginTop: 2 },

  moreBtn: { paddingVertical: 12, alignItems: "center" },
  moreBtnText: { fontSize: 14, color: C.gold, fontWeight: "700" },

  emptyBox: { alignItems: "center", paddingVertical: 40 },
  emptyText: { fontSize: 15, color: C.muted },
});
