import { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Progress } from "../../services/progress";
import { ALL_STATIC_LESSONS } from "../../data/lessonData";
import { C, SAFE_TOP, SERIF } from "../../theme";

const CONVERSATION_TOPICS = [
  { id: "cafe", emoji: "☕", title: "Im Café", desc: "Bestelle Kaffee und Kuchen" },
  { id: "taxi", emoji: "🚕", title: "Im Taxi", desc: "Sag dem Fahrer wohin" },
  { id: "supermarkt", emoji: "🛒", title: "Im Supermarkt", desc: "Kaufe ein und bezahle" },
  { id: "hotel", emoji: "🏨", title: "Im Hotel", desc: "Check ein, frag nach WLAN" },
  { id: "bahnhof", emoji: "🚂", title: "Am Bahnhof", desc: "Kaufe eine Fahrkarte" },
  { id: "arzt", emoji: "🏥", title: "Beim Arzt", desc: "Beschreibe Symptome" },
];

export default function UebenScreen() {
  const router = useRouter();
  const [done, setDone] = useState<string[]>([]);

  useFocusEffect(useCallback(() => {
    Progress.getCompleted().then(setDone);
  }, []));

  const sortedLessons = [...ALL_STATIC_LESSONS].sort((a: any, b: any) => a.order_index - b.order_index);

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
        <Text style={s.title}>Üben</Text>
        <Text style={s.subtitle}>Gespräche, Lektionen und Wiederholung</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Live-Gespräch */}
        <Text style={s.sectionLabel}>LIVE-GESPRÄCH</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {CONVERSATION_TOPICS.map(topic => (
              <TouchableOpacity key={topic.id} style={s.topicCard} onPress={() => router.push("/conversation")} activeOpacity={0.8}>
                <Text style={{ fontSize: 28 }}>{topic.emoji}</Text>
                <Text style={s.topicTitle}>{topic.title}</Text>
                <Text style={s.topicDesc}>{topic.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Vokabel-Review */}
        <TouchableOpacity style={s.reviewCard} onPress={() => router.push("/review")} activeOpacity={0.8}>
          <Text style={{ fontSize: 24 }}>🔄</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.reviewTitle}>Vokabel-Wiederholung</Text>
            <Text style={s.reviewSub}>Spaced Repetition · Gelernte Wörter festigen</Text>
          </View>
          <Text style={{ fontSize: 18, color: C.gold }}>→</Text>
        </TouchableOpacity>

        {/* Alle Lektionen */}
        <Text style={s.sectionLabel}>ALLE LEKTIONEN</Text>
        {sortedLessons.map((lesson: any) => {
          const isDone = done.includes(lesson.id);
          return (
            <TouchableOpacity
              key={lesson.id}
              style={[s.lessonRow, isDone && s.lessonRowDone]}
              onPress={() => router.push({ pathname: "/lesson", params: { lessonId: lesson.id } })}
              activeOpacity={0.7}
            >
              <View style={[s.lessonDot, isDone && s.lessonDotDone]}>
                {isDone && <Text style={{ fontSize: 10, color: "#FFF" }}>✓</Text>}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[s.lessonTitle, isDone && { color: C.muted }]}>{lesson.title_de || lesson.title}</Text>
                <Text style={s.lessonSub} numberOfLines={1}>{lesson.description}</Text>
              </View>
              <Text style={s.lessonLevel}>{lesson.level}</Text>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  flagStrip: { flexDirection: "row", height: 3 },
  flag: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 14, paddingBottom: 8 },
  title: { fontFamily: SERIF, fontSize: 28, fontWeight: "700", color: C.text },
  subtitle: { fontSize: 13, color: C.muted, marginTop: 4 },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionLabel: { fontSize: 10, fontWeight: "900", color: C.muted, letterSpacing: 2, marginBottom: 12, marginTop: 8 },
  topicCard: { width: 130, backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 16, gap: 6, alignItems: "center" },
  topicTitle: { fontSize: 13, fontWeight: "700", color: C.text, textAlign: "center" },
  topicDesc: { fontSize: 11, color: C.muted, textAlign: "center" },
  reviewCard: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 16, padding: 16, marginBottom: 24, gap: 12, borderWidth: 1, borderColor: C.border },
  reviewTitle: { fontSize: 15, fontWeight: "700", color: C.text },
  reviewSub: { fontSize: 12, color: C.muted, marginTop: 2 },
  lessonRow: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 14, padding: 14, marginBottom: 8, gap: 12, borderWidth: 1, borderColor: C.border },
  lessonRowDone: { borderColor: C.greenLine },
  lessonDot: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: C.border, alignItems: "center", justifyContent: "center" },
  lessonDotDone: { backgroundColor: C.green, borderColor: C.green },
  lessonTitle: { fontSize: 15, fontWeight: "700", color: C.text },
  lessonSub: { fontSize: 12, color: C.muted, marginTop: 2 },
  lessonLevel: { fontSize: 11, fontWeight: "800", color: C.gold },
});
