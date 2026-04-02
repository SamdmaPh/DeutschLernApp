import { Platform } from "react-native";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ypkpsosjkfrgenfcgjtq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwa3Bzb3Nqa2ZyZ2VuZmNnanRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTI4NDMsImV4cCI6MjA4ODY2ODg0M30.CJy-QP9GPf7o1f12aAWtBKOvJM5wXqJv3VIqHKBBRC0";

const getStorage = () => {
  if (Platform.OS === "web") {
    return typeof window !== "undefined" ? window.localStorage : undefined;
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const AsyncStorage = require("@react-native-async-storage/async-storage").default;
  return AsyncStorage;
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: getStorage(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === "web",
  },
});