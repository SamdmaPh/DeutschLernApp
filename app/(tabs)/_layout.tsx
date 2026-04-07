import { Tabs } from "expo-router";
import { Platform, StyleSheet, View, Text } from "react-native";
import { C } from "../../theme";

const isWeb = Platform.OS === "web";

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <View style={styles.tabIcon}>
      <Text style={[styles.emoji, focused && styles.emojiFocused]}>{emoji}</Text>
      {focused && <View style={styles.activeIndicator} />}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: C.bg,
          borderTopWidth: 1,
          borderTopColor: C.border,
          height: Platform.OS === "ios" ? 84 : isWeb ? 64 : 60,
          paddingBottom: Platform.OS === "ios" ? 24 : 6,
          paddingTop: 6,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: C.gold,
        tabBarInactiveTintColor: C.muted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          marginTop: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Karte",
          tabBarIcon: ({ focused }) => <TabIcon emoji="🗺️" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Üben",
          tabBarIcon: ({ focused }) => <TabIcon emoji="📝" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="journey"
        options={{
          title: "Reise",
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏛️" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Bibliothek",
          tabBarIcon: ({ focused }) => <TabIcon emoji="📚" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIcon: { alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 22, opacity: 0.4 },
  emojiFocused: { opacity: 1, fontSize: 24 },
  activeIndicator: { width: 4, height: 4, borderRadius: 2, backgroundColor: "#FFCC00", marginTop: 3 },
});
