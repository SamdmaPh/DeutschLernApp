// ─── Avatar & Story System ──────────────────────────────────────────────────
// Tracks the player's character, items, position, and story progress
import { Platform } from "react-native";

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
};

// ── Items & Rewards ──
export interface AvatarItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  city: string;       // where it was earned
  lessonId: string;   // which lesson unlocked it
}

export const ALL_ITEMS: AvatarItem[] = [
  // Berlin
  { id: "koffer", name: "Koffer", emoji: "🧳", description: "Dein treuer Reisebegleiter — am Flughafen Berlin aufgesammelt.", city: "berlin", lessonId: "a1-0-1" },
  { id: "schluessel", name: "Hostel-Schlüssel", emoji: "🔑", description: "Zimmer 204, Hostel Berlin-Mitte. Willkommen!", city: "berlin", lessonId: "a1-0-2" },
  { id: "bratwurst", name: "Berliner Bratwurst", emoji: "🌭", description: "Die erste Bratwurst in Deutschland — mit Senf natürlich!", city: "berlin", lessonId: "a1-1-1" },
  { id: "berliner", name: "Berliner Pfannkuchen", emoji: "🍩", description: "Ist es ein Krapfen? Ein Pfannkuchen? In Berlin heißt es Berliner!", city: "berlin", lessonId: "a1-1-2" },
  // Hamburg
  { id: "fischbroetchen", name: "Fischbrötchen", emoji: "🐟", description: "Am Hamburger Fischmarkt frisch gekauft. Moin!", city: "hamburg", lessonId: "a1-1-3" },
  { id: "anker", name: "Anker-Souvenir", emoji: "⚓", description: "Ein Andenken vom Hamburger Hafen.", city: "hamburg", lessonId: "a1-2-1" },
  { id: "regenschirm", name: "Regenschirm", emoji: "☂️", description: "In Hamburg braucht man IMMER einen Regenschirm.", city: "hamburg", lessonId: "a1-2-2" },
  // Dresden
  { id: "stollen", name: "Dresdner Stollen", emoji: "🍞", description: "Der berühmte Weihnachtsstollen aus Dresden.", city: "dresden", lessonId: "a1-2-3" },
  { id: "postkarte", name: "Postkarte Frauenkirche", emoji: "🏛️", description: "Die wiederaufgebaute Frauenkirche — Symbol der Versöhnung.", city: "dresden", lessonId: "a1-3-1" },
  { id: "semperoper_ticket", name: "Semperoper-Ticket", emoji: "🎭", description: "Ein Abend in der Semperoper. Unvergesslich.", city: "dresden", lessonId: "a1-3-2" },
];

// ── Avatar Appearance ──
export const AVATAR_STAGES = [
  { level: 0, emoji: "🧑‍🎒", name: "Backpacker", minXP: 0 },
  { level: 1, emoji: "🧑‍💼", name: "Tourist", minXP: 200 },
  { level: 2, emoji: "🧑‍🎓", name: "Austauschstudent", minXP: 500 },
  { level: 3, emoji: "🧑‍🏫", name: "Fortgeschrittener", minXP: 1000 },
  { level: 4, emoji: "🦸", name: "Sprachprofi", minXP: 2000 },
  { level: 5, emoji: "👑", name: "Meister", minXP: 5000 },
];

// ── Avatar State ──
export interface AvatarState {
  name: string;
  currentCity: string;
  unlockedCities: string[];
  items: string[];     // item IDs
  xp: number;
  lessonsCompleted: string[];
}

const DEFAULT_STATE: AvatarState = {
  name: "",
  currentCity: "berlin",
  unlockedCities: ["berlin"],
  items: [],
  xp: 0,
  lessonsCompleted: [],
};

const AVATAR_KEY = "wv_avatar";

export const Avatar = {
  async getState(): Promise<AvatarState> {
    try {
      const raw = await Storage.getItem(AVATAR_KEY);
      return raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : DEFAULT_STATE;
    } catch { return DEFAULT_STATE; }
  },

  async save(state: AvatarState): Promise<void> {
    await Storage.setItem(AVATAR_KEY, JSON.stringify(state));
  },

  async completeLesson(lessonId: string, xpEarned: number): Promise<{ newItems: AvatarItem[]; newCity: string | null; levelUp: boolean }> {
    const state = await this.getState();
    const oldLevel = this.getAvatarLevel(state.xp);

    // Add XP
    state.xp += xpEarned;

    // Mark lesson complete
    if (!state.lessonsCompleted.includes(lessonId)) {
      state.lessonsCompleted.push(lessonId);
    }

    // Award items
    const newItems = ALL_ITEMS.filter(item => item.lessonId === lessonId && !state.items.includes(item.id));
    for (const item of newItems) {
      state.items.push(item.id);
    }

    // Check city progression (if all lessons in current city done)
    let newCity: string | null = null;
    const { JOURNEY_CITIES } = require("../data/journeyData");
    const currentCityData = JOURNEY_CITIES.find((c: any) => c.id === state.currentCity);
    if (currentCityData) {
      const allCityLessonsDone = currentCityData.lessonIds.every((lid: string) => state.lessonsCompleted.includes(lid));
      if (allCityLessonsDone) {
        const cityIdx = JOURNEY_CITIES.findIndex((c: any) => c.id === state.currentCity);
        const nextCity = JOURNEY_CITIES[cityIdx + 1];
        if (nextCity && !state.unlockedCities.includes(nextCity.id)) {
          state.unlockedCities.push(nextCity.id);
          state.currentCity = nextCity.id;
          newCity = nextCity.id;
        }
      }
    }

    const newLevel = this.getAvatarLevel(state.xp);
    await this.save(state);

    return { newItems, newCity, levelUp: newLevel > oldLevel };
  },

  getAvatarLevel(xp: number): number {
    for (let i = AVATAR_STAGES.length - 1; i >= 0; i--) {
      if (xp >= AVATAR_STAGES[i].minXP) return i;
    }
    return 0;
  },

  getAvatarEmoji(xp: number): string {
    return AVATAR_STAGES[this.getAvatarLevel(xp)].emoji;
  },

  getAvatarTitle(xp: number): string {
    return AVATAR_STAGES[this.getAvatarLevel(xp)].name;
  },

  getCollectedItems(itemIds: string[]): AvatarItem[] {
    return ALL_ITEMS.filter(i => itemIds.includes(i.id));
  },
};
