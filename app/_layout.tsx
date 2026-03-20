import { Stack } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const BG = "#070B18";

function SplashScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, []);
  return (
    <Animated.View style={[sp.wrap, { opacity: fade }]}>
      <View style={sp.flags}>
        <View style={[sp.flag, { backgroundColor: "#1A1A1A" }]} />
        <View style={[sp.flag, { backgroundColor: "#CC0000" }]} />
        <View style={[sp.flag, { backgroundColor: "#C9A84C" }]} />
      </View>
      <Text style={sp.logo}>Wundervoll</Text>
      <Text style={sp.sub}>German, made wonderful.</Text>
    </Animated.View>
  );
}

const sp = StyleSheet.create({
  wrap:  { flex: 1, backgroundColor: BG, alignItems: "center", justifyContent: "center" },
  flags: { flexDirection: "row", position: "absolute", top: 0, left: 0, right: 0, height: 3 },
  flag:  { flex: 1 },
  logo:  { fontFamily: "Georgia", fontSize: 36, fontWeight: "700", color: "#FFFFFF", fontStyle: "italic", marginBottom: 8 },
  sub:   { fontSize: 13, color: "#4A6480", letterSpacing: 1 },
});

function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("wv_onboarded")
      .then(val => {
        if (!val) {
          router.replace("/onboarding");
        }
        setChecked(true);
      })
      .catch(() => {
        setChecked(true);
      });
  }, []);

  if (!checked) return <SplashScreen />;
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthGate>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: BG },
          animation: "slide_from_right",
          animationDuration: 280,
          gestureEnabled: true,
          gestureDirection: "horizontal",
          fullScreenGestureEnabled: true,
        }}
      >
        <Stack.Screen name="index"               options={{ animation: "fade" }} />
        <Stack.Screen name="onboarding"          options={{ animation: "fade", gestureEnabled: false }} />
        <Stack.Screen name="lessons"             options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="lesson"              options={{ animation: "slide_from_bottom", animationDuration: 350 }} />
        <Stack.Screen name="word-of-day"         options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="progress-screen"     options={{ animation: "slide_from_right" }} />
        <Stack.Screen name="settings"            options={{ animation: "slide_from_right" }} />
      </Stack>
    </AuthGate>
  );
}
