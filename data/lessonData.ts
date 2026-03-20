export const LESSON_DATA_A1 = [
  {
    id: "a1-0-1",
    order_index: 1,
    level: "A1",
    sublevel: "A1.0",
    title: "Aussprache — Das Fundament",
    description: "Master the 6 critical sounds that separate German from English. In this 20-minute lesson, you'll learn to pronounce German so confidently that Germans understand you immediately.",
    duration: 20,
    xp_reward: 50,
    cefrLevel: "A1",
    
    learning_objectives: [
      "Pronounce the 5 most critical German sounds that differ from English (W, Z, V, EI, IE)",
      "Produce German umlauts (ä, ö, ü) and the ß correctly",
      "Read any new German word aloud with confident pronunciation",
      "Understand the phonetic structure of German spelling (almost perfectly phonetic!)"
    ],
    
    listening: {
      title: "Die 6 kritischen Laute — Hör und wiederhole",
      difficulty: "A1.0",
      transcript: "Wasser, Wein, wie, wo, wann | zehn, Zeit, zwischen, zurück, Zug | Vater, vier, von, vor, viel | ein, zwei, drei, nein, weiß, Eis | wie, viel, hier, nie, Sie, Bier | schön, hören, Öl, zwölf | über, üben, fünf, Tür, grün | Straße, heiß, groß",
      english_translation: "Water, wine, how, where, when | ten, time, between, back, train | father, four, from, before, much | one, two, three, no, white, ice | how, much, here, never, you, beer | beautiful, hear, oil, twelve | over, practice, five, door, green | street, hot, big",
      vocabulary_highlighted: [
        "Wasser :: water (W sounds like V)",
        "zehn :: ten (Z sounds like TS)",
        "Vater :: father (V sounds like F)",
        "schön :: beautiful (Ö with rounded lips)",
        "Straße :: street (ß = sharp S)"
      ],
      audio_url: ""
    },
    
    grammar: {
      concept: "The 6 Critical Sounds in German Pronunciation",
      rule: "German spelling is almost perfectly phonetic. Learn these 6 sound rules and you can pronounce ANY German word correctly. Unlike English (where 'tough', 'through', 'though' are all different), German is logical.",
      patterns: [
        {
          sound: "W = V sound",
          examples: ["Wasser → Vasser (water)", "Wein → Vine (wine)", "Wie → Vee (how)"],
          english_trick: "Think Wolf → Volf",
          common_mistake: "English speakers say 'W' like in 'water' — WRONG! German W is always the V sound."
        },
        {
          sound: "Z = TS sound",
          examples: ["zehn → tsehn (ten)", "Zeit → tsait (time)", "zwei → tsvai (two)"],
          english_trick: "Like 'pizza' but German → pitsa",
          common_mistake: "Don't say Z like in English 'zebra'. German Z is always TS."
        },
        {
          sound: "V = F sound",
          examples: ["Vater → Fater (father)", "vier → feer (four)", "von → fon (from)"],
          english_trick: "Very → Ferry",
          common_mistake: "German V is NOT like English V in 'very'. It's F!"
        },
        {
          sound: "EI = 'eye' sound",
          examples: ["ein → ayn (one/a)", "zwei → tsvai (two)", "nein → nine (no)"],
          english_trick: "Think EinSTEIN (he was German!)",
          common_mistake: "EI is NOT 'ee'. It's the long 'I' sound like 'mine' or 'eye'."
        },
        {
          sound: "IE = long 'ee' sound",
          examples: ["wie → vee (how)", "viel → feel (much)", "hier → heer (here)"],
          english_trick: "The SECOND letter wins! IE = 'ee'",
          common_mistake: "IE is NOT 'eye'. It's 'ee' like 'see' or 'tree'. The second letter always wins!"
        },
        {
          sound: "CH after i/e = soft hissing sound",
          examples: ["ich → ikh (I) [soft hiss like cat]", "nicht → nikht [soft hiss, NOT 'ick']"],
          english_trick: "Like a cat hissing softly",
          common_mistake: "Don't pronounce it like 'ick' or 'ish'. It's a soft, breathy hiss."
        }
      ],
      umlauts: {
        ä: { rule: "Open your mouth wide, say E", examples: ["Käse (cheese)", "Bär (bear)", "spät (late)"] },
        ö: { rule: "Round lips as if to whistle, then say E", examples: ["schön (beautiful)", "hören (to hear)", "Köln (Cologne)"] },
        ü: { rule: "Round lips as if to whistle, then say I", examples: ["über (over)", "fünf (five)", "Tür (door)"] },
        ß: { rule: "Sharp S after long vowels or diphthongs (EI, AU, EU)", examples: ["Straße (street)", "heiß (hot)", "groß (big)"] }
      }
    },
    
    vocabulary: {
      core: [
        "Wasser :: water",
        "zehn :: ten",
        "Vater :: father",
        "schön :: beautiful",
        "über :: over"
      ],
      supporting: [
        "Wein :: wine",
        "Zeit :: time",
        "vier :: four",
        "viel :: much",
        "hier :: here",
        "Straße :: street"
      ],
      phrases: [
        "Wie heißt das? :: What is this called?",
        "Sprich das aus :: Pronounce this",
        "Ich verstehe :: I understand"
      ]
    },
    
    exercises: [
      {
        type: "recognition",
        difficulty: 1,
        instruction: "Which pronunciation is CORRECT? Choose the right sound.",
        tasks: [
          {
            question: "How do you pronounce 'Wasser'?",
            options: ["WAH-ser (like English W)", "VAH-ser (like English V)"],
            correct: 1,
            explanation: "German W always sounds like English V. Wasser = VAH-ser."
          },
          {
            question: "How do you pronounce 'zehn' (ten)?",
            options: ["ZEHN (like English Z)", "TSEHN (like pizza → pitsa)"],
            correct: 1,
            explanation: "German Z is always TS sound. zehn = TSEHN."
          },
          {
            question: "How do you pronounce 'ein' (one)?",
            options: ["EE-n (like English 'ee')", "AYN (like 'mine')"],
            correct: 1,
            explanation: "EI = 'eye' sound. ein = AYN (like the name 'Ine')."
          }
        ]
      },
      {
        type: "recall",
        difficulty: 2,
        instruction: "Which RULE applies to each word? Match the word with its sound rule.",
        tasks: [
          {
            word: "Bier",
            options: ["W=V", "Z=TS", "IE='ee'"],
            correct: 2,
            explanation: "Bier has IE → pronounced 'BEER' (long ee sound)"
          },
          {
            word: "weiß",
            options: ["Z=TS", "EI='eye'", "ß=sharp S"],
            correct: 1,
            explanation: "weiß has both EI ('eye') and ß (sharp S) → VICE"
          }
        ]
      },
      {
        type: "production",
        difficulty: 3,
        instruction: "Practice: Read these words aloud. Write how YOU would pronounce them phonetically.",
        tasks: [
          { word: "Zwiebel (onion)", your_phonetic: "", expected: "TSVEE-bel (Z=TS, IE='ee')" },
          { word: "völlig (completely)", your_phonetic: "", expected: "FÖHL-lig (Ö + regular)" },
          { word: "Lieblich (lovely)", your_phonetic: "", expected: "LEEP-likh (IE='ee')" }
        ]
      }
    ],
    
    spaced_repetition: {
      appears_again_in: ["a1-0-2", "a1-1-1"],
      review_days: [1, 3, 7, 14],
      note: "Pronunciation is foundation — you'll use these sound rules in EVERY lesson"
    },
    
    culture_note: "German spelling is almost PERFECTLY phonetic. Unlike English (where 'tough', 'through', 'thought', 'though' are all different), German has consistent rules. Once you learn the 6 critical sounds, you can read ANY German word correctly. This is a HUGE advantage! Germans actually admire when foreigners pronounce correctly — it shows respect for the language.",
    
    real_world_use: "You'll use this in EVERY moment: ordering coffee (Kaffee = kaFFAY), introducing yourself (Ich = ikh), asking directions (Straße = SHTRAAH-se). Correct pronunciation = people understand you immediately. Bad pronunciation = confusion and embarrassment.",
    
    goethe_alignment: {
      module: "Goethe A1 Speaking — All Parts",
      skill: "Foundation for confident speaking",
      task_type: "Every single dialogue requires correct pronunciation"
    },
    
    learning_path_context: "This is the FIRST lesson for a reason. Perfect pronunciation builds confidence. You'll sound German before you speak German. This foundation makes every future lesson easier."
  },
  
  {
    id: "a1-0-2",
    order_index: 2,
    level: "A1",
    sublevel: "A1.0",
    title: "Die ersten Worte — Überleben in Deutsch",
    description: "Your first day in Germany. Master the essential survival phrases, understand formal vs informal, and have your first real conversations.",
    duration: 18,
    xp_reward: 50,
    cefrLevel: "A1",
    
    learning_objectives: [
      "Greet people appropriately based on time of day and formality level",
      "Use essential politeness words (Bitte, Danke, Entschuldigung) naturally",
      "Understand and apply the formal Sie vs. informal du system correctly",
      "Ask for help and respond to basic questions in German",
      "Create your first short German conversations"
    ],
    
    listening: {
      title: "At the Train Station — First Day in Germany",
      difficulty: "A1.0",
      transcript: "Tourist: Entschuldigung! Sprechen Sie Englisch?\nLocal: Ja, ein bisschen. Wie kann ich Ihnen helfen?\nTourist: Ich suche den Bahnhof. Können Sie mir helfen?\nLocal: Gerne! Der Bahnhof ist dort drüben. Auf Wiedersehen!\nTourist: Danke schön! Auf Wiedersehen!",
      english_translation: "Tourist: Excuse me! Do you speak English?\nLocal: Yes, a little bit. How can I help you?\nTourist: I'm looking for the train station. Can you help me?\nLocal: Gladly! The train station is over there. Goodbye!\nTourist: Thank you very much! Goodbye!",
      vocabulary_highlighted: [
        "Entschuldigung :: Excuse me (to get attention)",
        "Sprechen Sie...? :: Do you speak...? (formal)",
        "Ich suche :: I'm looking for",
        "Danke schön :: Thank you very much",
        "Auf Wiedersehen :: Goodbye (formal)"
      ],
      audio_url: ""
    },
    
    grammar: {
      concept: "The Sie vs du System — Critical for German Social Interactions",
      rule: "German has TWO ways to say 'you': formal 'Sie' (capitalized, always plural verb form) and informal 'du' (lowercase). This is NOT optional — using the wrong one can be offensive. ALWAYS start with Sie unless invited to use du.",
      patterns: [
        {
          context: "Use formal SIE with:",
          examples: [
            "Strangers in the street",
            "Authority figures (teachers, doctors, police)",
            "Older people you don't know",
            "Service situations (restaurants, shops, hotels)",
            "Professional/business settings",
            "First meetings"
          ],
          example_sentence: "Wie heißen Sie? (How are you called? = formal)"
        },
        {
          context: "Use informal du with:",
          examples: [
            "Friends and family",
            "Children",
            "Peers (classmates, coworkers your age)",
            "Casual/social settings",
            "Animals",
            "When explicitly invited ('Wir können uns duzen')"
          ],
          example_sentence: "Wie heißt du? (How are you called? = informal)"
        },
        {
          context: "CRITICAL POLITENESS WORDS",
          words: [
            { word: "Bitte", meanings: ["Please (before action)", "You're welcome (after thanks)", "Pardon? (when you don't understand)"] },
            { word: "Danke / Danke schön / Vielen Dank", meanings: ["Thank you (casual)", "Thank you very much (polite)", "Thank you very much (emphatic)"] },
            { word: "Entschuldigung", meanings: ["Excuse me (to get attention)", "I'm sorry (apology)", "Pardon?"] },
            { word: "Gerne", meanings: ["Gladly / With pleasure", "You're welcome (response to thanks)"] }
          ]
        }
      ],
      common_mistakes: [
        {
          wrong: "Sprechen du Englisch?",
          right: "Sprichst du Englisch? (to a friend) OR Sprechen Sie Englisch? (to a stranger)",
          explanation: "If you use 'du', the verb conjugates differently (du sprichst, not du sprechen). And stranger = always Sie!"
        },
        {
          wrong: "Danke, nicht bitte",
          right: "Danke, nein. / Nein, danke.",
          explanation: "Don't say 'nicht bitte'. Germans say either 'Nein' (No) or 'Nein, danke' (No, thanks)."
        },
        {
          wrong: "Auf Wiedersehen, du!",
          right: "Auf Wiedersehen! (formal) OR Tschüss! (informal with friends)",
          explanation: "You don't attach 'du' to goodbye. If you said Sie before, keep using Sie."
        }
      ]
    },
    
    vocabulary: {
      core: [
        "Entschuldigung :: Excuse me / I'm sorry",
        "Sprechen Sie...? :: Do you speak...? (formal)",
        "Danke :: Thank you",
        "Bitte :: Please / You're welcome",
        "Auf Wiedersehen :: Goodbye (formal)"
      ],
      supporting: [
        "Guten Morgen :: Good morning",
        "Guten Tag :: Good afternoon",
        "Guten Abend :: Good evening",
        "Ja :: Yes",
        "Nein :: No",
        "Ich verstehe nicht :: I don't understand",
        "Können Sie mir helfen? :: Can you help me? (formal)"
      ],
      phrases: [
        "Wie kann ich Ihnen helfen? :: How can I help you? (formal)",
        "Gerne! :: Gladly! / With pleasure!",
        "Danke schön! :: Thank you very much!",
        "Kein Problem :: No problem",
        "Viel Spaß! :: Have fun!"
      ]
    },
    
    exercises: [
      {
        type: "recognition",
        difficulty: 1,
        instruction: "Formal (Sie) or Informal (du)? Choose the correct greeting.",
        tasks: [
          {
            situation: "Meeting your German teacher on the first day",
            options: ["Hallo, du!", "Guten Tag! Wie heißen Sie?"],
            correct: 1,
            explanation: "Always start formal with teachers → Sie. You might be invited to use 'du' later."
          },
          {
            situation: "Greeting your new best friend",
            options: ["Wie heißen Sie?", "Wie heißt du?"],
            correct: 1,
            explanation: "Friends = du. 'Wie heißt du?' is the friendly version."
          },
          {
            situation: "Asking an elderly stranger for directions",
            options: ["Wo ist der Bahnhof? (du)", "Wo ist der Bahnhof? (Sie)"],
            correct: 1,
            explanation: "Stranger + older = formal Sie. Same question, but you're showing respect."
          }
        ]
      },
      {
        type: "recall",
        difficulty: 2,
        instruction: "Fill in the CORRECT politeness word (Bitte, Danke, Entschuldigung, or Gerne).",
        tasks: [
          {
            german: "_____, können Sie mir helfen?",
            context: "(You need help from a stranger)",
            correct: "Entschuldigung",
            explanation: "Use 'Entschuldigung' to get someone's attention."
          },
          {
            german: "Danke! - _____, gerne!",
            context: "(Someone thanks you for help)",
            correct: "Gerne",
            explanation: "Response to thanks is 'Gerne' (gladly/with pleasure)."
          },
          {
            german: "Ein Kaffee, _____.",
            context: "(Ordering at a café)",
            correct: "Bitte",
            explanation: "Use 'Bitte' to politely ask for something."
          }
        ]
      },
      {
        type: "production",
        difficulty: 3,
        instruction: "Create REAL conversations. Write 2-3 exchanges for each scenario. Use Sie (formal) unless told otherwise.",
        tasks: [
          {
            scenario: "Asking a hotel receptionist for directions to the museum",
            your_dialogue: "",
            expected_structure: "Entschuldigung! Können Sie mir sagen, wo das Museum ist? → [Response] → Danke schön! Auf Wiedersehen!"
          },
          {
            scenario: "Meeting your new German friend for the first time. Switch from Sie to du.",
            your_dialogue: "",
            expected_structure: "Hallo! Wie heißen Sie? → Ich bin... Und du? → Ich bin... Schön, dich kennenzulernen!"
          }
        ]
      }
    ],
    
    spaced_repetition: {
      appears_again_in: ["a1-0-3", "a1-1-1", "a1-1-2"],
      review_days: [1, 3, 7],
      note: "Sie/du and politeness words are used in EVERY dialogue. You'll see them constantly, which reinforces learning."
    },
    
    culture_note: "The Sie vs du distinction is DEEPLY cultural in German-speaking countries. Getting it wrong isn't just a grammar mistake — it can seem rude or presumptuous. Germans are very aware of social hierarchy and respect. Starting with Sie and waiting to be invited to use du shows maturity and cultural awareness. Interestingly, this is changing slightly with younger generations, but the 'safer' choice is always Sie.",
    
    real_world_use: "Your FIRST German interactions will happen exactly like this lesson: you'll approach a German, say 'Entschuldigung', ask a question with 'Sie', thank them with 'Danke schön'. This is the template for 80% of real-world interactions in your first weeks in Germany.",
    
    goethe_alignment: {
      module: "Goethe A1 Speaking Part 1: Introduce Yourself & Simple Interactions",
      skill: "Conduct a basic interaction with an examiner",
      task_type: "You'll be asked 'Wie heißen Sie?' and similar questions. The examiner will use Sie. You must respond appropriately."
    },
    
    learning_path_context: "These 'first words' are your survival kit. You'll use them TODAY in any German conversation. Every word here appears in Lesson 1 of the official Goethe A1 exam."
  },
  
  {
    id: "a1-1-1",
    order_index: 3,
    level: "A1",
    sublevel: "A1.1",
    title: "Wer bin ich? — SEIN (to be) — Das wichtigste Verb",
    description: "SEIN is the most fundamental verb in German. You'll use it constantly. Master its conjugation completely, and 50% of German becomes possible.",
    duration: 25,
    xp_reward: 75,
    cefrLevel: "A1",
    
    learning_objectives: [
      "Conjugate SEIN correctly in all 6 persons (ich, du, er/sie/es, wir, ihr, sie/Sie)",
      "Understand why SEIN is irregular and what that means",
      "Use SEIN to describe: identity, profession, nationality, age, location (permanent), emotions, and characteristics",
      "Form affirmative, negative, and interrogative sentences with SEIN",
      "Recognize SEIN in various contexts and respond appropriately"
    ],
    
    listening: {
      title: "Wer bist du? — Identity Dialogues",
      difficulty: "A1.1",
      transcript: "Dialog 1:\nA: Guten Tag! Wer bist du?\nB: Ich bin Anna. Ich bin Deutschlehrerin. Und du?\nA: Ich bin Max. Ich bin Student.\nB: Sehr interessant! Woher bist du?\nA: Ich bin aus England.\n\nDialog 2:\nA: Wie alt bist du?\nB: Ich bin 24 Jahre alt. Und du?\nA: Ich bin 25.\nB: Wir sind fast gleich alt!",
      english_translation: "Dialog 1:\nA: Hello! Who are you?\nB: I'm Anna. I'm a German teacher. And you?\nA: I'm Max. I'm a student.\nB: Very interesting! Where are you from?\nA: I'm from England.\n\nDialog 2:\nA: How old are you?\nB: I'm 24 years old. And you?\nA: I'm 25.\nB: We're almost the same age!",
      vocabulary_highlighted: [
        "Wer bist du? :: Who are you?",
        "Ich bin :: I am",
        "Deutschlehrerin :: German teacher (female)",
        "Student :: Student (male)",
        "Woher bist du? :: Where are you from?",
        "Wie alt bist du? :: How old are you?",
        "Jahre alt :: years old",
        "Wir sind :: We are"
      ],
      audio_url: ""
    },
    
    grammar: {
      concept: "SEIN (to be) — The Most Irregular and Most Important German Verb",
      rule: "SEIN is completely irregular — the root changes for every person. This is the FIRST verb you must master because it appears in almost every German sentence. Once you know SEIN, you understand what makes German tick.",
      patterns: [
        {
          person: "ich",
          conjugation: "bin",
          example: "Ich bin Anna",
          english: "I am Anna"
        },
        {
          person: "du",
          conjugation: "bist",
          example: "Du bist Student",
          english: "You are a student (informal)"
        },
        {
          person: "er / sie / es",
          conjugation: "ist",
          example: "Er ist Lehrer. Sie ist Ärztin. Es ist schön.",
          english: "He is a teacher. She is a doctor. It is beautiful."
        },
        {
          person: "wir",
          conjugation: "sind",
          example: "Wir sind Freunde",
          english: "We are friends"
        },
        {
          person: "ihr",
          conjugation: "seid",
          example: "Ihr seid Studenten",
          english: "You are students (informal plural)"
        },
        {
          person: "sie / Sie",
          conjugation: "sind",
          example: "Sie sind Lehrer (formal). Sie sind meine Eltern (they)",
          english: "You are teachers (formal). They are my parents."
        }
      ],
      usage_contexts: [
        {
          context: "IDENTITY — Who are you?",
          examples: ["Ich bin Anna :: I am Anna", "Ich bin Lehrerin :: I am a teacher"],
          note: "In German, you often omit the article: 'Ich bin Lehrer' (not 'Ich bin ein Lehrer'), though both are acceptable."
        },
        {
          context: "PROFESSION",
          examples: ["Er ist Doktor :: He is a doctor", "Sie ist Ingenieurin :: She is an engineer"],
          note: "German doesn't use the article with professions in most cases."
        },
        {
          context: "NATIONALITY",
          examples: ["Ich bin Deutsche :: I am German (female)", "Er ist Englander :: He is English (old form) / He is from England"],
          note: "Nationality words are capitalized in German."
        },
        {
          context: "AGE",
          examples: ["Ich bin 23 Jahre alt :: I am 23 years old", "Wie alt bist du? :: How old are you?"],
          note: "German includes 'Jahre alt' (years old), not just the number."
        },
        {
          context: "LOCATION (permanent/state)",
          examples: ["Ich bin in Berlin :: I am in Berlin", "Wo bist du? :: Where are you?"],
          note: "For temporary location, use 'stehen', 'sitzen', 'liegen'. SEIN = permanent or current state."
        },
        {
          context: "EMOTIONS & STATES",
          examples: ["Ich bin glücklich :: I am happy", "Ich bin müde :: I am tired", "Ich bin kalt :: I am cold (but Germans say 'Mir ist kalt' = To me it is cold)"],
          note: "Some emotions use 'mir' construction, not 'ich bin'."
        },
        {
          context: "CHARACTERISTICS & DESCRIPTIONS",
          examples: ["Das ist blau :: It is blue", "Der Kaffee ist heiß :: The coffee is hot", "Die Musik ist schön :: The music is beautiful"],
          note: "SEIN connects a subject to a characteristic."
        }
      ],
      common_mistakes: [
        {
          wrong: "Ich biste Student",
          right: "Ich bin Student",
          explanation: "SEIN is highly irregular. There's no pattern like regular verbs. You must memorize: ich BIN, du BIST, er IST."
        },
        {
          wrong: "Wir bist Freunde",
          right: "Wir sind Freunde",
          explanation: "Common mistake: confusing forms. 'bist' is ONLY for 'du'. 'Wir' uses 'sind'."
        },
        {
          wrong: "Ich bin Deutschlehrerin aus England in Berlin",
          right: "Ich bin Deutschlehrerin. Ich bin aus England. Ich bin in Berlin. (or) Ich bin Deutschlehrerin aus England, und ich bin in Berlin.",
          explanation: "Not a grammar mistake, but pragmatic: break up long sentences when learning. Shorter = clearer."
        },
        {
          wrong: "Du bist? (as a statement, with question intonation)",
          right: "Bist du...? (actual question with verb-subject inversion)",
          explanation: "In German questions, the verb comes FIRST. 'Du bist?' sounds like a guess, not a real question."
        }
      ]
    },
    
    vocabulary: {
      core: [
        "sein :: to be",
        "Student / Studentin :: student (m/f)",
        "Lehrer / Lehrerin :: teacher (m/f)",
        "Doktor / Arzt / Ärztin :: doctor (m/f)",
        "Jahre alt :: years old"
      ],
      supporting: [
        "Englander :: English person",
        "Deutsche / Deutscher :: German (m/f)",
        "Ingenieur / Ingenieurin :: engineer (m/f)",
        "Journalist / Journalistin :: journalist (m/f)",
        "Musiker / Musikerin :: musician (m/f)",
        "Freund / Freundin :: friend (m/f)",
        "Familie :: family",
        "Eltern :: parents"
      ],
      phrases: [
        "Wer bist du? :: Who are you?",
        "Ich bin... :: I am...",
        "Woher bist du? :: Where are you from?",
        "Wie alt bist du? :: How old are you?",
        "Schön, dich kennenzulernen :: Nice to meet you (informal)",
        "Gleichzeitig, dir auch! :: Same to you!"
      ]
    },
    
    exercises: [
      {
        type: "recognition",
        difficulty: 1,
        instruction: "Match the person to the correct conjugation of SEIN.",
        tasks: [
          { person: "ich", options: ["bin", "bist", "sind"], correct: "bin", explanation: "Ich = I → 'Ich BIN'" },
          { person: "du", options: ["bin", "bist", "ist"], correct: "bist", explanation: "Du = You informal → 'Du BIST'" },
          { person: "er", options: ["sind", "ist", "seid"], correct: "ist", explanation: "Er = He → 'Er IST'" },
          { person: "wir", options: ["bin", "ist", "sind"], correct: "sind", explanation: "Wir = We → 'Wir SIND'" }
        ]
      },
      {
        type: "recall",
        difficulty: 2,
        instruction: "Fill in the correct form of SEIN.",
        tasks: [
          { german: "Ich ___ Anna.", context: "Introducing yourself", correct: "bin", explanation: "Ich BIN — identity" },
          { german: "Du ___ Student, oder?", context: "Asking someone's profession", correct: "bist", explanation: "Du BIST — direct question with 'du'" },
          { german: "Wir ___ Freunde.", context: "Relationship statement", correct: "sind", explanation: "Wir SIND — plural" },
          { german: "Sie ___ Lehrer, ja?", context: "Asking a teacher (formal)", correct: "sind", explanation: "Sie SIND (formal you uses same form as 'they')" },
          { german: "Das ___ blau.", context: "Describing color", correct: "ist", explanation: "Das = it (neuter) → IST" },
          { german: "Ich ___ 25 Jahre alt.", context: "Your age", correct: "bin", explanation: "Age uses BIN (Ich bin... Jahre alt)" }
        ]
      },
      {
        type: "production",
        difficulty: 3,
        instruction: "Write REAL sentences about yourself and others using SEIN. Mix affirmative, negative, and questions.",
        tasks: [
          {
            prompt: "Introduce yourself: name, nationality, profession, age",
            your_answer: "",
            expected_structure: "Ich bin [Name]. Ich bin [Nationality]. Ich bin [Profession]. Ich bin [Age] Jahre alt."
          },
          {
            prompt: "Ask someone: Are you a student? Where are you from?",
            your_answer: "",
            expected_structure: "Bist du Student/Studentin? Woher bist du?"
          },
          {
            prompt: "Describe a friend: who they are, what they do, where they're from",
            your_answer: "",
            expected_structure: "Mein Freund ist [Name]. Er ist [Profession]. Er ist aus [Place]."
          }
        ]
      }
    ],
    
    spaced_repetition: {
      appears_again_in: ["a1-1-2", "a1-1-3", "a1-2-1", "a1-2-2", "a1-3-1"],
      review_days: [1, 3, 7, 14, 30],
      note: "SEIN appears in almost EVERY German sentence. You'll see it constantly and use it daily. This guarantees reinforcement."
    },
    
    culture_note: "In German, asking 'Wer bist du?' (Who are you?) is a deeper question than just asking for a name. Germans expect you to provide context: your profession, where you're from, what you do. Identity is tied to what you DO, not just who you are. This is very cultural — German society values contribution and purpose.",
    
    real_world_use: "This lesson is your introduction to EVERY German person you'll meet. The first conversation in Germany will follow this structure: 'Hallo, ich bin [Name].' → 'Ich bin aus [England].' → 'Ich bin [Teacher/Student/etc].' You'll use these patterns 100+ times in your first week in Germany.",
    
    goethe_alignment: {
      module: "Goethe A1 Speaking Part 1: Introduce Yourself",
      skill: "Respond to basic biographical questions",
      task_type: "Examiner will ask: 'Wie heißen Sie? / Woher sind Sie? / Was sind Sie von Beruf? / Wie alt sind Sie?' You MUST answer with SEIN."
    },
    
    learning_path_context: "SEIN is the foundation of German. Every future lesson builds on this. In A1.1, you'll add HABEN. In A1.2, you'll use SEIN with adjectives. In higher levels, you'll use SEIN with participles and passive voice. Master SEIN now, and everything else becomes easier."
  }
];
export const ALL_STATIC_LESSONS = LESSON_DATA_A1;
