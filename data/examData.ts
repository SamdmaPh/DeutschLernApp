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
            example: {
              instruction: "Lies den Text und die Aufgaben. Kreuze die richtige Antwort an.",
              content: "Volkshochschule Mitte — Programm Sommer\nDeutschkurs A1: Mo + Mi, 18:00–19:30 Uhr\nBeginn: 5. Juli | Dauer: 8 Wochen | Preis: 120 €\nAnmeldung bis 28. Juni im Büro oder online.",
              question: "Wann beginnt der Deutschkurs?",
              options: ["Am 28. Juni", "Am 5. Juli", "Am 5. August"],
              answer: "Am 5. Juli",
              explanation: "Im Text steht 'Beginn: 5. Juli'. Der 28. Juni ist der letzte Tag für die Anmeldung, nicht der Kursbeginn."
            },
            tips: [
              "Markiere wichtige Informationen im Text",
              "Achte besonders auf Zahlen, Daten und Uhrzeiten",
              "Unterscheide zwischen ähnlichen Informationen — z.B. Anmeldedatum vs. Startdatum",
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
            example: {
              instruction: "Sie hören ein Gespräch. Was ist richtig?",
              content: "[Audio] Mann: 'Entschuldigung, wann fährt der nächste Zug nach Hamburg?' Frau: 'Um 14 Uhr 30, Gleis 7.'",
              question: "Der Zug nach Hamburg fährt um...",
              options: ["13:30 Uhr", "14:30 Uhr", "17:00 Uhr"],
              answer: "14:30 Uhr",
              explanation: "Die Frau sagt '14 Uhr 30'. Bei Höraufgaben musst du Zahlen und Uhrzeiten genau heraushören."
            },
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
            example: {
              instruction: "Sie hören eine Durchsage. Richtig oder Falsch?",
              content: "[Audio] 'Achtung auf Gleis 3! Der ICE 578 nach Berlin fährt heute ausnahmsweise von Gleis 5. Ich wiederhole: Gleis 5.'",
              question: "Der Zug nach Berlin fährt von Gleis 3.",
              options: ["Richtig", "Falsch"],
              answer: "Falsch",
              explanation: "Die Durchsage sagt 'ausnahmsweise von Gleis 5'. Das Wort 'ausnahmsweise' zeigt eine Änderung an. Das Gleis wurde von 3 auf 5 geändert."
            },
            tips: [
              "Durchsagen enthalten oft Änderungen: 'Achtung! Der Zug nach München fährt heute von Gleis 5'",
              "Achte auf Wörter wie: Achtung, bitte beachten Sie, leider, geändert",
              "Die ursprüngliche Information wird oft zuerst genannt, dann die Korrektur — höre bis zum Ende",
            ]
          },
          {
            name: "Teil 3: Telefongespräche",
            description: "Du hörst 5 Nachrichten auf dem Anrufbeantworter und notierst Informationen.",
            taskType: "Information ergänzen",
            example: {
              instruction: "Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Informationen.",
              content: "[Audio] 'Hallo Frau Müller, hier ist die Praxis Dr. Schneider. Ihr Termin am Donnerstag muss leider verschoben werden. Der neue Termin ist Freitag, 10 Uhr 15. Bitte rufen Sie zurück: 030-44 55 66 77.'",
              question: "Neuer Termin: Tag: _____ Uhrzeit: _____ Telefonnummer: _____",
              answer: "Freitag, 10:15 Uhr, 030-44 55 66 77",
              explanation: "Du musst drei Details heraushören: den Tag (Freitag), die Uhrzeit (10:15) und die Telefonnummer. Schreib Zahlen sofort mit!"
            },
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
          {
            name: "Teil 1: Informationstexte",
            description: "Informationen in kurzen Texten finden (Anzeigen, Aushänge).",
            taskType: "Zuordnung",
            example: {
              instruction: "Lesen Sie die Aufgaben und die Anzeigen. Welche Anzeige passt?",
              content: "Anzeige A: 'Fahrradladen Peters — Reparatur aller Marken, Mo–Fr 9–18 Uhr, Sa 9–13 Uhr'\nAnzeige B: 'Sportstudio FitFun — Yoga, Pilates, Schwimmen. Probetraining kostenlos!'\nAnzeige C: 'Gebraucht-Fahrräder ab 80€ — gute Qualität! Tel: 0151-234567'",
              question: "Ihr Fahrrad ist kaputt. Sie brauchen Hilfe.",
              options: ["Anzeige A", "Anzeige B", "Anzeige C"],
              answer: "Anzeige A",
              explanation: "Anzeige A bietet 'Reparatur aller Marken' an. Anzeige C verkauft Fahrräder, repariert sie aber nicht. Das Schlüsselwort ist 'Reparatur'."
            },
            tips: [
              "Schlüsselwörter in der Aufgabe unterstreichen",
              "Nicht alle Anzeigen passen — ein Distraktor ist immer dabei",
              "Lies die Aufgabe zuerst, dann suche gezielt in den Anzeigen",
            ]
          },
          {
            name: "Teil 2: Zeitungsartikel",
            description: "Kurze Zeitungstexte lesen und Fragen beantworten.",
            taskType: "Multiple Choice",
            example: {
              instruction: "Lesen Sie den Text und die Aufgaben. Kreuzen Sie die richtige Lösung an.",
              content: "Stadtfest am Wochenende\nAm Samstag und Sonntag findet wieder das beliebte Stadtfest statt. Dieses Jahr gibt es zum ersten Mal auch ein Kinderprogramm mit Clowns und Zaubershows. Der Eintritt ist frei. Bei Regen findet das Fest in der Stadthalle statt.",
              question: "Was ist dieses Jahr neu beim Stadtfest?",
              options: ["Der Eintritt ist frei.", "Es gibt ein Programm für Kinder.", "Das Fest ist in der Stadthalle."],
              answer: "Es gibt ein Programm für Kinder.",
              explanation: "'Zum ersten Mal' bedeutet 'neu'. Das Kinderprogramm ist neu. Der freie Eintritt und die Stadthalle werden nicht als neu beschrieben."
            },
            tips: [
              "Lies zuerst die Fragen, dann den Text",
              "Achte auf Synonyme — die Antwort benutzt oft andere Wörter als der Text",
              "Signalwörter wie 'zum ersten Mal', 'neu', 'anders als' zeigen wichtige Informationen",
            ]
          },
          {
            name: "Teil 3: Anweisungen",
            description: "Anweisungen und Hinweise verstehen (Hausordnung, Hinweisschilder).",
            taskType: "Richtig/Falsch",
            example: {
              instruction: "Lesen Sie die Hausordnung. Richtig oder Falsch?",
              content: "Hausordnung:\n1. Ruhezeit ist von 22:00 bis 6:00 Uhr.\n2. Haustiere sind im Haus nicht erlaubt.\n3. Fahrräder bitte nur im Keller abstellen.\n4. Grillen auf dem Balkon ist verboten.",
              question: "Man darf im Haus eine Katze haben.",
              options: ["Richtig", "Falsch"],
              answer: "Falsch",
              explanation: "'Haustiere sind nicht erlaubt' bedeutet: keine Hunde, keine Katzen, keine Tiere. 'Nicht erlaubt' = 'verboten'."
            },
            tips: [
              "Achte auf 'nicht', 'kein', 'verboten' — Negation ändert alles",
              "Wörter wie 'erlaubt', 'verboten', 'nur', 'bitte' sind besonders wichtig",
              "Lies jede Aussage einzeln und vergleiche sie genau mit dem Text",
            ]
          },
          {
            name: "Teil 4: Leserbrief",
            description: "Einen kurzen Leserbrief lesen und die Meinung des Autors verstehen.",
            taskType: "Ja/Nein",
            example: {
              instruction: "Lesen Sie den Leserbrief. Hat der Autor eine positive oder negative Meinung?",
              content: "Leserbrief von Petra K.:\n'Ich finde es toll, dass unsere Stadt jetzt mehr Fahrradwege baut. Leider sind manche Wege aber zu schmal. Trotzdem bin ich froh, dass sich endlich etwas ändert. Ich fahre jetzt viel öfter mit dem Fahrrad zur Arbeit.'",
              question: "Petra findet die neuen Fahrradwege gut.",
              options: ["Ja", "Nein"],
              answer: "Ja",
              explanation: "Petra sagt 'toll' und 'froh'. Sie kritisiert zwar die Breite ('zu schmal'), aber insgesamt ist sie positiv ('endlich etwas ändert', 'viel öfter Fahrrad')."
            },
            tips: [
              "Achte auf Meinungswörter: 'Ich finde', 'Meiner Meinung nach', 'leider'",
              "Ein Leserbrief kann gemischte Meinungen haben — achte auf die Gesamtaussage",
              "Wörter wie 'trotzdem', 'aber', 'obwohl' zeigen Gegensätze in der Meinung",
            ]
          },
        ]
      },
      {
        name: "Hören", nameEn: "Listening", duration: "30 Min.", points: 25,
        parts: [
          {
            name: "Teil 1: Nachrichten",
            description: "Telefonische Nachrichten und Ansagen verstehen.",
            taskType: "Richtig/Falsch",
            example: {
              instruction: "Sie hören eine Nachricht auf dem Anrufbeantworter. Richtig oder Falsch?",
              content: "[Audio] 'Hallo Herr Klein, hier ist Ihre Autowerkstatt. Ihr Auto ist fertig. Sie können es ab morgen, Dienstag, abholen. Wir haben bis 18 Uhr geöffnet. Die Rechnung liegt an der Kasse.'",
              question: "Herr Klein kann sein Auto heute abholen.",
              options: ["Richtig", "Falsch"],
              answer: "Falsch",
              explanation: "Die Werkstatt sagt 'ab morgen, Dienstag' — nicht heute. Das Wort 'morgen' ist entscheidend."
            },
            tips: [
              "Zahlen und Uhrzeiten sofort notieren",
              "Achte auf Zeitangaben: 'heute', 'morgen', 'nächste Woche' — sie ändern die Bedeutung",
              "Höre genau: Oft werden Termine oder Zeiten korrigiert",
            ]
          },
          {
            name: "Teil 2: Gespräche",
            description: "Alltagsgespräche verstehen (im Geschäft, beim Arzt, am Telefon).",
            taskType: "Multiple Choice",
            example: {
              instruction: "Sie hören ein Gespräch. Was ist richtig?",
              content: "[Audio] Frau: 'Ich hätte gerne das blaue Kleid im Schaufenster.' Verkäuferin: 'Das haben wir leider nur noch in Größe 40.' Frau: 'Oh, das ist zu groß. Haben Sie es auch in Rot?' Verkäuferin: 'Ja, in Rot haben wir alle Größen.'",
              question: "Was macht die Kundin?",
              options: ["Sie kauft das blaue Kleid.", "Sie fragt nach einer anderen Farbe.", "Sie geht in ein anderes Geschäft."],
              answer: "Sie fragt nach einer anderen Farbe.",
              explanation: "Die Kundin fragt 'Haben Sie es auch in Rot?' — sie wechselt die Farbe, weil Blau nicht in ihrer Größe da ist."
            },
            tips: [
              "Auf die Stimmung achten — klingt die Person zufrieden oder unzufrieden?",
              "Achte auf Problemlösungen: Was will die Person, und was passiert dann?",
              "Oft ändert sich der Plan im Gespräch — das Ende ist wichtiger als der Anfang",
            ]
          },
          {
            name: "Teil 3: Radiosendung",
            description: "Einen Radiobeitrag verstehen und Fragen beantworten.",
            taskType: "Richtig/Falsch",
            example: {
              instruction: "Sie hören einen Radiobeitrag. Richtig oder Falsch?",
              content: "[Audio] 'Immer mehr Deutsche arbeiten von zu Hause. Eine neue Studie zeigt: 40 Prozent der Büroangestellten arbeiten mindestens einen Tag pro Woche im Homeoffice. Die meisten finden das positiv, weil sie keine lange Fahrt zur Arbeit haben.'",
              question: "Die meisten Leute im Homeoffice sind unzufrieden.",
              options: ["Richtig", "Falsch"],
              answer: "Falsch",
              explanation: "Im Beitrag steht 'Die meisten finden das positiv'. 'Positiv' ist das Gegenteil von 'unzufrieden'. Achte auf Meinungswörter!"
            },
            tips: [
              "Beim ersten Hören: Hauptthema erfassen. Beim zweiten Hören: Details.",
              "Notiere Schlüsselwörter wie Zahlen, Prozentzahlen und Meinungen",
              "Vorsicht mit Verallgemeinerungen: 'alle', 'niemand', 'immer' — prüfe genau",
            ]
          },
        ]
      },
      {
        name: "Schreiben", nameEn: "Writing", duration: "30 Min.", points: 25,
        parts: [
          { name: "Teil 1: SMS/Kurznachricht", description: "Eine kurze Nachricht als Reaktion auf eine Situation schreiben.", taskType: "Nachricht (ca. 40 Wörter)",
            example: { instruction: "Schreiben Sie eine Nachricht an Ihre Freundin.", content: "Situation: Sie haben heute einen Arzttermin und können nicht zum Deutschkurs kommen.\n- Warum können Sie nicht kommen?\n- Wann kommen Sie wieder?\n- Was soll Ihre Freundin für Sie tun?", question: "Schreiben Sie ca. 40 Wörter.", answer: "Liebe Sara, ich kann heute leider nicht zum Deutschkurs kommen. Ich habe einen Termin beim Arzt. Nächste Woche bin ich wieder da. Kannst du bitte die Hausaufgaben für mich aufschreiben? Danke! Liebe Grüße", explanation: "Alle 3 Punkte beantwortet: Grund (Arzttermin), Rückkehr (nächste Woche), Bitte (Hausaufgaben). Informeller Ton mit 'Liebe' + 'Liebe Grüße'." },
            tips: ["Informell: 'Lieber/Liebe...', 'Hallo...', 'Viele Grüße'", "Alle 3 Inhaltspunkte beantworten", "Kurze Sätze reichen — 40 Wörter sind wenig!"] },
          { name: "Teil 2: Beitrag in Online-Gästebuch", description: "Deine Meinung oder Erfahrung zu einem Thema schreiben.", taskType: "Text (ca. 40 Wörter)",
            example: { instruction: "Schreiben Sie einen Beitrag in ein Online-Gästebuch.", content: "Thema: Ihr Lieblingsrestaurant\n- Was gefällt Ihnen?\n- Was empfehlen Sie?", question: "Schreiben Sie ca. 40 Wörter.", answer: "Mein Lieblingsrestaurant ist das 'Goldene Lamm' in der Altstadt. Das Essen ist sehr lecker und nicht zu teuer. Ich empfehle die Schnitzel mit Kartoffelsalat — das ist fantastisch! Die Kellner sind sehr freundlich.", explanation: "Meinung + Empfehlung + persönliche Note. Konnektoren: 'und', 'nicht zu'." },
            tips: ["Nutze Konnektoren: 'und', 'aber', 'weil', 'deshalb'", "Einfache Meinungsäußerung: 'Ich finde... gut/schlecht/interessant'", "Persönliche Erfahrung macht den Text lebendig"] },
        ]
      },
      {
        name: "Sprechen", nameEn: "Speaking", duration: "15 Min.", points: 25,
        parts: [
          { name: "Teil 1: Über sich erzählen", description: "Ein Alltagsthema beschreiben (z.B. Wohnung, Tagesablauf).", taskType: "Monolog (ca. 1-2 Min.)",
            example: { instruction: "Erzählen Sie etwas über Ihr Thema.", content: "Thema: Mein Tagesablauf", question: "Beschreiben Sie einen typischen Tag.", answer: "Ich stehe morgens um 7 Uhr auf. Dann frühstücke ich und trinke Kaffee. Um 8 Uhr fahre ich mit dem Bus zur Arbeit. Ich arbeite von 9 bis 17 Uhr. Nach der Arbeit koche ich und sehe fern. Um 23 Uhr gehe ich ins Bett.", explanation: "Chronologische Struktur: morgens → mittags → abends. Zeitangaben und einfache Verben." },
            tips: ["Strukturiert erzählen: zuerst..., dann..., danach...", "Einfache Sätze sind OK — Hauptsache flüssig", "Zeitangaben nutzen: morgens, um 8 Uhr, nach der Arbeit"] },
          { name: "Teil 2: Gemeinsam planen", description: "Mit einem Partner etwas planen (z.B. Ausflug, Party).", taskType: "Dialog",
            example: { instruction: "Planen Sie gemeinsam mit Ihrem Partner.", content: "Situation: Sie möchten zusammen ein Picknick machen.\n- Wann?\n- Wo?\n- Was mitbringen?", question: "Machen Sie Vorschläge und reagieren Sie auf die Vorschläge Ihres Partners.", answer: "Wollen wir am Samstag ein Picknick machen? — Ja, gute Idee! Wie wäre es im Park? — OK, und was bringen wir mit? — Ich bringe Brötchen und Käse mit. Und du? — Ich kann Obst und Getränke mitbringen.", explanation: "Vorschlag + Reaktion + Aufgabenverteilung. Höfliche Fragen verwenden." },
            tips: ["Vorschläge machen: 'Wollen wir...?', 'Wie wäre es mit...?'", "Reagieren: 'Gute Idee!', 'Das finde ich nicht so gut, weil...'", "Aufgaben verteilen: 'Ich bringe... mit. Und du?'"] },
          { name: "Teil 3: Auf Bilder reagieren", description: "Ein Bild beschreiben und darüber sprechen.", taskType: "Monolog + Reaktion",
            example: { instruction: "Beschreiben Sie das Bild und sprechen Sie darüber.", content: "[Bild: Familie beim Abendessen am Tisch]", question: "Was sehen Sie? Was denken Sie?", answer: "Auf dem Bild sehe ich eine Familie. Sie sitzen zusammen am Tisch und essen. Das erinnert mich an meine Familie. Bei uns essen wir auch zusammen — meistens am Wochenende.", explanation: "Beschreibung + persönliche Verbindung. 'Auf dem Bild sehe ich...' + 'Das erinnert mich an...'" },
            tips: ["'Auf dem Bild sehe ich...', 'Das erinnert mich an...'", "Eigene Erfahrungen einbringen", "Nicht nur beschreiben — auch deine Meinung und Gefühle äußern"] },
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
          { name: "Teil 1: Blog/Forumsbeitrag", description: "Längere Texte lesen und die Hauptaussagen verstehen.", taskType: "Richtig/Falsch",
            example: { instruction: "Lesen Sie den Blog-Beitrag. Richtig oder Falsch?", content: "Seit ich in Berlin lebe, fahre ich jeden Tag mit dem Fahrrad zur Arbeit. Am Anfang fand ich es anstrengend, aber inzwischen möchte ich nicht mehr ohne mein Fahrrad leben. Man ist schneller als mit der U-Bahn und spart auch noch Geld.", question: "Die Autorin fährt Fahrrad, weil es billiger als die U-Bahn ist.", options: ["Richtig", "Falsch"], answer: "Richtig", explanation: "'Spart auch noch Geld' = es ist billiger. Aber der HAUPTGRUND ist, dass sie es inzwischen liebt." },
            tips: ["Auf Meinungswörter achten: 'meiner Meinung nach', 'ich finde', 'leider'", "Unterscheide zwischen Hauptaussage und Details", "Markiere Schlüsselwörter im Text"] },
          { name: "Teil 2: Zeitungsartikel", description: "Informationen aus Zeitungsartikeln entnehmen.", taskType: "Multiple Choice",
            example: { instruction: "Lesen Sie den Artikel und wählen Sie die richtige Antwort.", content: "Die Zahl der Studierenden an deutschen Universitäten ist im vergangenen Jahr um 3% gestiegen. Besonders beliebt waren Informatik und Medizin. Viele ausländische Studierende kommen nach Deutschland, weil die Studiengebühren niedrig sind.", question: "Warum studieren viele Ausländer in Deutschland?", options: ["Weil die Qualität der Unis am besten ist.", "Weil das Studium relativ günstig ist.", "Weil man in Deutschland gut arbeiten kann."], answer: "Weil das Studium relativ günstig ist.", explanation: "'Niedrige Studiengebühren' = relativ günstig/billig. Die anderen Optionen werden im Text nicht als Grund genannt." },
            tips: ["Vorsicht mit Distraktoren — oft klingt eine falsche Antwort sehr plausibel", "Suche die Textstelle, die zur Frage passt", "Achte auf Synonyme: 'niedrig' = 'günstig' = 'billig'"] },
          { name: "Teil 3: Anzeigen/Situationen", description: "Anzeigen konkreten Situationen zuordnen.", taskType: "Zuordnung", tips: ["Systematisch: Jede Anzeige durchgehen und auf Schlüsselwörter prüfen", "Eine Anzeige bleibt immer übrig (Distraktor)", "Mehrere Schlüsselwörter müssen passen, nicht nur eins"] },
          { name: "Teil 4: Leserbrief", description: "Die Meinung des Autors in einem Leserbrief verstehen.", taskType: "Ja/Nein/nicht im Text",
            example: { instruction: "Lesen Sie den Leserbrief. Ja, Nein, oder nicht im Text?", content: "Ich finde es gut, dass unsere Stadt jetzt mehr Fahrradwege baut. Das macht das Radfahren sicherer. Allerdings sollte man auch an die Fußgänger denken — manchmal fahren Radfahrer viel zu schnell auf dem Gehweg.", question: "Der Autor ist gegen den Bau von Fahrradwegen.", options: ["Ja", "Nein", "Nicht im Text"], answer: "Nein", explanation: "Er findet es 'gut' = er ist dafür, nicht dagegen. Er kritisiert nur das Verhalten mancher Radfahrer." },
            tips: ["'Nicht im Text' = Die Information wird überhaupt nicht erwähnt, weder ja noch nein", "Unterscheide: Kritik an einem Detail ≠ gegen das Thema insgesamt", "'Ja/Nein' nur wenn der Text die Information klar enthält"] },
          { name: "Teil 5: Gebrauchsanweisung", description: "Anweisungen in Hausordnungen, Gebrauchsanleitungen etc. verstehen.", taskType: "Multiple Choice", tips: ["Achte auf Modalverben: 'muss', 'darf nicht', 'soll'", "Verbote erkennen: 'ist nicht gestattet', 'ist untersagt', 'bitte vermeiden'", "Zeitangaben beachten: 'ab 22 Uhr', 'werktags', 'an Feiertagen'"] },
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
          { name: "Aufgabe 1: Formeller Brief", description: "Einen formellen Brief/E-Mail schreiben (Beschwerde, Anfrage, Bewerbung).", taskType: "Brief (ca. 80 Wörter)",
            example: { instruction: "Schreiben Sie eine formelle E-Mail.", content: "Situation: Sie haben online einen Laptop bestellt. Nach 3 Wochen ist er noch nicht da.\n- Grund für Ihr Schreiben\n- Was ist passiert?\n- Was möchten Sie?", question: "Schreiben Sie ca. 80 Wörter.", answer: "Sehr geehrte Damen und Herren,\n\nich habe am 15. März einen Laptop in Ihrem Online-Shop bestellt (Bestellnummer 12345). Leider habe ich die Lieferung nach drei Wochen immer noch nicht erhalten.\n\nIch bitte Sie, mir mitzuteilen, wann ich mit der Lieferung rechnen kann. Falls der Artikel nicht mehr verfügbar ist, möchte ich mein Geld zurückbekommen.\n\nMit freundlichen Grüßen\nAnna Schmidt", explanation: "Formeller Stil, alle 3 Punkte beantwortet, Konnektoren (leider, falls), konkrete Details (Datum, Bestellnummer)." },
            tips: [
            "Formeller Stil: 'Sehr geehrte Damen und Herren,' ... 'Mit freundlichen Grüßen'",
            "Alle Inhaltspunkte bearbeiten",
            "Konnektoren verwenden: 'außerdem', 'deshalb', 'trotzdem'",
            "Konkrete Details nennen: Datum, Bestellnummer, Ort",
          ] },
          { name: "Aufgabe 2: Diskussionsbeitrag", description: "Deine Meinung zu einem Thema schreiben.", taskType: "Forumsbeitrag (ca. 80 Wörter)",
            example: { instruction: "Schreiben Sie Ihre Meinung im Forum.", content: "Thema: 'Sollen Handys in der Schule verboten werden?'", question: "Schreiben Sie Ihre Meinung (ca. 80 Wörter).", answer: "Ich bin der Meinung, dass Handys in der Schule nicht komplett verboten werden sollten. Einerseits können Handys im Unterricht stören, andererseits kann man sie auch zum Lernen benutzen, zum Beispiel für Recherche. In meinem Heimatland dürfen Schüler ihre Handys in der Pause benutzen — das finde ich sinnvoll. Deshalb denke ich, dass eine Regelung besser ist als ein Verbot.", explanation: "Struktur: Meinung → Argument → Gegenargument → Beispiel → Schluss. Konnektoren: einerseits/andererseits, deshalb." },
            tips: [
            "Struktur: Meinung + Begründung + Beispiel",
            "'Ich bin der Meinung, dass...', 'Einerseits... andererseits...'",
            "Pro- und Contra-Argumente zeigen → höhere Punktzahl",
          ] },
          { name: "Aufgabe 3: Informelle E-Mail", description: "Auf eine E-Mail eines Freundes antworten.", taskType: "E-Mail (ca. 40 Wörter)",
            example: { instruction: "Antworten Sie auf die E-Mail Ihres Freundes.", content: "Tom schreibt: 'Hi! Ich komme nächste Woche nach Berlin! Hast du Zeit? Was können wir machen?'", question: "Antworten Sie (ca. 40 Wörter).", answer: "Hi Tom! Super, dass du kommst! Ich habe am Samstag frei. Wir können in die Altstadt gehen und abends zusammen essen. Ich kenne ein tolles Restaurant! Freu mich! LG", explanation: "Informell, antwortet auf beide Fragen (Zeit? Was machen?), persönlich und enthusiastisch." },
            tips: [
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
