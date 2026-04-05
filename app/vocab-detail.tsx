import { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, StatusBar } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { C, SAFE_TOP, SERIF } from "../theme";
import { VOCAB_DATA, VOCAB_CATEGORIES, searchVocab, getVocabByCategory, getWordOfTheDay, type VocabEntry } from "../data/vocabData";

export default function VocabDetailScreen() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId?: string }>();
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  // If category specified, show that category
  const words = useMemo(() => {
    let result: VocabEntry[];
    if (search.length >= 2) {
      result = searchVocab(search);
    } else if (categoryId) {
      result = getVocabByCategory(categoryId);
    } else {
      result = VOCAB_DATA;
    }
    if (selectedLevel) {
      result = result.filter(v => v.level === selectedLevel);
    }
    return result;
  }, [search, categoryId, selectedLevel]);

  const categoryName = categoryId
    ? VOCAB_CATEGORIES.find(c => c.id === categoryId)?.name || "Vokabeln"
    : "Wörterbuch";
  const categoryEmoji = categoryId
    ? VOCAB_CATEGORIES.find(c => c.id === categoryId)?.emoji || "📚"
    : "📖";

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
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>← Bibliothek</Text>
        </TouchableOpacity>
        <Text style={s.title}>{categoryEmoji} {categoryName}</Text>
        <Text style={s.subtitle}>{words.length} Einträge</Text>
      </View>

      {/* Search */}
      <View style={s.searchArea}>
        <View style={s.searchBox}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Wort suchen (DE oder EN)..."
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

        {/* Level Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.levelFilter}>
          <TouchableOpacity
            style={[s.levelChip, !selectedLevel ? s.levelChipActive : {}]}
            onPress={() => setSelectedLevel(null)}
          >
            <Text style={[s.levelChipText, !selectedLevel ? s.levelChipTextActive : {}]}>Alle</Text>
          </TouchableOpacity>
          {["A1", "A2", "B1", "B2", "C1", "C2"].map(lv => (
            <TouchableOpacity
              key={lv}
              style={[s.levelChip, selectedLevel === lv ? s.levelChipActive : {}]}
              onPress={() => setSelectedLevel(selectedLevel === lv ? null : lv)}
            >
              <Text style={[s.levelChipText, selectedLevel === lv ? s.levelChipTextActive : {}]}>{lv}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Category Grid (if no category selected and no search) */}
      {!categoryId && search.length < 2 ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          {/* Wort des Tages */}
          <WotdCard />

          <Text style={s.sectionLabel}>KATEGORIEN</Text>
          {VOCAB_CATEGORIES.map(cat => {
            const count = getVocabByCategory(cat.id).length;
            if (count === 0) return null;
            return (
              <TouchableOpacity
                key={cat.id}
                style={s.catCard}
                onPress={() => router.push(`/vocab-detail?categoryId=${cat.id}`)}
                activeOpacity={0.7}
              >
                <Text style={s.catEmoji}>{cat.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.catName}>{cat.name}</Text>
                  <Text style={s.catCount}>{count} Wörter</Text>
                </View>
                <Text style={{ color: C.gold }}>→</Text>
              </TouchableOpacity>
            );
          })}
          <View style={{ height: 40 }} />
        </ScrollView>
      ) : (
        /* Word List */
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          {words.length === 0 ? (
            <View style={s.emptyBox}>
              <Text style={s.emptyEmoji}>🔍</Text>
              <Text style={s.emptyText}>Kein Ergebnis für "{search}"</Text>
            </View>
          ) : (
            words.map((word, i) => <WordCard key={`${word.word}-${i}`} word={word} />)
          )}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </View>
  );
}

function WotdCard() {
  const wotd = getWordOfTheDay();
  return (
    <View style={s.wotdCard}>
      <Text style={s.wotdLabel}>WORT DES TAGES</Text>
      <Text style={s.wotdWord}>{wotd.article ? `${wotd.article} ` : ""}{wotd.word}</Text>
      <Text style={s.wotdMeaning}>{wotd.meaningDe}</Text>
      <Text style={s.wotdMeaningEn}>{wotd.meaningEn}</Text>
      <View style={s.wotdExample}>
        <Text style={s.wotdExampleDe}>"{wotd.example}"</Text>
        <Text style={s.wotdExampleEn}>{wotd.exampleEn}</Text>
      </View>
    </View>
  );
}

function WordCard({ word }: { word: VocabEntry }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={s.wordCard}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.8}
    >
      <View style={s.wordHeader}>
        <View style={{ flex: 1 }}>
          <View style={s.wordTitleRow}>
            {word.article && <Text style={s.wordArticle}>{word.article} </Text>}
            <Text style={s.wordWord}>{word.word}</Text>
            {word.plural && <Text style={s.wordPlural}> (Pl. {word.plural})</Text>}
          </View>
          <Text style={s.wordMeaningEn}>{word.meaningEn}</Text>
        </View>
        <View style={s.wordMeta}>
          <View style={[s.levelBadgeSm, { backgroundColor: levelColor(word.level) }]}>
            <Text style={s.levelBadgeText}>{word.level}</Text>
          </View>
          <Text style={s.wordPos}>{word.partOfSpeech}</Text>
        </View>
      </View>

      {expanded && (
        <View style={s.wordExpanded}>
          <Text style={s.wordMeaningDe}>{word.meaningDe}</Text>
          {word.ipa && <Text style={s.wordIpa}>/{word.ipa}/</Text>}

          <View style={s.wordExampleBox}>
            <Text style={s.wordExampleDe}>"{word.example}"</Text>
            <Text style={s.wordExampleEn}>{word.exampleEn}</Text>
          </View>

          {word.conjugation && (
            <View style={s.conjugationBox}>
              <Text style={s.conjugationLabel}>Konjugation (Präsens):</Text>
              <View style={s.conjugationGrid}>
                {["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"].map((person, i) => (
                  <View key={i} style={s.conjugationRow}>
                    <Text style={s.conjugationPerson}>{person}</Text>
                    <Text style={s.conjugationForm}>{word.conjugation![i]}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {word.tags && word.tags.length > 0 && (
            <View style={s.tagRow}>
              {word.tags.map((tag, i) => (
                <View key={i} style={s.tag}>
                  <Text style={s.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
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
  header: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 4 },
  backBtn: { paddingVertical: 8 },
  backText: { fontSize: 14, color: C.gold, fontWeight: "700" },
  title: { fontFamily: SERIF, fontSize: 24, fontWeight: "700", color: C.text, marginTop: 4 },
  subtitle: { fontSize: 13, color: C.muted, marginTop: 2 },
  scroll: { paddingHorizontal: 24, paddingBottom: 100 },

  searchArea: { paddingHorizontal: 24, marginBottom: 8 },
  searchBox: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, paddingHorizontal: 16, marginTop: 8 },
  searchIcon: { fontSize: 16, marginRight: 10 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: C.text },
  levelFilter: { marginTop: 10, flexGrow: 0 },
  levelChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: C.card, borderWidth: 1, borderColor: C.border, marginRight: 6 },
  levelChipActive: { backgroundColor: C.gold, borderColor: C.gold },
  levelChipText: { fontSize: 12, fontWeight: "700", color: C.textSec },
  levelChipTextActive: { color: "#FFF" },

  sectionLabel: { fontSize: 10, fontWeight: "900", color: C.muted, letterSpacing: 2, marginBottom: 12, marginTop: 16 },

  catCard: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16, marginBottom: 8, gap: 14 },
  catEmoji: { fontSize: 24 },
  catName: { fontSize: 15, fontWeight: "700", color: C.text },
  catCount: { fontSize: 12, color: C.muted, marginTop: 2 },

  wotdCard: { backgroundColor: C.card, borderRadius: 18, borderWidth: 1, borderColor: C.goldLine, padding: 20, marginBottom: 20, marginTop: 8 },
  wotdLabel: { fontSize: 9, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 8 },
  wotdWord: { fontFamily: SERIF, fontSize: 28, fontWeight: "700", color: C.text, fontStyle: "italic" },
  wotdMeaning: { fontSize: 14, color: C.textSec, marginTop: 6 },
  wotdMeaningEn: { fontSize: 13, color: C.muted, marginTop: 2 },
  wotdExample: { marginTop: 12, paddingLeft: 12, borderLeftWidth: 3, borderLeftColor: C.goldLine },
  wotdExampleDe: { fontSize: 14, color: C.text, fontStyle: "italic" },
  wotdExampleEn: { fontSize: 12, color: C.muted, marginTop: 3 },

  wordCard: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16, marginBottom: 8 },
  wordHeader: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  wordTitleRow: { flexDirection: "row", alignItems: "baseline", flexWrap: "wrap" },
  wordArticle: { fontSize: 14, color: C.gold, fontWeight: "700" },
  wordWord: { fontSize: 17, fontWeight: "700", color: C.text },
  wordPlural: { fontSize: 12, color: C.muted },
  wordMeaningEn: { fontSize: 13, color: C.muted, marginTop: 3 },
  wordMeta: { alignItems: "flex-end", gap: 4 },
  levelBadgeSm: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  levelBadgeText: { fontSize: 10, fontWeight: "900", color: "#FFF" },
  wordPos: { fontSize: 10, color: C.muted2 },

  wordExpanded: { marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: C.border },
  wordMeaningDe: { fontSize: 14, color: C.textSec, lineHeight: 20, marginBottom: 4 },
  wordIpa: { fontSize: 13, color: C.muted, fontStyle: "italic", marginBottom: 8 },
  wordExampleBox: { backgroundColor: C.bg, borderRadius: 10, padding: 12, marginTop: 8, borderLeftWidth: 3, borderLeftColor: C.goldLine },
  wordExampleDe: { fontSize: 14, color: C.text, fontStyle: "italic" },
  wordExampleEn: { fontSize: 12, color: C.muted, marginTop: 4 },

  conjugationBox: { marginTop: 12 },
  conjugationLabel: { fontSize: 12, fontWeight: "700", color: C.textSec, marginBottom: 6 },
  conjugationGrid: { gap: 4 },
  conjugationRow: { flexDirection: "row", gap: 16 },
  conjugationPerson: { fontSize: 13, color: C.muted, width: 70 },
  conjugationForm: { fontSize: 13, fontWeight: "600", color: C.text },

  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 10 },
  tag: { backgroundColor: C.goldDim, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 11, color: C.gold, fontWeight: "600" },

  emptyBox: { alignItems: "center", marginTop: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, color: C.muted },
});
