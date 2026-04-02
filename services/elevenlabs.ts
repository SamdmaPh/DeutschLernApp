/**
 * ElevenLabs API Service
 * Text-to-Speech, Speech-to-Text, Sound Effects
 */

const API_KEY = "sk_898eded090dfdf9ab27487cc51111a17aa33f17518ca666e";
const BASE = "https://api.elevenlabs.io/v1";

// Voice IDs (ElevenLabs default voices)
export const VOICES = {
  male: "onwK4e9ZLuTAKqWW03F9",    // Daniel - friendly male
  female: "21m00Tcm4TlvDq8ikWAM",   // Rachel - warm female
  narrator: "EXAVITQu4vr4xnSDxMaL",  // Bella - clear narrator
};

// Character voice mapping
export const CHARACTER_VOICES: Record<string, string> = {
  "Taxi driver": VOICES.male,
  "Taxifahrer": VOICES.male,
  "Receptionist": VOICES.female,
  "Waitress": VOICES.female,
  "Kellnerin": VOICES.female,
  "Tom": VOICES.male,
  "Vendor": VOICES.male,
  "Anna": VOICES.female,
  "Cashier": VOICES.female,
  "Passerby": VOICES.male,
  "Counter": VOICES.female,
  "default": VOICES.female,
};

export const ElevenLabs = {
  /**
   * Generate speech from German text.
   * Returns a base64 audio string.
   */
  async speak(text: string, voiceId?: string): Promise<string | null> {
    try {
      const voice = voiceId || VOICES.female;
      const res = await fetch(`${BASE}/text-to-speech/${voice}`, {
        method: "POST",
        headers: {
          "xi-api-key": API_KEY,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      });
      if (!res.ok) return null;
      const blob = await res.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = (reader.result as string)?.split(",")[1] || null;
          resolve(base64);
        };
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  },

  /**
   * Play German text immediately.
   */
  async playText(text: string, voiceId?: string): Promise<void> {
    try {
      const voice = voiceId || VOICES.female;
      const res = await fetch(`${BASE}/text-to-speech/${voice}`, {
        method: "POST",
        headers: {
          "xi-api-key": API_KEY,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      await audio.play();
    } catch (e) {
      console.log("ElevenLabs playback error:", e);
    }
  },

  /**
   * Play dialog line with character voice.
   */
  async playCharacterLine(speaker: string, text: string): Promise<void> {
    const voiceId = CHARACTER_VOICES[speaker] || CHARACTER_VOICES.default;
    await this.playText(text, voiceId);
  },

  /**
   * Generate a sound effect.
   */
  async soundEffect(description: string, duration?: number): Promise<void> {
    try {
      const res = await fetch(`${BASE}/sound-generation`, {
        method: "POST",
        headers: {
          "xi-api-key": API_KEY,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg",
        },
        body: JSON.stringify({
          text: description,
          duration_seconds: duration || 3,
        }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      await audio.play();
    } catch (e) {
      console.log("Sound effect error:", e);
    }
  },
};
