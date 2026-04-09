/**
 * ElevenLabs API Service
 * Works on Web + Expo Go (Native)
 */
import { Platform } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system/legacy";

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
        // Native: fetch → base64 → write to file → expo-av
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
        });

        const res = await fetch(`${BASE}/text-to-speech/${voice}`, {
          method: "POST",
          headers: {
            "xi-api-key": API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            model_id: "eleven_multilingual_v2",
            voice_settings: { stability: 0.5, similarity_boost: 0.75 },
          }),
        });
        if (!res.ok) {
          console.log("ElevenLabs API error:", res.status);
          return;
        }

        // Convert response to base64
        const arrayBuffer = await res.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64 = btoa(binary);

        // Write to temp file
        const fileUri = FileSystem.cacheDirectory + `tts_${Date.now()}.mp3`;
        await FileSystem.writeAsStringAsync(fileUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Play the file
        const { sound } = await Audio.Sound.createAsync(
          { uri: fileUri },
          { shouldPlay: true }
        );

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
            FileSystem.deleteAsync(fileUri, { idempotent: true });
          }
        });
      }
    } catch (e) {
      console.log("ElevenLabs error:", e);
    }
  },

  /**
   * Speech-to-Text: Record audio and transcribe.
   * Returns the transcribed text or null.
   */
  async speechToText(): Promise<string | null> {
    try {
      // Record audio
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();

      // Record for 3 seconds
      await new Promise(r => setTimeout(r, 3000));
      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();
      if (!uri) return null;

      // Read file as base64
      const base64Audio = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Send to ElevenLabs Speech-to-Text
      const formData = new FormData();
      formData.append("file", {
        uri,
        type: "audio/m4a",
        name: "recording.m4a",
      } as any);
      formData.append("model_id", "scribe_v1");
      formData.append("language_code", "deu");

      const res = await fetch(`${BASE}/speech-to-text`, {
        method: "POST",
        headers: {
          "xi-api-key": API_KEY,
        },
        body: formData,
      });

      if (!res.ok) {
        console.log("STT error:", res.status);
        return null;
      }

      const data = await res.json();
      return data.text || null;
    } catch (e) {
      console.log("Speech-to-text error:", e);
      return null;
    }
  },

  async playCharacterLine(speaker: string, text: string): Promise<void> {
    const voiceId = CHARACTER_VOICES[speaker] || CHARACTER_VOICES.default;
    await this.playText(text, voiceId);
  },

  /** Sound Effects: Generate ambient sounds */
  async playSoundEffect(prompt: string, duration = 3): Promise<void> {
    try {
      const res = await fetch(`${BASE}/sound-generation`, {
        method: "POST",
        headers: {
          "xi-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: prompt,
          duration_seconds: duration,
        }),
      });
      if (!res.ok) return;

      if (Platform.OS === "web") {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new window.Audio(url);
        audio.volume = 0.3; // ambient = quiet
        await audio.play();
      } else {
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false, playsInSilentModeIOS: true });
        const arrayBuffer = await res.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
        const base64 = btoa(binary);
        const fileUri = FileSystem.cacheDirectory + `sfx_${Date.now()}.mp3`;
        await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 });
        const { sound } = await Audio.Sound.createAsync({ uri: fileUri }, { shouldPlay: true, volume: 0.3 });
        sound.setOnPlaybackStatusUpdate(status => {
          if (status.isLoaded && status.didJustFinish) { sound.unloadAsync(); FileSystem.deleteAsync(fileUri, { idempotent: true }); }
        });
      }
    } catch (e) {
      console.log("SFX error:", e);
    }
  },

  /** Play a single word for pronunciation */
  async playWord(word: string): Promise<void> {
    await this.playText(word, VOICES.female);
  },
};
