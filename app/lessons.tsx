import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ALL_STATIC_LESSONS } from "../data/lessonData";

const C = { navy: "#070B18", navy2: "#0D1425", gold: "#C9A84C", white: "#FFFFFF", text: "#D4E4F4", muted: "#4A6480" };

export default function LessonsScreen() {
  const lessons = ALL_STATIC_LESSONS.filter(l => l.level === "A1").sort((a, b) => a.order_index - b.order_index);
  const sublevels = [...new Set(lessons.map(l => l.sublevel))];

  return (
    <View style={S.container}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <View>
          <Text style={{ fontSize: 28, fontWeight: "900", color: C.white, marginBottom: 8 }}>Lessons</Text>
          <Text style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>A1 • {lessons.length} lessons</Text>
        </View>

        {sublevels.map((sublevel) => {
          const subs = lessons.filter(l => l.sublevel === sublevel);
          return (
            <View key={"sublevel-" + sublevel} style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 15, fontWeight: "900", color: C.gold, marginBottom: 8 }}>{sublevel}</Text>
              {subs.map((lesson) => (
                <TouchableOpacity key={lesson.id} style={{ backgroundColor: C.navy2, borderRadius: 12, padding: 14, marginBottom: 8 }} onPress={() => router.push({ pathname: "/lesson", params: { lessonId: lesson.id } })}>
                  <Text style={{ color: C.white, fontSize: 14, fontWeight: "700" }}>{lesson.title}</Text>
                  <Text style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>+{lesson.xp_reward} XP</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}

        <TouchableOpacity style={{ backgroundColor: C.navy2, borderRadius: 12, padding: 14, marginTop: 20, alignItems: "center" }} onPress={() => router.push("/")}>
          <Text style={{ color: C.text, fontSize: 14 }}>← Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({ container: { flex: 1, backgroundColor: C.navy, paddingTop: 52 } });
