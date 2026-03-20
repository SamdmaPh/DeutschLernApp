import {
  View, Text, ScrollView, StyleSheet, StatusBar,
  Animated, TouchableOpacity, Dimensions
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { Progress } from "../services/progress";
import { C, SAFE_TOP, SAFE_BOTTOM, SERIF } from "../theme";

const { width: SW } = Dimensions.get("window");

function FlagStrip() {
  return (
    <View style={{ flexDirection: "row", height: 3 }}>
      <View style={{ flex: 1, backgroundColor: C.flagBlack }} />
      <View style={{ flex: 1, backgroundColor: C.flagRed }} />
      <View style={{ flex: 1, backgroundColor: C.flagGold }} />
    </View>
  );
}

const LEVELS = [
  { name: "Anfänger",         xp: 0,    desc: "Du bist angekommen." },
  { name: "Einsteiger",       xp: 200,  desc: "Du findest dich zurecht." },
  { name: "Lernender",        xp: 500,  desc: "Deutsch beginnt, sich zu formen." },
  { name: "Fortgeschrittener",xp: 1000, desc: "Du denkst auf Deutsch." },
  { name: "Experte",          xp: 2000, desc: "Die Sprache gehört dir." },
  { name: "Meister",          xp: 5000, desc: "Du bist jemand anderes geworden." },
];

const JOURNEY = [
  { level: "A1", title: "Berlin",     desc: "Du landest. Alles ist neu.",              lessons: 25 },
  { level: "A2", title: "Hamburg",    desc: "Du findest Verbindungen.",                lessons: 25 },
  { level: "B1", title: "München",    desc: "Du verstehst die Deutschen.",             lessons: 30 },
  { level: "B2", title: "Wien",       desc: "Du diskutierst auf Augenhöhe.",           lessons: 30 },
  { level: "C1", title: "Zürich",     desc: "Du liest Kafka. Du verstehst ihn.",       lessons: 35 },
  { level: "C2", title: "Meisterschaft","desc":"Du träumst auf Deutsch.",              lessons: 30 },
];

export default function ProgressScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const ringAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Progress.getAll().then(p => {
      setProfile(p);
      Animated.parallel([
        Animated.timing(ringAnim, { toValue: 1, duration: 800, useNativeDriver: false }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start();
    });
  }, []);

  if (!profile) return <View style={{ flex: 1, backgroundColor: C.bg }} />;

  const xp     = profile.xp || 0;
  const done   = (profile.done || []).length;
  const streak = profile.streak || 0;
  const lvlIdx = LEVELS.filter(l => xp >= l.xp).length - 1;
  const curLvl = LEVELS[Math.min(lvlIdx, 5)];
  const nextLvl= LEVELS[Math.min(lvlIdx + 1, 5)];
  const xpPct  = Math.min(((xp - curLvl.xp) / (nextLvl.xp - curLvl.xp)) * 100, 100);

  // Quote based on XP
  const quotes = [
    { min: 0,    q: "Der Anfang ist das Schwerste. Du hast ihn gemacht." },
    { min: 100,  q: "Jedes deutsche Wort ist ein Schlüssel. Du sammelst sie." },
    { min: 300,  q: "Du denkst schon auf Deutsch — ohne es zu merken." },
    { min: 700,  q: "Die Deutschen haben ein Wort für alles. Du kennst viele davon." },
    { min: 1500, q: "Goethe würde dich verstehen." },
    { min: 3000, q: "Du bist kein Lernender mehr. Du bist Sprecher." },
  ];
  const quote = [...quotes].reverse().find(q => xp >= q.min)?.q || quotes[0].q;

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <StatusBar barStyle="light-content" />
      <View style={{ height: SAFE_TOP }} />
      <FlagStrip />

      <Animated.ScrollView
        style={{ flex: 1, opacity: fadeAnim }}
        contentContainerStyle={{ paddingBottom: SAFE_BOTTOM + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={12} activeOpacity={0.7}>
            <Text style={s.back}>‹</Text>
          </TouchableOpacity>
          <Text style={s.headerTitle}>Dein Weg</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Quote */}
        <View style={s.quoteCard}>
          <View style={{ width: 3, alignSelf: "stretch", borderRadius: 2, overflow: "hidden" }}>
            <View style={{ flex: 1, backgroundColor: C.flagBlack }} />
            <View style={{ flex: 1, backgroundColor: C.flagRed }} />
            <View style={{ flex: 1, backgroundColor: C.flagGold }} />
          </View>
          <Text style={s.quoteText}>"{quote}"</Text>
        </View>

        {/* Stats row */}
        <View style={s.statsRow}>
          <View style={[s.statCard, { borderColor: C.goldLine }]}>
            <Text style={s.statNum}>{xp}</Text>
            <Text style={s.statLabel}>XP</Text>
          </View>
          <View style={[s.statCard, { borderColor: C.redLine }]}>
            <Text style={s.statNum}>{streak}</Text>
            <Text style={s.statLabel}>🔥 Tage</Text>
          </View>
          <View style={[s.statCard, { borderColor: C.greenLine }]}>
            <Text style={s.statNum}>{done}</Text>
            <Text style={s.statLabel}>Lektionen</Text>
          </View>
        </View>

        {/* Level */}
        <View style={s.levelCard}>
          <Text style={s.levelTiny}>AKTUELLES LEVEL</Text>
          <Text style={s.levelName}>{curLvl.name}</Text>
          <Text style={s.levelDesc}>{curLvl.desc}</Text>
          <View style={s.levelBarTrack}>
            <Animated.View style={[s.levelBarFill, {
              width: ringAnim.interpolate({ inputRange: [0,1], outputRange: ["0%", `${xpPct}%`] })
            }]} />
          </View>
          <View style={s.levelBarLabels}>
            <Text style={s.levelBarLabel}>{xp} XP</Text>
            <Text style={s.levelBarLabel}>{nextLvl.xp} XP — {nextLvl.name}</Text>
          </View>
        </View>

        {/* Journey */}
        <Text style={s.sectionTitle}>Deine Reise</Text>
        {JOURNEY.map((stop, i) => {
          const isActive = i === Math.min(lvlIdx, JOURNEY.length - 1);
          const isDone   = i < lvlIdx;
          return (
            <View key={i} style={s.journeyRow}>
              {/* Connector */}
              <View style={s.journeyLeft}>
                <View style={[s.journeyDot,
                  isDone   && { backgroundColor: C.green, borderColor: C.green },
                  isActive && { backgroundColor: C.gold,  borderColor: C.gold, width: 14, height: 14 },
                ]} />
                {i < JOURNEY.length - 1 && (
                  <View style={[s.journeyLine, isDone && { backgroundColor: C.green }]} />
                )}
              </View>
              {/* Card */}
              <View style={[s.journeyCard,
                isActive && { borderColor: C.goldLine, backgroundColor: "rgba(212,168,67,0.04)" },
                isDone   && { opacity: 0.65 },
              ]}>
                <View style={s.journeyTop}>
                  <Text style={[s.journeyLevel,
                    isDone   && { color: C.green },
                    isActive && { color: C.gold },
                  ]}>{stop.level}</Text>
                  <Text style={s.journeyTitle}>{stop.title}</Text>
                  {isDone && <Text style={{ fontSize: 12, color: C.green }}>✓</Text>}
                </View>
                <Text style={s.journeyDesc}>{stop.desc}</Text>
                <Text style={s.journeyCount}>{stop.lessons} Lektionen</Text>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  header:         { flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                     paddingHorizontal: 20, paddingVertical: 12 },
  back:           { color: C.gold, fontSize: 28, fontWeight: "300", lineHeight: 34 },
  headerTitle:    { fontFamily: SERIF, fontSize: 18, fontWeight: "700", color: C.white, fontStyle: "italic" },

  quoteCard:      { marginHorizontal: 20, marginBottom: 16, backgroundColor: C.card,
                     borderRadius: 16, borderWidth: 1, borderColor: C.goldLine,
                     padding: 18, flexDirection: "row", gap: 14, alignItems: "center" },
  quoteText:      { fontFamily: SERIF, fontSize: 13, color: C.text, fontStyle: "italic",
                     lineHeight: 20, flex: 1 },

  statsRow:       { flexDirection: "row", marginHorizontal: 20, gap: 10, marginBottom: 14 },
  statCard:       { flex: 1, backgroundColor: C.card, borderRadius: 14, borderWidth: 1,
                     padding: 14, alignItems: "center" },
  statNum:        { fontSize: 24, fontWeight: "900", color: C.white, marginBottom: 2 },
  statLabel:      { fontSize: 10, color: C.muted, fontWeight: "600" },

  levelCard:      { marginHorizontal: 20, backgroundColor: C.card, borderRadius: 16,
                     borderWidth: 1, borderColor: C.goldLine, padding: 18, marginBottom: 24 },
  levelTiny:      { fontSize: 9, fontWeight: "800", color: C.gold, letterSpacing: 2, marginBottom: 6 },
  levelName:      { fontFamily: SERIF, fontSize: 22, fontWeight: "700", color: C.white,
                     fontStyle: "italic", marginBottom: 4 },
  levelDesc:      { fontSize: 13, color: C.muted, fontStyle: "italic", marginBottom: 14 },
  levelBarTrack:  { height: 4, backgroundColor: C.bg3, borderRadius: 2, overflow: "hidden", marginBottom: 6 },
  levelBarFill:   { height: 4, backgroundColor: C.gold, borderRadius: 2 },
  levelBarLabels: { flexDirection: "row", justifyContent: "space-between" },
  levelBarLabel:  { fontSize: 10, color: C.muted },

  sectionTitle:   { fontFamily: SERIF, fontSize: 16, fontWeight: "700", color: C.muted,
                     fontStyle: "italic", marginLeft: 20, marginBottom: 12 },

  journeyRow:     { flexDirection: "row", marginLeft: 20, marginRight: 20, marginBottom: 4 },
  journeyLeft:    { width: 28, alignItems: "center" },
  journeyDot:     { width: 10, height: 10, borderRadius: 5, borderWidth: 1.5,
                     borderColor: C.border2, backgroundColor: C.bg3, marginTop: 14 },
  journeyLine:    { width: 1.5, flex: 1, backgroundColor: C.border2, marginVertical: 4 },
  journeyCard:    { flex: 1, backgroundColor: C.card, borderRadius: 14, borderWidth: 1,
                     borderColor: C.border, padding: 14, marginBottom: 8, marginLeft: 8 },
  journeyTop:     { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  journeyLevel:   { fontSize: 10, fontWeight: "800", letterSpacing: 1.5, color: C.muted },
  journeyTitle:   { fontSize: 14, fontWeight: "700", color: C.white, flex: 1 },
  journeyDesc:    { fontSize: 12, color: C.muted, fontStyle: "italic", marginBottom: 4 },
  journeyCount:   { fontSize: 10, color: C.muted2 },
});
