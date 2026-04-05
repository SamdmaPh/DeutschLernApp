// ─── Duden-Wörterbuch: Durchsuchbares Vokabular ───────────────────────────
// Struktur: Wort, Artikel, Plural, IPA, Bedeutung (DE+EN), Beispielsatz, Level, Kategorie

export interface VocabEntry {
  word: string;
  article?: "der" | "die" | "das";  // nur für Nomen
  plural?: string;
  partOfSpeech: "Nomen" | "Verb" | "Adjektiv" | "Adverb" | "Präposition" | "Konjunktion" | "Pronomen" | "Partikel" | "Interjektion" | "Phrase";
  ipa?: string;
  meaningDe: string;
  meaningEn: string;
  example: string;
  exampleEn: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  category: string;
  conjugation?: string[];    // für Verben: [ich, du, er, wir, ihr, sie]
  tags?: string[];
}

export const VOCAB_CATEGORIES = [
  { id: "greetings", name: "Begrüßung & Abschied", emoji: "👋" },
  { id: "people", name: "Menschen & Familie", emoji: "👨‍👩‍👧" },
  { id: "food", name: "Essen & Trinken", emoji: "🍽️" },
  { id: "travel", name: "Reise & Verkehr", emoji: "✈️" },
  { id: "home", name: "Wohnung & Haus", emoji: "🏠" },
  { id: "body", name: "Körper & Gesundheit", emoji: "🏥" },
  { id: "numbers", name: "Zahlen & Zeit", emoji: "🔢" },
  { id: "shopping", name: "Einkaufen & Geld", emoji: "🛒" },
  { id: "work", name: "Arbeit & Beruf", emoji: "💼" },
  { id: "nature", name: "Natur & Wetter", emoji: "🌤️" },
  { id: "city", name: "Stadt & Orientierung", emoji: "🏙️" },
  { id: "school", name: "Schule & Lernen", emoji: "📚" },
  { id: "leisure", name: "Freizeit & Hobbys", emoji: "🎭" },
  { id: "feelings", name: "Gefühle & Meinungen", emoji: "💭" },
  { id: "verbs", name: "Wichtige Verben", emoji: "🔤" },
  { id: "adjectives", name: "Adjektive", emoji: "🎨" },
  { id: "phrases", name: "Redewendungen", emoji: "💬" },
  { id: "clothes", name: "Kleidung", emoji: "👗" },
  { id: "technology", name: "Technologie", emoji: "💻" },
  { id: "colors", name: "Farben", emoji: "🌈" },
  { id: "politics", name: "Politik & Gesellschaft", emoji: "🏛️" },
  { id: "media", name: "Medien", emoji: "📰" },
  { id: "environment", name: "Umwelt", emoji: "🌍" },
  { id: "idioms", name: "Sprichwörter & Redewendungen", emoji: "🗣️" },
];

const VOCAB_DATA_BASE: VocabEntry[] = [
  // ══════════════════════════════════════════════════════════════
  // BEGRÜSSUNG & ABSCHIED
  // ══════════════════════════════════════════════════════════════
  {
    word: "Hallo", partOfSpeech: "Interjektion", ipa: "ˈhalo",
    meaningDe: "Informelle Begrüßung", meaningEn: "Hello",
    example: "Hallo, wie geht es dir?", exampleEn: "Hello, how are you?",
    level: "A1", category: "greetings"
  },
  {
    word: "Guten Tag", partOfSpeech: "Phrase", ipa: "ˌɡuːtn̩ ˈtaːk",
    meaningDe: "Formelle Begrüßung (tagsüber)", meaningEn: "Good day (formal)",
    example: "Guten Tag, Herr Müller!", exampleEn: "Good day, Mr. Müller!",
    level: "A1", category: "greetings"
  },
  {
    word: "Guten Morgen", partOfSpeech: "Phrase", ipa: "ˌɡuːtn̩ ˈmɔʁɡn̩",
    meaningDe: "Begrüßung am Morgen", meaningEn: "Good morning",
    example: "Guten Morgen! Haben Sie gut geschlafen?", exampleEn: "Good morning! Did you sleep well?",
    level: "A1", category: "greetings"
  },
  {
    word: "Guten Abend", partOfSpeech: "Phrase", ipa: "ˌɡuːtn̩ ˈaːbm̩t",
    meaningDe: "Begrüßung am Abend", meaningEn: "Good evening",
    example: "Guten Abend! Willkommen im Restaurant.", exampleEn: "Good evening! Welcome to the restaurant.",
    level: "A1", category: "greetings"
  },
  {
    word: "Gute Nacht", partOfSpeech: "Phrase",
    meaningDe: "Abschied vor dem Schlafengehen", meaningEn: "Good night",
    example: "Gute Nacht, schlaf gut!", exampleEn: "Good night, sleep well!",
    level: "A1", category: "greetings"
  },
  {
    word: "Tschüss", partOfSpeech: "Interjektion", ipa: "tʃʏs",
    meaningDe: "Informeller Abschied", meaningEn: "Bye",
    example: "Tschüss, bis morgen!", exampleEn: "Bye, see you tomorrow!",
    level: "A1", category: "greetings"
  },
  {
    word: "Auf Wiedersehen", partOfSpeech: "Phrase", ipa: "aʊ̯f ˈviːdɐˌzeːən",
    meaningDe: "Formeller Abschied", meaningEn: "Goodbye (formal)",
    example: "Auf Wiedersehen, Frau Schmidt!", exampleEn: "Goodbye, Mrs. Schmidt!",
    level: "A1", category: "greetings"
  },
  {
    word: "Bitte", partOfSpeech: "Partikel", ipa: "ˈbɪtə",
    meaningDe: "Höflichkeitswort; auch: Antwort auf 'Danke'", meaningEn: "Please / You're welcome",
    example: "Einen Kaffee, bitte.", exampleEn: "A coffee, please.",
    level: "A1", category: "greetings", tags: ["höflich"]
  },
  {
    word: "Danke", partOfSpeech: "Partikel", ipa: "ˈdaŋkə",
    meaningDe: "Ausdruck der Dankbarkeit", meaningEn: "Thank you",
    example: "Danke für Ihre Hilfe!", exampleEn: "Thank you for your help!",
    level: "A1", category: "greetings"
  },
  {
    word: "Danke schön", partOfSpeech: "Phrase",
    meaningDe: "Verstärktes 'Danke'", meaningEn: "Thank you very much",
    example: "Danke schön, das ist sehr nett!", exampleEn: "Thank you very much, that's very kind!",
    level: "A1", category: "greetings"
  },
  {
    word: "Entschuldigung", partOfSpeech: "Interjektion", ipa: "ɛntˈʃʊldɪɡʊŋ",
    meaningDe: "Um Verzeihung bitten oder jemanden ansprechen", meaningEn: "Excuse me / Sorry",
    example: "Entschuldigung, wo ist der Bahnhof?", exampleEn: "Excuse me, where is the train station?",
    level: "A1", category: "greetings"
  },
  {
    word: "Wie geht es Ihnen?", partOfSpeech: "Phrase",
    meaningDe: "Formelle Frage nach dem Befinden", meaningEn: "How are you? (formal)",
    example: "Guten Tag! Wie geht es Ihnen?", exampleEn: "Good day! How are you?",
    level: "A1", category: "greetings"
  },
  {
    word: "Wie geht's?", partOfSpeech: "Phrase",
    meaningDe: "Informelle Frage nach dem Befinden", meaningEn: "How's it going?",
    example: "Hey! Wie geht's?", exampleEn: "Hey! How's it going?",
    level: "A1", category: "greetings"
  },

  // ══════════════════════════════════════════════════════════════
  // MENSCHEN & FAMILIE
  // ══════════════════════════════════════════════════════════════
  {
    word: "Mann", article: "der", plural: "Männer", partOfSpeech: "Nomen", ipa: "man",
    meaningDe: "Erwachsene männliche Person", meaningEn: "Man / Husband",
    example: "Der Mann trinkt Kaffee.", exampleEn: "The man drinks coffee.",
    level: "A1", category: "people"
  },
  {
    word: "Frau", article: "die", plural: "Frauen", partOfSpeech: "Nomen", ipa: "fʁaʊ̯",
    meaningDe: "Erwachsene weibliche Person; Anrede", meaningEn: "Woman / Mrs.",
    example: "Die Frau liest ein Buch.", exampleEn: "The woman reads a book.",
    level: "A1", category: "people"
  },
  {
    word: "Kind", article: "das", plural: "Kinder", partOfSpeech: "Nomen", ipa: "kɪnt",
    meaningDe: "Junger Mensch", meaningEn: "Child",
    example: "Das Kind spielt im Park.", exampleEn: "The child plays in the park.",
    level: "A1", category: "people"
  },
  {
    word: "Mutter", article: "die", plural: "Mütter", partOfSpeech: "Nomen", ipa: "ˈmʊtɐ",
    meaningDe: "Weiblicher Elternteil", meaningEn: "Mother",
    example: "Meine Mutter kocht sehr gut.", exampleEn: "My mother cooks very well.",
    level: "A1", category: "people"
  },
  {
    word: "Vater", article: "der", plural: "Väter", partOfSpeech: "Nomen", ipa: "ˈfaːtɐ",
    meaningDe: "Männlicher Elternteil", meaningEn: "Father",
    example: "Mein Vater arbeitet in Berlin.", exampleEn: "My father works in Berlin.",
    level: "A1", category: "people"
  },
  {
    word: "Bruder", article: "der", plural: "Brüder", partOfSpeech: "Nomen", ipa: "ˈbʁuːdɐ",
    meaningDe: "Männliches Geschwister", meaningEn: "Brother",
    example: "Mein Bruder ist 25 Jahre alt.", exampleEn: "My brother is 25 years old.",
    level: "A1", category: "people"
  },
  {
    word: "Schwester", article: "die", plural: "Schwestern", partOfSpeech: "Nomen", ipa: "ˈʃvɛstɐ",
    meaningDe: "Weibliches Geschwister", meaningEn: "Sister",
    example: "Meine Schwester studiert Medizin.", exampleEn: "My sister studies medicine.",
    level: "A1", category: "people"
  },
  {
    word: "Freund", article: "der", plural: "Freunde", partOfSpeech: "Nomen", ipa: "fʁɔʏ̯nt",
    meaningDe: "Person, mit der man befreundet ist; auch: Partner", meaningEn: "Friend / Boyfriend",
    example: "Das ist mein Freund Max.", exampleEn: "This is my friend Max.",
    level: "A1", category: "people"
  },
  {
    word: "Freundin", article: "die", plural: "Freundinnen", partOfSpeech: "Nomen",
    meaningDe: "Weibliche befreundete Person; auch: Partnerin", meaningEn: "Friend (f) / Girlfriend",
    example: "Meine Freundin kommt aus Spanien.", exampleEn: "My friend comes from Spain.",
    level: "A1", category: "people"
  },
  {
    word: "Lehrer", article: "der", plural: "Lehrer", partOfSpeech: "Nomen",
    meaningDe: "Person, die unterrichtet", meaningEn: "Teacher (m)",
    example: "Der Lehrer erklärt die Grammatik.", exampleEn: "The teacher explains the grammar.",
    level: "A1", category: "people"
  },
  {
    word: "Lehrerin", article: "die", plural: "Lehrerinnen", partOfSpeech: "Nomen",
    meaningDe: "Weibliche Person, die unterrichtet", meaningEn: "Teacher (f)",
    example: "Die Lehrerin ist sehr nett.", exampleEn: "The teacher is very nice.",
    level: "A1", category: "people"
  },
  {
    word: "Junge", article: "der", plural: "Jungen", partOfSpeech: "Nomen",
    meaningDe: "Männliches Kind", meaningEn: "Boy",
    example: "Der Junge spielt Fußball.", exampleEn: "The boy plays football.",
    level: "A1", category: "people"
  },
  {
    word: "Mädchen", article: "das", plural: "Mädchen", partOfSpeech: "Nomen",
    meaningDe: "Weibliches Kind", meaningEn: "Girl",
    example: "Das Mädchen lacht.", exampleEn: "The girl laughs.",
    level: "A1", category: "people"
  },

  // ══════════════════════════════════════════════════════════════
  // ESSEN & TRINKEN
  // ══════════════════════════════════════════════════════════════
  {
    word: "Wasser", article: "das", partOfSpeech: "Nomen", ipa: "ˈvasɐ",
    meaningDe: "Klare Flüssigkeit zum Trinken", meaningEn: "Water",
    example: "Ein Glas Wasser, bitte.", exampleEn: "A glass of water, please.",
    level: "A1", category: "food"
  },
  {
    word: "Kaffee", article: "der", partOfSpeech: "Nomen", ipa: "ˈkafe",
    meaningDe: "Heißgetränk aus gerösteten Bohnen", meaningEn: "Coffee",
    example: "Ich trinke morgens immer Kaffee.", exampleEn: "I always drink coffee in the morning.",
    level: "A1", category: "food"
  },
  {
    word: "Tee", article: "der", plural: "Tees", partOfSpeech: "Nomen", ipa: "teː",
    meaningDe: "Heißgetränk aus aufgebrühten Blättern", meaningEn: "Tea",
    example: "Möchten Sie Tee oder Kaffee?", exampleEn: "Would you like tea or coffee?",
    level: "A1", category: "food"
  },
  {
    word: "Bier", article: "das", plural: "Biere", partOfSpeech: "Nomen", ipa: "biːɐ̯",
    meaningDe: "Alkoholisches Getränk aus Hopfen und Malz", meaningEn: "Beer",
    example: "Ein Bier, bitte!", exampleEn: "A beer, please!",
    level: "A1", category: "food", tags: ["Kultur"]
  },
  {
    word: "Brot", article: "das", plural: "Brote", partOfSpeech: "Nomen", ipa: "bʁoːt",
    meaningDe: "Grundnahrungsmittel aus Mehl", meaningEn: "Bread",
    example: "In Deutschland gibt es über 300 Brotsorten.", exampleEn: "In Germany there are over 300 types of bread.",
    level: "A1", category: "food", tags: ["Kultur"]
  },
  {
    word: "Brötchen", article: "das", plural: "Brötchen", partOfSpeech: "Nomen",
    meaningDe: "Kleines rundes Brot", meaningEn: "Roll / Bread roll",
    example: "Zum Frühstück esse ich ein Brötchen.", exampleEn: "For breakfast I eat a bread roll.",
    level: "A1", category: "food"
  },
  {
    word: "Kuchen", article: "der", plural: "Kuchen", partOfSpeech: "Nomen",
    meaningDe: "Süßes Gebäck", meaningEn: "Cake",
    example: "Der Kuchen schmeckt lecker!", exampleEn: "The cake tastes delicious!",
    level: "A1", category: "food"
  },
  {
    word: "Apfel", article: "der", plural: "Äpfel", partOfSpeech: "Nomen", ipa: "ˈapfl̩",
    meaningDe: "Rundes Obst", meaningEn: "Apple",
    example: "Ich esse jeden Tag einen Apfel.", exampleEn: "I eat an apple every day.",
    level: "A1", category: "food"
  },
  {
    word: "Milch", article: "die", partOfSpeech: "Nomen", ipa: "mɪlç",
    meaningDe: "Weißes Getränk von der Kuh", meaningEn: "Milk",
    example: "Ich trinke Kaffee mit Milch.", exampleEn: "I drink coffee with milk.",
    level: "A1", category: "food"
  },
  {
    word: "Fleisch", article: "das", partOfSpeech: "Nomen", ipa: "flaɪ̯ʃ",
    meaningDe: "Essbares Tierkörpergewebe", meaningEn: "Meat",
    example: "Ich esse kein Fleisch. Ich bin Vegetarier.", exampleEn: "I don't eat meat. I'm a vegetarian.",
    level: "A1", category: "food"
  },
  {
    word: "Käse", article: "der", partOfSpeech: "Nomen", ipa: "ˈkɛːzə",
    meaningDe: "Milchprodukt", meaningEn: "Cheese",
    example: "Ein Brötchen mit Käse, bitte.", exampleEn: "A roll with cheese, please.",
    level: "A1", category: "food"
  },
  {
    word: "Suppe", article: "die", plural: "Suppen", partOfSpeech: "Nomen",
    meaningDe: "Warme flüssige Speise", meaningEn: "Soup",
    example: "Die Suppe ist heiß.", exampleEn: "The soup is hot.",
    level: "A1", category: "food"
  },
  {
    word: "Frühstück", article: "das", partOfSpeech: "Nomen", ipa: "ˈfʁyːʃtʏk",
    meaningDe: "Erste Mahlzeit des Tages", meaningEn: "Breakfast",
    example: "Das Frühstück ist von 7 bis 10 Uhr.", exampleEn: "Breakfast is from 7 to 10.",
    level: "A1", category: "food"
  },
  {
    word: "Mittagessen", article: "das", partOfSpeech: "Nomen",
    meaningDe: "Mahlzeit am Mittag", meaningEn: "Lunch",
    example: "Was gibt es zum Mittagessen?", exampleEn: "What's for lunch?",
    level: "A1", category: "food"
  },
  {
    word: "Abendessen", article: "das", partOfSpeech: "Nomen",
    meaningDe: "Mahlzeit am Abend", meaningEn: "Dinner",
    example: "Wir essen das Abendessen um 19 Uhr.", exampleEn: "We eat dinner at 7 PM.",
    level: "A1", category: "food"
  },

  // ══════════════════════════════════════════════════════════════
  // REISE & VERKEHR
  // ══════════════════════════════════════════════════════════════
  {
    word: "Flughafen", article: "der", plural: "Flughäfen", partOfSpeech: "Nomen", ipa: "ˈfluːkˌhaːfn̩",
    meaningDe: "Ort, wo Flugzeuge starten und landen", meaningEn: "Airport",
    example: "Der Flughafen Berlin Brandenburg ist neu.", exampleEn: "Berlin Brandenburg Airport is new.",
    level: "A1", category: "travel"
  },
  {
    word: "Bahnhof", article: "der", plural: "Bahnhöfe", partOfSpeech: "Nomen", ipa: "ˈbaːnˌhoːf",
    meaningDe: "Ort, wo Züge halten", meaningEn: "Train station",
    example: "Der Hauptbahnhof ist im Zentrum.", exampleEn: "The main station is in the center.",
    level: "A1", category: "travel"
  },
  {
    word: "Taxi", article: "das", plural: "Taxis", partOfSpeech: "Nomen",
    meaningDe: "Mietwagen mit Fahrer", meaningEn: "Taxi",
    example: "Ich brauche ein Taxi zum Bahnhof.", exampleEn: "I need a taxi to the train station.",
    level: "A1", category: "travel"
  },
  {
    word: "Zug", article: "der", plural: "Züge", partOfSpeech: "Nomen", ipa: "tsuːk",
    meaningDe: "Schienenfahrzeug für Passagiere", meaningEn: "Train",
    example: "Der Zug nach München fährt um 10 Uhr.", exampleEn: "The train to Munich leaves at 10.",
    level: "A1", category: "travel"
  },
  {
    word: "Bus", article: "der", plural: "Busse", partOfSpeech: "Nomen", ipa: "bʊs",
    meaningDe: "Großes Straßenfahrzeug für viele Passagiere", meaningEn: "Bus",
    example: "Der Bus kommt in 5 Minuten.", exampleEn: "The bus comes in 5 minutes.",
    level: "A1", category: "travel"
  },
  {
    word: "U-Bahn", article: "die", plural: "U-Bahnen", partOfSpeech: "Nomen",
    meaningDe: "Unterirdische Bahn in der Stadt", meaningEn: "Subway / Underground",
    example: "Die U-Bahn fährt alle 5 Minuten.", exampleEn: "The subway runs every 5 minutes.",
    level: "A1", category: "travel"
  },
  {
    word: "Straße", article: "die", plural: "Straßen", partOfSpeech: "Nomen", ipa: "ˈʃtʁaːsə",
    meaningDe: "Weg für den Verkehr", meaningEn: "Street / Road",
    example: "Die Straße ist sehr lang.", exampleEn: "The street is very long.",
    level: "A1", category: "travel"
  },
  {
    word: "Hotel", article: "das", plural: "Hotels", partOfSpeech: "Nomen",
    meaningDe: "Unterkunft für Reisende", meaningEn: "Hotel",
    example: "Das Hotel hat ein gutes Frühstück.", exampleEn: "The hotel has a good breakfast.",
    level: "A1", category: "travel"
  },
  {
    word: "Ticket", article: "das", plural: "Tickets", partOfSpeech: "Nomen",
    meaningDe: "Fahrkarte", meaningEn: "Ticket",
    example: "Ein Ticket nach Hamburg, bitte.", exampleEn: "A ticket to Hamburg, please.",
    level: "A1", category: "travel"
  },
  {
    word: "Koffer", article: "der", plural: "Koffer", partOfSpeech: "Nomen",
    meaningDe: "Behälter für Kleidung auf Reisen", meaningEn: "Suitcase",
    example: "Mein Koffer ist sehr schwer.", exampleEn: "My suitcase is very heavy.",
    level: "A1", category: "travel"
  },
  {
    word: "Reise", article: "die", plural: "Reisen", partOfSpeech: "Nomen",
    meaningDe: "Fahrt zu einem entfernten Ort", meaningEn: "Journey / Trip",
    example: "Die Reise nach Berlin dauert 4 Stunden.", exampleEn: "The trip to Berlin takes 4 hours.",
    level: "A1", category: "travel"
  },

  // ══════════════════════════════════════════════════════════════
  // WOHNUNG & HAUS
  // ══════════════════════════════════════════════════════════════
  {
    word: "Wohnung", article: "die", plural: "Wohnungen", partOfSpeech: "Nomen",
    meaningDe: "Räume zum Wohnen in einem Haus", meaningEn: "Apartment / Flat",
    example: "Die Wohnung hat 3 Zimmer.", exampleEn: "The apartment has 3 rooms.",
    level: "A1", category: "home"
  },
  {
    word: "Zimmer", article: "das", plural: "Zimmer", partOfSpeech: "Nomen", ipa: "ˈtsɪmɐ",
    meaningDe: "Raum in einem Gebäude", meaningEn: "Room",
    example: "Mein Zimmer ist groß und hell.", exampleEn: "My room is big and bright.",
    level: "A1", category: "home"
  },
  {
    word: "Küche", article: "die", plural: "Küchen", partOfSpeech: "Nomen", ipa: "ˈkʏçə",
    meaningDe: "Raum zum Kochen", meaningEn: "Kitchen",
    example: "Ich koche in der Küche.", exampleEn: "I cook in the kitchen.",
    level: "A1", category: "home"
  },
  {
    word: "Bad", article: "das", plural: "Bäder", partOfSpeech: "Nomen",
    meaningDe: "Raum zum Waschen; Badezimmer", meaningEn: "Bathroom",
    example: "Das Bad ist links.", exampleEn: "The bathroom is on the left.",
    level: "A1", category: "home"
  },
  {
    word: "Schlüssel", article: "der", plural: "Schlüssel", partOfSpeech: "Nomen", ipa: "ˈʃlʏsl̩",
    meaningDe: "Gerät zum Öffnen von Schlössern", meaningEn: "Key",
    example: "Hier ist Ihr Schlüssel.", exampleEn: "Here is your key.",
    level: "A1", category: "home"
  },
  {
    word: "Tisch", article: "der", plural: "Tische", partOfSpeech: "Nomen", ipa: "tɪʃ",
    meaningDe: "Möbelstück mit flacher Oberfläche", meaningEn: "Table",
    example: "Das Buch liegt auf dem Tisch.", exampleEn: "The book is on the table.",
    level: "A1", category: "home"
  },
  {
    word: "Stuhl", article: "der", plural: "Stühle", partOfSpeech: "Nomen", ipa: "ʃtuːl",
    meaningDe: "Möbelstück zum Sitzen", meaningEn: "Chair",
    example: "Bitte, nehmen Sie Platz auf dem Stuhl.", exampleEn: "Please, take a seat on the chair.",
    level: "A1", category: "home"
  },
  {
    word: "Bett", article: "das", plural: "Betten", partOfSpeech: "Nomen", ipa: "bɛt",
    meaningDe: "Möbelstück zum Schlafen", meaningEn: "Bed",
    example: "Das Bett ist sehr bequem.", exampleEn: "The bed is very comfortable.",
    level: "A1", category: "home"
  },
  {
    word: "Tür", article: "die", plural: "Türen", partOfSpeech: "Nomen", ipa: "tyːɐ̯",
    meaningDe: "Öffnung zum Betreten eines Raums", meaningEn: "Door",
    example: "Bitte machen Sie die Tür zu.", exampleEn: "Please close the door.",
    level: "A1", category: "home"
  },
  {
    word: "Fenster", article: "das", plural: "Fenster", partOfSpeech: "Nomen",
    meaningDe: "Glasöffnung in der Wand", meaningEn: "Window",
    example: "Kann ich das Fenster öffnen?", exampleEn: "Can I open the window?",
    level: "A1", category: "home"
  },

  // ══════════════════════════════════════════════════════════════
  // ZAHLEN & ZEIT
  // ══════════════════════════════════════════════════════════════
  {
    word: "Uhr", article: "die", plural: "Uhren", partOfSpeech: "Nomen", ipa: "uːɐ̯",
    meaningDe: "Gerät zur Zeitmessung; auch Zeitangabe", meaningEn: "Clock / O'clock",
    example: "Es ist 10 Uhr.", exampleEn: "It is 10 o'clock.",
    level: "A1", category: "numbers"
  },
  {
    word: "Tag", article: "der", plural: "Tage", partOfSpeech: "Nomen", ipa: "taːk",
    meaningDe: "Zeitraum von 24 Stunden", meaningEn: "Day",
    example: "Heute ist ein schöner Tag.", exampleEn: "Today is a beautiful day.",
    level: "A1", category: "numbers"
  },
  {
    word: "Woche", article: "die", plural: "Wochen", partOfSpeech: "Nomen",
    meaningDe: "Zeitraum von 7 Tagen", meaningEn: "Week",
    example: "Nächste Woche habe ich Urlaub.", exampleEn: "Next week I have vacation.",
    level: "A1", category: "numbers"
  },
  {
    word: "Monat", article: "der", plural: "Monate", partOfSpeech: "Nomen",
    meaningDe: "Zeitraum von ca. 30 Tagen", meaningEn: "Month",
    example: "Ich lerne seit einem Monat Deutsch.", exampleEn: "I've been learning German for a month.",
    level: "A1", category: "numbers"
  },
  {
    word: "Jahr", article: "das", plural: "Jahre", partOfSpeech: "Nomen", ipa: "jaːɐ̯",
    meaningDe: "Zeitraum von 12 Monaten", meaningEn: "Year",
    example: "Ich bin 25 Jahre alt.", exampleEn: "I am 25 years old.",
    level: "A1", category: "numbers"
  },
  {
    word: "heute", partOfSpeech: "Adverb",
    meaningDe: "An diesem Tag", meaningEn: "Today",
    example: "Heute ist Montag.", exampleEn: "Today is Monday.",
    level: "A1", category: "numbers"
  },
  {
    word: "morgen", partOfSpeech: "Adverb",
    meaningDe: "Am nächsten Tag", meaningEn: "Tomorrow",
    example: "Morgen fahren wir nach Hamburg.", exampleEn: "Tomorrow we're going to Hamburg.",
    level: "A1", category: "numbers"
  },
  {
    word: "gestern", partOfSpeech: "Adverb",
    meaningDe: "Am Tag zuvor", meaningEn: "Yesterday",
    example: "Gestern war ich im Museum.", exampleEn: "Yesterday I was at the museum.",
    level: "A1", category: "numbers"
  },

  // ══════════════════════════════════════════════════════════════
  // EINKAUFEN & GELD
  // ══════════════════════════════════════════════════════════════
  {
    word: "Geld", article: "das", partOfSpeech: "Nomen", ipa: "ɡɛlt",
    meaningDe: "Zahlungsmittel", meaningEn: "Money",
    example: "Ich habe nicht genug Geld.", exampleEn: "I don't have enough money.",
    level: "A1", category: "shopping"
  },
  {
    word: "Euro", article: "der", plural: "Euro", partOfSpeech: "Nomen",
    meaningDe: "Europäische Währung", meaningEn: "Euro",
    example: "Das kostet fünf Euro.", exampleEn: "That costs five euros.",
    level: "A1", category: "shopping"
  },
  {
    word: "Supermarkt", article: "der", plural: "Supermärkte", partOfSpeech: "Nomen",
    meaningDe: "Großes Geschäft für Lebensmittel", meaningEn: "Supermarket",
    example: "Ich gehe zum Supermarkt.", exampleEn: "I'm going to the supermarket.",
    level: "A1", category: "shopping"
  },
  {
    word: "Geschäft", article: "das", plural: "Geschäfte", partOfSpeech: "Nomen",
    meaningDe: "Laden; auch: geschäftliche Angelegenheit", meaningEn: "Shop / Business",
    example: "Das Geschäft ist von 9 bis 18 Uhr geöffnet.", exampleEn: "The shop is open from 9 to 6.",
    level: "A1", category: "shopping"
  },
  {
    word: "teuer", partOfSpeech: "Adjektiv", ipa: "ˈtɔʏ̯ɐ",
    meaningDe: "Viel Geld kostend", meaningEn: "Expensive",
    example: "Berlin ist nicht so teuer wie München.", exampleEn: "Berlin is not as expensive as Munich.",
    level: "A1", category: "shopping"
  },
  {
    word: "billig", partOfSpeech: "Adjektiv",
    meaningDe: "Wenig Geld kostend", meaningEn: "Cheap",
    example: "Das Brot ist sehr billig.", exampleEn: "The bread is very cheap.",
    level: "A1", category: "shopping"
  },
  {
    word: "kaufen", partOfSpeech: "Verb", ipa: "ˈkaʊ̯fn̩",
    meaningDe: "Gegen Geld erwerben", meaningEn: "To buy",
    example: "Ich kaufe Obst im Supermarkt.", exampleEn: "I buy fruit at the supermarket.",
    level: "A1", category: "shopping",
    conjugation: ["kaufe", "kaufst", "kauft", "kaufen", "kauft", "kaufen"]
  },
  {
    word: "bezahlen", partOfSpeech: "Verb",
    meaningDe: "Den Preis für etwas geben", meaningEn: "To pay",
    example: "Kann ich mit Karte bezahlen?", exampleEn: "Can I pay by card?",
    level: "A1", category: "shopping",
    conjugation: ["bezahle", "bezahlst", "bezahlt", "bezahlen", "bezahlt", "bezahlen"]
  },

  // ══════════════════════════════════════════════════════════════
  // STADT & ORIENTIERUNG
  // ══════════════════════════════════════════════════════════════
  {
    word: "Stadt", article: "die", plural: "Städte", partOfSpeech: "Nomen", ipa: "ʃtat",
    meaningDe: "Großer bewohnter Ort", meaningEn: "City",
    example: "Berlin ist eine große Stadt.", exampleEn: "Berlin is a big city.",
    level: "A1", category: "city"
  },
  {
    word: "links", partOfSpeech: "Adverb",
    meaningDe: "In Richtung der linken Seite", meaningEn: "Left",
    example: "Gehen Sie links.", exampleEn: "Go left.",
    level: "A1", category: "city"
  },
  {
    word: "rechts", partOfSpeech: "Adverb",
    meaningDe: "In Richtung der rechten Seite", meaningEn: "Right",
    example: "Die Apotheke ist rechts.", exampleEn: "The pharmacy is on the right.",
    level: "A1", category: "city"
  },
  {
    word: "geradeaus", partOfSpeech: "Adverb",
    meaningDe: "In die gleiche Richtung weiter", meaningEn: "Straight ahead",
    example: "Gehen Sie geradeaus und dann links.", exampleEn: "Go straight ahead and then left.",
    level: "A1", category: "city"
  },
  {
    word: "Apotheke", article: "die", plural: "Apotheken", partOfSpeech: "Nomen",
    meaningDe: "Geschäft für Medikamente", meaningEn: "Pharmacy",
    example: "Wo ist die nächste Apotheke?", exampleEn: "Where is the nearest pharmacy?",
    level: "A1", category: "city"
  },
  {
    word: "Restaurant", article: "das", plural: "Restaurants", partOfSpeech: "Nomen",
    meaningDe: "Ort, wo man essen kann", meaningEn: "Restaurant",
    example: "Kennen Sie ein gutes Restaurant?", exampleEn: "Do you know a good restaurant?",
    level: "A1", category: "city"
  },
  {
    word: "Café", article: "das", plural: "Cafés", partOfSpeech: "Nomen",
    meaningDe: "Ort für Kaffee und Kuchen", meaningEn: "Café",
    example: "Treffen wir uns im Café.", exampleEn: "Let's meet at the café.",
    level: "A1", category: "city"
  },
  {
    word: "Krankenhaus", article: "das", plural: "Krankenhäuser", partOfSpeech: "Nomen",
    meaningDe: "Gebäude für kranke Menschen", meaningEn: "Hospital",
    example: "Das Krankenhaus ist in der Nähe.", exampleEn: "The hospital is nearby.",
    level: "A1", category: "city"
  },

  // ══════════════════════════════════════════════════════════════
  // WICHTIGE VERBEN
  // ══════════════════════════════════════════════════════════════
  {
    word: "sein", partOfSpeech: "Verb", ipa: "zaɪ̯n",
    meaningDe: "Existieren; sich in einem Zustand befinden", meaningEn: "To be",
    example: "Ich bin Student.", exampleEn: "I am a student.",
    level: "A1", category: "verbs",
    conjugation: ["bin", "bist", "ist", "sind", "seid", "sind"]
  },
  {
    word: "haben", partOfSpeech: "Verb", ipa: "ˈhaːbn̩",
    meaningDe: "Besitzen; Hilfsverb", meaningEn: "To have",
    example: "Ich habe eine Frage.", exampleEn: "I have a question.",
    level: "A1", category: "verbs",
    conjugation: ["habe", "hast", "hat", "haben", "habt", "haben"]
  },
  {
    word: "machen", partOfSpeech: "Verb", ipa: "ˈmaxn̩",
    meaningDe: "Tun, herstellen", meaningEn: "To do / To make",
    example: "Was machst du heute?", exampleEn: "What are you doing today?",
    level: "A1", category: "verbs",
    conjugation: ["mache", "machst", "macht", "machen", "macht", "machen"]
  },
  {
    word: "gehen", partOfSpeech: "Verb", ipa: "ˈɡeːən",
    meaningDe: "Sich zu Fuß bewegen", meaningEn: "To go / To walk",
    example: "Ich gehe ins Kino.", exampleEn: "I'm going to the cinema.",
    level: "A1", category: "verbs",
    conjugation: ["gehe", "gehst", "geht", "gehen", "geht", "gehen"]
  },
  {
    word: "kommen", partOfSpeech: "Verb", ipa: "ˈkɔmən",
    meaningDe: "Sich nähern; den Ursprung haben", meaningEn: "To come",
    example: "Ich komme aus Spanien.", exampleEn: "I come from Spain.",
    level: "A1", category: "verbs",
    conjugation: ["komme", "kommst", "kommt", "kommen", "kommt", "kommen"]
  },
  {
    word: "sprechen", partOfSpeech: "Verb", ipa: "ˈʃpʁɛçn̩",
    meaningDe: "Wörter und Sätze sagen", meaningEn: "To speak",
    example: "Sprechen Sie Deutsch?", exampleEn: "Do you speak German?",
    level: "A1", category: "verbs",
    conjugation: ["spreche", "sprichst", "spricht", "sprechen", "sprecht", "sprechen"]
  },
  {
    word: "essen", partOfSpeech: "Verb", ipa: "ˈɛsn̩",
    meaningDe: "Nahrung zu sich nehmen", meaningEn: "To eat",
    example: "Wir essen zu Mittag.", exampleEn: "We're eating lunch.",
    level: "A1", category: "verbs",
    conjugation: ["esse", "isst", "isst", "essen", "esst", "essen"]
  },
  {
    word: "trinken", partOfSpeech: "Verb", ipa: "ˈtʁɪŋkn̩",
    meaningDe: "Flüssigkeit zu sich nehmen", meaningEn: "To drink",
    example: "Was möchten Sie trinken?", exampleEn: "What would you like to drink?",
    level: "A1", category: "verbs",
    conjugation: ["trinke", "trinkst", "trinkt", "trinken", "trinkt", "trinken"]
  },
  {
    word: "wohnen", partOfSpeech: "Verb", ipa: "ˈvoːnən",
    meaningDe: "Seinen Wohnsitz haben", meaningEn: "To live (reside)",
    example: "Wo wohnst du?", exampleEn: "Where do you live?",
    level: "A1", category: "verbs",
    conjugation: ["wohne", "wohnst", "wohnt", "wohnen", "wohnt", "wohnen"]
  },
  {
    word: "arbeiten", partOfSpeech: "Verb", ipa: "ˈaʁbaɪ̯tn̩",
    meaningDe: "Beruflich tätig sein", meaningEn: "To work",
    example: "Ich arbeite als Ingenieur.", exampleEn: "I work as an engineer.",
    level: "A1", category: "verbs",
    conjugation: ["arbeite", "arbeitest", "arbeitet", "arbeiten", "arbeitet", "arbeiten"]
  },
  {
    word: "lernen", partOfSpeech: "Verb", ipa: "ˈlɛʁnən",
    meaningDe: "Sich Wissen aneignen", meaningEn: "To learn / To study",
    example: "Ich lerne Deutsch.", exampleEn: "I'm learning German.",
    level: "A1", category: "verbs",
    conjugation: ["lerne", "lernst", "lernt", "lernen", "lernt", "lernen"]
  },
  {
    word: "heißen", partOfSpeech: "Verb", ipa: "ˈhaɪ̯sn̩",
    meaningDe: "Einen Namen tragen", meaningEn: "To be called",
    example: "Ich heiße Anna. Wie heißen Sie?", exampleEn: "My name is Anna. What is your name?",
    level: "A1", category: "verbs",
    conjugation: ["heiße", "heißt", "heißt", "heißen", "heißt", "heißen"]
  },
  {
    word: "brauchen", partOfSpeech: "Verb",
    meaningDe: "Nötig haben", meaningEn: "To need",
    example: "Ich brauche Hilfe.", exampleEn: "I need help.",
    level: "A1", category: "verbs",
    conjugation: ["brauche", "brauchst", "braucht", "brauchen", "braucht", "brauchen"]
  },
  {
    word: "können", partOfSpeech: "Verb", ipa: "ˈkœnən",
    meaningDe: "In der Lage sein; Erlaubnis haben", meaningEn: "Can / To be able to",
    example: "Können Sie mir helfen?", exampleEn: "Can you help me?",
    level: "A1", category: "verbs",
    conjugation: ["kann", "kannst", "kann", "können", "könnt", "können"],
    tags: ["Modalverb"]
  },
  {
    word: "möchten", partOfSpeech: "Verb",
    meaningDe: "Einen Wunsch haben (höflich)", meaningEn: "Would like",
    example: "Ich möchte einen Kaffee, bitte.", exampleEn: "I would like a coffee, please.",
    level: "A1", category: "verbs",
    conjugation: ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"],
    tags: ["Modalverb"]
  },
  {
    word: "müssen", partOfSpeech: "Verb",
    meaningDe: "Gezwungen sein, etwas zu tun", meaningEn: "Must / Have to",
    example: "Ich muss morgen arbeiten.", exampleEn: "I have to work tomorrow.",
    level: "A1", category: "verbs",
    conjugation: ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
    tags: ["Modalverb"]
  },
  {
    word: "wissen", partOfSpeech: "Verb",
    meaningDe: "Kenntnis von etwas haben", meaningEn: "To know (a fact)",
    example: "Ich weiß es nicht.", exampleEn: "I don't know.",
    level: "A1", category: "verbs",
    conjugation: ["weiß", "weißt", "weiß", "wissen", "wisst", "wissen"]
  },
  {
    word: "fahren", partOfSpeech: "Verb", ipa: "ˈfaːʁən",
    meaningDe: "Sich mit einem Fahrzeug bewegen", meaningEn: "To drive / To travel",
    example: "Wir fahren nach Berlin.", exampleEn: "We're going to Berlin.",
    level: "A1", category: "verbs",
    conjugation: ["fahre", "fährst", "fährt", "fahren", "fahrt", "fahren"],
    tags: ["unregelmäßig"]
  },
  {
    word: "schlafen", partOfSpeech: "Verb",
    meaningDe: "Ruhen mit geschlossenen Augen", meaningEn: "To sleep",
    example: "Ich schlafe 8 Stunden.", exampleEn: "I sleep 8 hours.",
    level: "A1", category: "verbs",
    conjugation: ["schlafe", "schläfst", "schläft", "schlafen", "schlaft", "schlafen"],
    tags: ["unregelmäßig"]
  },
  {
    word: "lesen", partOfSpeech: "Verb",
    meaningDe: "Geschriebenes aufnehmen", meaningEn: "To read",
    example: "Ich lese ein Buch.", exampleEn: "I'm reading a book.",
    level: "A1", category: "verbs",
    conjugation: ["lese", "liest", "liest", "lesen", "lest", "lesen"],
    tags: ["unregelmäßig"]
  },
  {
    word: "schreiben", partOfSpeech: "Verb",
    meaningDe: "Text auf Papier oder digital festhalten", meaningEn: "To write",
    example: "Ich schreibe eine E-Mail.", exampleEn: "I'm writing an email.",
    level: "A1", category: "verbs",
    conjugation: ["schreibe", "schreibst", "schreibt", "schreiben", "schreibt", "schreiben"]
  },

  // ══════════════════════════════════════════════════════════════
  // ADJEKTIVE
  // ══════════════════════════════════════════════════════════════
  {
    word: "groß", partOfSpeech: "Adjektiv", ipa: "ɡʁoːs",
    meaningDe: "Von beträchtlicher Größe; hoch gewachsen", meaningEn: "Big / Tall",
    example: "Berlin ist eine große Stadt.", exampleEn: "Berlin is a big city.",
    level: "A1", category: "adjectives"
  },
  {
    word: "klein", partOfSpeech: "Adjektiv", ipa: "klaɪ̯n",
    meaningDe: "Von geringer Größe", meaningEn: "Small / Short",
    example: "Das Kind ist noch klein.", exampleEn: "The child is still small.",
    level: "A1", category: "adjectives"
  },
  {
    word: "gut", partOfSpeech: "Adjektiv", ipa: "ɡuːt",
    meaningDe: "Von hoher Qualität; positiv", meaningEn: "Good",
    example: "Das Essen ist sehr gut.", exampleEn: "The food is very good.",
    level: "A1", category: "adjectives"
  },
  {
    word: "schlecht", partOfSpeech: "Adjektiv", ipa: "ʃlɛçt",
    meaningDe: "Von niedriger Qualität; negativ", meaningEn: "Bad",
    example: "Das Wetter ist schlecht.", exampleEn: "The weather is bad.",
    level: "A1", category: "adjectives"
  },
  {
    word: "schön", partOfSpeech: "Adjektiv", ipa: "ʃøːn",
    meaningDe: "Hübsch, angenehm anzusehen", meaningEn: "Beautiful / Nice",
    example: "Die Stadt ist sehr schön.", exampleEn: "The city is very beautiful.",
    level: "A1", category: "adjectives"
  },
  {
    word: "neu", partOfSpeech: "Adjektiv", ipa: "nɔʏ̯",
    meaningDe: "Erst kürzlich entstanden", meaningEn: "New",
    example: "Ich habe eine neue Wohnung.", exampleEn: "I have a new apartment.",
    level: "A1", category: "adjectives"
  },
  {
    word: "alt", partOfSpeech: "Adjektiv", ipa: "alt",
    meaningDe: "Seit langer Zeit vorhanden; hohes Alter", meaningEn: "Old",
    example: "Wie alt bist du?", exampleEn: "How old are you?",
    level: "A1", category: "adjectives"
  },
  {
    word: "schnell", partOfSpeech: "Adjektiv", ipa: "ʃnɛl",
    meaningDe: "Mit hoher Geschwindigkeit", meaningEn: "Fast / Quick",
    example: "Der Zug ist sehr schnell.", exampleEn: "The train is very fast.",
    level: "A1", category: "adjectives"
  },
  {
    word: "langsam", partOfSpeech: "Adjektiv", ipa: "ˈlaŋzaːm",
    meaningDe: "Mit geringer Geschwindigkeit", meaningEn: "Slow",
    example: "Können Sie bitte langsam sprechen?", exampleEn: "Can you please speak slowly?",
    level: "A1", category: "adjectives"
  },
  {
    word: "kalt", partOfSpeech: "Adjektiv",
    meaningDe: "Niedrige Temperatur", meaningEn: "Cold",
    example: "Im Winter ist es kalt in Berlin.", exampleEn: "In winter it's cold in Berlin.",
    level: "A1", category: "adjectives"
  },
  {
    word: "warm", partOfSpeech: "Adjektiv",
    meaningDe: "Angenehm hohe Temperatur", meaningEn: "Warm",
    example: "Heute ist es warm.", exampleEn: "Today it's warm.",
    level: "A1", category: "adjectives"
  },
  {
    word: "heiß", partOfSpeech: "Adjektiv", ipa: "haɪ̯s",
    meaningDe: "Sehr hohe Temperatur", meaningEn: "Hot",
    example: "Vorsicht, der Kaffee ist heiß!", exampleEn: "Careful, the coffee is hot!",
    level: "A1", category: "adjectives"
  },

  // ══════════════════════════════════════════════════════════════
  // KÖRPER & GESUNDHEIT
  // ══════════════════════════════════════════════════════════════
  {
    word: "Kopf", article: "der", plural: "Köpfe", partOfSpeech: "Nomen",
    meaningDe: "Oberer Teil des Körpers", meaningEn: "Head",
    example: "Ich habe Kopfschmerzen.", exampleEn: "I have a headache.",
    level: "A1", category: "body"
  },
  {
    word: "Arzt", article: "der", plural: "Ärzte", partOfSpeech: "Nomen", ipa: "aːɐ̯tst",
    meaningDe: "Person, die kranke Menschen behandelt", meaningEn: "Doctor",
    example: "Ich muss zum Arzt gehen.", exampleEn: "I have to go to the doctor.",
    level: "A1", category: "body"
  },
  {
    word: "krank", partOfSpeech: "Adjektiv",
    meaningDe: "Nicht gesund", meaningEn: "Sick / Ill",
    example: "Ich bin krank. Ich bleibe zu Hause.", exampleEn: "I'm sick. I'm staying home.",
    level: "A1", category: "body"
  },
  {
    word: "gesund", partOfSpeech: "Adjektiv",
    meaningDe: "Bei guter Gesundheit", meaningEn: "Healthy",
    example: "Obst ist gesund.", exampleEn: "Fruit is healthy.",
    level: "A1", category: "body"
  },

  // ══════════════════════════════════════════════════════════════
  // NATUR & WETTER
  // ══════════════════════════════════════════════════════════════
  {
    word: "Wetter", article: "das", partOfSpeech: "Nomen", ipa: "ˈvɛtɐ",
    meaningDe: "Zustand der Atmosphäre", meaningEn: "Weather",
    example: "Wie ist das Wetter heute?", exampleEn: "How is the weather today?",
    level: "A1", category: "nature"
  },
  {
    word: "Sonne", article: "die", plural: "Sonnen", partOfSpeech: "Nomen",
    meaningDe: "Stern, der die Erde erwärmt", meaningEn: "Sun",
    example: "Die Sonne scheint heute.", exampleEn: "The sun is shining today.",
    level: "A1", category: "nature"
  },
  {
    word: "Regen", article: "der", partOfSpeech: "Nomen",
    meaningDe: "Wasser, das vom Himmel fällt", meaningEn: "Rain",
    example: "Es gibt Regen in Hamburg.", exampleEn: "There is rain in Hamburg.",
    level: "A1", category: "nature"
  },

  // ══════════════════════════════════════════════════════════════
  // ARBEIT & BERUF
  // ══════════════════════════════════════════════════════════════
  {
    word: "Arbeit", article: "die", plural: "Arbeiten", partOfSpeech: "Nomen",
    meaningDe: "Berufliche Tätigkeit", meaningEn: "Work / Job",
    example: "Die Arbeit macht mir Spaß.", exampleEn: "I enjoy the work.",
    level: "A1", category: "work"
  },
  {
    word: "Beruf", article: "der", plural: "Berufe", partOfSpeech: "Nomen",
    meaningDe: "Art der beruflichen Tätigkeit", meaningEn: "Profession / Occupation",
    example: "Was ist Ihr Beruf?", exampleEn: "What is your profession?",
    level: "A1", category: "work"
  },
  {
    word: "Student", article: "der", plural: "Studenten", partOfSpeech: "Nomen",
    meaningDe: "Person, die an einer Universität studiert", meaningEn: "Student (m)",
    example: "Ich bin Student in Berlin.", exampleEn: "I am a student in Berlin.",
    level: "A1", category: "work"
  },
  {
    word: "Studentin", article: "die", plural: "Studentinnen", partOfSpeech: "Nomen",
    meaningDe: "Weibliche Person, die an einer Universität studiert", meaningEn: "Student (f)",
    example: "Sie ist Studentin an der FU Berlin.", exampleEn: "She is a student at FU Berlin.",
    level: "A1", category: "work"
  },

  // ══════════════════════════════════════════════════════════════
  // SCHULE & LERNEN
  // ══════════════════════════════════════════════════════════════
  {
    word: "Schule", article: "die", plural: "Schulen", partOfSpeech: "Nomen",
    meaningDe: "Bildungseinrichtung", meaningEn: "School",
    example: "Die Kinder gehen in die Schule.", exampleEn: "The children go to school.",
    level: "A1", category: "school"
  },
  {
    word: "Buch", article: "das", plural: "Bücher", partOfSpeech: "Nomen", ipa: "buːx",
    meaningDe: "Gedrucktes Werk zum Lesen", meaningEn: "Book",
    example: "Ich lese ein Buch auf Deutsch.", exampleEn: "I'm reading a book in German.",
    level: "A1", category: "school"
  },
  {
    word: "Deutsch", partOfSpeech: "Nomen",
    meaningDe: "Die deutsche Sprache", meaningEn: "German (language)",
    example: "Ich lerne Deutsch seit einem Monat.", exampleEn: "I've been learning German for a month.",
    level: "A1", category: "school"
  },
  {
    word: "Sprache", article: "die", plural: "Sprachen", partOfSpeech: "Nomen",
    meaningDe: "System zur Kommunikation", meaningEn: "Language",
    example: "Deutsch ist eine schöne Sprache.", exampleEn: "German is a beautiful language.",
    level: "A1", category: "school"
  },
  {
    word: "Wort", article: "das", plural: "Wörter", partOfSpeech: "Nomen",
    meaningDe: "Kleinste selbstständige Einheit der Sprache", meaningEn: "Word",
    example: "Wie heißt dieses Wort auf Deutsch?", exampleEn: "What is this word in German?",
    level: "A1", category: "school"
  },
  {
    word: "verstehen", partOfSpeech: "Verb",
    meaningDe: "Den Sinn erfassen", meaningEn: "To understand",
    example: "Ich verstehe das nicht.", exampleEn: "I don't understand that.",
    level: "A1", category: "school",
    conjugation: ["verstehe", "verstehst", "versteht", "verstehen", "versteht", "verstehen"]
  },

  // ══════════════════════════════════════════════════════════════
  // GEFÜHLE & MEINUNGEN
  // ══════════════════════════════════════════════════════════════
  {
    word: "froh", partOfSpeech: "Adjektiv",
    meaningDe: "Glücklich, zufrieden", meaningEn: "Happy / Glad",
    example: "Ich bin froh, dass du da bist.", exampleEn: "I'm glad you're here.",
    level: "A1", category: "feelings"
  },
  {
    word: "traurig", partOfSpeech: "Adjektiv",
    meaningDe: "Betrübt, nicht fröhlich", meaningEn: "Sad",
    example: "Warum bist du traurig?", exampleEn: "Why are you sad?",
    level: "A1", category: "feelings"
  },
  {
    word: "müde", partOfSpeech: "Adjektiv", ipa: "ˈmyːdə",
    meaningDe: "Schlafbedürftig", meaningEn: "Tired",
    example: "Ich bin müde. Gute Nacht!", exampleEn: "I'm tired. Good night!",
    level: "A1", category: "feelings"
  },
  {
    word: "hungrig", partOfSpeech: "Adjektiv",
    meaningDe: "Hunger habend", meaningEn: "Hungry",
    example: "Ich bin hungrig. Essen wir!", exampleEn: "I'm hungry. Let's eat!",
    level: "A1", category: "feelings"
  },

  // ══════════════════════════════════════════════════════════════
  // REDEWENDUNGEN & PHRASEN
  // ══════════════════════════════════════════════════════════════
  {
    word: "Ich verstehe nicht", partOfSpeech: "Phrase",
    meaningDe: "Ausdruck des Nichtverstehens", meaningEn: "I don't understand",
    example: "Entschuldigung, ich verstehe nicht. Können Sie das wiederholen?", exampleEn: "Sorry, I don't understand. Can you repeat that?",
    level: "A1", category: "phrases"
  },
  {
    word: "Wie bitte?", partOfSpeech: "Phrase",
    meaningDe: "Höfliche Bitte um Wiederholung", meaningEn: "Pardon? / Could you repeat?",
    example: "Wie bitte? Ich habe Sie nicht verstanden.", exampleEn: "Pardon? I didn't understand you.",
    level: "A1", category: "phrases"
  },
  {
    word: "Sprechen Sie Englisch?", partOfSpeech: "Phrase",
    meaningDe: "Frage ob jemand Englisch spricht", meaningEn: "Do you speak English?",
    example: "Entschuldigung, sprechen Sie Englisch?", exampleEn: "Excuse me, do you speak English?",
    level: "A1", category: "phrases"
  },
  {
    word: "Wo ist...?", partOfSpeech: "Phrase",
    meaningDe: "Nach einem Ort fragen", meaningEn: "Where is...?",
    example: "Wo ist der Bahnhof?", exampleEn: "Where is the train station?",
    level: "A1", category: "phrases"
  },
  {
    word: "Ich hätte gerne...", partOfSpeech: "Phrase",
    meaningDe: "Höfliche Bestellung", meaningEn: "I would like... (ordering)",
    example: "Ich hätte gerne eine Suppe.", exampleEn: "I would like a soup.",
    level: "A1", category: "phrases"
  },
  {
    word: "Was kostet das?", partOfSpeech: "Phrase",
    meaningDe: "Nach dem Preis fragen", meaningEn: "How much does that cost?",
    example: "Entschuldigung, was kostet das?", exampleEn: "Excuse me, how much does that cost?",
    level: "A1", category: "phrases"
  },
  {
    word: "Es tut mir leid", partOfSpeech: "Phrase",
    meaningDe: "Formelle Entschuldigung", meaningEn: "I'm sorry",
    example: "Es tut mir leid, ich bin zu spät.", exampleEn: "I'm sorry, I'm late.",
    level: "A1", category: "phrases"
  },
  {
    word: "Kein Problem", partOfSpeech: "Phrase",
    meaningDe: "Ausdruck, dass etwas in Ordnung ist", meaningEn: "No problem",
    example: "Kein Problem, das macht nichts.", exampleEn: "No problem, it doesn't matter.",
    level: "A1", category: "phrases"
  },
  {
    word: "Ich komme aus...", partOfSpeech: "Phrase",
    meaningDe: "Herkunft angeben", meaningEn: "I come from...",
    example: "Ich komme aus der Türkei.", exampleEn: "I come from Turkey.",
    level: "A1", category: "phrases"
  },

  // ══════════════════════════════════════════════════════════════
  // FREIZEIT & HOBBYS
  // ══════════════════════════════════════════════════════════════
  {
    word: "Musik", article: "die", partOfSpeech: "Nomen",
    meaningDe: "Kunst der Töne", meaningEn: "Music",
    example: "Ich höre gerne Musik.", exampleEn: "I like listening to music.",
    level: "A1", category: "leisure"
  },
  {
    word: "Film", article: "der", plural: "Filme", partOfSpeech: "Nomen",
    meaningDe: "Bewegtbild-Werk", meaningEn: "Film / Movie",
    example: "Der Film war sehr gut.", exampleEn: "The film was very good.",
    level: "A1", category: "leisure"
  },
  {
    word: "Fußball", article: "der", partOfSpeech: "Nomen",
    meaningDe: "Ballsportart", meaningEn: "Football / Soccer",
    example: "Ich spiele Fußball.", exampleEn: "I play football.",
    level: "A1", category: "leisure", tags: ["Kultur"]
  },
  {
    word: "spielen", partOfSpeech: "Verb",
    meaningDe: "Sich mit etwas vergnügen; Sport treiben", meaningEn: "To play",
    example: "Die Kinder spielen im Park.", exampleEn: "The children play in the park.",
    level: "A1", category: "leisure",
    conjugation: ["spiele", "spielst", "spielt", "spielen", "spielt", "spielen"]
  },

  // ══════════════════════════════════════════════════════════════
  // WORT DES TAGES — Besondere deutsche Wörter
  // ══════════════════════════════════════════════════════════════
  {
    word: "Fernweh", article: "das", partOfSpeech: "Nomen",
    meaningDe: "Sehnsucht nach fernen Ländern und Reisen", meaningEn: "Longing for distant places (opposite of homesickness)",
    example: "Im Winter habe ich immer Fernweh.", exampleEn: "In winter I always have wanderlust.",
    level: "B1", category: "phrases", tags: ["Wort des Tages", "untranslatable"]
  },
  {
    word: "Geborgenheit", article: "die", partOfSpeech: "Nomen",
    meaningDe: "Gefühl der Sicherheit, Wärme und des Beschütztseins", meaningEn: "A feeling of warmth, safety, and belonging",
    example: "Bei meiner Familie fühle ich Geborgenheit.", exampleEn: "With my family I feel safe and warm.",
    level: "B2", category: "feelings", tags: ["Wort des Tages", "untranslatable"]
  },
  {
    word: "Wanderlust", article: "die", partOfSpeech: "Nomen",
    meaningDe: "Starkes Verlangen, zu wandern und die Natur zu erkunden", meaningEn: "Strong desire to hike and explore nature",
    example: "Im Frühling packt mich die Wanderlust.", exampleEn: "In spring I'm seized by wanderlust.",
    level: "A2", category: "leisure", tags: ["Wort des Tages", "untranslatable"]
  },
  {
    word: "Weltschmerz", article: "der", partOfSpeech: "Nomen",
    meaningDe: "Tiefe Traurigkeit über den Zustand der Welt", meaningEn: "Deep sadness about the state of the world",
    example: "Nach den Nachrichten fühle ich Weltschmerz.", exampleEn: "After the news I feel world-weariness.",
    level: "C1", category: "feelings", tags: ["Wort des Tages", "untranslatable"]
  },
  {
    word: "Zweisamkeit", article: "die", partOfSpeech: "Nomen",
    meaningDe: "Innige, glückliche Gemeinsamkeit zu zweit", meaningEn: "The bliss of being together as a couple",
    example: "Sie genießen die Zweisamkeit im Urlaub.", exampleEn: "They enjoy their togetherness on vacation.",
    level: "B2", category: "feelings", tags: ["Wort des Tages", "untranslatable"]
  },
  {
    word: "Schadenfreude", article: "die", partOfSpeech: "Nomen",
    meaningDe: "Freude über das Missgeschick anderer", meaningEn: "Pleasure derived from someone else's misfortune",
    example: "Schadenfreude ist keine schöne Eigenschaft.", exampleEn: "Schadenfreude is not a nice trait.",
    level: "B1", category: "feelings", tags: ["Wort des Tages", "untranslatable"]
  },
  {
    word: "Gemütlichkeit", article: "die", partOfSpeech: "Nomen",
    meaningDe: "Zustand der Behaglichkeit und Geselligkeit", meaningEn: "Coziness, comfort, and conviviality",
    example: "In diesem Café herrscht eine schöne Gemütlichkeit.", exampleEn: "This café has a lovely cozy atmosphere.",
    level: "B1", category: "feelings", tags: ["Wort des Tages", "untranslatable", "Kultur"]
  },
  {
    word: "Zeitgeist", article: "der", partOfSpeech: "Nomen",
    meaningDe: "Der Geist einer bestimmten Epoche", meaningEn: "The spirit of the times",
    example: "Nachhaltigkeit ist Teil des Zeitgeists.", exampleEn: "Sustainability is part of the zeitgeist.",
    level: "C1", category: "phrases", tags: ["Wort des Tages", "untranslatable"]
  },
  {
    word: "Torschlusspanik", article: "die", partOfSpeech: "Nomen",
    meaningDe: "Angst, etwas Wichtiges im Leben zu verpassen (wörtlich: 'Panik vor dem Torschluss')", meaningEn: "Fear of missing out on life's opportunities as time runs out",
    example: "Mit 30 bekam sie Torschlusspanik.", exampleEn: "At 30 she got a fear of missing out.",
    level: "C1", category: "feelings", tags: ["Wort des Tages", "untranslatable"]
  },
  {
    word: "Feierabend", article: "der", partOfSpeech: "Nomen",
    meaningDe: "Ende des Arbeitstags; freie Zeit nach der Arbeit", meaningEn: "The end of the workday / free time after work",
    example: "Endlich Feierabend! Lass uns ein Bier trinken.", exampleEn: "Finally done with work! Let's have a beer.",
    level: "A2", category: "work", tags: ["Wort des Tages", "Kultur"]
  },
];

// ─── Importiere erweiterten Wortschatz aus Teildateien ──────────────────────
import { VOCAB_A1_A2 } from "./vocabA1A2";
import { VOCAB_B1_B2 } from "./vocabB1B2";
import { VOCAB_C1_C2, REDEWENDUNGEN } from "./vocabC1C2";

// Deduplizierung: Neue Einträge nur hinzufügen wenn das Wort noch nicht existiert
const existingWords = new Set(VOCAB_DATA_BASE.map(v => v.word.toLowerCase()));
const addUnique = (entries: VocabEntry[]) =>
  entries.filter(e => {
    const key = e.word.toLowerCase();
    if (existingWords.has(key)) return false;
    existingWords.add(key);
    return true;
  });

export const VOCAB_DATA: VocabEntry[] = [
  ...VOCAB_DATA_BASE,
  ...addUnique(VOCAB_A1_A2),
  ...addUnique(VOCAB_B1_B2),
  ...addUnique(VOCAB_C1_C2),
  ...addUnique(REDEWENDUNGEN),
];

// Hilfsfunktion: Alle Wörter eines Levels
export const getVocabByLevel = (level: string) => VOCAB_DATA.filter(v => v.level === level);

// Hilfsfunktion: Alle Wörter einer Kategorie
export const getVocabByCategory = (cat: string) => VOCAB_DATA.filter(v => v.category === cat);

// Hilfsfunktion: Suche
export const searchVocab = (query: string) => {
  const q = query.toLowerCase();
  return VOCAB_DATA.filter(v =>
    v.word.toLowerCase().includes(q) ||
    v.meaningDe.toLowerCase().includes(q) ||
    v.meaningEn.toLowerCase().includes(q) ||
    v.example.toLowerCase().includes(q)
  );
};

// Wort des Tages (rotiert täglich)
export const getWordOfTheDay = (): VocabEntry => {
  const specialWords = VOCAB_DATA.filter(v => v.tags?.includes("Wort des Tages"));
  const dayIndex = Math.floor(Date.now() / 86400000) % specialWords.length;
  return specialWords[dayIndex];
};
