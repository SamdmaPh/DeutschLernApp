import { useState, useCallback } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  StatusBar, Dimensions,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Progress } from "../../services/progress";
import { ALL_STATIC_LESSONS } from "../../data/lessonData";
import { JOURNEY_CITIES, LEVEL_INFO } from "../../data/journeyData";
import { Avatar, AVATAR_STAGES, ALL_ITEMS, type AvatarState } from "../../services/avatar";
import { getWordOfTheDay } from "../../data/vocabData";
import { C, SAFE_TOP, SAFE_BOTTOM, SERIF } from "../../theme";

const { width: SW } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [avatarState, setAvatarState] = useState<AvatarState | null>(null);

  useFocusEffect(useCallback(() => {
    Progress.getAll().then(p => {
      setXp(p.xp); setStreak(p.streak); setDone(p.done); setName(p.name);
    });
    Avatar.getState().then(setAvatarState);
  }, []));

  // Derived
  const avatarLevel = Avatar.getAvatarLevel(xp);
  const avatarEmoji = AVATAR_STAGES[avatarLevel]?.emoji || "🧑‍🎒";
  const avatarTitle = AVATAR_STAGES[avatarLevel]?.name || "Backpacker";
  const currentCity = JOURNEY_CITIES.find(c => !c.lessonIds.every(id => done.includes(id))) || JOURNEY_CITIES[0];
  const currentLevel = currentCity.level;
  const levelCities = JOURNEY_CITIES.filter(c => c.level === currentLevel);
  const info = LEVEL_INFO[currentLevel];
  const collectedItems = avatarState ? ALL_ITEMS.filter(i => avatarState.items.includes(i.id)) : [];

  // Next lesson
  const nextLesson = ALL_STATIC_LESSONS
    .filter((l: any) => currentCity.lessonIds.includes(l.id))
    .sort((a: any, b: any) => a.order_index - b.order_index)
    .find((l: any) => !done.includes(l.id)) as any;
  const cityDone = currentCity.lessonIds.filter(id => done.includes(id)).length;
  const cityTotal = currentCity.lessonIds.length;

  // Wort des Tages
  const wotd = getWordOfTheDay();

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: SAFE_TOP }} />

      {/* ── Flag strip ── */}
      <View style={s.flagStrip}>
        <View style={[s.flagBar, { backgroundColor: C.flagBlack }]} />
        <View style={[s.flagBar, { backgroundColor: C.flagRed }]} />
        <View style={[s.flagBar, { backgroundColor: C.flagGold }]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* ══ HEADER: Greeting + Avatar + Stats ══ */}
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.greeting}>
              {new Date().getHours() < 12 ? "Guten Morgen" : new Date().getHours() < 18 ? "Guten Tag" : "Guten Abend"}
            </Text>
            <Text style={s.userName}>{name || "Reisender"} {avatarEmoji}</Text>
          </View>
          <View style={s.headerRight}>
            <View style={[s.statBadge, { backgroundColor: C.redDim }]}>
              <Text style={[s.statBadgeText, { color: C.red }]}>🔥 {streak}</Text>
            </View>
            <View style={[s.statBadge, { backgroundColor: C.goldDim }]}>
              <Text style={[s.statBadgeText, { color: C.gold }]}>⚡ {xp}</Text>
            </View>
          </View>
        </View>

        {/* ══ WORT DES TAGES ══ */}
        <View style={s.wotdCard}>
          <View style={s.wotdHeader}>
            <Text style={s.wotdLabel}>WORT DES TAGES</Text>
            <Text style={s.wotdLevel}>{wotd.level}</Text>
          </View>
          <Text style={s.wotdWord}>{wotd.article ? `${wotd.article} ` : ""}{wotd.word}</Text>
          <Text style={s.wotdMeaning}>{wotd.meaningDe}</Text>
          <Text style={s.wotdMeaningEn}>{wotd.meaningEn}</Text>
          <View style={s.wotdDivider} />
          <Text style={s.wotdExample}>"{wotd.example}"</Text>
          <Text style={s.wotdExampleEn}>{wotd.exampleEn}</Text>
        </View>

        {/* ══ NÄCHSTE MISSION (CTA) ══ */}
        {nextLesson && (
          <TouchableOpacity
            style={s.missionCard}
            onPress={() => router.push({ pathname: "/lesson", params: { lessonId: nextLesson.id } })}
            activeOpacity={0.85}
          >
            <View style={s.missionTop}>
              <Text style={s.missionEmoji}>{currentCity.emoji}</Text>
              <View style={s.missionMeta}>
                <Text style={s.missionCity}>{currentCity.name}</Text>
                <Text style={s.missionProgress}>{cityDone}/{cityTotal} Missionen</Text>
              </View>
              <View style={s.missionXP}>
                <Text style={s.missionXPText}>+{nextLesson.xp_reward || 50}</Text>
                <Text style={s.missionXPLabel}>XP</Text>
              </View>
            </View>
            <View style={s.missionProgressBar}>
              <View style={[s.missionProgressFill, { width: `${(cityDone / cityTotal) * 100}%` }]} />
            </View>
            <Text style={s.missionTitle}>{nextLesson.title_de || nextLesson.title}</Text>
            <Text style={s.missionDesc} numberOfLines={2}>{nextLesson.description}</Text>
            <View style={s.missionCTA}>
              <Text style={s.missionCTAText}>▶ SPIELEN</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* ══ ZUGSTRECKE (Train Route) ══ */}
        <View style={s.routeSection}>
          <Text style={s.sectionTitle}>DEINE REISE</Text>
          <View style={s.routeContainer}>
            {levelCities.map((city, i) => {
              const cDone = city.lessonIds.filter(id => done.includes(id)).length;
              const cTotal = city.lessonIds.length;
              const isComplete = cDone === cTotal;
              const isCurrent = city.id === currentCity.id;
              const isLocked = !isCurrent && !isComplete && i > levelCities.findIndex(c => c.id === currentCity.id);

              return (
                <View key={city.id}>
                  {/* Rail connector */}
                  {i > 0 && (
                    <View style={s.rail}>
                      <View style={[s.railLine, isComplete || isCurrent ? { backgroundColor: C.gold } : { backgroundColor: C.bg3 }]} />
                    </View>
                  )}

                  {/* Station */}
                  <View style={[s.station, isCurrent && s.stationCurrent]}>
                    {/* Station dot */}
                    <View style={[
                      s.stationDot,
                      isComplete && { backgroundColor: C.green, borderColor: C.green },
                      isCurrent && { backgroundColor: C.gold, borderColor: C.gold, width: 20, height: 20, borderRadius: 10 },
                      isLocked && { backgroundColor: C.bg3, borderColor: C.bg3 },
                    ]}>
                      {isCurrent && <Text style={{ fontSize: 10, color: "#FFF" }}>{avatarEmoji}</Text>}
                      {isComplete && <Text style={{ fontSize: 8, color: "#FFF" }}>✓</Text>}
                    </View>

                    {/* Station info */}
                    <View style={s.stationInfo}>
                      <Text style={[s.stationName, isLocked && { color: C.muted2 }]}>{city.emoji} {city.name}</Text>
                      {isComplete && <Text style={s.stationDone}>Abgeschlossen</Text>}
                      {isCurrent && <Text style={s.stationActive}>{cDone}/{cTotal} Missionen</Text>}
                      {isLocked && <Text style={s.stationLocked}>Noch gesperrt</Text>}
                    </View>

                    {/* Play button for current */}
                    {isCurrent && (
                      <TouchableOpacity
                        style={s.stationPlay}
                        onPress={() => { if (nextLesson) router.push({ pathname: "/lesson", params: { lessonId: nextLesson.id } }); }}
                      >
                        <Text style={s.stationPlayText}>▶</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* ══ ITEMS ══ */}
        {collectedItems.length > 0 && (
          <View style={s.itemsSection}>
            <Text style={s.sectionTitle}>DEINE ITEMS</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={s.itemsRow}>
                {collectedItems.map(item => (
                  <View key={item.id} style={s.itemCard}>
                    <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
                    <Text style={s.itemName}>{item.name}</Text>
                    <Text style={s.itemCity}>{item.city}</Text>
                  </View>
                ))}
                {/* Locked next items */}
                {ALL_ITEMS.filter(i => !collectedItems.find(c => c.id === i.id)).slice(0, 3).map(item => (
                  <View key={item.id} style={[s.itemCard, { opacity: 0.3 }]}>
                    <Text style={{ fontSize: 28 }}>❓</Text>
                    <Text style={s.itemName}>???</Text>
                    <Text style={s.itemCity}>{item.city}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* ══ AVATAR STATUS ══ */}
        <View style={s.avatarCard}>
          <View style={s.avatarRow}>
            <Text style={{ fontSize: 40 }}>{avatarEmoji}</Text>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={s.avatarName}>{name || "Reisender"}</Text>
              <Text style={s.avatarLevel}>{avatarTitle} · Level {avatarLevel + 1}</Text>
              <View style={s.avatarXPBar}>
                <View style={[s.avatarXPFill, { width: `${Math.min(100, (xp / (AVATAR_STAGES[avatarLevel + 1]?.minXP || 5000)) * 100)}%` }]} />
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  flagStrip: { flexDirection: "row", height: 3 },
  flagBar: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },

  // ── Header ──
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingTop: 16, paddingBottom: 12 },
  headerLeft: {},
  greeting: { fontSize: 14, color: C.muted },
  userName: { fontSize: 26, fontWeight: "800", color: C.text, marginTop: 2 },
  headerRight: { flexDirection: "row", gap: 8, marginTop: 6 },
  statBadge: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  statBadgeText: { fontSize: 14, fontWeight: "800" },

  // ── Wort des Tages ──
  wotdCard: { backgroundColor: C.card, borderRadius: 20, padding: 22, marginTop: 8, marginBottom: 16, borderWidth: 1, borderColor: C.goldLine, shadowColor: C.gold, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 },
  wotdHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  wotdLabel: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2 },
  wotdLevel: { fontSize: 10, fontWeight: "800", color: C.muted, backgroundColor: C.bg2, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  wotdWord: { fontFamily: SERIF, fontSize: 32, fontWeight: "700", color: C.text, fontStyle: "italic" },
  wotdMeaning: { fontSize: 15, color: C.textSec, marginTop: 6, lineHeight: 21 },
  wotdMeaningEn: { fontSize: 13, color: C.muted, marginTop: 2 },
  wotdDivider: { height: 1, backgroundColor: C.border, marginVertical: 14 },
  wotdExample: { fontSize: 15, color: C.text, fontStyle: "italic", lineHeight: 22 },
  wotdExampleEn: { fontSize: 13, color: C.muted, marginTop: 4 },

  // ── Mission CTA ──
  missionCard: { backgroundColor: C.card, borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: C.border, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4 },
  missionTop: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 },
  missionEmoji: { fontSize: 36 },
  missionMeta: { flex: 1 },
  missionCity: { fontSize: 12, fontWeight: "800", color: C.muted, letterSpacing: 1, textTransform: "uppercase" },
  missionProgress: { fontSize: 11, color: C.muted, marginTop: 2 },
  missionXP: { backgroundColor: C.goldDim, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6, alignItems: "center" },
  missionXPText: { fontSize: 16, fontWeight: "900", color: C.gold },
  missionXPLabel: { fontSize: 9, fontWeight: "700", color: C.gold },
  missionProgressBar: { height: 4, backgroundColor: C.bg2, borderRadius: 2, marginBottom: 14, overflow: "hidden" },
  missionProgressFill: { height: "100%", backgroundColor: C.gold, borderRadius: 2 },
  missionTitle: { fontFamily: SERIF, fontSize: 22, fontWeight: "700", color: C.text },
  missionDesc: { fontSize: 14, color: C.muted, lineHeight: 20, marginTop: 6 },
  missionCTA: { backgroundColor: C.gold, borderRadius: 14, paddingVertical: 14, alignItems: "center", marginTop: 16 },
  missionCTAText: { fontSize: 15, fontWeight: "900", color: "#FFF", letterSpacing: 1 },

  // ── Route (Train) ──
  routeSection: { marginBottom: 20 },
  sectionTitle: { fontSize: 11, fontWeight: "900", color: C.muted, letterSpacing: 2, marginBottom: 14 },
  routeContainer: { paddingLeft: 4 },
  rail: { paddingLeft: 9, height: 24 },
  railLine: { width: 3, height: 24, borderRadius: 2, marginLeft: -1 },

  station: { flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: 6 },
  stationCurrent: { backgroundColor: C.goldDim, borderRadius: 14, padding: 12, marginHorizontal: -8, marginVertical: 2 },
  stationDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: C.border, backgroundColor: C.card, alignItems: "center", justifyContent: "center" },
  stationInfo: { flex: 1 },
  stationName: { fontSize: 16, fontWeight: "700", color: C.text },
  stationDone: { fontSize: 11, color: C.green, fontWeight: "600", marginTop: 2 },
  stationActive: { fontSize: 11, color: C.gold, fontWeight: "600", marginTop: 2 },
  stationLocked: { fontSize: 11, color: C.muted2, marginTop: 2 },
  stationPlay: { backgroundColor: C.gold, borderRadius: 12, width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  stationPlayText: { fontSize: 16, color: "#FFF", fontWeight: "800" },

  // ── Items ──
  itemsSection: { marginBottom: 20 },
  itemsRow: { flexDirection: "row", gap: 10 },
  itemCard: { width: 80, backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 12, alignItems: "center", gap: 4 },
  itemName: { fontSize: 10, fontWeight: "700", color: C.text, textAlign: "center" },
  itemCity: { fontSize: 9, color: C.muted, textAlign: "center" },

  // ── Avatar Card ──
  avatarCard: { backgroundColor: C.card, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: C.border },
  avatarRow: { flexDirection: "row", alignItems: "center" },
  avatarName: { fontSize: 18, fontWeight: "800", color: C.text },
  avatarLevel: { fontSize: 13, color: C.gold, fontWeight: "600", marginTop: 2 },
  avatarXPBar: { height: 6, backgroundColor: C.bg2, borderRadius: 3, marginTop: 8, overflow: "hidden" },
  avatarXPFill: { height: "100%", backgroundColor: C.gold, borderRadius: 3 },
});
