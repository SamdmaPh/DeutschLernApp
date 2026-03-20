import React, { useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, Animated } from "react-native";
import { router } from "expo-router";

const C = { navy: "#070B18", navy2: "#0D1425", gold: "#C9A84C", goldBg: "rgba(201,168,76,0.10)", white: "#FFFFFF", text: "#D4E4F4", muted: "#4A6480", green: "#22C55E", red: "#CC0000" };

const PLACEMENT_Q = [
  { q: "How do you say Hello?", opts: ["Auf Wiedersehen", "Hallo", "Gute Nacht"], ans: 1 },
  { q: "My name is Anna:", opts: ["Ich heiße Anna", "Du heißt Anna", "Er heißt Anna"], ans: 0 },
  { q: "I am:", opts: ["Ich bin", "Ich bist", "Ich sein"], ans: 0 },
  { q: "You have:", opts: ["Du haben", "Du hast", "Du habe"], ans: 1 },
  { q: "He speaks:", opts: ["Er spreche", "Er spricht", "Er sprechen"], ans: 1 },
  { q: "I see the man:", opts: ["Ich sehe der Mann", "Ich sehe den Mann", "Ich sehe das Mann"], ans: 1 },
  { q: "Plural of Mann:", opts: ["die Mann", "die Männer", "der Männer"], ans: 1 },
  { q: "Where do you live?", opts: ["Wo wohnst du?", "Was wohnst du?", "Wann wohnst du?"], ans: 0 },
  { q: "Sister:", opts: ["Bruder", "Schwester", "Mutter"], ans: 1 },
  { q: "Mother:", opts: ["Mutter", "Vater", "Großmutter"], ans: 0 },
  { q: "I like music:", opts: ["Ich liebe Musik", "Ich mag Musik", "Ich spiele Musik"], ans: 1 },
  { q: "I can:", opts: ["Ich kann", "Ich kunne", "Ich könne"], ans: 0 },
  { q: "What is 21?", opts: ["zwanzig", "einundzwanzig", "zweiundzwanzig"], ans: 1 },
  { q: "I work as teacher:", opts: ["Ich arbeite als Lehrer", "Ich arbeite für Lehrer", "Ich arbeite Lehrer"], ans: 0 },
  { q: "Age question:", opts: ["Wie alt bist du?", "Wie Alter bist du?", "Wie Jahre bist du?"], ans: 0 },
  { q: "The woman:", opts: ["die Frau", "den Frau", "der Frau"], ans: 0 },
  { q: "Must:", opts: ["mögen", "können", "müssen"], ans: 2 },
  { q: "Good afternoon:", opts: ["Guten Tag", "Hallo", "Wie geht s?"], ans: 0 },
  { q: "He plays:", opts: ["Er spielet", "Er spielt", "Er spielen"], ans: 1 },
  { q: "Beautiful:", opts: ["ugly", "beautiful", "small"], ans: 1 }
];

function getLevel(s) { if (s >= 80) return "C1"; if (s >= 60) return "B2"; if (s >= 40) return "B1"; if (s >= 20) return "A2"; return "A1"; }

export default function HomeScreen() {
  const [level, setLevel] = useState("A1");
  const [testVisible, setTestVisible] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [score, setScore] = useState(0);
  const [testDone, setTestDone] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleAnswer = (oi) => {
    if (answered[qIdx] !== undefined) return;
    const newAnswered = [...answered];
    newAnswered[qIdx] = oi;
    setAnswered(newAnswered);
    if (oi === PLACEMENT_Q[qIdx].ans) setScore(score + 5);
    setTimeout(() => {
      if (qIdx < PLACEMENT_Q.length - 1) {
        Animated.sequence([
          Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
          Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]).start();
        setTimeout(() => setQIdx(qIdx + 1), 150);
      } else {
        finishTest();
      }
    }, 800);
  };

  const finishTest = () => {
    const finalScore = Math.min(100, score + 5);
    const lv = getLevel(finalScore);
    setLevel(lv);
    setTestDone(true);
  };

  const resetTest = () => { setQIdx(0); setAnswered([]); setScore(0); setTestDone(false); };

  if (testVisible && testDone) {
    const labels = { A1: "🌱 A1", A2: "🏠 A2", B1: "💭 B1", B2: "💬 B2", C1: "✨ C1" };
    return (
      <Modal visible={testVisible} transparent animationType="fade">
        <View style={[S.container, { justifyContent: "flex-end" }]}>
          <View style={{ backgroundColor: C.navy, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 }}>
            <Text style={{ fontSize: 24, fontWeight: "900", color: C.white, textAlign: "center", marginBottom: 20 }}>Result</Text>
            <View style={{ backgroundColor: C.goldBg, borderRadius: 20, padding: 32, alignItems: "center", marginBottom: 20 }}>
              <Text style={{ fontSize: 64 }}>⭐</Text>
              <Text style={{ color: C.white, fontSize: 28, fontWeight: "900", marginTop: 10 }}>{labels[level]}</Text>
              <Text style={{ color: C.gold, fontSize: 40, fontWeight: "900", marginTop: 10 }}>{Math.min(100, score + 5)}/100</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: C.gold, borderRadius: 14, padding: 16, alignItems: "center" }} onPress={() => { setTestVisible(false); resetTest(); }}>
              <Text style={{ color: "#070B18", fontSize: 16, fontWeight: "900" }}>✓ Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  if (testVisible && !testDone) {
    const q = PLACEMENT_Q[qIdx];
    const isAnswered = answered[qIdx] !== undefined;
    const progress = ((qIdx + (isAnswered ? 1 : 0)) / PLACEMENT_Q.length) * 100;

    return (
      <Modal visible={testVisible} transparent animationType="fade">
        <View style={S.container}>
          <View style={{ paddingHorizontal: 18, paddingTop: 52, paddingBottom: 12 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity onPress={() => { setTestVisible(false); resetTest(); }}>
                <Text style={{ color: C.gold, fontSize: 16, fontWeight: "700" }}>✕ Close</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 12, color: C.muted }}>{qIdx + 1}/{PLACEMENT_Q.length}</Text>
            </View>
          </View>
          <View style={{ height: 3, backgroundColor: C.navy2 }}><View style={{ height: 3, backgroundColor: C.gold, width: `${progress}%` }} /></View>
          <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 60 }}>
              <Text style={{ color: C.white, fontSize: 18, fontWeight: "800", marginBottom: 20 }}>{q.q}</Text>
              <View style={{ gap: 12 }}>
                {q.opts.map((opt, oi) => {
                  const chosen = answered[qIdx] === oi;
                  const correct = oi === q.ans;
                  const show = isAnswered;
                  let bg = C.navy2, tx = C.text;
                  if (show && correct) { bg = C.green; tx = C.white; }
                  else if (show && chosen && !correct) { bg = C.red; tx = C.white; }
                  else if (chosen && !show) { bg = C.goldBg; tx = C.gold; }
                  
                  return (
                    <TouchableOpacity key={oi} onPress={() => handleAnswer(oi)} disabled={isAnswered} style={{ backgroundColor: bg, borderRadius: 12, padding: 14 }}>
                      <Text style={{ fontSize: 15, fontWeight: "500", color: tx }}>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    );
  }

  const levelLabels = { A1: "🌱 A1", A2: "🏠 A2", B1: "💭 B1", B2: "💬 B2", C1: "✨ C1" };

  return (
    <View style={S.container}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 16, paddingBottom: 100 }}>
        <View>
          <Text style={{ fontSize: 28, fontWeight: "900", color: C.white }}>Welcome! 👋</Text>
          <Text style={{ fontSize: 14, color: C.muted }}>Your German journey.</Text>
        </View>

        <View style={{ backgroundColor: C.navy2, borderRadius: 16, padding: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 32 }}>🚂</Text>
            <View style={{ flex: 1, height: 2, backgroundColor: C.muted, marginHorizontal: 12 }} />
            <Text style={{ fontSize: 32 }}>🗺️</Text>
          </View>
          <Text style={{ color: C.text, fontSize: 13, marginTop: 8 }}>Travel 🇩🇪</Text>
        </View>

        <View style={{ backgroundColor: C.goldBg, borderRadius: 16, padding: 20 }}>
          <Text style={{ color: C.muted, fontSize: 11, fontWeight: "700" }}>LEVEL</Text>
          <Text style={{ color: C.white, fontSize: 24, fontWeight: "900", marginTop: 8 }}>{levelLabels[level]}</Text>
        </View>

        <TouchableOpacity style={{ backgroundColor: C.gold, borderRadius: 14, padding: 16, alignItems: "center" }} onPress={() => setTestVisible(true)}>
          <Text style={{ color: "#070B18", fontSize: 16, fontWeight: "900" }}>🎯 Test</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: C.gold, borderRadius: 14, padding: 16, alignItems: "center" }} onPress={() => router.push("/lessons")}>
          <Text style={{ color: "#070B18", fontSize: 16, fontWeight: "900" }}>📚 Lessons</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({ container: { flex: 1, backgroundColor: C.navy, paddingTop: 52 }, center: { justifyContent: "center", alignItems: "center" } });
