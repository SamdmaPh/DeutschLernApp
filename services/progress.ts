import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const LEVEL_THRESHOLDS = [0, 200, 500, 1000, 2000, 5000];
export const LEVEL_NAMES = ["Anfänger", "Einsteiger", "Lernender", "Fortgeschrittener", "Experte", "Meister"];

export const Progress = {
  async getXP(): Promise<number> {
    try { const v = await AsyncStorage.getItem(K.xp); return v ? Number(v) : 0; } catch { return 0; }
  },
  async addXP(n: number): Promise<number> {
    try {
      const cur = await this.getXP();
      const next = cur + n;
      await AsyncStorage.setItem(K.xp, String(next));
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
    try { const v = await AsyncStorage.getItem(K.done); return v ? JSON.parse(v) : []; } catch { return []; }
  },
  async markComplete(id: string): Promise<void> {
    try {
      const list = await this.getCompleted();
      if (!list.includes(String(id))) {
        await AsyncStorage.setItem(K.done, JSON.stringify([...list, String(id)]));
        await this.updateStreak();
      }
    } catch {}
  },
  async isComplete(id: string): Promise<boolean> {
    const list = await this.getCompleted();
    return list.includes(String(id));
  },
  async getStreak(): Promise<number> {
    try { const v = await AsyncStorage.getItem(K.streak); return v ? Number(v) : 0; } catch { return 0; }
  },
  async updateStreak(): Promise<number> {
    try {
      const today = new Date().toDateString();
      const lastDay = await AsyncStorage.getItem(K.lastDay);
      const streak = await this.getStreak();
      if (lastDay === today) return streak;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = lastDay === yesterday ? streak + 1 : 1;
      await AsyncStorage.setItem(K.streak, String(newStreak));
      await AsyncStorage.setItem(K.lastDay, today);
      return newStreak;
    } catch { return 0; }
  },
  async getName(): Promise<string> {
    try { return (await AsyncStorage.getItem(K.name)) || ""; } catch { return ""; }
  },
  async setName(name: string): Promise<void> {
    try { await AsyncStorage.setItem(K.name, name); } catch {}
  },
  async getGoal(): Promise<string> {
    try { return (await AsyncStorage.getItem(K.goal)) || "travel"; } catch { return "travel"; }
  },
  async setGoal(goal: string): Promise<void> {
    try { await AsyncStorage.setItem(K.goal, goal); } catch {}
  },
  async getStudyLevel(): Promise<string> {
    try { return (await AsyncStorage.getItem(K.level)) || "A1"; } catch { return "A1"; }
  },
  async setStudyLevel(level: string): Promise<void> {
    try { await AsyncStorage.setItem(K.level, level); } catch {}
  },
  async getAll() {
    const [xp, done, streak, name, goal, studyLevel] = await Promise.all([
      this.getXP(), this.getCompleted(), this.getStreak(),
      this.getName(), this.getGoal(), this.getStudyLevel(),
    ]);
    return { xp, done, streak, name, goal, studyLevel, appLevel: this.getAppLevel(xp) };
  },
  async resetProgress(): Promise<void> {
    try { await AsyncStorage.multiRemove([K.xp, K.done, K.streak, K.lastDay]); } catch {}
  },
};
