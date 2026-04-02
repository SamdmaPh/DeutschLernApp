/**
 * ElevenLabs API Service
 * Works on Web + Expo Go (Native)
 */
import { Platform } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

const API_KEY = "sk_898eded090dfdf9ab27487cc51111a17aa33f17518ca666e";
const BASE = "https://api.elevenlabs.io/v1";

export const VOICES = {
  male: "onwK4e9ZLuTAKqWW03F9",
  female: "21m00Tcm4TlvDq8ikWAM",
};

export const CHARACTER_VOICES: Record<string, string> = {
  "Taxi driver": VOICES.male,
  "Receptionist": VOICES.female,
  "Waitress": VOICES.female,
  "Tom": VOICES.male,
  "Vendor": VOICES.male,
  "Anna": VOICES.female,
  "Cashier": VOICES.female,
  "Passerby": VOICES.male,
  "Counter": VOICES.female,
  "default": VOICES.female,
};

export const ElevenLabs = {
  async playText(text: string, voiceId?: string): Promise<void> {
    try {
      const voice = voiceId || VOICES.female;

      if (Platform.OS === "web") {
        // Web: fetch blob → HTML5 Audio
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
        const audio = new window.Audio(url);
        await audio.play();
      } else {
        // Native: download to file → expo-av
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
        });

        const fileUri = FileSystem.cacheDirectory + `tts_${Date.now()}.mp3`;

        // Download audio file directly
        const downloadResult = await FileSystem.downloadAsync(
          `${BASE}/text-to-speech/${voice}`,
          fileUri,
          {
            headers: {
              "xi-api-key": API_KEY,
              "Content-Type": "application/json",
            },
            httpMethod: "POST",
            body: JSON.stringify({
              text,
              model_id: "eleven_multilingual_v2",
              voice_settings: { stability: 0.5, similarity_boost: 0.75 },
            }),
          }
        );

        if (downloadResult.status !== 200) {
          console.log("ElevenLabs download error:", downloadResult.status);
          return;
        }

        const { sound } = await Audio.Sound.createAsync(
          { uri: downloadResult.uri },
          { shouldPlay: true }
        );

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
            // Clean up temp file
            FileSystem.deleteAsync(downloadResult.uri, { idempotent: true });
          }
        });
      }
    } catch (e) {
      console.log("ElevenLabs error:", e);
    }
  },

  async playCharacterLine(speaker: string, text: string): Promise<void> {
    const voiceId = CHARACTER_VOICES[speaker] || CHARACTER_VOICES.default;
    await this.playText(text, voiceId);
  },
};
