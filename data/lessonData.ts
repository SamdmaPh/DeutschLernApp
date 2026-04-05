export const LESSON_DATA_A1 = [
  {
    id: "a1-0-1", order_index: 1, level: "A1", sublevel: "A1.0",
    title: "Arrival at the Airport",
    title_de: "Ankunft am Flughafen",
    description: "You just landed in Berlin. You don't speak a word of German. Your mission: find a taxi and get to your hostel.",
    duration: 15, xp_reward: 50, cefrLevel: "A1",
    learning_objectives: [
      "Say 'Hello' and 'Goodbye' in German",
      "Say 'Please' and 'Thank you'",
      "Tell a taxi driver where to go",
      "Understand the 6 sounds that make German pronunciation easy"
    ],
    listening: {
      title: "At the taxi stand",
      difficulty: "A1.0",
      transcript: "Taxi driver: Guten Tag!\nYou: Guten Tag!\nTaxi driver: Wohin?\nYou: Zum Hostel, bitte.\nTaxi driver: Willkommen in Berlin!\nYou: Danke!",
      english_translation: "Taxi driver: Good day!\nYou: Good day!\nTaxi driver: Where to?\nYou: To the hostel, please.\nTaxi driver: Welcome to Berlin!\nYou: Thank you!",
      vocabulary_highlighted: [
        "Guten Tag :: Good day (formal greeting)",
        "bitte :: please",
        "Danke :: thank you",
        "Willkommen :: welcome",
        "Wohin :: where to",
        "Sprechen Sie Deutsch? :: Do you speak German?",
        "Ein bisschen :: a little bit",
        "Ich lerne :: I'm learning"
      ],
      audio_url: ""
    },
    grammar: {
      concept: "German Pronunciation: 6 Rules That Change Everything",
      rule: "Good news: German spelling is almost perfectly phonetic! Unlike English (where 'tough' and 'through' sound completely different), German follows rules. Learn these 6 sounds and you can pronounce ANY German word.",
      patterns: [
        { sound: "W = V", examples: ["Willkommen sounds like 'Villkommen'", "Wohin sounds like 'Vohin'"], english_trick: "Every German W sounds like the English V in 'very'" },
        { sound: "Z = TS", examples: ["Zum sounds like 'Tsum'", "Zehn sounds like 'Tsehn'"], english_trick: "Think of the 'zz' in 'pizza' — it's a TS sound" },
        { sound: "V = F", examples: ["Vier sounds like 'Fier'", "Von sounds like 'Fon'"], english_trick: "German V sounds like English F" },
        { sound: "CH = soft hiss", examples: ["Ich = a gentle hiss", "Bisschen = biss-hen"], english_trick: "Like a cat hissing very gently" },
        { sound: "EI = 'eye'", examples: ["Ein sounds like 'eye-n'", "Mein sounds like 'mine'"], english_trick: "Whenever you see EI, say 'eye'" },
        { sound: "IE = 'ee'", examples: ["Sie sounds like 'zee'", "Wie sounds like 'vee'"], english_trick: "Whenever you see IE, say 'ee'" }
      ],
      common_mistakes: [
        { wrong: "Saying W like English 'water'", right: "Say W like V in 'very'", explanation: "German W is ALWAYS a V sound" },
        { wrong: "Saying Z like English 'zoo'", right: "Say Z like TS in 'cats'", explanation: "German Z is ALWAYS a TS sound" }
      ],
      mnemonic: "Remember: W=V, Z=TS, V=F. Just three rules and you sound German!"
    },
    vocabulary: {
      core: [
        "Guten Tag :: Good day",
        "Hallo :: Hello",
        "Tschüss :: Bye",
        "Bitte :: Please / You're welcome",
        "Danke :: Thank you",
        "Entschuldigung :: Excuse me",
        "Ja :: Yes",
        "Nein :: No",
        "der Flughafen :: the airport",
        "das Taxi :: the taxi"
      ],
      supporting: [
        "Willkommen :: Welcome",
        "die Straße :: the street",
        "toll :: great / awesome",
        "ein bisschen :: a little bit",
        "Ich lerne :: I'm learning"
      ],
      phrases: [
        "Guten Tag! :: Good day! (the standard greeting)",
        "Zum Hostel, bitte. :: To the hostel, please.",
        "Sprechen Sie Deutsch? :: Do you speak German? (formal)",
        "Ein bisschen. :: A little bit.",
        "Danke schön! :: Thank you very much!"
      ]
    },
    exercises: [
      { type: "recognition", difficulty: 1, instruction: "Choose the correct answer.", tasks: [
        { question: "What happened in the dialogue? (Pick the best summary.)", options: ["You ordered food at a restaurant.", "You took a taxi to your hostel in Berlin.", "You checked into a hotel."], correct: 1 },
        { question: "The taxi driver says 'Guten Tag'. How should you reply?", options: ["Tschüss!", "Guten Tag!", "Nein!"], correct: 1 },
        { question: "What does 'Danke' mean?", options: ["Please", "Thank you", "Hello"], correct: 1 },
        { question: "You want to go to the hostel. What do you say to the driver?", options: ["Zum Hostel, bitte.", "Guten Tag!", "Danke schön!"], correct: 0 },
        { question: "The driver asks 'Sprechen Sie Deutsch?' — What is he asking?", options: ["Where are you going?", "Do you speak German?", "What is your name?"], correct: 1 }
      ]},
      { type: "recall", difficulty: 2, instruction: "Fill in the correct form.", tasks: [
        { question: "How do you say 'please' in German? (You heard it in the dialogue.)", options: ["Danke", "Bitte", "Hallo"], correct: 1 },
        { question: "How do you say 'thank you' in German?", options: ["Bitte", "Tschüss", "Danke"], correct: 2 },
        { question: "The taxi driver asked 'Sprechen Sie Deutsch?' — What does 'Sie' mean here?", options: ["She", "You (formal)", "They"], correct: 1 }
      ]},
      { type: "production", difficulty: 3, instruction: "Fill in the missing word. Just type the ONE word that goes in the blank.", tasks: [
        { prompt: "Say 'Good day': Guten _____", expected: "Tag" },
        { prompt: "Say 'please': _____", expected: "Bitte" },
        { prompt: "Say 'thank you': _____", expected: "Danke" }
      ]}
    ],
    culture_note: "In Germany, you greet strangers with 'Guten Tag' (Good day) — it's the safe, polite option. Among friends, 'Hallo' is fine. Taxi drivers in Berlin are often chatty and love it when tourists try German. Tipping: just round up (€12.50 → €13).",
    real_world_use: "These are the phrases you'll need in your first 5 minutes in Germany: at the airport, in the taxi, at the hotel. 'Bitte' and 'Danke' open every door.",
    goethe_alignment: { module: "Goethe A1 Speaking Part 1", skill: "Greeting people and giving basic information", task_type: "Examiner asks: Where are you from? What's your name? — You answer in simple German." },
    learning_path_context: "This is your FIRST lesson. You're learning the sounds and the most important words. Everything else builds on this."
  },
  {
    id: "a1-0-2", order_index: 2, level: "A1", sublevel: "A1.0",
    title: "Checking into the Hostel",
    title_de: "Im Hostel einchecken",
    description: "You're at the hostel reception. The receptionist only speaks German. Your mission: check in, get your key, and find the WiFi password.",
    duration: 15, xp_reward: 60, cefrLevel: "A1",
    learning_objectives: [
      "Check in at a hotel or hostel reception",
      "Use the verb HABEN (to have): ich habe, du hast, er hat",
      "Ask polite questions with 'Haben Sie...?'",
      "Understand the difference between formal 'Sie' and informal 'du'"
    ],
    listening: {
      title: "At the hostel reception",
      difficulty: "A1.0",
      transcript: "Receptionist: Guten Abend!\nYou: Guten Abend.\nReceptionist: Haben Sie eine Reservierung?\nYou: Ja.\nReceptionist: Ihr Name?\nYou: [Your name].\nReceptionist: Zimmer 204. Hier ist Ihr Schlüssel.\nYou: Danke. Haben Sie WLAN?\nReceptionist: Ja. Das Passwort ist 'Berlin2024'.\nYou: Danke schön!",
      english_translation: "Receptionist: Good evening!\nYou: Good evening.\nReceptionist: Do you have a reservation?\nYou: Yes.\nReceptionist: Your name?\nYou: [Your name].\nReceptionist: Room 204. Here is your key.\nYou: Thanks. Do you have WiFi?\nReceptionist: Yes. The password is 'Berlin2024'.\nYou: Thank you!",
      vocabulary_highlighted: [
        "Guten Abend :: Good evening",
        "Haben Sie :: Do you have (polite)",
        "die Reservierung :: reservation",
        "Ihr Name :: Your name (polite)",
        "das Zimmer :: room",
        "der Schlüssel :: key",
        "das WLAN :: WiFi",
        "das Passwort :: password",
        "Danke schön :: Thank you very much"
      ],
      audio_url: ""
    },
    grammar: {
      concept: "HABEN — The Verb 'To Have'",
      rule: "HABEN means 'to have'. You already know SEIN (to be) — now meet its partner. Together they're the two most important German verbs. 'Haben Sie...?' is the polite way to ask a stranger if they have something.",
      patterns: [
        { person: "ich", conjugation: "habe", example: "Ich habe eine Reservierung. (I have a reservation.)" },
        { person: "du", conjugation: "hast", example: "Hast du WLAN? (Do you have WiFi? — informal)" },
        { person: "er/sie/es", conjugation: "hat", example: "Das Hostel hat Frühstück. (The hostel has breakfast.)" },
        { person: "Sie (formal)", conjugation: "haben", example: "Haben Sie einen Schlüssel? (Do you have a key?)" }
      ],
      common_mistakes: [
        { wrong: "Ich hat eine Reservierung.", right: "Ich HABE eine Reservierung.", explanation: "With 'ich' always use 'habe', not 'hat'" },
        { wrong: "Hast Sie WLAN?", right: "HABEN Sie WLAN?", explanation: "With formal 'Sie' always use 'haben', not 'hast'" },
        { wrong: "Haben du?", right: "HAST du?", explanation: "With informal 'du' use 'hast', not 'haben'" }
      ],
      mnemonic: "ich habE, du haST, er haT — the endings are E-ST-T. Remember: EST like a TEST!"
    },
    vocabulary: {
      core: [
        "haben :: to have",
        "die Reservierung :: reservation",
        "das Zimmer :: room",
        "die Nacht :: night",
        "der Schlüssel :: key",
        "das WLAN :: WiFi",
        "das Passwort :: password",
        "das Frühstück :: breakfast"
      ],
      supporting: [
        "Guten Abend :: Good evening",
        "der Empfang :: reception",
        "hier :: here",
        "Ihr :: your (formal)",
        "kosten :: to cost"
      ],
      phrases: [
        "Haben Sie eine Reservierung? :: Do you have a reservation?",
        "Hier ist Ihr Schlüssel. :: Here is your key.",
        "Haben Sie WLAN? :: Do you have WiFi?",
        "Was kostet das? :: How much does it cost?",
        "Danke schön! :: Thank you very much!"
      ]
    },
    exercises: [
      { type: "recognition", difficulty: 1, instruction: "Choose the correct answer.", tasks: [
        { question: "The receptionist says 'Haben Sie eine Reservierung?' — What is he asking?", options: ["What is your name?", "Do you have a reservation?", "Do you want breakfast?"], correct: 1 },
        { question: "You want to ask for WiFi. Which phrase do you use?", options: ["Was kostet das?", "Haben Sie WLAN?", "Guten Abend!"], correct: 1 },
        { question: "The receptionist gives you something and says 'Hier ist Ihr Schlüssel.' What did he give you?", options: ["The WiFi password", "Your key", "The breakfast menu"], correct: 1 },
        { question: "What does 'Guten Abend' mean?", options: ["Good morning", "Good evening", "Goodbye"], correct: 1 }
      ]},
      { type: "recall", difficulty: 2, instruction: "Fill in the correct form of HABEN.", tasks: [
        { question: "Ich _____ eine Reservierung. (I have...)", options: ["hat", "habe", "haben"], correct: 1 },
        { question: "_____ Sie WLAN? (Do you have... formal)", options: ["Hast", "Hat", "Haben"], correct: 2 },
        { question: "Das Hostel _____ Frühstück. (The hostel has...)", options: ["habe", "hast", "hat"], correct: 2 }
      ]},
      { type: "production", difficulty: 3, instruction: "Fill in the missing word. (You only need to type the missing word, not the full sentence.)", tasks: [
        { prompt: "Ask for WiFi politely: '_____ Sie WLAN?' (Hint: the verb 'to have' for formal 'Sie')", expected: "Haben" },
        { prompt: "Say you have a reservation: 'Ich _____ eine Reservierung.' (Hint: 'to have' for 'ich')", expected: "habe" },
        { prompt: "Say 'Thank you very much': 'Danke _____!'", expected: "schön" }
      ]}
    ],
    culture_note: "In Germany, you always use 'Sie' (formal 'you') with strangers, hotel staff, and anyone you don't know well. The informal 'du' is for friends and family. Using 'du' with a stranger can be rude — wait until they offer it!",
    real_world_use: "'Haben Sie...?' is the most useful question in German. You'll use it everywhere: 'Haben Sie WLAN?' (WiFi?), 'Haben Sie ein Zimmer?' (A room?), 'Haben Sie eine Speisekarte?' (A menu?). Master this one phrase and you can ask for anything.",
    goethe_alignment: { module: "Goethe A1 Speaking Part 2", skill: "Asking for information politely", task_type: "Picture card 'Hotel' — asking and answering questions about a hotel stay" },
    learning_path_context: "You now know two verbs: SEIN (to be) and HABEN (to have). With just these two, you can already say who you are and what you have. Next up: ordering at a café!"
  },
  {
    id: "a1-1-1", order_index: 3, level: "A1", sublevel: "A1.1",
    title: "Your First Café",
    description: "You walk into a Berlin café. The waitress is waiting for your order.",
    duration: 15, xp_reward: 70, cefrLevel: "A1",
    learning_objectives: ["Order food and drinks at a café", "Use the verb SEIN (to be)", "Understand numbers 1-20", "Pay the bill and tip"],
    listening: { title: "At the café", difficulty: "A1.1", transcript: "Waitress: Hallo! Was möchten Sie?\nYou: Ich möchte einen Kaffee, bitte.\nWaitress: Groß oder klein?\nYou: Klein. Und ein Stück Apfelkuchen.\nWaitress: Gerne! Kaffee 3,50 und Kuchen 4 Euro. Zusammen 7,50.\nYou: Hier, 8 Euro.\nWaitress: 50 Cent zurück.\nYou: Stimmt so!\nWaitress: Danke! Guten Appetit!", english_translation: "Waitress: Hi! What would you like?\nYou: I'd like a coffee, please.\nWaitress: Large or small?\nYou: Small. And a piece of apple cake.\nWaitress: Gladly! Coffee 3.50 and cake 4. Together 7.50.\nYou: Here, 8 euros.\nWaitress: 50 cents back.\nYou: Keep the change!\nWaitress: Thanks! Enjoy!", vocabulary_highlighted: ["Was möchten Sie? :: What would you like?", "Ich möchte :: I would like", "der Kaffee :: coffee", "der Kuchen :: cake", "groß :: large", "klein :: small", "zusammen :: together", "Stimmt so! :: Keep the change!", "Guten Appetit! :: Enjoy!"], audio_url: "" },
    grammar: { concept: "SEIN — Who Are You?", rule: "SEIN means 'to be'. It's the most common German verb. Think of it as your identity verb — it tells the world who and what you are. The forms are: ich bin (I am), du bist (you are), er/sie/es ist (he/she/it is), wir sind (we are), Sie sind (you are, formal). Notice: 'wir' and formal 'Sie' use the same form — 'sind'.", patterns: [{ person: "ich", conjugation: "bin", example: "Ich bin Tourist. (I am a tourist.)" }, { person: "du", conjugation: "bist", example: "Bist du aus Berlin? (Are you from Berlin?)" }, { person: "er/sie/es", conjugation: "ist", example: "Der Kaffee ist gut. (The coffee is good.)" }, { person: "wir", conjugation: "sind", example: "Wir sind im Café. (We are in the café.)" }, { person: "Sie", conjugation: "sind", example: "Sind Sie neu hier? (Are you new here? — formal)" }], common_mistakes: [{ wrong: "Ich ist", right: "Ich BIN", explanation: "Always use 'bin' with 'ich' — never 'ist'" }, { wrong: "Der Kaffee bin gut", right: "Der Kaffee IST gut", explanation: "Use 'ist' for he/she/it and all singular nouns" }], mnemonic: "BIN-BIST-IST — easy as 1-2-3! I BIN, you BIST, he IST." },
    vocabulary: { core: ["der Kaffee :: coffee", "der Kuchen :: cake", "die Milch :: milk", "der Zucker :: sugar", "die Rechnung :: the bill", "groß :: large", "klein :: small", "zahlen :: to pay", "ein Stück :: a piece", "zusammen :: together"], supporting: ["der Apfelkuchen :: apple cake", "gerne :: gladly", "zurück :: back/change", "der Appetit :: appetite", "die Kellnerin :: waitress"], phrases: ["Ich möchte einen Kaffee. :: I'd like a coffee.", "Was kostet das? :: How much?", "Die Rechnung, bitte. :: The bill, please.", "Stimmt so! :: Keep the change!", "Guten Appetit! :: Enjoy!"] },
    exercises: [
      { type: "recognition", difficulty: 1, instruction: "Choose the correct answer.", tasks: [
        { question: "The waitress asks 'Was möchten Sie?' — What does she want to know?", options: ["Where you're from", "What you'd like to order", "If you have a reservation"], correct: 1 },
        { question: "Coffee costs 3,50€ and cake costs 4€. How much together?", options: ["6,50€", "7,50€", "8,00€"], correct: 1 },
        { question: "You said 'Stimmt so!' to the waitress. What did you just tell her?", options: ["The food was great", "Keep the change", "I'd like the menu"], correct: 1 },
        { question: "The waitress asks 'Groß oder klein?' — What is she asking about your coffee?", options: ["Hot or cold", "Large or small", "With or without milk"], correct: 1 }
      ]},
      { type: "recall", difficulty: 2, instruction: "Fill in the correct form of SEIN (to be).", tasks: [
        { question: "Ich _____ Tourist. (I am a tourist.)", options: ["ist", "bin", "bist"], correct: 1 },
        { question: "Der Kaffee _____ gut. (The coffee is good.)", options: ["bin", "bist", "ist"], correct: 2 },
        { question: "Wir _____ im Café. (We are in the café.)", options: ["bin", "ist", "sind"], correct: 2 }
      ]},
      { type: "production", difficulty: 3, instruction: "Fill in the missing word. (You only need to type the missing word, not the full sentence.)", tasks: [
        { prompt: "Complete: 'Ich _____ einen Kaffee, bitte.' (Hint: the word for 'would like')", expected: "möchte" },
        { prompt: "Complete: 'Die _____, bitte.' (Hint: the word for 'bill')", expected: "Rechnung" },
        { prompt: "Complete: 'Guten _____!' (Hint: the word for 'appetite' — said before eating)", expected: "Appetit" }
      ]}
    ],
    culture_note: "'Stimmt so!' means 'keep the change' — that's how Germans tip. 5-10%, not 20% like the US. Germans enjoy quiet café time.",
    real_world_use: "'Ich möchte...' (I would like) and 'Die Rechnung, bitte' (The bill, please) — your two most important café phrases.",
    goethe_alignment: { module: "Goethe A1 Speaking Part 2", skill: "Ordering at a café", task_type: "Picture card: Café — asking for items and paying" },
    learning_path_context: "You can now order, pay, and tip at a café. Next up: meeting people at the hostel and having your first real conversation!"
  },
  {
    id: "a1-1-2", order_index: 4, level: "A1", sublevel: "A1.1",
    title: "Meeting New People",
    description: "You meet other travelers at the hostel. They want to know all about you.",
    duration: 15, xp_reward: 70, cefrLevel: "A1",
    learning_objectives: ["Introduce yourself in German", "Ask W-questions (who, what, where)", "Talk about hobbies and interests", "Have a simple conversation"],
    listening: { title: "In the common room", difficulty: "A1.1", transcript: "Tom: Hey! Bist du neu hier?\nYou: Ja, heute angekommen.\nTom: Cool! Ich bin Tom. Woher kommst du?\nYou: Ich komme aus England. Und du?\nTom: Aus München. Was machst du in Berlin?\nYou: Ich bin Tourist. Ich lerne Deutsch.\nTom: Wie alt bist du?\nYou: 28. Und du?\nTom: 24. Ich bin Student.", english_translation: "Tom: Hey! Are you new here?\nYou: Yes, arrived today.\nTom: Cool! I'm Tom. Where are you from?\nYou: I'm from England. And you?\nTom: From Munich. What are you doing in Berlin?\nYou: I'm a tourist. I'm learning German.\nTom: How old are you?\nYou: 28. And you?\nTom: 24. I'm a student.", vocabulary_highlighted: ["Woher kommst du? :: Where are you from?", "Ich komme aus :: I come from", "Was machst du? :: What do you do?", "Wie alt bist du? :: How old are you?", "der Student :: student", "arbeiten :: to work"], audio_url: "" },
    grammar: { concept: "W-Questions — The Key to Every Conversation", rule: "German question words all start with W — just like English! The key rule: in W-questions, the VERB always comes second. So it's: W-word + VERB + subject. For example: 'Woher KOMMST du?' (Where do you come from?), not 'Woher du kommst?'. This word order is different from English, where we use 'do' — Germans just flip the verb and subject.", patterns: [{ sound: "Wie?", examples: ["Wie heißt du? (What's your name?)", "Wie alt bist du? (How old are you?)"], english_trick: "How? / What? (for names)" }, { sound: "Wo?", examples: ["Wo wohnst du? (Where do you live?)", "Wo ist das Café? (Where is the café?)"], english_trick: "Where? (location)" }, { sound: "Woher?", examples: ["Woher kommst du? (Where are you from?)"], english_trick: "Where from? (origin)" }, { sound: "Was?", examples: ["Was machst du? (What do you do?)", "Was kostet das? (What does it cost?)"], english_trick: "What?" }, { sound: "Warum?", examples: ["Warum lernst du Deutsch? (Why are you learning German?)"], english_trick: "Why?" }], common_mistakes: [{ wrong: "Woher du kommst?", right: "Woher KOMMST du?", explanation: "In W-questions, the verb MUST be in position 2 — flip the verb and subject!" }], mnemonic: "All question words start with W: Wie, Wo, Woher, Was, Warum, Wann, Wer — the W-Team! And the verb is always their sidekick in position 2." },
    vocabulary: { core: ["Wie heißt du? :: What's your name?", "Woher kommst du? :: Where are you from?", "Ich komme aus :: I come from", "Was machst du? :: What do you do?", "Wie alt bist du? :: How old are you?", "der Beruf :: profession", "der Student :: student", "die Studentin :: student (f)", "arbeiten :: to work", "wohnen :: to live"], supporting: ["heute :: today", "morgen :: tomorrow", "die Woche :: week", "bleiben :: to stay", "kennenlernen :: to meet"], phrases: ["Ich bin aus England. :: I'm from England.", "Ich lerne Deutsch. :: I'm learning German.", "Schön, dich kennenzulernen! :: Nice to meet you!", "Wie lange bleibst du? :: How long?", "Wollen wir...? :: Shall we...?"] },
    exercises: [
      { type: "recognition", difficulty: 1, instruction: "Choose the correct answer.", tasks: [
        { question: "You want to know where someone is from. Which question do you ask?", options: ["Was machst du?", "Woher kommst du?", "Wie alt bist du?"], correct: 1 },
        { question: "Someone asks 'Wie alt bist du?' and you're 28. What do you answer?", options: ["Ich bin Student.", "Ich bin 28.", "Ich komme aus Berlin."], correct: 1 },
        { question: "Tom says 'Ich bin Student.' What does this tell you about Tom?", options: ["He's a tourist", "He's a student", "He's from England"], correct: 1 },
        { question: "In the dialogue, what does Tom ask with 'Was machst du in Berlin?'", options: ["How old are you?", "What are you doing in Berlin?", "Where do you live?"], correct: 1 }
      ]},
      { type: "recall", difficulty: 2, instruction: "Which W-word fits?", tasks: [
        { question: "_____ kommst du? — Aus England. (Which W-word asks 'where from'?)", options: ["Was", "Woher", "Wie"], correct: 1 },
        { question: "_____ alt bist du? — 28. (Which W-word asks 'how'?)", options: ["Was", "Wo", "Wie"], correct: 2 },
        { question: "_____ machst du? — Ich bin Tourist. (Which W-word asks 'what'?)", options: ["Wo", "Was", "Wer"], correct: 1 }
      ]},
      { type: "production", difficulty: 3, instruction: "Fill in the missing word. (You only need to type the missing word, not the full sentence.)", tasks: [
        { prompt: "Complete: '_____ kommst du?' (Hint: the W-word meaning 'where from')", expected: "Woher" },
        { prompt: "Complete: 'Ich komme _____ England.' (Hint: the word for 'from')", expected: "aus" },
        { prompt: "Complete: '_____ alt bist du?' (Hint: the W-word meaning 'how')", expected: "Wie" }
      ]}
    ],
    culture_note: "Germans love asking 'Was machst du beruflich?' (What do you do for work?). Your job defines your identity. Among young people it's more relaxed.",
    real_world_use: "W-questions are the foundation of EVERY conversation you'll have in German.",
    goethe_alignment: { module: "Goethe A1 Speaking Part 1", skill: "Introducing yourself", task_type: "Answering personal questions about name, age, origin, and occupation" },
    learning_path_context: "You can now introduce yourself and have a basic conversation! Next stop: Hamburg — time to learn numbers at the fish market."
  },
  {
    id: "a1-1-3", order_index: 5, level: "A1", sublevel: "A1.1",
    title: "At the Fish Market",
    description: "Sunday morning at Hamburg's famous fish market. Loud, crowded, exciting.",
    duration: 15, xp_reward: 60, cefrLevel: "A1",
    learning_objectives: ["Count from 1 to 100 in German", "Ask for prices", "Name common foods", "Specify quantities (kilo, piece)"],
    listening: { title: "Hamburg fish market", difficulty: "A1.1", transcript: "Vendor: Frischer Fisch! Guten Morgen!\nYou: Was kostet der Lachs?\nVendor: 12 Euro das Kilo.\nYou: Ein halbes Kilo, bitte.\nVendor: 6 Euro. Sonst noch etwas?\nYou: Drei Äpfel bitte.\nVendor: 50 Cent das Stück. 1,50. Und ein Brot? 2,80.\nYou: Ja! Zusammen?\nVendor: 10 Euro 30.", english_translation: "Vendor: Fresh fish! Good morning!\nYou: How much is the salmon?\nVendor: 12 euros per kilo.\nYou: Half a kilo, please.\nVendor: 6 euros. Anything else?\nYou: Three apples please.\nVendor: 50 cents each. 1.50. And a bread? 2.80.\nYou: Yes! Together?\nVendor: 10.30.", vocabulary_highlighted: ["der Lachs :: salmon", "das Kilo :: kilo", "frisch :: fresh", "Sonst noch etwas? :: Anything else?", "das Stück :: piece/each", "das Brot :: bread", "der Apfel :: apple", "zusammen :: together"], audio_url: "" },
    grammar: { concept: "Numbers 1-100", rule: "Numbers 1-12 are unique words you just memorize. From 13-19, combine the ones digit + 'zehn' (like English '-teen'): dreizehn (13), vierzehn (14). The tens are: zwanzig (20), dreißig (30), etc. Here's the tricky part: from 21 onwards, German REVERSES the order! 21 is 'einUNDzwanzig' — literally 'one-and-twenty'. Think of it like old English 'four-and-twenty blackbirds'.", patterns: [{ sound: "1-12", examples: ["eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf"] }, { sound: "13-19", examples: ["dreizehn (13), vierzehn (14), fünfzehn (15), sechzehn (16), siebzehn (17), achtzehn (18), neunzehn (19)"] }, { sound: "20-100", examples: ["zwanzig (20), dreißig (30), vierzig (40), fünfzig (50), sechzig (60), siebzig (70), achtzig (80), neunzig (90), hundert (100)"] }, { sound: "Reversed!", examples: ["21 = einundzwanzig (one-and-twenty)", "35 = fünfunddreißig (five-and-thirty)", "99 = neunundneunzig (nine-and-ninety)"] }], common_mistakes: [{ wrong: "zwanzigeins (21)", right: "EINundZWANZIG", explanation: "In German, the ones digit comes BEFORE the tens — always!" }], mnemonic: "Think of the nursery rhyme 'four-and-twenty blackbirds' — German numbers work the same way! Small number first, then 'und', then the big number." },
    vocabulary: { core: ["der Fisch :: fish", "der Lachs :: salmon", "das Obst :: fruit", "der Apfel :: apple", "das Brot :: bread", "das Kilo :: kilo", "das Stück :: piece", "frisch :: fresh", "teuer :: expensive", "günstig :: cheap"], supporting: ["der Verkäufer :: vendor", "der Morgen :: morning", "halb :: half", "sonst :: else", "gefangen :: caught"], phrases: ["Was kostet...? :: How much is...?", "Ich nehme... :: I'll take...", "Sonst noch etwas? :: Anything else?", "Zusammen macht das... :: Together that's...", "Guten Morgen! :: Good morning!"] },
    exercises: [
      { type: "recognition", difficulty: 1, instruction: "Choose the correct answer.", tasks: [
        { question: "How do you say '21' in German? (Remember: the order is reversed!)", options: ["zwanzigeins", "einundzwanzig", "zweiundein"], correct: 1 },
        { question: "Salmon costs 12€ per kilo. You buy half a kilo. How much do you pay?", options: ["6€", "12€", "24€"], correct: 0 },
        { question: "The vendor says 'Sonst noch etwas?' — What is he asking?", options: ["How much do you want?", "Anything else?", "Do you want fish?"], correct: 1 },
        { question: "Three apples cost 50 cents each. What is the total?", options: ["50 cents", "1 Euro", "1 Euro 50"], correct: 2 }
      ]},
      { type: "recall", difficulty: 2, instruction: "Choose the correct German number or price.", tasks: [
        { question: "How do you say '7,50€' in German?", options: ["sieben fünfzig", "sieben Euro fünfzig", "fünfzig sieben"], correct: 1 },
        { question: "How do you say '35' in German? (Remember: ones before tens!)", options: ["dreißigfünf", "fünfunddreißig", "dreiundffünfzig"], correct: 1 },
        { question: "How do you say '12' in German?", options: ["zweizehn", "zwölf", "einzwei"], correct: 1 }
      ]},
      { type: "production", difficulty: 3, instruction: "Fill in the missing word. (You only need to type the missing word, not the full sentence.)", tasks: [
        { prompt: "Complete: 'Ein halbes _____, bitte.' (Hint: the word for 'kilo')", expected: "Kilo" },
        { prompt: "Complete: 'Was _____ das Brot?' (Hint: the verb meaning 'costs')", expected: "kostet" },
        { prompt: "Complete: 'Drei _____ bitte.' (Hint: the word for 'apples')", expected: "Äpfel" }
      ]}
    ],
    culture_note: "Hamburg's fish market has existed since 1703. Every Sunday from 5 AM. By 9:30 everything must go — prices get crazy cheap!",
    real_world_use: "Numbers and 'Was kostet...?' — you'll need these everywhere, every day.",
    goethe_alignment: { module: "Goethe A1 Speaking Part 2", skill: "Shopping and asking for prices", task_type: "Picture card: Market — buying items and understanding prices" },
    learning_path_context: "With numbers and prices you can handle daily shopping anywhere in Germany. Next: finding a flat in Hamburg!"
  },
  {
    id: "a1-2-1", order_index: 6, level: "A1", sublevel: "A1.2",
    title: "Flat Hunting in Hamburg",
    description: "You call about a shared flat ad. Time to find a room in Hamburg.",
    duration: 18, xp_reward: 70, cefrLevel: "A1",
    learning_objectives: ["Make a phone call in German", "Use possessive pronouns (mein/dein/sein)", "Know apartment vocabulary", "Ask questions about a flat"],
    listening: { title: "Calling about the flat", difficulty: "A1.2", transcript: "Du: Hallo, ich rufe wegen der WG-Anzeige an. Ist das Zimmer noch frei?\nAnna: Ja! Ich bin Anna.\nYou: Wie groß ist das Zimmer?\nAnna: 14 Quadratmeter. Die Küche teilen wir.\nYou: Was kostet es?\nAnna: 350 Euro warm.\nYou: Kann ich es sehen?\nAnna: Morgen um 15 Uhr? Schanzenstraße 42.\nYou: Perfekt!", english_translation: "You: Hello, I'm calling about the flat share ad. Is the room available?\nAnna: Yes! I'm Anna.\nYou: How big is the room?\nAnna: 14 square meters. We share the kitchen.\nYou: How much?\nAnna: 350 euros including utilities.\nYou: Can I see it?\nAnna: Tomorrow at 3 PM? Schanzenstraße 42.\nYou: Perfect!", vocabulary_highlighted: ["die WG :: shared flat", "frei :: available", "die Küche :: kitchen", "das Bad :: bathroom", "der Mitbewohner :: flatmate", "warm :: incl. utilities", "teilen :: to share", "die Miete :: rent"], audio_url: "" },
    grammar: { concept: "Possessive Pronouns — Mein, dein, sein", rule: "Possessives in German work like English 'my/your/his' but they change based on the noun's gender. For masculine (der) and neuter (das) nouns: mein, dein, sein stay as-is. For feminine (die) nouns and ALL plurals: add an -E at the end. So: 'mein Zimmer' (my room — neuter) but 'meinE Küche' (my kitchen — feminine). Think of the -E as a marker saying 'this noun is feminine or plural'.", patterns: [{ person: "ich", conjugation: "mein/meine", example: "Das ist mein Zimmer. (That is my room.)" }, { person: "du", conjugation: "dein/deine", example: "Dein Schlüssel? (Your key?)" }, { person: "er", conjugation: "sein/seine", example: "Sein Zimmer ist groß. (His room is big.)" }, { person: "sie", conjugation: "ihr/ihre", example: "Ihre Küche ist schön. (Her kitchen is nice.)" }], common_mistakes: [{ wrong: "Mein Küche", right: "MeinE Küche", explanation: "Küche is feminine (die Küche), so you MUST add -E: meinE Küche" }], mnemonic: "If the noun uses DIE (feminine or plural), add -E to the possessive: meinE Mutter, meinE Küche, meinE Eltern." },
    vocabulary: { core: ["die WG :: shared flat", "das Zimmer :: room", "die Küche :: kitchen", "das Bad :: bathroom", "der Mitbewohner :: flatmate", "die Miete :: rent", "frei :: available", "teilen :: to share", "groß :: big", "der Quadratmeter :: sqm"], supporting: ["die Anzeige :: ad", "anrufen :: to call", "das Fenster :: window", "der Garten :: garden", "warm :: incl. utilities"], phrases: ["Ist das Zimmer frei? :: Is the room available?", "Was kostet es? :: How much?", "Kann ich es sehen? :: Can I see it?", "Wir teilen die Küche. :: We share the kitchen.", "Bis morgen! :: See you tomorrow!"] },
    exercises: [
      { type: "recognition", difficulty: 1, instruction: "Choose the correct answer.", tasks: [
        { question: "You want to know if the room is still available. What do you ask?", options: ["Was kostet das?", "Ist das Zimmer noch frei?", "Wo ist die Küche?"], correct: 1 },
        { question: "'350 Euro warm' means the rent is 350€...", options: ["without heating", "including heating and utilities", "deposit only"], correct: 1 },
        { question: "Anna says 'Die Küche teilen wir.' What does she mean?", options: ["The kitchen is private", "We share the kitchen", "The kitchen is broken"], correct: 1 },
        { question: "How big is the room Anna is offering?", options: ["14 square meters", "42 square meters", "350 square meters"], correct: 0 }
      ]},
      { type: "recall", difficulty: 2, instruction: "Choose the correct possessive pronoun.", tasks: [
        { question: "Das ist _____ Zimmer. (MY room — 'das Zimmer' is neuter)", options: ["mein", "dein", "sein"], correct: 0 },
        { question: "Ist das _____ Schlüssel? (YOUR key — informal)", options: ["mein", "dein", "sein"], correct: 1 },
        { question: "_____ Küche ist schön. (HIS kitchen — 'die Küche' is feminine!)", options: ["Sein", "Seine", "Seiner"], correct: 1 }
      ]},
      { type: "production", difficulty: 3, instruction: "Fill in the missing word. (You only need to type the missing word, not the full sentence.)", tasks: [
        { prompt: "Complete: 'Ist das Zimmer noch _____?' (Hint: the word for 'available/free')", expected: "frei" },
        { prompt: "Complete: 'Das ist _____ Zimmer.' (Hint: 'my' for a neuter noun)", expected: "mein" },
        { prompt: "Complete: 'Die Küche _____ wir.' (Hint: the verb meaning 'to share')", expected: "teilen" }
      ]}
    ],
    culture_note: "Shared flats (WGs) are hugely popular in Germany. At WG viewings you need to be likeable — it's not just about money, it's about fitting in.",
    real_world_use: "Flat hunting is your first real adventure if you're staying longer in Germany.",
    goethe_alignment: { module: "Goethe A1 Speaking Part 2", skill: "Making phone calls and asking for information", task_type: "Requesting information about accommodation" },
    learning_path_context: "Possessive pronouns are fundamental — from now on you can describe YOUR world in German. Next: meeting your new flatmates and talking about family!"
  },
  {
    id: "a1-2-2", order_index: 7, level: "A1", sublevel: "A1.2",
    title: "My New Flatmates",
    description: "Your flatmate shows you family photos. Time to talk about your family too.",
    duration: 15, xp_reward: 65, cefrLevel: "A1",
    learning_objectives: ["Name family members in German", "Talk about your family", "Use possessive pronouns correctly", "Ask about someone's family"],
    listening: { title: "Family photos", difficulty: "A1.2", transcript: "Anna: Das ist meine Mutter Petra. Und mein Vater Klaus — er ist Ingenieur.\nYou: Hast du Geschwister?\nAnna: Ja, mein Bruder Max und meine Schwester Lisa.\nYou: Ich habe einen Bruder. Er ist 25.\nAnna: Und deine Eltern?\nYou: Meine Mutter ist Lehrerin, mein Vater Arzt.\nAnna: Sind sie verheiratet?\nYou: Ja, seit 30 Jahren!", english_translation: "Anna: That's my mother Petra. And my father Klaus — he's an engineer.\nYou: Do you have siblings?\nAnna: Yes, my brother Max and my sister Lisa.\nYou: I have a brother. He's 25.\nAnna: And your parents?\nYou: My mother is a teacher, my father a doctor.\nAnna: Are they married?\nYou: Yes, for 30 years!", vocabulary_highlighted: ["die Mutter :: mother", "der Vater :: father", "der Bruder :: brother", "die Schwester :: sister", "die Eltern :: parents", "die Geschwister :: siblings", "verheiratet :: married", "der Ingenieur :: engineer"], audio_url: "" },
    grammar: { concept: "Family + Possessive Pronouns in Action", rule: "Now you'll practice possessives with family members. The rule is simple: masculine (der) and neuter (das) nouns keep the base form — 'mein Bruder' (my brother), 'mein Kind' (my child). But feminine (die) nouns and plurals always add -E: 'meinE Schwester' (my sister), 'meinE Eltern' (my parents). This -E rule applies to ALL possessives: deinE, seinE, ihrE.", patterns: [{ person: "der (masculine)", conjugation: "mein", example: "mein Bruder (my brother), dein Vater (your father)" }, { person: "die (feminine)", conjugation: "meine", example: "meine Mutter (my mother), deine Schwester (your sister)" }, { person: "das (neuter)", conjugation: "mein", example: "mein Kind (my child), dein Baby (your baby)" }, { person: "Plural (always die)", conjugation: "meine", example: "meine Eltern (my parents), deine Geschwister (your siblings)" }], common_mistakes: [{ wrong: "Mein Schwester", right: "MeinE Schwester", explanation: "Schwester is feminine (die Schwester), so you must add -E: meinE Schwester" }], mnemonic: "If it uses DIE, add -E! MeinE Mutter, meinE Schwester, meinE Eltern. One rule, many words!" },
    vocabulary: { core: ["die Mutter :: mother", "der Vater :: father", "der Bruder :: brother", "die Schwester :: sister", "die Oma :: grandmother", "der Opa :: grandfather", "die Eltern :: parents", "die Geschwister :: siblings", "verheiratet :: married", "die Kinder :: children"], supporting: ["der Onkel :: uncle", "die Tante :: aunt", "der Cousin :: cousin (m)", "die Cousine :: cousin (f)", "geschieden :: divorced"], phrases: ["Hast du Geschwister? :: Do you have siblings?", "Das ist meine Familie. :: This is my family.", "Meine Mutter ist Lehrerin. :: My mother is a teacher.", "Er wohnt in... :: He lives in...", "Seit 30 Jahren. :: For 30 years."] },
    exercises: [
      { type: "recognition", difficulty: 1, instruction: "Choose the correct answer.", tasks: [
        { question: "Your mother's mother is your...", options: ["Tante (aunt)", "Oma (grandmother)", "Schwester (sister)"], correct: 1 },
        { question: "Which sentence uses the correct possessive? ('My sister is nice.')", options: ["Mein Schwester ist nett.", "Meine Schwester ist nett.", "Meiner Schwester ist nett."], correct: 1 },
        { question: "In the dialogue, what is Anna's father's profession?", options: ["Teacher (Lehrer)", "Engineer (Ingenieur)", "Doctor (Arzt)"], correct: 1 },
        { question: "Anna asks 'Und deine Eltern?' — What does 'Eltern' mean?", options: ["Siblings", "Parents", "Children"], correct: 1 }
      ]},
      { type: "recall", difficulty: 2, instruction: "Choose the correct possessive pronoun.", tasks: [
        { question: "_____ Mutter ist Lehrerin. (MY mother — 'die Mutter' is feminine!)", options: ["Mein", "Meine", "Meiner"], correct: 1 },
        { question: "_____ Bruder ist 25. (HER brother — 'der Bruder' is masculine)", options: ["Sein", "Ihr", "Ihre"], correct: 1 },
        { question: "_____ Eltern wohnen in Berlin. (MY parents — plural!)", options: ["Mein", "Meine", "Meiner"], correct: 1 }
      ]},
      { type: "production", difficulty: 3, instruction: "Fill in the missing word. (You only need to type the missing word, not the full sentence.)", tasks: [
        { prompt: "Complete: '_____ Mutter ist Lehrerin.' (Hint: 'my' for a feminine noun — remember the -E!)", expected: "Meine" },
        { prompt: "Complete: 'Hast du _____?' (Hint: the word for 'siblings')", expected: "Geschwister" },
        { prompt: "Complete: 'Sind sie _____?' (Hint: the word for 'married')", expected: "verheiratet" }
      ]}
    ],
    culture_note: "Family is important to Germans. Sunday lunch at Grandma's is tradition. Patchwork families are common and accepted.",
    real_world_use: "Talking about family is normal in every conversation.",
    goethe_alignment: { module: "Goethe A1 Speaking Part 1", skill: "Talking about family", task_type: "Describe your family: names, ages, professions, and relationships" },
    learning_path_context: "You're no longer a stranger — you can talk about your family and ask about theirs. Next stop: Dresden — you'll need a train ticket!"
  },
  {
    id: "a1-2-3", order_index: 8, level: "A1", sublevel: "A1.2",
    title: "Taking the Train to Dresden",
    description: "You're buying a train ticket at Hamburg station. Next stop: Dresden!",
    duration: 18, xp_reward: 75, cefrLevel: "A1",
    learning_objectives: ["Buy a train ticket in German", "Conjugate regular verbs", "Understand times and schedules", "Understand train announcements"],
    listening: { title: "At the ticket counter", difficulty: "A1.2", transcript: "Du: Eine Fahrkarte nach Dresden, bitte.\nCounter: Hin und zurück oder nur hin?\nYou: Nur hin.\nCounter: ICE um 14:15, Ankunft 18:30. 54 Euro.\nYou: Den ICE, bitte. Am Fenster.\nCounter: Gleis 7. Gute Reise!\nAnnouncement: Achtung! ICE nach Dresden heute von Gleis 8!", english_translation: "You: A ticket to Dresden, please.\nCounter: Round trip or one way?\nYou: One way.\nCounter: ICE at 2:15 PM, arrival 6:30 PM. 54 euros.\nYou: The ICE please. Window seat.\nCounter: Platform 7. Have a good trip!\nAnnouncement: Attention! ICE to Dresden today from platform 8!", vocabulary_highlighted: ["die Fahrkarte :: ticket", "hin und zurück :: round trip", "das Gleis :: platform", "die Abfahrt :: departure", "die Ankunft :: arrival", "der Sitzplatz :: seat", "am Fenster :: window seat", "Gute Reise! :: Good trip!"], audio_url: "" },
    grammar: { concept: "Regular Verbs in Present Tense", rule: "German verbs follow a simple pattern: take the stem (the infinitive minus -en) and add personal endings. The endings are: ich = -e, du = -st, er/sie/es = -t, wir = -en, Sie (formal) = -en. For example, 'kaufen' (to buy): ich kaufe, du kaufst, er kauft, wir kaufen. Some common verbs like 'fahren' change their vowel for du/er forms (a becomes ä), but the endings stay the same.", patterns: [{ person: "ich", conjugation: "-e", example: "ich fahre (I travel), ich kaufe (I buy), ich brauche (I need)" }, { person: "du", conjugation: "-st", example: "du fährst (you travel), du kaufst (you buy), du brauchst (you need)" }, { person: "er/sie", conjugation: "-t", example: "er fährt (he travels), er kauft (he buys), er braucht (he needs)" }, { person: "wir/Sie", conjugation: "-en", example: "wir fahren (we travel), wir kaufen (we buy), wir brauchen (we need)" }], common_mistakes: [{ wrong: "Du fahre", right: "Du FÄHRST", explanation: "With 'du' you must add the -st ending — and 'fahren' changes a→ä for du and er" }, { wrong: "Er kaufen", right: "Er KAUFT", explanation: "With 'er/sie/es' the ending is always -t, never -en" }], mnemonic: "The endings spell E-ST-T-EN — think of it as 'EST like a TEST'! Learn these four endings and you can conjugate hundreds of verbs." },
    vocabulary: { core: ["die Fahrkarte :: ticket", "der Bahnhof :: station", "das Gleis :: platform", "die Abfahrt :: departure", "die Ankunft :: arrival", "umsteigen :: to transfer", "der Sitzplatz :: seat", "das Fenster :: window", "fahren :: to travel", "kaufen :: to buy"], supporting: ["hin und zurück :: round trip", "der Zug :: train", "die Durchsage :: announcement", "Achtung! :: Attention!", "nur hin :: one way"], phrases: ["Eine Fahrkarte nach Dresden. :: A ticket to Dresden.", "Hin und zurück? :: Round trip?", "Wann fährt der Zug? :: When does the train leave?", "Von welchem Gleis? :: Which platform?", "Gute Reise! :: Good trip!"] },
    exercises: [
      { type: "recognition", difficulty: 1, instruction: "Choose the correct answer.", tasks: [
        { question: "You want to buy a ticket. What do you say?", options: ["Eine Fahrkarte nach Dresden, bitte.", "Wo ist das Gleis?", "Gute Reise!"], correct: 0 },
        { question: "What does 'hin und zurück' mean?", options: ["One way", "Round trip", "Platform change"], correct: 1 },
        { question: "The announcement says the train leaves from 'Gleis 8' instead of 'Gleis 7'. What changed?", options: ["The departure time", "The platform number", "The destination"], correct: 1 },
        { question: "The ICE departs at 14:15 and arrives at 18:30. How long is the journey?", options: ["About 2 hours", "About 4 hours", "About 6 hours"], correct: 1 }
      ]},
      { type: "recall", difficulty: 2, instruction: "Fill in the correct verb form.", tasks: [
        { question: "Ich _____ nach Dresden. (I travel — fahren)", options: ["fahre", "fährst", "fährt"], correct: 0 },
        { question: "Er _____ eine Fahrkarte. (He buys — kaufen)", options: ["kaufe", "kaufst", "kauft"], correct: 2 },
        { question: "Wir _____ einen Sitzplatz. (We need — brauchen)", options: ["brauche", "brauchst", "brauchen"], correct: 2 }
      ]},
      { type: "production", difficulty: 3, instruction: "Fill in the missing word. (You only need to type the missing word, not the full sentence.)", tasks: [
        { prompt: "Complete: 'Eine _____ nach Dresden, bitte.' (Hint: the word for 'ticket')", expected: "Fahrkarte" },
        { prompt: "Complete: 'Von welchem _____?' (Hint: the word for 'platform')", expected: "Gleis" },
        { prompt: "Complete: 'Gute _____!' (Hint: the word for 'trip/journey')", expected: "Reise" }
      ]}
    ],
    culture_note: "Deutsche Bahn: Germany's pride and frustration. Delays are legendary, but the network is huge. ICE trains go up to 300 km/h.",
    real_world_use: "Train travel is daily life in Germany. 'Eine Fahrkarte nach...' is a phrase you'll use every week.",
    goethe_alignment: { module: "Goethe A1 Listening Part 2", skill: "Understanding announcements", task_type: "Identifying correct information from train announcements" },
    learning_path_context: "You can now travel through Germany by train! Regular verb conjugation is your main grammar tool — it unlocks hundreds of verbs. Next: finding your way around Dresden."
  },
  {
    id: "a1-3-1", order_index: 9, level: "A1", sublevel: "A1.3",
    title: "Finding the Frauenkirche",
    description: "You're in Dresden looking for the famous Frauenkirche. Time to ask for directions.",
    duration: 15, xp_reward: 65, cefrLevel: "A1",
    learning_objectives: ["Ask for directions in German", "Understand left, right, straight", "Use location prepositions (im, am, zum)", "Ask about opening times"],
    listening: { title: "Finding your way", difficulty: "A1.3", transcript: "Du: Entschuldigung, wo ist die Frauenkirche?\nPasserby: Geradeaus, dann zweite Straße links.\nYou: Ist es weit?\nPasserby: Fünf Minuten zu Fuß.\n[An der Kirche]\nYou: Kann ich die Kirche besichtigen?\nTicket desk: Eintritt ist frei. Bis 18 Uhr geöffnet.\nYou: Gibt es einen Audioguide?\nTicket desk: Ja, 3 Euro.", english_translation: "You: Excuse me, where is the Frauenkirche?\nPasserby: Straight ahead, then second street on the left.\nYou: Is it far?\nPasserby: Five minutes on foot.\n[At the church]\nYou: Can I visit the church?\nTicket: Admission is free. Open until 6 PM.\nYou: Is there an audio guide?\nTicket: Yes, 3 euros.", vocabulary_highlighted: ["geradeaus :: straight ahead", "links :: left", "rechts :: right", "zu Fuß :: on foot", "der Eintritt :: admission", "geöffnet :: open", "besichtigen :: to visit", "frei :: free"], audio_url: "" },
    grammar: { concept: "Location Prepositions — Where Is What?", rule: "German has three key location contractions that you'll use every day. 'In dem' squishes into 'IM' (in the), 'an dem' becomes 'AM' (at the), and 'zu dem' becomes 'ZUM' (to the). These contractions are not optional — native speakers always use them. Combined with direction words (links = left, rechts = right, geradeaus = straight), you can navigate anywhere.", patterns: [{ sound: "im (in+dem)", examples: ["im Museum (in the museum)", "im Café (in the café)", "im Bahnhof (in the station)"], english_trick: "in the (for enclosed spaces)" }, { sound: "am (an+dem)", examples: ["am Platz (at the square)", "am Eingang (at the entrance)"], english_trick: "at the (for open locations)" }, { sound: "zum (zu+dem)", examples: ["zum Museum (to the museum)", "zum Bahnhof (to the station)"], english_trick: "to the (for destinations)" }, { sound: "Directions", examples: ["links (left), rechts (right), geradeaus (straight ahead)"], english_trick: "left, right, straight" }], common_mistakes: [{ wrong: "Gehen Sie zu dem Museum", right: "Gehen Sie ZUM Museum", explanation: "'Zu dem' always contracts to 'zum' — never say them separately" }], mnemonic: "IM = I'm inside, AM = I'm at, ZUM = I'm heading to. Three little words, infinite directions!" },
    vocabulary: { core: ["geradeaus :: straight", "links :: left", "rechts :: right", "die Kirche :: church", "das Museum :: museum", "der Eingang :: entrance", "der Eintritt :: admission", "geöffnet :: open", "geschlossen :: closed", "der Platz :: square"], supporting: ["die Straße :: street", "der Meter :: meter", "zu Fuß :: on foot", "ungefähr :: about", "direkt :: directly"], phrases: ["Wo ist die Frauenkirche? :: Where is it?", "Geradeaus, dann links. :: Straight, then left.", "Ist es weit? :: Is it far?", "Der Eintritt ist frei. :: Free admission.", "Bis 18 Uhr geöffnet. :: Open until 6 PM."] },
    exercises: [
      { type: "recognition", difficulty: 1, instruction: "Choose the correct answer.", tasks: [
        { question: "Someone says 'geradeaus, dann zweite links'. What do you do?", options: ["Turn right", "Go straight, then take the second left", "Go back"], correct: 1 },
        { question: "'im Museum' is short for:", options: ["in mein Museum", "in dem Museum", "in das Museum"], correct: 1 },
        { question: "The passerby says 'Fünf Minuten zu Fuß.' How far is the Frauenkirche?", options: ["Five minutes by bus", "Five minutes on foot", "Five hours away"], correct: 1 },
        { question: "At the ticket desk you learn 'Eintritt ist frei.' What does this mean?", options: ["Admission is free", "The church is closed", "Audio guides are free"], correct: 0 }
      ]},
      { type: "recall", difficulty: 2, instruction: "Which shortened form is correct?", tasks: [
        { question: "Ich bin _____ Café. (in + dem = ?)", options: ["in dem", "im", "am"], correct: 1 },
        { question: "Gehen Sie _____ Museum. (zu + dem = ?)", options: ["zu dem", "zum", "im"], correct: 1 },
        { question: "Wir treffen uns _____ Eingang. (an + dem = ?)", options: ["an dem", "im", "am"], correct: 2 }
      ]},
      { type: "production", difficulty: 3, instruction: "Fill in the missing word. (You only need to type the missing word, not the full sentence.)", tasks: [
        { prompt: "Complete: '_____ ist die Frauenkirche?' (Hint: the question word for 'where')", expected: "Wo" },
        { prompt: "Complete: 'Geradeaus, dann zweite Straße _____.' (Hint: the word for 'left')", expected: "links" },
        { prompt: "Complete: 'Gehen Sie _____ Bahnhof.' (Hint: 'to the' — the contraction of 'zu dem')", expected: "zum" }
      ]}
    ],
    culture_note: "The Frauenkirche was a ruin for 50 years — a memorial against war. Rebuilt in 2005. Free admission as a sign of reconciliation.",
    real_world_use: "'Wo ist...?' + links/rechts/geradeaus covers 90% of all directions you'll ever need.",
    goethe_alignment: { module: "Goethe A1 Listening Part 3", skill: "Understanding directions", task_type: "Following a route on a city map based on spoken directions" },
    learning_path_context: "You can now find your way around any German city! Last stop on your A1 journey: grocery shopping at the supermarket."
  },
  {
    id: "a1-3-2", order_index: 10, level: "A1", sublevel: "A1.3",
    title: "Shopping at the Supermarket",
    description: "Grocery shopping at REWE. The cashier talks fast — can you keep up?",
    duration: 15, xp_reward: 75, cefrLevel: "A1",
    learning_objectives: ["Name groceries in German", "Use the Akkusativ case (den/einen)", "Communicate at the checkout", "Specify quantities"],
    listening: { title: "At the supermarket", difficulty: "A1.3", transcript: "Cashier: Hallo! Payback-Karte?\nYou: Nein, leider nicht.\nCashier: Brauchen Sie eine Tüte?\nYou: Ja, eine kleine bitte.\nCashier: 14,35 Euro.\nYou: Kann ich mit Karte zahlen?\nCashier: Ja, bitte auflegen... Danke! Bon?\nYou: Ja, bitte.\nCashier: Schönen Tag noch!\nYou: Ihnen auch!", english_translation: "Cashier: Hello! Loyalty card?\nYou: No, unfortunately not.\nCashier: Need a bag?\nYou: Yes, a small one please.\nCashier: 14.35 euros.\nYou: Can I pay by card?\nCashier: Yes, tap here... Thanks! Receipt?\nYou: Yes please.\nCashier: Have a nice day!\nYou: You too!", vocabulary_highlighted: ["die Tüte :: bag", "die Karte :: card", "zahlen :: to pay", "der Bon :: receipt", "auflegen :: to tap", "leider :: unfortunately", "Schönen Tag! :: Nice day!", "Ihnen auch! :: You too!"], audio_url: "" },
    grammar: { concept: "The Akkusativ — Ich kaufe DEN Apfel", rule: "The Akkusativ is the case used for the direct object — the thing being bought, seen, or acted upon. Here's the good news: only MASCULINE nouns change! 'Der' becomes 'den', and 'ein' becomes 'einen'. Feminine (die) and neuter (das) stay exactly the same. So: 'Ich kaufe DEN Apfel' (masculine), but 'Ich kaufe DIE Milch' (feminine — no change) and 'Ich kaufe DAS Brot' (neuter — no change). That's the entire rule!", patterns: [{ sound: "der → den", examples: ["Ich kaufe den Apfel. (I buy the apple.)", "Ich brauche den Schlüssel. (I need the key.)"], english_trick: "Only masculine changes: der becomes den" }, { sound: "die → die", examples: ["Ich kaufe die Milch. (I buy the milk.)"], english_trick: "Feminine stays the same" }, { sound: "das → das", examples: ["Ich kaufe das Brot. (I buy the bread.)"], english_trick: "Neuter stays the same" }, { sound: "ein → einen", examples: ["Ich kaufe einen Apfel. (I buy an apple.)"], english_trick: "Only masculine 'ein' changes to 'einen'" }], common_mistakes: [{ wrong: "Ich kaufe der Apfel", right: "Ich kaufe DEN Apfel", explanation: "When the noun is the direct object (being bought/seen/needed), 'der' MUST change to 'den'" }], mnemonic: "Only THE ONE changes — der becomes deN, ein becomes eineN. Just add an N for masculine direct objects. Everything else stays put!" },
    vocabulary: { core: ["der Supermarkt :: supermarket", "die Milch :: milk", "das Brot :: bread", "der Käse :: cheese", "der Apfel :: apple", "die Tüte :: bag", "die Kasse :: checkout", "der Bon :: receipt", "zahlen :: to pay", "brauchen :: to need"], supporting: ["die Karte :: card", "auflegen :: to tap", "leider :: unfortunately", "natürlich :: of course", "das Gemüse :: vegetables"], phrases: ["Brauchen Sie eine Tüte? :: Need a bag?", "Kann ich mit Karte zahlen? :: Pay by card?", "Das macht 14,35. :: That's 14.35.", "Schönen Tag noch! :: Nice day!", "Ihnen auch! :: You too!"] },
    exercises: [
      { type: "recognition", difficulty: 1, instruction: "Choose the correct answer.", tasks: [
        { question: "The cashier asks 'Brauchen Sie eine Tüte?' — You want a bag. What do you say?", options: ["Nein, danke.", "Ja, eine kleine bitte.", "Ich habe eine Karte."], correct: 1 },
        { question: "Which sentence uses the Akkusativ correctly? (Remember: only DER changes to DEN)", options: ["Ich kaufe der Apfel.", "Ich kaufe den Apfel.", "Ich kaufe dem Apfel."], correct: 1 },
        { question: "The cashier says 'Schönen Tag noch!' and you reply 'Ihnen auch!' — What did you say?", options: ["Thank you!", "You too!", "See you later!"], correct: 1 },
        { question: "You want to pay. The cashier says 'bitte auflegen.' What should you do?", options: ["Hand over cash", "Tap your card", "Show your receipt"], correct: 1 }
      ]},
      { type: "recall", difficulty: 2, instruction: "Choose the correct article in the Akkusativ.", tasks: [
        { question: "Ich kaufe _____ Brot. (DAS Brot — does it change in Akkusativ?)", options: ["den", "das", "die"], correct: 1 },
        { question: "Ich brauche _____ Tüte. (DIE Tüte — does it change in Akkusativ?)", options: ["den", "das", "eine"], correct: 2 },
        { question: "Ich nehme _____ Käse. (DER Käse — masculine! Does it change?)", options: ["der", "den", "das"], correct: 1 }
      ]},
      { type: "production", difficulty: 3, instruction: "Fill in the missing word. (You only need to type the missing word, not the full sentence.)", tasks: [
        { prompt: "Complete: 'Kann ich mit _____ zahlen?' (Hint: the word for 'card')", expected: "Karte" },
        { prompt: "Complete: 'Ich kaufe _____ Apfel.' (Hint: masculine 'the' in Akkusativ — der becomes...)", expected: "den" },
        { prompt: "Complete: 'Brauchen Sie eine _____?' (Hint: the word for 'bag')", expected: "Tüte" }
      ]}
    ],
    culture_note: "At German supermarkets you pack your OWN bags — fast! Plastic bags cost 15-30 cents. Most Germans bring their own bags.",
    real_world_use: "You'll shop for groceries every day. 'Brauchen Sie eine Tüte?' and 'Kann ich mit Karte zahlen?' — you'll hear these 100 times.",
    goethe_alignment: { module: "Goethe A1 Speaking Part 2", skill: "Shopping at a store", task_type: "Picture card: Supermarket — buying groceries and paying at checkout" },
    learning_path_context: "Congratulations — your A1 Berlin-Hamburg-Dresden journey is complete! You can now: greet people, check in, order at cafés, introduce yourself, shop, ask for directions, and take trains. Next level: A2!"
  },
];
export const ALL_STATIC_LESSONS = LESSON_DATA_A1;
