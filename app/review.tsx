import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { SRS, SRSCard } from "../services/srs";
import { C, SAFE_TOP, SERIF } from "../theme";

export default function ReviewScreen() {
  const router = useRouter();
  const [cards, setCards] = useState<SRSCard[]>([]);
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [done, setDone] = useState(0);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    SRS.getDueCards().then(c => setCards(c));
  }, []);

  const card = cards[current];
  const total = cards.length;
  const finished = current >= total;

  const handleRate = async (quality: number) => {
    if (!card) return;
    await SRS.review(card.word, quality);
    if (quality >= 3) setCorrect(c => c + 1);
    setDone(d => d + 1);
    setCurrent(c => c + 1);
    setShowAnswer(false);
  };

  if (total === 0) {
    return (
      <View style={s.root}>
        <StatusBar barStyle="dark-content" />
        <View style={{ height: SAFE_TOP }} />
        <View style={s.emptyWrap}>
          <Text style={{ fontSize: 48, marginBottom: 16 }}>✅</Text>
          <Text style={s.emptyTitle}>No words to review!</Text>
          <Text style={s.emptyDesc}>Complete more lessons to add words to your review deck.</Text>
          <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
            <Text style={s.backBtnText}>← Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (finished) {
    return (
      <View style={s.root}>
        <StatusBar barStyle="dark-content" />
        <View style={{ height: SAFE_TOP }} />
        <View style={s.emptyWrap}>
          <Text style={{ fontSize: 48, marginBottom: 16 }}>🎉</Text>
          <Text style={s.emptyTitle}>Review Complete!</Text>
          <Text style={s.emptyDesc}>{correct} of {done} correct. See you tomorrow!</Text>
          <TouchableOpacity style={s.doneBtn} onPress={() => router.back()}>
            <Text style={s.doneBtnText}>Back to home →</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
          <View style={[s.progressFill, { width: `${(current / total) * 100}%` }]} />
        </View>
        <Text style={s.countText}>{current + 1}/{total}</Text>
      </View>

      {/* Card */}
      <View style={s.cardWrap}>
        <Text style={s.cardLabel}>DAILY REVIEW</Text>

        {/* Front: German word */}
        <View style={s.wordCard}>
          <Text style={s.word}>{card.word}</Text>
          <Text style={s.wordHint}>What does this mean?</Text>
        </View>

        {/* Reveal button / Answer */}
        {!showAnswer ? (
          <TouchableOpacity style={s.revealBtn} onPress={() => setShowAnswer(true)} activeOpacity={0.85}>
            <Text style={s.revealBtnText}>Show Answer</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <View style={s.answerCard}>
              <Text style={s.answerWord}>{card.word}</Text>
              <Text style={s.answerMeaning}>= {card.meaning}</Text>
            </View>

            <Text style={s.rateQuestion}>How well did you know this?</Text>

            <View style={s.rateButtons}>
              <TouchableOpacity style={[s.rateBtn, s.rateBtnWrong]} onPress={() => handleRate(1)}>
                <Text style={s.rateBtnWrongText}>❌ Didn't know</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.rateBtn, s.rateBtnOk]} onPress={() => handleRate(3)}>
                <Text style={s.rateBtnOkText}>🤔 Hesitated</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.rateBtn, s.rateBtnGood]} onPress={() => handleRate(5)}>
                <Text style={s.rateBtnGoodText}>✅ Knew it!</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  emptyWrap: { flex: 1, justifyContent: "center", alignItems: "center", padding: 40 },
  emptyTitle: { fontFamily: SERIF, fontSize: 24, fontWeight: "700", color: C.text, marginBottom: 8 },
  emptyDesc: { fontSize: 15, color: C.muted, textAlign: "center", lineHeight: 22 },
  backBtn: { marginTop: 24, backgroundColor: C.bg2, borderRadius: 14, paddingHorizontal: 24, paddingVertical: 14 },
  backBtnText: { fontSize: 15, fontWeight: "700", color: C.muted },
  doneBtn: { marginTop: 24, backgroundColor: C.gold, borderRadius: 14, paddingHorizontal: 32, paddingVertical: 16 },
  doneBtnText: { fontSize: 16, fontWeight: "800", color: "#fff" },

  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 10, gap: 10 },
  closeBtn: { color: C.muted, fontSize: 22, width: 28 },
  progressTrack: { flex: 1, height: 8, backgroundColor: C.bg3, borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: C.gold, borderRadius: 4 },
  countText: { fontSize: 12, fontWeight: "700", color: C.muted },

  cardWrap: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
  cardLabel: { fontSize: 10, fontWeight: "900", color: C.gold, letterSpacing: 2, marginBottom: 20 },

  wordCard: { backgroundColor: C.card, borderRadius: 20, borderWidth: 1, borderColor: C.border, padding: 40, alignItems: "center", marginBottom: 24 },
  word: { fontFamily: SERIF, fontSize: 32, fontWeight: "700", color: C.text },
  wordHint: { fontSize: 14, color: C.muted, marginTop: 12 },

  revealBtn: { backgroundColor: C.gold, borderRadius: 16, paddingVertical: 18, alignItems: "center" },
  revealBtnText: { fontSize: 17, fontWeight: "800", color: "#fff" },

  answerCard: { backgroundColor: C.greenDim, borderRadius: 16, borderWidth: 1, borderColor: C.greenLine, padding: 24, alignItems: "center", marginBottom: 20 },
  answerWord: { fontFamily: SERIF, fontSize: 24, fontWeight: "700", color: C.text },
  answerMeaning: { fontSize: 18, color: C.green, fontWeight: "600", marginTop: 8 },

  rateQuestion: { fontSize: 14, color: C.muted, textAlign: "center", marginBottom: 14 },
  rateButtons: { gap: 10 },
  rateBtn: { borderRadius: 14, paddingVertical: 16, alignItems: "center", borderWidth: 1 },
  rateBtnWrong: { backgroundColor: C.redDim, borderColor: C.redLine },
  rateBtnWrongText: { fontSize: 15, fontWeight: "700", color: C.red },
  rateBtnOk: { backgroundColor: C.goldDim, borderColor: C.goldLine },
  rateBtnOkText: { fontSize: 15, fontWeight: "700", color: C.gold },
  rateBtnGood: { backgroundColor: C.greenDim, borderColor: C.greenLine },
  rateBtnGoodText: { fontSize: 15, fontWeight: "700", color: C.green },
});
