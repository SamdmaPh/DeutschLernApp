import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, StatusBar, Platform, Dimensions, Animated
} from "react-native";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: W, height: H } = Dimensions.get("window");
const SAFE_TOP = Platform.OS === "ios" ? 54 : 30;

const C = {
  navy:       "#070B18", navy2: "#0A1020", navy3: "#0F1628",
  border:     "#1E2D45",
  gold:       "#C9A84C", goldBg: "rgba(201,168,76,0.10)", goldBorder: "rgba(201,168,76,0.25)",
  red:        "#CC0000", redBg: "rgba(204,0,0,0.10)",
  black:      "#111111", white: "#FFFFFF", text: "#E2E8F0", muted: "#64748B",
};

const SLIDES = [
  {
    emoji: "🇩🇪",
    title: "Wundervoll",
    subtitle: "German, made wonderful",
    body: "Learn to actually speak German — not just tap colourful circles. Real sentences. Real conversations. Real progress.",
    accent: C.gold,
  },
  {
    emoji: "💬",
    title: "Speak from day one",
    subtitle: "No more Duolingo streaks with nothing to show",
    body: "Every lesson is built around real phrases you'll use immediately. Grammar explained like a human, not a textbook.",
    accent: C.red,
  },
  {
    emoji: "🧠",
    title: "Science-backed learning",
    subtitle: "Your brain, optimised",
    body: "Flashcards, spaced repetition, quizzes and mnemonics — all combined into one smooth flow that actually sticks.",
    accent: C.gold,
  },
  {
    emoji: "✨",
    title: "Discover the beauty",
    subtitle: "German is wundervoll",
    body: "Fernweh. Weltschmerz. Zweisamkeit. Words that capture feelings no other language can. You'll fall in love with German.",
    accent: "#8B5CF6",
  },
];

const GOALS = [
  { id: "travel",   emoji: "✈️",  label: "Reisen",        sub: "Für den nächsten Urlaub" },
  { id: "work",     emoji: "💼",  label: "Arbeit",         sub: "Beruflich weiterkommen" },
  { id: "family",   emoji: "👨‍👩‍👧",  label: "Familie",        sub: "Mit Verwandten sprechen" },
  { id: "culture",  emoji: "🎭",  label: "Kultur",         sub: "Filme, Bücher, Musik" },
  { id: "love",     emoji: "❤️",  label: "Liebe",          sub: "Jemanden beeindrucken" },
  { id: "brain",    emoji: "🧠",  label: "Gehirntraining", sub: "Geistig fit bleiben" },
];

const LEVELS = [
  { id: "beginner",      label: "Anfänger",     sub: "Ich kenne kaum ein Wort Deutsch",     emoji: "🌱" },
  { id: "some",          label: "Ein bisschen", sub: "Ich kenne einige Wörter & Sätze",     emoji: "🌿" },
  { id: "intermediate",  label: "Grundlagen",   sub: "Ich kann einfache Gespräche führen",  emoji: "🌳" },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [slide, setSlide] = useState(0); // 0-3 = intro slides, 4 = goal, 5 = level
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const TOTAL = SLIDES.length + 2; // 4 slides + goal + level

  function goNext() {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    setTimeout(() => setSlide(s => s + 1), 150);
  }

  async function finish() {
    await AsyncStorage.setItem("wv_onboarded", "true");
    await AsyncStorage.setItem("wv_goal", selectedGoal || "travel");
    await AsyncStorage.setItem("wv_level", selectedLevel || "beginner");
    router.replace("/lessons");
  }

  const currentSlide = slide < SLIDES.length ? SLIDES[slide] : null;
  const isGoalSlide = slide === SLIDES.length;
  const isLevelSlide = slide === SLIDES.length + 1;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{ height: SAFE_TOP }} />

      {/* Flag bar */}
      <View style={{ flexDirection: "row", height: 3 }}>
        <View style={{ flex: 1, backgroundColor: C.black }} />
        <View style={{ flex: 1, backgroundColor: C.red }} />
        <View style={{ flex: 1, backgroundColor: C.gold }} />
      </View>

      {/* Progress dots */}
      <View style={styles.dotsRow}>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <View key={i} style={[
            styles.dot,
            i === slide && styles.dotActive,
            i < slide && styles.dotDone,
          ]} />
        ))}
      </View>

      <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>

        {/* ─── INTRO SLIDES ─── */}
        {currentSlide && (
          <View style={styles.slideContainer}>
            {/* Big emoji */}
            <View style={[styles.emojiCircle, { borderColor: currentSlide.accent + "44", backgroundColor: currentSlide.accent + "12" }]}>
              <Text style={styles.emojiText}>{currentSlide.emoji}</Text>
            </View>

            {/* Logo on first slide */}
            {slide === 0 && (
              <View style={styles.logoRow}>
                <Text style={styles.logoW}>WUNDER</Text>
                <Text style={styles.logoVO}>VO</Text>
                <Text style={styles.logoLL}>LL</Text>
              </View>
            )}

            <Text style={[styles.slideTitle, slide !== 0 && { marginTop: 24 }]}>
              {currentSlide.title}
            </Text>
            <Text style={[styles.slideSubtitle, { color: currentSlide.accent }]}>
              {currentSlide.subtitle}
            </Text>
            <Text style={styles.slideBody}>{currentSlide.body}</Text>

            {/* Features on first slide */}
            {slide === 0 && (
              <View style={styles.featureList}>
                {[
                  { icon: "📚", text: "53 strukturierte Lektionen" },
                  { icon: "🤖", text: "KI-Gespräch mit Korrektur" },
                  { icon: "🏆", text: "Quiz & XP-System" },
                  { icon: "✨", text: "Wort des Tages" },
                ].map((f, i) => (
                  <View key={i} style={styles.featureRow}>
                    <Text style={styles.featureIcon}>{f.icon}</Text>
                    <Text style={styles.featureText}>{f.text}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* ─── GOAL SLIDE ─── */}
        {isGoalSlide && (
          <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.selectionContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.selectionTitle}>Warum lernst du Deutsch?</Text>
            <Text style={styles.selectionSub}>Wähle dein Hauptziel — wir passen deine Erfahrung an</Text>
            <View style={styles.goalsGrid}>
              {GOALS.map(g => (
                <TouchableOpacity
                  key={g.id}
                  style={[styles.goalCard, selectedGoal === g.id && styles.goalCardActive]}
                  onPress={() => setSelectedGoal(g.id)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.goalEmoji}>{g.emoji}</Text>
                  <Text style={[styles.goalLabel, selectedGoal === g.id && { color: C.gold }]}>{g.label}</Text>
                  <Text style={styles.goalSub}>{g.sub}</Text>
                  {selectedGoal === g.id && (
                    <View style={styles.selectedCheck}>
                      <Text style={{ color: C.navy, fontSize: 12, fontWeight: "800" }}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {/* ─── LEVEL SLIDE ─── */}
        {isLevelSlide && (
          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>Wie viel Deutsch kennst du?</Text>
            <Text style={styles.selectionSub}>Ehrlich antworten — wir starten genau dort wo du bist</Text>
            <View style={styles.levelsCol}>
              {LEVELS.map(l => (
                <TouchableOpacity
                  key={l.id}
                  style={[styles.levelCard, selectedLevel === l.id && styles.levelCardActive]}
                  onPress={() => setSelectedLevel(l.id)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.levelEmoji}>{l.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.levelLabel, selectedLevel === l.id && { color: C.gold }]}>{l.label}</Text>
                    <Text style={styles.levelSub}>{l.sub}</Text>
                  </View>
                  {selectedLevel === l.id && (
                    <View style={styles.selectedCheck}>
                      <Text style={{ color: C.navy, fontSize: 12, fontWeight: "800" }}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

      </Animated.View>

      {/* Bottom buttons */}
      <View style={styles.footer}>
        {slide > 0 && (
          <TouchableOpacity style={styles.backBtn} onPress={() => setSlide(s => s - 1)}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
        )}

        {!isLevelSlide ? (
          <TouchableOpacity
            style={[
              styles.nextBtn,
              isGoalSlide && !selectedGoal && styles.nextBtnDisabled,
            ]}
            onPress={goNext}
            disabled={isGoalSlide && !selectedGoal}
            activeOpacity={0.85}
          >
            <Text style={styles.nextText}>
              {slide === SLIDES.length - 1 ? "Fast fertig →" : "Weiter →"}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.nextBtn, styles.nextBtnFinish, !selectedLevel && styles.nextBtnDisabled]}
            onPress={finish}
            disabled={!selectedLevel}
            activeOpacity={0.85}
          >
            <Text style={[styles.nextText, { color: C.navy }]}>
              🚀 Los geht's!
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Skip — only on intro slides */}
      {slide < SLIDES.length && (
        <TouchableOpacity style={styles.skipBtn} onPress={async () => {
          await AsyncStorage.setItem("wv_onboarded", "true");
          router.replace("/lessons");
        }}>
          <Text style={styles.skipText}>Überspringen</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:          { flex: 1, backgroundColor: C.navy },

  dotsRow:            { flexDirection: "row", justifyContent: "center", gap: 6, paddingVertical: 16 },
  dot:                { width: 6, height: 6, borderRadius: 3, backgroundColor: C.navy3 },
  dotActive:          { width: 20, backgroundColor: C.gold, borderRadius: 3 },
  dotDone:            { backgroundColor: C.gold, opacity: 0.4 },

  // Intro slides
  slideContainer:     { flex: 1, paddingHorizontal: 28, alignItems: "center", paddingTop: 20 },
  emojiCircle:        { width: 100, height: 100, borderRadius: 50, borderWidth: 1, alignItems: "center", justifyContent: "center", marginBottom: 20 },
  emojiText:          { fontSize: 52 },
  logoRow:            { flexDirection: "row", alignItems: "baseline", marginBottom: 8 },
  logoW:              { fontSize: 32, fontWeight: "900", color: "#444", letterSpacing: -1 },
  logoVO:             { fontSize: 32, fontWeight: "900", color: C.red, letterSpacing: -1 },
  logoLL:             { fontSize: 32, fontWeight: "900", color: C.gold, letterSpacing: -1 },
  slideTitle:         { fontSize: 28, fontWeight: "900", color: C.white, textAlign: "center", letterSpacing: -0.5 },
  slideSubtitle:      { fontSize: 14, fontWeight: "600", textAlign: "center", marginTop: 8, marginBottom: 16, letterSpacing: 0.5 },
  slideBody:          { fontSize: 16, color: C.text, textAlign: "center", lineHeight: 26, maxWidth: 320 },
  featureList:        { marginTop: 28, gap: 12, width: "100%" },
  featureRow:         { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: C.navy2, borderRadius: 12, borderWidth: 1, borderColor: C.border, paddingHorizontal: 16, paddingVertical: 12 },
  featureIcon:        { fontSize: 22 },
  featureText:        { color: C.text, fontSize: 15, fontWeight: "500" },

  // Goal / level selection
  selectionContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  selectionTitle:     { fontSize: 26, fontWeight: "900", color: C.white, letterSpacing: -0.5, marginBottom: 8 },
  selectionSub:       { fontSize: 14, color: C.muted, lineHeight: 20, marginBottom: 20 },

  goalsGrid:          { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  goalCard:           { width: (W - 50) / 2, backgroundColor: C.navy2, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 16, gap: 4 },
  goalCardActive:     { borderColor: C.goldBorder, backgroundColor: C.goldBg },
  goalEmoji:          { fontSize: 28, marginBottom: 4 },
  goalLabel:          { color: C.white, fontSize: 16, fontWeight: "800" },
  goalSub:            { color: C.muted, fontSize: 12, lineHeight: 16 },

  levelsCol:          { gap: 12 },
  levelCard:          { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: C.navy2, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 18 },
  levelCardActive:    { borderColor: C.goldBorder, backgroundColor: C.goldBg },
  levelEmoji:         { fontSize: 28 },
  levelLabel:         { color: C.white, fontSize: 17, fontWeight: "800" },
  levelSub:           { color: C.muted, fontSize: 13, marginTop: 2 },

  selectedCheck:      { width: 24, height: 24, borderRadius: 12, backgroundColor: C.gold, alignItems: "center", justifyContent: "center" },

  // Footer
  footer:             { flexDirection: "row", gap: 10, paddingHorizontal: 20, paddingTop: 12, paddingBottom: Platform.OS === "ios" ? 48 : 24 },
  backBtn:            { width: 52, height: 56, borderRadius: 16, backgroundColor: C.navy3, borderWidth: 1, borderColor: C.border, alignItems: "center", justifyContent: "center" },
  backText:           { color: C.muted, fontSize: 24 },
  nextBtn:            { flex: 1, height: 56, borderRadius: 16, backgroundColor: C.goldBg, borderWidth: 1, borderColor: C.goldBorder, alignItems: "center", justifyContent: "center" },
  nextBtnFinish:      { backgroundColor: C.gold, borderColor: C.gold },
  nextBtnDisabled:    { opacity: 0.4 },
  nextText:           { color: C.gold, fontSize: 17, fontWeight: "800" },

  skipBtn:            { alignItems: "center", paddingBottom: 8 },
  skipText:           { color: C.muted, fontSize: 13 },
});
