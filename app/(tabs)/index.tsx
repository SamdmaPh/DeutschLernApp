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

  // Derived state
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
    .find((l: any) => !done.includes(l.id));
  const cityDone = currentCity.lessonIds.filter(id => done.includes(id)).length;
  const cityTotal = currentCity.lessonIds.length;

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" />
      <View style={{ height: SAFE_TOP }} />

      {/* ── German flag strip (subtle, 3px) ── */}
      <View style={s.flagStrip}>
        <View style={[s.flagBar, { backgroundColor: "#1A1A1A" }]} />
        <View style={[s.flagBar, { backgroundColor: C.red }]} />
        <View style={[s.flagBar, { backgroundColor: C.gold }]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* ══ TOP: Avatar + Stats HUD ══ */}
        <View style={s.hud}>
          <View style={s.hudLeft}>
            {/* Avatar ring */}
            <View style={s.avatarRing}>
              <Text style={s.avatarEmoji}>{avatarEmoji}</Text>
            </View>
            <View>
              <Text style={s.hudName}>{name || "Reisender"}</Text>
              <Text style={s.hudTitle}>{avatarTitle}</Text>
            </View>
          </View>
          <View style={s.hudRight}>
            <View style={s.statPill}>
              <Text style={s.statText}>🔥 {streak}</Text>
            </View>
            <View style={[s.statPill, { backgroundColor: C.goldDim }]}>
              <Text style={[s.statText, { color: C.gold }]}>⚡ {xp}</Text>
            </View>
          </View>
        </View>

        {/* ══ CITY PATH (vertical journey) ══ */}
        <View style={s.pathSection}>
          <Text style={s.levelBadge}>
            <Text style={{ color: info?.color || C.gold }}>{currentLevel}</Text>
            <Text style={{ color: C.muted }}> · {info?.name || ""}</Text>
          </Text>

          {levelCities.map((city, i) => {
            const cDone = city.lessonIds.filter(id => done.includes(id)).length;
            const cTotal = city.lessonIds.length;
            const isComplete = cDone === cTotal;
            const isCurrent = city.id === currentCity.id;
            const isLocked = !isCurrent && !isComplete && i > levelCities.findIndex(c => c.id === currentCity.id);

            return (
              <View key={city.id}>
                {/* Connector line */}
                {i > 0 && (
                  <View style={s.connector}>
                    <View style={[s.connectorLine, isComplete || isCurrent ? { backgroundColor: C.gold } : { backgroundColor: C.border }]} />
                  </View>
                )}

                {/* City node */}
                <TouchableOpacity
                  style={[
                    s.cityNode,
                    isCurrent && s.cityNodeCurrent,
                    isComplete && s.cityNodeDone,
                    isLocked && s.cityNodeLocked,
                  ]}
                  onPress={() => {
                    if (!isLocked) {
                      const lesson = ALL_STATIC_LESSONS
                        .filter((l: any) => city.lessonIds.includes(l.id))
                        .sort((a: any, b: any) => a.order_index - b.order_index)
                        .find((l: any) => !done.includes(l.id));
                      if (lesson) router.push({ pathname: "/lesson", params: { lessonId: lesson.id } });
                    }
                  }}
                  activeOpacity={isLocked ? 1 : 0.7}
                >
                  <View style={[s.cityIcon, isCurrent && { borderColor: C.gold, borderWidth: 3 }, isComplete && { borderColor: C.green, borderWidth: 2 }]}>
                    <Text style={{ fontSize: isCurrent ? 28 : 22 }}>{city.emoji}</Text>
                    {isCurrent && <Text style={s.avatarOnCity}>{avatarEmoji}</Text>}
                  </View>
                  <View style={s.cityInfo}>
                    <Text style={[s.cityName, isLocked && { color: C.muted2 }]}>{city.name}</Text>
                    {isComplete ? (
                      <Text style={{ fontSize: 11, color: C.green, fontWeight: "600" }}>✓ Abgeschlossen</Text>
                    ) : isCurrent ? (
                      <View style={s.cityProgress}>
                        <View style={s.cityProgressTrack}>
                          <View style={[s.cityProgressFill, { width: `${(cDone / cTotal) * 100}%` }]} />
                        </View>
                        <Text style={s.cityProgressText}>{cDone}/{cTotal}</Text>
                      </View>
                    ) : (
                      <Text style={{ fontSize: 11, color: C.muted2 }}>🔒 Gesperrt</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* ══ ITEMS (collected) ══ */}
        {collectedItems.length > 0 && (
          <View style={s.itemsSection}>
            <Text style={s.sectionLabel}>DEINE ITEMS</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={s.itemsRow}>
                {collectedItems.map(item => (
                  <View key={item.id} style={s.itemCard}>
                    <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
                    <Text style={s.itemName}>{item.name}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* ══ BOTTOM CTA: Fixed "SPIELEN" button ══ */}
      {nextLesson && (
        <View style={s.ctaBar}>
          <TouchableOpacity
            style={s.ctaButton}
            onPress={() => router.push({ pathname: "/lesson", params: { lessonId: (nextLesson as any).id } })}
            activeOpacity={0.85}
          >
            <View style={s.ctaContent}>
              <View>
                <Text style={s.ctaLabel}>WEITER SPIELEN</Text>
                <Text style={s.ctaTitle}>{(nextLesson as any).title_de || (nextLesson as any).title}</Text>
              </View>
              <View style={s.ctaXP}>
                <Text style={s.ctaXPText}>+{(nextLesson as any).xp_reward || 50} XP</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  flagStrip: { flexDirection: "row", height: 3 },
  flagBar: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 120 },

  // ── HUD ──
  hud: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 16 },
  hudLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarRing: { width: 52, height: 52, borderRadius: 26, borderWidth: 2.5, borderColor: C.gold, alignItems: "center", justifyContent: "center", backgroundColor: C.card },
  avatarEmoji: { fontSize: 28 },
  hudName: { fontSize: 17, fontWeight: "800", color: C.text },
  hudTitle: { fontSize: 12, color: C.gold, fontWeight: "600", marginTop: 1 },
  hudRight: { flexDirection: "row", gap: 8 },
  statPill: { backgroundColor: C.redDim, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  statText: { fontSize: 14, fontWeight: "800", color: C.red },

  // ── Level Badge ──
  levelBadge: { fontSize: 14, fontWeight: "800", letterSpacing: 1, marginBottom: 16, marginTop: 8 },

  // ── City Path ──
  pathSection: { paddingVertical: 8 },
  connector: { alignItems: "center", height: 32 },
  connectorLine: { width: 3, height: 32, borderRadius: 2 },

  cityNode: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: C.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: C.border },
  cityNodeCurrent: { borderColor: C.gold, borderWidth: 2, backgroundColor: C.card2 },
  cityNodeDone: { borderColor: C.green, opacity: 0.8 },
  cityNodeLocked: { opacity: 0.35 },

  cityIcon: { width: 52, height: 52, borderRadius: 26, backgroundColor: C.bg2, alignItems: "center", justifyContent: "center" },
  avatarOnCity: { position: "absolute", bottom: -4, right: -4, fontSize: 16 },

  cityInfo: { flex: 1 },
  cityName: { fontSize: 17, fontWeight: "800", color: C.text },

  cityProgress: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  cityProgressTrack: { flex: 1, height: 6, backgroundColor: C.bg3, borderRadius: 3, overflow: "hidden" },
  cityProgressFill: { height: "100%", backgroundColor: C.gold, borderRadius: 3 },
  cityProgressText: { fontSize: 11, fontWeight: "700", color: C.muted },

  // ── Items ──
  itemsSection: { marginTop: 24 },
  sectionLabel: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 12 },
  itemsRow: { flexDirection: "row", gap: 10 },
  itemCard: { width: 72, backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 10, alignItems: "center", gap: 6 },
  itemName: { fontSize: 9, color: C.muted, textAlign: "center" },

  // ── CTA Button ──
  ctaBar: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: SAFE_BOTTOM + 60, paddingTop: 12, backgroundColor: C.bg },
  ctaButton: { backgroundColor: C.gold, borderRadius: 18, overflow: "hidden" },
  ctaContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 18 },
  ctaLabel: { fontSize: 10, fontWeight: "900", color: "#0D0E14", letterSpacing: 2 },
  ctaTitle: { fontSize: 17, fontWeight: "800", color: "#0D0E14", marginTop: 3 },
  ctaXP: { backgroundColor: "rgba(0,0,0,0.15)", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6 },
  ctaXPText: { fontSize: 13, fontWeight: "900", color: "#0D0E14" },
});
