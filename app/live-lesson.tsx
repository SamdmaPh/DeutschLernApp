import React, { useState, useRef } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, StatusBar, Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ElevenLabs, VOICES } from "../services/elevenlabs";
import { Progress } from "../services/progress";
import { C, SAFE_TOP, SERIF } from "../theme";

// ═══ ALL CONVERSATION SCENARIOS ═══
const SCENARIOS: {
  id: string;
  title: string;
  emoji: string;
  level: string;
  situation: string;
  character: string;
  voiceId: string;
  steps: { npc: string; translation: string; hint: string; suggest: string; suggestTranslation: string }[];
}[] = [
  // A1 Scenarios
  {
    id: "taxi", title: "Taking a Taxi", emoji: "🚕", level: "A1",
    situation: "You just arrived at Berlin airport. Get a taxi to your hostel.",
    character: "Klaus (Taxi driver)", voiceId: VOICES.male,
    steps: [
      { npc: "Guten Tag!", translation: "Good day!", hint: "He's greeting you. Say 'Good day!' back.", suggest: "Guten Tag!", suggestTranslation: "Good day!" },
      { npc: "Wohin möchten Sie?", translation: "Where would you like to go?", hint: "He's asking where to go. Say 'To the hostel, please.'", suggest: "Zum Hostel, bitte.", suggestTranslation: "To the hostel, please." },
      { npc: "Alles klar! Willkommen in Berlin!", translation: "Got it! Welcome to Berlin!", hint: "'Willkommen' = 'welcome'. Say thank you!", suggest: "Danke!", suggestTranslation: "Thank you!" },
      { npc: "Sprechen Sie Deutsch?", translation: "Do you speak German?", hint: "He asks if you speak German. Say 'A little bit.'", suggest: "Ein bisschen.", suggestTranslation: "A little bit." },
      { npc: "Sehr gut! Berlin ist toll!", translation: "Very good! Berlin is great!", hint: "'Sehr gut' = 'Very good'. 'Toll' = 'great'. Say thanks!", suggest: "Danke schön!", suggestTranslation: "Thank you very much!" },
    ],
  },
  {
    id: "hostel", title: "Hotel Check-in", emoji: "🏨", level: "A1",
    situation: "You arrive at your hostel. Check in at the reception.",
    character: "Frau Weber (Receptionist)", voiceId: VOICES.female,
    steps: [
      { npc: "Guten Abend!", translation: "Good evening!", hint: "It's evening. Say 'Good evening!' back.", suggest: "Guten Abend!", suggestTranslation: "Good evening!" },
      { npc: "Haben Sie eine Reservierung?", translation: "Do you have a reservation?", hint: "'Haben Sie' = 'Do you have'. Say 'Yes.'", suggest: "Ja.", suggestTranslation: "Yes." },
      { npc: "Ihr Name?", translation: "Your name?", hint: "She wants your name. Say 'My name is...'", suggest: "Mein Name ist...", suggestTranslation: "My name is..." },
      { npc: "Zimmer 204. Hier ist Ihr Schlüssel.", translation: "Room 204. Here is your key.", hint: "'Schlüssel' = 'key'. Ask about WiFi.", suggest: "Haben Sie WLAN?", suggestTranslation: "Do you have WiFi?" },
      { npc: "Ja! Das Passwort ist 'Berlin2024'.", translation: "Yes! The password is 'Berlin2024'.", hint: "She gave you the WiFi password. Say thanks!", suggest: "Danke schön!", suggestTranslation: "Thank you very much!" },
    ],
  },
  {
    id: "cafe", title: "Ordering Coffee", emoji: "☕", level: "A1",
    situation: "You walk into a Berlin café. Order a coffee and cake.",
    character: "Lena (Waitress)", voiceId: VOICES.female,
    steps: [
      { npc: "Hallo! Was möchten Sie?", translation: "Hello! What would you like?", hint: "She's asking what you want. Say 'I would like a coffee.'", suggest: "Ich möchte einen Kaffee, bitte.", suggestTranslation: "I would like a coffee, please." },
      { npc: "Groß oder klein?", translation: "Large or small?", hint: "'Groß' = large, 'klein' = small. Choose one!", suggest: "Klein, bitte.", suggestTranslation: "Small, please." },
      { npc: "Möchten Sie auch Kuchen?", translation: "Would you also like cake?", hint: "'Kuchen' = cake. Say yes or no!", suggest: "Ja, bitte!", suggestTranslation: "Yes, please!" },
      { npc: "Das macht 7 Euro 50.", translation: "That's 7 euros 50.", hint: "She told you the price. Hand over the money.", suggest: "Hier, bitte.", suggestTranslation: "Here, please." },
      { npc: "Danke! Guten Appetit!", translation: "Thanks! Enjoy your meal!", hint: "'Guten Appetit' = 'Enjoy!' Say thank you!", suggest: "Danke!", suggestTranslation: "Thanks!" },
    ],
  },
  {
    id: "market", title: "At the Market", emoji: "🐟", level: "A1",
    situation: "Sunday morning at Hamburg fish market. Buy some food.",
    character: "Herr Fischer (Vendor)", voiceId: VOICES.male,
    steps: [
      { npc: "Guten Morgen! Frischer Fisch!", translation: "Good morning! Fresh fish!", hint: "'Guten Morgen' = 'Good morning'. Greet him back!", suggest: "Guten Morgen!", suggestTranslation: "Good morning!" },
      { npc: "Was möchten Sie?", translation: "What would you like?", hint: "Ask how much the salmon costs.", suggest: "Was kostet der Lachs?", suggestTranslation: "How much is the salmon?" },
      { npc: "12 Euro das Kilo.", translation: "12 euros per kilo.", hint: "Ask for half a kilo.", suggest: "Ein halbes Kilo, bitte.", suggestTranslation: "Half a kilo, please." },
      { npc: "Sonst noch etwas?", translation: "Anything else?", hint: "'Sonst noch etwas' = 'Anything else?' Say 'No, thanks.'", suggest: "Nein, danke.", suggestTranslation: "No, thanks." },
      { npc: "6 Euro. Danke und guten Appetit!", translation: "6 euros. Thanks and enjoy!", hint: "Pay and say thanks!", suggest: "Danke schön!", suggestTranslation: "Thank you!" },
    ],
  },
  {
    id: "train", title: "Buying a Train Ticket", emoji: "🚂", level: "A1",
    situation: "You're at Hamburg station. Buy a ticket to Dresden.",
    character: "Ticket Agent", voiceId: VOICES.female,
    steps: [
      { npc: "Guten Tag! Kann ich Ihnen helfen?", translation: "Good day! Can I help you?", hint: "She asks if she can help. Ask for a ticket to Dresden.", suggest: "Eine Fahrkarte nach Dresden, bitte.", suggestTranslation: "A ticket to Dresden, please." },
      { npc: "Hin und zurück?", translation: "Round trip?", hint: "'Hin und zurück' = round trip. 'Nur hin' = one way.", suggest: "Nur hin, bitte.", suggestTranslation: "One way, please." },
      { npc: "54 Euro. Gleis 7.", translation: "54 euros. Platform 7.", hint: "She told you the price and platform. Say thanks!", suggest: "Danke!", suggestTranslation: "Thanks!" },
      { npc: "Gute Reise!", translation: "Have a good trip!", hint: "'Gute Reise' = 'Have a good trip.' Say thanks!", suggest: "Danke schön!", suggestTranslation: "Thank you very much!" },
    ],
  },
];

export default function LiveLessonScreen() {
  const { scenarioId } = useLocalSearchParams();
  const router = useRouter();

  // If no scenario selected, show picker
  const [selectedId, setSelectedId] = useState<string | null>(scenarioId as string || null);
  const [currentStep, setCurrentStep] = useState(0);
  const [phase, setPhase] = useState<"npc" | "hint" | "respond" | "feedback">("npc");
  const [userInput, setUserInput] = useState("");
  const [xp, setXp] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [history, setHistory] = useState<{ speaker: string; text: string; translation: string }[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  const scenario = SCENARIOS.find(s => s.id === selectedId);

  // ═══ SCENARIO PICKER ═══
  if (!scenario) {
    return (
      <View style={s.root}>
        <StatusBar barStyle="dark-content" />
        <View style={{ height: SAFE_TOP }} />
        <View style={s.pickerHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={s.closeBtn}>✕</Text>
          </TouchableOpacity>
          <Text style={s.pickerTitle}>Live Conversations</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.pickerScroll}>
          <Text style={s.pickerSubtitle}>Choose a situation and practice speaking German with a real character.</Text>

          {/* Level filter */}
          <Text style={s.pickerLevel}>A1 — BEGINNER</Text>

          {SCENARIOS.map(sc => (
            <TouchableOpacity key={sc.id} style={s.scenarioCard} onPress={() => setSelectedId(sc.id)} activeOpacity={0.8}>
              <Text style={s.scenarioEmoji}>{sc.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.scenarioTitle}>{sc.title}</Text>
                <Text style={s.scenarioDesc}>{sc.situation}</Text>
                <Text style={s.scenarioChar}>🎭 {sc.character}</Text>
              </View>
              <Text style={{ color: C.gold, fontSize: 18 }}>→</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  // ═══ LIVE CONVERSATION ═══
  const step = scenario.steps[currentStep];
  const totalSteps = scenario.steps.length;
  const isFinished = currentStep >= totalSteps;

  const playNpcLine = async () => {
    if (!step) return;
    setIsPlaying(true);
    setPhase("npc");
    setHistory(h => [...h, { speaker: scenario.character, text: step.npc, translation: step.translation }]);
    await ElevenLabs.playText(step.npc, scenario.voiceId);
    setIsPlaying(false);
    setTimeout(() => setPhase("hint"), 500);
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const handleRespond = () => {
    if (!step) return;
    const response = userInput.trim() || step.suggest;
    setHistory(h => [...h, { speaker: "You", text: response, translation: step.suggestTranslation }]);
    setUserInput("");
    setXp(x => x + 10);
    setPhase("feedback");
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setPhase("npc");
      setTimeout(() => playNpcLine(), 800);
    } else {
      setCurrentStep(totalSteps);
    }
  };

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: SAFE_TOP }} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => { setSelectedId(null); setCurrentStep(0); setHistory([]); setXp(0); setPhase("npc"); }}>
          <Text style={s.closeBtn}>✕</Text>
        </TouchableOpacity>
        <View style={s.progressTrack}>
          <View style={[s.progressFill, { width: `${(Math.min(currentStep + 1, totalSteps) / totalSteps) * 100}%` }]} />
        </View>
        <View style={s.xpBadge}><Text style={s.xpBadgeText}>⚡{xp}</Text></View>
      </View>

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Intro */}
        {history.length === 0 && !isFinished && (
          <View style={s.introCard}>
            <Text style={s.introEmoji}>{scenario.emoji}</Text>
            <Text style={s.introLabel}>LIVE CONVERSATION</Text>
            <Text style={s.introTitle}>{scenario.title}</Text>
            <Text style={s.introCharacter}>🎭 {scenario.character}</Text>
            <Text style={s.introSituation}>{scenario.situation}</Text>
            <View style={s.introTip}>
              <Text style={s.introTipText}>💡 They'll speak German. You'll get English hints to help you respond. Listen, understand, and speak!</Text>
            </View>
            <TouchableOpacity style={s.startBtn} onPress={playNpcLine} activeOpacity={0.85}>
              <Text style={s.startBtnText}>Start Conversation 🎤</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Chat history */}
        {history.map((msg, i) => (
          <View key={i} style={msg.speaker === "You" ? s.userWrap : s.npcWrap}>
            <View style={msg.speaker === "You" ? s.userBubble : s.npcBubble}>
              <Text style={s.bubbleSpeaker}>{msg.speaker}</Text>
              <Text style={[s.bubbleText, msg.speaker === "You" && { color: "#fff" }]}>{msg.text}</Text>
              <Text style={[s.bubbleTranslation, msg.speaker === "You" && { color: "rgba(255,255,255,0.7)" }]}>{msg.translation}</Text>
            </View>
          </View>
        ))}

        {/* Playing indicator */}
        {isPlaying && <Text style={s.playingText}>🔊 {scenario.character} is speaking...</Text>}

        {/* Hint + input */}
        {!isFinished && step && phase === "hint" && (
          <View style={s.hintCard}>
            <Text style={s.hintIcon}>💡</Text>
            <Text style={s.hintText}>{step.hint}</Text>

            <View style={s.suggestCard}>
              <Text style={s.suggestLabel}>YOU COULD SAY:</Text>
              <TouchableOpacity style={s.suggestBtn} onPress={() => setUserInput(step.suggest)}>
                <Text style={s.suggestGerman}>{step.suggest}</Text>
                <Text style={s.suggestEnglish}>{step.suggestTranslation}</Text>
              </TouchableOpacity>
            </View>

            <View style={s.inputRow}>
              <TextInput style={s.input} value={userInput} onChangeText={setUserInput} placeholder="Type in German or tap suggestion..." placeholderTextColor={C.muted} onSubmitEditing={handleRespond} />
              <TouchableOpacity style={s.sendBtn} onPress={handleRespond}>
                <Text style={s.sendText}>→</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Feedback */}
        {!isFinished && phase === "feedback" && (
          <View style={s.feedbackCard}>
            <Text style={s.feedbackEmoji}>✅</Text>
            <Text style={s.feedbackText}>Great! +10 XP</Text>
            <TouchableOpacity style={s.nextStepBtn} onPress={nextStep}>
              <Text style={s.nextStepText}>{currentStep < totalSteps - 1 ? "Continue →" : "Finish! →"}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Finished */}
        {isFinished && (
          <View style={s.finishCard}>
            <Text style={{ fontSize: 56, marginBottom: 12 }}>🎉</Text>
            <Text style={s.finishTitle}>Conversation Complete!</Text>
            <Text style={s.finishSub}>You talked to {scenario.character} in German!</Text>
            <View style={s.finishStats}>
              <View style={s.finishStat}><Text style={s.finishStatNum}>{xp + 50}</Text><Text style={s.finishStatLabel}>XP</Text></View>
              <View style={s.finishStat}><Text style={s.finishStatNum}>{totalSteps}</Text><Text style={s.finishStatLabel}>Exchanges</Text></View>
            </View>
            <TouchableOpacity style={s.finishBtn} onPress={async () => { await Progress.addXP(xp + 50); setSelectedId(null); setCurrentStep(0); setHistory([]); setXp(0); setPhase("npc"); }}>
              <Text style={s.finishBtnText}>Try another conversation →</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
              <Text style={s.backBtnText}>← Back to home</Text>
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

  // Picker
  pickerHeader: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 12, gap: 12 },
  pickerTitle: { fontFamily: SERIF, fontSize: 22, fontWeight: "700", color: C.text },
  pickerScroll: { paddingHorizontal: 20, paddingBottom: 40 },
  pickerSubtitle: { fontSize: 14, color: C.muted, lineHeight: 20, marginBottom: 20 },
  pickerLevel: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 12 },
  scenarioCard: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 16, marginBottom: 10 },
  scenarioEmoji: { fontSize: 32 },
  scenarioTitle: { fontSize: 16, fontWeight: "700", color: C.text },
  scenarioDesc: { fontSize: 13, color: C.muted, marginTop: 2, lineHeight: 18 },
  scenarioChar: { fontSize: 12, color: C.gold, fontWeight: "600", marginTop: 6 },

  // Intro
  introCard: { alignItems: "center", paddingVertical: 24 },
  introEmoji: { fontSize: 56, marginBottom: 8 },
  introLabel: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2 },
  introTitle: { fontFamily: SERIF, fontSize: 24, fontWeight: "700", color: C.text, marginTop: 8 },
  introCharacter: { fontSize: 14, color: C.gold, fontWeight: "600", marginTop: 8 },
  introSituation: { fontSize: 15, color: C.muted, textAlign: "center", lineHeight: 22, marginTop: 8, paddingHorizontal: 10 },
  introTip: { backgroundColor: C.goldDim, borderRadius: 14, padding: 16, marginTop: 16 },
  introTipText: { fontSize: 13, color: C.gold, lineHeight: 20, textAlign: "center" },
  startBtn: { backgroundColor: C.gold, borderRadius: 16, paddingVertical: 18, paddingHorizontal: 40, marginTop: 20 },
  startBtnText: { fontSize: 17, fontWeight: "800", color: "#fff" },

  // Bubbles
  npcWrap: { alignItems: "flex-start", marginBottom: 10 },
  userWrap: { alignItems: "flex-end", marginBottom: 10 },
  npcBubble: { backgroundColor: C.card, borderRadius: 18, borderTopLeftRadius: 4, borderWidth: 1, borderColor: C.border, padding: 16, maxWidth: "85%" },
  userBubble: { backgroundColor: C.gold, borderRadius: 18, borderTopRightRadius: 4, padding: 16, maxWidth: "85%" },
  bubbleSpeaker: { fontSize: 10, fontWeight: "800", color: C.muted, marginBottom: 4 },
  bubbleText: { fontSize: 17, fontWeight: "600", color: C.text, lineHeight: 24 },
  bubbleTranslation: { fontSize: 13, color: C.muted, marginTop: 6, fontStyle: "italic" },

  playingText: { fontSize: 14, color: C.gold, fontWeight: "600", textAlign: "center", paddingVertical: 8 },

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
  sendBtn: { width: 50, height: 50, borderRadius: 14, backgroundColor: C.gold, alignItems: "center", justifyContent: "center" },
  sendText: { fontSize: 22, fontWeight: "800", color: "#fff" },

  // Feedback
  feedbackCard: { alignItems: "center", paddingVertical: 16 },
  feedbackEmoji: { fontSize: 32, marginBottom: 4 },
  feedbackText: { fontSize: 16, fontWeight: "700", color: C.green },
  nextStepBtn: { backgroundColor: C.gold, borderRadius: 14, paddingVertical: 16, paddingHorizontal: 32, marginTop: 12 },
  nextStepText: { fontSize: 15, fontWeight: "800", color: "#fff" },

  // Finish
  finishCard: { alignItems: "center", paddingVertical: 24 },
  finishTitle: { fontFamily: SERIF, fontSize: 26, fontWeight: "700", color: C.text },
  finishSub: { fontSize: 15, color: C.muted, marginTop: 8, textAlign: "center" },
  finishStats: { flexDirection: "row", gap: 32, marginTop: 20 },
  finishStat: { alignItems: "center" },
  finishStatNum: { fontSize: 28, fontWeight: "900", color: C.gold },
  finishStatLabel: { fontSize: 12, color: C.muted, marginTop: 4 },
  finishBtn: { backgroundColor: C.gold, borderRadius: 16, paddingVertical: 18, paddingHorizontal: 32, marginTop: 24 },
  finishBtnText: { fontSize: 16, fontWeight: "800", color: "#fff" },
  backBtn: { marginTop: 12 },
  backBtnText: { fontSize: 14, color: C.muted, fontWeight: "600" },
});
