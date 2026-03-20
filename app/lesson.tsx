import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LESSON_DATA_A1 } from "../data/lessonData";

const PHASES = ["Goals", "Listening", "Grammar", "Vocabulary", "Exercises", "Culture", "Finish"];
const PHASE_ICONS = ["🎯", "👂", "📚", "💬", "✍️", "🌍", "✅"];
const PHASE_LABELS = ["Ziele", "Hören", "Grammatik", "Vokabeln", "Übungen", "Kultur", "Fertig"];

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams();
  const router = useRouter();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState({});

  const lesson = LESSON_DATA_A1.find((l) => l.id === lessonId);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Lektion nicht gefunden</Text>
      </View>
    );
  }

  const togglePhase = (index) => {
    setCurrentPhase(index);
  };

  const markPhaseComplete = (index) => {
    setCompletedPhases({ ...completedPhases, [index]: true });
    if (index < PHASES.length - 1) {
      setCurrentPhase(index + 1);
    }
  };

  const renderGoalsPhase = () => (
    <ScrollView style={styles.phaseContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.phaseTitle}>Lernziele dieser Lektion</Text>
      <Text style={styles.phaseSubtitle}>{lesson.title}</Text>

      <View style={styles.goalsGrid}>
        {lesson.learning_objectives?.map((goal, idx) => (
          <View key={idx} style={styles.goalCard}>
            <Text style={styles.goalBullet}>✓</Text>
            <Text style={styles.goalText}>{goal}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.contextText}>
        {lesson.learning_path_context || "Meister diese Ziele um zur nächsten Phase zu gehen."}
      </Text>

      <TouchableOpacity
        style={styles.phaseButton}
        onPress={() => markPhaseComplete(0)}
      >
        <Text style={styles.phaseButtonText}>Ich verstehe die Ziele →</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderListeningPhase = () => (
    <ScrollView style={styles.phaseContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.phaseTitle}>Hörverstehen</Text>
      <Text style={styles.phaseSubtitle}>{lesson.listening?.title}</Text>

      <View style={styles.audioCard}>
        <Text style={styles.audioIcon}>🎧</Text>
        <Text style={styles.audioLabel}>Audio-Dialog</Text>
        <Text style={styles.audioNote}>(Tippe zum Abspielen)</Text>
      </View>

      <View style={styles.transcriptCard}>
        <Text style={styles.transcriptTitle}>Transkript (Deutsch)</Text>
        <Text style={styles.transcriptText}>{lesson.listening?.transcript}</Text>
      </View>

      <View style={styles.translationCard}>
        <Text style={styles.translationTitle}>Übersetzung (English)</Text>
        <Text style={styles.translationText}>{lesson.listening?.english_translation}</Text>
      </View>

      <View style={styles.vocabHighlight}>
        <Text style={styles.vocabTitle}>Wichtige Vokabeln in diesem Dialog:</Text>
        {lesson.listening?.vocabulary_highlighted?.map((vocab, idx) => {
          const [de, en] = vocab.split(" :: ");
          return (
            <View key={idx} style={styles.vocabItem}>
              <Text style={styles.vocabDe}>{de}</Text>
              <Text style={styles.vocabEn}>= {en}</Text>
            </View>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.phaseButton}
        onPress={() => markPhaseComplete(1)}
      >
        <Text style={styles.phaseButtonText}>Ich verstehe den Dialog →</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderGrammarPhase = () => (
    <ScrollView style={styles.phaseContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.phaseTitle}>Grammatik</Text>
      <Text style={styles.phaseSubtitle}>{lesson.grammar?.concept}</Text>

      <View style={styles.ruleCard}>
        <Text style={styles.ruleTitle}>Die Regel</Text>
        <Text style={styles.ruleText}>{lesson.grammar?.rule}</Text>
      </View>

      <View style={styles.patternCard}>
        <Text style={styles.patternTitle}>Muster (Pattern)</Text>
        {lesson.grammar?.patterns?.map((p, idx) => (
          <View key={idx} style={styles.patternItem}>
            {p.person && (
              <View style={styles.patternRow}>
                <Text style={styles.patternLabel}>{p.person}</Text>
                <Text style={styles.patternForm}>{p.conjugation || p.sound || p.form}</Text>
                <Text style={styles.patternExample}>{p.example}</Text>
              </View>
            )}
            {p.sound && (
              <View>
                <Text style={styles.soundLabel}>{p.sound}</Text>
                <View style={styles.examplesContainer}>
                  {p.examples?.map((ex, i) => (
                    <Text key={i} style={styles.exampleText}>• {ex}</Text>
                  ))}
                </View>
                <Text style={styles.trickText}>💡 {p.english_trick}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {lesson.grammar?.common_mistakes && (
        <View style={styles.mistakesCard}>
          <Text style={styles.mistakesTitle}>⚠️ Häufige Fehler</Text>
          {lesson.grammar.common_mistakes.map((mistake, idx) => (
            <View key={idx} style={styles.mistakeItem}>
              <Text style={styles.mistakeWrong}>❌ FALSCH: {mistake.wrong}</Text>
              <Text style={styles.mistakeRight}>✅ RICHTIG: {mistake.right}</Text>
              <Text style={styles.mistakeExplanation}>{mistake.explanation}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.mnemonicCard}>
        <Text style={styles.mnemonicTitle}>🧠 Merkhilfe</Text>
        <Text style={styles.mnemonicText}>{lesson.grammar?.mnemonic || lesson.mnemonic}</Text>
      </View>

      <TouchableOpacity
        style={styles.phaseButton}
        onPress={() => markPhaseComplete(2)}
      >
        <Text style={styles.phaseButtonText}>Ich verstehe die Grammatik →</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderVocabularyPhase = () => (
    <ScrollView style={styles.phaseContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.phaseTitle}>Vokabeln</Text>

      {lesson.vocabulary?.core && (
        <View style={styles.vocabSection}>
          <Text style={styles.vocabSectionTitle}>🔴 Kernvokabeln (MUSS lernen)</Text>
          {lesson.vocabulary.core.map((vocab, idx) => {
            const [de, en] = vocab.split(" :: ");
            return (
              <View key={idx} style={styles.vocabRow}>
                <Text style={styles.vocabDeMain}>{de}</Text>
                <Text style={styles.vocabEnMain}>{en}</Text>
              </View>
            );
          })}
        </View>
      )}

      {lesson.vocabulary?.supporting && (
        <View style={styles.vocabSection}>
          <Text style={styles.vocabSectionTitle}>🟡 Unterstützende Vokabeln</Text>
          {lesson.vocabulary.supporting.map((vocab, idx) => {
            const [de, en] = vocab.split(" :: ");
            return (
              <View key={idx} style={styles.vocabRowSupporting}>
                <Text style={styles.vocabDeSupporting}>{de}</Text>
                <Text style={styles.vocabEnSupporting}>{en}</Text>
              </View>
            );
          })}
        </View>
      )}

      {lesson.vocabulary?.phrases && (
        <View style={styles.vocabSection}>
          <Text style={styles.vocabSectionTitle}>💬 Nützliche Phrasen</Text>
          {lesson.vocabulary.phrases.map((phrase, idx) => {
            const [de, en] = phrase.split(" :: ");
            return (
              <View key={idx} style={styles.phraseRow}>
                <Text style={styles.phraseDe}>"{de}"</Text>
                <Text style={styles.phraseEn}>{en}</Text>
              </View>
            );
          })}
        </View>
      )}

      <TouchableOpacity
        style={styles.phaseButton}
        onPress={() => markPhaseComplete(3)}
      >
        <Text style={styles.phaseButtonText}>Vokabeln gelernt →</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderExercisesPhase = () => (
    <ScrollView style={styles.phaseContainer} showsVerticalScreenIndicator={false}>
      <Text style={styles.phaseTitle}>Übungen</Text>
      <Text style={styles.exerciseSubtitle}>
        Recognition (leicht) → Recall (mittel) → Production (schwer)
      </Text>

      {lesson.exercises?.map((exercise, idx) => (
        <View key={idx} style={styles.exerciseCard}>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>
              {exercise.type === "recognition" && "🎯 Wiederkennen (Leicht)"}
              {exercise.type === "recall" && "🧠 Abrufen (Mittel)"}
              {exercise.type === "production" && "✍️ Produktion (Schwer)"}
            </Text>
          </View>
          <Text style={styles.exerciseInstruction}>{exercise.instruction}</Text>

          {exercise.tasks?.map((task, taskIdx) => (
            <View key={taskIdx} style={styles.taskBox}>
              <Text style={styles.taskQuestion}>
                {task.question || task.german || task.word || task.prompt}
              </Text>
              {task.options && (
                <View style={styles.optionsContainer}>
                  {task.options.map((opt, optIdx) => (
                    <TouchableOpacity key={optIdx} style={styles.optionButton}>
                      <Text style={styles.optionText}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {task.context && <Text style={styles.taskContext}>Kontext: {task.context}</Text>}
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity
        style={styles.phaseButton}
        onPress={() => markPhaseComplete(4)}
      >
        <Text style={styles.phaseButtonText}>Übungen abgeschlossen →</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderCulturePhase = () => (
    <ScrollView style={styles.phaseContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.phaseTitle}>Kultur & Kontext</Text>

      <View style={styles.cultureCard}>
        <Text style={styles.cultureTitle}>🇩🇪 Kulturelle Notiz</Text>
        <Text style={styles.cultureText}>{lesson.culture_note}</Text>
      </View>

      <View style={styles.realWorldCard}>
        <Text style={styles.realWorldTitle}>🌍 Wo du das brauchst</Text>
        <Text style={styles.realWorldText}>{lesson.real_world_use}</Text>
      </View>

      {lesson.goethe_alignment && (
        <View style={styles.goethCard}>
          <Text style={styles.goethTitle}>🎓 Goethe-Institut Vorbereitung</Text>
          <Text style={styles.goethModule}>Modul: {lesson.goethe_alignment.module}</Text>
          <Text style={styles.goethSkill}>Fähigkeit: {lesson.goethe_alignment.skill}</Text>
          <Text style={styles.goethTask}>Aufgabentyp: {lesson.goethe_alignment.task_type}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.phaseButton}
        onPress={() => markPhaseComplete(5)}
      >
        <Text style={styles.phaseButtonText}>Kultur verstanden →</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderFinishPhase = () => (
    <ScrollView style={styles.phaseContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.finishCard}>
        <Text style={styles.finishIcon}>🎉</Text>
        <Text style={styles.finishTitle}>Lektion abgeschlossen!</Text>
        <Text style={styles.finishXP}>+{lesson.xp_reward} XP</Text>
        <Text style={styles.finishText}>
          Du hast diese Lektion gemeistert. Gut gemacht!
        </Text>
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Dein Fortschritt</Text>
        <View style={styles.progressBar}>
          <View
            style={{
              ...styles.progressFill,
              width: `${((Object.keys(completedPhases).length + 1) / 7) * 100}%`,
            }}
          />
        </View>
        <Text style={styles.progressText}>
          {Object.keys(completedPhases).length + 1} / 7 Phasen abgeschlossen
        </Text>
      </View>

      <TouchableOpacity
        style={styles.finishButton}
        onPress={() => {
          router.back();
        }}
      >
        <Text style={styles.finishButtonText}>Zur Lektionsliste zurück</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderPhase = () => {
    switch (currentPhase) {
      case 0: return renderGoalsPhase();
      case 1: return renderListeningPhase();
      case 2: return renderGrammarPhase();
      case 3: return renderVocabularyPhase();
      case 4: return renderExercisesPhase();
      case 5: return renderCulturePhase();
      case 6: return renderFinishPhase();
      default: return null;
    }
  };

  return (
    <View style={styles.outerContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Zurück</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{lesson.title}</Text>
        <Text style={styles.headerMeta}>{lesson.level} • {lesson.duration} min</Text>
      </View>

      {/* Phase Navigator */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.phaseNav}
        contentContainerStyle={styles.phaseNavContent}
      >
        {PHASES.map((phase, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.phaseButton,
              currentPhase === idx && styles.phaseButtonActive,
              completedPhases[idx] && styles.phaseButtonCompleted,
            ]}
            onPress={() => togglePhase(idx)}
          >
            <Text style={styles.phaseIcon}>{PHASE_ICONS[idx]}</Text>
            <Text
              style={[
                styles.phaseButtonLabel,
                currentPhase === idx && styles.phaseButtonLabelActive,
              ]}
            >
              {PHASE_LABELS[idx]}
            </Text>
            {completedPhases[idx] && <Text style={styles.completedMark}>✓</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Phase Content */}
      {renderPhase()}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: "#FAF8F3" },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: "#CC0000", fontWeight: "600" },

  /* Header */
  header: { backgroundColor: "#070B18", paddingTop: 12, paddingBottom: 16, paddingHorizontal: 16 },
  backButton: { fontSize: 14, color: "#C9A84C", fontWeight: "600", marginBottom: 8 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#FFFFFF", marginBottom: 4 },
  headerMeta: { fontSize: 12, color: "#999999" },

  /* Phase Navigator */
  phaseNav: { backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: "#E5E5E5" },
  phaseNavContent: { paddingHorizontal: 8, paddingVertical: 8 },
  phaseButton: {
    marginHorizontal: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  phaseButtonActive: { backgroundColor: "#C9A84C", borderWidth: 2, borderColor: "#C9A84C" },
  phaseButtonCompleted: { backgroundColor: "#E8F5E9", borderWidth: 1, borderColor: "#4CAF50" },
  phaseIcon: { fontSize: 16, marginBottom: 2 },
  phaseButtonLabel: { fontSize: 11, color: "#666", fontWeight: "600" },
  phaseButtonLabelActive: { color: "#FFFFFF" },
  completedMark: { fontSize: 12, color: "#4CAF50", fontWeight: "700" },

  /* Phase Container */
  phaseContainer: { flex: 1, paddingHorizontal: 16, paddingVertical: 20 },

  /* Goals Phase */
  phaseTitle: { fontSize: 28, fontWeight: "700", color: "#1C1C2E", marginBottom: 8 },
  phaseSubtitle: { fontSize: 16, color: "#666666", marginBottom: 24, fontWeight: "500" },
  goalsGrid: { marginBottom: 24 },
  goalCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#B8922A",
  },
  goalBullet: { fontSize: 20, color: "#4CAF50", marginRight: 12, fontWeight: "600" },
  goalText: { fontSize: 15, color: "#1C1C2E", lineHeight: 22, flex: 1, fontWeight: "500" },
  contextText: { fontSize: 14, color: "#999999", fontStyle: "italic", marginBottom: 16 },

  /* Listening Phase */
  audioCard: {
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
  },
  audioIcon: { fontSize: 40, marginBottom: 8 },
  audioLabel: { fontSize: 16, fontWeight: "600", color: "#1976D2" },
  audioNote: { fontSize: 12, color: "#1976D2", marginTop: 4 },
  transcriptCard: { backgroundColor: "#FFFFFF", borderRadius: 12, padding: 16, marginBottom: 16 },
  transcriptTitle: { fontSize: 14, fontWeight: "700", color: "#1C1C2E", marginBottom: 12 },
  transcriptText: { fontSize: 15, color: "#333333", lineHeight: 24 },
  translationCard: { backgroundColor: "#F5F5F5", borderRadius: 12, padding: 16, marginBottom: 16 },
  translationTitle: { fontSize: 14, fontWeight: "700", color: "#666666", marginBottom: 12 },
  translationText: { fontSize: 14, color: "#666666", lineHeight: 22, fontStyle: "italic" },
  vocabHighlight: { backgroundColor: "#FFF9C4", borderRadius: 12, padding: 16, marginBottom: 16 },
  vocabTitle: { fontSize: 14, fontWeight: "700", color: "#F57F17", marginBottom: 12 },
  vocabItem: { flexDirection: "row", marginBottom: 8 },
  vocabDe: { fontSize: 14, fontWeight: "600", color: "#1C1C2E", flex: 1 },
  vocabEn: { fontSize: 14, color: "#666666", fontStyle: "italic" },

  /* Grammar Phase */
  ruleCard: { backgroundColor: "#F3E5F5", borderRadius: 12, padding: 16, marginBottom: 20 },
  ruleTitle: { fontSize: 14, fontWeight: "700", color: "#6A1B9A", marginBottom: 8 },
  ruleText: { fontSize: 15, color: "#1C1C2E", lineHeight: 23 },
  patternCard: { backgroundColor: "#FFFFFF", borderRadius: 12, padding: 16, marginBottom: 20 },
  patternTitle: { fontSize: 14, fontWeight: "700", color: "#1C1C2E", marginBottom: 16 },
  patternItem: { marginBottom: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: "#E5E5E5" },
  patternRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  patternLabel: { fontSize: 13, fontWeight: "600", color: "#B8922A", width: 60 },
  patternForm: { fontSize: 16, fontWeight: "700", color: "#1C1C2E", width: 100 },
  patternExample: { fontSize: 14, color: "#666666", flex: 1 },
  soundLabel: { fontSize: 13, fontWeight: "700", color: "#B8922A", marginBottom: 8 },
  examplesContainer: { marginLeft: 8, marginBottom: 8 },
  exampleText: { fontSize: 13, color: "#333333", lineHeight: 20 },
  trickText: { fontSize: 13, color: "#F57F17", fontWeight: "600", marginTop: 6 },
  mistakesCard: { backgroundColor: "#FFEBEE", borderRadius: 12, padding: 16, marginBottom: 20 },
  mistakesTitle: { fontSize: 14, fontWeight: "700", color: "#C62828", marginBottom: 12 },
  mistakeItem: { marginBottom: 12 },
  mistakeWrong: { fontSize: 13, color: "#C62828", fontWeight: "600", marginBottom: 4 },
  mistakeRight: { fontSize: 13, color: "#2E7D32", fontWeight: "600", marginBottom: 4 },
  mistakeExplanation: { fontSize: 12, color: "#666666", fontStyle: "italic" },
  mnemonicCard: { backgroundColor: "#E8F5E9", borderRadius: 12, padding: 16, marginBottom: 20 },
  mnemonicTitle: { fontSize: 14, fontWeight: "700", color: "#1B5E20", marginBottom: 8 },
  mnemonicText: { fontSize: 15, color: "#1C1C2E", lineHeight: 23, fontWeight: "500" },

  /* Vocabulary Phase */
  vocabSection: { marginBottom: 24 },
  vocabSectionTitle: { fontSize: 15, fontWeight: "700", color: "#1C1C2E", marginBottom: 12 },
  vocabRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  vocabDeMain: { fontSize: 15, fontWeight: "700", color: "#1C1C2E", flex: 1 },
  vocabEnMain: { fontSize: 14, color: "#666666", fontStyle: "italic" },
  vocabRowSupporting: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 6,
  },
  vocabDeSupporting: { fontSize: 14, fontWeight: "600", color: "#333333", flex: 1 },
  vocabEnSupporting: { fontSize: 13, color: "#888888", fontStyle: "italic" },
  phraseRow: { marginBottom: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#E5E5E5" },
  phraseDe: { fontSize: 15, fontWeight: "700", color: "#1C1C2E", marginBottom: 4 },
  phraseEn: { fontSize: 13, color: "#666666", fontStyle: "italic" },

  /* Exercises Phase */
  exerciseSubtitle: { fontSize: 14, color: "#666666", marginBottom: 16 },
  exerciseCard: { backgroundColor: "#FFFFFF", borderRadius: 12, padding: 16, marginBottom: 16 },
  difficultyBadge: { backgroundColor: "#FFF3E0", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, marginBottom: 12 },
  difficultyText: { fontSize: 12, fontWeight: "700", color: "#E65100" },
  exerciseInstruction: { fontSize: 15, fontWeight: "600", color: "#1C1C2E", marginBottom: 12 },
  taskBox: { backgroundColor: "#F5F5F5", borderRadius: 8, padding: 12, marginBottom: 12 },
  taskQuestion: { fontSize: 14, fontWeight: "600", color: "#1C1C2E", marginBottom: 12 },
  optionsContainer: { marginBottom: 12 },
  optionButton: { backgroundColor: "#FFFFFF", borderRadius: 8, borderWidth: 1, borderColor: "#DDD", paddingHorizontal: 12, paddingVertical: 10, marginBottom: 6 },
  optionText: { fontSize: 13, color: "#333333" },
  taskContext: { fontSize: 12, color: "#999999", fontStyle: "italic" },

  /* Culture Phase */
  cultureCard: { backgroundColor: "#FFFFFF", borderRadius: 12, padding: 16, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: "#B8922A" },
  cultureTitle: { fontSize: 14, fontWeight: "700", color: "#1C1C2E", marginBottom: 8 },
  cultureText: { fontSize: 14, color: "#333333", lineHeight: 22 },
  realWorldCard: { backgroundColor: "#E3F2FD", borderRadius: 12, padding: 16, marginBottom: 16 },
  realWorldTitle: { fontSize: 14, fontWeight: "700", color: "#1565C0", marginBottom: 8 },
  realWorldText: { fontSize: 14, color: "#0D47A1", lineHeight: 22 },
  goethCard: { backgroundColor: "#F3E5F5", borderRadius: 12, padding: 16 },
  goethTitle: { fontSize: 14, fontWeight: "700", color: "#6A1B9A", marginBottom: 12 },
  goethModule: { fontSize: 13, color: "#4A148C", marginBottom: 6, fontWeight: "600" },
  goethSkill: { fontSize: 13, color: "#4A148C", marginBottom: 6 },
  goethTask: { fontSize: 13, color: "#4A148C" },

  /* Finish Phase */
  finishCard: { backgroundColor: "#E8F5E9", borderRadius: 12, padding: 24, alignItems: "center", marginBottom: 24 },
  finishIcon: { fontSize: 60, marginBottom: 12 },
  finishTitle: { fontSize: 26, fontWeight: "700", color: "#1B5E20", marginBottom: 8 },
  finishXP: { fontSize: 32, fontWeight: "700", color: "#B8922A", marginBottom: 8 },
  finishText: { fontSize: 15, color: "#2E7D32", lineHeight: 22 },
  progressCard: { backgroundColor: "#FFFFFF", borderRadius: 12, padding: 16, marginBottom: 24 },
  progressTitle: { fontSize: 14, fontWeight: "700", color: "#1C1C2E", marginBottom: 12 },
  progressBar: { height: 8, backgroundColor: "#E5E5E5", borderRadius: 4, overflow: "hidden", marginBottom: 8 },
  progressFill: { height: "100%", backgroundColor: "#B8922A" },
  progressText: { fontSize: 12, color: "#666666", fontWeight: "600" },
  finishButton: { backgroundColor: "#070B18", borderRadius: 12, paddingVertical: 16, alignItems: "center" },
  finishButtonText: { fontSize: 16, fontWeight: "700", color: "#C9A84C" },
});
