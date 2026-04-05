// ─── Goethe-Prüfungsmaterial: Struktur, Tipps, Beispielaufgaben ─────────────
// Basiert auf offiziellen Goethe-Institut Prüfungsformaten

export interface ExamModule {
  name: string;
  nameEn: string;
  duration: string;
  points: number;
  parts: ExamPart[];
}

export interface ExamPart {
  name: string;
  description: string;
  taskType: string;
  example?: ExamExampleTask;
  tips: string[];
}

export interface ExamExampleTask {
  instruction: string;
  content: string;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface ExamLevel {
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  name: string;
  fullName: string;
  description: string;
  descriptionEn: string;
  canDo: string[];        // "Ich kann..." Statements
  duration: string;       // Gesamtdauer
  passing: string;        // Bestehensgrenze
  fee: string;           // ungefähre Kosten
  modules: ExamModule[];
  generalTips: string[];
  resources: string[];
}

export const EXAM_DATA: ExamLevel[] = [
  // ══════════════════════════════════════════════════════════════
  // A1 — Start Deutsch 1
  // ══════════════════════════════════════════════════════════════
  {
    level: "A1",
    name: "Start Deutsch 1",
    fullName: "Goethe-Zertifikat A1: Start Deutsch 1",
    description: "Die erste Stufe: Alltagssituationen mit einfachen Sätzen meistern.",
    descriptionEn: "The first level: managing everyday situations with simple sentences.",
    canDo: [
      "Sich vorstellen: Name, Alter, Herkunft, Beruf",
      "Einfache Fragen stellen und beantworten",
      "Vertraute Wörter und einfache Sätze verstehen",
      "Kurze, einfache Texte lesen (Schilder, Formulare)",
      "Einfache Formulare ausfüllen",
      "Einfache Fragen zur Person beantworten",
    ],
    duration: "ca. 65 Minuten",
    passing: "60 von 100 Punkten (60%)",
    fee: "ca. 130 €",
    modules: [
      {
        name: "Lesen", nameEn: "Reading", duration: "25 Min.", points: 25,
        parts: [
          {
            name: "Teil 1: Kurzstexte",
            description: "Du liest kurze Texte (Anzeigen, Schilder, E-Mails) und ordnest sie Situationen zu.",
            taskType: "Zuordnung",
            example: {
              instruction: "Lies die Anzeige und die Aufgabe. Welche Anzeige passt?",
              content: "Anzeige A: 'Deutschkurs für Anfänger. Mo-Fr, 9-12 Uhr. Anmeldung: info@vhs.de'\nAnzeige B: 'Restaurant Zum Goldenen Löwen. Mittagstisch ab 6,50€. 11:30-14:00 Uhr'",
              question: "Sie möchten Deutsch lernen. Welche Anzeige passt?",
              options: ["Anzeige A", "Anzeige B"],
              answer: "Anzeige A",
              explanation: "Anzeige A bietet einen Deutschkurs an. Die Schlüsselwörter sind 'Deutschkurs' und 'Anfänger'."
            },
            tips: [
              "Lies zuerst die Aufgabe, dann den Text — du weißt dann, wonach du suchst",
              "Achte auf Schlüsselwörter: Zeiten, Orte, Preise",
              "Du musst nicht jedes Wort verstehen — nur die Hauptinformation finden",
            ]
          },
          {
            name: "Teil 2: Kurze Texte",
            description: "Du liest kurze Mitteilungen und beantwortest Richtig/Falsch-Fragen.",
            taskType: "Richtig/Falsch",
            example: {
              instruction: "Lies den Text. Richtig oder Falsch?",
              content: "Liebe Maria, ich komme morgen um 14 Uhr zum Bahnhof. Kannst du mich abholen? Liebe Grüße, Tom",
              question: "Tom kommt morgen mit dem Zug.",
              options: ["Richtig", "Falsch"],
              answer: "Richtig",
              explanation: "Tom schreibt, dass er zum Bahnhof kommt — das bedeutet, er fährt mit dem Zug."
            },
            tips: [
              "Lies den Text zweimal — beim ersten Mal für das Thema, beim zweiten Mal für Details",
              "Achte auf Negationen (nicht, kein) — sie ändern die Bedeutung komplett",
            ]
          },
          {
            name: "Teil 3: Informationstexte",
            description: "Du liest einen längeren Text (Aushang, Programmheft) und beantwortest Fragen.",
            taskType: "Multiple Choice",
            tips: [
              "Markiere wichtige Informationen im Text",
              "Achte besonders auf Zahlen, Daten und Uhrzeiten",
            ]
          }
        ]
      },
      {
        name: "Hören", nameEn: "Listening", duration: "20 Min.", points: 25,
        parts: [
          {
            name: "Teil 1: Kurze Alltagsgespräche",
            description: "Du hörst 6 kurze Gespräche (z.B. am Bahnhof, im Supermarkt) und beantwortest je eine Frage.",
            taskType: "Multiple Choice (Bild oder Text)",
            tips: [
              "Lies die Frage VOR dem Hören — du weißt dann, worauf du achten musst",
              "Du hörst jeden Text ZWEIMAL — beim ersten Mal das Thema, beim zweiten Mal die Details",
              "Achte auf Zahlen und Uhrzeiten — sie kommen oft in den Fragen vor",
            ]
          },
          {
            name: "Teil 2: Durchsagen",
            description: "Du hörst 4 Ansagen (z.B. am Bahnhof, im Radio) und ordnest Informationen zu.",
            taskType: "Richtig/Falsch",
            tips: [
              "Durchsagen enthalten oft Änderungen: 'Achtung! Der Zug nach München fährt heute von Gleis 5'",
              "Achte auf Wörter wie: Achtung, bitte beachten Sie, leider, geändert",
            ]
          },
          {
            name: "Teil 3: Telefongespräche",
            description: "Du hörst 5 Nachrichten auf dem Anrufbeantworter und notierst Informationen.",
            taskType: "Information ergänzen",
            tips: [
              "Du musst oft Nummern, Uhrzeiten oder Namen notieren",
              "Schreib sofort mit, wenn du Zahlen hörst",
              "Deutsche Telefonnummern werden einzeln gesprochen: 0-1-7-2-...",
            ]
          }
        ]
      },
      {
        name: "Schreiben", nameEn: "Writing", duration: "20 Min.", points: 25,
        parts: [
          {
            name: "Teil 1: Formular ausfüllen",
            description: "Du füllst ein Formular aus (z.B. Anmeldeformular, Bestellung).",
            taskType: "Formular",
            example: {
              instruction: "Füllen Sie das Formular aus.",
              content: "Anmeldeformular Deutschkurs\nVorname: _____\nNachname: _____\nGeburtsdatum: _____\nAdresse: _____\nTelefon: _____\nE-Mail: _____",
              question: "Tragen Sie Ihre Daten ein.",
              answer: "(persönliche Daten)",
              explanation: "Achte auf: Vorname ≠ Nachname, Geburtsdatum im deutschen Format (TT.MM.JJJJ)"
            },
            tips: [
              "Deutsches Datumsformat: Tag.Monat.Jahr (z.B. 15.03.1990)",
              "Vorname = first name, Nachname/Familienname = surname",
              "Adresse: Straße + Hausnummer, PLZ + Ort",
            ]
          },
          {
            name: "Teil 2: Kurze Nachricht",
            description: "Du schreibst eine kurze Nachricht (SMS, E-Mail, Notiz) zu einer Alltagssituation.",
            taskType: "Nachricht (ca. 30 Wörter)",
            example: {
              instruction: "Schreiben Sie eine E-Mail an Ihren Freund.",
              content: "Situation: Sie können morgen nicht zum Deutschkurs kommen. Schreiben Sie an Ihren Freund Tom:\n- Warum können Sie nicht kommen?\n- Was soll Tom für Sie tun?",
              question: "Schreiben Sie ca. 30 Wörter.",
              answer: "Lieber Tom, ich kann morgen leider nicht zum Deutschkurs kommen. Ich bin krank. Kannst du bitte die Hausaufgaben für mich mitbringen? Danke! Liebe Grüße",
              explanation: "Die Nachricht enthält: Anrede, Grund, Bitte, Grußformel. Alle 3 Punkte der Aufgabe sind beantwortet."
            },
            tips: [
              "Beantworte ALLE Punkte der Aufgabe — für jeden fehlenden Punkt gibt es Abzug",
              "Anrede + Grußformel nicht vergessen: 'Lieber Tom' ... 'Liebe Grüße'",
              "Ca. 30 Wörter reichen — nicht zu lang schreiben",
              "Einfache, kurze Sätze sind perfekt für A1",
            ]
          }
        ]
      },
      {
        name: "Sprechen", nameEn: "Speaking", duration: "15 Min.", points: 25,
        parts: [
          {
            name: "Teil 1: Sich vorstellen",
            description: "Du stellst dich der Prüfungsgruppe vor: Name, Alter, Land, Sprachen, Beruf, Hobbys.",
            taskType: "Monolog",
            example: {
              instruction: "Stellen Sie sich vor. Sprechen Sie über die Punkte auf der Karte.",
              content: "Karte: Name? / Alter? / Land? / Sprachen? / Beruf? / Hobby?",
              question: "Erzählen Sie über sich.",
              answer: "Hallo, ich heiße Maria. Ich bin 28 Jahre alt. Ich komme aus Spanien. Ich spreche Spanisch und ein bisschen Deutsch. Ich bin Studentin. Mein Hobby ist Musik hören.",
              explanation: "Jeder Punkt der Karte wird beantwortet. Einfache, klare Sätze. Kein Perfekt nötig!"
            },
            tips: [
              "Übe diese Sätze auswendig — sie kommen in JEDER A1-Prüfung",
              "Einfache Struktur: 'Ich heiße... Ich bin... Ich komme aus... Ich spreche...'",
              "Lächeln und Blickkontakt — du bekommst auch Punkte für Kommunikationsfähigkeit",
            ]
          },
          {
            name: "Teil 2: Fragen stellen und beantworten",
            description: "Du ziehst Wortkarten und stellst der Gruppe Fragen / beantwortest Fragen anderer.",
            taskType: "Dialog mit Karten",
            example: {
              instruction: "Auf Ihrer Karte steht ein Thema. Stellen Sie eine Frage.",
              content: "Karte: 'Hobby'",
              question: "Stellen Sie eine Frage zum Thema.",
              answer: "Was ist dein Hobby? / Hast du ein Hobby? / Was machst du gern?",
              explanation: "Einfache W-Frage oder Ja/Nein-Frage zum Thema."
            },
            tips: [
              "Typische Themen: Hobby, Beruf, Familie, Essen, Wohnung, Freizeit",
              "W-Fragen üben: Was? Wo? Wann? Wie? Warum?",
              "Auch kurze Antworten sind OK: 'Mein Hobby ist Fußball.'",
            ]
          },
          {
            name: "Teil 3: Bitten formulieren",
            description: "Du reagierst auf eine Alltagssituation mit einer Bitte oder Frage.",
            taskType: "Reaktion auf Situation",
            example: {
              instruction: "Reagieren Sie auf die Situation.",
              content: "Situation: Sie sind im Restaurant. Sie möchten ein Glas Wasser bestellen.",
              question: "Was sagen Sie?",
              answer: "Entschuldigung, ich hätte gerne ein Glas Wasser, bitte. / Kann ich ein Glas Wasser haben?",
              explanation: "Höfliche Bitte mit 'bitte', 'Entschuldigung', oder 'ich hätte gerne'."
            },
            tips: [
              "'Ich hätte gerne...' oder 'Kann ich bitte...' sind perfekte Formulierungen",
              "Immer höflich: Entschuldigung + bitte",
              "Du musst keine langen Sätze sagen — Klarheit ist wichtiger als Länge",
            ]
          }
        ]
      }
    ],
    generalTips: [
      "Übe jeden Tag 15 Minuten — Regelmäßigkeit schlägt Intensität",
      "Höre deutsche Podcasts für Anfänger (z.B. 'Slow German')",
      "Lerne die 500 häufigsten deutschen Wörter — sie decken 80% des Alltags ab",
      "Die Prüfung testet ALLTAG, nicht Grammatik — übe echte Situationen",
      "Nutze die Modellsätze vom Goethe-Institut als Übung",
      "Bei Hören: Schlüsselwörter fangen — nicht jedes Wort verstehen müssen",
      "Bei Lesen: Überschriften und fette Wörter zuerst lesen",
      "Bei Schreiben: Alle Punkte der Aufgabe beantworten (auch wenn kurz)",
      "Bei Sprechen: Blickkontakt, lächeln, nicht zu schnell reden",
    ],
    resources: [
      "Goethe-Institut Modellsatz A1 (kostenlos online)",
      "Goethe-Institut Übungssatz A1",
      "DW Nicos Weg A1 (kostenloser Online-Kurs)",
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // A2 — Goethe-Zertifikat A2
  // ══════════════════════════════════════════════════════════════
  {
    level: "A2",
    name: "Goethe-Zertifikat A2",
    fullName: "Goethe-Zertifikat A2",
    description: "Alltägliche Situationen sicher bewältigen. Einfache Gespräche führen.",
    descriptionEn: "Managing everyday situations confidently. Having simple conversations.",
    canDo: [
      "Einfache Gespräche in Alltagssituationen führen",
      "Kurze Texte über vertraute Themen verstehen",
      "Informationen aus Anzeigen und Fahrplänen entnehmen",
      "Kurze persönliche Briefe und E-Mails schreiben",
      "Über die eigene Situation und Erfahrungen berichten",
      "Meinungen zu Alltagsthemen äußern",
    ],
    duration: "ca. 80 Minuten",
    passing: "60 von 100 Punkten (60%)",
    fee: "ca. 150 €",
    modules: [
      {
        name: "Lesen", nameEn: "Reading", duration: "30 Min.", points: 25,
        parts: [
          { name: "Teil 1: Informationstexte", description: "Informationen in kurzen Texten finden (Anzeigen, Aushänge).", taskType: "Zuordnung", tips: ["Schlüsselwörter in der Aufgabe unterstreichen", "Nicht alle Anzeigen passen — ein Distraktor ist immer dabei"] },
          { name: "Teil 2: Zeitungsartikel", description: "Kurze Zeitungstexte lesen und Fragen beantworten.", taskType: "Multiple Choice", tips: ["Lies zuerst die Fragen, dann den Text", "Achte auf Synonyme — die Antwort benutzt oft andere Wörter als der Text"] },
          { name: "Teil 3: Anweisungen", description: "Anweisungen und Hinweise verstehen (Hausordnung, Hinweisschilder).", taskType: "Richtig/Falsch", tips: ["Achte auf 'nicht', 'kein', 'verboten' — Negation ändert alles"] },
          { name: "Teil 4: Leserbrief", description: "Einen kurzen Leserbrief lesen und die Meinung des Autors verstehen.", taskType: "Ja/Nein", tips: ["Achte auf Meinungswörter: 'Ich finde', 'Meiner Meinung nach', 'leider'"] },
        ]
      },
      {
        name: "Hören", nameEn: "Listening", duration: "30 Min.", points: 25,
        parts: [
          { name: "Teil 1: Nachrichten", description: "Telefonische Nachrichten und Ansagen verstehen.", taskType: "Richtig/Falsch", tips: ["Zahlen und Uhrzeiten sofort notieren"] },
          { name: "Teil 2: Gespräche", description: "Alltagsgespräche verstehen (im Geschäft, beim Arzt, am Telefon).", taskType: "Multiple Choice", tips: ["Auf die Stimmung achten — klingt die Person zufrieden oder unzufrieden?"] },
          { name: "Teil 3: Radiosendung", description: "Einen Radiobeitrag verstehen und Fragen beantworten.", taskType: "Richtig/Falsch", tips: ["Beim ersten Hören: Hauptthema erfassen. Beim zweiten Hören: Details."] },
        ]
      },
      {
        name: "Schreiben", nameEn: "Writing", duration: "30 Min.", points: 25,
        parts: [
          { name: "Teil 1: SMS/Kurznachricht", description: "Eine kurze Nachricht als Reaktion auf eine Situation schreiben.", taskType: "Nachricht (ca. 40 Wörter)", tips: ["Informell: 'Lieber/Liebe...', 'Hallo...', 'Viele Grüße'", "Alle 3 Inhaltspunkte beantworten"] },
          { name: "Teil 2: Beitrag in Online-Gästebuch", description: "Deine Meinung oder Erfahrung zu einem Thema schreiben.", taskType: "Text (ca. 40 Wörter)", tips: ["Nutze Konnektoren: 'und', 'aber', 'weil', 'deshalb'", "Einfache Meinungsäußerung: 'Ich finde... gut/schlecht/interessant'"] },
        ]
      },
      {
        name: "Sprechen", nameEn: "Speaking", duration: "15 Min.", points: 25,
        parts: [
          { name: "Teil 1: Über sich erzählen", description: "Ein Alltagsthema beschreiben (z.B. Wohnung, Tagesablauf).", taskType: "Monolog (ca. 1-2 Min.)", tips: ["Strukturiert erzählen: zuerst..., dann..., danach...", "Einfache Sätze sind OK — Hauptsache flüssig"] },
          { name: "Teil 2: Gemeinsam planen", description: "Mit einem Partner etwas planen (z.B. Ausflug, Party).", taskType: "Dialog", tips: ["Vorschläge machen: 'Wollen wir...?', 'Wie wäre es mit...?'", "Reagieren: 'Gute Idee!', 'Das finde ich nicht so gut, weil...'"] },
          { name: "Teil 3: Auf Bilder reagieren", description: "Ein Bild beschreiben und darüber sprechen.", taskType: "Monolog + Reaktion", tips: ["'Auf dem Bild sehe ich...', 'Das erinnert mich an...'", "Eigene Erfahrungen einbringen"] },
        ]
      }
    ],
    generalTips: [
      "Lese deutsche Kinderbücher und einfache Zeitungsartikel",
      "Übe das Schreiben von E-Mails an Freunde auf Deutsch",
      "Höre Podcasts: 'Slow German', 'DW Langsam gesprochene Nachrichten'",
      "Lerne Redemittel auswendig: Meinung äußern, Vorschläge machen",
      "Grammatik-Fokus: Perfekt, Modalverben, Nebensätze mit 'weil' und 'dass'",
    ],
    resources: [
      "Goethe-Institut Modellsatz A2 (kostenlos online)",
      "DW Nicos Weg A2",
      "Hueber 'Fit fürs Goethe-Zertifikat A2'",
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // B1 — Goethe-Zertifikat B1
  // ══════════════════════════════════════════════════════════════
  {
    level: "B1",
    name: "Goethe-Zertifikat B1",
    fullName: "Goethe-Zertifikat B1",
    description: "Die Schwelle zur selbstständigen Sprachverwendung. Voraussetzung für die Einbürgerung.",
    descriptionEn: "The threshold to independent language use. Required for German citizenship.",
    canDo: [
      "Die Hauptpunkte verstehen, wenn klare Standardsprache verwendet wird",
      "Die meisten Situationen auf Reisen in deutschsprachigen Ländern bewältigen",
      "Sich einfach und zusammenhängend über vertraute Themen äußern",
      "Über Erfahrungen und Ereignisse berichten, Träume und Ziele beschreiben",
      "Kurze Begründungen und Erklärungen geben",
      "Texte wie Briefe, E-Mails und Berichte schreiben",
    ],
    duration: "ca. 3,5 Stunden",
    passing: "60% pro Modul (jedes Modul muss einzeln bestanden werden!)",
    fee: "ca. 260 €",
    modules: [
      {
        name: "Lesen", nameEn: "Reading", duration: "65 Min.", points: 100,
        parts: [
          { name: "Teil 1: Blog/Forumsbeitrag", description: "Längere Texte lesen und die Hauptaussagen verstehen.", taskType: "Richtig/Falsch", tips: ["Auf Meinungswörter achten: 'meiner Meinung nach', 'ich finde', 'leider'"] },
          { name: "Teil 2: Zeitungsartikel", description: "Informationen aus Zeitungsartikeln entnehmen.", taskType: "Multiple Choice", tips: ["Vorsicht mit Distraktoren — oft klingt eine falsche Antwort sehr plausibel"] },
          { name: "Teil 3: Anzeigen/Situationen", description: "Anzeigen konkreten Situationen zuordnen.", taskType: "Zuordnung", tips: ["Systematisch: Jede Anzeige durchgehen und auf Schlüsselwörter prüfen"] },
          { name: "Teil 4: Leserbrief", description: "Die Meinung des Autors in einem Leserbrief verstehen.", taskType: "Ja/Nein/nicht im Text", tips: ["'Nicht im Text' = Die Information wird überhaupt nicht erwähnt, weder ja noch nein"] },
          { name: "Teil 5: Gebrauchsanweisung", description: "Anweisungen in Hausordnungen, Gebrauchsanleitungen etc. verstehen.", taskType: "Multiple Choice", tips: ["Achte auf Modalverben: 'muss', 'darf nicht', 'soll'"] },
        ]
      },
      {
        name: "Hören", nameEn: "Listening", duration: "40 Min.", points: 100,
        parts: [
          { name: "Teil 1: Alltag", description: "Gespräche im Alltag verstehen.", taskType: "Richtig/Falsch", tips: ["Vorsicht: Die Sprecher korrigieren sich oft — das Letztgesagte zählt!"] },
          { name: "Teil 2: Vortrag/Führung", description: "Einem Vortrag oder einer Führung folgen.", taskType: "Multiple Choice", tips: ["Stichpunkte mitschreiben, nicht ganze Sätze"] },
          { name: "Teil 3: Alltagsgespräch", description: "Ein Alltagsgespräch im Detail verstehen.", taskType: "Richtig/Falsch", tips: ["Achte auf Stimmung und Absicht der Sprecher"] },
          { name: "Teil 4: Radiodiskussion", description: "Meinungen in einer Diskussion erkennen.", taskType: "Zuordnung", tips: ["Wer sagt was? Achte darauf, WELCHER Sprecher die Aussage macht"] },
        ]
      },
      {
        name: "Schreiben", nameEn: "Writing", duration: "60 Min.", points: 100,
        parts: [
          { name: "Aufgabe 1: Formeller Brief", description: "Einen formellen Brief/E-Mail schreiben (Beschwerde, Anfrage, Bewerbung).", taskType: "Brief (ca. 80 Wörter)", tips: [
            "Formeller Stil: 'Sehr geehrte Damen und Herren,' ... 'Mit freundlichen Grüßen'",
            "Alle Inhaltspunkte bearbeiten",
            "Konnektoren verwenden: 'außerdem', 'deshalb', 'trotzdem'",
          ] },
          { name: "Aufgabe 2: Diskussionsbeitrag", description: "Deine Meinung zu einem Thema schreiben.", taskType: "Forumsbeitrag (ca. 80 Wörter)", tips: [
            "Struktur: Meinung + Begründung + Beispiel",
            "'Ich bin der Meinung, dass...', 'Einerseits... andererseits...'",
            "Pro- und Contra-Argumente zeigen → höhere Punktzahl",
          ] },
          { name: "Aufgabe 3: Informelle E-Mail", description: "Auf eine E-Mail eines Freundes antworten.", taskType: "E-Mail (ca. 40 Wörter)", tips: [
            "Informeller Ton: 'Liebe/r...', 'Viele Grüße'",
            "Auf alle Punkte der ursprünglichen E-Mail eingehen",
          ] },
        ]
      },
      {
        name: "Sprechen", nameEn: "Speaking", duration: "15 Min.", points: 100,
        parts: [
          { name: "Teil 1: Gemeinsam planen", description: "Mit deinem Partner etwas planen (Ausflug, Fest, Überraschung).", taskType: "Paaraufgabe", tips: [
            "Vorschläge: 'Sollen wir...?', 'Ich schlage vor, dass...', 'Wie wäre es, wenn...?'",
            "Auf den Partner eingehen: 'Das ist eine gute Idee.', 'Da bin ich nicht sicher.'",
            "Einigung finden: 'Dann machen wir das so.'",
          ] },
          { name: "Teil 2: Präsentation", description: "Ein Thema präsentieren (z.B. Haustiere, Sport, Medien).", taskType: "Monolog (ca. 3-4 Min.)", tips: [
            "Struktur: Einleitung → Situation im Heimatland → Eigene Meinung → Vor-/Nachteile → Schluss",
            "Redemittel: 'In meinem Heimatland ist es so, dass...', 'Ich persönlich finde...'",
            "Nicht ablesen — Stichpunkte als Hilfe sind OK",
          ] },
          { name: "Teil 3: Rückmeldung", description: "Fragen zur Präsentation des Partners stellen und beantworten.", taskType: "Dialog", tips: [
            "Eine echte Frage stellen, nicht nur 'Was meinst du?'",
            "'Das finde ich auch' oder 'Da habe ich eine andere Meinung' + Begründung",
          ] },
        ]
      }
    ],
    generalTips: [
      "B1 ist die WICHTIGSTE Prüfung — Voraussetzung für Einbürgerung und viele Jobs",
      "Jedes Modul muss EINZELN bestanden werden (min. 60%)",
      "Übe formelle Briefe: Beschwerde, Anfrage, Absage, Bewerbung",
      "Lerne Redemittel für Meinungsäußerung und Argumentation",
      "Grammatik: Nebensätze, Passiv, Konjunktiv II, Relativsätze",
      "Höre deutsche Radiosender und Nachrichten",
      "Die mündliche Prüfung ist eine Paarprüfung — übe mit einem Partner",
      "Nutze den Modellsatz und Übungssatz vom Goethe-Institut",
    ],
    resources: [
      "Goethe-Institut Modellsatz B1 (kostenlos online)",
      "Goethe-Institut Übungssatz B1",
      "DW Nicos Weg B1",
      "Hueber 'Fit fürs Goethe-Zertifikat B1'",
      "Cornelsen 'Prüfungstraining B1'",
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // B2 — Goethe-Zertifikat B2
  // ══════════════════════════════════════════════════════════════
  {
    level: "B2",
    name: "Goethe-Zertifikat B2",
    fullName: "Goethe-Zertifikat B2",
    description: "Selbstständig Deutsch verwenden. Voraussetzung für Studium und viele Berufe.",
    descriptionEn: "Using German independently. Required for university admission and many professions.",
    canDo: [
      "Hauptinhalte komplexer Texte verstehen — auch Fachdiskussionen",
      "Sich spontan und fließend verständigen",
      "Sich zu einem breiten Themenspektrum klar und detailliert ausdrücken",
      "Einen Standpunkt zu einer aktuellen Frage erläutern",
      "Vor- und Nachteile verschiedener Möglichkeiten angeben",
    ],
    duration: "ca. 3,5 Stunden",
    passing: "60% pro Modul",
    fee: "ca. 280 €",
    modules: [
      {
        name: "Lesen", nameEn: "Reading", duration: "65 Min.", points: 100,
        parts: [
          { name: "Teil 1-5", description: "Verschiedene Textarten: Artikel, Kommentare, Ratgeber, wissenschaftliche Texte.", taskType: "Multiple Choice / Zuordnung / Richtig-Falsch", tips: ["Akademisches Vokabular üben", "Textstruktur erkennen: Einleitung, Hauptteil, Schluss"] },
        ]
      },
      {
        name: "Hören", nameEn: "Listening", duration: "40 Min.", points: 100,
        parts: [
          { name: "Teil 1-4", description: "Vorträge, Interviews, Diskussionen, Radio- und Fernsehsendungen.", taskType: "Multiple Choice / Zuordnung", tips: ["Akademische Hörtexte üben", "Auf implizite Meinungen und Ironie achten"] },
        ]
      },
      {
        name: "Schreiben", nameEn: "Writing", duration: "75 Min.", points: 100,
        parts: [
          { name: "Aufgabe 1: Argumentation", description: "Einen argumentativen Text zu einem Thema schreiben.", taskType: "Aufsatz (ca. 150-200 Wörter)", tips: ["These → Argument → Beispiel → Gegenargument → Schluss", "Konjunktionen: 'einerseits/andererseits', 'zwar...aber', 'obwohl'"] },
          { name: "Aufgabe 2: Formeller Brief", description: "Beschwerde, Anfrage, oder Stellungnahme.", taskType: "Brief (ca. 150 Wörter)", tips: ["Konjunktiv II für höfliche Bitten: 'Ich würde mich freuen, wenn...'", "Klar strukturieren: Betreff, Einleitung, Hauptteil, Schluss, Grußformel"] },
        ]
      },
      {
        name: "Sprechen", nameEn: "Speaking", duration: "15 Min.", points: 100,
        parts: [
          { name: "Teil 1: Vortrag", description: "Einen Kurzvortrag zu einem Thema halten.", taskType: "Monolog (ca. 4 Min.)", tips: ["Pro und Contra darstellen", "Eigene Erfahrung einbeziehen", "Fachvokabular verwenden"] },
          { name: "Teil 2: Diskussion", description: "Mit dem Partner über ein Thema diskutieren.", taskType: "Dialog", tips: ["Auf den Partner eingehen", "Kompromisse vorschlagen", "Höflich widersprechen: 'Ich verstehe Ihren Punkt, aber...'"] },
        ]
      }
    ],
    generalTips: [
      "Lese Zeitungsartikel (ZEIT Online, Spiegel Online) regelmäßig",
      "Höre Podcasts und Interviews auf Deutsch",
      "Schreibe argumentative Texte zu aktuellen Themen",
      "Grammatik-Fokus: Partizip I+II als Adjektiv, erweitertes Partizip, Passiv-Alternativen",
      "Wortschatz erweitern: Synonyme, Redewendungen, Fachbegriffe",
    ],
    resources: [
      "Goethe-Institut Modellsatz B2",
      "Hueber 'Fit fürs Goethe-Zertifikat B2'",
      "Klett 'So geht's zum Goethe-Zertifikat B2'",
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // C1 — Goethe-Zertifikat C1
  // ══════════════════════════════════════════════════════════════
  {
    level: "C1",
    name: "Goethe-Zertifikat C1",
    fullName: "Goethe-Zertifikat C1",
    description: "Kompetente Sprachverwendung. Für akademische und berufliche Kontexte.",
    descriptionEn: "Proficient language use. For academic and professional contexts.",
    canDo: [
      "Lange, komplexe Texte verstehen und Bedeutungen erkennen",
      "Sich spontan und fließend ausdrücken, ohne nach Worten zu suchen",
      "Die Sprache flexibel und effektiv für soziale, akademische und berufliche Zwecke einsetzen",
      "Sich klar, strukturiert und ausführlich zu komplexen Sachverhalten äußern",
    ],
    duration: "ca. 3 Stunden 40 Min.",
    passing: "60% pro Modul",
    fee: "ca. 300 €",
    modules: [
      { name: "Lesen", nameEn: "Reading", duration: "70 Min.", points: 100, parts: [
        { name: "Teil 1-3", description: "Wissenschaftliche Texte, Kommentare, Sachbücher. Detailliertes und globales Verstehen.", taskType: "Multiple Choice / Zuordnung / Lückentext", tips: ["Komplexe Satzstrukturen analysieren", "Implizite Informationen erkennen"] },
      ] },
      { name: "Hören", nameEn: "Listening", duration: "40 Min.", points: 100, parts: [
        { name: "Teil 1-2", description: "Vorträge, Interviews, Gesprächsrunden zu aktuellen Themen.", taskType: "Multiple Choice / Notizen", tips: ["Mitschreiben während des Hörens", "Auf rhetorische Mittel achten"] },
      ] },
      { name: "Schreiben", nameEn: "Writing", duration: "80 Min.", points: 100, parts: [
        { name: "Aufgabe 1", description: "Erörterung zu einem komplexen Thema auf Basis einer Grafik.", taskType: "Aufsatz (ca. 250 Wörter)", tips: ["Grafik beschreiben → Interpretation → Eigene Meinung", "Nominalisierungen und Passiv verwenden"] },
        { name: "Aufgabe 2", description: "Formeller Brief oder Stellungnahme.", taskType: "Text (ca. 200 Wörter)", tips: ["Differenzierte Argumentation", "Redemittel: 'Es ist unbestritten, dass...', 'Man darf nicht vergessen, dass...'"] },
      ] },
      { name: "Sprechen", nameEn: "Speaking", duration: "15 Min.", points: 100, parts: [
        { name: "Teil 1-2", description: "Vortrag halten und an Diskussion teilnehmen.", taskType: "Monolog + Diskussion", tips: ["Flüssig und ohne lange Pausen sprechen", "Verschiedene Register verwenden können", "Auf Nachfragen reagieren können"] },
      ] },
    ],
    generalTips: [
      "Wissenschaftliche Texte und Fachzeitschriften lesen",
      "Deutsche Filme und Serien OHNE Untertitel schauen",
      "Grammatik: Nominalisierung, erweiterte Partizipialattribute, indirekte Rede",
      "Wortschatz: Abstraktes Vokabular, Fachwörter, idiomatische Wendungen",
      "Schreibstil: formell vs. informell bewusst wechseln können",
    ],
    resources: [
      "Goethe-Institut Modellsatz C1",
      "Hueber 'Fit fürs Goethe-Zertifikat C1'",
      "Klett 'Mittelpunkt neu C1'",
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // C2 — Großes Deutsches Sprachdiplom
  // ══════════════════════════════════════════════════════════════
  {
    level: "C2",
    name: "Großes Deutsches Sprachdiplom",
    fullName: "Goethe-Zertifikat C2: Großes Deutsches Sprachdiplom (GDS)",
    description: "Annähernd muttersprachliche Kompetenz. Die höchste Stufe.",
    descriptionEn: "Near-native proficiency. The highest level.",
    canDo: [
      "Praktisch alles mühelos verstehen, was man liest oder hört",
      "Informationen aus verschiedenen Quellen zusammenfassen und begründet darstellen",
      "Sich spontan, sehr fließend und genau ausdrücken",
      "Auch bei komplexen Sachverhalten feinere Bedeutungsnuancen deutlich machen",
    ],
    duration: "ca. 3 Stunden 30 Min.",
    passing: "60% pro Modul",
    fee: "ca. 350 €",
    modules: [
      { name: "Lesen", nameEn: "Reading", duration: "80 Min.", points: 100, parts: [
        { name: "Teil 1-4", description: "Literarische Texte, wissenschaftliche Aufsätze, Feuilleton. Textverständnis auf Muttersprachniveau.", taskType: "Multiple Choice / Lückentext / Zuordnung", tips: ["Nuancen und Ironie erkennen", "Zwischen den Zeilen lesen können"] },
      ] },
      { name: "Hören", nameEn: "Listening", duration: "35 Min.", points: 100, parts: [
        { name: "Teil 1-2", description: "Anspruchsvolle Hörtexte: Vorlesungen, Debatten, Radiosendungen.", taskType: "Multiple Choice / Notizen", tips: ["Auch bei hohem Sprechtempo Details erfassen", "Registerwechsel erkennen"] },
      ] },
      { name: "Schreiben", nameEn: "Writing", duration: "80 Min.", points: 100, parts: [
        { name: "Aufgabe", description: "Einen umfangreichen, gut strukturierten Text zu einem komplexen Thema verfassen.", taskType: "Aufsatz (ca. 350 Wörter)", tips: ["Differenziert argumentieren", "Stilistisch anspruchsvoll schreiben", "Komplexe Satzstrukturen souverän einsetzen"] },
      ] },
      { name: "Sprechen", nameEn: "Speaking", duration: "15 Min.", points: 100, parts: [
        { name: "Teil 1-2", description: "Monolog zu einem komplexen Thema + Diskussion.", taskType: "Vortrag + Debatte", tips: ["Souveräner, sicherer Auftritt", "Humor und Ironie einsetzen können", "Fachbegriffe und Redewendungen natürlich verwenden"] },
      ] },
    ],
    generalTips: [
      "Auf diesem Niveau: In Deutschland leben oder viel mit Muttersprachlern interagieren",
      "Deutsche Literatur lesen (Kafka, Böll, Kehlmann, Hesse)",
      "Feuilleton-Artikel und Kommentare in FAZ, ZEIT, NZZ lesen",
      "Eigene Texte von Muttersprachlern korrigieren lassen",
      "Rhetorische Mittel bewusst einsetzen können",
    ],
    resources: [
      "Goethe-Institut Modellsatz C2",
      "Klett 'So geht's zum GDS'",
      "Deutsche Literatur (Originaltext)",
    ]
  },
];

// Hilfsfunktionen
export const getExamByLevel = (level: string) => EXAM_DATA.find(e => e.level === level);
export const getAllLevels = () => EXAM_DATA.map(e => ({ level: e.level, name: e.name }));
