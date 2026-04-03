import React, { useState, useRef } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, StatusBar, Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ElevenLabs, CHARACTER_VOICES, VOICES } from "../services/elevenlabs";
import { AI, ChatMessage } from "../services/ai";
import { Progress } from "../services/progress";
import { C, SAFE_TOP, SERIF } from "../theme";

// Lesson scripts — what the NPC says and what hints the user gets
const LESSON_SCRIPTS: Record<string, {
  character: string;
  characterEmoji: string;
  voiceId: string;
  situation: string;
  steps: { npc: string; translation: string; hint: string; suggestedResponse: string; responseTranslation: string }[];
}> = {
  "a1-0-1": {
    character: "Klaus (Taxi driver)",
    characterEmoji: "🚕",
    voiceId: VOICES.male,
    situation: "You just landed at Berlin airport. Find a taxi and tell the driver where to go.",
    steps: [
      {
        npc: "Guten Tag!",
        translation: "Good day!",
        hint: "He's greeting you. Say 'Good day!' back in German.",
        suggestedResponse: "Guten Tag!",
        responseTranslation: "Good day!",
      },
      {
        npc: "Wohin möchten Sie?",
        translation: "Where would you like to go?",
        hint: "He's asking where you want to go. Tell him: 'To the hostel, please.'",
        suggestedResponse: "Zum Hostel, bitte.",
        responseTranslation: "To the hostel, please.",
      },
      {
        npc: "Alles klar! Willkommen in Berlin!",
        translation: "Got it! Welcome to Berlin!",
        hint: "'Willkommen' means 'welcome'. Say 'thank you!'",
        suggestedResponse: "Danke!",
        responseTranslation: "Thank you!",
      },
      {
        npc: "Sprechen Sie Deutsch?",
        translation: "Do you speak German?",
        hint: "He's asking if you speak German. Say 'A little bit.'",
        suggestedResponse: "Ein bisschen.",
        responseTranslation: "A little bit.",
      },
      {
        npc: "Sehr gut! Berlin ist toll!",
        translation: "Very good! Berlin is great!",
        hint: "'Sehr gut' = 'Very good'. 'Toll' = 'great'. Say 'thank you very much!'",
        suggestedResponse: "Danke schön!",
        responseTranslation: "Thank you very much!",
      },
    ],
  },
  "a1-0-2": {
    character: "Frau Weber (Receptionist)",
    characterEmoji: "🏨",
    voiceId: VOICES.female,
    situation: "You arrive at your hostel. Check in at the reception.",
    steps: [
      {
        npc: "Guten Abend!",
        translation: "Good evening!",
        hint: "It's evening. Greet her back with 'Good evening!'",
        suggestedResponse: "Guten Abend!",
        responseTranslation: "Good evening!",
      },
      {
        npc: "Haben Sie eine Reservierung?",
        translation: "Do you have a reservation?",
        hint: "'Haben Sie' = 'Do you have'. Say 'Yes.'",
        suggestedResponse: "Ja.",
        responseTranslation: "Yes.",
      },
      {
        npc: "Ihr Name?",
        translation: "Your name?",
        hint: "She's asking your name. Just say your name!",
        suggestedResponse: "Mein Name ist...",
        responseTranslation: "My name is...",
      },
      {
        npc: "Zimmer 204. Hier ist Ihr Schlüssel.",
        translation: "Room 204. Here is your key.",
        hint: "'Schlüssel' = 'key'. Ask if they have WiFi.",
        suggestedResponse: "Haben Sie WLAN?",
        responseTranslation: "Do you have WiFi?",
      },
      {
        npc: "Ja! Das Passwort ist 'Berlin2024'.",
        translation: "Yes! The password is 'Berlin2024'.",
        hint: "She told you the WiFi password. Say 'Thank you very much!'",
        suggestedResponse: "Danke schön!",
        responseTranslation: "Thank you very much!",
      },
    ],
  },
};

export default function LiveLessonScreen() {
  const { lessonId } = useLocalSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [phase, setPhase] = useState<"npc" | "hint" | "respond" | "feedback">("npc");
  const [userInput, setUserInput] = useState("");
  const [xp, setXp] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [history, setHistory] = useState<{ speaker: string; text: string; translation: string }[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  const script = LESSON_SCRIPTS[lessonId as string];
  if (!script) {
    return (
      <View style={s.center}>
        <Text style={s.errorText}>Live lesson not available yet</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.errorLink}>← Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const step = script.steps[currentStep];
  const totalSteps = script.steps.length;
  const isFinished = currentStep >= totalSteps;

  // Play NPC line with ElevenLabs
  const playNpcLine = async () => {
    if (!step) return;
    setIsPlaying(true);
    setPhase("npc");
    setShowTranslation(false);

    // Add to history
    setHistory(h => [...h, { speaker: script.character, text: step.npc, translation: step.translation }]);

    // Play audio
    await ElevenLabs.playText(step.npc, script.voiceId);
    setIsPlaying(false);

    // Show hint after NPC speaks
    setTimeout(() => setPhase("hint"), 500);
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  // Handle user response
  const handleRespond = () => {
    if (!step) return;
    const response = userInput.trim() || step.suggestedResponse;

    // Add user response to history
    setHistory(h => [...h, { speaker: "You", text: response, translation: step.responseTranslation }]);
    setUserInput("");
    setXp(x => x + 10);
    setPhase("feedback");
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  // Move to next step
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setPhase("npc");
      setShowTranslation(false);
      // Auto-play next NPC line after short delay
      setTimeout(() => {
        playNpcLine();
      }, 800);
    } else {
      setCurrentStep(totalSteps); // finished
    }
  };

  // Start the conversation
  const startConversation = () => {
    playNpcLine();
  };

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: SAFE_TOP }} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.closeBtn}>✕</Text>
        </TouchableOpacity>
        <View style={s.progressTrack}>
          <View style={[s.progressFill, { width: `${((currentStep + 1) / totalSteps) * 100}%` }]} />
        </View>
        <View style={s.xpBadge}><Text style={s.xpBadgeText}>⚡{xp}</Text></View>
      </View>

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Character intro */}
        {history.length === 0 && !isFinished && (
          <View style={s.introCard}>
            <Text style={s.introEmoji}>{script.characterEmoji}</Text>
            <Text style={s.introTitle}>Live Conversation</Text>
            <Text style={s.introCharacter}>{script.character}</Text>
            <Text style={s.introSituation}>{script.situation}</Text>
            <View style={s.introTip}>
              <Text style={s.introTipText}>💡 {script.character} will speak German. You'll get English hints to help you respond. Listen, understand, and speak!</Text>
            </View>
            <TouchableOpacity style={s.startBtn} onPress={startConversation} activeOpacity={0.85}>
              <Text style={s.startBtnText}>Start Conversation 🎤</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Conversation history */}
        {history.map((msg, i) => (
          <View key={i} style={msg.speaker === "You" ? s.userBubbleWrap : s.npcBubbleWrap}>
            <View style={msg.speaker === "You" ? s.userBubble : s.npcBubble}>
              <Text style={s.bubbleSpeaker}>{msg.speaker}</Text>
              <Text style={[s.bubbleText, msg.speaker === "You" && { color: "#fff" }]}>{msg.text}</Text>
              <Text style={[s.bubbleTranslation, msg.speaker === "You" && { color: "rgba(255,255,255,0.7)" }]}>{msg.translation}</Text>
            </View>
          </View>
        ))}

        {/* Current interaction */}
        {!isFinished && step && phase === "hint" && (
          <View style={s.hintCard}>
            <Text style={s.hintIcon}>💡</Text>
            <Text style={s.hintText}>{step.hint}</Text>

            {/* Suggested response */}
            <View style={s.suggestCard}>
              <Text style={s.suggestLabel}>YOU COULD SAY:</Text>
              <TouchableOpacity style={s.suggestBtn} onPress={() => setUserInput(step.suggestedResponse)}>
                <Text style={s.suggestGerman}>{step.suggestedResponse}</Text>
                <Text style={s.suggestEnglish}>{step.responseTranslation}</Text>
              </TouchableOpacity>
            </View>

            {/* Input area */}
            <View style={s.inputRow}>
              <TextInput
                style={s.input}
                value={userInput}
                onChangeText={setUserInput}
                placeholder="Type or use suggestion..."
                placeholderTextColor={C.muted}
                onSubmitEditing={handleRespond}
              />
              {/* Mic button */}
              <TouchableOpacity style={s.micBtn} onPress={() => {
                if (typeof window !== "undefined" && (window as any).webkitSpeechRecognition) {
                  const SR = (window as any).webkitSpeechRecognition;
                  const recognition = new SR();
                  recognition.lang = "de-DE";
                  recognition.onresult = (event: any) => setUserInput(event.results[0][0].transcript);
                  recognition.start();
                }
              }}>
                <Text style={s.micText}>🎤</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.sendBtn} onPress={handleRespond}>
                <Text style={s.sendText}>→</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Feedback after response */}
        {!isFinished && phase === "feedback" && (
          <View style={s.feedbackCard}>
            <Text style={s.feedbackEmoji}>✅</Text>
            <Text style={s.feedbackText}>Great! +10 XP</Text>
            <TouchableOpacity style={s.nextStepBtn} onPress={nextStep}>
              <Text style={s.nextStepText}>{currentStep < totalSteps - 1 ? "Continue conversation →" : "Finish! →"}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* NPC speaking indicator */}
        {isPlaying && (
          <View style={s.playingCard}>
            <Text style={s.playingText}>🔊 {script.character} is speaking...</Text>
          </View>
        )}

        {/* Finished */}
        {isFinished && (
          <View style={s.finishCard}>
            <Text style={{ fontSize: 56, marginBottom: 12 }}>🎉</Text>
            <Text style={s.finishTitle}>Conversation Complete!</Text>
            <Text style={s.finishSub}>You just talked to {script.character} in German!</Text>
            <View style={s.finishStats}>
              <View style={s.finishStat}>
                <Text style={s.finishStatNum}>{xp + 50}</Text>
                <Text style={s.finishStatLabel}>XP earned</Text>
              </View>
              <View style={s.finishStat}>
                <Text style={s.finishStatNum}>{totalSteps}</Text>
                <Text style={s.finishStatLabel}>Exchanges</Text>
              </View>
            </View>
            <TouchableOpacity style={s.finishBtn} onPress={async () => {
              await Progress.addXP(xp + 50);
              router.back();
            }}>
              <Text style={s.finishBtnText}>Continue your journey →</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  center: { flex: 1, backgroundColor: C.bg, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: C.red },
  errorLink: { color: C.gold, fontSize: 16, marginTop: 16 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 10, gap: 10 },
  closeBtn: { color: C.muted, fontSize: 22, width: 28 },
  progressTrack: { flex: 1, height: 8, backgroundColor: C.bg3, borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: C.gold, borderRadius: 4 },
  xpBadge: { backgroundColor: C.goldDim, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  xpBadgeText: { fontSize: 13, fontWeight: "800", color: C.gold },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },

  // Intro
  introCard: { alignItems: "center", paddingVertical: 32 },
  introEmoji: { fontSize: 56, marginBottom: 12 },
  introTitle: { fontSize: 12, fontWeight: "900", color: C.gold, letterSpacing: 2 },
  introCharacter: { fontFamily: SERIF, fontSize: 24, fontWeight: "700", color: C.text, marginTop: 8 },
  introSituation: { fontSize: 15, color: C.muted, textAlign: "center", lineHeight: 22, marginTop: 8, paddingHorizontal: 20 },
  introTip: { backgroundColor: C.goldDim, borderRadius: 14, padding: 16, marginTop: 20 },
  introTipText: { fontSize: 13, color: C.gold, lineHeight: 20, textAlign: "center" },
  startBtn: { backgroundColor: C.gold, borderRadius: 16, paddingVertical: 18, paddingHorizontal: 40, marginTop: 24 },
  startBtnText: { fontSize: 17, fontWeight: "800", color: "#fff" },

  // Bubbles
  npcBubbleWrap: { alignItems: "flex-start", marginBottom: 12 },
  userBubbleWrap: { alignItems: "flex-end", marginBottom: 12 },
  npcBubble: { backgroundColor: C.card, borderRadius: 18, borderTopLeftRadius: 4, borderWidth: 1, borderColor: C.border, padding: 16, maxWidth: "85%" },
  userBubble: { backgroundColor: C.gold, borderRadius: 18, borderTopRightRadius: 4, padding: 16, maxWidth: "85%" },
  bubbleSpeaker: { fontSize: 10, fontWeight: "800", color: C.muted, marginBottom: 4 },
  bubbleText: { fontSize: 17, fontWeight: "600", color: C.text, lineHeight: 24 },
  bubbleTranslation: { fontSize: 13, color: C.muted, marginTop: 6, fontStyle: "italic" },

  // Hint
  hintCard: { backgroundColor: C.card, borderRadius: 18, borderWidth: 1, borderColor: C.goldLine, padding: 20, marginTop: 8 },
  hintIcon: { fontSize: 20, marginBottom: 8 },
  hintText: { fontSize: 15, color: C.text, lineHeight: 22, marginBottom: 16 },
  suggestCard: { marginBottom: 16 },
  suggestLabel: { fontSize: 9, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 8 },
  suggestBtn: { backgroundColor: C.goldDim, borderRadius: 14, borderWidth: 1, borderColor: C.goldLine, padding: 16 },
  suggestGerman: { fontSize: 18, fontWeight: "700", color: C.text },
  suggestEnglish: { fontSize: 13, color: C.muted, marginTop: 4 },
  inputRow: { flexDirection: "row", gap: 8 },
  input: { flex: 1, backgroundColor: C.bg, borderRadius: 14, borderWidth: 1, borderColor: C.border, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: C.text },
  micBtn: { width: 50, height: 50, borderRadius: 14, backgroundColor: C.bg2, borderWidth: 1, borderColor: C.border, alignItems: "center", justifyContent: "center" },
  micText: { fontSize: 20 },
  sendBtn: { width: 50, height: 50, borderRadius: 14, backgroundColor: C.gold, alignItems: "center", justifyContent: "center" },
  sendText: { fontSize: 22, fontWeight: "800", color: "#fff" },

  // Feedback
  feedbackCard: { alignItems: "center", paddingVertical: 16 },
  feedbackEmoji: { fontSize: 32, marginBottom: 4 },
  feedbackText: { fontSize: 16, fontWeight: "700", color: C.green },
  nextStepBtn: { backgroundColor: C.gold, borderRadius: 14, paddingVertical: 16, paddingHorizontal: 32, marginTop: 12 },
  nextStepText: { fontSize: 15, fontWeight: "800", color: "#fff" },

  // Playing
  playingCard: { alignItems: "center", paddingVertical: 12 },
  playingText: { fontSize: 14, color: C.gold, fontWeight: "600" },

  // Finish
  finishCard: { alignItems: "center", paddingVertical: 32 },
  finishTitle: { fontFamily: SERIF, fontSize: 26, fontWeight: "700", color: C.text },
  finishSub: { fontSize: 15, color: C.muted, marginTop: 8, textAlign: "center" },
  finishStats: { flexDirection: "row", gap: 32, marginTop: 24 },
  finishStat: { alignItems: "center" },
  finishStatNum: { fontSize: 28, fontWeight: "900", color: C.gold },
  finishStatLabel: { fontSize: 12, color: C.muted, marginTop: 4 },
  finishBtn: { backgroundColor: C.gold, borderRadius: 16, paddingVertical: 18, paddingHorizontal: 40, marginTop: 28 },
  finishBtnText: { fontSize: 17, fontWeight: "800", color: "#fff" },
});
