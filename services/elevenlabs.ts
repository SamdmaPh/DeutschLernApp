/**
 * ElevenLabs API Service
 * Text-to-Speech, Speech-to-Text, Sound Effects
 * Works on both Web and Native (Expo)
 */
import { Platform } from "react-native";
import { Audio } from "expo-av";

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

/**
 * Play audio from a blob/arraybuffer — cross-platform.
 */
async function playAudioData(arrayBuffer: ArrayBuffer): Promise<void> {
  if (Platform.OS === "web") {
    // Web: use HTML5 Audio with blob URL
    const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);
    const audio = new window.Audio(url);
    await audio.play();
  } else {
    // Native: use expo-av with base64
    const base64 = arrayBufferToBase64(arrayBuffer);
    const { sound } = await Audio.Sound.createAsync(
      { uri: `data:audio/mpeg;base64,${base64}` },
      { shouldPlay: true }
    );
    // Clean up after playback
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  }
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  if (typeof btoa !== "undefined") {
    return btoa(binary);
  }
  // Node/RN fallback
  return Buffer.from(buffer).toString("base64");
}

export const ElevenLabs = {
  /**
   * Play German text immediately — works on Web + Native.
   */
  async playText(text: string, voiceId?: string): Promise<void> {
    try {
      // Set audio mode for native
      if (Platform.OS !== "web") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
        });
      }

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
      if (!res.ok) {
        console.log("ElevenLabs error:", res.status);
        return;
      }
      const arrayBuffer = await res.arrayBuffer();
      await playAudioData(arrayBuffer);
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
      const arrayBuffer = await res.arrayBuffer();
      await playAudioData(arrayBuffer);
    } catch (e) {
      console.log("Sound effect error:", e);
    }
  },
};
