import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("wv_onboarded").then(val => {
      setChecked(true);
      if (!val) {
        router.replace("/onboarding");
      }
    });
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="lessons" />
      <Stack.Screen name="lesson" />
      <Stack.Screen name="conversation" />
      <Stack.Screen name="word-of-day" />
    </Stack>
  );
}
