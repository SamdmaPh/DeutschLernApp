import { Platform } from "react-native";

const K = {
  xp:       "wv_xp",
  done:      "wv_done",
  goal:      "wv_goal",
  level:     "wv_level",
  name:      "wv_name",
  streak:    "wv_streak",
  lastDay:   "wv_lastday",
  onboarded: "wv_onboarded",
};

// Cross-platform storage wrapper
const Storage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    }
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    return AsyncStorage.getItem(key);
  },
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      if (typeof window !== "undefined") window.localStorage.setItem(key, value);
      return;
    }
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    return AsyncStorage.setItem(key, value);
  },
  async removeItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      if (typeof window !== "undefined") window.localStorage.removeItem(key);
      return;
    }
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    return AsyncStorage.removeItem(key);
  },
  async multiRemove(keys: string[]): Promise<void> {
    if (Platform.OS === "web") {
      if (typeof window !== "undefined") keys.forEach(k => window.localStorage.removeItem(k));
      return;
    }
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    return AsyncStorage.multiRemove(keys);
  },
};

export const LEVEL_THRESHOLDS = [0, 200, 500, 1000, 2000, 5000];
export const LEVEL_NAMES = ["Anfänger", "Einsteiger", "Lernender", "Fortgeschrittener", "Experte", "Meister"];

export const Progress = {
  async getXP(): Promise<number> {
    try { const v = await Storage.getItem(K.xp); return v ? Number(v) : 0; } catch { return 0; }
  },
  async addXP(n: number): Promise<number> {
    try {
      const cur = await this.getXP();
      const next = cur + n;
      await Storage.setItem(K.xp, String(next));
      return next;
    } catch { return 0; }
  },
  getAppLevel(xp: number): number {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_THRESHOLDS[i]) return i;
    }
    return 0;
  },
  async getCompleted(): Promise<string[]> {
    try { const v = await Storage.getItem(K.done); return v ? JSON.parse(v) : []; } catch { return []; }
  },
  async markComplete(id: string): Promise<void> {
    try {
      const list = await this.getCompleted();
      if (!list.includes(String(id))) {
        await Storage.setItem(K.done, JSON.stringify([...list, String(id)]));
        await this.updateStreak();
      }
    } catch {}
  },
  async isComplete(id: string): Promise<boolean> {
    const list = await this.getCompleted();
    return list.includes(String(id));
  },
  async getStreak(): Promise<number> {
    try { const v = await Storage.getItem(K.streak); return v ? Number(v) : 0; } catch { return 0; }
  },
  async updateStreak(): Promise<number> {
    try {
      const today = new Date().toDateString();
      const lastDay = await Storage.getItem(K.lastDay);
      const streak = await this.getStreak();
      if (lastDay === today) return streak;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = lastDay === yesterday ? streak + 1 : 1;
      await Storage.setItem(K.streak, String(newStreak));
      await Storage.setItem(K.lastDay, today);
      return newStreak;
    } catch { return 0; }
  },
  async getName(): Promise<string> {
    try { return (await Storage.getItem(K.name)) || ""; } catch { return ""; }
  },
  async setName(name: string): Promise<void> {
    try { await Storage.setItem(K.name, name); } catch {}
  },
  async getGoal(): Promise<string> {
    try { return (await Storage.getItem(K.goal)) || "travel"; } catch { return "travel"; }
  },
  async setGoal(goal: string): Promise<void> {
    try { await Storage.setItem(K.goal, goal); } catch {}
  },
  async getStudyLevel(): Promise<string> {
    try { return (await Storage.getItem(K.level)) || "A1"; } catch { return "A1"; }
  },
  async setStudyLevel(level: string): Promise<void> {
    try { await Storage.setItem(K.level, level); } catch {}
  },
  async getAll() {
    const [xp, done, streak, name, goal, studyLevel] = await Promise.all([
      this.getXP(), this.getCompleted(), this.getStreak(),
      this.getName(), this.getGoal(), this.getStudyLevel(),
    ]);
    return { xp, done, streak, name, goal, studyLevel, appLevel: this.getAppLevel(xp) };
  },
  async resetProgress(): Promise<void> {
    try { await Storage.multiRemove([K.xp, K.done, K.streak, K.lastDay]); } catch {}
  },
};
