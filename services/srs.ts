/**
 * Spaced Repetition System (SM-2 Algorithm)
 * Tracks vocabulary learned in lessons and schedules reviews.
 */
import { Platform } from "react-native";

const SRS_KEY = "wv_srs";

// Cross-platform storage
const Storage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    }
    const AS = require("@react-native-async-storage/async-storage").default;
    return AS.getItem(key);
  },
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      if (typeof window !== "undefined") window.localStorage.setItem(key, value);
      return;
    }
    const AS = require("@react-native-async-storage/async-storage").default;
    return AS.setItem(key, value);
  },
};

export interface SRSCard {
  word: string;        // German word
  meaning: string;     // English translation
  lessonId: string;    // Which lesson it came from
  easeFactor: number;  // SM-2 ease factor (starts at 2.5)
  interval: number;    // Days until next review
  repetitions: number; // Successful reviews in a row
  nextReview: string;  // ISO date string
  lastReview: string;  // ISO date string
}

export const SRS = {
  async getAll(): Promise<SRSCard[]> {
    try {
      const raw = await Storage.getItem(SRS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  },

  async save(cards: SRSCard[]): Promise<void> {
    await Storage.setItem(SRS_KEY, JSON.stringify(cards));
  },

  /**
   * Add words from a completed lesson to the SRS deck.
   * Skips words that already exist.
   */
  async addWordsFromLesson(lessonId: string, words: { word: string; meaning: string }[]): Promise<void> {
    const cards = await this.getAll();
    const existing = new Set(cards.map(c => c.word));
    const today = new Date().toISOString().split("T")[0];

    const newCards = words
      .filter(w => !existing.has(w.word))
      .map(w => ({
        word: w.word,
        meaning: w.meaning,
        lessonId,
        easeFactor: 2.5,
        interval: 1,
        repetitions: 0,
        nextReview: today, // Review tomorrow
        lastReview: today,
      }));

    await this.save([...cards, ...newCards]);
  },

  /**
   * Get cards due for review today.
   */
  async getDueCards(): Promise<SRSCard[]> {
    const cards = await this.getAll();
    const today = new Date().toISOString().split("T")[0];
    return cards.filter(c => c.nextReview <= today);
  },

  /**
   * Get count of due cards.
   */
  async getDueCount(): Promise<number> {
    const due = await this.getDueCards();
    return due.length;
  },

  /**
   * Review a card. Quality: 0 (wrong) to 5 (perfect).
   * Uses SM-2 algorithm.
   */
  async review(word: string, quality: number): Promise<void> {
    const cards = await this.getAll();
    const idx = cards.findIndex(c => c.word === word);
    if (idx === -1) return;

    const card = cards[idx];
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    if (quality >= 3) {
      // Correct answer
      if (card.repetitions === 0) {
        card.interval = 1;
      } else if (card.repetitions === 1) {
        card.interval = 6;
      } else {
        card.interval = Math.round(card.interval * card.easeFactor);
      }
      card.repetitions++;
    } else {
      // Wrong answer — reset
      card.repetitions = 0;
      card.interval = 1;
    }

    // Update ease factor (SM-2)
    card.easeFactor = Math.max(1.3,
      card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    );

    // Calculate next review date
    const next = new Date(today);
    next.setDate(next.getDate() + card.interval);
    card.nextReview = next.toISOString().split("T")[0];
    card.lastReview = todayStr;

    cards[idx] = card;
    await this.save(cards);
  },

  /**
   * Get total vocabulary count.
   */
  async getTotalCount(): Promise<number> {
    const cards = await this.getAll();
    return cards.length;
  },
};
