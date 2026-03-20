// update_speak_translations.js
// Adds English translations to speak items in A1 lessons
// Format: "German phrase :: English translation"
// Run: node update_speak_translations.js

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://ypkpsosjkfrgenfcgjtq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwa3Bzb3Nqa2ZyZ2VuZmNnanRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTI4NDMsImV4cCI6MjA4ODY2ODg0M30.CJy-QP9GPf7o1f12aAWtBKOvJM5wXqJv3VIqHKBBRC0"
);

// speak items per lesson: already translated with :: separator
const SPEAK_UPDATES = {
  1: [ // Hallo & Tschüss
    "Hallo! :: Hello!",
    "Tschüss! :: Bye!",
    "Guten Morgen! :: Good morning!",
    "Guten Tag! :: Good day!",
    "Guten Abend! :: Good evening!",
    "Gute Nacht! :: Good night!",
    "Wie geht's? :: How are you?",
    "Mir geht's gut, danke! :: I'm fine, thank you!",
    "Bis morgen! :: See you tomorrow!",
    "Auf Wiedersehen! :: Goodbye! (formal)",
  ],
  2: [ // Ich bin...
    "Ich bin Maria. :: I am Maria.",
    "Ich komme aus Deutschland. :: I come from Germany.",
    "Ich wohne in Berlin. :: I live in Berlin.",
    "Ich bin 30 Jahre alt. :: I am 30 years old.",
    "Ich bin Lehrerin. :: I am a teacher. (f)",
    "Ich bin Arzt. :: I am a doctor. (m)",
    "Wie heißt du? :: What's your name?",
    "Ich heiße Thomas. :: My name is Thomas.",
    "Woher kommst du? :: Where are you from?",
    "Wie alt bist du? :: How old are you?",
  ],
  3: [ // du, Sie & ihr
    "Sprichst du Deutsch? :: Do you speak German?",
    "Sprechen Sie Englisch? :: Do you speak English? (formal)",
    "Wie heißen Sie? :: What is your name? (formal)",
    "Ich verstehe nicht. :: I don't understand.",
    "Können Sie das wiederholen? :: Can you repeat that? (formal)",
    "Langsamer bitte! :: Slower please!",
  ],
  4: [ // Zahlen 1-100
    "Wie viel kostet das? :: How much does that cost?",
    "Das kostet fünf Euro. :: That costs five euros.",
    "Ich bin dreiundzwanzig Jahre alt. :: I am twenty-three years old.",
    "Meine Nummer ist... :: My number is...",
    "Zwanzig plus dreißig ist fünfzig. :: Twenty plus thirty is fifty.",
  ],
  5: [ // Farben & Formen
    "Das Auto ist rot. :: The car is red.",
    "Der Himmel ist blau. :: The sky is blue.",
    "Das Gras ist grün. :: The grass is green.",
    "Mein Lieblingsfarbe ist... :: My favourite colour is...",
    "Welche Farbe hat das? :: What colour is that?",
  ],
  6: [ // Familie
    "Das ist meine Mutter. :: This is my mother.",
    "Ich habe einen Bruder. :: I have one brother.",
    "Mein Vater ist 55 Jahre alt. :: My father is 55 years old.",
    "Ich habe keine Geschwister. :: I have no siblings.",
    "Meine Familie ist klein. :: My family is small.",
  ],
  7: [ // Essen & Trinken
    "Ich möchte einen Kaffee, bitte. :: I would like a coffee, please.",
    "Was empfehlen Sie? :: What do you recommend?",
    "Die Rechnung, bitte! :: The bill, please!",
    "Ich esse gerne Pizza. :: I like eating pizza.",
    "Ich trinke kein Alkohol. :: I don't drink alcohol.",
    "Stimmt so! :: Keep the change!",
  ],
  8: [ // Wochentage & Monate
    "Heute ist Montag. :: Today is Monday.",
    "Morgen ist Dienstag. :: Tomorrow is Tuesday.",
    "Am Wochenende schlafe ich lange. :: On the weekend I sleep in.",
    "Im Januar ist es kalt. :: In January it is cold.",
    "Mein Geburtstag ist im März. :: My birthday is in March.",
  ],
  9: [ // Uhrzeiten
    "Es ist acht Uhr. :: It is eight o'clock.",
    "Der Zug kommt um neun Uhr an. :: The train arrives at nine o'clock.",
    "Wann fängt der Film an? :: When does the film start?",
    "Um wie viel Uhr? :: At what time?",
    "Ich bin um sieben aufgestanden. :: I got up at seven.",
  ],
};

async function updateSpeakTranslations() {
  console.log("🔄 Fetching A1 lessons...");
  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("id, order_index, content")
    .eq("level", "A1")
    .order("order_index");

  if (error) { console.error("❌", error.message); return; }

  for (const lesson of lessons) {
    const idx = lesson.order_index;
    const newSpeak = SPEAK_UPDATES[idx];
    if (!newSpeak) { console.log(`⏭️  Lektion ${idx} — kein Update`); continue; }

    const updatedContent = { ...lesson.content, speak: newSpeak };
    const { error: updateError } = await supabase
      .from("lessons")
      .update({ content: updatedContent })
      .eq("id", lesson.id);

    if (updateError) {
      console.error(`❌ Lektion ${idx}:`, updateError.message);
    } else {
      console.log(`✅ Lektion ${idx} — ${newSpeak.length} speak items updated`);
    }
  }
  console.log("\n🎉 Done!");
}

updateSpeakTranslations();
