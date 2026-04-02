import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { JOURNEY_CITIES, LEVEL_INFO } from "../../data/journeyData";
import { Progress } from "../../services/progress";
import { C, SAFE_TOP, SERIF } from "../../theme";

export default function JourneyScreen() {
  const router = useRouter();
  const [done, setDone] = useState<string[]>([]);

  useFocusEffect(useCallback(() => {
    Progress.getAll().then(p => setDone(p.done || []));
  }, []));

  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const completedCities = JOURNEY_CITIES.filter(c => c.lessonIds.every(id => done.includes(id))).length;
  const currentCity = JOURNEY_CITIES.find(c => !c.lessonIds.every(id => done.includes(id)));

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
        <Text style={s.title}>Deine Reise</Text>
        <Text style={s.subtitle}>{completedCities} von {JOURNEY_CITIES.length} Städten besucht</Text>
      </View>

      {/* Total progress */}
      <View style={s.totalBar}>
        <View style={s.totalTrack}>
          <View style={[s.totalFill, { width: `${(completedCities / JOURNEY_CITIES.length) * 100}%` }]} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {levels.map(level => {
          const cities = JOURNEY_CITIES.filter(c => c.level === level);
          const info = LEVEL_INFO[level];
          if (!cities.length) return null;

          return (
            <View key={level}>
              {/* Level header */}
              <View style={[s.levelHeader, { backgroundColor: info.bg }]}>
                <View style={[s.levelDot, { backgroundColor: info.color }]} />
                <Text style={[s.levelTitle, { color: info.color }]}>{level} · {info.name}</Text>
              </View>

              {/* Cities */}
              {cities.map((city, i) => {
                const cd = city.lessonIds.filter(id => done.includes(id)).length;
                const ct = city.lessonIds.length;
                const complete = cd === ct;
                const isCurrent = city.id === currentCity?.id;
                const started = cd > 0;
                const locked = !complete && !isCurrent && !started && i > 0;

                return (
                  <View key={city.id} style={s.row}>
                    {/* Rail */}
                    <View style={s.rail}>
                      {i > 0 && <View style={[s.railLine, (complete || started) && { backgroundColor: info.color }]} />}
                      <View style={[
                        s.railDot,
                        complete && { backgroundColor: info.color, borderColor: info.color },
                        isCurrent && { borderColor: info.color, borderWidth: 3 },
                        locked && { borderColor: C.bg3 },
                      ]}>
                        {complete && <Text style={{ color: "#fff", fontSize: 10, fontWeight: "900" }}>✓</Text>}
                      </View>
                      {i < cities.length - 1 && <View style={[s.railLine, complete && { backgroundColor: info.color }]} />}
                    </View>

                    {/* City card */}
                    <View style={[
                      s.cityCard,
                      isCurrent && { borderColor: info.color + "50", borderWidth: 1.5 },
                      locked && { opacity: 0.4 },
                    ]}>
                      <View style={s.cityTop}>
                        <Text style={s.cityEmoji}>{city.emoji}</Text>
                        <View style={{ flex: 1 }}>
                          <Text style={s.cityName}>{city.name}</Text>
                          {(complete || isCurrent || started) && (
                            <View style={s.cityProgress}>
                              <View style={s.cityTrack}>
                                <View style={[s.cityFill, { width: `${(cd / ct) * 100}%`, backgroundColor: info.color }]} />
                              </View>
                              <Text style={[s.cityPct, { color: info.color }]}>{cd}/{ct}</Text>
                            </View>
                          )}
                        </View>
                        {isCurrent && (
                          <TouchableOpacity
                            style={[s.goBtn, { backgroundColor: info.color }]}
                            onPress={() => router.push("/(tabs)")}
                          >
                            <Text style={s.goBtnText}>▶</Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      {/* Show history for current or complete */}
                      {(isCurrent || complete) && (
                        <Text style={s.cityHistory}>{city.history}</Text>
                      )}

                      {/* Fun fact for completed */}
                      {complete && city.funFact && (
                        <View style={s.funFact}>
                          <Text style={s.funFactText}>💡 {city.funFact}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}

        {/* End */}
        <View style={s.endCard}>
          <Text style={{ fontSize: 48 }}>🏔️</Text>
          <Text style={s.endTitle}>Zürich</Text>
          <Text style={s.endSub}>Das Ziel. Du träumst auf Deutsch.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  flagStrip: { flexDirection: "row", height: 3 },
  flag: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 14 },
  title: { fontFamily: SERIF, fontSize: 28, fontWeight: "700", color: C.text },
  subtitle: { fontSize: 13, color: C.muted, marginTop: 4 },
  totalBar: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 4 },
  totalTrack: { height: 4, backgroundColor: C.bg3, borderRadius: 2, overflow: "hidden" },
  totalFill: { height: "100%", backgroundColor: C.gold, borderRadius: 2 },
  scroll: { paddingBottom: 120 },

  levelHeader: { flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginTop: 20, marginBottom: 8, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8, gap: 8 },
  levelDot: { width: 8, height: 8, borderRadius: 4 },
  levelTitle: { fontSize: 13, fontWeight: "800", letterSpacing: 1 },

  row: { flexDirection: "row", paddingLeft: 20, paddingRight: 20 },
  rail: { width: 36, alignItems: "center" },
  railLine: { width: 2.5, flex: 1, backgroundColor: C.border, minHeight: 12 },
  railDot: { width: 22, height: 22, borderRadius: 11, backgroundColor: C.card, borderWidth: 2, borderColor: C.border, alignItems: "center", justifyContent: "center", zIndex: 1 },

  cityCard: { flex: 1, backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 16, marginBottom: 8, marginLeft: 8 },
  cityTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  cityEmoji: { fontSize: 28 },
  cityName: { fontSize: 16, fontWeight: "700", color: C.text },
  cityProgress: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6 },
  cityTrack: { flex: 1, height: 4, backgroundColor: C.bg2, borderRadius: 2, overflow: "hidden" },
  cityFill: { height: "100%", borderRadius: 2 },
  cityPct: { fontSize: 12, fontWeight: "700" },
  cityHistory: { fontSize: 13, color: C.muted, lineHeight: 19, marginTop: 10 },
  goBtn: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  goBtnText: { color: "#fff", fontSize: 16 },

  funFact: { backgroundColor: C.goldDim, borderRadius: 10, padding: 12, marginTop: 10 },
  funFactText: { fontSize: 12, color: C.gold, lineHeight: 18 },

  endCard: { alignItems: "center", paddingVertical: 40 },
  endTitle: { fontFamily: SERIF, fontSize: 22, fontWeight: "700", color: C.text, marginTop: 8 },
  endSub: { fontSize: 14, color: C.muted, fontStyle: "italic", marginTop: 4 },
});
