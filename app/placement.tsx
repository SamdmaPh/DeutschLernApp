import React, { useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Animated, Platform, StatusBar } from "react-native";
import { router } from "expo-router";
import { supabase } from "../services/supabase";
import { C, SAFE_TOP, SERIF } from "../theme";

const QUESTIONS = [
  { q: "Wie heißt du?", opts: ["Ich heiße Sarah.", "Du heißt Sarah.", "Er heißen Max."], ans: 0 },
  { q: "Welche Farbe hat der Himmel?", opts: ["rot", "blau", "grün"], ans: 1 },
  { q: "Was kaufst du?", opts: ["Milch und Brot", "Brot", "Milch"], ans: 0 },
  { q: "Präteritum: Ich ___ ins Kino.", opts: ["gehe", "ging", "gehen"], ans: 1 },
  { q: "Das Buch gehört ___.", opts: ["mir", "mich", "mein"], ans: 0 },
  { q: "Ich ___ Klavier spielen.", opts: ["kann", "mögen", "muss"], ans: 0 },
  { q: "Sie ___ blonde Haare.", opts: ["hat", "ist", "habe"], ans: 0 },
  { q: "Das ist das Haus, ___ gekauft.", opts: ["das", "der", "den"], ans: 0 },
  { q: "wird ___ realisiert.", opts: ["von", "mit", "durch"], ans: 0 },
  { q: "Wenn ich Zeit ___, reise ich.", opts: ["hätte", "habe", "gehabt"], ans: 0 },
  { q: "Das Mädchen, ___ Bruder...", opts: ["dessen", "das", "der"], ans: 0 },
  { q: "Obwohl regnete, ___.", opts: ["gingen", "gehen", "gegangen"], ans: 0 },
  { q: "Sie sagte, dass sie ___.", opts: ["gekommen", "käme", "kommt"], ans: 1 },
  { q: "System erfordert ___.", opts: ["erhebliche", "erheblich", "erheblichen"], ans: 0 },
  { q: "Trotz ___ setzte fort.", opts: ["aller", "alle", "allem"], ans: 0 },
  { q: "Problem, ___ scheiterten.", opts: ["woran", "worauf", "womit"], ans: 0 },
  { q: "Ironie lag darin ___.", opts: ["bejahte", "bejahrt", "bejahe"], ans: 0 },
  { q: "Kafkas Werke ___.", opts: ["Ambivalenz", "Ambivolenz", "Ambivalenzen"], ans: 0 },
  { q: "System der ___.", opts: ["geschlechtsspezifischen", "spezifisch", "spezifisch"], ans: 0 },
  { q: "Rhetorik ___.", opts: ["Pointen", "Punkten", "Pointe"], ans: 0 },
];

function getLevel(s) { if (s >= 80) return "C1"; if (s >= 65) return "B2"; if (s >= 50) return "B1"; if (s >= 35) return "A2"; return "A1"; }

export default function PlacementScreen() {
  const [qIdx, setQIdx] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [score, setScore] = useState(0);
  const [testDone, setTestDone] = useState(false);
  const [level, setLevel] = useState("A1");
  const [saving, setSaving] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleAnswer = (oi) => {
    if (answered[qIdx] !== undefined) return;
    const newAnswered = [...answered];
    newAnswered[qIdx] = oi;
    setAnswered(newAnswered);
    if (oi === QUESTIONS[qIdx].ans) setScore(score + 5);

    setTimeout(() => {
      if (qIdx < QUESTIONS.length - 1) {
        Animated.sequence([
          Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: Platform.OS !== "web" }),
          Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: Platform.OS !== "web" }),
        ]).start();
        setTimeout(() => setQIdx(qIdx + 1), 150);
      } else {
        finishTest();
      }
    }, 800);
  };

  const finishTest = async () => {
    const finalScore = Math.min(100, score + 5);
    const lv = getLevel(finalScore);
    setLevel(lv);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("exam_placements").insert({ user_id: user.id, score: finalScore, detected_level: lv, question_responses: answered });
        const { data: prev } = await supabase.from("user_progress").select("*").eq("user_id", user.id).single().catch(() => ({ data: null }));
        await supabase.from("user_progress").upsert({ user_id: user.id, placement_completed: true, detected_level: lv, exam_readiness_pct: finalScore, xp: (prev?.xp || 0) + 50 });
      }
    } catch (err) { console.error("Error:", err); }
    setTestDone(true);
  };

  const handleStart = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 500));
    setSaving(false);
    router.replace("/");
  };

  if (testDone) {
    const labels = { A1: "A1 — Survival", A2: "A2 — Living", B1: "B1 — Thinking", B2: "B2 — Arguing", C1: "C1 — Being" };
    return (
      <View style={S.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ height: SAFE_TOP }} />
        <View style={{ flexDirection: "row", height: 3 }}>
          <View style={{ flex: 1, backgroundColor: C.flagBlack }} />
          <View style={{ flex: 1, backgroundColor: C.flagRed }} />
          <View style={{ flex: 1, backgroundColor: C.flagGold }} />
        </View>

        <ScrollView contentContainerStyle={{ padding: 24, gap: 20, paddingBottom: 100 }}>
          <Text style={{ fontSize: 24, fontWeight: "900", fontFamily: SERIF, color: C.text, textAlign: "center", marginTop: 20 }}>Dein Resultat</Text>

          <View style={{ backgroundColor: C.goldDim, borderWidth: 1, borderColor: C.goldLine, borderRadius: 20, padding: 32, alignItems: "center", gap: 12 }}>
            <Text style={{ fontSize: 64 }}>⭐</Text>
            <Text style={{ color: C.text, fontSize: 28, fontWeight: "900", fontFamily: SERIF, textAlign: "center" }}>{labels[level]}</Text>
            <Text style={{ color: C.gold, fontSize: 16, fontStyle: "italic", marginTop: 8 }}>Du überlebst auf Deutsch.</Text>
            <Text style={{ color: C.gold, fontSize: 40, fontWeight: "900", marginTop: 16 }}>{score}/100</Text>
          </View>

          <TouchableOpacity
            style={{ backgroundColor: C.gold, borderRadius: 14, padding: 18, alignItems: "center" }}
            onPress={handleStart}
            disabled={saving}
          >
            <Text style={{ color: C.white, fontSize: 16, fontWeight: "900" }}>
              {saving ? "Wird gespeichert..." : `✓ Starte mit ${level}`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16, alignItems: "center" }}
            onPress={() => router.replace("/")}
            disabled={saving}
          >
            <Text style={{ color: C.textSec, fontSize: 15, fontWeight: "700" }}>← Zurück</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  const q = QUESTIONS[qIdx];
  const isAnswered = answered[qIdx] !== undefined;
  const progress = ((qIdx + (isAnswered ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <View style={S.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: SAFE_TOP }} />
      <View style={{ flexDirection: "row", height: 3 }}>
        <View style={{ flex: 1, backgroundColor: C.flagBlack }} />
        <View style={{ flex: 1, backgroundColor: C.flagRed }} />
        <View style={{ flex: 1, backgroundColor: C.flagGold }} />
      </View>

      <View style={{ paddingHorizontal: 18, paddingTop: 16, paddingBottom: 12 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: C.text, fontSize: 15, fontWeight: "700", fontFamily: SERIF }}>Placement Test</Text>
          <Text style={{ fontSize: 12, color: C.muted }}>{qIdx + 1}/{QUESTIONS.length}</Text>
        </View>
      </View>

      <View style={{ height: 3, backgroundColor: C.bg3 }}>
        <View style={{ height: 3, backgroundColor: C.gold, width: `${progress}%` }} />
      </View>

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 60 }}>
          <Text style={{ color: C.muted, fontSize: 11, fontWeight: "700", marginBottom: 12 }}>Frage {qIdx + 1}</Text>
          <Text style={{ color: C.text, fontSize: 22, fontWeight: "800", fontFamily: SERIF, marginBottom: 20, lineHeight: 30 }}>{q.q}</Text>

          <View style={{ gap: 12 }}>
            {q.opts.map((opt, oi) => {
              const chosen = answered[qIdx] === oi;
              const correct = oi === q.ans;
              const show = isAnswered;
              let bg = C.card, br = C.border, tx = C.text;
              if (show && correct) { bg = C.greenDim; br = C.greenLine; tx = C.green; }
              else if (show && chosen && !correct) { bg = C.redDim; br = C.red; tx = C.red; }
              else if (chosen && !show) { bg = C.goldDim; br = C.goldLine; tx = C.gold; }
              return (
                <TouchableOpacity key={oi} onPress={() => handleAnswer(oi)} disabled={isAnswered} style={{ backgroundColor: bg, borderColor: br, borderWidth: 1, borderRadius: 12, padding: 16 }}>
                  <Text style={{ fontSize: 15, fontWeight: "500", color: tx }}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const S = StyleSheet.create({ container: { flex: 1, backgroundColor: C.bg } });
