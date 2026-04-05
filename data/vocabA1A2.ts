import { VocabEntry } from "./vocabData";

export const VOCAB_A1_A2: VocabEntry[] = [
  // ══════════════════════════════════════════════════════════════
  // A1 — BEGRÜSSUNG & ABSCHIED (greetings)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Hallo", partOfSpeech: "Interjektion",
    meaningDe: "Informelle Begrüßung", meaningEn: "Hello",
    example: "Hallo, wie geht es dir?", exampleEn: "Hello, how are you?",
    level: "A1", category: "greetings"
  },
  {
    word: "Guten Tag", partOfSpeech: "Phrase",
    meaningDe: "Formelle Begrüßung tagsüber", meaningEn: "Good day",
    example: "Guten Tag, Herr Müller!", exampleEn: "Good day, Mr. Müller!",
    level: "A1", category: "greetings"
  },
  {
    word: "Guten Morgen", partOfSpeech: "Phrase",
    meaningDe: "Begrüßung am Morgen", meaningEn: "Good morning",
    example: "Guten Morgen! Haben Sie gut geschlafen?", exampleEn: "Good morning! Did you sleep well?",
    level: "A1", category: "greetings"
  },
  {
    word: "Guten Abend", partOfSpeech: "Phrase",
    meaningDe: "Begrüßung am Abend", meaningEn: "Good evening",
    example: "Guten Abend, willkommen im Restaurant.", exampleEn: "Good evening, welcome to the restaurant.",
    level: "A1", category: "greetings"
  },
  {
    word: "Gute Nacht", partOfSpeech: "Phrase",
    meaningDe: "Abschied vor dem Schlafengehen", meaningEn: "Good night",
    example: "Gute Nacht, schlaf gut!", exampleEn: "Good night, sleep well!",
    level: "A1", category: "greetings"
  },
  {
    word: "Tschüss", partOfSpeech: "Interjektion",
    meaningDe: "Informeller Abschied", meaningEn: "Bye",
    example: "Tschüss, bis morgen!", exampleEn: "Bye, see you tomorrow!",
    level: "A1", category: "greetings"
  },
  {
    word: "Auf Wiedersehen", partOfSpeech: "Phrase",
    meaningDe: "Formeller Abschied", meaningEn: "Goodbye",
    example: "Auf Wiedersehen, Frau Schmidt!", exampleEn: "Goodbye, Mrs. Schmidt!",
    level: "A1", category: "greetings"
  },
  {
    word: "Bis bald", partOfSpeech: "Phrase",
    meaningDe: "Informeller Abschied, man sieht sich bald wieder", meaningEn: "See you soon",
    example: "Bis bald, ich freue mich!", exampleEn: "See you soon, I'm looking forward to it!",
    level: "A1", category: "greetings"
  },
  {
    word: "Bis später", partOfSpeech: "Phrase",
    meaningDe: "Abschied, man sieht sich später am Tag", meaningEn: "See you later",
    example: "Bis später, ich muss jetzt gehen.", exampleEn: "See you later, I have to go now.",
    level: "A1", category: "greetings"
  },
  {
    word: "Willkommen", partOfSpeech: "Interjektion",
    meaningDe: "Jemanden einladen oder begrüßen", meaningEn: "Welcome",
    example: "Herzlich willkommen in Berlin!", exampleEn: "Welcome to Berlin!",
    level: "A1", category: "greetings"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — HÖFLICHE PHRASEN (phrases)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Bitte", partOfSpeech: "Partikel",
    meaningDe: "Höflichkeitswort bei Bitten", meaningEn: "Please / You're welcome",
    example: "Kann ich bitte ein Glas Wasser haben?", exampleEn: "Can I please have a glass of water?",
    level: "A1", category: "phrases"
  },
  {
    word: "Danke", partOfSpeech: "Partikel",
    meaningDe: "Ausdruck der Dankbarkeit", meaningEn: "Thank you",
    example: "Danke für Ihre Hilfe!", exampleEn: "Thank you for your help!",
    level: "A1", category: "phrases"
  },
  {
    word: "Entschuldigung", partOfSpeech: "Nomen", article: "die", plural: "Entschuldigungen",
    meaningDe: "Ausdruck des Bedauerns oder um Aufmerksamkeit bitten", meaningEn: "Excuse me / Sorry",
    example: "Entschuldigung, wo ist der Bahnhof?", exampleEn: "Excuse me, where is the train station?",
    level: "A1", category: "phrases"
  },
  {
    word: "Ja", partOfSpeech: "Partikel",
    meaningDe: "Zustimmung", meaningEn: "Yes",
    example: "Ja, das stimmt.", exampleEn: "Yes, that's right.",
    level: "A1", category: "phrases"
  },
  {
    word: "Nein", partOfSpeech: "Partikel",
    meaningDe: "Ablehnung", meaningEn: "No",
    example: "Nein, das möchte ich nicht.", exampleEn: "No, I don't want that.",
    level: "A1", category: "phrases"
  },
  {
    word: "Wie geht es Ihnen?", partOfSpeech: "Phrase",
    meaningDe: "Formelle Frage nach dem Befinden", meaningEn: "How are you? (formal)",
    example: "Guten Tag! Wie geht es Ihnen?", exampleEn: "Good day! How are you?",
    level: "A1", category: "phrases"
  },
  {
    word: "Ich verstehe nicht", partOfSpeech: "Phrase",
    meaningDe: "Ausdrücken, dass man etwas nicht versteht", meaningEn: "I don't understand",
    example: "Ich verstehe nicht, können Sie das wiederholen?", exampleEn: "I don't understand, can you repeat that?",
    level: "A1", category: "phrases"
  },
  {
    word: "Wie bitte?", partOfSpeech: "Phrase",
    meaningDe: "Höflich nachfragen, wenn man etwas nicht verstanden hat", meaningEn: "Pardon? / Could you repeat?",
    example: "Wie bitte? Ich habe Sie nicht gehört.", exampleEn: "Pardon? I didn't hear you.",
    level: "A1", category: "phrases"
  },
  {
    word: "Ich hätte gern...", partOfSpeech: "Phrase",
    meaningDe: "Höflich etwas bestellen oder wünschen", meaningEn: "I would like...",
    example: "Ich hätte gern einen Kaffee, bitte.", exampleEn: "I would like a coffee, please.",
    level: "A1", category: "phrases"
  },
  {
    word: "Es tut mir leid", partOfSpeech: "Phrase",
    meaningDe: "Sich entschuldigen", meaningEn: "I'm sorry",
    example: "Es tut mir leid, ich komme zu spät.", exampleEn: "I'm sorry, I'm late.",
    level: "A1", category: "phrases"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — MENSCHEN & FAMILIE (people)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Mann", article: "der", plural: "Männer", partOfSpeech: "Nomen",
    meaningDe: "Erwachsene männliche Person", meaningEn: "Man / Husband",
    example: "Der Mann liest eine Zeitung.", exampleEn: "The man is reading a newspaper.",
    level: "A1", category: "people"
  },
  {
    word: "Frau", article: "die", plural: "Frauen", partOfSpeech: "Nomen",
    meaningDe: "Erwachsene weibliche Person", meaningEn: "Woman / Wife",
    example: "Die Frau arbeitet im Büro.", exampleEn: "The woman works in the office.",
    level: "A1", category: "people"
  },
  {
    word: "Kind", article: "das", plural: "Kinder", partOfSpeech: "Nomen",
    meaningDe: "Junger Mensch", meaningEn: "Child",
    example: "Das Kind spielt im Garten.", exampleEn: "The child is playing in the garden.",
    level: "A1", category: "people"
  },
  {
    word: "Mutter", article: "die", plural: "Mütter", partOfSpeech: "Nomen",
    meaningDe: "Weiblicher Elternteil", meaningEn: "Mother",
    example: "Meine Mutter kocht sehr gut.", exampleEn: "My mother cooks very well.",
    level: "A1", category: "people"
  },
  {
    word: "Vater", article: "der", plural: "Väter", partOfSpeech: "Nomen",
    meaningDe: "Männlicher Elternteil", meaningEn: "Father",
    example: "Mein Vater arbeitet als Ingenieur.", exampleEn: "My father works as an engineer.",
    level: "A1", category: "people"
  },
  {
    word: "Bruder", article: "der", plural: "Brüder", partOfSpeech: "Nomen",
    meaningDe: "Männliches Geschwisterteil", meaningEn: "Brother",
    example: "Mein Bruder ist zehn Jahre alt.", exampleEn: "My brother is ten years old.",
    level: "A1", category: "people"
  },
  {
    word: "Schwester", article: "die", plural: "Schwestern", partOfSpeech: "Nomen",
    meaningDe: "Weibliches Geschwisterteil", meaningEn: "Sister",
    example: "Meine Schwester studiert Medizin.", exampleEn: "My sister studies medicine.",
    level: "A1", category: "people"
  },
  {
    word: "Tochter", article: "die", plural: "Töchter", partOfSpeech: "Nomen",
    meaningDe: "Weibliches Kind der Eltern", meaningEn: "Daughter",
    example: "Unsere Tochter geht in die Schule.", exampleEn: "Our daughter goes to school.",
    level: "A1", category: "people"
  },
  {
    word: "Sohn", article: "der", plural: "Söhne", partOfSpeech: "Nomen",
    meaningDe: "Männliches Kind der Eltern", meaningEn: "Son",
    example: "Ihr Sohn spielt gern Fußball.", exampleEn: "Her son likes to play football.",
    level: "A1", category: "people"
  },
  {
    word: "Großmutter", article: "die", plural: "Großmütter", partOfSpeech: "Nomen",
    meaningDe: "Mutter eines Elternteils", meaningEn: "Grandmother",
    example: "Meine Großmutter backt den besten Kuchen.", exampleEn: "My grandmother bakes the best cake.",
    level: "A1", category: "people"
  },
  {
    word: "Großvater", article: "der", plural: "Großväter", partOfSpeech: "Nomen",
    meaningDe: "Vater eines Elternteils", meaningEn: "Grandfather",
    example: "Mein Großvater erzählt gern Geschichten.", exampleEn: "My grandfather likes to tell stories.",
    level: "A1", category: "people"
  },
  {
    word: "Onkel", article: "der", plural: "Onkel", partOfSpeech: "Nomen",
    meaningDe: "Bruder eines Elternteils", meaningEn: "Uncle",
    example: "Mein Onkel wohnt in Hamburg.", exampleEn: "My uncle lives in Hamburg.",
    level: "A1", category: "people"
  },
  {
    word: "Tante", article: "die", plural: "Tanten", partOfSpeech: "Nomen",
    meaningDe: "Schwester eines Elternteils", meaningEn: "Aunt",
    example: "Meine Tante kommt aus München.", exampleEn: "My aunt comes from Munich.",
    level: "A1", category: "people"
  },
  {
    word: "Cousin", article: "der", plural: "Cousins", partOfSpeech: "Nomen",
    meaningDe: "Sohn von Onkel oder Tante", meaningEn: "Cousin (male)",
    example: "Mein Cousin studiert in Köln.", exampleEn: "My cousin studies in Cologne.",
    level: "A1", category: "people"
  },
  {
    word: "Eltern", article: "die", plural: "Eltern", partOfSpeech: "Nomen",
    meaningDe: "Mutter und Vater zusammen", meaningEn: "Parents",
    example: "Meine Eltern leben in Berlin.", exampleEn: "My parents live in Berlin.",
    level: "A1", category: "people"
  },
  {
    word: "Geschwister", article: "die", plural: "Geschwister", partOfSpeech: "Nomen",
    meaningDe: "Brüder und Schwestern zusammen", meaningEn: "Siblings",
    example: "Ich habe zwei Geschwister.", exampleEn: "I have two siblings.",
    level: "A1", category: "people"
  },
  {
    word: "Freund", article: "der", plural: "Freunde", partOfSpeech: "Nomen",
    meaningDe: "Person, die man gern hat", meaningEn: "Friend (male) / Boyfriend",
    example: "Mein Freund kommt aus Spanien.", exampleEn: "My friend comes from Spain.",
    level: "A1", category: "people"
  },
  {
    word: "Freundin", article: "die", plural: "Freundinnen", partOfSpeech: "Nomen",
    meaningDe: "Weibliche Person, die man gern hat", meaningEn: "Friend (female) / Girlfriend",
    example: "Meine Freundin heißt Anna.", exampleEn: "My friend is called Anna.",
    level: "A1", category: "people"
  },
  {
    word: "Baby", article: "das", plural: "Babys", partOfSpeech: "Nomen",
    meaningDe: "Sehr kleines Kind", meaningEn: "Baby",
    example: "Das Baby schläft gerade.", exampleEn: "The baby is sleeping right now.",
    level: "A1", category: "people"
  },
  {
    word: "Junge", article: "der", plural: "Jungen", partOfSpeech: "Nomen",
    meaningDe: "Männliches Kind", meaningEn: "Boy",
    example: "Der Junge spielt mit dem Ball.", exampleEn: "The boy is playing with the ball.",
    level: "A1", category: "people"
  },
  {
    word: "Mädchen", article: "das", plural: "Mädchen", partOfSpeech: "Nomen",
    meaningDe: "Weibliches Kind", meaningEn: "Girl",
    example: "Das Mädchen liest ein Buch.", exampleEn: "The girl is reading a book.",
    level: "A1", category: "people"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — ESSEN & TRINKEN (food)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Wasser", article: "das", plural: "Wasser", partOfSpeech: "Nomen",
    meaningDe: "Klare Flüssigkeit zum Trinken", meaningEn: "Water",
    example: "Ich trinke ein Glas Wasser.", exampleEn: "I drink a glass of water.",
    level: "A1", category: "food"
  },
  {
    word: "Kaffee", article: "der", plural: "Kaffees", partOfSpeech: "Nomen",
    meaningDe: "Heißes Getränk aus Kaffeebohnen", meaningEn: "Coffee",
    example: "Morgens trinke ich immer Kaffee.", exampleEn: "In the morning I always drink coffee.",
    level: "A1", category: "food"
  },
  {
    word: "Tee", article: "der", plural: "Tees", partOfSpeech: "Nomen",
    meaningDe: "Heißes Getränk aus Teeblättern", meaningEn: "Tea",
    example: "Möchten Sie einen Tee?", exampleEn: "Would you like a tea?",
    level: "A1", category: "food"
  },
  {
    word: "Bier", article: "das", plural: "Biere", partOfSpeech: "Nomen",
    meaningDe: "Alkoholisches Getränk aus Hopfen und Malz", meaningEn: "Beer",
    example: "Ein Bier, bitte!", exampleEn: "A beer, please!",
    level: "A1", category: "food"
  },
  {
    word: "Wein", article: "der", plural: "Weine", partOfSpeech: "Nomen",
    meaningDe: "Alkoholisches Getränk aus Trauben", meaningEn: "Wine",
    example: "Ich hätte gern ein Glas Rotwein.", exampleEn: "I would like a glass of red wine.",
    level: "A1", category: "food"
  },
  {
    word: "Saft", article: "der", plural: "Säfte", partOfSpeech: "Nomen",
    meaningDe: "Getränk aus Obst oder Gemüse", meaningEn: "Juice",
    example: "Ich trinke gern Orangensaft.", exampleEn: "I like to drink orange juice.",
    level: "A1", category: "food"
  },
  {
    word: "Milch", article: "die", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Weißes Getränk von der Kuh", meaningEn: "Milk",
    example: "Kinder trinken gern Milch.", exampleEn: "Children like to drink milk.",
    level: "A1", category: "food"
  },
  {
    word: "Brot", article: "das", plural: "Brote", partOfSpeech: "Nomen",
    meaningDe: "Gebackenes Nahrungsmittel aus Mehl", meaningEn: "Bread",
    example: "In Deutschland gibt es viele Sorten Brot.", exampleEn: "In Germany there are many kinds of bread.",
    level: "A1", category: "food"
  },
  {
    word: "Brötchen", article: "das", plural: "Brötchen", partOfSpeech: "Nomen",
    meaningDe: "Kleines rundes Brot", meaningEn: "Bread roll",
    example: "Zum Frühstück esse ich ein Brötchen.", exampleEn: "For breakfast I eat a bread roll.",
    level: "A1", category: "food"
  },
  {
    word: "Butter", article: "die", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Fett aus Milch zum Streichen", meaningEn: "Butter",
    example: "Ich möchte Butter auf mein Brot.", exampleEn: "I want butter on my bread.",
    level: "A1", category: "food"
  },
  {
    word: "Käse", article: "der", plural: "Käse", partOfSpeech: "Nomen",
    meaningDe: "Milchprodukt, fest oder weich", meaningEn: "Cheese",
    example: "Dieser Käse kommt aus der Schweiz.", exampleEn: "This cheese comes from Switzerland.",
    level: "A1", category: "food"
  },
  {
    word: "Wurst", article: "die", plural: "Würste", partOfSpeech: "Nomen",
    meaningDe: "Fleischprodukt in Hülle", meaningEn: "Sausage",
    example: "Die Bratwurst ist sehr lecker.", exampleEn: "The bratwurst is very tasty.",
    level: "A1", category: "food"
  },
  {
    word: "Fleisch", article: "das", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Essbares Tierprodukt", meaningEn: "Meat",
    example: "Ich esse nicht so viel Fleisch.", exampleEn: "I don't eat that much meat.",
    level: "A1", category: "food"
  },
  {
    word: "Fisch", article: "der", plural: "Fische", partOfSpeech: "Nomen",
    meaningDe: "Wassertier als Nahrungsmittel", meaningEn: "Fish",
    example: "Freitags gibt es oft Fisch.", exampleEn: "On Fridays there is often fish.",
    level: "A1", category: "food"
  },
  {
    word: "Reis", article: "der", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Getreidekörner als Beilage", meaningEn: "Rice",
    example: "Ich esse Reis mit Gemüse.", exampleEn: "I eat rice with vegetables.",
    level: "A1", category: "food"
  },
  {
    word: "Nudeln", article: "die", plural: "Nudeln", partOfSpeech: "Nomen",
    meaningDe: "Teigwaren, Pasta", meaningEn: "Noodles / Pasta",
    example: "Kinder lieben Nudeln mit Tomatensoße.", exampleEn: "Children love pasta with tomato sauce.",
    level: "A1", category: "food"
  },
  {
    word: "Kartoffel", article: "die", plural: "Kartoffeln", partOfSpeech: "Nomen",
    meaningDe: "Beliebtes Knollengemüse", meaningEn: "Potato",
    example: "Kartoffeln sind in Deutschland sehr beliebt.", exampleEn: "Potatoes are very popular in Germany.",
    level: "A1", category: "food"
  },
  {
    word: "Tomate", article: "die", plural: "Tomaten", partOfSpeech: "Nomen",
    meaningDe: "Rotes rundes Gemüse", meaningEn: "Tomato",
    example: "Ich brauche Tomaten für den Salat.", exampleEn: "I need tomatoes for the salad.",
    level: "A1", category: "food"
  },
  {
    word: "Salat", article: "der", plural: "Salate", partOfSpeech: "Nomen",
    meaningDe: "Rohes Gemüsegericht", meaningEn: "Salad / Lettuce",
    example: "Ich bestelle einen Salat.", exampleEn: "I order a salad.",
    level: "A1", category: "food"
  },
  {
    word: "Suppe", article: "die", plural: "Suppen", partOfSpeech: "Nomen",
    meaningDe: "Warme flüssige Speise", meaningEn: "Soup",
    example: "Im Winter esse ich gern Suppe.", exampleEn: "In winter I like to eat soup.",
    level: "A1", category: "food"
  },
  {
    word: "Kuchen", article: "der", plural: "Kuchen", partOfSpeech: "Nomen",
    meaningDe: "Süßes Gebäck", meaningEn: "Cake",
    example: "Zum Geburtstag gibt es Kuchen.", exampleEn: "There is cake for the birthday.",
    level: "A1", category: "food"
  },
  {
    word: "Eis", article: "das", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Gefrorene Süßspeise", meaningEn: "Ice cream / Ice",
    example: "Im Sommer esse ich gern Eis.", exampleEn: "In summer I like to eat ice cream.",
    level: "A1", category: "food"
  },
  {
    word: "Obst", article: "das", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Früchte als Nahrungsmittel", meaningEn: "Fruit",
    example: "Obst ist gesund.", exampleEn: "Fruit is healthy.",
    level: "A1", category: "food"
  },
  {
    word: "Gemüse", article: "das", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Pflanzliche Nahrungsmittel", meaningEn: "Vegetables",
    example: "Ich kaufe frisches Gemüse auf dem Markt.", exampleEn: "I buy fresh vegetables at the market.",
    level: "A1", category: "food"
  },
  {
    word: "Zucker", article: "der", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Süßungsmittel", meaningEn: "Sugar",
    example: "Möchten Sie Zucker in den Kaffee?", exampleEn: "Would you like sugar in your coffee?",
    level: "A1", category: "food"
  },
  {
    word: "Salz", article: "das", plural: "Salze", partOfSpeech: "Nomen",
    meaningDe: "Würzmittel, weißes Mineral", meaningEn: "Salt",
    example: "Die Suppe braucht mehr Salz.", exampleEn: "The soup needs more salt.",
    level: "A1", category: "food"
  },
  {
    word: "Frühstück", article: "das", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Erste Mahlzeit am Morgen", meaningEn: "Breakfast",
    example: "Was essen Sie zum Frühstück?", exampleEn: "What do you eat for breakfast?",
    level: "A1", category: "food"
  },
  {
    word: "Mittagessen", article: "das", plural: "Mittagessen", partOfSpeech: "Nomen",
    meaningDe: "Mahlzeit am Mittag", meaningEn: "Lunch",
    example: "Das Mittagessen ist um 12 Uhr.", exampleEn: "Lunch is at 12 o'clock.",
    level: "A1", category: "food"
  },
  {
    word: "Abendessen", article: "das", plural: "Abendessen", partOfSpeech: "Nomen",
    meaningDe: "Mahlzeit am Abend", meaningEn: "Dinner",
    example: "Wir essen das Abendessen zusammen.", exampleEn: "We eat dinner together.",
    level: "A1", category: "food"
  },
  {
    word: "Speisekarte", article: "die", plural: "Speisekarten", partOfSpeech: "Nomen",
    meaningDe: "Liste der Gerichte im Restaurant", meaningEn: "Menu",
    example: "Kann ich bitte die Speisekarte haben?", exampleEn: "Can I have the menu, please?",
    level: "A1", category: "food"
  },
  {
    word: "Rechnung", article: "die", plural: "Rechnungen", partOfSpeech: "Nomen",
    meaningDe: "Zahlungsaufforderung", meaningEn: "Bill / Check",
    example: "Die Rechnung, bitte!", exampleEn: "The bill, please!",
    level: "A1", category: "food"
  },
  {
    word: "Trinkgeld", article: "das", plural: "Trinkgelder", partOfSpeech: "Nomen",
    meaningDe: "Zusätzliches Geld für guten Service", meaningEn: "Tip",
    example: "In Deutschland gibt man ungefähr zehn Prozent Trinkgeld.", exampleEn: "In Germany you give about ten percent tip.",
    level: "A1", category: "food"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — WOHNUNG & HAUS (home)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Wohnung", article: "die", plural: "Wohnungen", partOfSpeech: "Nomen",
    meaningDe: "Räume zum Wohnen in einem Gebäude", meaningEn: "Apartment",
    example: "Meine Wohnung hat drei Zimmer.", exampleEn: "My apartment has three rooms.",
    level: "A1", category: "home"
  },
  {
    word: "Haus", article: "das", plural: "Häuser", partOfSpeech: "Nomen",
    meaningDe: "Gebäude zum Wohnen", meaningEn: "House",
    example: "Wir haben ein Haus mit Garten.", exampleEn: "We have a house with a garden.",
    level: "A1", category: "home"
  },
  {
    word: "Zimmer", article: "das", plural: "Zimmer", partOfSpeech: "Nomen",
    meaningDe: "Raum in einer Wohnung", meaningEn: "Room",
    example: "Das Zimmer ist sehr hell.", exampleEn: "The room is very bright.",
    level: "A1", category: "home"
  },
  {
    word: "Küche", article: "die", plural: "Küchen", partOfSpeech: "Nomen",
    meaningDe: "Raum zum Kochen", meaningEn: "Kitchen",
    example: "Ich koche in der Küche.", exampleEn: "I cook in the kitchen.",
    level: "A1", category: "home"
  },
  {
    word: "Bad", article: "das", plural: "Bäder", partOfSpeech: "Nomen",
    meaningDe: "Raum zum Waschen und Duschen", meaningEn: "Bathroom",
    example: "Das Bad ist neben dem Schlafzimmer.", exampleEn: "The bathroom is next to the bedroom.",
    level: "A1", category: "home"
  },
  {
    word: "Schlafzimmer", article: "das", plural: "Schlafzimmer", partOfSpeech: "Nomen",
    meaningDe: "Raum zum Schlafen", meaningEn: "Bedroom",
    example: "Das Schlafzimmer ist sehr ruhig.", exampleEn: "The bedroom is very quiet.",
    level: "A1", category: "home"
  },
  {
    word: "Wohnzimmer", article: "das", plural: "Wohnzimmer", partOfSpeech: "Nomen",
    meaningDe: "Raum zum Entspannen und Zusammensein", meaningEn: "Living room",
    example: "Wir sitzen im Wohnzimmer und sehen fern.", exampleEn: "We sit in the living room and watch TV.",
    level: "A1", category: "home"
  },
  {
    word: "Tisch", article: "der", plural: "Tische", partOfSpeech: "Nomen",
    meaningDe: "Möbelstück mit flacher Oberfläche", meaningEn: "Table",
    example: "Das Essen steht auf dem Tisch.", exampleEn: "The food is on the table.",
    level: "A1", category: "home"
  },
  {
    word: "Stuhl", article: "der", plural: "Stühle", partOfSpeech: "Nomen",
    meaningDe: "Möbelstück zum Sitzen", meaningEn: "Chair",
    example: "Bitte setzen Sie sich auf den Stuhl.", exampleEn: "Please sit down on the chair.",
    level: "A1", category: "home"
  },
  {
    word: "Bett", article: "das", plural: "Betten", partOfSpeech: "Nomen",
    meaningDe: "Möbelstück zum Schlafen", meaningEn: "Bed",
    example: "Ich gehe um 22 Uhr ins Bett.", exampleEn: "I go to bed at 10 PM.",
    level: "A1", category: "home"
  },
  {
    word: "Sofa", article: "das", plural: "Sofas", partOfSpeech: "Nomen",
    meaningDe: "Gepolstertes Sitzmöbel für mehrere Personen", meaningEn: "Sofa / Couch",
    example: "Ich liege gern auf dem Sofa.", exampleEn: "I like lying on the sofa.",
    level: "A1", category: "home"
  },
  {
    word: "Lampe", article: "die", plural: "Lampen", partOfSpeech: "Nomen",
    meaningDe: "Gerät, das Licht gibt", meaningEn: "Lamp",
    example: "Bitte mach die Lampe an.", exampleEn: "Please turn on the lamp.",
    level: "A1", category: "home"
  },
  {
    word: "Tür", article: "die", plural: "Türen", partOfSpeech: "Nomen",
    meaningDe: "Öffnung zum Betreten eines Raums", meaningEn: "Door",
    example: "Bitte schließen Sie die Tür.", exampleEn: "Please close the door.",
    level: "A1", category: "home"
  },
  {
    word: "Fenster", article: "das", plural: "Fenster", partOfSpeech: "Nomen",
    meaningDe: "Glasöffnung in der Wand", meaningEn: "Window",
    example: "Kann ich das Fenster öffnen?", exampleEn: "Can I open the window?",
    level: "A1", category: "home"
  },
  {
    word: "Schlüssel", article: "der", plural: "Schlüssel", partOfSpeech: "Nomen",
    meaningDe: "Gegenstand zum Öffnen von Schlössern", meaningEn: "Key",
    example: "Wo ist mein Schlüssel?", exampleEn: "Where is my key?",
    level: "A1", category: "home"
  },
  {
    word: "Treppe", article: "die", plural: "Treppen", partOfSpeech: "Nomen",
    meaningDe: "Stufen zum Auf- und Absteigen", meaningEn: "Stairs / Staircase",
    example: "Die Wohnung ist im dritten Stock, ohne Treppe kein Aufzug.", exampleEn: "The apartment is on the third floor, stairs but no elevator.",
    level: "A1", category: "home"
  },
  {
    word: "Garten", article: "der", plural: "Gärten", partOfSpeech: "Nomen",
    meaningDe: "Grünfläche beim Haus", meaningEn: "Garden",
    example: "Die Kinder spielen im Garten.", exampleEn: "The children play in the garden.",
    level: "A1", category: "home"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — REISE & VERKEHR (travel)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Flughafen", article: "der", plural: "Flughäfen", partOfSpeech: "Nomen",
    meaningDe: "Ort, wo Flugzeuge starten und landen", meaningEn: "Airport",
    example: "Der Flughafen ist weit von der Stadt.", exampleEn: "The airport is far from the city.",
    level: "A1", category: "travel"
  },
  {
    word: "Bahnhof", article: "der", plural: "Bahnhöfe", partOfSpeech: "Nomen",
    meaningDe: "Ort, wo Züge halten", meaningEn: "Train station",
    example: "Ich treffe dich am Bahnhof.", exampleEn: "I'll meet you at the train station.",
    level: "A1", category: "travel"
  },
  {
    word: "Bus", article: "der", plural: "Busse", partOfSpeech: "Nomen",
    meaningDe: "Großes Fahrzeug für viele Personen", meaningEn: "Bus",
    example: "Der Bus kommt in fünf Minuten.", exampleEn: "The bus comes in five minutes.",
    level: "A1", category: "travel"
  },
  {
    word: "Zug", article: "der", plural: "Züge", partOfSpeech: "Nomen",
    meaningDe: "Schienenfahrzeug für Personen oder Güter", meaningEn: "Train",
    example: "Der Zug nach München fährt um 10 Uhr.", exampleEn: "The train to Munich leaves at 10 o'clock.",
    level: "A1", category: "travel"
  },
  {
    word: "U-Bahn", article: "die", plural: "U-Bahnen", partOfSpeech: "Nomen",
    meaningDe: "Unterirdische Bahn in der Stadt", meaningEn: "Subway / Metro",
    example: "Ich fahre mit der U-Bahn zur Arbeit.", exampleEn: "I take the subway to work.",
    level: "A1", category: "travel"
  },
  {
    word: "Taxi", article: "das", plural: "Taxis", partOfSpeech: "Nomen",
    meaningDe: "Auto mit Fahrer, das man mieten kann", meaningEn: "Taxi / Cab",
    example: "Wir nehmen ein Taxi zum Hotel.", exampleEn: "We take a taxi to the hotel.",
    level: "A1", category: "travel"
  },
  {
    word: "Straße", article: "die", plural: "Straßen", partOfSpeech: "Nomen",
    meaningDe: "Weg in der Stadt oder auf dem Land", meaningEn: "Street / Road",
    example: "Die Straße ist sehr lang.", exampleEn: "The street is very long.",
    level: "A1", category: "travel"
  },
  {
    word: "Hotel", article: "das", plural: "Hotels", partOfSpeech: "Nomen",
    meaningDe: "Gebäude zum Übernachten für Reisende", meaningEn: "Hotel",
    example: "Wir übernachten in einem Hotel.", exampleEn: "We stay overnight in a hotel.",
    level: "A1", category: "travel"
  },
  {
    word: "Ticket", article: "das", plural: "Tickets", partOfSpeech: "Nomen",
    meaningDe: "Fahrkarte oder Eintrittskarte", meaningEn: "Ticket",
    example: "Ich kaufe ein Ticket für den Zug.", exampleEn: "I buy a ticket for the train.",
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
    meaningDe: "Fahrt an einen anderen Ort", meaningEn: "Trip / Journey",
    example: "Die Reise nach Italien war wunderbar.", exampleEn: "The trip to Italy was wonderful.",
    level: "A1", category: "travel"
  },
  {
    word: "Fahrrad", article: "das", plural: "Fahrräder", partOfSpeech: "Nomen",
    meaningDe: "Zweirad ohne Motor", meaningEn: "Bicycle",
    example: "Ich fahre mit dem Fahrrad zur Schule.", exampleEn: "I ride my bicycle to school.",
    level: "A1", category: "travel"
  },
  {
    word: "Auto", article: "das", plural: "Autos", partOfSpeech: "Nomen",
    meaningDe: "Motorfahrzeug mit vier Rädern", meaningEn: "Car",
    example: "Mein Auto ist blau.", exampleEn: "My car is blue.",
    level: "A1", category: "travel"
  },
  {
    word: "Haltestelle", article: "die", plural: "Haltestellen", partOfSpeech: "Nomen",
    meaningDe: "Ort, wo Bus oder Bahn hält", meaningEn: "Stop (bus/tram)",
    example: "Die Haltestelle ist um die Ecke.", exampleEn: "The stop is around the corner.",
    level: "A1", category: "travel"
  },
  {
    word: "Gleis", article: "das", plural: "Gleise", partOfSpeech: "Nomen",
    meaningDe: "Schienenstrang am Bahnhof", meaningEn: "Platform / Track",
    example: "Der Zug fährt von Gleis 3 ab.", exampleEn: "The train departs from platform 3.",
    level: "A1", category: "travel"
  },
  {
    word: "Abfahrt", article: "die", plural: "Abfahrten", partOfSpeech: "Nomen",
    meaningDe: "Beginn einer Reise oder Fahrt", meaningEn: "Departure",
    example: "Die Abfahrt ist um 8 Uhr.", exampleEn: "The departure is at 8 o'clock.",
    level: "A1", category: "travel"
  },
  {
    word: "Ankunft", article: "die", plural: "Ankünfte", partOfSpeech: "Nomen",
    meaningDe: "Ende einer Reise oder Fahrt", meaningEn: "Arrival",
    example: "Die Ankunft in Berlin ist um 14 Uhr.", exampleEn: "The arrival in Berlin is at 2 PM.",
    level: "A1", category: "travel"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — KÖRPER (body)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Kopf", article: "der", plural: "Köpfe", partOfSpeech: "Nomen",
    meaningDe: "Oberer Teil des Körpers", meaningEn: "Head",
    example: "Mir tut der Kopf weh.", exampleEn: "My head hurts.",
    level: "A1", category: "body"
  },
  {
    word: "Auge", article: "das", plural: "Augen", partOfSpeech: "Nomen",
    meaningDe: "Organ zum Sehen", meaningEn: "Eye",
    example: "Sie hat blaue Augen.", exampleEn: "She has blue eyes.",
    level: "A1", category: "body"
  },
  {
    word: "Ohr", article: "das", plural: "Ohren", partOfSpeech: "Nomen",
    meaningDe: "Organ zum Hören", meaningEn: "Ear",
    example: "Er hat große Ohren.", exampleEn: "He has big ears.",
    level: "A1", category: "body"
  },
  {
    word: "Nase", article: "die", plural: "Nasen", partOfSpeech: "Nomen",
    meaningDe: "Organ zum Riechen", meaningEn: "Nose",
    example: "Meine Nase ist kalt.", exampleEn: "My nose is cold.",
    level: "A1", category: "body"
  },
  {
    word: "Mund", article: "der", plural: "Münder", partOfSpeech: "Nomen",
    meaningDe: "Organ zum Essen und Sprechen", meaningEn: "Mouth",
    example: "Mach bitte den Mund auf.", exampleEn: "Please open your mouth.",
    level: "A1", category: "body"
  },
  {
    word: "Zahn", article: "der", plural: "Zähne", partOfSpeech: "Nomen",
    meaningDe: "Harter weißer Teil im Mund", meaningEn: "Tooth",
    example: "Ich putze meine Zähne zweimal am Tag.", exampleEn: "I brush my teeth twice a day.",
    level: "A1", category: "body"
  },
  {
    word: "Hand", article: "die", plural: "Hände", partOfSpeech: "Nomen",
    meaningDe: "Körperteil am Ende des Arms", meaningEn: "Hand",
    example: "Wasch dir die Hände!", exampleEn: "Wash your hands!",
    level: "A1", category: "body"
  },
  {
    word: "Arm", article: "der", plural: "Arme", partOfSpeech: "Nomen",
    meaningDe: "Körperteil zwischen Schulter und Hand", meaningEn: "Arm",
    example: "Mein Arm tut weh.", exampleEn: "My arm hurts.",
    level: "A1", category: "body"
  },
  {
    word: "Bein", article: "das", plural: "Beine", partOfSpeech: "Nomen",
    meaningDe: "Körperteil zum Gehen", meaningEn: "Leg",
    example: "Er hat lange Beine.", exampleEn: "He has long legs.",
    level: "A1", category: "body"
  },
  {
    word: "Fuß", article: "der", plural: "Füße", partOfSpeech: "Nomen",
    meaningDe: "Unterster Teil des Beins", meaningEn: "Foot",
    example: "Ich gehe zu Fuß zur Arbeit.", exampleEn: "I walk to work on foot.",
    level: "A1", category: "body"
  },
  {
    word: "Finger", article: "der", plural: "Finger", partOfSpeech: "Nomen",
    meaningDe: "Gliedmaße an der Hand", meaningEn: "Finger",
    example: "Ich habe mir den Finger geschnitten.", exampleEn: "I cut my finger.",
    level: "A1", category: "body"
  },
  {
    word: "Haar", article: "das", plural: "Haare", partOfSpeech: "Nomen",
    meaningDe: "Wächst auf dem Kopf", meaningEn: "Hair",
    example: "Sie hat lange blonde Haare.", exampleEn: "She has long blonde hair.",
    level: "A1", category: "body"
  },
  {
    word: "Bauch", article: "der", plural: "Bäuche", partOfSpeech: "Nomen",
    meaningDe: "Vorderer Teil des Körpers unter der Brust", meaningEn: "Belly / Stomach",
    example: "Mein Bauch tut weh.", exampleEn: "My stomach hurts.",
    level: "A1", category: "body"
  },
  {
    word: "Rücken", article: "der", plural: "Rücken", partOfSpeech: "Nomen",
    meaningDe: "Hinterer Teil des Körpers", meaningEn: "Back",
    example: "Ich habe Rückenschmerzen.", exampleEn: "I have back pain.",
    level: "A1", category: "body"
  },
  {
    word: "Herz", article: "das", plural: "Herzen", partOfSpeech: "Nomen",
    meaningDe: "Organ, das Blut pumpt", meaningEn: "Heart",
    example: "Das Herz schlägt schnell.", exampleEn: "The heart beats fast.",
    level: "A1", category: "body"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — ZAHLEN & ZEIT (numbers)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Uhr", article: "die", plural: "Uhren", partOfSpeech: "Nomen",
    meaningDe: "Gerät zur Zeitmessung / Zeitangabe", meaningEn: "Clock / O'clock",
    example: "Es ist drei Uhr.", exampleEn: "It is three o'clock.",
    level: "A1", category: "numbers"
  },
  {
    word: "Tag", article: "der", plural: "Tage", partOfSpeech: "Nomen",
    meaningDe: "Zeitraum von 24 Stunden", meaningEn: "Day",
    example: "Heute ist ein schöner Tag.", exampleEn: "Today is a beautiful day.",
    level: "A1", category: "numbers"
  },
  {
    word: "Woche", article: "die", plural: "Wochen", partOfSpeech: "Nomen",
    meaningDe: "Zeitraum von sieben Tagen", meaningEn: "Week",
    example: "Nächste Woche habe ich Urlaub.", exampleEn: "Next week I have vacation.",
    level: "A1", category: "numbers"
  },
  {
    word: "Monat", article: "der", plural: "Monate", partOfSpeech: "Nomen",
    meaningDe: "Zeitraum von etwa 30 Tagen", meaningEn: "Month",
    example: "Welcher Monat ist jetzt?", exampleEn: "Which month is it now?",
    level: "A1", category: "numbers"
  },
  {
    word: "Jahr", article: "das", plural: "Jahre", partOfSpeech: "Nomen",
    meaningDe: "Zeitraum von 12 Monaten", meaningEn: "Year",
    example: "Ich lebe seit einem Jahr in Deutschland.", exampleEn: "I have been living in Germany for a year.",
    level: "A1", category: "numbers"
  },
  {
    word: "Stunde", article: "die", plural: "Stunden", partOfSpeech: "Nomen",
    meaningDe: "Zeitraum von 60 Minuten", meaningEn: "Hour",
    example: "Die Fahrt dauert zwei Stunden.", exampleEn: "The trip takes two hours.",
    level: "A1", category: "numbers"
  },
  {
    word: "Minute", article: "die", plural: "Minuten", partOfSpeech: "Nomen",
    meaningDe: "Zeitraum von 60 Sekunden", meaningEn: "Minute",
    example: "Warte bitte fünf Minuten.", exampleEn: "Please wait five minutes.",
    level: "A1", category: "numbers"
  },
  {
    word: "heute", partOfSpeech: "Adverb",
    meaningDe: "An diesem Tag", meaningEn: "Today",
    example: "Heute gehen wir ins Kino.", exampleEn: "Today we go to the cinema.",
    level: "A1", category: "numbers"
  },
  {
    word: "morgen", partOfSpeech: "Adverb",
    meaningDe: "Am nächsten Tag", meaningEn: "Tomorrow",
    example: "Morgen habe ich frei.", exampleEn: "Tomorrow I have a day off.",
    level: "A1", category: "numbers"
  },
  {
    word: "gestern", partOfSpeech: "Adverb",
    meaningDe: "Am Tag davor", meaningEn: "Yesterday",
    example: "Gestern war ich im Park.", exampleEn: "Yesterday I was in the park.",
    level: "A1", category: "numbers"
  },
  {
    word: "Montag", article: "der", plural: "Montage", partOfSpeech: "Nomen",
    meaningDe: "Erster Tag der Woche", meaningEn: "Monday",
    example: "Am Montag fängt die Arbeit an.", exampleEn: "On Monday, work starts.",
    level: "A1", category: "numbers"
  },
  {
    word: "Dienstag", article: "der", plural: "Dienstage", partOfSpeech: "Nomen",
    meaningDe: "Zweiter Tag der Woche", meaningEn: "Tuesday",
    example: "Am Dienstag habe ich Deutschkurs.", exampleEn: "On Tuesday I have German class.",
    level: "A1", category: "numbers"
  },
  {
    word: "Mittwoch", article: "der", plural: "Mittwoche", partOfSpeech: "Nomen",
    meaningDe: "Dritter Tag der Woche", meaningEn: "Wednesday",
    example: "Am Mittwoch gehe ich einkaufen.", exampleEn: "On Wednesday I go shopping.",
    level: "A1", category: "numbers"
  },
  {
    word: "Donnerstag", article: "der", plural: "Donnerstage", partOfSpeech: "Nomen",
    meaningDe: "Vierter Tag der Woche", meaningEn: "Thursday",
    example: "Am Donnerstag treffe ich Freunde.", exampleEn: "On Thursday I meet friends.",
    level: "A1", category: "numbers"
  },
  {
    word: "Freitag", article: "der", plural: "Freitage", partOfSpeech: "Nomen",
    meaningDe: "Fünfter Tag der Woche", meaningEn: "Friday",
    example: "Am Freitag gehen wir aus.", exampleEn: "On Friday we go out.",
    level: "A1", category: "numbers"
  },
  {
    word: "Samstag", article: "der", plural: "Samstage", partOfSpeech: "Nomen",
    meaningDe: "Sechster Tag der Woche", meaningEn: "Saturday",
    example: "Am Samstag schlafe ich lange.", exampleEn: "On Saturday I sleep in.",
    level: "A1", category: "numbers"
  },
  {
    word: "Sonntag", article: "der", plural: "Sonntage", partOfSpeech: "Nomen",
    meaningDe: "Siebter Tag der Woche", meaningEn: "Sunday",
    example: "Am Sonntag besuchen wir die Großeltern.", exampleEn: "On Sunday we visit the grandparents.",
    level: "A1", category: "numbers"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — EINKAUFEN & GELD (shopping)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Geld", article: "das", plural: "Gelder", partOfSpeech: "Nomen",
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
    example: "Ich gehe zum Supermarkt.", exampleEn: "I go to the supermarket.",
    level: "A1", category: "shopping"
  },
  {
    word: "Geschäft", article: "das", plural: "Geschäfte", partOfSpeech: "Nomen",
    meaningDe: "Laden zum Einkaufen", meaningEn: "Shop / Store",
    example: "Das Geschäft ist bis 20 Uhr geöffnet.", exampleEn: "The shop is open until 8 PM.",
    level: "A1", category: "shopping"
  },
  {
    word: "Preis", article: "der", plural: "Preise", partOfSpeech: "Nomen",
    meaningDe: "Kosten einer Ware", meaningEn: "Price",
    example: "Was ist der Preis für diese Jacke?", exampleEn: "What is the price for this jacket?",
    level: "A1", category: "shopping"
  },
  {
    word: "billig", partOfSpeech: "Adjektiv",
    meaningDe: "Wenig Geld kostend", meaningEn: "Cheap",
    example: "Dieses T-Shirt ist sehr billig.", exampleEn: "This T-shirt is very cheap.",
    level: "A1", category: "shopping"
  },
  {
    word: "teuer", partOfSpeech: "Adjektiv",
    meaningDe: "Viel Geld kostend", meaningEn: "Expensive",
    example: "Das Restaurant ist zu teuer.", exampleEn: "The restaurant is too expensive.",
    level: "A1", category: "shopping"
  },
  {
    word: "kaufen", partOfSpeech: "Verb", conjugation: ["kaufe", "kaufst", "kauft", "kaufen", "kauft", "kaufen"],
    meaningDe: "Etwas gegen Geld erwerben", meaningEn: "To buy",
    example: "Ich kaufe ein neues Buch.", exampleEn: "I buy a new book.",
    level: "A1", category: "shopping"
  },
  {
    word: "bezahlen", partOfSpeech: "Verb", conjugation: ["bezahle", "bezahlst", "bezahlt", "bezahlen", "bezahlt", "bezahlen"],
    meaningDe: "Geld für etwas geben", meaningEn: "To pay",
    example: "Wo kann ich bezahlen?", exampleEn: "Where can I pay?",
    level: "A1", category: "shopping"
  },
  {
    word: "Kasse", article: "die", plural: "Kassen", partOfSpeech: "Nomen",
    meaningDe: "Ort im Laden, wo man bezahlt", meaningEn: "Cash register / Checkout",
    example: "Bitte gehen Sie zur Kasse.", exampleEn: "Please go to the checkout.",
    level: "A1", category: "shopping"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — WICHTIGE VERBEN (verbs)
  // ══════════════════════════════════════════════════════════════
  {
    word: "sein", partOfSpeech: "Verb", conjugation: ["bin", "bist", "ist", "sind", "seid", "sind"],
    meaningDe: "Existieren, sich in einem Zustand befinden", meaningEn: "To be",
    example: "Ich bin Student.", exampleEn: "I am a student.",
    level: "A1", category: "verbs"
  },
  {
    word: "haben", partOfSpeech: "Verb", conjugation: ["habe", "hast", "hat", "haben", "habt", "haben"],
    meaningDe: "Besitzen, etwas gehört einem", meaningEn: "To have",
    example: "Ich habe einen Hund.", exampleEn: "I have a dog.",
    level: "A1", category: "verbs"
  },
  {
    word: "machen", partOfSpeech: "Verb", conjugation: ["mache", "machst", "macht", "machen", "macht", "machen"],
    meaningDe: "Etwas tun oder herstellen", meaningEn: "To do / To make",
    example: "Was machst du heute?", exampleEn: "What are you doing today?",
    level: "A1", category: "verbs"
  },
  {
    word: "gehen", partOfSpeech: "Verb", conjugation: ["gehe", "gehst", "geht", "gehen", "geht", "gehen"],
    meaningDe: "Sich zu Fuß bewegen", meaningEn: "To go / To walk",
    example: "Ich gehe in die Schule.", exampleEn: "I go to school.",
    level: "A1", category: "verbs"
  },
  {
    word: "kommen", partOfSpeech: "Verb", conjugation: ["komme", "kommst", "kommt", "kommen", "kommt", "kommen"],
    meaningDe: "Sich zu einem Ort bewegen", meaningEn: "To come",
    example: "Woher kommen Sie?", exampleEn: "Where do you come from?",
    level: "A1", category: "verbs"
  },
  {
    word: "sprechen", partOfSpeech: "Verb", conjugation: ["spreche", "sprichst", "spricht", "sprechen", "sprecht", "sprechen"],
    meaningDe: "Wörter sagen, reden", meaningEn: "To speak",
    example: "Sprechen Sie Deutsch?", exampleEn: "Do you speak German?",
    level: "A1", category: "verbs"
  },
  {
    word: "essen", partOfSpeech: "Verb", conjugation: ["esse", "isst", "isst", "essen", "esst", "essen"],
    meaningDe: "Nahrung zu sich nehmen", meaningEn: "To eat",
    example: "Wir essen um 12 Uhr.", exampleEn: "We eat at 12 o'clock.",
    level: "A1", category: "verbs"
  },
  {
    word: "trinken", partOfSpeech: "Verb", conjugation: ["trinke", "trinkst", "trinkt", "trinken", "trinkt", "trinken"],
    meaningDe: "Flüssigkeit zu sich nehmen", meaningEn: "To drink",
    example: "Ich trinke gern Kaffee.", exampleEn: "I like to drink coffee.",
    level: "A1", category: "verbs"
  },
  {
    word: "schlafen", partOfSpeech: "Verb", conjugation: ["schlafe", "schläfst", "schläft", "schlafen", "schlaft", "schlafen"],
    meaningDe: "Ruhen mit geschlossenen Augen", meaningEn: "To sleep",
    example: "Ich schlafe acht Stunden.", exampleEn: "I sleep eight hours.",
    level: "A1", category: "verbs"
  },
  {
    word: "lesen", partOfSpeech: "Verb", conjugation: ["lese", "liest", "liest", "lesen", "lest", "lesen"],
    meaningDe: "Text mit den Augen aufnehmen", meaningEn: "To read",
    example: "Ich lese ein Buch.", exampleEn: "I read a book.",
    level: "A1", category: "verbs"
  },
  {
    word: "schreiben", partOfSpeech: "Verb", conjugation: ["schreibe", "schreibst", "schreibt", "schreiben", "schreibt", "schreiben"],
    meaningDe: "Text auf Papier oder am Computer verfassen", meaningEn: "To write",
    example: "Ich schreibe eine E-Mail.", exampleEn: "I write an email.",
    level: "A1", category: "verbs"
  },
  {
    word: "sehen", partOfSpeech: "Verb", conjugation: ["sehe", "siehst", "sieht", "sehen", "seht", "sehen"],
    meaningDe: "Mit den Augen wahrnehmen", meaningEn: "To see",
    example: "Ich sehe einen Vogel.", exampleEn: "I see a bird.",
    level: "A1", category: "verbs"
  },
  {
    word: "hören", partOfSpeech: "Verb", conjugation: ["höre", "hörst", "hört", "hören", "hört", "hören"],
    meaningDe: "Mit den Ohren wahrnehmen", meaningEn: "To hear",
    example: "Ich höre Musik.", exampleEn: "I hear music.",
    level: "A1", category: "verbs"
  },
  {
    word: "geben", partOfSpeech: "Verb", conjugation: ["gebe", "gibst", "gibt", "geben", "gebt", "geben"],
    meaningDe: "Jemandem etwas reichen", meaningEn: "To give",
    example: "Kannst du mir das Buch geben?", exampleEn: "Can you give me the book?",
    level: "A1", category: "verbs"
  },
  {
    word: "nehmen", partOfSpeech: "Verb", conjugation: ["nehme", "nimmst", "nimmt", "nehmen", "nehmt", "nehmen"],
    meaningDe: "Etwas ergreifen oder wählen", meaningEn: "To take",
    example: "Ich nehme den Bus.", exampleEn: "I take the bus.",
    level: "A1", category: "verbs"
  },
  {
    word: "stehen", partOfSpeech: "Verb", conjugation: ["stehe", "stehst", "steht", "stehen", "steht", "stehen"],
    meaningDe: "Aufrecht auf den Füßen sein", meaningEn: "To stand",
    example: "Er steht an der Haltestelle.", exampleEn: "He stands at the bus stop.",
    level: "A1", category: "verbs"
  },
  {
    word: "sitzen", partOfSpeech: "Verb", conjugation: ["sitze", "sitzt", "sitzt", "sitzen", "sitzt", "sitzen"],
    meaningDe: "Auf einem Stuhl oder ähnlichem Platz nehmen", meaningEn: "To sit",
    example: "Wir sitzen im Garten.", exampleEn: "We sit in the garden.",
    level: "A1", category: "verbs"
  },
  {
    word: "liegen", partOfSpeech: "Verb", conjugation: ["liege", "liegst", "liegt", "liegen", "liegt", "liegen"],
    meaningDe: "Horizontal auf einer Fläche ruhen", meaningEn: "To lie (down)",
    example: "Das Buch liegt auf dem Tisch.", exampleEn: "The book lies on the table.",
    level: "A1", category: "verbs"
  },
  {
    word: "finden", partOfSpeech: "Verb", conjugation: ["finde", "findest", "findet", "finden", "findet", "finden"],
    meaningDe: "Etwas entdecken oder eine Meinung haben", meaningEn: "To find / To think",
    example: "Ich finde die Stadt schön.", exampleEn: "I think the city is beautiful.",
    level: "A1", category: "verbs"
  },
  {
    word: "wissen", partOfSpeech: "Verb", conjugation: ["weiß", "weißt", "weiß", "wissen", "wisst", "wissen"],
    meaningDe: "Kenntnis von etwas haben", meaningEn: "To know (a fact)",
    example: "Ich weiß die Antwort.", exampleEn: "I know the answer.",
    level: "A1", category: "verbs"
  },
  {
    word: "kennen", partOfSpeech: "Verb", conjugation: ["kenne", "kennst", "kennt", "kennen", "kennt", "kennen"],
    meaningDe: "Mit jemandem oder etwas vertraut sein", meaningEn: "To know (be familiar with)",
    example: "Kennst du diese Stadt?", exampleEn: "Do you know this city?",
    level: "A1", category: "verbs"
  },
  {
    word: "können", partOfSpeech: "Verb", conjugation: ["kann", "kannst", "kann", "können", "könnt", "können"],
    meaningDe: "Die Fähigkeit haben, etwas zu tun", meaningEn: "To be able to / Can",
    example: "Ich kann Deutsch sprechen.", exampleEn: "I can speak German.",
    level: "A1", category: "verbs"
  },
  {
    word: "müssen", partOfSpeech: "Verb", conjugation: ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
    meaningDe: "Gezwungen sein, etwas zu tun", meaningEn: "Must / Have to",
    example: "Ich muss morgen arbeiten.", exampleEn: "I have to work tomorrow.",
    level: "A1", category: "verbs"
  },
  {
    word: "wollen", partOfSpeech: "Verb", conjugation: ["will", "willst", "will", "wollen", "wollt", "wollen"],
    meaningDe: "Den Wunsch haben, etwas zu tun", meaningEn: "To want",
    example: "Ich will nach Deutschland reisen.", exampleEn: "I want to travel to Germany.",
    level: "A1", category: "verbs"
  },
  {
    word: "sollen", partOfSpeech: "Verb", conjugation: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
    meaningDe: "Eine Pflicht oder Empfehlung ausdrücken", meaningEn: "Should / Ought to",
    example: "Du sollst mehr Wasser trinken.", exampleEn: "You should drink more water.",
    level: "A1", category: "verbs"
  },
  {
    word: "dürfen", partOfSpeech: "Verb", conjugation: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
    meaningDe: "Erlaubnis haben, etwas zu tun", meaningEn: "To be allowed to / May",
    example: "Darf ich hier rauchen?", exampleEn: "May I smoke here?",
    level: "A1", category: "verbs"
  },
  {
    word: "möchten", partOfSpeech: "Verb", conjugation: ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"],
    meaningDe: "Höflich etwas wünschen", meaningEn: "Would like to",
    example: "Ich möchte einen Kaffee, bitte.", exampleEn: "I would like a coffee, please.",
    level: "A1", category: "verbs"
  },
  {
    word: "brauchen", partOfSpeech: "Verb", conjugation: ["brauche", "brauchst", "braucht", "brauchen", "braucht", "brauchen"],
    meaningDe: "Etwas nötig haben", meaningEn: "To need",
    example: "Ich brauche Hilfe.", exampleEn: "I need help.",
    level: "A1", category: "verbs"
  },
  {
    word: "verstehen", partOfSpeech: "Verb", conjugation: ["verstehe", "verstehst", "versteht", "verstehen", "versteht", "verstehen"],
    meaningDe: "Den Sinn von etwas erfassen", meaningEn: "To understand",
    example: "Ich verstehe kein Wort.", exampleEn: "I don't understand a word.",
    level: "A1", category: "verbs"
  },
  {
    word: "lernen", partOfSpeech: "Verb", conjugation: ["lerne", "lernst", "lernt", "lernen", "lernt", "lernen"],
    meaningDe: "Wissen oder Fähigkeiten erwerben", meaningEn: "To learn",
    example: "Ich lerne Deutsch.", exampleEn: "I learn German.",
    level: "A1", category: "verbs"
  },
  {
    word: "arbeiten", partOfSpeech: "Verb", conjugation: ["arbeite", "arbeitest", "arbeitet", "arbeiten", "arbeitet", "arbeiten"],
    meaningDe: "Beruflich tätig sein", meaningEn: "To work",
    example: "Ich arbeite als Lehrer.", exampleEn: "I work as a teacher.",
    level: "A1", category: "verbs"
  },
  {
    word: "spielen", partOfSpeech: "Verb", conjugation: ["spiele", "spielst", "spielt", "spielen", "spielt", "spielen"],
    meaningDe: "Zum Vergnügen etwas tun", meaningEn: "To play",
    example: "Die Kinder spielen im Park.", exampleEn: "The children play in the park.",
    level: "A1", category: "verbs"
  },
  {
    word: "fahren", partOfSpeech: "Verb", conjugation: ["fahre", "fährst", "fährt", "fahren", "fahrt", "fahren"],
    meaningDe: "Sich mit einem Fahrzeug bewegen", meaningEn: "To drive / To travel",
    example: "Ich fahre mit dem Zug.", exampleEn: "I travel by train.",
    level: "A1", category: "verbs"
  },
  {
    word: "fliegen", partOfSpeech: "Verb", conjugation: ["fliege", "fliegst", "fliegt", "fliegen", "fliegt", "fliegen"],
    meaningDe: "Sich durch die Luft bewegen", meaningEn: "To fly",
    example: "Wir fliegen nach Spanien.", exampleEn: "We fly to Spain.",
    level: "A1", category: "verbs"
  },
  {
    word: "laufen", partOfSpeech: "Verb", conjugation: ["laufe", "läufst", "läuft", "laufen", "lauft", "laufen"],
    meaningDe: "Sich schnell zu Fuß bewegen", meaningEn: "To run / To walk",
    example: "Er läuft jeden Morgen.", exampleEn: "He runs every morning.",
    level: "A1", category: "verbs"
  },
  {
    word: "kochen", partOfSpeech: "Verb", conjugation: ["koche", "kochst", "kocht", "kochen", "kocht", "kochen"],
    meaningDe: "Essen zubereiten", meaningEn: "To cook",
    example: "Ich koche heute Abend.", exampleEn: "I cook tonight.",
    level: "A1", category: "verbs"
  },
  {
    word: "öffnen", partOfSpeech: "Verb", conjugation: ["öffne", "öffnest", "öffnet", "öffnen", "öffnet", "öffnen"],
    meaningDe: "Etwas aufmachen", meaningEn: "To open",
    example: "Bitte öffnen Sie das Fenster.", exampleEn: "Please open the window.",
    level: "A1", category: "verbs"
  },
  {
    word: "schließen", partOfSpeech: "Verb", conjugation: ["schließe", "schließt", "schließt", "schließen", "schließt", "schließen"],
    meaningDe: "Etwas zumachen", meaningEn: "To close",
    example: "Bitte schließen Sie die Tür.", exampleEn: "Please close the door.",
    level: "A1", category: "verbs"
  },
  {
    word: "beginnen", partOfSpeech: "Verb", conjugation: ["beginne", "beginnst", "beginnt", "beginnen", "beginnt", "beginnen"],
    meaningDe: "Etwas anfangen", meaningEn: "To begin / To start",
    example: "Der Kurs beginnt um 9 Uhr.", exampleEn: "The course begins at 9 o'clock.",
    level: "A1", category: "verbs"
  },
  {
    word: "helfen", partOfSpeech: "Verb", conjugation: ["helfe", "hilfst", "hilft", "helfen", "helft", "helfen"],
    meaningDe: "Jemandem beistehen", meaningEn: "To help",
    example: "Kannst du mir helfen?", exampleEn: "Can you help me?",
    level: "A1", category: "verbs"
  },
  {
    word: "lieben", partOfSpeech: "Verb", conjugation: ["liebe", "liebst", "liebt", "lieben", "liebt", "lieben"],
    meaningDe: "Starke Zuneigung empfinden", meaningEn: "To love",
    example: "Ich liebe dich.", exampleEn: "I love you.",
    level: "A1", category: "verbs"
  },
  {
    word: "wohnen", partOfSpeech: "Verb", conjugation: ["wohne", "wohnst", "wohnt", "wohnen", "wohnt", "wohnen"],
    meaningDe: "An einem Ort leben", meaningEn: "To live (reside)",
    example: "Wo wohnen Sie?", exampleEn: "Where do you live?",
    level: "A1", category: "verbs"
  },
  {
    word: "heißen", partOfSpeech: "Verb", conjugation: ["heiße", "heißt", "heißt", "heißen", "heißt", "heißen"],
    meaningDe: "Einen Namen tragen", meaningEn: "To be called",
    example: "Wie heißen Sie?", exampleEn: "What is your name?",
    level: "A1", category: "verbs"
  },
  {
    word: "glauben", partOfSpeech: "Verb", conjugation: ["glaube", "glaubst", "glaubt", "glauben", "glaubt", "glauben"],
    meaningDe: "Etwas für wahr halten", meaningEn: "To believe",
    example: "Ich glaube, das ist richtig.", exampleEn: "I believe that is correct.",
    level: "A1", category: "verbs"
  },
  {
    word: "denken", partOfSpeech: "Verb", conjugation: ["denke", "denkst", "denkt", "denken", "denkt", "denken"],
    meaningDe: "Im Kopf überlegen", meaningEn: "To think",
    example: "Ich denke oft an dich.", exampleEn: "I often think of you.",
    level: "A1", category: "verbs"
  },
  {
    word: "fragen", partOfSpeech: "Verb", conjugation: ["frage", "fragst", "fragt", "fragen", "fragt", "fragen"],
    meaningDe: "Etwas wissen wollen", meaningEn: "To ask",
    example: "Darf ich Sie etwas fragen?", exampleEn: "May I ask you something?",
    level: "A1", category: "verbs"
  },
  {
    word: "antworten", partOfSpeech: "Verb", conjugation: ["antworte", "antwortest", "antwortet", "antworten", "antwortet", "antworten"],
    meaningDe: "Auf eine Frage reagieren", meaningEn: "To answer",
    example: "Er antwortet auf meine Frage.", exampleEn: "He answers my question.",
    level: "A1", category: "verbs"
  },
  {
    word: "zeigen", partOfSpeech: "Verb", conjugation: ["zeige", "zeigst", "zeigt", "zeigen", "zeigt", "zeigen"],
    meaningDe: "Auf etwas hinweisen", meaningEn: "To show",
    example: "Können Sie mir den Weg zeigen?", exampleEn: "Can you show me the way?",
    level: "A1", category: "verbs"
  },
  {
    word: "bringen", partOfSpeech: "Verb", conjugation: ["bringe", "bringst", "bringt", "bringen", "bringt", "bringen"],
    meaningDe: "Etwas zu jemandem tragen", meaningEn: "To bring",
    example: "Ich bringe dir ein Geschenk.", exampleEn: "I bring you a gift.",
    level: "A1", category: "verbs"
  },
  {
    word: "tragen", partOfSpeech: "Verb", conjugation: ["trage", "trägst", "trägt", "tragen", "tragt", "tragen"],
    meaningDe: "Etwas bei sich haben oder Kleidung anhaben", meaningEn: "To carry / To wear",
    example: "Sie trägt ein rotes Kleid.", exampleEn: "She wears a red dress.",
    level: "A1", category: "verbs"
  },
  {
    word: "waschen", partOfSpeech: "Verb", conjugation: ["wasche", "wäschst", "wäscht", "waschen", "wascht", "waschen"],
    meaningDe: "Mit Wasser reinigen", meaningEn: "To wash",
    example: "Ich wasche meine Hände.", exampleEn: "I wash my hands.",
    level: "A1", category: "verbs"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — ADJEKTIVE (adjectives)
  // ══════════════════════════════════════════════════════════════
  {
    word: "groß", partOfSpeech: "Adjektiv",
    meaningDe: "Von beträchtlicher Höhe oder Größe", meaningEn: "Big / Tall",
    example: "Das Haus ist sehr groß.", exampleEn: "The house is very big.",
    level: "A1", category: "adjectives"
  },
  {
    word: "klein", partOfSpeech: "Adjektiv",
    meaningDe: "Von geringer Größe", meaningEn: "Small / Short",
    example: "Das Kind ist noch klein.", exampleEn: "The child is still small.",
    level: "A1", category: "adjectives"
  },
  {
    word: "gut", partOfSpeech: "Adjektiv",
    meaningDe: "Positiv, von hoher Qualität", meaningEn: "Good",
    example: "Das Essen ist gut.", exampleEn: "The food is good.",
    level: "A1", category: "adjectives"
  },
  {
    word: "schlecht", partOfSpeech: "Adjektiv",
    meaningDe: "Negativ, von niedriger Qualität", meaningEn: "Bad",
    example: "Das Wetter ist schlecht.", exampleEn: "The weather is bad.",
    level: "A1", category: "adjectives"
  },
  {
    word: "schön", partOfSpeech: "Adjektiv",
    meaningDe: "Ästhetisch ansprechend", meaningEn: "Beautiful / Nice",
    example: "Die Stadt ist sehr schön.", exampleEn: "The city is very beautiful.",
    level: "A1", category: "adjectives"
  },
  {
    word: "hässlich", partOfSpeech: "Adjektiv",
    meaningDe: "Nicht schön", meaningEn: "Ugly",
    example: "Das Gebäude ist hässlich.", exampleEn: "The building is ugly.",
    level: "A1", category: "adjectives"
  },
  {
    word: "neu", partOfSpeech: "Adjektiv",
    meaningDe: "Erst kurze Zeit vorhanden", meaningEn: "New",
    example: "Ich habe ein neues Handy.", exampleEn: "I have a new phone.",
    level: "A1", category: "adjectives"
  },
  {
    word: "alt", partOfSpeech: "Adjektiv",
    meaningDe: "Seit langer Zeit vorhanden", meaningEn: "Old",
    example: "Die Kirche ist sehr alt.", exampleEn: "The church is very old.",
    level: "A1", category: "adjectives"
  },
  {
    word: "schnell", partOfSpeech: "Adjektiv",
    meaningDe: "Mit hoher Geschwindigkeit", meaningEn: "Fast / Quick",
    example: "Der Zug ist sehr schnell.", exampleEn: "The train is very fast.",
    level: "A1", category: "adjectives"
  },
  {
    word: "langsam", partOfSpeech: "Adjektiv",
    meaningDe: "Mit geringer Geschwindigkeit", meaningEn: "Slow",
    example: "Bitte sprechen Sie langsam.", exampleEn: "Please speak slowly.",
    level: "A1", category: "adjectives"
  },
  {
    word: "kalt", partOfSpeech: "Adjektiv",
    meaningDe: "Niedrige Temperatur", meaningEn: "Cold",
    example: "Im Winter ist es kalt.", exampleEn: "In winter it is cold.",
    level: "A1", category: "adjectives"
  },
  {
    word: "warm", partOfSpeech: "Adjektiv",
    meaningDe: "Angenehme Temperatur", meaningEn: "Warm",
    example: "Heute ist es warm.", exampleEn: "Today it is warm.",
    level: "A1", category: "adjectives"
  },
  {
    word: "heiß", partOfSpeech: "Adjektiv",
    meaningDe: "Sehr hohe Temperatur", meaningEn: "Hot",
    example: "Der Kaffee ist heiß.", exampleEn: "The coffee is hot.",
    level: "A1", category: "adjectives"
  },
  {
    word: "richtig", partOfSpeech: "Adjektiv",
    meaningDe: "Korrekt, ohne Fehler", meaningEn: "Right / Correct",
    example: "Das ist die richtige Antwort.", exampleEn: "That is the correct answer.",
    level: "A1", category: "adjectives"
  },
  {
    word: "falsch", partOfSpeech: "Adjektiv",
    meaningDe: "Nicht korrekt", meaningEn: "Wrong / False",
    example: "Diese Antwort ist falsch.", exampleEn: "This answer is wrong.",
    level: "A1", category: "adjectives"
  },
  {
    word: "leicht", partOfSpeech: "Adjektiv",
    meaningDe: "Von geringem Gewicht oder einfach", meaningEn: "Light / Easy",
    example: "Die Aufgabe ist leicht.", exampleEn: "The task is easy.",
    level: "A1", category: "adjectives"
  },
  {
    word: "schwer", partOfSpeech: "Adjektiv",
    meaningDe: "Von großem Gewicht oder schwierig", meaningEn: "Heavy / Difficult",
    example: "Der Koffer ist sehr schwer.", exampleEn: "The suitcase is very heavy.",
    level: "A1", category: "adjectives"
  },
  {
    word: "lang", partOfSpeech: "Adjektiv",
    meaningDe: "Von großer Ausdehnung", meaningEn: "Long",
    example: "Der Fluss ist sehr lang.", exampleEn: "The river is very long.",
    level: "A1", category: "adjectives"
  },
  {
    word: "kurz", partOfSpeech: "Adjektiv",
    meaningDe: "Von geringer Ausdehnung oder Dauer", meaningEn: "Short",
    example: "Die Pause ist zu kurz.", exampleEn: "The break is too short.",
    level: "A1", category: "adjectives"
  },
  {
    word: "hoch", partOfSpeech: "Adjektiv",
    meaningDe: "Weit oben oder von großer Höhe", meaningEn: "High / Tall",
    example: "Der Berg ist sehr hoch.", exampleEn: "The mountain is very high.",
    level: "A1", category: "adjectives"
  },
  {
    word: "tief", partOfSpeech: "Adjektiv",
    meaningDe: "Weit unten oder von großer Tiefe", meaningEn: "Deep / Low",
    example: "Der See ist sehr tief.", exampleEn: "The lake is very deep.",
    level: "A1", category: "adjectives"
  },
  {
    word: "breit", partOfSpeech: "Adjektiv",
    meaningDe: "Von großer Ausdehnung zur Seite", meaningEn: "Wide / Broad",
    example: "Die Straße ist breit.", exampleEn: "The street is wide.",
    level: "A1", category: "adjectives"
  },
  {
    word: "eng", partOfSpeech: "Adjektiv",
    meaningDe: "Von geringer Ausdehnung zur Seite", meaningEn: "Narrow / Tight",
    example: "Die Gasse ist sehr eng.", exampleEn: "The alley is very narrow.",
    level: "A1", category: "adjectives"
  },
  {
    word: "hell", partOfSpeech: "Adjektiv",
    meaningDe: "Viel Licht habend", meaningEn: "Bright / Light",
    example: "Das Zimmer ist hell.", exampleEn: "The room is bright.",
    level: "A1", category: "adjectives"
  },
  {
    word: "dunkel", partOfSpeech: "Adjektiv",
    meaningDe: "Wenig Licht habend", meaningEn: "Dark",
    example: "Im Winter wird es früh dunkel.", exampleEn: "In winter it gets dark early.",
    level: "A1", category: "adjectives"
  },
  {
    word: "laut", partOfSpeech: "Adjektiv",
    meaningDe: "Mit starkem Geräusch", meaningEn: "Loud",
    example: "Die Musik ist zu laut.", exampleEn: "The music is too loud.",
    level: "A1", category: "adjectives"
  },
  {
    word: "leise", partOfSpeech: "Adjektiv",
    meaningDe: "Mit geringem Geräusch", meaningEn: "Quiet / Soft",
    example: "Bitte sei leise!", exampleEn: "Please be quiet!",
    level: "A1", category: "adjectives"
  },
  {
    word: "nah", partOfSpeech: "Adjektiv",
    meaningDe: "In geringer Entfernung", meaningEn: "Near / Close",
    example: "Der Supermarkt ist nah.", exampleEn: "The supermarket is nearby.",
    level: "A1", category: "adjectives"
  },
  {
    word: "weit", partOfSpeech: "Adjektiv",
    meaningDe: "In großer Entfernung", meaningEn: "Far",
    example: "Der Flughafen ist weit weg.", exampleEn: "The airport is far away.",
    level: "A1", category: "adjectives"
  },
  {
    word: "voll", partOfSpeech: "Adjektiv",
    meaningDe: "Ganz gefüllt", meaningEn: "Full",
    example: "Der Bus ist voll.", exampleEn: "The bus is full.",
    level: "A1", category: "adjectives"
  },
  {
    word: "leer", partOfSpeech: "Adjektiv",
    meaningDe: "Nichts enthaltend", meaningEn: "Empty",
    example: "Das Glas ist leer.", exampleEn: "The glass is empty.",
    level: "A1", category: "adjectives"
  },
  {
    word: "offen", partOfSpeech: "Adjektiv",
    meaningDe: "Nicht geschlossen", meaningEn: "Open",
    example: "Die Tür ist offen.", exampleEn: "The door is open.",
    level: "A1", category: "adjectives"
  },
  {
    word: "geschlossen", partOfSpeech: "Adjektiv",
    meaningDe: "Nicht offen, zugemacht", meaningEn: "Closed",
    example: "Das Geschäft ist geschlossen.", exampleEn: "The shop is closed.",
    level: "A1", category: "adjectives"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — FARBEN (colors)
  // ══════════════════════════════════════════════════════════════
  {
    word: "rot", partOfSpeech: "Adjektiv",
    meaningDe: "Farbe wie Blut oder Tomaten", meaningEn: "Red",
    example: "Die Rose ist rot.", exampleEn: "The rose is red.",
    level: "A1", category: "colors"
  },
  {
    word: "blau", partOfSpeech: "Adjektiv",
    meaningDe: "Farbe wie der Himmel", meaningEn: "Blue",
    example: "Der Himmel ist blau.", exampleEn: "The sky is blue.",
    level: "A1", category: "colors"
  },
  {
    word: "grün", partOfSpeech: "Adjektiv",
    meaningDe: "Farbe wie Gras", meaningEn: "Green",
    example: "Das Gras ist grün.", exampleEn: "The grass is green.",
    level: "A1", category: "colors"
  },
  {
    word: "gelb", partOfSpeech: "Adjektiv",
    meaningDe: "Farbe wie die Sonne", meaningEn: "Yellow",
    example: "Die Banane ist gelb.", exampleEn: "The banana is yellow.",
    level: "A1", category: "colors"
  },
  {
    word: "schwarz", partOfSpeech: "Adjektiv",
    meaningDe: "Dunkelste Farbe, Gegenteil von weiß", meaningEn: "Black",
    example: "Die Katze ist schwarz.", exampleEn: "The cat is black.",
    level: "A1", category: "colors"
  },
  {
    word: "weiß", partOfSpeech: "Adjektiv",
    meaningDe: "Hellste Farbe, Gegenteil von schwarz", meaningEn: "White",
    example: "Der Schnee ist weiß.", exampleEn: "The snow is white.",
    level: "A1", category: "colors"
  },
  {
    word: "braun", partOfSpeech: "Adjektiv",
    meaningDe: "Farbe wie Schokolade oder Holz", meaningEn: "Brown",
    example: "Der Hund ist braun.", exampleEn: "The dog is brown.",
    level: "A1", category: "colors"
  },
  {
    word: "grau", partOfSpeech: "Adjektiv",
    meaningDe: "Farbe zwischen schwarz und weiß", meaningEn: "Gray",
    example: "Der Himmel ist grau.", exampleEn: "The sky is gray.",
    level: "A1", category: "colors"
  },
  {
    word: "orange", partOfSpeech: "Adjektiv",
    meaningDe: "Farbe zwischen rot und gelb", meaningEn: "Orange",
    example: "Die Orange ist orange.", exampleEn: "The orange is orange.",
    level: "A1", category: "colors"
  },
  {
    word: "rosa", partOfSpeech: "Adjektiv",
    meaningDe: "Helles Rot", meaningEn: "Pink",
    example: "Sie trägt ein rosa Kleid.", exampleEn: "She wears a pink dress.",
    level: "A1", category: "colors"
  },
  {
    word: "lila", partOfSpeech: "Adjektiv",
    meaningDe: "Farbe zwischen rot und blau", meaningEn: "Purple",
    example: "Die Blume ist lila.", exampleEn: "The flower is purple.",
    level: "A1", category: "colors"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — KLEIDUNG (clothes)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Hose", article: "die", plural: "Hosen", partOfSpeech: "Nomen",
    meaningDe: "Kleidungsstück für die Beine", meaningEn: "Trousers / Pants",
    example: "Ich kaufe eine neue Hose.", exampleEn: "I buy new trousers.",
    level: "A1", category: "clothes"
  },
  {
    word: "Hemd", article: "das", plural: "Hemden", partOfSpeech: "Nomen",
    meaningDe: "Kleidungsstück für den Oberkörper mit Kragen", meaningEn: "Shirt",
    example: "Er trägt ein weißes Hemd.", exampleEn: "He wears a white shirt.",
    level: "A1", category: "clothes"
  },
  {
    word: "Kleid", article: "das", plural: "Kleider", partOfSpeech: "Nomen",
    meaningDe: "Einteiliges Kleidungsstück für Frauen", meaningEn: "Dress",
    example: "Das Kleid ist sehr elegant.", exampleEn: "The dress is very elegant.",
    level: "A1", category: "clothes"
  },
  {
    word: "Rock", article: "der", plural: "Röcke", partOfSpeech: "Nomen",
    meaningDe: "Kleidungsstück ab der Taille", meaningEn: "Skirt",
    example: "Der Rock ist blau.", exampleEn: "The skirt is blue.",
    level: "A1", category: "clothes"
  },
  {
    word: "Jacke", article: "die", plural: "Jacken", partOfSpeech: "Nomen",
    meaningDe: "Kleidungsstück für draußen, kurzer Mantel", meaningEn: "Jacket",
    example: "Zieh die Jacke an, es ist kalt.", exampleEn: "Put on the jacket, it's cold.",
    level: "A1", category: "clothes"
  },
  {
    word: "Mantel", article: "der", plural: "Mäntel", partOfSpeech: "Nomen",
    meaningDe: "Langes warmes Kleidungsstück für den Winter", meaningEn: "Coat",
    example: "Im Winter trage ich einen Mantel.", exampleEn: "In winter I wear a coat.",
    level: "A1", category: "clothes"
  },
  {
    word: "Schuh", article: "der", plural: "Schuhe", partOfSpeech: "Nomen",
    meaningDe: "Kleidungsstück für den Fuß", meaningEn: "Shoe",
    example: "Diese Schuhe sind bequem.", exampleEn: "These shoes are comfortable.",
    level: "A1", category: "clothes"
  },
  {
    word: "Mütze", article: "die", plural: "Mützen", partOfSpeech: "Nomen",
    meaningDe: "Kleidungsstück für den Kopf", meaningEn: "Cap / Beanie",
    example: "Im Winter trage ich eine Mütze.", exampleEn: "In winter I wear a beanie.",
    level: "A1", category: "clothes"
  },
  {
    word: "Tasche", article: "die", plural: "Taschen", partOfSpeech: "Nomen",
    meaningDe: "Behälter zum Tragen von Dingen", meaningEn: "Bag / Pocket",
    example: "Meine Tasche ist sehr schwer.", exampleEn: "My bag is very heavy.",
    level: "A1", category: "clothes"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — SCHULE & LERNEN (school)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Schule", article: "die", plural: "Schulen", partOfSpeech: "Nomen",
    meaningDe: "Ort, wo Kinder lernen", meaningEn: "School",
    example: "Die Kinder gehen in die Schule.", exampleEn: "The children go to school.",
    level: "A1", category: "school"
  },
  {
    word: "Lehrer", article: "der", plural: "Lehrer", partOfSpeech: "Nomen",
    meaningDe: "Person, die unterrichtet", meaningEn: "Teacher (male)",
    example: "Der Lehrer erklärt die Grammatik.", exampleEn: "The teacher explains the grammar.",
    level: "A1", category: "school"
  },
  {
    word: "Buch", article: "das", plural: "Bücher", partOfSpeech: "Nomen",
    meaningDe: "Gebundene Seiten zum Lesen", meaningEn: "Book",
    example: "Ich lese ein deutsches Buch.", exampleEn: "I read a German book.",
    level: "A1", category: "school"
  },
  {
    word: "Sprache", article: "die", plural: "Sprachen", partOfSpeech: "Nomen",
    meaningDe: "System der Kommunikation eines Volkes", meaningEn: "Language",
    example: "Deutsch ist eine schöne Sprache.", exampleEn: "German is a beautiful language.",
    level: "A1", category: "school"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — GEFÜHLE (feelings)
  // ══════════════════════════════════════════════════════════════
  {
    word: "glücklich", partOfSpeech: "Adjektiv",
    meaningDe: "Zufrieden und froh", meaningEn: "Happy",
    example: "Ich bin sehr glücklich.", exampleEn: "I am very happy.",
    level: "A1", category: "feelings"
  },
  {
    word: "traurig", partOfSpeech: "Adjektiv",
    meaningDe: "Betrübt, nicht fröhlich", meaningEn: "Sad",
    example: "Das Kind ist traurig.", exampleEn: "The child is sad.",
    level: "A1", category: "feelings"
  },
  {
    word: "müde", partOfSpeech: "Adjektiv",
    meaningDe: "Schlaf brauchend", meaningEn: "Tired",
    example: "Ich bin sehr müde.", exampleEn: "I am very tired.",
    level: "A1", category: "feelings"
  },
  {
    word: "krank", partOfSpeech: "Adjektiv",
    meaningDe: "Nicht gesund", meaningEn: "Sick / Ill",
    example: "Er ist heute krank.", exampleEn: "He is sick today.",
    level: "A1", category: "feelings"
  },
  {
    word: "gesund", partOfSpeech: "Adjektiv",
    meaningDe: "Nicht krank, bei guter Gesundheit", meaningEn: "Healthy",
    example: "Obst essen ist gesund.", exampleEn: "Eating fruit is healthy.",
    level: "A1", category: "feelings"
  },
  {
    word: "hungrig", partOfSpeech: "Adjektiv",
    meaningDe: "Essen brauchend", meaningEn: "Hungry",
    example: "Ich bin hungrig.", exampleEn: "I am hungry.",
    level: "A1", category: "feelings"
  },
  {
    word: "durstig", partOfSpeech: "Adjektiv",
    meaningDe: "Trinken brauchend", meaningEn: "Thirsty",
    example: "Bist du durstig?", exampleEn: "Are you thirsty?",
    level: "A1", category: "feelings"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — FREIZEIT (leisure)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Kino", article: "das", plural: "Kinos", partOfSpeech: "Nomen",
    meaningDe: "Ort, wo man Filme sieht", meaningEn: "Cinema",
    example: "Gehen wir heute Abend ins Kino?", exampleEn: "Shall we go to the cinema tonight?",
    level: "A1", category: "leisure"
  },
  {
    word: "Musik", article: "die", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Töne und Klänge als Kunst", meaningEn: "Music",
    example: "Ich höre gern Musik.", exampleEn: "I like to listen to music.",
    level: "A1", category: "leisure"
  },
  {
    word: "Sport", article: "der", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Körperliche Aktivität", meaningEn: "Sport",
    example: "Ich mache dreimal pro Woche Sport.", exampleEn: "I do sports three times a week.",
    level: "A1", category: "leisure"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — STADT (city)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Stadt", article: "die", plural: "Städte", partOfSpeech: "Nomen",
    meaningDe: "Großer Ort mit vielen Menschen", meaningEn: "City",
    example: "Berlin ist eine große Stadt.", exampleEn: "Berlin is a big city.",
    level: "A1", category: "city"
  },
  {
    word: "Apotheke", article: "die", plural: "Apotheken", partOfSpeech: "Nomen",
    meaningDe: "Geschäft für Medikamente", meaningEn: "Pharmacy",
    example: "Die Apotheke ist um die Ecke.", exampleEn: "The pharmacy is around the corner.",
    level: "A1", category: "city"
  },
  {
    word: "Krankenhaus", article: "das", plural: "Krankenhäuser", partOfSpeech: "Nomen",
    meaningDe: "Ort, wo Kranke behandelt werden", meaningEn: "Hospital",
    example: "Er liegt im Krankenhaus.", exampleEn: "He is in the hospital.",
    level: "A1", category: "city"
  },
  {
    word: "Restaurant", article: "das", plural: "Restaurants", partOfSpeech: "Nomen",
    meaningDe: "Ort zum Essen gehen", meaningEn: "Restaurant",
    example: "Wir essen in einem italienischen Restaurant.", exampleEn: "We eat in an Italian restaurant.",
    level: "A1", category: "city"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — NATUR (nature)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Wetter", article: "das", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Zustand der Atmosphäre", meaningEn: "Weather",
    example: "Wie ist das Wetter heute?", exampleEn: "How is the weather today?",
    level: "A1", category: "nature"
  },
  {
    word: "Sonne", article: "die", plural: "Sonnen", partOfSpeech: "Nomen",
    meaningDe: "Stern, der die Erde erwärmt", meaningEn: "Sun",
    example: "Die Sonne scheint.", exampleEn: "The sun is shining.",
    level: "A1", category: "nature"
  },
  {
    word: "Regen", article: "der", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Wasser, das vom Himmel fällt", meaningEn: "Rain",
    example: "Es gibt viel Regen.", exampleEn: "There is a lot of rain.",
    level: "A1", category: "nature"
  },

  // ══════════════════════════════════════════════════════════════
  // A1 — ARBEIT (work)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Arbeit", article: "die", plural: "Arbeiten", partOfSpeech: "Nomen",
    meaningDe: "Berufliche Tätigkeit", meaningEn: "Work / Job",
    example: "Ich gehe zur Arbeit.", exampleEn: "I go to work.",
    level: "A1", category: "work"
  },
  {
    word: "Büro", article: "das", plural: "Büros", partOfSpeech: "Nomen",
    meaningDe: "Raum zum Arbeiten", meaningEn: "Office",
    example: "Ich arbeite im Büro.", exampleEn: "I work in the office.",
    level: "A1", category: "work"
  },

  // ══════════════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════
  // A2 — ESSEN & TRINKEN (food)
  // ══════════════════════════════════════════════════════════════════
  {
    word: "Hähnchen", article: "das", plural: "Hähnchen", partOfSpeech: "Nomen",
    meaningDe: "Junges Huhn als Nahrungsmittel", meaningEn: "Chicken",
    example: "Ich bestelle gegrilltes Hähnchen.", exampleEn: "I order grilled chicken.",
    level: "A2", category: "food"
  },
  {
    word: "Schweinefleisch", article: "das", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Fleisch vom Schwein", meaningEn: "Pork",
    example: "Schweinefleisch ist in Deutschland beliebt.", exampleEn: "Pork is popular in Germany.",
    level: "A2", category: "food"
  },
  {
    word: "Rindfleisch", article: "das", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Fleisch vom Rind", meaningEn: "Beef",
    example: "Das Rindfleisch kommt aus Bayern.", exampleEn: "The beef comes from Bavaria.",
    level: "A2", category: "food"
  },
  {
    word: "Zwiebel", article: "die", plural: "Zwiebeln", partOfSpeech: "Nomen",
    meaningDe: "Rundes scharfes Gemüse mit vielen Schichten", meaningEn: "Onion",
    example: "Ich schneide die Zwiebel.", exampleEn: "I cut the onion.",
    level: "A2", category: "food"
  },
  {
    word: "Knoblauch", article: "der", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Würzige Pflanze mit starkem Geruch", meaningEn: "Garlic",
    example: "Das Gericht hat viel Knoblauch.", exampleEn: "The dish has a lot of garlic.",
    level: "A2", category: "food"
  },
  {
    word: "Paprika", article: "die", plural: "Paprika", partOfSpeech: "Nomen",
    meaningDe: "Buntes Gemüse, rot, grün oder gelb", meaningEn: "Bell pepper",
    example: "Ich schneide die Paprika in Streifen.", exampleEn: "I cut the bell pepper into strips.",
    level: "A2", category: "food"
  },
  {
    word: "Gurke", article: "die", plural: "Gurken", partOfSpeech: "Nomen",
    meaningDe: "Langes grünes Gemüse", meaningEn: "Cucumber",
    example: "Ich möchte Gurke im Salat.", exampleEn: "I want cucumber in the salad.",
    level: "A2", category: "food"
  },
  {
    word: "Erdbeere", article: "die", plural: "Erdbeeren", partOfSpeech: "Nomen",
    meaningDe: "Kleine rote süße Frucht", meaningEn: "Strawberry",
    example: "Erdbeeren schmecken im Sommer am besten.", exampleEn: "Strawberries taste best in summer.",
    level: "A2", category: "food"
  },
  {
    word: "Kirsche", article: "die", plural: "Kirschen", partOfSpeech: "Nomen",
    meaningDe: "Kleine runde rote Frucht mit Kern", meaningEn: "Cherry",
    example: "Der Kuchen ist mit Kirschen.", exampleEn: "The cake is with cherries.",
    level: "A2", category: "food"
  },
  {
    word: "Banane", article: "die", plural: "Bananen", partOfSpeech: "Nomen",
    meaningDe: "Lange gelbe Frucht", meaningEn: "Banana",
    example: "Ich esse jeden Tag eine Banane.", exampleEn: "I eat a banana every day.",
    level: "A2", category: "food"
  },
  {
    word: "Orange", article: "die", plural: "Orangen", partOfSpeech: "Nomen",
    meaningDe: "Runde orange Zitrusfrucht", meaningEn: "Orange",
    example: "Ich trinke frisch gepressten Orangensaft.", exampleEn: "I drink freshly squeezed orange juice.",
    level: "A2", category: "food"
  },
  {
    word: "Schokolade", article: "die", plural: "Schokoladen", partOfSpeech: "Nomen",
    meaningDe: "Süßigkeit aus Kakao", meaningEn: "Chocolate",
    example: "Deutsche Schokolade ist berühmt.", exampleEn: "German chocolate is famous.",
    level: "A2", category: "food"
  },
  {
    word: "Keks", article: "der", plural: "Kekse", partOfSpeech: "Nomen",
    meaningDe: "Kleines flaches süßes Gebäck", meaningEn: "Cookie / Biscuit",
    example: "Möchtest du einen Keks zum Tee?", exampleEn: "Would you like a cookie with your tea?",
    level: "A2", category: "food"
  },
  {
    word: "Torte", article: "die", plural: "Torten", partOfSpeech: "Nomen",
    meaningDe: "Feiner, aufwendiger Kuchen", meaningEn: "Gateau / Fancy cake",
    example: "Die Schwarzwälder Kirschtorte ist berühmt.", exampleEn: "The Black Forest cake is famous.",
    level: "A2", category: "food"
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — TECHNOLOGIE (technology)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Computer", article: "der", plural: "Computer", partOfSpeech: "Nomen",
    meaningDe: "Elektronisches Gerät zur Datenverarbeitung", meaningEn: "Computer",
    example: "Ich arbeite am Computer.", exampleEn: "I work on the computer.",
    level: "A2", category: "technology"
  },
  {
    word: "Handy", article: "das", plural: "Handys", partOfSpeech: "Nomen",
    meaningDe: "Mobiltelefon", meaningEn: "Mobile phone / Cell phone",
    example: "Mein Handy klingelt.", exampleEn: "My phone is ringing.",
    level: "A2", category: "technology"
  },
  {
    word: "Internet", article: "das", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Weltweites Computernetzwerk", meaningEn: "Internet",
    example: "Ich suche die Information im Internet.", exampleEn: "I search for the information on the internet.",
    level: "A2", category: "technology"
  },
  {
    word: "E-Mail", article: "die", plural: "E-Mails", partOfSpeech: "Nomen",
    meaningDe: "Elektronische Nachricht", meaningEn: "Email",
    example: "Ich habe dir eine E-Mail geschickt.", exampleEn: "I sent you an email.",
    level: "A2", category: "technology"
  },
  {
    word: "Nachricht", article: "die", plural: "Nachrichten", partOfSpeech: "Nomen",
    meaningDe: "Mitteilung oder Information", meaningEn: "Message / News",
    example: "Ich habe eine Nachricht bekommen.", exampleEn: "I received a message.",
    level: "A2", category: "technology"
  },
  {
    word: "Bildschirm", article: "der", plural: "Bildschirme", partOfSpeech: "Nomen",
    meaningDe: "Anzeigefläche eines Computers oder Fernsehers", meaningEn: "Screen / Monitor",
    example: "Der Bildschirm ist sehr groß.", exampleEn: "The screen is very big.",
    level: "A2", category: "technology"
  },
  {
    word: "Tastatur", article: "die", plural: "Tastaturen", partOfSpeech: "Nomen",
    meaningDe: "Eingabegerät mit Tasten", meaningEn: "Keyboard",
    example: "Die Tastatur ist kaputt.", exampleEn: "The keyboard is broken.",
    level: "A2", category: "technology"
  },
  {
    word: "Drucker", article: "der", plural: "Drucker", partOfSpeech: "Nomen",
    meaningDe: "Gerät zum Drucken auf Papier", meaningEn: "Printer",
    example: "Der Drucker hat kein Papier mehr.", exampleEn: "The printer has no more paper.",
    level: "A2", category: "technology"
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — BERUFE (work)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Arzt", article: "der", plural: "Ärzte", partOfSpeech: "Nomen",
    meaningDe: "Person, die Kranke behandelt", meaningEn: "Doctor",
    example: "Ich muss zum Arzt gehen.", exampleEn: "I have to go to the doctor.",
    level: "A2", category: "work"
  },
  {
    word: "Ingenieur", article: "der", plural: "Ingenieure", partOfSpeech: "Nomen",
    meaningDe: "Person mit technischem Studium", meaningEn: "Engineer",
    example: "Er arbeitet als Ingenieur bei BMW.", exampleEn: "He works as an engineer at BMW.",
    level: "A2", category: "work"
  },
  {
    word: "Koch", article: "der", plural: "Köche", partOfSpeech: "Nomen",
    meaningDe: "Person, die beruflich kocht", meaningEn: "Cook / Chef",
    example: "Der Koch bereitet das Abendessen vor.", exampleEn: "The chef prepares dinner.",
    level: "A2", category: "work"
  },
  {
    word: "Kellner", article: "der", plural: "Kellner", partOfSpeech: "Nomen",
    meaningDe: "Person, die im Restaurant bedient", meaningEn: "Waiter",
    example: "Der Kellner bringt die Speisekarte.", exampleEn: "The waiter brings the menu.",
    level: "A2", category: "work"
  },
  {
    word: "Polizist", article: "der", plural: "Polizisten", partOfSpeech: "Nomen",
    meaningDe: "Beamter der Polizei", meaningEn: "Police officer",
    example: "Der Polizist regelt den Verkehr.", exampleEn: "The police officer directs traffic.",
    level: "A2", category: "work"
  },
  {
    word: "Feuerwehrmann", article: "der", plural: "Feuerwehrmänner", partOfSpeech: "Nomen",
    meaningDe: "Person, die Brände löscht", meaningEn: "Firefighter",
    example: "Der Feuerwehrmann rettet die Katze.", exampleEn: "The firefighter rescues the cat.",
    level: "A2", category: "work"
  },
  {
    word: "Krankenschwester", article: "die", plural: "Krankenschwestern", partOfSpeech: "Nomen",
    meaningDe: "Pflegerin im Krankenhaus", meaningEn: "Nurse",
    example: "Die Krankenschwester hilft dem Patienten.", exampleEn: "The nurse helps the patient.",
    level: "A2", category: "work"
  },
  {
    word: "Rechtsanwalt", article: "der", plural: "Rechtsanwälte", partOfSpeech: "Nomen",
    meaningDe: "Person, die rechtlich berät", meaningEn: "Lawyer",
    example: "Ich brauche einen Rechtsanwalt.", exampleEn: "I need a lawyer.",
    level: "A2", category: "work"
  },
  {
    word: "Architekt", article: "der", plural: "Architekten", partOfSpeech: "Nomen",
    meaningDe: "Person, die Gebäude plant", meaningEn: "Architect",
    example: "Der Architekt hat das Museum entworfen.", exampleEn: "The architect designed the museum.",
    level: "A2", category: "work"
  },
  {
    word: "Programmierer", article: "der", plural: "Programmierer", partOfSpeech: "Nomen",
    meaningDe: "Person, die Software schreibt", meaningEn: "Programmer",
    example: "Der Programmierer arbeitet an einer App.", exampleEn: "The programmer works on an app.",
    level: "A2", category: "work"
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — NATUR (nature)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Berg", article: "der", plural: "Berge", partOfSpeech: "Nomen",
    meaningDe: "Große natürliche Erhebung der Erdoberfläche", meaningEn: "Mountain",
    example: "Die Zugspitze ist der höchste Berg Deutschlands.", exampleEn: "The Zugspitze is the highest mountain in Germany.",
    level: "A2", category: "nature"
  },
  {
    word: "Meer", article: "das", plural: "Meere", partOfSpeech: "Nomen",
    meaningDe: "Große Wasserfläche mit Salzwasser", meaningEn: "Sea / Ocean",
    example: "Im Sommer fahren wir ans Meer.", exampleEn: "In summer we go to the sea.",
    level: "A2", category: "nature"
  },
  {
    word: "See", article: "der", plural: "Seen", partOfSpeech: "Nomen",
    meaningDe: "Stehendes Gewässer im Landesinneren", meaningEn: "Lake",
    example: "Der Bodensee ist sehr groß.", exampleEn: "Lake Constance is very big.",
    level: "A2", category: "nature"
  },
  {
    word: "Fluss", article: "der", plural: "Flüsse", partOfSpeech: "Nomen",
    meaningDe: "Fließendes Gewässer", meaningEn: "River",
    example: "Der Rhein ist ein langer Fluss.", exampleEn: "The Rhine is a long river.",
    level: "A2", category: "nature"
  },
  {
    word: "Wald", article: "der", plural: "Wälder", partOfSpeech: "Nomen",
    meaningDe: "Großes Gebiet mit vielen Bäumen", meaningEn: "Forest",
    example: "Wir wandern durch den Wald.", exampleEn: "We hike through the forest.",
    level: "A2", category: "nature"
  },
  {
    word: "Wiese", article: "die", plural: "Wiesen", partOfSpeech: "Nomen",
    meaningDe: "Grüne Grasfläche", meaningEn: "Meadow",
    example: "Die Kinder spielen auf der Wiese.", exampleEn: "The children play on the meadow.",
    level: "A2", category: "nature"
  },
  {
    word: "Strand", article: "der", plural: "Strände", partOfSpeech: "Nomen",
    meaningDe: "Sandiger Bereich am Wasser", meaningEn: "Beach",
    example: "Wir liegen am Strand.", exampleEn: "We lie on the beach.",
    level: "A2", category: "nature"
  },
  {
    word: "Insel", article: "die", plural: "Inseln", partOfSpeech: "Nomen",
    meaningDe: "Land, das von Wasser umgeben ist", meaningEn: "Island",
    example: "Sylt ist eine beliebte Insel.", exampleEn: "Sylt is a popular island.",
    level: "A2", category: "nature"
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — WOHNUNG & HAUS (home)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Waschmaschine", article: "die", plural: "Waschmaschinen", partOfSpeech: "Nomen",
    meaningDe: "Gerät zum Waschen von Kleidung", meaningEn: "Washing machine",
    example: "Die Waschmaschine läuft gerade.", exampleEn: "The washing machine is running right now.",
    level: "A2", category: "home"
  },
  {
    word: "Kühlschrank", article: "der", plural: "Kühlschränke", partOfSpeech: "Nomen",
    meaningDe: "Gerät zum Kühlen von Lebensmitteln", meaningEn: "Refrigerator",
    example: "Die Milch ist im Kühlschrank.", exampleEn: "The milk is in the refrigerator.",
    level: "A2", category: "home"
  },
  {
    word: "Herd", article: "der", plural: "Herde", partOfSpeech: "Nomen",
    meaningDe: "Gerät zum Kochen in der Küche", meaningEn: "Stove",
    example: "Das Wasser kocht auf dem Herd.", exampleEn: "The water is boiling on the stove.",
    level: "A2", category: "home"
  },
  {
    word: "Ofen", article: "der", plural: "Öfen", partOfSpeech: "Nomen",
    meaningDe: "Gerät zum Backen oder Heizen", meaningEn: "Oven",
    example: "Der Kuchen ist im Ofen.", exampleEn: "The cake is in the oven.",
    level: "A2", category: "home"
  },
  {
    word: "Spüle", article: "die", plural: "Spülen", partOfSpeech: "Nomen",
    meaningDe: "Becken zum Abwaschen in der Küche", meaningEn: "Kitchen sink",
    example: "Das Geschirr steht in der Spüle.", exampleEn: "The dishes are in the sink.",
    level: "A2", category: "home"
  },
  {
    word: "Regal", article: "das", plural: "Regale", partOfSpeech: "Nomen",
    meaningDe: "Möbelstück mit Brettern zum Aufbewahren", meaningEn: "Shelf / Shelving unit",
    example: "Die Bücher stehen im Regal.", exampleEn: "The books are on the shelf.",
    level: "A2", category: "home"
  },
  {
    word: "Spiegel", article: "der", plural: "Spiegel", partOfSpeech: "Nomen",
    meaningDe: "Glas, in dem man sich sehen kann", meaningEn: "Mirror",
    example: "Ich schaue in den Spiegel.", exampleEn: "I look in the mirror.",
    level: "A2", category: "home"
  },
  {
    word: "Teppich", article: "der", plural: "Teppiche", partOfSpeech: "Nomen",
    meaningDe: "Weicher Bodenbelag aus Stoff", meaningEn: "Carpet / Rug",
    example: "Der Teppich ist sehr weich.", exampleEn: "The carpet is very soft.",
    level: "A2", category: "home"
  },
  {
    word: "Vorhang", article: "der", plural: "Vorhänge", partOfSpeech: "Nomen",
    meaningDe: "Stoff vor dem Fenster", meaningEn: "Curtain",
    example: "Bitte mach die Vorhänge zu.", exampleEn: "Please close the curtains.",
    level: "A2", category: "home"
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — GEFÜHLE & EMOTIONEN (feelings)
  // ══════════════════════════════════════════════════════════════
  {
    word: "aufgeregt", partOfSpeech: "Adjektiv",
    meaningDe: "Vor Freude oder Nervosität erregt", meaningEn: "Excited",
    example: "Ich bin sehr aufgeregt vor der Reise.", exampleEn: "I am very excited about the trip.",
    level: "A2", category: "feelings"
  },
  {
    word: "nervös", partOfSpeech: "Adjektiv",
    meaningDe: "Ängstlich und unruhig", meaningEn: "Nervous",
    example: "Ich bin nervös vor der Prüfung.", exampleEn: "I am nervous before the exam.",
    level: "A2", category: "feelings"
  },
  {
    word: "überrascht", partOfSpeech: "Adjektiv",
    meaningDe: "Unerwartet betroffen", meaningEn: "Surprised",
    example: "Ich war überrascht von dem Geschenk.", exampleEn: "I was surprised by the gift.",
    level: "A2", category: "feelings"
  },
  {
    word: "enttäuscht", partOfSpeech: "Adjektiv",
    meaningDe: "Traurig, weil Erwartungen nicht erfüllt wurden", meaningEn: "Disappointed",
    example: "Er ist enttäuscht über das Ergebnis.", exampleEn: "He is disappointed about the result.",
    level: "A2", category: "feelings"
  },
  {
    word: "stolz", partOfSpeech: "Adjektiv",
    meaningDe: "Zufrieden mit eigener oder fremder Leistung", meaningEn: "Proud",
    example: "Die Eltern sind stolz auf ihre Kinder.", exampleEn: "The parents are proud of their children.",
    level: "A2", category: "feelings"
  },
  {
    word: "eifersüchtig", partOfSpeech: "Adjektiv",
    meaningDe: "Neidisch auf jemanden", meaningEn: "Jealous",
    example: "Er ist eifersüchtig auf seinen Bruder.", exampleEn: "He is jealous of his brother.",
    level: "A2", category: "feelings"
  },
  {
    word: "dankbar", partOfSpeech: "Adjektiv",
    meaningDe: "Voller Dankbarkeit", meaningEn: "Grateful / Thankful",
    example: "Ich bin dankbar für Ihre Hilfe.", exampleEn: "I am grateful for your help.",
    level: "A2", category: "feelings"
  },
  {
    word: "wütend", partOfSpeech: "Adjektiv",
    meaningDe: "Sehr ärgerlich", meaningEn: "Angry / Furious",
    example: "Er ist wütend auf seinen Chef.", exampleEn: "He is angry at his boss.",
    level: "A2", category: "feelings"
  },
  {
    word: "zufrieden", partOfSpeech: "Adjektiv",
    meaningDe: "Mit etwas einverstanden, kein Wunsch offen", meaningEn: "Satisfied / Content",
    example: "Ich bin mit meiner Arbeit zufrieden.", exampleEn: "I am satisfied with my work.",
    level: "A2", category: "feelings"
  },
  {
    word: "einsam", partOfSpeech: "Adjektiv",
    meaningDe: "Allein und traurig darüber", meaningEn: "Lonely",
    example: "Sie fühlt sich manchmal einsam.", exampleEn: "She sometimes feels lonely.",
    level: "A2", category: "feelings"
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — WICHTIGE VERBEN (verbs)
  // ══════════════════════════════════════════════════════════════
  {
    word: "erklären", partOfSpeech: "Verb", conjugation: ["erkläre", "erklärst", "erklärt", "erklären", "erklärt", "erklären"],
    meaningDe: "Etwas verständlich machen", meaningEn: "To explain",
    example: "Können Sie das bitte erklären?", exampleEn: "Can you please explain that?",
    level: "A2", category: "verbs"
  },
  {
    word: "beschreiben", partOfSpeech: "Verb", conjugation: ["beschreibe", "beschreibst", "beschreibt", "beschreiben", "beschreibt", "beschreiben"],
    meaningDe: "Etwas mit Worten darstellen", meaningEn: "To describe",
    example: "Beschreiben Sie Ihr Problem.", exampleEn: "Describe your problem.",
    level: "A2", category: "verbs"
  },
  {
    word: "vergleichen", partOfSpeech: "Verb", conjugation: ["vergleiche", "vergleichst", "vergleicht", "vergleichen", "vergleicht", "vergleichen"],
    meaningDe: "Ähnlichkeiten und Unterschiede feststellen", meaningEn: "To compare",
    example: "Vergleichen Sie die beiden Bilder.", exampleEn: "Compare the two pictures.",
    level: "A2", category: "verbs"
  },
  {
    word: "empfehlen", partOfSpeech: "Verb", conjugation: ["empfehle", "empfiehlst", "empfiehlt", "empfehlen", "empfehlt", "empfehlen"],
    meaningDe: "Einen Rat oder Vorschlag geben", meaningEn: "To recommend",
    example: "Können Sie mir ein Restaurant empfehlen?", exampleEn: "Can you recommend a restaurant to me?",
    level: "A2", category: "verbs"
  },
  {
    word: "vorschlagen", partOfSpeech: "Verb", conjugation: ["schlage vor", "schlägst vor", "schlägt vor", "schlagen vor", "schlagt vor", "schlagen vor"],
    meaningDe: "Einen Vorschlag machen", meaningEn: "To suggest / To propose",
    example: "Ich schlage vor, dass wir morgen gehen.", exampleEn: "I suggest that we go tomorrow.",
    level: "A2", category: "verbs"
  },
  {
    word: "entscheiden", partOfSpeech: "Verb", conjugation: ["entscheide", "entscheidest", "entscheidet", "entscheiden", "entscheidet", "entscheiden"],
    meaningDe: "Eine Wahl treffen", meaningEn: "To decide",
    example: "Ich kann mich nicht entscheiden.", exampleEn: "I cannot decide.",
    level: "A2", category: "verbs"
  },
  {
    word: "erinnern", partOfSpeech: "Verb", conjugation: ["erinnere", "erinnerst", "erinnert", "erinnern", "erinnert", "erinnern"],
    meaningDe: "Sich an etwas denken", meaningEn: "To remember / To remind",
    example: "Ich erinnere mich an den Urlaub.", exampleEn: "I remember the vacation.",
    level: "A2", category: "verbs"
  },
  {
    word: "vergessen", partOfSpeech: "Verb", conjugation: ["vergesse", "vergisst", "vergisst", "vergessen", "vergesst", "vergessen"],
    meaningDe: "Nicht mehr im Gedächtnis haben", meaningEn: "To forget",
    example: "Ich habe meinen Schlüssel vergessen.", exampleEn: "I forgot my key.",
    level: "A2", category: "verbs"
  },
  {
    word: "verändern", partOfSpeech: "Verb", conjugation: ["verändere", "veränderst", "verändert", "verändern", "verändert", "verändern"],
    meaningDe: "Etwas anders machen", meaningEn: "To change / To alter",
    example: "Die Stadt hat sich sehr verändert.", exampleEn: "The city has changed a lot.",
    level: "A2", category: "verbs"
  },
  {
    word: "verbessern", partOfSpeech: "Verb", conjugation: ["verbessere", "verbesserst", "verbessert", "verbessern", "verbessert", "verbessern"],
    meaningDe: "Etwas besser machen", meaningEn: "To improve",
    example: "Ich möchte mein Deutsch verbessern.", exampleEn: "I want to improve my German.",
    level: "A2", category: "verbs"
  },
  {
    word: "benutzen", partOfSpeech: "Verb", conjugation: ["benutze", "benutzt", "benutzt", "benutzen", "benutzt", "benutzen"],
    meaningDe: "Etwas gebrauchen", meaningEn: "To use",
    example: "Darf ich Ihr Telefon benutzen?", exampleEn: "May I use your phone?",
    level: "A2", category: "verbs"
  },
  {
    word: "anrufen", partOfSpeech: "Verb", conjugation: ["rufe an", "rufst an", "ruft an", "rufen an", "ruft an", "rufen an"],
    meaningDe: "Jemanden am Telefon kontaktieren", meaningEn: "To call (phone)",
    example: "Ich rufe dich morgen an.", exampleEn: "I'll call you tomorrow.",
    level: "A2", category: "verbs"
  },
  {
    word: "einladen", partOfSpeech: "Verb", conjugation: ["lade ein", "lädst ein", "lädt ein", "laden ein", "ladet ein", "laden ein"],
    meaningDe: "Jemanden bitten zu kommen", meaningEn: "To invite",
    example: "Ich lade dich zum Abendessen ein.", exampleEn: "I invite you to dinner.",
    level: "A2", category: "verbs"
  },
  {
    word: "sich treffen", partOfSpeech: "Verb", conjugation: ["treffe mich", "triffst dich", "trifft sich", "treffen uns", "trefft euch", "treffen sich"],
    meaningDe: "Sich mit jemandem verabreden", meaningEn: "To meet (up)",
    example: "Wir treffen uns um 18 Uhr.", exampleEn: "We meet at 6 PM.",
    level: "A2", category: "verbs"
  },
  {
    word: "sich freuen", partOfSpeech: "Verb", conjugation: ["freue mich", "freust dich", "freut sich", "freuen uns", "freut euch", "freuen sich"],
    meaningDe: "Glücklich oder froh sein", meaningEn: "To be happy / To look forward to",
    example: "Ich freue mich auf den Urlaub.", exampleEn: "I look forward to the vacation.",
    level: "A2", category: "verbs"
  },
  {
    word: "sich beschweren", partOfSpeech: "Verb", conjugation: ["beschwere mich", "beschwerst dich", "beschwert sich", "beschweren uns", "beschwert euch", "beschweren sich"],
    meaningDe: "Unzufriedenheit ausdrücken", meaningEn: "To complain",
    example: "Er beschwert sich über den Lärm.", exampleEn: "He complains about the noise.",
    level: "A2", category: "verbs"
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — REDEWENDUNGEN (phrases)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Ich bin der Meinung, dass...", partOfSpeech: "Phrase",
    meaningDe: "Eine Meinung höflich ausdrücken", meaningEn: "I am of the opinion that...",
    example: "Ich bin der Meinung, dass wir mehr Zeit brauchen.", exampleEn: "I am of the opinion that we need more time.",
    level: "A2", category: "phrases"
  },
  {
    word: "Es kommt darauf an", partOfSpeech: "Phrase",
    meaningDe: "Es hängt von den Umständen ab", meaningEn: "It depends",
    example: "Kommst du mit? – Es kommt darauf an.", exampleEn: "Are you coming along? – It depends.",
    level: "A2", category: "phrases"
  },
  {
    word: "Macht nichts", partOfSpeech: "Phrase",
    meaningDe: "Es ist nicht schlimm", meaningEn: "It doesn't matter / No worries",
    example: "Entschuldigung! – Macht nichts!", exampleEn: "Sorry! – No worries!",
    level: "A2", category: "phrases"
  },
  {
    word: "Ich habe keine Ahnung", partOfSpeech: "Phrase",
    meaningDe: "Ich weiß es nicht, keine Idee", meaningEn: "I have no idea",
    example: "Wo ist der Schlüssel? – Ich habe keine Ahnung.", exampleEn: "Where is the key? – I have no idea.",
    level: "A2", category: "phrases"
  },
  {
    word: "Das stimmt", partOfSpeech: "Phrase",
    meaningDe: "Das ist richtig / korrekt", meaningEn: "That's right / That's correct",
    example: "Berlin ist die Hauptstadt. – Das stimmt.", exampleEn: "Berlin is the capital. – That's right.",
    level: "A2", category: "phrases"
  },
  {
    word: "Kein Problem", partOfSpeech: "Phrase",
    meaningDe: "Es ist in Ordnung, keine Schwierigkeit", meaningEn: "No problem",
    example: "Kannst du mir helfen? – Kein Problem!", exampleEn: "Can you help me? – No problem!",
    level: "A2", category: "phrases"
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — ADJEKTIVE (adjectives)
  // ══════════════════════════════════════════════════════════════
  {
    word: "wichtig", partOfSpeech: "Adjektiv",
    meaningDe: "Von großer Bedeutung", meaningEn: "Important",
    example: "Das ist eine wichtige Frage.", exampleEn: "That is an important question.",
    level: "A2", category: "adjectives"
  },
  {
    word: "möglich", partOfSpeech: "Adjektiv",
    meaningDe: "Kann passieren oder gemacht werden", meaningEn: "Possible",
    example: "Ist das möglich?", exampleEn: "Is that possible?",
    level: "A2", category: "adjectives"
  },
  {
    word: "unmöglich", partOfSpeech: "Adjektiv",
    meaningDe: "Kann nicht passieren", meaningEn: "Impossible",
    example: "Das ist unmöglich!", exampleEn: "That is impossible!",
    level: "A2", category: "adjectives"
  },
  {
    word: "nötig", partOfSpeech: "Adjektiv",
    meaningDe: "Erforderlich, notwendig", meaningEn: "Necessary",
    example: "Es ist nötig, früh aufzustehen.", exampleEn: "It is necessary to get up early.",
    level: "A2", category: "adjectives"
  },
  {
    word: "gefährlich", partOfSpeech: "Adjektiv",
    meaningDe: "Mit Risiko verbunden", meaningEn: "Dangerous",
    example: "Schnell fahren ist gefährlich.", exampleEn: "Driving fast is dangerous.",
    level: "A2", category: "adjectives"
  },
  {
    word: "sicher", partOfSpeech: "Adjektiv",
    meaningDe: "Ohne Gefahr oder gewiss", meaningEn: "Safe / Sure",
    example: "Hier ist es sicher.", exampleEn: "It is safe here.",
    level: "A2", category: "adjectives"
  },
  {
    word: "praktisch", partOfSpeech: "Adjektiv",
    meaningDe: "Nützlich im Alltag", meaningEn: "Practical",
    example: "Dieses Werkzeug ist sehr praktisch.", exampleEn: "This tool is very practical.",
    level: "A2", category: "adjectives"
  },
  {
    word: "gemütlich", partOfSpeech: "Adjektiv",
    meaningDe: "Angenehm und behaglich", meaningEn: "Cozy / Comfortable",
    example: "Das Café ist sehr gemütlich.", exampleEn: "The cafe is very cozy.",
    level: "A2", category: "adjectives"
  },
  {
    word: "freundlich", partOfSpeech: "Adjektiv",
    meaningDe: "Nett und zuvorkommend", meaningEn: "Friendly / Kind",
    example: "Die Menschen hier sind sehr freundlich.", exampleEn: "The people here are very friendly.",
    level: "A2", category: "adjectives"
  },
  {
    word: "höflich", partOfSpeech: "Adjektiv",
    meaningDe: "Mit guten Manieren", meaningEn: "Polite",
    example: "Er ist immer höflich.", exampleEn: "He is always polite.",
    level: "A2", category: "adjectives"
  },
  {
    word: "pünktlich", partOfSpeech: "Adjektiv",
    meaningDe: "Zur vereinbarten Zeit", meaningEn: "Punctual / On time",
    example: "In Deutschland ist man pünktlich.", exampleEn: "In Germany people are punctual.",
    level: "A2", category: "adjectives"
  },
  {
    word: "fleißig", partOfSpeech: "Adjektiv",
    meaningDe: "Viel und gern arbeitend", meaningEn: "Hardworking / Diligent",
    example: "Sie ist eine fleißige Schülerin.", exampleEn: "She is a hardworking student.",
    level: "A2", category: "adjectives"
  },
  {
    word: "faul", partOfSpeech: "Adjektiv",
    meaningDe: "Ungern arbeitend", meaningEn: "Lazy",
    example: "Am Wochenende bin ich faul.", exampleEn: "On the weekend I am lazy.",
    level: "A2", category: "adjectives"
  },
  {
    word: "lustig", partOfSpeech: "Adjektiv",
    meaningDe: "Witzig, zum Lachen bringend", meaningEn: "Funny",
    example: "Der Film war sehr lustig.", exampleEn: "The movie was very funny.",
    level: "A2", category: "adjectives"
  },
  {
    word: "langweilig", partOfSpeech: "Adjektiv",
    meaningDe: "Nicht interessant, Langeweile erzeugend", meaningEn: "Boring",
    example: "Der Vortrag war langweilig.", exampleEn: "The lecture was boring.",
    level: "A2", category: "adjectives"
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — REISE & VERKEHR (travel)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Führerschein", article: "der", plural: "Führerscheine", partOfSpeech: "Nomen",
    meaningDe: "Erlaubnis zum Autofahren", meaningEn: "Driver's license",
    example: "Ich habe meinen Führerschein mit 18 gemacht.", exampleEn: "I got my driver's license at 18.",
    level: "A2", category: "travel"
  },
  {
    word: "Gepäck", article: "das", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Koffer und Taschen auf Reisen", meaningEn: "Luggage / Baggage",
    example: "Mein Gepäck ist noch nicht angekommen.", exampleEn: "My luggage hasn't arrived yet.",
    level: "A2", category: "travel"
  },
  {
    word: "Verspätung", article: "die", plural: "Verspätungen", partOfSpeech: "Nomen",
    meaningDe: "Zu spät kommen eines Verkehrsmittels", meaningEn: "Delay",
    example: "Der Zug hat zehn Minuten Verspätung.", exampleEn: "The train has a ten minute delay.",
    level: "A2", category: "travel"
  },
  {
    word: "Fahrkarte", article: "die", plural: "Fahrkarten", partOfSpeech: "Nomen",
    meaningDe: "Ticket für öffentliche Verkehrsmittel", meaningEn: "Ticket (for transport)",
    example: "Wo kann ich eine Fahrkarte kaufen?", exampleEn: "Where can I buy a ticket?",
    level: "A2", category: "travel"
  },
  {
    word: "Ausgang", article: "der", plural: "Ausgänge", partOfSpeech: "Nomen",
    meaningDe: "Tür zum Hinausgehen", meaningEn: "Exit",
    example: "Wo ist der Ausgang?", exampleEn: "Where is the exit?",
    level: "A2", category: "travel"
  },
  {
    word: "Eingang", article: "der", plural: "Eingänge", partOfSpeech: "Nomen",
    meaningDe: "Tür zum Hineingehen", meaningEn: "Entrance",
    example: "Der Eingang ist auf der anderen Seite.", exampleEn: "The entrance is on the other side.",
    level: "A2", category: "travel"
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — STADT (city)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Bibliothek", article: "die", plural: "Bibliotheken", partOfSpeech: "Nomen",
    meaningDe: "Ort, wo man Bücher ausleihen kann", meaningEn: "Library",
    example: "Ich lerne in der Bibliothek.", exampleEn: "I study in the library.",
    level: "A2", category: "city"
  },
  {
    word: "Museum", article: "das", plural: "Museen", partOfSpeech: "Nomen",
    meaningDe: "Ort, wo Kunst und Geschichte gezeigt wird", meaningEn: "Museum",
    example: "Das Museum ist sehr interessant.", exampleEn: "The museum is very interesting.",
    level: "A2", category: "city"
  },
  {
    word: "Kirche", article: "die", plural: "Kirchen", partOfSpeech: "Nomen",
    meaningDe: "Religiöses Gebäude", meaningEn: "Church",
    example: "Die Kirche ist sehr alt und schön.", exampleEn: "The church is very old and beautiful.",
    level: "A2", category: "city"
  },
  {
    word: "Brücke", article: "die", plural: "Brücken", partOfSpeech: "Nomen",
    meaningDe: "Bauwerk über einen Fluss oder eine Straße", meaningEn: "Bridge",
    example: "Die Brücke führt über den Fluss.", exampleEn: "The bridge leads over the river.",
    level: "A2", category: "city"
  },
  {
    word: "Rathaus", article: "das", plural: "Rathäuser", partOfSpeech: "Nomen",
    meaningDe: "Gebäude der Stadtverwaltung", meaningEn: "City hall / Town hall",
    example: "Das Rathaus steht am Marktplatz.", exampleEn: "The city hall is on the market square.",
    level: "A2", category: "city"
  },
  {
    word: "Markt", article: "der", plural: "Märkte", partOfSpeech: "Nomen",
    meaningDe: "Ort, wo Waren verkauft werden, oft im Freien", meaningEn: "Market",
    example: "Am Samstag gehe ich auf den Markt.", exampleEn: "On Saturday I go to the market.",
    level: "A2", category: "city"
  },
  {
    word: "Parkplatz", article: "der", plural: "Parkplätze", partOfSpeech: "Nomen",
    meaningDe: "Stelle zum Abstellen eines Autos", meaningEn: "Parking space / Parking lot",
    example: "Ich suche einen Parkplatz.", exampleEn: "I'm looking for a parking space.",
    level: "A2", category: "city"
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — SCHULE & LERNEN (school)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Prüfung", article: "die", plural: "Prüfungen", partOfSpeech: "Nomen",
    meaningDe: "Test, Examen", meaningEn: "Exam / Test",
    example: "Die Prüfung ist nächste Woche.", exampleEn: "The exam is next week.",
    level: "A2", category: "school"
  },
  {
    word: "Aufgabe", article: "die", plural: "Aufgaben", partOfSpeech: "Nomen",
    meaningDe: "Etwas, das man tun oder lösen muss", meaningEn: "Task / Exercise",
    example: "Die Aufgabe ist schwer.", exampleEn: "The task is difficult.",
    level: "A2", category: "school"
  },
  {
    word: "Kurs", article: "der", plural: "Kurse", partOfSpeech: "Nomen",
    meaningDe: "Lehrveranstaltung", meaningEn: "Course",
    example: "Ich besuche einen Deutschkurs.", exampleEn: "I attend a German course.",
    level: "A2", category: "school"
  },
  {
    word: "Universität", article: "die", plural: "Universitäten", partOfSpeech: "Nomen",
    meaningDe: "Hochschule für wissenschaftliches Studium", meaningEn: "University",
    example: "Sie studiert an der Universität.", exampleEn: "She studies at the university.",
    level: "A2", category: "school"
  },
  {
    word: "Zeugnis", article: "das", plural: "Zeugnisse", partOfSpeech: "Nomen",
    meaningDe: "Dokument mit Noten oder Beurteilungen", meaningEn: "Report card / Certificate",
    example: "Mein Zeugnis war gut.", exampleEn: "My report card was good.",
    level: "A2", category: "school"
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — FREIZEIT & HOBBYS (leisure)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Ausflug", article: "der", plural: "Ausflüge", partOfSpeech: "Nomen",
    meaningDe: "Kurze Reise oder Wanderung", meaningEn: "Excursion / Day trip",
    example: "Am Wochenende machen wir einen Ausflug.", exampleEn: "On the weekend we go on a day trip.",
    level: "A2", category: "leisure"
  },
  {
    word: "Urlaub", article: "der", plural: "Urlaube", partOfSpeech: "Nomen",
    meaningDe: "Freie Tage, Ferien", meaningEn: "Vacation / Holiday",
    example: "Im August habe ich drei Wochen Urlaub.", exampleEn: "In August I have three weeks of vacation.",
    level: "A2", category: "leisure"
  },
  {
    word: "Hobby", article: "das", plural: "Hobbys", partOfSpeech: "Nomen",
    meaningDe: "Freizeitbeschäftigung", meaningEn: "Hobby",
    example: "Mein Hobby ist Fotografieren.", exampleEn: "My hobby is photography.",
    level: "A2", category: "leisure"
  },
  {
    word: "Veranstaltung", article: "die", plural: "Veranstaltungen", partOfSpeech: "Nomen",
    meaningDe: "Organisiertes Event oder Ereignis", meaningEn: "Event",
    example: "Die Veranstaltung beginnt um 19 Uhr.", exampleEn: "The event starts at 7 PM.",
    level: "A2", category: "leisure"
  },
  {
    word: "Konzert", article: "das", plural: "Konzerte", partOfSpeech: "Nomen",
    meaningDe: "Musikalische Aufführung", meaningEn: "Concert",
    example: "Wir gehen heute Abend ins Konzert.", exampleEn: "We go to the concert tonight.",
    level: "A2", category: "leisure"
  },
  {
    word: "Theater", article: "das", plural: "Theater", partOfSpeech: "Nomen",
    meaningDe: "Ort für Aufführungen und Bühnenstücke", meaningEn: "Theater",
    example: "Das Theater zeigt ein neues Stück.", exampleEn: "The theater shows a new play.",
    level: "A2", category: "leisure"
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — EINKAUFEN & KLEIDUNG (shopping / clothes)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Angebot", article: "das", plural: "Angebote", partOfSpeech: "Nomen",
    meaningDe: "Reduzierter Preis oder Vorschlag", meaningEn: "Offer / Special deal",
    example: "Heute gibt es ein Sonderangebot.", exampleEn: "Today there is a special offer.",
    level: "A2", category: "shopping"
  },
  {
    word: "Größe", article: "die", plural: "Größen", partOfSpeech: "Nomen",
    meaningDe: "Maß oder Kleidungsgröße", meaningEn: "Size",
    example: "Welche Größe haben Sie?", exampleEn: "What size are you?",
    level: "A2", category: "shopping"
  },
  {
    word: "umtauschen", partOfSpeech: "Verb", conjugation: ["tausche um", "tauschst um", "tauscht um", "tauschen um", "tauscht um", "tauschen um"],
    meaningDe: "Eine Ware zurückgeben und etwas anderes nehmen", meaningEn: "To exchange (goods)",
    example: "Kann ich die Hose umtauschen?", exampleEn: "Can I exchange the trousers?",
    level: "A2", category: "shopping"
  },
  {
    word: "Pullover", article: "der", plural: "Pullover", partOfSpeech: "Nomen",
    meaningDe: "Warmes Kleidungsstück zum Überziehen", meaningEn: "Sweater / Pullover",
    example: "Zieh einen Pullover an, es ist kalt.", exampleEn: "Put on a sweater, it's cold.",
    level: "A2", category: "clothes"
  },
  {
    word: "Stiefel", article: "der", plural: "Stiefel", partOfSpeech: "Nomen",
    meaningDe: "Hoher Schuh bis zum Knie oder zur Wade", meaningEn: "Boot",
    example: "Im Winter trage ich Stiefel.", exampleEn: "In winter I wear boots.",
    level: "A2", category: "clothes"
  },
  {
    word: "Anzug", article: "der", plural: "Anzüge", partOfSpeech: "Nomen",
    meaningDe: "Formelle Kleidung aus Jacke und Hose", meaningEn: "Suit",
    example: "Er trägt einen dunklen Anzug.", exampleEn: "He wears a dark suit.",
    level: "A2", category: "clothes"
  },
  {
    word: "Handschuh", article: "der", plural: "Handschuhe", partOfSpeech: "Nomen",
    meaningDe: "Kleidungsstück für die Hände", meaningEn: "Glove",
    example: "Im Winter brauche ich Handschuhe.", exampleEn: "In winter I need gloves.",
    level: "A2", category: "clothes"
  },
  {
    word: "Schal", article: "der", plural: "Schals", partOfSpeech: "Nomen",
    meaningDe: "Kleidungsstück für den Hals", meaningEn: "Scarf",
    example: "Der Schal hält den Hals warm.", exampleEn: "The scarf keeps the neck warm.",
    level: "A2", category: "clothes"
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — KÖRPER & GESUNDHEIT (body)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Schulter", article: "die", plural: "Schultern", partOfSpeech: "Nomen",
    meaningDe: "Körperteil zwischen Hals und Arm", meaningEn: "Shoulder",
    example: "Meine Schulter tut weh.", exampleEn: "My shoulder hurts.",
    level: "A2", category: "body"
  },
  {
    word: "Knie", article: "das", plural: "Knie", partOfSpeech: "Nomen",
    meaningDe: "Gelenk in der Mitte des Beins", meaningEn: "Knee",
    example: "Er hat Schmerzen im Knie.", exampleEn: "He has pain in his knee.",
    level: "A2", category: "body"
  },
  {
    word: "Hals", article: "der", plural: "Hälse", partOfSpeech: "Nomen",
    meaningDe: "Verbindung zwischen Kopf und Körper", meaningEn: "Neck / Throat",
    example: "Ich habe Halsschmerzen.", exampleEn: "I have a sore throat.",
    level: "A2", category: "body"
  },
  {
    word: "Medikament", article: "das", plural: "Medikamente", partOfSpeech: "Nomen",
    meaningDe: "Mittel gegen Krankheit", meaningEn: "Medicine / Medication",
    example: "Nehmen Sie dieses Medikament dreimal täglich.", exampleEn: "Take this medicine three times daily.",
    level: "A2", category: "body"
  },
  {
    word: "Erkältung", article: "die", plural: "Erkältungen", partOfSpeech: "Nomen",
    meaningDe: "Leichte Krankheit mit Schnupfen und Husten", meaningEn: "Cold (illness)",
    example: "Ich habe eine Erkältung.", exampleEn: "I have a cold.",
    level: "A2", category: "body"
  },
  {
    word: "Schmerz", article: "der", plural: "Schmerzen", partOfSpeech: "Nomen",
    meaningDe: "Unangenehmes körperliches Gefühl", meaningEn: "Pain",
    example: "Ich habe starke Schmerzen.", exampleEn: "I have severe pain.",
    level: "A2", category: "body"
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — NATUR & WETTER (nature)
  // ══════════════════════════════════════════════════════════════
  {
    word: "Schnee", article: "der", plural: "–", partOfSpeech: "Nomen",
    meaningDe: "Weißes gefrorenes Wasser, das vom Himmel fällt", meaningEn: "Snow",
    example: "Im Dezember fällt oft Schnee.", exampleEn: "In December it often snows.",
    level: "A2", category: "nature"
  },
  {
    word: "Gewitter", article: "das", plural: "Gewitter", partOfSpeech: "Nomen",
    meaningDe: "Sturm mit Blitz und Donner", meaningEn: "Thunderstorm",
    example: "Heute Abend kommt ein Gewitter.", exampleEn: "Tonight a thunderstorm is coming.",
    level: "A2", category: "nature"
  },
  {
    word: "Wolke", article: "die", plural: "Wolken", partOfSpeech: "Nomen",
    meaningDe: "Weiße oder graue Masse am Himmel", meaningEn: "Cloud",
    example: "Die Wolken sind dunkel.", exampleEn: "The clouds are dark.",
    level: "A2", category: "nature"
  },
  {
    word: "Baum", article: "der", plural: "Bäume", partOfSpeech: "Nomen",
    meaningDe: "Große Pflanze mit Stamm und Blättern", meaningEn: "Tree",
    example: "Der Baum ist sehr alt.", exampleEn: "The tree is very old.",
    level: "A2", category: "nature"
  },
  {
    word: "Blume", article: "die", plural: "Blumen", partOfSpeech: "Nomen",
    meaningDe: "Pflanze mit bunten Blüten", meaningEn: "Flower",
    example: "Ich schenke ihr Blumen.", exampleEn: "I give her flowers.",
    level: "A2", category: "nature"
  },
  {
    word: "Tier", article: "das", plural: "Tiere", partOfSpeech: "Nomen",
    meaningDe: "Lebendes Wesen, kein Mensch und keine Pflanze", meaningEn: "Animal",
    example: "Welches Tier magst du am liebsten?", exampleEn: "Which animal do you like best?",
    level: "A2", category: "nature"
  },
  {
    word: "Hund", article: "der", plural: "Hunde", partOfSpeech: "Nomen",
    meaningDe: "Beliebtes Haustier", meaningEn: "Dog",
    example: "Der Hund spielt im Park.", exampleEn: "The dog plays in the park.",
    level: "A2", category: "nature"
  },
  {
    word: "Katze", article: "die", plural: "Katzen", partOfSpeech: "Nomen",
    meaningDe: "Kleines Haustier, das schnurrt", meaningEn: "Cat",
    example: "Die Katze schläft auf dem Sofa.", exampleEn: "The cat sleeps on the sofa.",
    level: "A2", category: "nature"
  },
];
