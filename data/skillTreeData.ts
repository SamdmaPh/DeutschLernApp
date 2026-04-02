export interface Skill {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: "sprechen" | "hoeren" | "lesen" | "schreiben" | "grammatik" | "kultur";
  level: string; // A1, A2, etc.
  unlockedBy: string[]; // lesson IDs that unlock this skill
  requires?: string[]; // skill IDs that must be unlocked first
}

export const SKILL_CATEGORIES = [
  { id: "sprechen", name: "Sprechen", emoji: "🗣️", color: "#22C55E" },
  { id: "hoeren", name: "Hören", emoji: "👂", color: "#3B82F6" },
  { id: "lesen", name: "Lesen", emoji: "📖", color: "#C9A84C" },
  { id: "schreiben", name: "Schreiben", emoji: "✍️", color: "#F43F5E" },
  { id: "grammatik", name: "Grammatik", emoji: "📚", color: "#8B5CF6" },
  { id: "kultur", name: "Kultur", emoji: "🌍", color: "#F59E0B" },
];

export const SKILLS: Skill[] = [
  // ── A1 SKILLS ────────────────────────────────
  // Sprechen
  { id: "greet", name: "Begrüßen", emoji: "👋", description: "Du kannst Hallo und Tschüss sagen.", category: "sprechen", level: "A1", unlockedBy: ["a1-0-1", "a1-0-2"] },
  { id: "introduce", name: "Vorstellen", emoji: "🙋", description: "Du kannst sagen wer du bist.", category: "sprechen", level: "A1", unlockedBy: ["a1-1-1"], requires: ["greet"] },
  { id: "order", name: "Bestellen", emoji: "☕", description: "Du kannst im Café bestellen.", category: "sprechen", level: "A1", unlockedBy: ["a1-2-1"], requires: ["introduce"] },
  { id: "smalltalk", name: "Small Talk", emoji: "💬", description: "Du kannst über Familie und Alltag reden.", category: "sprechen", level: "A1", unlockedBy: ["a1-2-2"], requires: ["order"] },

  // Hören
  { id: "hear-sounds", name: "Deutsche Laute", emoji: "🔊", description: "Du erkennst ü, ö, ä, ß und ch.", category: "hoeren", level: "A1", unlockedBy: ["a1-0-1"] },
  { id: "hear-greetings", name: "Grüße verstehen", emoji: "👂", description: "Du verstehst Begrüßungen und Verabschiedungen.", category: "hoeren", level: "A1", unlockedBy: ["a1-0-2"], requires: ["hear-sounds"] },
  { id: "hear-numbers", name: "Zahlen hören", emoji: "🔢", description: "Du verstehst Zahlen und Uhrzeiten.", category: "hoeren", level: "A1", unlockedBy: ["a1-1-3"], requires: ["hear-greetings"] },

  // Grammatik
  { id: "pronunciation", name: "Aussprache", emoji: "🗣️", description: "Du kennst die 6 kritischen deutschen Laute.", category: "grammatik", level: "A1", unlockedBy: ["a1-0-1"] },
  { id: "sein", name: "SEIN konjugieren", emoji: "🔤", description: "ich bin, du bist, er ist...", category: "grammatik", level: "A1", unlockedBy: ["a1-1-1"], requires: ["pronunciation"] },
  { id: "haben", name: "HABEN konjugieren", emoji: "✊", description: "ich habe, du hast, er hat...", category: "grammatik", level: "A1", unlockedBy: ["a1-1-2"], requires: ["sein"] },
  { id: "numbers", name: "Zahlen & Zeit", emoji: "🕐", description: "0-100, Uhrzeit, Wochentage.", category: "grammatik", level: "A1", unlockedBy: ["a1-1-3"], requires: ["haben"] },

  // Lesen
  { id: "read-signs", name: "Schilder lesen", emoji: "🪧", description: "Du kannst einfache Schilder und Menüs lesen.", category: "lesen", level: "A1", unlockedBy: ["a1-0-2", "a1-2-1"] },
  { id: "read-forms", name: "Formulare", emoji: "📋", description: "Du kannst einfache Formulare ausfüllen.", category: "lesen", level: "A1", unlockedBy: ["a1-1-1", "a1-1-2"], requires: ["read-signs"] },

  // Kultur
  { id: "du-sie", name: "Du vs Sie", emoji: "🤝", description: "Du weißt wann du 'Du' und wann 'Sie' sagst.", category: "kultur", level: "A1", unlockedBy: ["a1-0-2"] },
  { id: "cafe-culture", name: "Café-Kultur", emoji: "☕", description: "Du kennst die deutsche Café-Etikette.", category: "kultur", level: "A1", unlockedBy: ["a1-2-1"], requires: ["du-sie"] },
  { id: "family-values", name: "Familie & Werte", emoji: "👨‍👩‍👧", description: "Du verstehst deutsche Familienstrukturen.", category: "kultur", level: "A1", unlockedBy: ["a1-2-2"], requires: ["cafe-culture"] },

  // ── A2 SKILLS ────────────────────────────────
  { id: "past-tense", name: "Vergangenheit", emoji: "⏪", description: "Du kannst über gestern erzählen.", category: "grammatik", level: "A2", unlockedBy: ["a2-1-1", "a2-1-2"], requires: ["haben"] },
  { id: "separable", name: "Trennbare Verben", emoji: "✂️", description: "aufstehen, einkaufen, anrufen...", category: "grammatik", level: "A2", unlockedBy: ["a2-1-3"], requires: ["past-tense"] },
  { id: "modal-verbs", name: "Modalverben", emoji: "💪", description: "können, müssen, dürfen, sollen.", category: "grammatik", level: "A2", unlockedBy: ["a2-2-2"], requires: ["separable"] },
  { id: "dative", name: "Dativ", emoji: "🎯", description: "mir, dir, ihm, ihr, uns, euch, ihnen.", category: "grammatik", level: "A2", unlockedBy: ["a2-4-1"], requires: ["modal-verbs"] },

  { id: "doctor", name: "Beim Arzt", emoji: "🏥", description: "Du kannst Symptome beschreiben.", category: "sprechen", level: "A2", unlockedBy: ["a2-2-3"], requires: ["smalltalk"] },
  { id: "train", name: "Am Bahnhof", emoji: "🚂", description: "Du kannst Fahrkarten kaufen.", category: "sprechen", level: "A2", unlockedBy: ["a2-4-3"], requires: ["doctor"] },

  { id: "hear-directions", name: "Wege verstehen", emoji: "🧭", description: "Du verstehst Wegbeschreibungen.", category: "hoeren", level: "A2", unlockedBy: ["a2-2-1"], requires: ["hear-numbers"] },
  { id: "read-emails", name: "E-Mails lesen", emoji: "📧", description: "Du kannst einfache E-Mails verstehen.", category: "lesen", level: "A2", unlockedBy: ["a2-3-1", "a2-3-2"], requires: ["read-forms"] },
  { id: "karneval", name: "Karneval & Feste", emoji: "🎭", description: "Du kennst deutsche Feiertage und Bräuche.", category: "kultur", level: "A2", unlockedBy: ["a2-2-1", "a2-2-2"], requires: ["family-values"] },

  // ── B1 SKILLS ────────────────────────────────
  { id: "praeteritum", name: "Präteritum", emoji: "📜", description: "Erzählen wie ein Märchen: Es war einmal...", category: "grammatik", level: "B1", unlockedBy: ["b1-1-1"], requires: ["past-tense"] },
  { id: "relative", name: "Relativsätze", emoji: "🔗", description: "Der Mann, der... Die Frau, die...", category: "grammatik", level: "B1", unlockedBy: ["b1-1-2"], requires: ["praeteritum"] },
  { id: "passive", name: "Passiv", emoji: "🔄", description: "Es wird gemacht. Es wurde gebaut.", category: "grammatik", level: "B1", unlockedBy: ["b1-1-3"], requires: ["relative"] },
  { id: "konjunktiv", name: "Konjunktiv II", emoji: "🌙", description: "Wenn ich könnte, würde ich...", category: "grammatik", level: "B1", unlockedBy: ["b1-2-1"], requires: ["passive"] },

  { id: "apply-job", name: "Bewerben", emoji: "💼", description: "Du kannst einen Lebenslauf schreiben.", category: "schreiben", level: "B1", unlockedBy: ["b1-2-3"], requires: ["read-emails"] },
  { id: "debate-env", name: "Umwelt diskutieren", emoji: "🌱", description: "Du kannst über Nachhaltigkeit sprechen.", category: "sprechen", level: "B1", unlockedBy: ["b1-3-1"], requires: ["train"] },
  { id: "read-news", name: "Nachrichten lesen", emoji: "📰", description: "Du verstehst einfache Zeitungsartikel.", category: "lesen", level: "B1", unlockedBy: ["b1-4-1"], requires: ["read-emails"] },
  { id: "literature-intro", name: "Literatur entdecken", emoji: "📕", description: "Du liest erste deutsche Kurzgeschichten.", category: "kultur", level: "B1", unlockedBy: ["b1-4-3"], requires: ["karneval"] },

  // ── B2 SKILLS ────────────────────────────────
  { id: "nominalization", name: "Nominalisierung", emoji: "🔀", description: "Aus Verben werden Nomen.", category: "grammatik", level: "B2", unlockedBy: ["b2-1-1"], requires: ["konjunktiv"] },
  { id: "academic", name: "Wissenschaftssprache", emoji: "🎓", description: "Hypothesen, Ergebnisse, Schlussfolgerungen.", category: "schreiben", level: "B2", unlockedBy: ["b2-1-3"], requires: ["apply-job"] },
  { id: "debate", name: "Debattieren", emoji: "⚔️", description: "Pro und Contra argumentieren.", category: "sprechen", level: "B2", unlockedBy: ["b2-2-3"], requires: ["debate-env"] },
  { id: "idioms", name: "Redewendungen", emoji: "🐕", description: "Da liegt der Hund begraben.", category: "kultur", level: "B2", unlockedBy: ["b2-3-2"], requires: ["literature-intro"] },
  { id: "formal-writing", name: "Formelle Briefe", emoji: "📝", description: "Sehr geehrte Damen und Herren...", category: "schreiben", level: "B2", unlockedBy: ["b2-3-3"], requires: ["academic"] },
  { id: "politics", name: "Politik verstehen", emoji: "🏛️", description: "Du diskutierst über Demokratie.", category: "lesen", level: "B2", unlockedBy: ["b2-4-1"], requires: ["read-news"] },
  { id: "philosophy", name: "Philosophie", emoji: "🤔", description: "Kant, Hegel, Nietzsche — du verstehst sie.", category: "kultur", level: "B2", unlockedBy: ["b2-4-3"], requires: ["idioms"] },

  // ── C1 SKILLS ────────────────────────────────
  { id: "particles", name: "Modalpartikeln", emoji: "✨", description: "Doch, mal, halt, eben — du klingst deutsch.", category: "grammatik", level: "C1", unlockedBy: ["c1-1-1"], requires: ["nominalization"] },
  { id: "irony", name: "Ironie verstehen", emoji: "😏", description: "Du liest zwischen den Zeilen.", category: "hoeren", level: "C1", unlockedBy: ["c1-1-4"], requires: ["hear-directions"] },
  { id: "business", name: "Wirtschaftsdeutsch", emoji: "📊", description: "Märkte, Finanzen, Verhandlungen.", category: "sprechen", level: "C1", unlockedBy: ["c1-2-1"], requires: ["debate"] },
  { id: "media-literacy", name: "Medienkompetenz", emoji: "🔍", description: "Du analysierst Artikel kritisch.", category: "lesen", level: "C1", unlockedBy: ["c1-2-3"], requires: ["politics"] },
  { id: "dialects", name: "Dialekte verstehen", emoji: "🗺️", description: "Bayerisch, Sächsisch, Platt — du verstehst alles.", category: "hoeren", level: "C1", unlockedBy: ["c1-3-2"], requires: ["irony"] },
  { id: "mann", name: "Thomas Mann lesen", emoji: "📖", description: "Du liest Buddenbrooks. Und verstehst es.", category: "lesen", level: "C1", unlockedBy: ["c1-3-3"], requires: ["media-literacy"] },

  // ── C2 SKILLS ────────────────────────────────
  { id: "translate", name: "Übersetzen", emoji: "🔄", description: "Die Kunst der Nuance zwischen Sprachen.", category: "schreiben", level: "C2", unlockedBy: ["c2-1-3"], requires: ["formal-writing"] },
  { id: "kafka", name: "Kafka verstehen", emoji: "🪳", description: "Der Prozess. Die Verwandlung. Du verstehst.", category: "lesen", level: "C2", unlockedBy: ["c2-2-1"], requires: ["mann"] },
  { id: "rhetoric", name: "Politische Rhetorik", emoji: "🎤", description: "Du analysierst Reden wie ein Profi.", category: "sprechen", level: "C2", unlockedBy: ["c2-2-2"], requires: ["business"] },
  { id: "wittgenstein", name: "Sprachphilosophie", emoji: "🧠", description: "Die Grenzen meiner Sprache sind die Grenzen meiner Welt.", category: "kultur", level: "C2", unlockedBy: ["c2-3-2"], requires: ["philosophy"] },
  { id: "mastery", name: "Meisterschaft", emoji: "👑", description: "Du träumst auf Deutsch.", category: "kultur", level: "C2", unlockedBy: ["c2-3-3"], requires: ["wittgenstein", "kafka", "rhetoric", "translate"] },
];

export const CHARACTER_LEVELS = [
  { minSkills: 0, title: "Neuling", emoji: "🌱", description: "Deine Reise beginnt." },
  { minSkills: 5, title: "Entdecker", emoji: "🧭", description: "Du findest deinen Weg." },
  { minSkills: 12, title: "Wanderer", emoji: "🚶", description: "Du gehst deinen Weg." },
  { minSkills: 20, title: "Reisender", emoji: "🧳", description: "Deutschland ist dein Zuhause." },
  { minSkills: 30, title: "Kenner", emoji: "🎩", description: "Du verstehst die Deutschen." },
  { minSkills: 38, title: "Meister", emoji: "👑", description: "Du BIST Deutsch." },
];
