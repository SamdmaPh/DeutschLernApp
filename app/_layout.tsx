import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { C, SERIF } from "../theme";

const isWeb = Platform.OS === "web";

async function getStorageItem(key: string): Promise<string | null> {
  if (isWeb) {
    return typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
  }
  const AsyncStorage = require("@react-native-async-storage/async-storage").default;
  return AsyncStorage.getItem(key);
}

function SplashScreen() {
  return (
    <View style={sp.wrap}>
      <View style={sp.flags}>
        <View style={[sp.flag, { backgroundColor: C.flagBlack }]} />
        <View style={[sp.flag, { backgroundColor: C.flagRed }]} />
        <View style={[sp.flag, { backgroundColor: C.flagGold }]} />
      </View>
      <Text style={sp.logo}>Wundervoll</Text>
      <Text style={sp.sub}>German, made wonderful.</Text>
    </View>
  );
}

const sp = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: C.bg, alignItems: "center", justifyContent: "center" },
  flags: { flexDirection: "row", position: "absolute", top: 0, left: 0, right: 0, height: 3 },
  flag: { flex: 1 },
  logo: { fontFamily: SERIF, fontSize: 36, fontWeight: "700", color: C.text, fontStyle: "italic", marginBottom: 8 },
  sub: { fontSize: 13, color: C.muted, letterSpacing: 1 },
});

function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    getStorageItem("wv_onboarded")
      .then(val => {
        if (!val) setTimeout(() => router.replace("/onboarding"), 100);
        setChecked(true);
      })
      .catch(() => setChecked(true));
  }, [mounted]);

  if (!checked) return <SplashScreen />;
  return <>{children}</>;
}

const anim = (native: string) => isWeb ? "none" as const : native as any;

export default function RootLayout() {
  return (
    <AuthGate>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: C.bg },
          animation: anim("slide_from_right"),
        }}
      >
        <Stack.Screen name="(tabs)" options={{ animation: anim("fade") }} />
        <Stack.Screen name="onboarding" options={{ animation: anim("fade"), gestureEnabled: false }} />
        <Stack.Screen name="lesson" options={{ animation: anim("slide_from_bottom"), presentation: "modal" }} />
        <Stack.Screen name="settings" options={{ animation: anim("slide_from_right") }} />
        <Stack.Screen name="placement" options={{ animation: anim("slide_from_bottom") }} />
        <Stack.Screen name="word-of-day" options={{ animation: anim("slide_from_right") }} />
        <Stack.Screen name="conversation" options={{ animation: anim("slide_from_right") }} />
        <Stack.Screen name="review" options={{ animation: anim("slide_from_bottom") }} />
        <Stack.Screen name="live-lesson" options={{ animation: anim("slide_from_bottom"), presentation: "modal" }} />
      </Stack>
    </AuthGate>
  );
}
