import { useEffect } from "react";
import { router } from "expo-router";

export default function OnboardingScreen() {
  useEffect(() => {
    router.replace("/");
  }, []);

  return null;
}
