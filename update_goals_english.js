// update_goals_english.js
// Translates goals + science text to English for A1 lessons 1-9
// Run: node update_goals_english.js

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://ypkpsosjkfrgenfcgjtq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwa3Bzb3Nqa2ZyZ2VuZmNnanRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTI4NDMsImV4cCI6MjA4ODY2ODg0M30.CJy-QP9GPf7o1f12aAWtBKOvJM5wXqJv3VIqHKBBRC0"
);

const UPDATES = {
  1: {
    goals: [
      "Greet people at different times of day",
      "Say hello and goodbye in 6+ ways",
      "Ask how someone is and respond naturally",
    ],
    science: "Greetings are the most-used words in any language — you'll hear them every single day. Learning them first means instant real-world use from day one.",
  },
  2: {
    goals: [
      "Introduce yourself with name, origin and age",
      "Ask others where they're from and what they do",
      "Say what your job is in German",
    ],
    science: "Self-introduction phrases are emotionally charged — you'll use them in real situations. That emotional connection makes them stick much faster.",
  },
  3: {
    goals: [
      "Use 'du' (informal) and 'Sie' (formal) correctly",
      "Know when to switch between formal and informal",
      "Ask someone to speak slower or repeat themselves",
    ],
    science: "The du/Sie distinction is one of the first social signals Germans pay attention to. Getting this right from the start makes a strong impression.",
  },
  4: {
    goals: [
      "Count from 1 to 100 in German",
      "State your age and phone number",
      "Do simple maths out loud in German",
    ],
    science: "Numbers are used constantly — prices, ages, times, addresses. Research shows number vocabulary is among the most frequently used words in any language.",
  },
  5: {
    goals: [
      "Name the most common colours in German",
      "Describe objects by colour",
      "Use colour adjectives naturally in sentences",
    ],
    science: "Colour words are among the first vocabulary children learn in any language — they're highly visual and emotionally connected, making them easy to retain.",
  },
  6: {
    goals: [
      "Name family members in German",
      "Talk about your family size",
      "Say who has siblings and who doesn't",
    ],
    science: "Family vocabulary is personal and emotionally meaningful. Words tied to real people in your life are remembered far better than abstract vocabulary.",
  },
  7: {
    goals: [
      "Order food and drinks at 3 levels of politeness",
      "Express food preferences with gerne, mögen and lieben",
      "Handle a complete restaurant situation from arrival to bill",
      "Name 30+ foods and drinks in German",
    ],
    science: "Food vocabulary is high-frequency and emotionally anchored — we eat every day, so these words get automated quickly. Restaurants are one of the most common real-life situations for German learners.",
  },
  8: {
    goals: [
      "Name all 7 days of the week",
      "Name all 12 months of the year",
      "Talk about what you do on which day",
      "Say when your birthday is",
    ],
    science: "Days and months are used in almost every conversation. They're so frequent that most learners pick them up within the first week of daily exposure.",
  },
  9: {
    goals: [
      "Tell the time in German (full and half hours)",
      "Ask and answer 'what time does X start?'",
      "Describe your daily schedule in German",
    ],
    science: "Time expressions are among the top 50 most-used words in German. Once you know them, you can talk about your whole day — a huge leap in real communication.",
  },
};

async function updateGoalsEnglish() {
  console.log("🔄 Fetching A1 lessons...");
  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("id, order_index, content")
    .eq("level", "A1")
    .order("order_index");

  if (error) { console.error("❌", error.message); return; }

  for (const lesson of lessons) {
    const idx = lesson.order_index;
    const update = UPDATES[idx];
    if (!update) { console.log(`⏭️  Lesson ${idx} — no update`); continue; }

    const updatedContent = {
      ...lesson.content,
      goals: update.goals,
      science: update.science,
    };

    const { error: updateError } = await supabase
      .from("lessons")
      .update({ content: updatedContent })
      .eq("id", lesson.id);

    if (updateError) {
      console.error(`❌ Lesson ${idx}:`, updateError.message);
    } else {
      console.log(`✅ Lesson ${idx} — goals & science updated to English`);
    }
  }
  console.log("\n🎉 Done!");
}

updateGoalsEnglish();
