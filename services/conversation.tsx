import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, StatusBar, Platform, ActivityIndicator,
  Animated, Pressable
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

const C = {
  navy:       "#070B18", navy2: "#0A1020", navy3: "#0F1628",
  border:     "#1E2D45",
  gold:       "#C9A84C", goldBg: "rgba(201,168,76,0.10)", goldBorder: "rgba(201,168,76,0.25)",
  red:        "#CC0000", redBg: "rgba(204,0,0,0.10)", redBorder: "rgba(204,0,0,0.3)",
  green:      "#22C55E", greenBg: "rgba(34,197,94,0.10)",
  black:      "#111111", white: "#FFFFFF", text: "#E2E8F0", muted: "#64748B",
};
const SAFE_TOP = Platform.OS === "ios" ? 54 : 30;
const BACKEND = "https://deutschlernappbackend2-production.up.railway.app";

interface Message { role: "user" | "assistant"; content: string; }
interface Correction { original: string; corrected: string; explanation: string; }

const TOPICS = [
  { id: "intro",    label: "Kennenlernen",  emoji: "👋", prompt: "Introduce yourself in German" },
  { id: "cafe",     label: "Im Café",       emoji: "☕", prompt: "Ordering at a German café" },
  { id: "travel",   label: "Reisen",        emoji: "✈️", prompt: "Planning a trip to Germany" },
  { id: "work",     label: "Arbeit",        emoji: "💼", prompt: "Talking about your job" },
  { id: "family",   label: "Familie",       emoji: "👨‍👩‍👧", prompt: "Talking about family" },
  { id: "weather",  label: "Wetter",        emoji: "☀️", prompt: "Small talk about weather" },
];

export default function ConversationScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [selectedTopic, setSelectedTopic] = useState<typeof TOPICS[0] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [corrections, setCorrections] = useState<Correction[]>([]);
  const [expandedCorrections, setExpandedCorrections] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingObj, setRecordingObj] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [mode, setMode] = useState<"voice" | "text">("voice");
  const [textInput, setTextInput] = useState("");
  const [micError, setMicError] = useState<string | null>(null);

  // Mic button pulse animation
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseLoop = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
      recordingObj?.stopAndUnloadAsync();
    };
  }, []);

  function startPulse() {
    pulseLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 600, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    );
    pulseLoop.current.start();
  }
  function stopPulse() {
    pulseLoop.current?.stop();
    pulseAnim.setValue(1);
  }

  async function startRecording() {
    try {
      setMicError(null);
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) { setMicError("Mikrofon-Zugriff verweigert"); return; }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecordingObj(recording);
      setIsRecording(true);
      startPulse();
    } catch (err: any) {
      setMicError("Aufnahme fehlgeschlagen: " + err.message);
    }
  }

  async function stopRecordingAndSend() {
    if (!recordingObj) return;
    stopPulse();
    setIsRecording(false);
    setIsLoading(true);

    try {
      await recordingObj.stopAndUnloadAsync();
      const uri = recordingObj.getURI();
      setRecordingObj(null);
      if (!uri) throw new Error("No recording URI");

      // Read file as base64
      const response = await fetch(uri);
      const blob = await response.blob();
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      await sendAudio(base64);
    } catch (err: any) {
      setMicError("Fehler: " + err.message);
      setIsLoading(false);
    }
  }

  async function sendAudio(base64: string) {
    try {
      const res = await fetch(`${BACKEND}/api/audio-conversation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audio: base64,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          level: "A1",
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const newMessages: Message[] = [
        ...messages,
        { role: "user", content: data.userText },
        { role: "assistant", content: data.assistantText },
      ];
      setMessages(newMessages);
      if (data.corrections?.length) setCorrections(data.corrections);

      // Play audio response
      if (data.audio) await playBase64Audio(data.audio);

      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    } catch (err: any) {
      setMicError("Server-Fehler: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function sendText() {
    if (!textInput.trim() || isLoading) return;
    const userMsg = textInput.trim();
    setTextInput("");
    setIsLoading(true);

    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);

    try {
      const res = await fetch(`${BACKEND}/api/conversation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          topic: selectedTopic?.prompt || "Free conversation",
          level: "A1",
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...newMessages, { role: "assistant", content: data.text }]);
      if (data.corrections?.length) setCorrections(data.corrections);

      // TTS for text mode too
      playTTS(data.text);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    } catch (err: any) {
      setMicError("Fehler: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function playTTS(text: string) {
    try {
      const res = await fetch(`${BACKEND}/api/speak`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.audio) await playBase64Audio(data.audio);
    } catch {}
  }

  async function playBase64Audio(base64: string) {
    try {
      sound?.unloadAsync();
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true, allowsRecordingIOS: false });
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: `data:audio/mpeg;base64,${base64}` },
        { shouldPlay: true }
      );
      setSound(newSound);
    } catch (err) {
      console.log("Audio play error:", err);
    }
  }

  function toggleCorrection(i: number) {
    setExpandedCorrections(prev => {
      const n = new Set(prev);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  }

  // ─── TOPIC SELECTION SCREEN ───────────────────────────────────────────────
  if (!selectedTopic) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={{ height: SAFE_TOP }} />
        <View style={{ flexDirection: "row", height: 3 }}>
          <View style={{ flex: 1, backgroundColor: C.black }} />
          <View style={{ flex: 1, backgroundColor: C.red }} />
          <View style={{ flex: 1, backgroundColor: C.gold }} />
        </View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={{ width: 72 }}>
            <Text style={styles.backText}>‹ Zurück</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Gespräch</Text>
          <View style={{ width: 72 }} />
        </View>

        <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.topicHeading}>Worüber möchtest du sprechen?</Text>
          <Text style={styles.topicSub}>Wähle ein Thema — dann geht es los</Text>

          {TOPICS.map(t => (
            <TouchableOpacity
              key={t.id}
              style={styles.topicCard}
              onPress={() => setSelectedTopic(t)}
              activeOpacity={0.8}
            >
              <Text style={styles.topicEmoji}>{t.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.topicLabel}>{t.label}</Text>
                <Text style={styles.topicPrompt}>{t.prompt}</Text>
              </View>
              <Text style={{ color: C.gold, fontSize: 20 }}>→</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  // ─── CHAT SCREEN ──────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{ height: SAFE_TOP }} />
      <View style={{ flexDirection: "row", height: 3 }}>
        <View style={{ flex: 1, backgroundColor: C.black }} />
        <View style={{ flex: 1, backgroundColor: C.red }} />
        <View style={{ flex: 1, backgroundColor: C.gold }} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          setSelectedTopic(null); setMessages([]); setCorrections([]);
        }} style={{ width: 72 }}>
          <Text style={styles.backText}>‹ Zurück</Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.headerTitle}>{selectedTopic.emoji} {selectedTopic.label}</Text>
        </View>
        {/* Mode toggle */}
        <TouchableOpacity
          style={styles.modeToggle}
          onPress={() => setMode(m => m === "voice" ? "text" : "voice")}
        >
          <Text style={styles.modeToggleText}>{mode === "voice" ? "⌨️" : "🎙️"}</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome message */}
        {messages.length === 0 && (
          <View style={styles.welcomeBox}>
            <Text style={styles.welcomeEmoji}>{selectedTopic.emoji}</Text>
            <Text style={styles.welcomeTitle}>Bereit für dein Gespräch?</Text>
            <Text style={styles.welcomeText}>
              {mode === "voice"
                ? "Halte den Mikrofon-Button gedrückt und sprich Deutsch. Ich höre zu und antworte!"
                : "Tippe deine Nachricht auf Deutsch. Ich korrigiere Fehler und antworte auf Deutsch."}
            </Text>
          </View>
        )}

        {/* Chat bubbles */}
        {messages.map((m, i) => (
          <View key={i} style={[
            styles.bubbleRow,
            m.role === "user" ? styles.bubbleRowUser : styles.bubbleRowAssistant
          ]}>
            {m.role === "assistant" && (
              <View style={styles.avatarDot}>
                <Text style={{ fontSize: 14 }}>🤖</Text>
              </View>
            )}
            <View style={[
              styles.bubble,
              m.role === "user" ? styles.bubbleUser : styles.bubbleAssistant
            ]}>
              <Text style={[
                styles.bubbleText,
                m.role === "user" ? styles.bubbleTextUser : styles.bubbleTextAssistant
              ]}>{m.content}</Text>
              {/* Play button for assistant messages */}
              {m.role === "assistant" && (
                <TouchableOpacity
                  style={styles.replayBtn}
                  onPress={() => playTTS(m.content)}
                >
                  <Text style={styles.replayText}>▶ Nochmal hören</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {/* Loading */}
        {isLoading && (
          <View style={[styles.bubbleRow, styles.bubbleRowAssistant]}>
            <View style={styles.avatarDot}><Text style={{ fontSize: 14 }}>🤖</Text></View>
            <View style={[styles.bubble, styles.bubbleAssistant]}>
              <ActivityIndicator size="small" color={C.gold} />
            </View>
          </View>
        )}

        {/* Corrections */}
        {corrections.length > 0 && (
          <View style={styles.correctionsBox}>
            <Text style={styles.correctionsHeader}>📝 Korrekturen</Text>
            {corrections.map((c, i) => (
              <View key={i} style={styles.correctionItem}>
                <View style={styles.correctionRow}>
                  <Text style={styles.correctionOriginal}>✗ {c.original}</Text>
                  <Text style={styles.correctionArrow}>→</Text>
                  <Text style={styles.correctionFixed}>✓ {c.corrected}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleCorrection(i)}>
                  <Text style={styles.correctionToggle}>
                    {expandedCorrections.has(i) ? "▲ Erklärung verbergen" : "▼ Grammatik erklären"}
                  </Text>
                </TouchableOpacity>
                {expandedCorrections.has(i) && (
                  <Text style={styles.correctionExplanation}>{c.explanation}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Error */}
        {micError && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️ {micError}</Text>
            <TouchableOpacity onPress={() => setMicError(null)}>
              <Text style={{ color: C.red, fontSize: 12, marginTop: 4 }}>Schließen</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* ─── VOICE MODE ─── */}
      {mode === "voice" && (
        <View style={styles.voiceFooter}>
          <Text style={styles.voiceHint}>
            {isRecording ? "🔴 Aufnahme läuft... Loslassen zum Senden" : "Gedrückt halten und sprechen"}
          </Text>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <Pressable
              style={[styles.micBtn, isRecording && styles.micBtnActive]}
              onPressIn={startRecording}
              onPressOut={stopRecordingAndSend}
              disabled={isLoading}
            >
              {isLoading
                ? <ActivityIndicator color={C.navy} size="large" />
                : <Text style={styles.micIcon}>{isRecording ? "🔴" : "🎙️"}</Text>
              }
            </Pressable>
          </Animated.View>
        </View>
      )}

      {/* ─── TEXT MODE ─── */}
      {mode === "text" && (
        <View style={styles.textFooter}>
          <View style={styles.textInputRow}>
            <View style={styles.textInputBox}>
              <Text
                style={styles.textInputField}
                onPress={() => {}} // handled below via TextInput
              />
            </View>
          </View>
          {/* Simple text input */}
          <View style={styles.textFooterInner}>
            <TouchableOpacity
              style={styles.textSendBtn}
              onPress={sendText}
              disabled={isLoading || !textInput.trim()}
            >
              <Text style={styles.textSendText}>Senden ↗</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* TEXT MODE - proper input */}
      {mode === "text" && (
        <View style={[styles.textFooter, { position: "absolute", bottom: 0, left: 0, right: 0 }]}>
          <View style={styles.textInputRow}>
            <View style={[styles.textInputBox, { flex: 1 }]}>
              <Text
                style={[styles.textInputField, { color: textInput ? C.white : C.muted }]}
                numberOfLines={1}
              >
                {textInput || "Schreib auf Deutsch..."}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.textSendBtn, (!textInput.trim() || isLoading) && { opacity: 0.4 }]}
              onPress={sendText}
              disabled={isLoading || !textInput.trim()}
            >
              {isLoading
                ? <ActivityIndicator size="small" color={C.navy} />
                : <Text style={styles.textSendText}>↗</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: C.navy },
  header:           { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 14, paddingBottom: 14 },
  backText:         { color: C.gold, fontSize: 16, fontWeight: "600" },
  headerTitle:      { color: C.white, fontSize: 15, fontWeight: "700" },
  modeToggle:       { width: 40, height: 40, borderRadius: 12, backgroundColor: C.navy2, borderWidth: 1, borderColor: C.border, alignItems: "center", justifyContent: "center" },
  modeToggleText:   { fontSize: 18 },

  // Topic selection
  topicHeading:     { color: C.white, fontSize: 24, fontWeight: "900", letterSpacing: -0.5 },
  topicSub:         { color: C.muted, fontSize: 14 },
  topicCard:        { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: C.navy2, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 18 },
  topicEmoji:       { fontSize: 30 },
  topicLabel:       { color: C.white, fontSize: 18, fontWeight: "800" },
  topicPrompt:      { color: C.muted, fontSize: 13, marginTop: 2 },

  // Welcome
  welcomeBox:       { backgroundColor: C.navy2, borderRadius: 20, borderWidth: 1, borderColor: C.goldBorder, padding: 24, alignItems: "center", gap: 10 },
  welcomeEmoji:     { fontSize: 40 },
  welcomeTitle:     { color: C.white, fontSize: 18, fontWeight: "800", textAlign: "center" },
  welcomeText:      { color: C.muted, fontSize: 14, textAlign: "center", lineHeight: 22 },

  // Chat bubbles
  bubbleRow:        { flexDirection: "row", alignItems: "flex-end", gap: 8 },
  bubbleRowUser:    { justifyContent: "flex-end" },
  bubbleRowAssistant: { justifyContent: "flex-start" },
  avatarDot:        { width: 32, height: 32, borderRadius: 16, backgroundColor: C.navy2, borderWidth: 1, borderColor: C.border, alignItems: "center", justifyContent: "center" },
  bubble:           { maxWidth: "78%", borderRadius: 18, padding: 14 },
  bubbleUser:       { backgroundColor: C.goldBg, borderWidth: 1, borderColor: C.goldBorder, borderBottomRightRadius: 4 },
  bubbleAssistant:  { backgroundColor: C.navy2, borderWidth: 1, borderColor: C.border, borderBottomLeftRadius: 4 },
  bubbleText:       { fontSize: 15, lineHeight: 22 },
  bubbleTextUser:   { color: C.white },
  bubbleTextAssistant: { color: C.text },
  replayBtn:        { marginTop: 8, alignSelf: "flex-start" },
  replayText:       { color: C.gold, fontSize: 12, fontWeight: "600" },

  // Corrections
  correctionsBox:   { backgroundColor: C.navy2, borderRadius: 16, borderWidth: 1, borderColor: C.redBorder, padding: 16, gap: 10 },
  correctionsHeader:{ color: C.red, fontSize: 12, fontWeight: "800", letterSpacing: 1.5 },
  correctionItem:   { gap: 6 },
  correctionRow:    { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 6 },
  correctionOriginal: { color: C.red, fontSize: 13, textDecorationLine: "line-through" },
  correctionArrow:  { color: C.muted, fontSize: 13 },
  correctionFixed:  { color: C.green, fontSize: 13, fontWeight: "700" },
  correctionToggle: { color: C.gold, fontSize: 12 },
  correctionExplanation: { color: C.muted, fontSize: 13, lineHeight: 20, fontStyle: "italic", paddingLeft: 8, borderLeftWidth: 2, borderLeftColor: C.goldBorder },

  // Error
  errorBox:         { backgroundColor: C.redBg, borderRadius: 12, borderWidth: 1, borderColor: C.redBorder, padding: 14 },
  errorText:        { color: C.red, fontSize: 13 },

  // Voice footer
  voiceFooter:      { alignItems: "center", paddingVertical: 20, paddingBottom: Platform.OS === "ios" ? 44 : 24, gap: 16, backgroundColor: C.navy, borderTopWidth: 1, borderTopColor: C.border },
  voiceHint:        { color: C.muted, fontSize: 13 },
  micBtn:           { width: 88, height: 88, borderRadius: 44, backgroundColor: C.goldBg, borderWidth: 2, borderColor: C.gold, alignItems: "center", justifyContent: "center" },
  micBtnActive:     { backgroundColor: C.redBg, borderColor: C.red },
  micIcon:          { fontSize: 38 },

  // Text footer
  textFooter:       { backgroundColor: C.navy, borderTopWidth: 1, borderTopColor: C.border, padding: 12, paddingBottom: Platform.OS === "ios" ? 40 : 16 },
  textInputRow:     { flexDirection: "row", gap: 10, alignItems: "center" },
  textInputBox:     { flex: 1, backgroundColor: C.navy2, borderRadius: 14, borderWidth: 1, borderColor: C.border, paddingHorizontal: 16, paddingVertical: 12, minHeight: 48 },
  textInputField:   { color: C.white, fontSize: 15 },
  textSendBtn:      { width: 48, height: 48, borderRadius: 14, backgroundColor: C.gold, alignItems: "center", justifyContent: "center" },
  textSendText:     { color: C.navy, fontSize: 16, fontWeight: "800" },
  textFooterInner:  { display: "none" },
});
