// ─── Zusätzliche Grammatik-Themen ───────────────────────────────────────────
import { type GrammarSection } from "./grammarData";

export const GRAMMAR_EXTRA: GrammarSection[] = [
  // ══════════════════════════════════════════════════════════════
  // VERBEN (Erweiterung)
  // ══════════════════════════════════════════════════════════════
  {
    id: "verben_extra", title: "Verben (Erweitert)", emoji: "🔤",
    topics: [
      // ── Imperativ ──
      {
        id: "imperativ", sectionId: "verben_extra",
        title: "Imperativ", titleEn: "Imperative (Commands)",
        level: "A1",
        shortDesc: "Komm! Kommen Sie! Kommt! — Befehle und Bitten",
        explanation: `Der Imperativ wird benutzt für **Befehle**, **Bitten** und **Aufforderungen**.\n\nEs gibt 3 Formen:\n- **du-Form:** Stamm (+ e): Komm! Geh! Lies!\n- **ihr-Form:** wie Präsens: Kommt! Geht! Lest!\n- **Sie-Form:** Infinitiv + Sie: Kommen Sie! Gehen Sie!\n\nBei unregelmäßigen Verben mit e→i Wechsel: du-Form übernimmt den Wechsel.\n- sprechen → **Sprich!** (nicht: Sprech!)\n- lesen → **Lies!** (nicht: Les!)`,
        tables: [{
          headers: ["Infinitiv", "du", "ihr", "Sie"],
          rows: [
            ["kommen", "Komm!", "Kommt!", "Kommen Sie!"],
            ["gehen", "Geh!", "Geht!", "Gehen Sie!"],
            ["sprechen", "Sprich!", "Sprecht!", "Sprechen Sie!"],
            ["lesen", "Lies!", "Lest!", "Lesen Sie!"],
            ["nehmen", "Nimm!", "Nehmt!", "Nehmen Sie!"],
            ["sein", "Sei!", "Seid!", "Seien Sie!"],
            ["haben", "Hab!", "Habt!", "Haben Sie!"],
          ]
        }],
        examples: [
          { de: "Komm bitte her!", en: "Please come here!", highlight: "Komm" },
          { de: "Sprich langsamer!", en: "Speak more slowly!", highlight: "Sprich" },
          { de: "Öffnen Sie bitte die Tür.", en: "Please open the door.", highlight: "Öffnen Sie" },
          { de: "Seid bitte leise!", en: "Please be quiet! (to group)", highlight: "Seid" },
        ],
        tips: [
          { emoji: "🎯", text: "du-Form: Nimm den Stamm, fertig. Bei -e am Ende optional: Komm(e)! Geh(e)!" },
          { emoji: "⚠️", text: "e→i Verben: Sprich! Lies! Nimm! Gib! — KEIN Umlaut bei a→ä: Fahr! (nicht: Fähr!)" },
          { emoji: "💡", text: "Mit 'bitte' klingt alles höflicher: 'Komm bitte!' statt 'Komm!'" },
        ],
        exercises: [
          { type: "fill", question: "_____ bitte das Fenster! (öffnen, du)", answer: "Öffne", explanation: "du-Form: Stamm + e" },
          { type: "fill", question: "_____ leise! (sein, ihr)", answer: "Seid" },
          { type: "fill", question: "_____ Sie bitte Platz! (nehmen)", answer: "Nehmen" },
          { type: "fill", question: "_____ das Buch! (lesen, du)", answer: "Lies", explanation: "e→ie Wechsel im Imperativ" },
        ]
      },

      // ── Plusquamperfekt ──
      {
        id: "plusquamperfekt", sectionId: "verben_extra",
        title: "Plusquamperfekt", titleEn: "Past Perfect Tense",
        level: "B1",
        shortDesc: "Nachdem ich gegessen hatte, ging ich spazieren.",
        explanation: `Das Plusquamperfekt beschreibt eine Handlung, die **vor** einer anderen Vergangenheitshandlung stattfand.\n\n**Formel:** hatte/war (Präteritum) + Partizip II\n\nEs wird oft mit **nachdem** verwendet:\n- **Nachdem** ich gegessen **hatte**, ging ich ins Kino.\n\nDie gleichen Regeln wie beim Perfekt: HABEN oder SEIN als Hilfsverb.`,
        tables: [{
          headers: ["", "mit HABEN", "mit SEIN"],
          rows: [
            ["ich", "hatte ... gemacht", "war ... gefahren"],
            ["du", "hattest ... gemacht", "warst ... gefahren"],
            ["er/sie/es", "hatte ... gemacht", "war ... gefahren"],
            ["wir", "hatten ... gemacht", "waren ... gefahren"],
            ["ihr", "hattet ... gemacht", "wart ... gefahren"],
            ["sie/Sie", "hatten ... gemacht", "waren ... gefahren"],
          ]
        }],
        examples: [
          { de: "Nachdem ich gefrühstückt hatte, ging ich zur Arbeit.", en: "After I had eaten breakfast, I went to work.", highlight: "hatte" },
          { de: "Er war schon gegangen, als ich ankam.", en: "He had already left when I arrived.", highlight: "war" },
          { de: "Wir hatten das Hotel schon gebucht, bevor wir die Bewertungen lasen.", en: "We had already booked the hotel before we read the reviews.", highlight: "hatten" },
        ],
        tips: [
          { emoji: "⏰", text: "Plusquamperfekt = Vergangenheit VOR der Vergangenheit. Wie ein Rückblick im Rückblick." },
          { emoji: "🔗", text: "Oft mit 'nachdem' (Plusquamperfekt) + Hauptsatz (Präteritum/Perfekt)" },
          { emoji: "💡", text: "Gleiche Regel wie Perfekt: Bewegung/Zustandsänderung = SEIN, Rest = HABEN" },
        ],
        exercises: [
          { type: "fill", question: "Nachdem ich das Buch gelesen _____, gab ich es zurück. (haben)", answer: "hatte" },
          { type: "fill", question: "Er _____ schon eingeschlafen, als der Film anfing. (sein)", answer: "war" },
          { type: "choice", question: "Nachdem sie _____, fuhr sie nach Hause.", options: ["eingekauft hatte", "eingekauft hat", "einkauft hatte"], answer: "eingekauft hatte" },
        ]
      },

      // ── Futur I ──
      {
        id: "futur1", sectionId: "verben_extra",
        title: "Futur I", titleEn: "Future Tense I",
        level: "B1",
        shortDesc: "Ich werde morgen kommen. Er wird wohl krank sein.",
        explanation: `Futur I drückt **Zukunft** oder **Vermutungen** aus.\n\n**Formel:** werden + Infinitiv (am Satzende)\n\n**Für Zukunft:** Ich **werde** morgen nach Berlin **fahren**.\n**Für Vermutung:** Er **wird** wohl krank **sein**. (= Er ist wahrscheinlich krank.)\n\nIm Alltag benutzt man oft **Präsens + Zeitangabe** statt Futur I:\n- "Ich komme morgen." = "Ich werde morgen kommen."`,
        tables: [{
          headers: ["Person", "werden", "Beispiel"],
          rows: [
            ["ich", "werde", "Ich werde kommen."],
            ["du", "wirst", "Du wirst es schaffen."],
            ["er/sie/es", "wird", "Er wird kommen."],
            ["wir", "werden", "Wir werden sehen."],
            ["ihr", "werdet", "Ihr werdet es sehen."],
            ["sie/Sie", "werden", "Sie werden kommen."],
          ]
        }],
        examples: [
          { de: "Ich werde nächstes Jahr nach Deutschland reisen.", en: "I will travel to Germany next year.", highlight: "werde" },
          { de: "Es wird morgen regnen.", en: "It will rain tomorrow.", highlight: "wird" },
          { de: "Er wird wohl zu Hause sein.", en: "He's probably at home. (assumption)", highlight: "wird" },
        ],
        tips: [
          { emoji: "💡", text: "Im Alltag: Präsens + Zeitangabe ist natürlicher: 'Ich komme morgen' statt 'Ich werde morgen kommen'" },
          { emoji: "🔮", text: "Futur I für Vermutungen: 'Er wird wohl...' = 'Er ist wahrscheinlich...'" },
          { emoji: "🎯", text: "werden steht an Pos. 2, Infinitiv am ENDE: Ich werde morgen nach Berlin fahren." },
        ],
        exercises: [
          { type: "fill", question: "Ich _____ dich morgen anrufen. (werden)", answer: "werde" },
          { type: "fill", question: "Es _____ sicher schön. (werden)", answer: "wird" },
          { type: "choice", question: "Nächstes Jahr _____ wir nach Japan reisen.", options: ["werde", "werden", "wird", "werdet"], answer: "werden" },
        ]
      },

      // ── Konjunktiv I / Indirekte Rede ──
      {
        id: "konjunktiv1", sectionId: "verben_extra",
        title: "Konjunktiv I / Indirekte Rede", titleEn: "Subjunctive I / Reported Speech",
        level: "B2",
        shortDesc: "Er sagte, er sei krank. Sie meinte, sie habe keine Zeit.",
        explanation: `Der Konjunktiv I wird für die **indirekte Rede** verwendet — wenn man wiedergibt, was jemand anderes gesagt hat.\n\n**Direkte Rede:** Er sagt: "Ich **bin** krank."\n**Indirekte Rede:** Er sagt, er **sei** krank.\n\n**Bildung:** Infinitivstamm + Konjunktiv-Endungen\n- sein: ich sei, du seist, er sei, wir seien\n- haben: ich habe, du habest, er habe, wir haben\n\nWenn Konjunktiv I = Indikativ, nimmt man **Konjunktiv II** als Ersatz:\n- "Sie sagen, sie hätten keine Zeit." (weil 'haben' = 'haben')`,
        tables: [{
          headers: ["Person", "sein (Konj. I)", "haben (Konj. I)", "kommen (Konj. I)"],
          rows: [
            ["ich", "sei", "habe", "komme"],
            ["du", "sei(e)st", "habest", "kommest"],
            ["er/sie/es", "sei", "habe", "komme"],
            ["wir", "seien", "haben*", "kommen*"],
            ["ihr", "seiet", "habet", "kommet"],
            ["sie/Sie", "seien", "haben*", "kommen*"],
          ]
        }],
        examples: [
          { de: "Der Minister sagte, die Lage sei ernst.", en: "The minister said the situation was serious.", highlight: "sei" },
          { de: "Sie behauptete, sie habe nichts gewusst.", en: "She claimed she hadn't known anything.", highlight: "habe" },
          { de: "Er meinte, er könne morgen kommen.", en: "He said he could come tomorrow.", highlight: "könne" },
        ],
        tips: [
          { emoji: "📰", text: "Konjunktiv I = Nachrichtensprache. In Zeitungen und Berichten sehr häufig." },
          { emoji: "💡", text: "Im Alltag benutzt man oft einfach 'dass': 'Er hat gesagt, dass er krank ist.'" },
          { emoji: "⚠️", text: "* Wenn Konj. I = Indikativ (wir haben), nimmt man Konj. II (wir hätten)" },
        ],
        exercises: [
          { type: "fill", question: "Er sagte, er _____ keine Zeit. (haben, Konj. I)", answer: "habe" },
          { type: "fill", question: "Sie meinte, sie _____ krank. (sein, Konj. I)", answer: "sei" },
          { type: "choice", question: "Er berichtete, die Preise _____ gestiegen.", options: ["seien", "sind", "waren", "wären"], answer: "seien" },
        ]
      },

      // ── lassen + Infinitiv ──
      {
        id: "lassen", sectionId: "verben_extra",
        title: "lassen + Infinitiv", titleEn: "lassen + Infinitive",
        level: "B1",
        shortDesc: "Ich lasse mein Auto reparieren. Lass uns gehen!",
        explanation: `**lassen** hat drei Bedeutungen:\n\n1. **Veranlassen** (jemand anderes tut es für mich):\n   Ich **lasse** mein Auto **reparieren**. (= Der Mechaniker repariert es.)\n\n2. **Erlauben/Zulassen:**\n   Sie **lässt** die Kinder **spielen**. (= Sie erlaubt es.)\n\n3. **Vorschlag** (Lass uns...):\n   **Lass** uns ins Kino **gehen**! (= Let's go to the cinema!)`,
        tables: [{
          headers: ["Person", "Präsens", "Perfekt"],
          rows: [
            ["ich", "lasse", "habe ... lassen"],
            ["du", "lässt", "hast ... lassen"],
            ["er/sie/es", "lässt", "hat ... lassen"],
            ["wir", "lassen", "haben ... lassen"],
            ["ihr", "lasst", "habt ... lassen"],
            ["sie/Sie", "lassen", "haben ... lassen"],
          ]
        }],
        examples: [
          { de: "Ich lasse mir die Haare schneiden.", en: "I'm getting my hair cut.", highlight: "lasse" },
          { de: "Lass uns morgen ins Museum gehen!", en: "Let's go to the museum tomorrow!", highlight: "Lass" },
          { de: "Er hat sein Auto reparieren lassen.", en: "He had his car repaired.", highlight: "lassen" },
        ],
        tips: [
          { emoji: "🎯", text: "'Lass uns...' = 'Let's...' — sehr häufig im Alltag!" },
          { emoji: "💡", text: "Perfekt: 'hat ... lassen' (nicht: gelassen): Ich habe den Arzt kommen lassen." },
          { emoji: "✂️", text: "'sich die Haare schneiden lassen' = beim Friseur. 'sich die Haare schneiden' = selbst." },
        ],
        exercises: [
          { type: "fill", question: "Ich _____ mir eine Pizza liefern. (lassen)", answer: "lasse" },
          { type: "fill", question: "_____ uns ein Bier trinken!", answer: "Lass" },
          { type: "choice", question: "Er hat sein Fahrrad reparieren _____.", options: ["gelassen", "lassen", "lasst"], answer: "lassen" },
        ]
      },
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // SATZBAU (Erweiterung)
  // ══════════════════════════════════════════════════════════════
  {
    id: "satzbau_extra", title: "Satzbau (Erweitert)", emoji: "🧱",
    topics: [
      // ── Relativsätze ──
      {
        id: "relativsaetze", sectionId: "satzbau_extra",
        title: "Relativsätze", titleEn: "Relative Clauses",
        level: "B1",
        shortDesc: "Der Mann, der dort steht, ist mein Bruder.",
        explanation: `Relativsätze beschreiben ein Nomen genauer. Sie werden mit **Relativpronomen** eingeleitet.\n\nDas Relativpronomen richtet sich nach:\n- **Genus/Numerus** des Bezugsworts (der Mann → der, die Frau → die)\n- **Kasus** der Funktion im Relativsatz (Subjekt → Nom., Objekt → Akk./Dat.)\n\nDas Verb steht am **Ende** des Relativsatzes (wie bei allen Nebensätzen).`,
        tables: [{
          headers: ["Kasus", "Maskulin", "Feminin", "Neutrum", "Plural"],
          rows: [
            ["Nominativ", "der", "die", "das", "die"],
            ["Akkusativ", "den", "die", "das", "die"],
            ["Dativ", "dem", "der", "dem", "denen"],
            ["Genitiv", "dessen", "deren", "dessen", "deren"],
          ]
        }],
        examples: [
          { de: "Der Mann, der dort steht, ist mein Lehrer.", en: "The man who is standing there is my teacher.", highlight: "der" },
          { de: "Das Buch, das ich lese, ist spannend.", en: "The book that I'm reading is exciting.", highlight: "das" },
          { de: "Die Frau, der ich geholfen habe, war nett.", en: "The woman whom I helped was nice.", highlight: "der" },
          { de: "Die Stadt, in der ich wohne, ist schön.", en: "The city in which I live is beautiful.", highlight: "in der" },
        ],
        tips: [
          { emoji: "🎯", text: "Relativpronomen = fast identisch mit bestimmtem Artikel! Ausnahme: Dativ Plural = denen, Genitiv = dessen/deren" },
          { emoji: "📍", text: "Mit Präposition: Die Stadt, IN DER ich wohne. Der Mann, MIT DEM ich spreche." },
          { emoji: "⚠️", text: "Verb am ENDE: '...der dort steht' (nicht: '...der steht dort')" },
        ],
        exercises: [
          { type: "fill", question: "Der Mann, _____ dort steht, ist mein Chef. (Nom., m)", answer: "der" },
          { type: "fill", question: "Das Buch, _____ ich gekauft habe, ist toll. (Akk., n)", answer: "das" },
          { type: "fill", question: "Die Frau, _____ ich geholfen habe, dankte mir. (Dat., f)", answer: "der" },
          { type: "choice", question: "Die Kinder, _____ ich Schokolade gegeben habe, waren glücklich.", options: ["denen", "die", "den", "deren"], answer: "denen", explanation: "Dativ Plural = denen" },
        ]
      },

      // ── Infinitivsätze ──
      {
        id: "infinitivsaetze", sectionId: "satzbau_extra",
        title: "Infinitivsätze", titleEn: "Infinitive Clauses",
        level: "B1",
        shortDesc: "um...zu, ohne...zu, anstatt...zu — Zweck und Art ausdrücken",
        explanation: `Infinitivsätze ersetzen Nebensätze mit 'dass'. Sie haben **kein Subjekt** — es ist identisch mit dem Hauptsatz.\n\n**um ... zu + Infinitiv** = Zweck (in order to):\nIch lerne Deutsch, **um** in Berlin **zu arbeiten**.\n\n**ohne ... zu + Infinitiv** = ohne dass (without):\nEr ging, **ohne** sich **zu verabschieden**.\n\n**anstatt ... zu + Infinitiv** = stattdessen (instead of):\nSie spielt Handy, **anstatt zu lernen**.`,
        tables: [{
          headers: ["Konstruktion", "Bedeutung", "Beispiel"],
          rows: [
            ["um ... zu", "Zweck (in order to)", "Ich spare, um zu reisen."],
            ["ohne ... zu", "ohne dass (without)", "Er ging, ohne zu zahlen."],
            ["anstatt ... zu", "statt (instead of)", "Sie schläft, anstatt zu lernen."],
            ["zu + Infinitiv", "allgemein", "Ich versuche, pünktlich zu kommen."],
          ]
        }],
        examples: [
          { de: "Ich lerne Deutsch, um in Deutschland zu studieren.", en: "I'm learning German in order to study in Germany.", highlight: "um ... zu" },
          { de: "Er ging weg, ohne sich zu verabschieden.", en: "He left without saying goodbye.", highlight: "ohne ... zu" },
          { de: "Ich habe vor, morgen früh aufzustehen.", en: "I plan to get up early tomorrow.", highlight: "aufzustehen" },
        ],
        tips: [
          { emoji: "🎯", text: "Trennbare Verben: 'zu' kommt ZWISCHEN Präfix und Verb: auf-zu-stehen, ein-zu-kaufen" },
          { emoji: "⚠️", text: "um...zu nur wenn beide Sätze das GLEICHE Subjekt haben!" },
          { emoji: "💡", text: "Verben mit zu-Infinitiv: versuchen, vorhaben, beginnen, aufhören, vergessen, hoffen" },
        ],
        exercises: [
          { type: "fill", question: "Ich lerne Deutsch, _____ in Berlin _____ arbeiten.", answer: "um ... zu" },
          { type: "fill", question: "Er ging, _____ sich _____ verabschieden.", answer: "ohne ... zu" },
          { type: "choice", question: "Ich habe vor, morgen früh _____.", options: ["aufzustehen", "aufstehen zu", "zu aufstehen"], answer: "aufzustehen", explanation: "Trennbar: auf-zu-stehen" },
        ]
      },

      // ── Partizip als Adjektiv ──
      {
        id: "partizip-adjektiv", sectionId: "satzbau_extra",
        title: "Partizip I & II als Adjektiv", titleEn: "Participles as Adjectives",
        level: "C1",
        shortDesc: "der lesende Mann, das gelesene Buch — Partizipien als Adjektive",
        explanation: `Partizipien können wie Adjektive vor Nomen stehen:\n\n**Partizip I** (= -end, aktiv, gleichzeitig):\n- lesen → les**end** → der les**ende** Mann (the reading man = the man who is reading)\n\n**Partizip II** (= ge-...-t/-en, passiv, abgeschlossen):\n- lesen → ge**lesen** → das ge**lesene** Buch (the read book = the book that was read)\n\nSie werden **wie normale Adjektive dekliniert**: der lesende Mann, den lesenden Mann, dem lesenden Mann...`,
        tables: [{
          headers: ["Partizip", "Bildung", "Bedeutung", "Beispiel"],
          rows: [
            ["Partizip I", "Infinitiv + d", "aktiv, gleichzeitig", "der schlafende Hund"],
            ["Partizip II", "ge- + Stamm + t/en", "passiv, abgeschlossen", "das gekochte Essen"],
          ]
        }],
        examples: [
          { de: "Der weinende Junge sucht seine Mutter.", en: "The crying boy is looking for his mother.", highlight: "weinende" },
          { de: "Die geöffnete Tür ließ kalte Luft herein.", en: "The opened door let cold air in.", highlight: "geöffnete" },
          { de: "Das in Berlin stattfindende Festival ist berühmt.", en: "The festival taking place in Berlin is famous.", highlight: "stattfindende" },
        ],
        tips: [
          { emoji: "🎯", text: "Partizip I = -end (gleichzeitig, aktiv): der spielende Hund = der Hund, der spielt" },
          { emoji: "🎯", text: "Partizip II = ge-...-t/en (abgeschlossen, passiv): das gelesene Buch = das Buch, das gelesen wurde" },
          { emoji: "📝", text: "Erweiterte Partizipialattribute (C1+): 'der seit Stunden im Regen wartende Mann'" },
        ],
        exercises: [
          { type: "choice", question: "Der _____ Hund liegt auf dem Sofa. (schlafen)", options: ["schlafende", "geschlafene", "schlafene"], answer: "schlafende", explanation: "Partizip I: schlaf + end + e" },
          { type: "choice", question: "Das _____ Essen schmeckt gut. (kochen)", options: ["kochende", "gekochte", "kochte"], answer: "gekochte", explanation: "Partizip II: ge-Koch-te (passiv, abgeschlossen)" },
        ]
      },
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // NOMEN (Erweiterung)
  // ══════════════════════════════════════════════════════════════
  {
    id: "nomen_extra", title: "Nomen (Erweitert)", emoji: "📦",
    topics: [
      // ── N-Deklination ──
      {
        id: "n-deklination", sectionId: "nomen_extra",
        title: "N-Deklination", titleEn: "N-Declension",
        level: "B1",
        shortDesc: "der Student → den Studenten, dem Studenten, des Studenten",
        explanation: `Einige maskuline Nomen bekommen in **allen Fällen außer Nominativ** ein **-(e)n**.\n\nDas betrifft:\n- Maskuline Nomen auf **-e**: der Junge, der Kunde, der Kollege, der Name\n- Nationalitäten auf **-e**: der Deutsche, der Franzose, der Türke\n- Einige ohne -e: der Student, der Herr, der Mensch, der Nachbar\n\nMerke: Es sind fast immer **männliche Lebewesen** oder **Titel/Berufe**.`,
        tables: [{
          headers: ["Kasus", "Normal (der Mann)", "N-Dekl. (der Student)"],
          rows: [
            ["Nominativ", "der Mann", "der Student"],
            ["Akkusativ", "den Mann", "den Studenten"],
            ["Dativ", "dem Mann", "dem Studenten"],
            ["Genitiv", "des Mannes", "des Studenten"],
          ]
        }],
        examples: [
          { de: "Ich kenne den Studenten.", en: "I know the student.", highlight: "Studenten" },
          { de: "Der Name des Kollegen ist Müller.", en: "The colleague's name is Müller.", highlight: "Kollegen" },
          { de: "Ich helfe dem Kunden.", en: "I'm helping the customer.", highlight: "Kunden" },
        ],
        tips: [
          { emoji: "🎯", text: "Alle Kasus AUSSER Nominativ: -(e)n. Nominativ bleibt normal." },
          { emoji: "💡", text: "Typische N-Dekl. Wörter: Student, Kollege, Kunde, Junge, Herr, Mensch, Nachbar, Name, Polizist" },
          { emoji: "⚠️", text: "Ausnahme 'Herr': Herr → Herrn (nicht: Herren) im Singular: 'Guten Tag, Herrn Müller'" },
        ],
        exercises: [
          { type: "fill", question: "Ich helfe dem _____ (Student).", answer: "Studenten" },
          { type: "fill", question: "Kennen Sie den _____ (Name) des Patienten?", answer: "Namen" },
          { type: "choice", question: "Der Brief ist für Herrn/Herren Müller.", options: ["Herrn", "Herren"], answer: "Herrn" },
        ]
      },

      // ── Nominalisierung ──
      {
        id: "nominalisierung", sectionId: "nomen_extra",
        title: "Nominalisierung", titleEn: "Nominalization",
        level: "B2",
        shortDesc: "das Lesen, das Gute, beim Kochen — Verben und Adjektive als Nomen",
        explanation: `Im Deutschen kann man **Verben** und **Adjektive** in Nomen verwandeln.\n\n**Verben → Nomen** (immer neutrum, Großschreibung):\n- lesen → **das Lesen** (reading)\n- kochen → **das Kochen** (cooking)\n- Beim **Lesen** lerne ich neue Wörter.\n\n**Adjektive → Nomen** (mit Deklination!):\n- gut → **das Gute** (the good thing)\n- krank → **der Kranke** (the sick person)\n- neu → **etwas Neues** (something new)\n\nSehr häufig in formeller Sprache und Wissenschaft.`,
        tables: [{
          headers: ["Quelle", "Nomen", "Beispiel"],
          rows: [
            ["lesen (Verb)", "das Lesen", "Das Lesen macht mir Spaß."],
            ["kochen (Verb)", "das Kochen", "Beim Kochen höre ich Musik."],
            ["gut (Adj.)", "das Gute", "Das Gute ist: morgen ist frei!"],
            ["neu (Adj.)", "etwas Neues", "Gibt es etwas Neues?"],
            ["krank (Adj.)", "der/die Kranke", "Der Kranke braucht Ruhe."],
            ["deutsch (Adj.)", "der/die Deutsche", "Die Deutsche spricht Englisch."],
          ]
        }],
        examples: [
          { de: "Beim Lernen brauche ich Ruhe.", en: "While studying I need quiet.", highlight: "Lernen" },
          { de: "Das Wichtigste ist Gesundheit.", en: "The most important thing is health.", highlight: "Wichtigste" },
          { de: "Gibt es etwas Neues?", en: "Is there anything new?", highlight: "Neues" },
        ],
        tips: [
          { emoji: "🎯", text: "Verb → Nomen: immer DAS + Großschreibung: das Essen, das Lernen, das Reisen" },
          { emoji: "💡", text: "etwas/nichts/viel/wenig + nominalisiertes Adjektiv: etwas Gutes, nichts Neues, viel Interessantes" },
          { emoji: "📝", text: "In akademischen Texten sehr häufig: 'Die Durchführung' statt 'durchführen'" },
        ],
        exercises: [
          { type: "fill", question: "Das _____ macht mir Spaß. (schwimmen → Nomen)", answer: "Schwimmen" },
          { type: "fill", question: "Gibt es etwas _____? (neu → nominalisiert)", answer: "Neues" },
          { type: "choice", question: "_____ Lernen brauche ich Musik. (bei + das)", options: ["Beim", "Bei dem", "Beim (beide richtig)"], answer: "Beim" },
        ]
      },
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // PRONOMEN (Erweiterung)
  // ══════════════════════════════════════════════════════════════
  {
    id: "pronomen_extra", title: "Pronomen (Erweitert)", emoji: "👆",
    topics: [
      // ── Demonstrativpronomen ──
      {
        id: "demonstrativ", sectionId: "pronomen_extra",
        title: "Demonstrativpronomen", titleEn: "Demonstrative Pronouns",
        level: "A2",
        shortDesc: "dieser, diese, dieses — auf Dinge zeigen",
        explanation: `Demonstrativpronomen zeigen auf bestimmte Personen oder Dinge: **dieser/diese/dieses** (this) und **jener/jene/jenes** (that).\n\nSie werden wie bestimmte Artikel dekliniert, aber mit **dies-** oder **jen-** als Stamm.\n\nIm Alltag: **dieser** ist häufig, **jener** wird selten benutzt (eher: "der da").`,
        tables: [{
          headers: ["Kasus", "Maskulin", "Feminin", "Neutrum", "Plural"],
          rows: [
            ["Nominativ", "dieser", "diese", "dieses", "diese"],
            ["Akkusativ", "diesen", "diese", "dieses", "diese"],
            ["Dativ", "diesem", "dieser", "diesem", "diesen"],
          ]
        }],
        examples: [
          { de: "Dieses Buch ist sehr gut.", en: "This book is very good.", highlight: "Dieses" },
          { de: "Ich nehme diesen Kuchen.", en: "I'll take this cake.", highlight: "diesen" },
          { de: "In dieser Stadt gibt es viel zu sehen.", en: "There's a lot to see in this city.", highlight: "dieser" },
        ],
        tips: [
          { emoji: "🎯", text: "Endungen = wie bestimmter Artikel: dieser wie der, diese wie die, dieses wie das" },
          { emoji: "💡", text: "Kurzform in der Umgangssprache: 'Dies hier ist meins' oder 'Das da gefällt mir'" },
        ],
        exercises: [
          { type: "fill", question: "_____ Film ist toll! (dieser, m, Nom.)", answer: "Dieser" },
          { type: "fill", question: "Ich kaufe _____ Tasche. (diese, f, Akk.)", answer: "diese" },
          { type: "fill", question: "In _____ Restaurant essen wir oft. (dieses, n, Dat.)", answer: "diesem" },
        ]
      },

      // ── Indefinitpronomen ──
      {
        id: "indefinit", sectionId: "pronomen_extra",
        title: "Indefinitpronomen", titleEn: "Indefinite Pronouns",
        level: "B1",
        shortDesc: "man, jemand, niemand, etwas, nichts, alle — unbestimmte Mengen",
        explanation: `Indefinitpronomen beziehen sich auf **unbestimmte** Personen oder Dinge.\n\n**Personen:**\n- **man** = Leute im Allgemeinen (one/people): Man spricht hier Deutsch.\n- **jemand** = irgendeine Person (someone)\n- **niemand** = keine Person (nobody)\n- **alle** = alle Personen (everyone)\n\n**Dinge:**\n- **etwas** = irgendein Ding (something)\n- **nichts** = kein Ding (nothing)\n- **alles** = alle Dinge (everything)`,
        tables: [{
          headers: ["Pronomen", "Bedeutung", "Beispiel"],
          rows: [
            ["man", "people/one", "Man sagt, Berlin sei toll."],
            ["jemand", "someone", "Kennt jemand ein gutes Restaurant?"],
            ["niemand", "nobody", "Niemand hat angerufen."],
            ["etwas", "something", "Ich möchte etwas essen."],
            ["nichts", "nothing", "Ich habe nichts verstanden."],
            ["alle/alles", "everyone/everything", "Alle sind eingeladen."],
            ["einige", "some", "Einige Studenten fehlen heute."],
            ["jeder/jede/jedes", "each/every", "Jeder Mensch ist anders."],
          ]
        }],
        examples: [
          { de: "Man darf hier nicht rauchen.", en: "One may not smoke here.", highlight: "Man" },
          { de: "Hat jemand mein Handy gesehen?", en: "Has someone seen my phone?", highlight: "jemand" },
          { de: "Ich habe nichts gehört.", en: "I didn't hear anything.", highlight: "nichts" },
          { de: "Jeder muss seinen Pass mitbringen.", en: "Everyone must bring their passport.", highlight: "Jeder" },
        ],
        tips: [
          { emoji: "🎯", text: "'man' ist IMMER 3. Person Singular: Man spricht, man muss, man kann" },
          { emoji: "⚠️", text: "'man' ≠ 'Mann'! man (Pronomen, klein) vs. der Mann (Nomen, groß)" },
          { emoji: "💡", text: "etwas/nichts + Adjektiv (groß!): etwas Schönes, nichts Besonderes, alles Gute" },
        ],
        exercises: [
          { type: "fill", question: "_____ spricht hier Deutsch. (allgemein)", answer: "Man" },
          { type: "fill", question: "Hat _____ meine Tasche gesehen? (irgendwer)", answer: "jemand" },
          { type: "fill", question: "Ich wünsche dir alles _____! (gut, nominalisiert)", answer: "Gute" },
          { type: "choice", question: "_____ muss pünktlich sein.", options: ["Man", "Mann", "Jemand", "Etwas"], answer: "Man" },
        ]
      },
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // WORTBILDUNG (Neuer Bereich)
  // ══════════════════════════════════════════════════════════════
  {
    id: "wortbildung", title: "Wortbildung", emoji: "🔧",
    topics: [
      // ── Präfixe & Suffixe ──
      {
        id: "praefixe-suffixe", sectionId: "wortbildung",
        title: "Präfixe & Suffixe", titleEn: "Prefixes & Suffixes",
        level: "B1",
        shortDesc: "un-, -lich, -ung, -bar — Neue Wörter aus bekannten bauen",
        explanation: `Mit Vorsilben (Präfixe) und Nachsilben (Suffixe) kannst du aus bekannten Wörtern **neue Wörter bilden**.\n\n**Wichtige Präfixe:**\n- **un-** = Gegenteil: möglich → unmöglich, freundlich → unfreundlich\n- **ur-** = sehr/original: alt → uralt, plötzlich → urplötzlich\n\n**Wichtige Suffixe (Adjektive):**\n- **-lich** = Eigenschaft: freund → freundlich, herz → herzlich\n- **-bar** = möglich: mach → machbar, trink → trinkbar\n- **-ig** = Eigenschaft: Hunger → hungrig, Ruhe → ruhig\n- **-los** = ohne: Arbeit → arbeitslos, Hoffnung → hoffnungslos\n- **-voll** = mit viel: Hoffnung → hoffnungsvoll, Wert → wertvoll\n\n**Suffixe (Nomen):**\n- **-ung** (die): Wohnung, Zeitung, Meinung (immer feminin!)\n- **-heit/-keit** (die): Freiheit, Möglichkeit (immer feminin!)\n- **-schaft** (die): Freundschaft, Gesellschaft (immer feminin!)`,
        tables: [{
          headers: ["Suffix", "Aus", "Ergebnis", "Bedeutung"],
          rows: [
            ["un-", "möglich", "unmöglich", "impossible"],
            ["-lich", "Freund", "freundlich", "friendly"],
            ["-bar", "trinken", "trinkbar", "drinkable"],
            ["-ig", "Hunger", "hungrig", "hungry"],
            ["-los", "Arbeit", "arbeitslos", "unemployed"],
            ["-voll", "Wert", "wertvoll", "valuable"],
            ["-ung", "wohnen", "die Wohnung", "apartment"],
            ["-heit", "frei", "die Freiheit", "freedom"],
            ["-keit", "möglich", "die Möglichkeit", "possibility"],
          ]
        }],
        examples: [
          { de: "Das ist unmöglich!", en: "That's impossible!", highlight: "unmöglich" },
          { de: "Ist das Wasser trinkbar?", en: "Is the water drinkable?", highlight: "trinkbar" },
          { de: "Er ist arbeitslos.", en: "He is unemployed.", highlight: "arbeitslos" },
          { de: "Die Freundlichkeit der Deutschen überrascht mich.", en: "The friendliness of Germans surprises me.", highlight: "Freundlichkeit" },
        ],
        tips: [
          { emoji: "🎯", text: "-ung, -heit, -keit, -schaft = IMMER die (feminin). Keine Ausnahme!" },
          { emoji: "💡", text: "un- funktioniert bei fast allen Adjektiven: glücklich → unglücklich, sicher → unsicher" },
          { emoji: "🔧", text: "-bar = 'kann man ...': essbar (essable), machbar (doable), lesbar (readable)" },
        ],
        exercises: [
          { type: "fill", question: "Das Gegenteil von 'freundlich' ist _____.", answer: "unfreundlich" },
          { type: "fill", question: "Kann man das essen? Ja, das ist _____. (essen + bar)", answer: "essbar" },
          { type: "fill", question: "Er hat keine Arbeit. Er ist _____. (Arbeit + los)", answer: "arbeitslos" },
          { type: "choice", question: "_____ Gesundheit ist wichtig. (Artikel für -heit)", options: ["Der", "Die", "Das"], answer: "Die", explanation: "-heit = immer feminin" },
        ]
      },

      // ── Vorsilben bei Verben ──
      {
        id: "verb-vorsilben", sectionId: "wortbildung",
        title: "Nicht-trennbare Vorsilben", titleEn: "Inseparable Verb Prefixes",
        level: "B1",
        shortDesc: "ver-, be-, er-, ent-, zer-, emp-, miss- — Vorsilben die am Verb kleben",
        explanation: `Nicht-trennbare Vorsilben verändern die Bedeutung des Verbs und bleiben IMMER am Verb:\n\n- **be-** macht intransitive Verben transitiv: antworten → beantworten, suchen → besuchen\n- **ver-** = Veränderung/Fehler: kaufen → verkaufen, stehen → verstehen, laufen → sich verlaufen\n- **er-** = Ergebnis/Anfang: finden → erfinden, zählen → erzählen, öffnen → eröffnen\n- **ent-** = weg/Beginn: decken → entdecken, schuldigen → entschuldigen\n- **zer-** = kaputt: brechen → zerbrechen, stören → zerstören\n- **miss-** = falsch: verstehen → missverstehen, brauchen → missbrauchen\n\n**Perfekt:** KEIN ge-! verstanden (nicht: ge-verstanden)`,
        tables: [{
          headers: ["Vorsilbe", "Grundverb", "Neues Verb", "Bedeutung"],
          rows: [
            ["ver-", "kaufen", "verkaufen", "to sell"],
            ["ver-", "stehen", "verstehen", "to understand"],
            ["be-", "suchen", "besuchen", "to visit"],
            ["be-", "kommen", "bekommen", "to receive"],
            ["er-", "finden", "erfinden", "to invent"],
            ["er-", "zählen", "erzählen", "to tell/narrate"],
            ["ent-", "decken", "entdecken", "to discover"],
            ["zer-", "stören", "zerstören", "to destroy"],
          ]
        }],
        examples: [
          { de: "Ich habe das Buch verkauft.", en: "I sold the book.", highlight: "verkauft" },
          { de: "Können Sie das bitte erklären?", en: "Can you please explain that?", highlight: "erklären" },
          { de: "Kolumbus hat Amerika entdeckt.", en: "Columbus discovered America.", highlight: "entdeckt" },
          { de: "Ich habe mich verlaufen.", en: "I got lost.", highlight: "verlaufen" },
        ],
        tips: [
          { emoji: "⚠️", text: "Perfekt OHNE ge-: verstanden, besucht, erfunden, entdeckt (nicht: ge-verstanden!)" },
          { emoji: "💡", text: "Unbetonte Vorsilbe = nicht trennbar. Betonte = trennbar. verKAUFen (nicht trennbar) vs. EINkaufen (trennbar)" },
          { emoji: "🎯", text: "be- macht Verben transitiv (= brauchen Akkusativ): Ich antworte AUF die Frage → Ich beantworte DIE Frage" },
        ],
        exercises: [
          { type: "fill", question: "Ich habe das Buch _____. (verkaufen, Perfekt)", answer: "verkauft", explanation: "KEIN ge-: verkauft, nicht ge-verkauft" },
          { type: "fill", question: "Wer hat das Telefon _____? (erfinden, Perfekt)", answer: "erfunden" },
          { type: "choice", question: "Das Haus wurde im Krieg _____. (zerstören, Perfekt)", options: ["zerstört", "gezerstört", "zerstören"], answer: "zerstört" },
        ]
      },
    ]
  },
];
