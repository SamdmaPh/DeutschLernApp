import { useState, useCallback } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  StatusBar, Dimensions, Platform,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Progress } from "../../services/progress";
import { ALL_STATIC_LESSONS } from "../../data/lessonData";
import { JOURNEY_CITIES, LEVEL_INFO } from "../../data/journeyData";
import { C, SAFE_TOP, SERIF } from "../../theme";

const { width: SW } = Dimensions.get("window");
const BOARD_W = Math.min(SW - 32, 500);

// City positions on the board (percentage x, y)
const CITY_POS: Record<string, { x: number; y: number }> = {
  berlin: { x: 50, y: 8 }, hamburg: { x: 25, y: 18 }, dresden: { x: 75, y: 28 },
  leipzig: { x: 35, y: 38 }, koeln: { x: 20, y: 48 }, frankfurt: { x: 55, y: 52 },
  duesseldorf: { x: 80, y: 45 }, stuttgart: { x: 35, y: 62 }, muenchen: { x: 65, y: 70 },
  nuernberg: { x: 50, y: 58 }, heidelberg: { x: 25, y: 72 }, freiburg: { x: 15, y: 82 },
  bremen: { x: 40, y: 15 }, hannover: { x: 55, y: 22 }, weimar: { x: 70, y: 35 },
  potsdam: { x: 65, y: 12 }, luebeck: { x: 45, y: 8 }, bamberg: { x: 60, y: 55 },
  rothenburg: { x: 45, y: 65 }, wien: { x: 80, y: 80 }, zuerich: { x: 35, y: 90 },
};

const CHARACTER_LEVELS = [
  { emoji: "🎒", label: "Tourist" },
  { emoji: "🧳", label: "Traveler" },
  { emoji: "🚲", label: "Local" },
  { emoji: "📰", label: "Pro" },
  { emoji: "🎩", label: "Master" },
];

export default function HomeScreen() {
  const router = useRouter();
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useFocusEffect(useCallback(() => {
    Progress.getAll().then(p => {
      setXp(p.xp); setStreak(p.streak); setDone(p.done); setName(p.name);
    });
  }, []));

  // Current city & character level
  const currentCity = JOURNEY_CITIES.find(c => !c.lessonIds.every(id => done.includes(id))) || JOURNEY_CITIES[0];
  const charLevel = Math.min(Math.floor(done.length / 5), CHARACTER_LEVELS.length - 1);
  const character = CHARACTER_LEVELS[charLevel];

  // Get current level cities for the board
  const currentLevel = currentCity.level;
  const levelCities = JOURNEY_CITIES.filter(c => c.level === currentLevel);
  const info = LEVEL_INFO[currentLevel];

  const getCityState = (city: typeof JOURNEY_CITIES[0]) => {
    const d = city.lessonIds.filter(id => done.includes(id)).length;
    const t = city.lessonIds.length;
    return { done: d, total: t, complete: d === t, current: city.id === currentCity.id, started: d > 0 };
  };

  const selected = selectedCity ? JOURNEY_CITIES.find(c => c.id === selectedCity) : null;

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: SAFE_TOP }} />

      {/* Top bar */}
      <View style={s.topBar}>
        <View style={s.charBadge}>
          <Text style={s.charEmoji}>{character.emoji}</Text>
          <Text style={s.charLabel}>{name || "Traveler"}</Text>
        </View>
        <View style={s.statsRow}>
          <View style={s.statPill}>
            <Text style={s.statText}>🔥 {streak}</Text>
          </View>
          <View style={[s.statPill, { backgroundColor: C.goldDim }]}>
            <Text style={[s.statText, { color: C.gold }]}>⚡ {xp}</Text>
          </View>
        </View>
        <TouchableOpacity style={s.gearBtn} onPress={() => router.push("/settings")}>
          <Text style={{ fontSize: 16 }}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Level title */}
      <View style={s.levelBar}>
        <View style={[s.levelDot, { backgroundColor: info?.color }]} />
        <Text style={s.levelTitle}>{currentLevel}: </Text>
        <Text style={s.levelName}>{info?.name}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* ═══ THE GAME BOARD ═══ */}
        <View style={[s.board, { width: BOARD_W, height: BOARD_W * 0.7 }]}>

          {/* Path lines between cities */}
          {levelCities.map((city, i) => {
            if (i === 0) return null;
            const prev = levelCities[i - 1];
            const p1 = CITY_POS[prev.id] || { x: 50, y: 50 };
            const p2 = CITY_POS[city.id] || { x: 50, y: 50 };
            const prevState = getCityState(prev);
            const isGold = prevState.complete;

            // Calculate line position & rotation
            const x1 = (p1.x / 100) * BOARD_W;
            const y1 = (p1.y / 100) * (BOARD_W * 0.7);
            const x2 = (p2.x / 100) * BOARD_W;
            const y2 = (p2.y / 100) * (BOARD_W * 0.7);
            const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

            return (
              <View
                key={`line-${i}`}
                style={{
                  position: "absolute",
                  left: x1,
                  top: y1,
                  width: len,
                  height: 3,
                  backgroundColor: isGold ? info?.color : C.border,
                  borderRadius: 2,
                  transform: [{ rotate: `${angle}deg` }],
                  transformOrigin: "left center",
                  opacity: isGold ? 0.8 : 0.4,
                }}
              />
            );
          })}

          {/* City nodes */}
          {levelCities.map(city => {
            const pos = CITY_POS[city.id] || { x: 50, y: 50 };
            const state = getCityState(city);
            const isSelected = selectedCity === city.id;

            const left = (pos.x / 100) * BOARD_W - 22;
            const top = (pos.y / 100) * (BOARD_W * 0.7) - 22;

            return (
              <TouchableOpacity
                key={city.id}
                style={[
                  s.cityNode,
                  { left, top },
                  state.complete && { backgroundColor: info?.color, borderColor: info?.color },
                  state.current && { borderColor: info?.color, borderWidth: 3, backgroundColor: C.card },
                  !state.started && !state.current && { opacity: 0.4 },
                  isSelected && { transform: [{ scale: 1.15 }] },
                ]}
                onPress={() => setSelectedCity(city.id === selectedCity ? null : city.id)}
                activeOpacity={0.7}
              >
                <Text style={s.cityNodeEmoji}>{city.emoji}</Text>
                {/* Character on current city */}
                {state.current && (
                  <View style={s.characterOnBoard}>
                    <Text style={{ fontSize: 18 }}>{character.emoji}</Text>
                  </View>
                )}
                {state.complete && (
                  <View style={s.starBadge}>
                    <Text style={{ fontSize: 10, color: "#fff" }}>⭐</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {/* City labels */}
          {levelCities.map(city => {
            const pos = CITY_POS[city.id] || { x: 50, y: 50 };
            const left = (pos.x / 100) * BOARD_W - 30;
            const top = (pos.y / 100) * (BOARD_W * 0.7) + 24;
            const state = getCityState(city);
            return (
              <Text key={`label-${city.id}`} style={[
                s.cityLabel,
                { left, top },
                state.current && { color: info?.color, fontWeight: "800" },
                !state.started && !state.current && { opacity: 0.4 },
              ]}>
                {city.name}
              </Text>
            );
          })}
        </View>

        {/* ═══ SELECTED CITY / MISSIONS ═══ */}
        {selected ? (
          <View style={s.missionCard}>
            <View style={s.missionHeader}>
              <Text style={s.missionEmoji}>{selected.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.missionCity}>{selected.name}</Text>
                <Text style={s.missionDesc}>{selected.history}</Text>
              </View>
            </View>

            {/* Missions (lessons) */}
            <Text style={s.missionsTitle}>MISSIONS</Text>
            {ALL_STATIC_LESSONS
              .filter(l => selected.lessonIds.includes(l.id))
              .sort((a, b) => a.order_index - b.order_index)
              .map((lesson, i) => {
                const isDone = done.includes(lesson.id);
                const isNext = !isDone && (i === 0 || done.includes(selected.lessonIds[i - 1]));
                const isLocked = !isDone && !isNext;

                return (
                  <TouchableOpacity
                    key={lesson.id}
                    style={[
                      s.missionRow,
                      isDone && { borderLeftColor: info?.color, borderLeftWidth: 3 },
                      isNext && { borderColor: info?.color, borderWidth: 1.5 },
                      isLocked && { opacity: 0.4 },
                    ]}
                    onPress={() => {
                      if (!isLocked) router.push({ pathname: "/lesson", params: { lessonId: lesson.id } });
                    }}
                    activeOpacity={isLocked ? 1 : 0.7}
                  >
                    <View style={[s.missionNum, isDone && { backgroundColor: info?.color }]}>
                      {isDone ? (
                        <Text style={{ color: "#fff", fontSize: 12, fontWeight: "900" }}>⭐</Text>
                      ) : isLocked ? (
                        <Text style={{ fontSize: 12 }}>🔒</Text>
                      ) : (
                        <Text style={[s.missionNumText, isNext && { color: info?.color }]}>{i + 1}</Text>
                      )}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={s.missionName}>{lesson.title}</Text>
                      <Text style={s.missionMeta}>{lesson.duration} min · +{lesson.xp_reward} XP</Text>
                    </View>
                    {isNext && (
                      <View style={[s.playBtn, { backgroundColor: info?.color }]}>
                        <Text style={s.playBtnText}>▶</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}

            {/* Fun fact for completed cities */}
            {getCityState(selected).complete && selected.funFact && (
              <View style={s.funFact}>
                <Text style={s.funFactText}>💡 {selected.funFact}</Text>
              </View>
            )}

            <TouchableOpacity style={s.closeBtn} onPress={() => setSelectedCity(null)}>
              <Text style={s.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Quick play card when no city selected */
          <TouchableOpacity
            style={[s.quickPlay, { borderColor: info?.color + "50" }]}
            onPress={() => {
              const next = ALL_STATIC_LESSONS
                .filter(l => currentCity.lessonIds.includes(l.id))
                .sort((a, b) => a.order_index - b.order_index)
                .find(l => !done.includes(l.id));
              if (next) router.push({ pathname: "/lesson", params: { lessonId: next.id } });
            }}
            activeOpacity={0.85}
          >
            <View style={{ flex: 1 }}>
              <Text style={s.quickLabel}>NEXT MISSION</Text>
              <Text style={s.quickCity}>{currentCity.emoji} {currentCity.name}</Text>
              <Text style={s.quickMission}>
                {ALL_STATIC_LESSONS
                  .filter(l => currentCity.lessonIds.includes(l.id))
                  .sort((a, b) => a.order_index - b.order_index)
                  .find(l => !done.includes(l.id))?.title || "All missions complete!"}
              </Text>
            </View>
            <View style={[s.quickPlayBtn, { backgroundColor: info?.color }]}>
              <Text style={s.quickPlayBtnText}>▶</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Tap hint */}
        {!selected && (
          <Text style={s.tapHint}>Tap a city on the board to see missions</Text>
        )}

        {/* Live Conversation */}
        {currentCity && (
          <TouchableOpacity style={s.liveCard} onPress={() => {
            const nextLesson = ALL_STATIC_LESSONS
              .filter(l => currentCity.lessonIds.includes(l.id))
              .sort((a, b) => a.order_index - b.order_index)
              .find(l => !done.includes(l.id));
            if (nextLesson) router.push({ pathname: "/live-lesson", params: { lessonId: nextLesson.id } });
          }} activeOpacity={0.8}>
            <Text style={{ fontSize: 24 }}>🎙</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.liveTitle}>Live Conversation</Text>
              <Text style={s.liveSub}>Talk to a real character in German!</Text>
            </View>
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>→</Text>
          </TouchableOpacity>
        )}

        {/* Daily Review */}
        <TouchableOpacity style={s.reviewCard} onPress={() => router.push("/review")} activeOpacity={0.8}>
          <Text style={{ fontSize: 24 }}>🧠</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.reviewTitle}>Daily Review</Text>
            <Text style={s.reviewSub}>{done.length > 0 ? "Practice your vocabulary" : "Complete a lesson first"}</Text>
          </View>
          <Text style={{ color: C.gold, fontSize: 16, fontWeight: "700" }}>→</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingBottom: 100, alignItems: "center" },

  // Top bar
  topBar: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 10, gap: 10 },
  charBadge: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: C.card, borderRadius: 20, borderWidth: 1, borderColor: C.border, paddingHorizontal: 12, paddingVertical: 6 },
  charEmoji: { fontSize: 20 },
  charLabel: { fontSize: 13, fontWeight: "700", color: C.text },
  statsRow: { flex: 1, flexDirection: "row", justifyContent: "flex-end", gap: 6 },
  statPill: { backgroundColor: C.bg2, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 },
  statText: { fontSize: 13, fontWeight: "800", color: C.text },
  gearBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.bg2, alignItems: "center", justifyContent: "center" },

  // Level bar
  levelBar: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 8, gap: 6 },
  levelDot: { width: 8, height: 8, borderRadius: 4 },
  levelTitle: { fontSize: 14, fontWeight: "900", color: C.text },
  levelName: { fontSize: 14, fontWeight: "600", color: C.muted },

  // Board
  board: { backgroundColor: C.card, borderRadius: 24, borderWidth: 1, borderColor: C.border, marginHorizontal: 16, marginTop: 8, position: "relative", overflow: "hidden" },

  // City nodes
  cityNode: { position: "absolute", width: 44, height: 44, borderRadius: 22, backgroundColor: C.bg2, borderWidth: 2, borderColor: C.border, alignItems: "center", justifyContent: "center", zIndex: 2 },
  cityNodeEmoji: { fontSize: 20 },
  characterOnBoard: { position: "absolute", top: -16, right: -8, backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.goldLine, width: 24, height: 24, alignItems: "center", justifyContent: "center" },
  starBadge: { position: "absolute", top: -6, right: -6, backgroundColor: C.gold, borderRadius: 10, width: 20, height: 20, alignItems: "center", justifyContent: "center" },
  cityLabel: { position: "absolute", fontSize: 10, fontWeight: "600", color: C.muted, textAlign: "center", width: 60 },

  // Mission card
  missionCard: { marginHorizontal: 16, marginTop: 16, backgroundColor: C.card, borderRadius: 20, borderWidth: 1, borderColor: C.border, padding: 20 },
  missionHeader: { flexDirection: "row", gap: 14, marginBottom: 16 },
  missionEmoji: { fontSize: 40 },
  missionCity: { fontFamily: SERIF, fontSize: 22, fontWeight: "700", color: C.text },
  missionDesc: { fontSize: 13, color: C.muted, lineHeight: 18, marginTop: 4 },
  missionsTitle: { fontSize: 10, fontWeight: "900", color: C.muted, letterSpacing: 2, marginBottom: 12 },

  missionRow: { flexDirection: "row", alignItems: "center", backgroundColor: C.bg, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 8, gap: 12 },
  missionNum: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.bg2, alignItems: "center", justifyContent: "center" },
  missionNumText: { fontSize: 14, fontWeight: "800", color: C.muted },
  missionName: { fontSize: 14, fontWeight: "700", color: C.text },
  missionMeta: { fontSize: 11, color: C.muted, marginTop: 2 },
  playBtn: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  playBtnText: { color: "#fff", fontSize: 16 },

  funFact: { backgroundColor: C.goldDim, borderRadius: 12, padding: 14, marginTop: 8 },
  funFactText: { fontSize: 13, color: C.gold, lineHeight: 19 },
  closeBtn: { marginTop: 12, alignItems: "center" },
  closeBtnText: { fontSize: 14, color: C.muted, fontWeight: "600" },

  // Quick play
  quickPlay: { flexDirection: "row", alignItems: "center", marginHorizontal: 16, marginTop: 16, backgroundColor: C.card, borderRadius: 18, borderWidth: 1, padding: 18, gap: 14 },
  quickLabel: { fontSize: 9, fontWeight: "900", color: C.muted, letterSpacing: 2 },
  quickCity: { fontSize: 16, fontWeight: "700", color: C.text, marginTop: 4 },
  quickMission: { fontSize: 13, color: C.muted, marginTop: 2 },
  quickPlayBtn: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center" },
  quickPlayBtnText: { color: "#fff", fontSize: 22 },

  tapHint: { fontSize: 12, color: C.muted, textAlign: "center", marginTop: 16, fontStyle: "italic" },

  // Live conversation
  liveCard: { flexDirection: "row", alignItems: "center", gap: 14, marginHorizontal: 16, marginTop: 16, backgroundColor: C.gold, borderRadius: 16, padding: 16 },
  liveTitle: { fontSize: 15, fontWeight: "700", color: "#fff" },
  liveSub: { fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 },

  // Review
  reviewCard: { flexDirection: "row", alignItems: "center", gap: 14, marginHorizontal: 16, marginTop: 16, backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.goldLine, padding: 16 },
  reviewTitle: { fontSize: 15, fontWeight: "700", color: C.text },
  reviewSub: { fontSize: 12, color: C.muted, marginTop: 2 },
});
