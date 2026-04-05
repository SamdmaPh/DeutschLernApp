// ─── Grammatik-Referenz: Strukturiert wie DW / Duden ────────────────────────
// Jedes Thema mit Erklärung, Tabellen, Beispielen, Tipps und Übungen

export interface GrammarExample {
  de: string;
  en: string;
  highlight?: string;  // das zu betonende Wort
}

export interface GrammarTable {
  headers: string[];
  rows: string[][];
}

export interface GrammarTip {
  emoji: string;
  text: string;
}

export interface GrammarExercise {
  type: "fill" | "choice" | "translate";
  question: string;
  options?: string[];
  answer: string;
  explanation?: string;
}

export interface GrammarTopic {
  id: string;
  sectionId: string;
  title: string;
  titleEn: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  shortDesc: string;
  explanation: string;   // Ausführliche Erklärung
  tables?: GrammarTable[];
  examples: GrammarExample[];
  tips: GrammarTip[];
  exercises: GrammarExercise[];
}

export interface GrammarSection {
  id: string;
  title: string;
  emoji: string;
  topics: GrammarTopic[];
}

export const GRAMMAR_DATA: GrammarSection[] = [
  // ══════════════════════════════════════════════════════════════
  // VERBEN
  // ══════════════════════════════════════════════════════════════
  {
    id: "verben", title: "Verben", emoji: "🔤",
    topics: [
      {
        id: "konjugation-praesens", sectionId: "verben",
        title: "Konjugation Präsens", titleEn: "Present Tense Conjugation",
        level: "A1",
        shortDesc: "Regelmäßige und unregelmäßige Verben im Präsens",
        explanation: `Im Deutschen verändert sich das Verb je nach Person. Der Stamm des Verbs bleibt (meistens) gleich, aber die Endung ändert sich.\n\n**So findest du den Stamm:** Nimm den Infinitiv (z.B. "machen") und entferne "-en" → "mach-"\n\n**Regelmäßige Verben** folgen immer dem gleichen Muster. Bei **unregelmäßigen Verben** ändert sich manchmal auch der Stammvokal (z.B. sprechen → du sprichst).`,
        tables: [
          {
            headers: ["Person", "Endung", "machen", "arbeiten", "sprechen (!)"],
            rows: [
              ["ich", "-e", "mache", "arbeite", "spreche"],
              ["du", "-st", "machst", "arbeitest", "sprichst"],
              ["er/sie/es", "-t", "macht", "arbeitet", "spricht"],
              ["wir", "-en", "machen", "arbeiten", "sprechen"],
              ["ihr", "-t", "macht", "arbeitet", "sprecht"],
              ["sie/Sie", "-en", "machen", "arbeiten", "sprechen"],
            ]
          }
        ],
        examples: [
          { de: "Ich mache meine Hausaufgaben.", en: "I'm doing my homework.", highlight: "mache" },
          { de: "Du sprichst sehr gut Deutsch!", en: "You speak German very well!", highlight: "sprichst" },
          { de: "Er arbeitet in Berlin.", en: "He works in Berlin.", highlight: "arbeitet" },
          { de: "Wir lernen jeden Tag.", en: "We learn every day.", highlight: "lernen" },
        ],
        tips: [
          { emoji: "💡", text: "Bei Verben auf -t, -d, -n (arbeiten, finden, öffnen) kommt ein extra 'e' dazu: du arbeitest, er arbeitet" },
          { emoji: "⚠️", text: "Unregelmäßige Verben: a→ä (fahren → du fährst), e→i (sprechen → du sprichst), e→ie (lesen → du liest)" },
          { emoji: "🎯", text: "Die Endungen -e, -st, -t, -en, -t, -en gelten für ALLE regelmäßigen Verben!" },
        ],
        exercises: [
          { type: "fill", question: "Ich _____ Deutsch. (lernen)", answer: "lerne", explanation: "ich + Stamm + e = ich lerne" },
          { type: "fill", question: "Du _____ sehr schnell. (sprechen)", answer: "sprichst", explanation: "sprechen ist unregelmäßig: e→i bei du und er/sie/es" },
          { type: "fill", question: "Er _____ in Hamburg. (arbeiten)", answer: "arbeitet", explanation: "Bei Verben auf -t kommt ein extra 'e': arbeit-e-t" },
          { type: "choice", question: "Wir _____ nach Berlin.", options: ["fahrt", "fahren", "fährt", "fährst"], answer: "fahren", explanation: "wir + Infinitiv-Endung: wir fahren" },
          { type: "fill", question: "_____ du Kaffee? (trinken)", answer: "Trinkst", explanation: "du + Stamm + st = du trinkst" },
        ]
      },
      {
        id: "sein-haben", sectionId: "verben",
        title: "SEIN und HABEN", titleEn: "To Be and To Have",
        level: "A1",
        shortDesc: "Die zwei wichtigsten Verben der deutschen Sprache",
        explanation: `SEIN (to be) und HABEN (to have) sind die wichtigsten deutschen Verben. Sie sind beide unregelmäßig — du musst sie auswendig lernen!\n\nSEIN beschreibt **Zustände**: Ich bin müde. Er ist Student.\nHABEN beschreibt **Besitz**: Ich habe ein Auto. Sie hat einen Hund.\n\nBeide werden auch als **Hilfsverben** für das Perfekt gebraucht:\n- "Ich **habe** gegessen" (I have eaten)\n- "Ich **bin** gegangen" (I have gone)`,
        tables: [
          {
            headers: ["Person", "SEIN", "HABEN"],
            rows: [
              ["ich", "bin", "habe"],
              ["du", "bist", "hast"],
              ["er/sie/es", "ist", "hat"],
              ["wir", "sind", "haben"],
              ["ihr", "seid", "habt"],
              ["sie/Sie", "sind", "haben"],
            ]
          }
        ],
        examples: [
          { de: "Ich bin Student.", en: "I am a student.", highlight: "bin" },
          { de: "Bist du müde?", en: "Are you tired?", highlight: "Bist" },
          { de: "Sie hat zwei Kinder.", en: "She has two children.", highlight: "hat" },
          { de: "Wir sind in Berlin.", en: "We are in Berlin.", highlight: "sind" },
          { de: "Haben Sie eine Frage?", en: "Do you have a question? (formal)", highlight: "Haben" },
        ],
        tips: [
          { emoji: "🎯", text: "SEIN = Zustand, Identität, Ort → Ich BIN müde. Ich BIN in Berlin." },
          { emoji: "🎯", text: "HABEN = Besitz, Eigenschaft → Ich HABE Hunger. Ich HABE ein Auto." },
          { emoji: "💡", text: "Merkhilfe für SEIN: ich Bin, du bIst, er Ist — BII!" },
          { emoji: "⚠️", text: "Im Deutschen KEIN Artikel vor Berufen: 'Ich bin Student' (nicht: 'Ich bin ein Student')" },
        ],
        exercises: [
          { type: "fill", question: "Ich _____ 25 Jahre alt. (sein)", answer: "bin" },
          { type: "fill", question: "_____ du Hunger? (haben)", answer: "Hast" },
          { type: "fill", question: "Er _____ Lehrer. (sein)", answer: "ist" },
          { type: "fill", question: "Wir _____ eine Wohnung in Berlin. (haben)", answer: "haben" },
          { type: "choice", question: "_____ Sie Frau Müller?", options: ["Sind", "Haben", "Ist", "Bist"], answer: "Sind", explanation: "Formelles 'Sie' → sind (wie wir)" },
        ]
      },
      {
        id: "perfekt", sectionId: "verben",
        title: "Perfekt (haben/sein)", titleEn: "Present Perfect Tense",
        level: "A2",
        shortDesc: "Vergangenheit ausdrücken: Ich habe gegessen, Ich bin gefahren",
        explanation: `Das Perfekt ist die häufigste Vergangenheitsform im gesprochenen Deutsch.\n\n**Formel:** HABEN/SEIN + Partizip II (am Satzende)\n\n**Mit HABEN:** Die meisten Verben → "Ich **habe** ge**kocht**"\n**Mit SEIN:** Bewegung + Zustandsänderung → "Ich **bin** ge**fahren**"\n\n**Partizip II bilden:**\n- Regelmäßig: ge- + Stamm + -t → gemacht, gekauft, gelernt\n- Unregelmäßig: ge- + Stamm + -en → gegessen, getrunken, gefahren\n- Trennbare Verben: Vorsilbe + ge + Stamm → ein**ge**kauft, auf**ge**standen\n- Verben auf -ieren: KEIN ge- → studiert, telefoniert`,
        tables: [
          {
            headers: ["Typ", "Infinitiv", "Partizip II", "Beispiel"],
            rows: [
              ["regelmäßig", "machen", "gemacht", "Ich habe es gemacht."],
              ["regelmäßig", "kaufen", "gekauft", "Ich habe Brot gekauft."],
              ["unregelmäßig", "essen", "gegessen", "Ich habe Pizza gegessen."],
              ["unregelmäßig", "trinken", "getrunken", "Ich habe Kaffee getrunken."],
              ["mit SEIN", "fahren", "gefahren", "Ich bin nach Berlin gefahren."],
              ["mit SEIN", "gehen", "gegangen", "Ich bin ins Kino gegangen."],
              ["trennbar", "einkaufen", "eingekauft", "Ich habe eingekauft."],
              ["-ieren", "studieren", "studiert", "Er hat in München studiert."],
            ]
          }
        ],
        examples: [
          { de: "Ich habe gestern Deutsch gelernt.", en: "I learned German yesterday.", highlight: "gelernt" },
          { de: "Wir sind nach Hamburg gefahren.", en: "We drove to Hamburg.", highlight: "gefahren" },
          { de: "Hast du schon gegessen?", en: "Have you already eaten?", highlight: "gegessen" },
          { de: "Sie ist um 7 Uhr aufgestanden.", en: "She got up at 7 o'clock.", highlight: "aufgestanden" },
        ],
        tips: [
          { emoji: "🚗", text: "SEIN-Verben = Bewegung von A nach B: gehen, fahren, fliegen, kommen, laufen" },
          { emoji: "🔄", text: "SEIN-Verben = Zustandsänderung: aufwachen, einschlafen, sterben, werden" },
          { emoji: "⚠️", text: "SEIN + bleiben und sein: Ich BIN geblieben. Ich BIN gewesen." },
          { emoji: "💡", text: "Im Süddeutschen sagt man: 'Ich bin gestanden' statt 'Ich habe gestanden'" },
        ],
        exercises: [
          { type: "fill", question: "Ich _____ gestern Pizza gegessen. (haben)", answer: "habe" },
          { type: "fill", question: "Wir _____ nach München gefahren. (sein)", answer: "sind" },
          { type: "choice", question: "Er hat das Buch _____. (lesen)", options: ["gelest", "gelesen", "gelesent", "lesen"], answer: "gelesen" },
          { type: "fill", question: "_____ du schon eingekauft? (haben)", answer: "Hast" },
          { type: "choice", question: "Sie _____ um 6 Uhr aufgestanden.", options: ["hat", "ist", "haben", "sind"], answer: "ist", explanation: "aufstehen = Zustandsänderung → SEIN" },
        ]
      },
      {
        id: "praeteritum", sectionId: "verben",
        title: "Präteritum", titleEn: "Simple Past Tense",
        level: "A2",
        shortDesc: "Schriftliche Vergangenheit: Er ging, sie hatte, es war",
        explanation: `Das Präteritum wird hauptsächlich in der **Schriftsprache** benutzt (Bücher, Nachrichten, Erzählungen).\n\nIm Alltag benutzt man für die Vergangenheit meistens das **Perfekt**.\n\n**Ausnahme:** SEIN, HABEN und Modalverben benutzt man IMMER im Präteritum, auch beim Sprechen!\n- "Ich **war** gestern krank" (nicht: "Ich bin krank gewesen")\n- "Ich **hatte** keine Zeit" (nicht: "Ich habe keine Zeit gehabt")`,
        tables: [
          {
            headers: ["Person", "sein", "haben", "können", "müssen"],
            rows: [
              ["ich", "war", "hatte", "konnte", "musste"],
              ["du", "warst", "hattest", "konntest", "musstest"],
              ["er/sie/es", "war", "hatte", "konnte", "musste"],
              ["wir", "waren", "hatten", "konnten", "mussten"],
              ["ihr", "wart", "hattet", "konntet", "musstet"],
              ["sie/Sie", "waren", "hatten", "konnten", "mussten"],
            ]
          }
        ],
        examples: [
          { de: "Ich war gestern in Berlin.", en: "I was in Berlin yesterday.", highlight: "war" },
          { de: "Er hatte keine Zeit.", en: "He had no time.", highlight: "hatte" },
          { de: "Wir konnten nicht kommen.", en: "We couldn't come.", highlight: "konnten" },
          { de: "Es war einmal ein König...", en: "Once upon a time there was a king...", highlight: "war" },
        ],
        tips: [
          { emoji: "📖", text: "Präteritum = Bücher & Geschichten. Perfekt = Sprechen & Alltag." },
          { emoji: "⚠️", text: "SEIN und HABEN immer im Präteritum: 'Ich war krank', NICHT 'Ich bin krank gewesen'" },
          { emoji: "💡", text: "Merkhilfe: war/hatte klingt natürlicher als 'bin gewesen/habe gehabt'" },
        ],
        exercises: [
          { type: "fill", question: "Gestern _____ ich krank. (sein)", answer: "war" },
          { type: "fill", question: "Wir _____ keine Tickets. (haben)", answer: "hatten" },
          { type: "fill", question: "Er _____ nicht kommen. (können)", answer: "konnte" },
          { type: "choice", question: "Sie _____ Lehrerin. (sein, Prät.)", options: ["war", "ist", "waren", "sein"], answer: "war" },
        ]
      },
      {
        id: "modalverben", sectionId: "verben",
        title: "Modalverben", titleEn: "Modal Verbs",
        level: "A1",
        shortDesc: "können, müssen, wollen, sollen, dürfen, möchten",
        explanation: `Modalverben verändern die Bedeutung des Hauptverbs. Das Modalverb steht an Position 2, das Hauptverb steht am **Satzende im Infinitiv**.\n\n**Die 6 Modalverben:**\n- **können** = Fähigkeit/Möglichkeit (can)\n- **müssen** = Notwendigkeit (must)\n- **wollen** = Wille/Absicht (want to)\n- **sollen** = Empfehlung/Pflicht (should)\n- **dürfen** = Erlaubnis (may)\n- **möchten** = höflicher Wunsch (would like to)`,
        tables: [
          {
            headers: ["Person", "können", "müssen", "wollen", "dürfen", "möchten"],
            rows: [
              ["ich", "kann", "muss", "will", "darf", "möchte"],
              ["du", "kannst", "musst", "willst", "darfst", "möchtest"],
              ["er/sie/es", "kann", "muss", "will", "darf", "möchte"],
              ["wir", "können", "müssen", "wollen", "dürfen", "möchten"],
              ["ihr", "könnt", "müsst", "wollt", "dürft", "möchtet"],
              ["sie/Sie", "können", "müssen", "wollen", "dürfen", "möchten"],
            ]
          }
        ],
        examples: [
          { de: "Ich kann Deutsch sprechen.", en: "I can speak German.", highlight: "kann" },
          { de: "Du musst um 8 Uhr kommen.", en: "You have to come at 8.", highlight: "musst" },
          { de: "Wir wollen nach Berlin fahren.", en: "We want to drive to Berlin.", highlight: "wollen" },
          { de: "Darf ich hier rauchen?", en: "May I smoke here?", highlight: "Darf" },
          { de: "Ich möchte einen Kaffee, bitte.", en: "I would like a coffee, please.", highlight: "möchte" },
        ],
        tips: [
          { emoji: "🔄", text: "Satzstruktur: Modalverb (Position 2) + ... + Infinitiv (ENDE)" },
          { emoji: "⚠️", text: "ich/er haben KEINE Endung: ich kann (nicht: ich kanne), er muss (nicht: er musst)" },
          { emoji: "💡", text: "'möchten' ist eigentlich Konjunktiv II von 'mögen' — die höflichste Art, etwas zu wünschen" },
          { emoji: "🎯", text: "können vs. dürfen: 'Ich KANN schwimmen' (Fähigkeit) vs. 'Ich DARF schwimmen' (Erlaubnis)" },
        ],
        exercises: [
          { type: "fill", question: "Ich _____ Deutsch sprechen. (können)", answer: "kann" },
          { type: "fill", question: "Du _____ morgen kommen. (müssen)", answer: "musst" },
          { type: "fill", question: "_____ ich das Fenster öffnen? (dürfen)", answer: "Darf" },
          { type: "choice", question: "Wir _____ ins Kino gehen.", options: ["will", "wollen", "wollt", "wollst"], answer: "wollen" },
          { type: "fill", question: "Ich _____ einen Tee, bitte. (möchten)", answer: "möchte" },
        ]
      },
      {
        id: "trennbare-verben", sectionId: "verben",
        title: "Trennbare Verben", titleEn: "Separable Verbs",
        level: "A2",
        shortDesc: "aufstehen, einkaufen, anfangen — Verben die sich teilen",
        explanation: `Manche deutsche Verben bestehen aus einem **Präfix + Verb**. Bei trennbaren Verben wandert das Präfix ans **Satzende**.\n\n**Trennbare Präfixe:** ab-, an-, auf-, aus-, ein-, mit-, nach-, vor-, zu-, zurück-\n\n**Beispiel:** auf|stehen → Ich **stehe** um 7 Uhr **auf**.\n\nIm Nebensatz bleibt das Verb zusammen: "..., weil ich um 7 Uhr **aufstehe**."`,
        tables: [
          {
            headers: ["Infinitiv", "Präsens", "Perfekt"],
            rows: [
              ["aufstehen", "Ich stehe um 7 auf.", "Ich bin um 7 aufgestanden."],
              ["einkaufen", "Ich kaufe im Supermarkt ein.", "Ich habe eingekauft."],
              ["anfangen", "Der Film fängt um 8 an.", "Der Film hat um 8 angefangen."],
              ["mitkommen", "Kommst du mit?", "Bist du mitgekommen?"],
              ["zurückkommen", "Wann kommst du zurück?", "Wann bist du zurückgekommen?"],
            ]
          }
        ],
        examples: [
          { de: "Ich stehe jeden Morgen um 7 Uhr auf.", en: "I get up every morning at 7.", highlight: "auf" },
          { de: "Wann fängt der Kurs an?", en: "When does the course start?", highlight: "an" },
          { de: "Kaufst du heute ein?", en: "Are you shopping today?", highlight: "ein" },
        ],
        tips: [
          { emoji: "✂️", text: "Im Hauptsatz TRENNEN: Ich stehe ... auf. Im Nebensatz ZUSAMMEN: ...weil ich aufstehe." },
          { emoji: "💡", text: "Merkhilfe: Betonte Vorsilbe = trennbar. AUFstehen (betont) = trennbar. verSTEHen (unbetont) = nicht trennbar." },
          { emoji: "📝", text: "Perfekt: ge- kommt ZWISCHEN Präfix und Verb: auf-ge-standen, ein-ge-kauft" },
        ],
        exercises: [
          { type: "fill", question: "Ich _____ jeden Tag um 6 Uhr _____. (aufstehen)", answer: "stehe ... auf" },
          { type: "fill", question: "Der Unterricht _____ um 9 Uhr _____. (anfangen)", answer: "fängt ... an" },
          { type: "choice", question: "Wann _____ du _____? (zurückkommen)", options: ["kommst ... zurück", "zurückkommst", "kommst zurück", "zurück ... kommst"], answer: "kommst ... zurück" },
        ]
      },
      {
        id: "reflexive-verben", sectionId: "verben",
        title: "Reflexive Verben", titleEn: "Reflexive Verbs",
        level: "A2",
        shortDesc: "sich waschen, sich freuen, sich treffen",
        explanation: `Bei reflexiven Verben bezieht sich die Handlung auf das Subjekt selbst. Das Reflexivpronomen "sich" ändert sich je nach Person.\n\nEs gibt **echte** reflexive Verben (immer mit sich: sich beeilen) und **unechte** (optional: sich waschen / das Auto waschen).`,
        tables: [
          {
            headers: ["Person", "Reflexivpronomen", "Beispiel (sich freuen)"],
            rows: [
              ["ich", "mich", "Ich freue mich."],
              ["du", "dich", "Du freust dich."],
              ["er/sie/es", "sich", "Er freut sich."],
              ["wir", "uns", "Wir freuen uns."],
              ["ihr", "euch", "Ihr freut euch."],
              ["sie/Sie", "sich", "Sie freuen sich."],
            ]
          }
        ],
        examples: [
          { de: "Ich freue mich auf den Urlaub.", en: "I'm looking forward to the vacation.", highlight: "mich" },
          { de: "Er wäscht sich die Hände.", en: "He washes his hands.", highlight: "sich" },
          { de: "Wir treffen uns um 8 Uhr.", en: "We're meeting at 8 o'clock.", highlight: "uns" },
        ],
        tips: [
          { emoji: "🎯", text: "sich freuen AUF = Zukunft (I look forward to). sich freuen ÜBER = Gegenwart (I'm happy about)." },
          { emoji: "💡", text: "Viele Alltagsverben sind reflexiv: sich setzen, sich anziehen, sich duschen, sich beeilen" },
        ],
        exercises: [
          { type: "fill", question: "Ich freue _____ auf die Party. (sich)", answer: "mich" },
          { type: "fill", question: "Wir treffen _____ morgen. (sich)", answer: "uns" },
          { type: "choice", question: "Er wäscht _____ die Hände.", options: ["mich", "sich", "dich", "euch"], answer: "sich" },
        ]
      },

      // ── Passiv ──
      {
        id: "passiv", sectionId: "verben",
        title: "Passiv", titleEn: "Passive Voice",
        level: "B1",
        shortDesc: "Das Buch wird gelesen. Die Tür wurde geöffnet.",
        explanation: `Im Passiv steht die **Handlung** im Vordergrund, nicht die Person.\n\n**Vorgangspassiv:** werden + Partizip II\n- Präsens: Das Haus **wird gebaut**.\n- Präteritum: Das Haus **wurde gebaut**.\n- Perfekt: Das Haus **ist gebaut worden**.\n\nDer "Täter" steht mit **von + Dativ**: Das Buch wird **von dem Lehrer** gelesen.`,
        tables: [
          {
            headers: ["Zeitform", "Aktiv", "Passiv"],
            rows: [
              ["Präsens", "Man baut das Haus.", "Das Haus wird gebaut."],
              ["Präteritum", "Man baute das Haus.", "Das Haus wurde gebaut."],
              ["Perfekt", "Man hat das Haus gebaut.", "Das Haus ist gebaut worden."],
            ]
          }
        ],
        examples: [
          { de: "Die E-Mail wird geschrieben.", en: "The email is being written.", highlight: "wird" },
          { de: "Das Museum wurde 1990 eröffnet.", en: "The museum was opened in 1990.", highlight: "wurde" },
        ],
        tips: [
          { emoji: "💡", text: "Passiv = 'man'-Sätze umdrehen: 'Man spricht hier Deutsch' → 'Hier wird Deutsch gesprochen'" },
          { emoji: "📰", text: "Passiv ist sehr häufig in Nachrichten und offiziellen Texten" },
        ],
        exercises: [
          { type: "fill", question: "Das Brot _____ jeden Tag gebacken. (werden)", answer: "wird" },
          { type: "fill", question: "Der Brief _____ gestern geschickt. (werden, Prät.)", answer: "wurde" },
        ]
      },

      // ── Konjunktiv II ──
      {
        id: "konjunktiv-2", sectionId: "verben",
        title: "Konjunktiv II", titleEn: "Subjunctive II",
        level: "B1",
        shortDesc: "Ich würde gerne... Wenn ich könnte... Ich hätte gerne...",
        explanation: `Der Konjunktiv II drückt **irreale Situationen**, **höfliche Bitten** und **Wünsche** aus.\n\n**Bildung:** würde + Infinitiv (einfach!)\n- Ich **würde** gerne nach Berlin **fahren**.\n\n**Wichtige eigene Formen** (kein "würde"):\n- sein → wäre, haben → hätte, können → könnte, müssen → müsste\n\n**Höfliche Bitten:** "Könnten Sie mir helfen?" klingt höflicher als "Können Sie mir helfen?"`,
        tables: [
          {
            headers: ["Person", "würde", "wäre", "hätte", "könnte"],
            rows: [
              ["ich", "würde", "wäre", "hätte", "könnte"],
              ["du", "würdest", "wärst", "hättest", "könntest"],
              ["er/sie/es", "würde", "wäre", "hätte", "könnte"],
              ["wir", "würden", "wären", "hätten", "könnten"],
              ["ihr", "würdet", "wärt", "hättet", "könntet"],
              ["sie/Sie", "würden", "wären", "hätten", "könnten"],
            ]
          }
        ],
        examples: [
          { de: "Ich würde gerne nach Berlin fahren.", en: "I would like to go to Berlin.", highlight: "würde" },
          { de: "Wenn ich reich wäre, würde ich reisen.", en: "If I were rich, I would travel.", highlight: "wäre" },
          { de: "Könnten Sie das bitte wiederholen?", en: "Could you please repeat that?", highlight: "Könnten" },
          { de: "Ich hätte gerne einen Kaffee.", en: "I would like a coffee.", highlight: "hätte" },
        ],
        tips: [
          { emoji: "🎩", text: "'Hätte' und 'wäre' und 'könnte' klingen natürlicher als 'würde haben/sein/können'" },
          { emoji: "💡", text: "Höflichkeitsformel im Restaurant: 'Ich hätte gerne...' oder 'Ich würde gerne bestellen...'" },
        ],
        exercises: [
          { type: "fill", question: "Ich _____ gerne einen Tee. (haben, Konj. II)", answer: "hätte" },
          { type: "fill", question: "_____ Sie mir bitte helfen? (können, Konj. II)", answer: "Könnten" },
          { type: "fill", question: "Wenn ich Zeit _____, würde ich kommen. (haben, Konj. II)", answer: "hätte" },
        ]
      },
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // ZEITFORMEN
  // ══════════════════════════════════════════════════════════════
  {
    id: "zeitformen", title: "Zeitformen", emoji: "⏰",
    topics: [
      {
        id: "zeitformen-uebersicht", sectionId: "zeitformen",
        title: "Übersicht aller Zeitformen", titleEn: "Overview of All Tenses",
        level: "A2",
        shortDesc: "Präsens, Perfekt, Präteritum, Plusquamperfekt, Futur I & II",
        explanation: `Das Deutsche hat **6 Zeitformen**. Im Alltag brauchst du vor allem 3:\n\n1. **Präsens** (Gegenwart + Zukunft): Ich **gehe** morgen ins Kino.\n2. **Perfekt** (gesprochene Vergangenheit): Ich **habe** gestern **gegessen**.\n3. **Präteritum** (geschriebene Vergangenheit): Er **ging** nach Hause.\n\nDie anderen 3 kommen später:\n4. **Plusquamperfekt** (Vorvergangenheit): Nachdem ich **gegessen hatte**...\n5. **Futur I** (Zukunft/Vermutung): Ich **werde** kommen.\n6. **Futur II** (abgeschlossene Zukunft): Ich **werde gegessen haben**.`,
        tables: [
          {
            headers: ["Zeitform", "Beispiel", "Wann?"],
            rows: [
              ["Präsens", "Ich lerne Deutsch.", "Gegenwart + Zukunft"],
              ["Perfekt", "Ich habe Deutsch gelernt.", "Vergangenheit (sprechen)"],
              ["Präteritum", "Ich lernte Deutsch.", "Vergangenheit (schreiben)"],
              ["Plusquamperfekt", "Ich hatte Deutsch gelernt.", "Vorvergangenheit"],
              ["Futur I", "Ich werde Deutsch lernen.", "Zukunft / Vermutung"],
              ["Futur II", "Ich werde Deutsch gelernt haben.", "Abgeschlossene Zukunft"],
            ]
          }
        ],
        examples: [
          { de: "Ich esse jetzt. (Präsens)", en: "I'm eating now." },
          { de: "Ich habe gestern gegessen. (Perfekt)", en: "I ate yesterday." },
          { de: "Er ging nach Hause. (Präteritum)", en: "He went home." },
          { de: "Ich werde morgen kommen. (Futur I)", en: "I will come tomorrow." },
        ],
        tips: [
          { emoji: "🎯", text: "80% des Alltags: Präsens + Perfekt. Das reicht für A1-A2!" },
          { emoji: "📖", text: "Präteritum vor allem bei: sein (war), haben (hatte), Modalverben (konnte, musste)" },
          { emoji: "🔮", text: "Futur I klingt oft förmlich. Im Alltag benutzt man Präsens + Zeitangabe: 'Ich komme morgen.'" },
        ],
        exercises: [
          { type: "choice", question: "Welche Zeitform? 'Ich habe Pizza gegessen.'", options: ["Präsens", "Perfekt", "Präteritum", "Futur I"], answer: "Perfekt" },
          { type: "choice", question: "Welche Zeitform? 'Er ging nach Hause.'", options: ["Präsens", "Perfekt", "Präteritum", "Futur I"], answer: "Präteritum" },
        ]
      },
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // NOMEN & ARTIKEL
  // ══════════════════════════════════════════════════════════════
  {
    id: "nomen", title: "Nomen & Artikel", emoji: "📦",
    topics: [
      {
        id: "der-die-das", sectionId: "nomen",
        title: "der, die, das", titleEn: "German Articles (Gender)",
        level: "A1",
        shortDesc: "Jedes Nomen hat ein Geschlecht — und Tipps es zu erraten",
        explanation: `Jedes deutsche Nomen hat ein grammatisches Geschlecht:\n- **der** = maskulin (der Mann)\n- **die** = feminin (die Frau)\n- **das** = neutrum (das Kind)\n\nEs gibt **keine 100% Regel**, aber viele Hinweise:\n\n**Maskulin (der):** Tage, Monate, Jahreszeiten, Himmelsrichtungen, Automarken, alkoholische Getränke (Ausnahme: das Bier)\n\n**Feminin (die):** Zahlen, Motorradmarken, Schiffe, Bäume, Blumen, Endungen: -ung, -heit, -keit, -schaft, -tion, -ie, -ei\n\n**Neutrum (das):** Diminutive (-chen, -lein), Farben als Nomen, Hotels, Kinos, Metalle, Endungen: -ment, -um, -ma`,
        tables: [
          {
            headers: ["Endung", "Artikel", "Beispiele"],
            rows: [
              ["-ung", "die", "die Wohnung, die Zeitung, die Übung"],
              ["-heit", "die", "die Freiheit, die Gesundheit, die Schönheit"],
              ["-keit", "die", "die Möglichkeit, die Freundlichkeit"],
              ["-tion", "die", "die Station, die Information, die Nation"],
              ["-chen", "das", "das Mädchen, das Brötchen, das Häuschen"],
              ["-ment", "das", "das Dokument, das Instrument, das Moment"],
              ["-er (Person)", "der", "der Lehrer, der Fahrer, der Computer"],
            ]
          }
        ],
        examples: [
          { de: "Der Mann trinkt Kaffee.", en: "The man drinks coffee.", highlight: "Der" },
          { de: "Die Wohnung ist schön.", en: "The apartment is beautiful.", highlight: "Die" },
          { de: "Das Mädchen lacht.", en: "The girl laughs.", highlight: "Das" },
        ],
        tips: [
          { emoji: "⚠️", text: "'das Mädchen' ist NEUTRAL (wegen -chen), obwohl es ein Mädchen ist!" },
          { emoji: "🎯", text: "Lern IMMER den Artikel mit dem Nomen zusammen: nicht 'Haus' sondern 'das Haus'" },
          { emoji: "💡", text: "70% der deutschen Nomen sind maskulin oder feminin. Nur 30% sind neutral." },
          { emoji: "📌", text: "-ung ist IMMER feminin. Keine Ausnahme! Wohnung, Zeitung, Meinung, Übung..." },
        ],
        exercises: [
          { type: "choice", question: "_____ Wohnung ist groß.", options: ["Der", "Die", "Das"], answer: "Die", explanation: "-ung → immer die" },
          { type: "choice", question: "_____ Brötchen ist frisch.", options: ["Der", "Die", "Das"], answer: "Das", explanation: "-chen → immer das" },
          { type: "choice", question: "_____ Lehrer ist nett.", options: ["Der", "Die", "Das"], answer: "Der", explanation: "-er (Person) → meistens der" },
          { type: "choice", question: "_____ Information ist wichtig.", options: ["Der", "Die", "Das"], answer: "Die", explanation: "-tion → immer die" },
        ]
      },
      {
        id: "plural", sectionId: "nomen",
        title: "Plural", titleEn: "Plural Forms",
        level: "A1",
        shortDesc: "Wie aus 'ein Buch' → 'viele Bücher' wird",
        explanation: `Im Deutschen gibt es **5 Pluraltypen** — und leider keine einfache Regel. Man muss den Plural mitlernen!\n\nIm Plural ist der Artikel immer **die** (egal ob der/die/das im Singular).\n\n**Die 5 Typen:**\n1. **-e** (+ oft Umlaut): der Tisch → die Tische, der Stuhl → die Stühle\n2. **-er** (+ oft Umlaut): das Kind → die Kinder, das Buch → die Bücher\n3. **-en/-n**: die Frau → die Frauen, die Blume → die Blumen\n4. **-s**: das Auto → die Autos, das Café → die Cafés\n5. **— (keine Endung)** (+ evtl. Umlaut): der Lehrer → die Lehrer, die Mutter → die Mütter`,
        tables: [
          {
            headers: ["Singular", "Plural", "Typ"],
            rows: [
              ["der Tisch", "die Tische", "-e"],
              ["der Stuhl", "die Stühle", "-e + Umlaut"],
              ["das Kind", "die Kinder", "-er"],
              ["das Buch", "die Bücher", "-er + Umlaut"],
              ["die Frau", "die Frauen", "-en"],
              ["das Auto", "die Autos", "-s"],
              ["der Lehrer", "die Lehrer", "— (gleich)"],
              ["die Mutter", "die Mütter", "— + Umlaut"],
            ]
          }
        ],
        examples: [
          { de: "Ich habe zwei Brüder.", en: "I have two brothers.", highlight: "Brüder" },
          { de: "Die Kinder spielen im Park.", en: "The children play in the park.", highlight: "Kinder" },
        ],
        tips: [
          { emoji: "🎯", text: "Im Plural immer DIE — egal welcher Artikel im Singular!" },
          { emoji: "💡", text: "Fremdwörter nehmen meistens -s: das Auto → die Autos, das Hotel → die Hotels" },
          { emoji: "📝", text: "Lern den Plural immer mit: 'das Buch, die Bücher' — nicht nur 'Buch'" },
        ],
        exercises: [
          { type: "fill", question: "das Kind → die _____", answer: "Kinder" },
          { type: "fill", question: "der Stuhl → die _____", answer: "Stühle" },
          { type: "fill", question: "die Frau → die _____", answer: "Frauen" },
          { type: "fill", question: "das Auto → die _____", answer: "Autos" },
        ]
      },
      {
        id: "komposita", sectionId: "nomen",
        title: "Komposita", titleEn: "Compound Nouns",
        level: "A2",
        shortDesc: "Warum Deutsche so lange Wörter haben: Handschuh, Krankenhaus, Staubsauger",
        explanation: `Deutsche lieben es, Wörter zusammenzusetzen! Das letzte Wort bestimmt den Artikel.\n\n**Hand** + **Schuh** = **der Handschuh** (glove, literally: hand-shoe)\n\nDer Artikel kommt vom LETZTEN Wort: der Schuh → der Hand**schuh**\n\n**Berühmte Beispiele:**\n- Kühlschrank (Kühl + Schrank) = refrigerator\n- Handschuh (Hand + Schuh) = glove\n- Staubsauger (Staub + Sauger) = vacuum cleaner`,
        examples: [
          { de: "der Kühlschrank", en: "refrigerator (cool + cabinet)", highlight: "Kühlschrank" },
          { de: "das Krankenhaus", en: "hospital (sick + house)", highlight: "Krankenhaus" },
          { de: "die Handtasche", en: "handbag (hand + bag)", highlight: "Handtasche" },
          { de: "der Staubsauger", en: "vacuum cleaner (dust + sucker)", highlight: "Staubsauger" },
        ],
        tips: [
          { emoji: "🎯", text: "Der LETZTE Teil bestimmt den Artikel: die Tasche → die Hand-tasche" },
          { emoji: "😄", text: "Rekordwort: Donaudampfschifffahrtsgesellschaftskapitän (Danube steamship company captain)" },
        ],
        exercises: [
          { type: "choice", question: "_____ Handschuh (Hand + Schuh)", options: ["der", "die", "das"], answer: "der", explanation: "der Schuh → der Handschuh" },
          { type: "choice", question: "_____ Krankenhaus (krank + Haus)", options: ["der", "die", "das"], answer: "das", explanation: "das Haus → das Krankenhaus" },
        ]
      },
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // DEKLINATION
  // ══════════════════════════════════════════════════════════════
  {
    id: "deklination", title: "Deklination", emoji: "📐",
    topics: [
      {
        id: "nominativ", sectionId: "deklination",
        title: "Nominativ", titleEn: "Nominative Case",
        level: "A1",
        shortDesc: "WER? oder WAS? — Das Subjekt des Satzes",
        explanation: `Der Nominativ ist der **Grundfall**. Das Subjekt (wer etwas tut) steht IMMER im Nominativ.\n\nFrage: **Wer** oder **Was**?\n- **Der Mann** trinkt Kaffee. (Wer trinkt? → Der Mann)\n- **Das Buch** ist gut. (Was ist gut? → Das Buch)`,
        tables: [
          {
            headers: ["", "Maskulin", "Feminin", "Neutrum", "Plural"],
            rows: [
              ["bestimmt", "der", "die", "das", "die"],
              ["unbestimmt", "ein", "eine", "ein", "—"],
              ["negativ", "kein", "keine", "kein", "keine"],
            ]
          }
        ],
        examples: [
          { de: "Der Mann ist Lehrer.", en: "The man is a teacher.", highlight: "Der Mann" },
          { de: "Eine Frau wartet.", en: "A woman is waiting.", highlight: "Eine Frau" },
          { de: "Das ist kein Problem.", en: "That is no problem.", highlight: "kein" },
        ],
        tips: [
          { emoji: "🎯", text: "Nach SEIN steht auch Nominativ: Ich bin EIN Student. Sie ist EINE Lehrerin." },
          { emoji: "💡", text: "Nominativ = Wörterbuch-Form. So lernst du die Wörter." },
        ],
        exercises: [
          { type: "choice", question: "_____ Kaffee ist heiß.", options: ["Der", "Den", "Dem"], answer: "Der" },
          { type: "choice", question: "Das ist _____ gutes Buch.", options: ["ein", "einen", "einem"], answer: "ein" },
        ]
      },
      {
        id: "akkusativ", sectionId: "deklination",
        title: "Akkusativ", titleEn: "Accusative Case",
        level: "A1",
        shortDesc: "WEN? oder WAS? — Das direkte Objekt",
        explanation: `Der Akkusativ markiert das **direkte Objekt** (was wird gemacht?).\n\nFrage: **Wen** oder **Was**?\n- Ich sehe **den Mann**. (Wen sehe ich? → Den Mann)\n\n**Gute Nachricht:** Nur der MASKULINE Artikel ändert sich!\n- der → **den**, ein → **einen**, kein → **keinen**\n- die, das, eine, ein (neutrum) bleiben GLEICH!`,
        tables: [
          {
            headers: ["", "Maskulin", "Feminin", "Neutrum", "Plural"],
            rows: [
              ["bestimmt", "den ❗", "die", "das", "die"],
              ["unbestimmt", "einen ❗", "eine", "ein", "—"],
              ["negativ", "keinen ❗", "keine", "kein", "keine"],
            ]
          }
        ],
        examples: [
          { de: "Ich trinke den Kaffee.", en: "I'm drinking the coffee.", highlight: "den" },
          { de: "Sie kauft einen Kuchen.", en: "She's buying a cake.", highlight: "einen" },
          { de: "Ich habe keine Zeit.", en: "I have no time.", highlight: "keine" },
        ],
        tips: [
          { emoji: "🎯", text: "Nur MASKULIN ändert sich: der→den, ein→einen. Alles andere bleibt gleich!" },
          { emoji: "💡", text: "Verben mit Akkusativ: haben, sehen, kaufen, trinken, essen, lesen, suchen, finden, brauchen" },
          { emoji: "📍", text: "Nach Wechselpräpositionen + Bewegung: Ich gehe IN DEN Park (Akkusativ)" },
        ],
        exercises: [
          { type: "fill", question: "Ich trinke _____ Kaffee. (der)", answer: "den" },
          { type: "fill", question: "Sie kauft _____ Buch. (ein, n)", answer: "ein" },
          { type: "fill", question: "Ich sehe _____ Mann. (der)", answer: "den" },
          { type: "choice", question: "Hast du _____ Schlüssel?", options: ["der", "den", "dem", "des"], answer: "den" },
        ]
      },
      {
        id: "dativ", sectionId: "deklination",
        title: "Dativ", titleEn: "Dative Case",
        level: "A2",
        shortDesc: "WEM? — Das indirekte Objekt",
        explanation: `Der Dativ markiert das **indirekte Objekt** (wem wird etwas gegeben?).\n\nFrage: **Wem**?\n- Ich gebe **dem Mann** das Buch. (Wem gebe ich? → Dem Mann)\n\n**Alle Artikel ändern sich:**\n- der → **dem**, die → **der**, das → **dem**, die (Pl.) → **den** (+n)\n\n**Dativ-Präpositionen:** aus, bei, mit, nach, seit, von, zu → IMMER Dativ!`,
        tables: [
          {
            headers: ["", "Maskulin", "Feminin", "Neutrum", "Plural"],
            rows: [
              ["bestimmt", "dem", "der", "dem", "den (+n)"],
              ["unbestimmt", "einem", "einer", "einem", "—"],
              ["negativ", "keinem", "keiner", "keinem", "keinen"],
            ]
          }
        ],
        examples: [
          { de: "Ich gebe dem Kind einen Apfel.", en: "I give the child an apple.", highlight: "dem Kind" },
          { de: "Ich helfe der Frau.", en: "I help the woman.", highlight: "der Frau" },
          { de: "Ich fahre mit dem Bus.", en: "I'm going by bus.", highlight: "dem Bus" },
          { de: "Er wohnt bei den Eltern.", en: "He lives with his parents.", highlight: "den Eltern" },
        ],
        tips: [
          { emoji: "🎵", text: "Merksatz: 'Aus, bei, mit, nach, seit, von, zu — Dativ immerzu!'" },
          { emoji: "⚠️", text: "Plural-Dativ: Artikel = DEN, und das Nomen bekommt ein -n: die Kinder → den Kindern" },
          { emoji: "💡", text: "Dativ-Verben lernen: helfen, danken, gehören, gefallen, schmecken, passen" },
        ],
        exercises: [
          { type: "fill", question: "Ich helfe _____ Frau. (die)", answer: "der" },
          { type: "fill", question: "Er fährt mit _____ Bus. (der)", answer: "dem" },
          { type: "fill", question: "Ich gebe _____ Kindern Schokolade. (die, Pl.)", answer: "den" },
          { type: "choice", question: "Das Buch gehört _____ Lehrer.", options: ["der", "dem", "den", "des"], answer: "dem" },
        ]
      },
      {
        id: "genitiv", sectionId: "deklination",
        title: "Genitiv", titleEn: "Genitive Case",
        level: "B1",
        shortDesc: "WESSEN? — Besitz und Zugehörigkeit",
        explanation: `Der Genitiv drückt **Besitz** aus und antwortet auf die Frage **Wessen?**\n\n- Das Auto **des Mannes**. (Wessen Auto? → Des Mannes)\n- Die Tasche **der Frau**. (Wessen Tasche? → Der Frau)\n\n**Maskulin + Neutrum** bekommen **-s** oder **-es** am Nomen:\n- der Mann → des Mann**es**, das Kind → des Kind**es**\n\n**Im Alltag** wird der Genitiv oft durch **von + Dativ** ersetzt:\n- "Das Auto von dem Mann" statt "Das Auto des Mannes"`,
        tables: [
          {
            headers: ["", "Maskulin", "Feminin", "Neutrum", "Plural"],
            rows: [
              ["bestimmt", "des (+s/es)", "der", "des (+s/es)", "der"],
              ["unbestimmt", "eines (+s/es)", "einer", "eines (+s/es)", "—"],
            ]
          }
        ],
        examples: [
          { de: "Das Haus des Lehrers ist groß.", en: "The teacher's house is big.", highlight: "des Lehrers" },
          { de: "Die Farbe der Blume ist rot.", en: "The color of the flower is red.", highlight: "der Blume" },
        ],
        tips: [
          { emoji: "📍", text: "Genitiv-Präpositionen: wegen, trotz, während, statt, innerhalb, außerhalb" },
          { emoji: "💡", text: "In der Umgangssprache: 'von + Dativ' statt Genitiv: 'Das Auto von meinem Vater'" },
        ],
        exercises: [
          { type: "fill", question: "Das Auto _____ Mannes ist neu. (der)", answer: "des" },
          { type: "fill", question: "Die Tasche _____ Frau ist schön. (die)", answer: "der" },
        ]
      },
      {
        id: "adjektivdeklination", sectionId: "deklination",
        title: "Adjektivdeklination", titleEn: "Adjective Declension",
        level: "A2",
        shortDesc: "der gute Mann, ein guter Mann, guter Mann — warum?",
        explanation: `Wenn ein Adjektiv **vor** einem Nomen steht, bekommt es eine Endung. Die Endung hängt ab von:\n1. Dem **Artikel** (bestimmt, unbestimmt, kein Artikel)\n2. Dem **Fall** (Nominativ, Akkusativ, Dativ, Genitiv)\n3. Dem **Geschlecht** (der, die, das)\n\n**Faustregel:** Die Endung muss das Geschlecht zeigen. Wenn der Artikel es schon zeigt (der, die, das), reicht -e oder -en. Wenn nicht (ein, mein), muss das Adjektiv es zeigen.`,
        tables: [
          {
            headers: ["Nom.", "Maskulin", "Feminin", "Neutrum"],
            rows: [
              ["der/die/das", "der gute Mann", "die gute Frau", "das gute Kind"],
              ["ein/eine/ein", "ein guter Mann", "eine gute Frau", "ein gutes Kind"],
            ]
          },
          {
            headers: ["Akk.", "Maskulin", "Feminin", "Neutrum"],
            rows: [
              ["den/die/das", "den guten Mann", "die gute Frau", "das gute Kind"],
              ["einen/eine/ein", "einen guten Mann", "eine gute Frau", "ein gutes Kind"],
            ]
          },
        ],
        examples: [
          { de: "Der alte Mann liest.", en: "The old man reads.", highlight: "alte" },
          { de: "Ich sehe einen alten Mann.", en: "I see an old man.", highlight: "alten" },
          { de: "Ein kaltes Bier, bitte!", en: "A cold beer, please!", highlight: "kaltes" },
        ],
        tips: [
          { emoji: "🎯", text: "Nach der/die/das: fast immer -e oder -en. Einfach!" },
          { emoji: "💡", text: "Nach ein/eine/ein muss das Adjektiv die Info tragen: ein gutER Mann, ein gutES Kind" },
          { emoji: "⚠️", text: "Im Akkusativ ändert sich nur maskulin: den guten Mann (sonst wie Nominativ)" },
        ],
        exercises: [
          { type: "fill", question: "Der _____ Mann trinkt Kaffee. (alt)", answer: "alte" },
          { type: "fill", question: "Ich habe ein _____ Buch. (gut, n)", answer: "gutes" },
          { type: "fill", question: "Sie kauft einen _____ Mantel. (schön, m)", answer: "schönen" },
        ]
      },
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // SATZBAU
  // ══════════════════════════════════════════════════════════════
  {
    id: "satzbau", title: "Satzbau", emoji: "🧱",
    topics: [
      {
        id: "hauptsatz", sectionId: "satzbau",
        title: "Hauptsatz", titleEn: "Main Clause (Word Order)",
        level: "A1",
        shortDesc: "Das Verb steht IMMER an Position 2!",
        explanation: `Die wichtigste Regel im Deutschen: **Das Verb steht im Hauptsatz IMMER an Position 2.**\n\nDas heißt: Egal womit der Satz beginnt, das Verb kommt als Zweites.\n\n- **Ich** trinke Kaffee. (Normal: Subjekt + Verb)\n- **Morgen** trinke **ich** Kaffee. (Zeitangabe zuerst → Verb bleibt an Pos. 2)\n- **In Berlin** wohne **ich**. (Ort zuerst → Verb bleibt an Pos. 2)\n\nDas nennt man **Inversion**: Wenn nicht das Subjekt an Position 1 steht, tauschen Subjekt und Verb.`,
        tables: [
          {
            headers: ["Position 1", "Position 2 (VERB)", "Mittelfeld", "Ende"],
            rows: [
              ["Ich", "trinke", "morgens", "Kaffee."],
              ["Morgens", "trinke", "ich", "Kaffee."],
              ["In Berlin", "wohne", "ich", "gerne."],
              ["Das Buch", "lese", "ich", "morgen."],
            ]
          }
        ],
        examples: [
          { de: "Ich lerne Deutsch.", en: "I learn German." },
          { de: "Morgen fahre ich nach Berlin.", en: "Tomorrow I'm going to Berlin.", highlight: "fahre" },
          { de: "In Deutschland trinkt man viel Kaffee.", en: "In Germany people drink a lot of coffee.", highlight: "trinkt" },
        ],
        tips: [
          { emoji: "🎯", text: "Verb = Position 2. IMMER. Keine Ausnahme im Hauptsatz!" },
          { emoji: "💡", text: "Bei Fragen steht das Verb an Position 1: 'Trinken Sie Kaffee?'" },
          { emoji: "📝", text: "TeKaMoLo: Temporal, Kausal, Modal, Lokal — die Reihenfolge im Mittelfeld" },
        ],
        exercises: [
          { type: "choice", question: "Morgen _____ ich nach Berlin.", options: ["ich fahre", "fahre", "fahren", "fährt"], answer: "fahre", explanation: "Verb an Position 2, Subjekt danach (Inversion)" },
          { type: "choice", question: "In Deutschland _____ man Brot zum Frühstück.", options: ["isst", "essen", "esse", "esst"], answer: "isst", explanation: "Verb an Position 2, 'man' = er/sie → isst" },
        ]
      },
      {
        id: "nebensatz", sectionId: "satzbau",
        title: "Nebensatz", titleEn: "Subordinate Clauses",
        level: "A2",
        shortDesc: "weil, dass, wenn, obwohl — Verb ans ENDE!",
        explanation: `Im Nebensatz steht das Verb am **ENDE**.\n\nNebensätze werden eingeleitet durch **Konjunktionen**:\n- **weil** (because): Ich bleibe zu Hause, **weil** ich krank **bin**.\n- **dass** (that): Ich weiß, **dass** du Deutsch **lernst**.\n- **wenn** (if/when): **Wenn** ich Zeit **habe**, komme ich.\n- **obwohl** (although): Ich gehe, **obwohl** es **regnet**.\n\nHaupt- und Nebensatz werden durch ein **Komma** getrennt.`,
        tables: [
          {
            headers: ["Konjunktion", "Bedeutung", "Beispiel"],
            rows: [
              ["weil", "because", "..., weil ich müde bin."],
              ["dass", "that", "..., dass er kommt."],
              ["wenn", "if / when", "Wenn es regnet, ..."],
              ["obwohl", "although", "..., obwohl er krank ist."],
              ["als", "when (past)", "Als ich jung war, ..."],
              ["ob", "whether", "..., ob du kommst."],
            ]
          }
        ],
        examples: [
          { de: "Ich lerne Deutsch, weil ich in Berlin wohne.", en: "I learn German because I live in Berlin.", highlight: "wohne" },
          { de: "Ich weiß, dass du Deutsch lernst.", en: "I know that you learn German.", highlight: "lernst" },
          { de: "Wenn ich Zeit habe, gehe ich spazieren.", en: "When I have time, I go for a walk.", highlight: "habe" },
        ],
        tips: [
          { emoji: "🎯", text: "Nebensatz = Verb am ENDE. Hauptsatz = Verb an Position 2." },
          { emoji: "💡", text: "Wenn der Nebensatz ZUERST kommt, zählt er als Position 1 → Verb des Hauptsatzes an Pos. 2" },
          { emoji: "📝", text: "Immer Komma vor weil, dass, wenn, obwohl, als, ob!" },
        ],
        exercises: [
          { type: "fill", question: "Ich bleibe zu Hause, weil ich krank _____. (sein)", answer: "bin" },
          { type: "fill", question: "Ich weiß, dass er gut Deutsch _____. (sprechen)", answer: "spricht" },
        ]
      },
      {
        id: "fragen", sectionId: "satzbau",
        title: "Fragen", titleEn: "Questions",
        level: "A1",
        shortDesc: "Ja/Nein-Fragen und W-Fragen: Wer? Was? Wo? Wann?",
        explanation: `Es gibt zwei Arten von Fragen:\n\n**1. Ja/Nein-Fragen:** Verb an Position 1\n- **Sprechen** Sie Deutsch? → Ja! / Nein.\n- **Hast** du Zeit? → Ja. / Nein.\n\n**2. W-Fragen:** W-Wort an Pos. 1, Verb an Pos. 2\n- **Wo** wohnst du?\n- **Was** machst du?\n- **Wann** kommst du?\n\n**W-Wörter:** Wer, Was, Wo, Wann, Warum, Wie, Woher, Wohin, Welch-`,
        tables: [
          {
            headers: ["W-Wort", "Bedeutung", "Beispiel"],
            rows: [
              ["Wer?", "Who?", "Wer ist das?"],
              ["Was?", "What?", "Was machst du?"],
              ["Wo?", "Where?", "Wo wohnst du?"],
              ["Wann?", "When?", "Wann kommst du?"],
              ["Warum?", "Why?", "Warum lernst du Deutsch?"],
              ["Wie?", "How?", "Wie geht es dir?"],
              ["Woher?", "Where from?", "Woher kommst du?"],
              ["Wohin?", "Where to?", "Wohin fährst du?"],
            ]
          }
        ],
        examples: [
          { de: "Sprechen Sie Deutsch?", en: "Do you speak German?", highlight: "Sprechen" },
          { de: "Wo ist der Bahnhof?", en: "Where is the train station?", highlight: "Wo" },
          { de: "Wie heißen Sie?", en: "What is your name?", highlight: "Wie" },
        ],
        tips: [
          { emoji: "🎯", text: "Ja/Nein → Verb zuerst. W-Frage → W-Wort zuerst, Verb an Pos. 2." },
          { emoji: "💡", text: "Wo = Ort (wo bist du?). Wohin = Richtung (wohin gehst du?). Woher = Herkunft (woher kommst du?)" },
        ],
        exercises: [
          { type: "fill", question: "_____ wohnst du? — In Berlin.", answer: "Wo" },
          { type: "fill", question: "_____ kommst du? — Aus Spanien.", answer: "Woher" },
          { type: "fill", question: "_____ heißen Sie? — Ich heiße Müller.", answer: "Wie" },
        ]
      },
      {
        id: "konnektoren", sectionId: "satzbau",
        title: "Konnektoren", titleEn: "Connectors",
        level: "B1",
        shortDesc: "und, aber, denn, deshalb, trotzdem — Sätze verbinden",
        explanation: `Konnektoren verbinden Sätze. Ihre Position bestimmt die **Wortstellung**:\n\n**Position 0 (keine Inversion):** und, aber, oder, denn, sondern\n- Ich lerne Deutsch **und** ich wohne in Berlin.\n\n**Position 1 (Inversion):** deshalb, trotzdem, dann, danach, außerdem\n- Ich bin müde, **deshalb** gehe **ich** früh ins Bett.\n\n**Nebensatz (Verb am Ende):** weil, dass, wenn, obwohl, als, ob\n- Ich gehe, **weil** ich müde **bin**.`,
        tables: [
          {
            headers: ["Konnektor", "Typ", "Wortstellung", "Beispiel"],
            rows: [
              ["und", "Pos. 0", "normal", "Ich esse und ich trinke."],
              ["aber", "Pos. 0", "normal", "Ich bin müde, aber ich arbeite."],
              ["deshalb", "Pos. 1", "Inversion", "..., deshalb gehe ich."],
              ["trotzdem", "Pos. 1", "Inversion", "..., trotzdem komme ich."],
              ["weil", "Nebensatz", "Verb am Ende", "..., weil ich müde bin."],
            ]
          }
        ],
        examples: [
          { de: "Ich bin müde, aber ich lerne weiter.", en: "I'm tired, but I keep learning.", highlight: "aber" },
          { de: "Es regnet, deshalb bleibe ich zu Hause.", en: "It's raining, that's why I stay home.", highlight: "deshalb" },
        ],
        tips: [
          { emoji: "🎯", text: "und/aber/oder/denn → Wortstellung ändert sich NICHT" },
          { emoji: "⚠️", text: "deshalb/trotzdem/dann → Verb-Subjekt-Inversion!" },
          { emoji: "💡", text: "'denn' (Pos. 0) = 'weil' (Nebensatz), gleiche Bedeutung, andere Struktur" },
        ],
        exercises: [
          { type: "choice", question: "Es regnet, _____ bleibe ich zu Hause.", options: ["deshalb", "weil", "und", "aber"], answer: "deshalb" },
          { type: "choice", question: "Ich gehe nicht, _____ es regnet.", options: ["deshalb", "weil", "aber", "trotzdem"], answer: "weil" },
        ]
      },
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // PRÄPOSITIONEN
  // ══════════════════════════════════════════════════════════════
  {
    id: "praepo", title: "Präpositionen", emoji: "📍",
    topics: [
      {
        id: "akk-praepo", sectionId: "praepo",
        title: "mit Akkusativ", titleEn: "Prepositions with Accusative",
        level: "A2",
        shortDesc: "durch, für, gegen, ohne, um — immer Akkusativ",
        explanation: `Diese Präpositionen verlangen IMMER den Akkusativ:\n\n**durch** (through), **für** (for), **gegen** (against), **ohne** (without), **um** (around/at)\n\nMerksatz: **"Dogfu"** — Durch, Ohne, Gegen, Für, Um`,
        examples: [
          { de: "Das Geschenk ist für den Lehrer.", en: "The gift is for the teacher.", highlight: "den" },
          { de: "Ich gehe ohne meinen Bruder.", en: "I go without my brother.", highlight: "meinen" },
          { de: "Wir treffen uns um 8 Uhr.", en: "We meet at 8 o'clock.", highlight: "um" },
        ],
        tips: [
          { emoji: "🎵", text: "Merksatz: Durch, Ohne, Gegen, Für, Um → DOGFU → immer Akkusativ!" },
        ],
        exercises: [
          { type: "fill", question: "Das ist für _____ Freund. (mein, m)", answer: "meinen" },
          { type: "fill", question: "Ich gehe durch _____ Park. (der)", answer: "den" },
        ]
      },
      {
        id: "dat-praepo", sectionId: "praepo",
        title: "mit Dativ", titleEn: "Prepositions with Dative",
        level: "A2",
        shortDesc: "aus, bei, mit, nach, seit, von, zu — immer Dativ",
        explanation: `Diese Präpositionen verlangen IMMER den Dativ:\n\n**aus** (from/out of), **bei** (at/near), **mit** (with), **nach** (after/to), **seit** (since), **von** (from/of), **zu** (to)\n\nMerksatz: **"Aus, bei, mit, nach, seit, von, zu — Dativ immerzu!"**`,
        examples: [
          { de: "Ich fahre mit dem Bus.", en: "I'm going by bus.", highlight: "dem" },
          { de: "Ich komme aus der Türkei.", en: "I come from Turkey.", highlight: "der" },
          { de: "Nach dem Essen gehe ich spazieren.", en: "After eating I go for a walk.", highlight: "dem" },
        ],
        tips: [
          { emoji: "🎵", text: "Aus, bei, mit, nach, seit, von, zu — Dativ immerzu!" },
          { emoji: "💡", text: "zu + dem = zum, zu + der = zur, von + dem = vom, bei + dem = beim" },
        ],
        exercises: [
          { type: "fill", question: "Ich fahre mit _____ Zug. (der)", answer: "dem" },
          { type: "fill", question: "Er kommt aus _____ Schweiz. (die)", answer: "der" },
          { type: "fill", question: "Seit _____ Woche lerne ich Deutsch. (eine)", answer: "einer" },
        ]
      },
      {
        id: "wechselpraepo", sectionId: "praepo",
        title: "Wechselpräpositionen", titleEn: "Two-Way Prepositions",
        level: "A2",
        shortDesc: "in, auf, an, über, unter, vor, hinter, neben, zwischen — Akk. oder Dat.?",
        explanation: `Diese 9 Präpositionen können **Akkusativ ODER Dativ** haben:\n\n**in, auf, an, über, unter, vor, hinter, neben, zwischen**\n\n**Regel:**\n- **Wohin?** (Bewegung → Ziel) = **Akkusativ**: Ich gehe **in den** Park.\n- **Wo?** (Position → Ort) = **Dativ**: Ich bin **im** (= in dem) Park.\n\nEinfach: Bewegung = Akkusativ. Stillstand = Dativ.`,
        tables: [
          {
            headers: ["Frage", "Fall", "Beispiel"],
            rows: [
              ["Wohin? (Bewegung)", "Akkusativ", "Ich gehe in den Park."],
              ["Wo? (Position)", "Dativ", "Ich bin im Park."],
              ["Wohin?", "Akkusativ", "Ich lege das Buch auf den Tisch."],
              ["Wo?", "Dativ", "Das Buch liegt auf dem Tisch."],
            ]
          }
        ],
        examples: [
          { de: "Ich gehe in den Supermarkt. (Wohin?)", en: "I'm going to the supermarket.", highlight: "den" },
          { de: "Ich bin im Supermarkt. (Wo?)", en: "I'm in the supermarket.", highlight: "im" },
        ],
        tips: [
          { emoji: "🏃", text: "Bewegung (wohin?) = Akkusativ. Position (wo?) = Dativ." },
          { emoji: "💡", text: "in + dem = im, in + das = ins, an + dem = am, an + das = ans" },
          { emoji: "🎯", text: "stellen/legen/setzen (Akk.) vs. stehen/liegen/sitzen (Dat.)" },
        ],
        exercises: [
          { type: "choice", question: "Ich gehe in _____ Schule. (Wohin?)", options: ["die (Akk.)", "der (Dat.)"], answer: "die (Akk.)", explanation: "Wohin = Bewegung = Akkusativ" },
          { type: "choice", question: "Ich bin in _____ Schule. (Wo?)", options: ["die (Akk.)", "der (Dat.)"], answer: "der (Dat.)", explanation: "Wo = Position = Dativ" },
        ]
      },
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // PRONOMEN
  // ══════════════════════════════════════════════════════════════
  {
    id: "pronomen", title: "Pronomen", emoji: "👆",
    topics: [
      {
        id: "personal", sectionId: "pronomen",
        title: "Personalpronomen", titleEn: "Personal Pronouns",
        level: "A1",
        shortDesc: "ich, du, er, sie, es, wir, ihr, sie — und wann 'Sie'",
        explanation: `Die Personalpronomen ändern sich je nach Fall (Nominativ, Akkusativ, Dativ):\n\n**Besonderheit:** "Sie" (groß geschrieben) = formelle Anrede (Sie sind nett = You are nice, formal)\n"sie" (klein) = she oder they (je nach Kontext)`,
        tables: [
          {
            headers: ["Person", "Nominativ", "Akkusativ", "Dativ"],
            rows: [
              ["ich", "ich", "mich", "mir"],
              ["du", "du", "dich", "dir"],
              ["er", "er", "ihn", "ihm"],
              ["sie (she)", "sie", "sie", "ihr"],
              ["es", "es", "es", "ihm"],
              ["wir", "wir", "uns", "uns"],
              ["ihr", "ihr", "euch", "euch"],
              ["sie (they)", "sie", "sie", "ihnen"],
              ["Sie (formal)", "Sie", "Sie", "Ihnen"],
            ]
          }
        ],
        examples: [
          { de: "Ich sehe ihn.", en: "I see him.", highlight: "ihn" },
          { de: "Kannst du mir helfen?", en: "Can you help me?", highlight: "mir" },
          { de: "Ich gebe ihr das Buch.", en: "I give her the book.", highlight: "ihr" },
        ],
        tips: [
          { emoji: "🎯", text: "Akkusativ: mich, dich, ihn, sie, es, uns, euch, sie/Sie" },
          { emoji: "🎯", text: "Dativ: mir, dir, ihm, ihr, ihm, uns, euch, ihnen/Ihnen" },
          { emoji: "⚠️", text: "du = Freunde, Familie, Kinder. Sie = Fremde, Chefs, offizielle Situationen." },
        ],
        exercises: [
          { type: "fill", question: "Ich sehe _____ (er, Akk.)", answer: "ihn" },
          { type: "fill", question: "Kannst du _____ helfen? (ich, Dat.)", answer: "mir" },
          { type: "fill", question: "Ich gebe _____ das Buch. (sie/she, Dat.)", answer: "ihr" },
        ]
      },
      {
        id: "possessiv", sectionId: "pronomen",
        title: "Possessivpronomen", titleEn: "Possessive Pronouns",
        level: "A1",
        shortDesc: "mein, dein, sein, ihr — Besitz zeigen",
        explanation: `Possessivpronomen zeigen, wem etwas gehört. Sie werden wie "ein/kein" dekliniert.\n\n**Die Grundformen:**\nich → mein, du → dein, er → sein, sie → ihr, es → sein, wir → unser, ihr → euer, sie/Sie → ihr/Ihr`,
        tables: [
          {
            headers: ["Person", "Possessiv", "Beispiel"],
            rows: [
              ["ich", "mein", "mein Buch, meine Tasche"],
              ["du", "dein", "dein Buch, deine Tasche"],
              ["er/es", "sein", "sein Buch, seine Tasche"],
              ["sie", "ihr", "ihr Buch, ihre Tasche"],
              ["wir", "unser", "unser Buch, unsere Tasche"],
              ["ihr", "euer", "euer Buch, eure Tasche"],
              ["sie/Sie", "ihr/Ihr", "ihr Buch, Ihre Tasche"],
            ]
          }
        ],
        examples: [
          { de: "Das ist mein Bruder.", en: "That is my brother.", highlight: "mein" },
          { de: "Wo ist deine Tasche?", en: "Where is your bag?", highlight: "deine" },
          { de: "Sein Auto ist rot.", en: "His car is red.", highlight: "Sein" },
        ],
        tips: [
          { emoji: "🎯", text: "Possessiv + Endung wie 'ein': mein Auto (n), meinen Bruder (m, Akk.), meiner Mutter (f, Dat.)" },
          { emoji: "⚠️", text: "euer → eure (die -e- fällt manchmal weg): euer Buch, aber eure Tasche" },
        ],
        exercises: [
          { type: "fill", question: "Das ist _____ Mutter. (ich)", answer: "meine" },
          { type: "fill", question: "Wo ist _____ Schlüssel? (du, m)", answer: "dein" },
          { type: "fill", question: "_____ Wohnung ist schön. (wir)", answer: "Unsere" },
        ]
      },
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // ADJEKTIVE & ADVERBIEN
  // ══════════════════════════════════════════════════════════════
  {
    id: "adjektive", title: "Adjektive & Adverbien", emoji: "🎨",
    topics: [
      {
        id: "komparativ", sectionId: "adjektive",
        title: "Komparativ", titleEn: "Comparative",
        level: "A2",
        shortDesc: "größer, besser, schneller — Dinge vergleichen",
        explanation: `Der Komparativ vergleicht zwei Dinge: X ist **größer als** Y.\n\n**Bildung:** Adjektiv + **-er** (+ als)\n- schnell → schneller\n- groß → größer (mit Umlaut!)\n\n**Unregelmäßig:**\n- gut → besser\n- viel → mehr\n- gern → lieber\n- hoch → höher`,
        tables: [
          {
            headers: ["Adjektiv", "Komparativ", "Superlativ"],
            rows: [
              ["schnell", "schneller", "am schnellsten"],
              ["groß", "größer", "am größten"],
              ["gut", "besser", "am besten"],
              ["viel", "mehr", "am meisten"],
              ["gern", "lieber", "am liebsten"],
              ["hoch", "höher", "am höchsten"],
              ["alt", "älter", "am ältesten"],
            ]
          }
        ],
        examples: [
          { de: "Berlin ist größer als Hamburg.", en: "Berlin is bigger than Hamburg.", highlight: "größer" },
          { de: "Ich spreche besser Deutsch als Französisch.", en: "I speak German better than French.", highlight: "besser" },
        ],
        tips: [
          { emoji: "🎯", text: "Komparativ + als: 'größer ALS', nicht 'größer wie'" },
          { emoji: "💡", text: "Viele einsilbige Adjektive bekommen Umlaut: alt→älter, jung→jünger, groß→größer" },
        ],
        exercises: [
          { type: "fill", question: "Berlin ist _____ als München. (groß)", answer: "größer" },
          { type: "fill", question: "Ich spreche _____ Deutsch als Englisch. (gut)", answer: "besser" },
          { type: "fill", question: "Der ICE ist _____ als der Regionalzug. (schnell)", answer: "schneller" },
        ]
      },
      {
        id: "superlativ", sectionId: "adjektive",
        title: "Superlativ", titleEn: "Superlative",
        level: "A2",
        shortDesc: "am größten, am besten — das Beste von allen",
        explanation: `Der Superlativ beschreibt das Maximum: X ist **am größten** / der **größte**.\n\n**Zwei Formen:**\n1. **am + Adjektiv + sten**: Berlin ist am größten. (prädikativ)\n2. **der/die/das + Adjektiv + ste**: Berlin ist die größte Stadt. (attributiv, mit Deklination)`,
        examples: [
          { de: "Berlin ist die größte Stadt Deutschlands.", en: "Berlin is the biggest city in Germany.", highlight: "größte" },
          { de: "Das schmeckt am besten!", en: "That tastes the best!", highlight: "am besten" },
        ],
        tips: [
          { emoji: "🎯", text: "am + -sten (alleinstehend) vs. der/die/das + -ste (vor Nomen)" },
          { emoji: "⚠️", text: "Bei -t, -d, -s, -z kommt ein -e- dazu: am kältesten, am größten" },
        ],
        exercises: [
          { type: "fill", question: "Das ist _____ _____! (gut, Superlativ mit 'am')", answer: "am besten" },
          { type: "fill", question: "Berlin ist die _____ Stadt. (groß)", answer: "größte" },
        ]
      },
    ]
  },
];

// Hilfsfunktionen
export const getGrammarSection = (id: string) => GRAMMAR_DATA.find(s => s.id === id);
export const getGrammarTopic = (id: string) => {
  for (const section of GRAMMAR_DATA) {
    const topic = section.topics.find(t => t.id === id);
    if (topic) return topic;
  }
  return null;
};
export const getGrammarByLevel = (level: string) => {
  const topics: GrammarTopic[] = [];
  for (const section of GRAMMAR_DATA) {
    topics.push(...section.topics.filter(t => t.level === level));
  }
  return topics;
};
