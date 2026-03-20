const https = require('https');

const SUPABASE_URL = 'https://ypkpsosjkfrgenfcgjtq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwa3Bzb3Nqa2ZyZ2VuZmNnanRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTI4NDMsImV4cCI6MjA4ODY2ODg0M30.CJy-QP9GPf7o1f12aAWtBKOvJM5wXqJv3VIqHKBBRC0';

// Rich lesson content based on "Deutsch Sprechen Ab Tag 1" + Goethe Institut materials
const RICH_LESSONS = [
  {
    order_index: 1,
    content: {
      goals: [
        "Die 12 Notfall-Sätze auswendig sprechen (unter 60 Sekunden!)",
        "Das POWER FRAME System anwenden: 1 Rahmen = unendlich viele Sätze",
        "Sofort in echten Situationen überleben: Restaurant, Bahnhof, Apotheke",
        "Verstehen warum Chunks schneller lernen als Grammatik"
      ],
      chunks: [
        "━━━ DAS POWER FRAME SYSTEM ━━━",
        "RAHMEN 1 — Wünsche ausdrücken:",
        "\"Ich möchte + [NOMEN] + bitte\"",
        "→ ein Bier / ein Wasser / einen Tee / die Karte / ein Zimmer / die Rechnung",
        "RAHMEN 2 — Nach dem Weg fragen:",
        "\"Wo ist + [NOMEN]?\"",
        "→ der Bahnhof / das Hotel / die Apotheke / das WC / der Ausgang",
        "RAHMEN 3 — Um Hilfe bitten:",
        "\"Können Sie + [VERB]?\"",
        "→ helfen / sprechen / wiederholen / buchstabieren / langsamer sprechen",
        "━━━ DIE 12 MAGISCHEN SÄTZE ━━━",
        "1. Entschuldigung! — Excuse me! / I'm sorry!",
        "2. Sprechen Sie Englisch? — Do you speak English?",
        "3. Ich verstehe nicht. — I don't understand.",
        "4. Wie bitte? — Pardon? / What did you say?",
        "5. Können Sie das wiederholen? — Can you repeat that?",
        "6. Bitte langsamer! — Please slower! (speak more slowly)",
        "7. Wo ist...? — Where is...?",
        "8. Wie viel kostet das? — How much does that cost?",
        "9. Ich möchte... bitte. — I would like... please.",
        "10. Die Rechnung, bitte! — The bill, please!",
        "11. Hilfe! — Help!",
        "12. Danke schön! / Bitte schön! — Thank you very much! / You're welcome!",
        "━━━ BONUS: SOFORT EINSETZBAR ━━━",
        "Ja. / Nein. / Vielleicht. — Yes. / No. / Maybe.",
        "Ich weiß nicht. — I don't know.",
        "Kein Problem! — No problem!",
        "Das ist gut! — That's good!",
        "Ich bin Tourist/in. — I am a tourist.",
        "Ich komme aus [Land]. — I come from [country]."
      ],
      mnemonic: [
        "\"Ich möchte\" — sprich: \"Ikh MURCH-tuh\" → stell dir einen Höhlenmenschen vor, der auf Essen zeigt und grunzt: MÖCHTE!",
        "\"Entschuldigung\" — zerlege es: Ent-SCHUL-di-gung = \"SCHOOL-digging\"",
        "Story: \"Entschuldigung! Ich habe unter der Schule gegraben!\" — absurd = unvergesslich!",
        "\"Wo ist\" — klingt wie \"Vo ist\" — Vogel sucht sein Nest: \"Vo IST mein Nest?\"",
        "\"Können Sie\" — klingt wie \"KUNNEN zee\" — \"Can you zee that?\" (see = see in Segelsprache)",
        "\"Wie viel kostet\" — \"Vee feel COST-et\" — \"How feel does it cost?\" — du fühlst den Preis!",
        "TRICK: Lerne diese 12 Sätze wie ein Lied — mit Rhythmus. Klopf beim Sprechen auf den Tisch!"
      ],
      speak: [
        "Lies alle 12 Sätze einmal durch. Decke die Deutschen Sätze ab. Sag jeden auswendig.",
        "Wiederhole bis alle 12 ohne nachschauen klappen. Ziel: unter 60 Sekunden!",
        "Stell dir vor: Du bist im Münchener Hauptbahnhof. Welche 3 Sätze brauchst du zuerst?",
        "Übung POWER FRAME: Ergänze laut → \"Ich möchte ___ bitte.\" (5 verschiedene Dinge)",
        "Übung POWER FRAME: Ergänze laut → \"Wo ist ___?\" (5 verschiedene Orte)",
        "Übung POWER FRAME: Ergänze laut → \"Können Sie ___?\" (3 verschiedene Bitten)",
        "Spaced Repetition Plan: Tag 1 auswendig lernen → Tag 3 Aussprache perfektionieren → Tag 7 Lücken füllen"
      ],
      science: "Chunks werden im Gehirn als EINZELNE Einheiten gespeichert — wie ein Wort, nicht wie viele. Du kannst sie sofort einsetzen, ohne Konstruktionsverzögerung. Genau so lernen Kinder Sprache — nicht durch Grammatik, sondern durch Chunks."
    }
  },
  {
    order_index: 2,
    content: {
      goals: [
        "Die 5 Kern-Ausspracheregeln anwenden (W→V, Z→TS, V→F, EI=Auge, IE=ee)",
        "Alle 4 Sonderzeichen korrekt aussprechen (ä, ö, ü, ß)",
        "Jedes deutsche Wort laut vorlesen — Deutsch ist phonetisch!",
        "50+ Kognate zwischen Deutsch und Englisch erkennen"
      ],
      chunks: [
        "━━━ WARUM DEUTSCH EINFACH IST ━━━",
        "Deutsch ist zu ~80% in 20 Minuten lernbar — weil es PHONETISCH ist.",
        "Wörter werden fast genau so geschrieben, wie sie klingen.",
        "Lerne diese Regeln → du kannst JEDES deutsche Wort laut lesen!",
        "━━━ DIE 5 GOLDENEN REGELN ━━━",
        "REGEL 1 — W klingt wie V:",
        "Wasser → \"VASSER\" | Welt → \"VELT\" | wir → \"VEER\" | Wein → \"VINE\"",
        "REGEL 2 — Z klingt wie TS:",
        "Zeit → \"TSEIT\" | zwei → \"TSVEI\" | zu → \"TSOO\" | Zug → \"TSOOK\"",
        "REGEL 3 — V klingt wie F:",
        "Vater → \"FATER\" | von → \"FON\" | viel → \"FEEL\" | vier → \"FEER\"",
        "REGEL 4 — EI klingt wie EYE:",
        "mein → \"MINE\" | Wein → \"VINE\" | drei → \"DRY\" | Eis → \"ICE\"",
        "REGEL 5 — IE klingt wie EE (lang):",
        "viel → \"FEEL\" | Liebe → \"LEEBEH\" | die → \"DEE\" | Brief → \"BREEF\"",
        "━━━ SONDERZEICHEN ━━━",
        "ä — wie 'e' in 'bed': Mädchen, Käse, Bäcker",
        "ö — sage 'ee' mit gerundeten Lippen: schön, möchte, Öl",
        "ü — sage 'ee' mit sehr runden Lippen: über, Tür, grün",
        "ß (Eszett) — immer 'ss': Straße, heiße, groß",
        "━━━ BONUS REGELN ━━━",
        "SP am Wortanfang → 'SHP': spielen='SHPEELEN', sprechen='SHPRECHEN'",
        "ST am Wortanfang → 'SHT': Stuhl='SHTOOL', stark='SHTARK'",
        "CH nach a/o/u → kehlig (Rachen): Bach, noch, Buch",
        "CH nach e/i/ä/ö/ü → weich (vorne): ich, mich, Milch",
        "━━━ KOSTENLOSE VOKABELN (Kognate) ━━━",
        "-tion Wörter (identisch!): Nation | Station | Information | Organisation | Situation",
        "-ität Wörter: Universität | Qualität | Flexibilität | Kreativität | Realität",
        "-ismus: Tourismus | Optimismus | Realismus | Kapitalismus",
        "Direkte Kognate: Hand | Arm | Finger | Name | Musik | Sport | Tennis | Hotel"
      ],
      mnemonic: [
        "W.V.Z. FORMEL — \"Deutsche machen diese DREI anders!\"",
        "W→V: \"Wasser fließt wie Vasser — Wellen gehen beide Wege (W und V)\"",
        "V→F: \"Vater = Fater — Father beginnt mit F\"",
        "Z→TS: \"Zeit = TSeit — deutsches Z ist wie piTZa\"",
        "EI vs IE: \"EI = AUGE (beide haben ein 'i' in der Mitte) | IE = EEL (langgezogen)\"",
        "Ö TRICK: Sage 'ee' (breites Lächeln) → runde die Lippen → du sagst 'ü'!",
        "Sage 'e' (wie in 'bed') → leicht öffnen → 'ä'!",
        "ÜBUNGSREIM: \"Über die Straße — das ist sehr schön!\" — beinhaltet ü, ß, ö!"
      ],
      speak: [
        "Lies diese Wörter laut mit den 5 Regeln: Wasser • Zeit • Vater • mein • viel • zwei • Wein • vier • wie • ziehen",
        "Sage dann: \"Mein Vater trinkt Wein und Wasser.\" — 3× schneller werden!",
        "Mundübung ü: Sage 'ee' (breites Lächeln) → runde die Lippen. Jetzt: über, Tür, grün",
        "Sage diesen Satz: \"Über die Straße — das ist sehr schön!\"",
        "Zungenbrecher: \"Fischers Fritze fischt frische Fische.\" — langsam, dann schneller!",
        "Minimalpaare laut vorlesen: mein/mien | vier/Bier | See/Zeh | Wein/Bein",
        "Schreibe phonetisch auf Englisch: Straße=? | schön=? | spielen=? | zwölf=?"
      ],
      science: "Wer zuerst die Aussprache lernt, spricht schneller, bekommt besseres Feedback und entwickelt Intuition für neue Wörter. Investiere 20 Minuten hier = spare 200 Stunden Verwirrung. Schlechte Aussprache = keine Kommunikation."
    }
  },
  {
    order_index: 3,
    content: {
      goals: [
        "Das Eiserne Gesetz anwenden: Verb IMMER auf Position 2",
        "sein, haben und regelmäßige Verben in allen Personen konjugieren",
        "möchten, können, müssen mit Infinitiv am Ende verwenden",
        "Ja/Nein-Fragen und W-Fragen bilden",
        "Verneinung mit nicht und kein/keine korrekt einsetzen"
      ],
      chunks: [
        "━━━ DAS EISERNE GESETZ ━━━",
        "POSITION 1  |  VERB (IMMER Position 2!)  |  ALLES ANDERE",
        "Ich          lerne          Deutsch.",
        "Du           trinkst        Kaffee.",
        "Er           wohnt          in Berlin.",
        "Heute        lerne          ich Deutsch.   ← Zeit auf Pos.1: Verb TROTZDEM Pos.2!",
        "Morgen       fahren         wir nach München.",
        "SUPERREGEL: Was auch immer auf Position 1 steht — VERB ist IMMER Position 2!",
        "━━━ SEIN (TO BE) ━━━",
        "ich BIN      | du BIST     | er/sie/es IST",
        "wir SIND     | ihr SEID    | sie/Sie SIND",
        "━━━ HABEN (TO HAVE) ━━━",
        "ich HABE     | du HAST     | er/sie/es HAT",
        "wir HABEN    | ihr HABT    | sie/Sie HABEN",
        "━━━ REGELMÄSSIGE VERBEN — Ein Muster! ━━━",
        "Infinitiv minus -en + Endung:",
        "ich → -e    | du → -st   | er/sie/es → -t",
        "wir → -en   | ihr → -t   | sie/Sie → -en",
        "SUPERPOWER: wir/sie/Sie = IMMER gleich wie Infinitiv! Kostenlos!",
        "lernen: ich lerne | du lernst | er lernt | wir lernen | ihr lernt | sie lernen",
        "ACHTUNG: Stämme auf -t/-d: du arbeiteST | er warteT (extra -e für Aussprache)",
        "━━━ 3 MODALVERBEN — Öffnen alles ━━━",
        "FORMEL: Subjekt + Modal (Pos.2) + ... + INFINITIV (ENDE)",
        "möchten (would like): Ich möchte Kaffee TRINKEN.",
        "können  (can/able):   Ich kann Deutsch SPRECHEN.",
        "müssen  (must/have):  Ich muss jetzt GEHEN.",
        "Der Infinitiv wird ans ENDE gekickt — wie ein Ball ins Tor!",
        "━━━ VERNEINUNG ━━━",
        "NICHT: verneit Verben und Adjektive → meist am Satzende",
        "Ich schlafe NICHT. | Er ist NICHT müde. | Das ist NICHT schön.",
        "KEIN/KEINE: ersetzt ein/eine vor Nomen",
        "Ich habe KEIN Auto.    (mask./neutral → kein)",
        "Ich habe KEINE Zeit.   (feminin/Plural → keine)",
        "Er hat KEINEN Bruder.  (mask. Akkusativ → keinen)",
        "SCHNELLTEST: Nomen nach haben? → kein/keine. Sonst → nicht.",
        "━━━ FRAGEN ━━━",
        "TYP 1 — Ja/Nein-Frage: Verb auf Position 1:",
        "Du lernst Deutsch. → Lernst du Deutsch?",
        "TYP 2 — W-Frage: W-WORT + Verb Pos.2 + Subjekt + Rest:",
        "Wo wohnst du? | Was machst du? | Wie heißt du? | Warum lernst du Deutsch?",
        "DIE 7 W-FRAGEN: Wer? Was? Wo? Woher? Wohin? Wann? Warum? Wie?"
      ],
      mnemonic: [
        "SEIN ESELSBRÜCKEN:",
        "ich BIN → \"I BIN waiting\" (Cockney Englisch: I AM waiting)",
        "du BIST → \"You're a BEAST\" — du existierst, du bist!",
        "er IST → klingt wie \"he IS\" — einfachste Form!",
        "wir SIND → \"wir haben GESÜNDIGT zusammen\" — we sinned together",
        "ihr SEID → \"ihr seid auf meiner SEITE\" — you're on my side",
        "HABEN ESELSBRÜCKEN:",
        "ich HABE → \"I HAVE the HABIT\" (hab = have)",
        "du HAST → \"you are in HASTE\" — du HAST Dinge zu tun!",
        "er HAT → \"he HATted up\" — er hat einen Hut",
        "MODALVERB TRICK: Der Infinitiv fliegt ans Ende wie ein Papierflugzeug!",
        "KEIN vs NICHT: Nomen? → KEIN. Alles andere? → NICHT."
      ],
      speak: [
        "Konjugiere sein komplett laut auswendig: ich bin, du bist, er ist, wir sind, ihr seid, sie sind",
        "Fülle ein: Ich ___ 28 Jahre alt. | Du ___ müde. | Das Wetter ___ kalt. | Wir ___ in Berlin.",
        "Konjugiere haben: ich habe, du hast, er hat, wir haben, ihr habt, sie haben",
        "Fülle ein: Ich ___ ein Auto. | Hast du Zeit? | Er ___ keinen Hunger. | Wir ___ keine Zeit.",
        "Kicke den Infinitiv ans Ende: Ich möchte einen Kaffee ___ (bestellen).",
        "Verneine diese Sätze: 1. Ich habe ein Auto → 2. Er ist müde → 3. Wir haben Zeit →",
        "Bilde W-Fragen: Woher kommst du? | Was machst du? | Warum lernst du Deutsch?",
        "Übersetze laut: I would like to drink coffee | Can you help me? | We must go now."
      ],
      science: "Mustererkennung ist der Weg, wie Babys Sprache lernen — nicht durch Grammatikbücher. Das Gehirn sucht automatisch nach Mustern. Deshalb: erst das MUSTER zeigen, dann die Regel erklären. Verb auf Position 2 ist so tief im deutschen Gehirn verankert, dass Muttersprachler es als falsch FÜHLEN wenn es fehlt."
    }
  },
  {
    order_index: 4,
    content: {
      goals: [
        "Zahlen 0–1000 sagen und schreiben",
        "Artikel mit den -ung/-heit/-chen Mustern bestimmen",
        "Den Akkusativ anwenden: DER→DEN bei maskulinen Objekten",
        "Das Ampel-Farbsystem für Nomengeschlecht nutzen"
      ],
      chunks: [
        "━━━ ZAHLEN 0-20 ━━━",
        "0 null | 1 ein/eins | 2 zwei | 3 drei | 4 vier | 5 fünf",
        "6 sechs | 7 sieben | 8 acht | 9 neun | 10 zehn",
        "11 elf | 12 zwölf | 13 dreizehn | 14 vierzehn | 15 fünfzehn",
        "16 sechzehn | 17 siebzehn | 18 achtzehn | 19 neunzehn | 20 zwanzig",
        "━━━ ZAHLEN 21-1000 ━━━",
        "MUSTER 21-99: EINHEIT + und + ZEHNER (einundzwanzig, zweiunddreißig...)",
        "30 dreißig | 40 vierzig | 50 fünfzig | 60 sechzig | 70 siebzig | 80 achtzig | 90 neunzig",
        "100 (ein)hundert | 200 zweihundert | 1000 (ein)tausend",
        "Beispiel: 347 = dreihundertsiebenundvierzig (ALLES EIN WORT!)",
        "━━━ DAS AMPEL-SYSTEM FÜR ARTIKEL ━━━",
        "🔵 BLAU = DER (maskulin)   🔴 ROT = DIE (feminin)   🟢 GRÜN = DAS (neutral)",
        "Lerne JEDES Nomen MIT Farbe: \"der BLAUE Hund\" | \"die ROTE Blume\" | \"das GRÜNE Auto\"",
        "━━━ ARTIKEL-HACKS (65% Trefferquote!) ━━━",
        "DIE (feminin) — Endungen: -ung, -heit, -keit, -schaft, -tion, -tät, -ie, -ur",
        "→ die Zeitung | die Freiheit | die Möglichkeit | die Freundschaft",
        "DAS (neutral) — Endungen: -chen, -lein, -um, -ment, -nis",
        "→ das Mädchen | das Fräulein | das Museum | das Instrument",
        "DER (maskulin) — Endungen: -er (Personen), -ling, -ismus, Wochentage/Monate",
        "→ der Lehrer | der Frühling | der Tourismus | der Montag",
        "━━━ DER AKKUSATIV ━━━",
        "Der Akkusativ = das OBJEKT (was/wen bekommt die Aktion?)",
        "NUR MASKULIN ändert sich: DER → DEN | EIN → EINEN",
        "Feminin: die/eine bleibt gleich!",
        "Neutral: das/ein bleibt gleich!",
        "Beispiele:",
        "Ich sehe DEN Mann.    (der Mann → DEN Mann, maskulin ändert!)",
        "Ich kaufe EIN Buch.   (das Buch → EIN Buch, neutral gleich)",
        "Ich liebe DIE Musik.  (die Musik → DIE Musik, feminin gleich)",
        "ESELSBRÜCKE: DEN markiert das 'Opfer' — das Maskuline, das die Aktion bekommt."
      ],
      mnemonic: [
        "ZAHLEN TRICK: 21-99 = Einheit + 'und' + Zehner → wie Englisches 'four-and-twenty' (veraltet aber da!)",
        "AMPEL-SYSTEM: Stell dir jedes Nomen als farbigen Gegenstand vor:",
        "🔵 DER Hund = blauer Hund | 🔴 DIE Katze = rote Katze | 🟢 DAS Kind = grünes Kind",
        "DEN-TRICK: \"DEN marks the victim\" — das Maskuline, das die Aktion erhält, bekommt DEN",
        "-ung TRICK: Alle Handlungen die zu Nomen werden sind feminin: lernen→die Lernung? Nein, aber: Zeitung, Übung, Prüfung — alle DIE!",
        "-chen TRICK: Verkleinerungsformen sind IMMER neutral: das Hündchen, das Mädchen, das Häuschen"
      ],
      speak: [
        "Zähle laut: 1→20. Dann in Zehnerschritten: 20→100.",
        "Dann: 21, 22, 23... bis 30 — jede Zahl als EIN Wort!",
        "3-Sekunden-Challenge: 47,50€ → siebenundvierzig Euro fünfzig",
        "Artikel-Quiz: der/die/das? → Zeitung | Mädchen | Museum | Freiheit | Lehrer",
        "Fülle den Akkusativ ein (laut): Ich sehe ___ Mann. | Ich kaufe ___ Buch. | Ich liebe ___ Frau.",
        "Rechne auf Deutsch: fünf + sieben = ? | zwanzig − acht = ? | vier × neun = ?",
        "Wie alt bist du? → Vollständiger Satz: \"Ich bin ___ Jahre alt.\""
      ],
      science: "Lerne Zahlen nicht als Liste — lerne das SYSTEM. Das Gehirn kann 7±2 Einheiten gleichzeitig behalten. Muster aktivieren jedoch das prozedurale Gedächtnis — unbegrenzte Kapazität. Ein deutsches Zahlwort ist ein Wort, kein Satz."
    }
  },
  {
    order_index: 5,
    content: {
      goals: [
        "du vs. Sie in verschiedenen sozialen Situationen korrekt verwenden",
        "Sich in 8 Sätzen vollständig vorstellen",
        "Alle wichtigen Begrüßungs- und Abschiedsformeln verwenden",
        "Überlebensphrasen einsetzen wenn man etwas nicht versteht"
      ],
      chunks: [
        "━━━ DU ODER SIE? — DIE WICHTIGSTE KULTURELLE REGEL ━━━",
        "SIE (Großbuchstabe S) = FORMELL: Fremde, Berufsleute, ältere Menschen, Autoritäten",
        "du (Kleinbuchstabe) = INFORMELL: Freunde, Familie, Kinder, Gleichaltrige",
        "\"Wir können uns duzen!\" = Einladung du zu verwenden — WARTE auf dieses Angebot!",
        "━━━ REGIONALE BEGRÜSSUNGEN ━━━",
        "\"Moin!\" — Norddeutschland, jederzeit (von \"gut\", nicht \"Morgen\"!)",
        "\"Servus!\" — Bayern & Österreich (bedeutet auch Auf Wiedersehen)",
        "\"Grüezi!\" — Schweiz (formelles Hallo)",
        "\"Grüß Gott!\" — Bayern & Österreich (formell: eigentlich \"Gott grüße dich\")",
        "━━━ BEGRÜSSUNGSFORMELN ━━━",
        "Guten Morgen!     — am Morgen (6-9 Uhr)",
        "Guten Tag!        — am Tag (9-18 Uhr), auch Hallo!",
        "Guten Abend!      — am Abend (18-22 Uhr)",
        "Gute Nacht!       — beim Schlafengehen",
        "Tschüs! / Ciao!   — informelles Auf Wiedersehen",
        "Auf Wiedersehen!  — formelles Auf Wiedersehen",
        "Bis bald! / Bis morgen! / Bis dann!",
        "━━━ NACH DEM BEFINDEN FRAGEN ━━━",
        "Wie geht's? / Wie geht es Ihnen? — How are you?",
        "Sehr gut! | Gut! | Es geht. | Nicht so gut. | Schlecht.",
        "\"Und dir? / Und Ihnen?\" — immer zurückfragen!",
        "━━━ VORSTELLUNGS-FORMEL ━━━",
        "Ich heiße [Name]. / Mein Name ist [Name].",
        "Ich komme aus [Land/Stadt].",
        "Ich wohne in [Stadt].",
        "Ich bin [Alter] Jahre alt.",
        "Ich bin [Beruf] von Beruf. / Ich arbeite als [Beruf]. / Ich studiere [Fach].",
        "Ich spreche [Sprachen].",
        "Ich lerne seit [Zeit] Deutsch.",
        "Es freut mich! / Angenehm! — Nice to meet you!",
        "WICHTIG: KEIN Artikel vor Berufen! → Ich bin Lehrer (NICHT: Ich bin ein Lehrer)",
        "━━━ ÜBERLEBEN IM GESPRÄCH ━━━",
        "Entschuldigung, das habe ich nicht verstanden. — I didn't understand that.",
        "Wie bitte? — Pardon?",
        "Können Sie das wiederholen? — Can you repeat that?",
        "Bitte langsamer! — Please slower!",
        "Können Sie das buchstabieren? — Can you spell that?",
        "Was bedeutet [Wort]? — What does [word] mean?",
        "Ich lerne noch Deutsch. — I'm still learning German."
      ],
      mnemonic: [
        "SIE vs du TRICK: SIE = \"Sie sind wichtig\" (formal respect) | du = \"du bist mein Freund\"",
        "KEIN ARTIKEL bei Berufen: \"Ich bin Arzt\" — stell dir vor, du BIST der Beruf, du trägst ihn wie eine Haut",
        "VORSTELLUNG REIHENFOLGE: N-K-W-A-B-S = Name-Kommt aus-Wohnt-Alter-Beruf-Sprachen",
        "\"Es freut mich\" — \"Es FREUT mich\" (it rejoices me) — du FREUST dich die Person zu treffen!",
        "\"Wie geht's\" TRICK: Immer zurückfragen! \"Und dir?\" — sonst klingt es unhöflich"
      ],
      speak: [
        "Stelle dich vollständig vor — jetzt, laut: Name → Herkunft → Wohnort → Alter → Beruf → Sprachen",
        "Wiederhole 3× — jedes Mal schneller",
        "Stelle dann vor: eine Berühmtheit | ein Familienmitglied | eine historische Person",
        "du oder Sie? Entscheide laut: dein Professor | ein neuer Freund | ein Bankangestellter | ein 6-jähriges Kind",
        "Vollständiger Dialog auswendig: A trifft B zum ersten Mal auf einem Deutschkurs",
        "Übe: \"Entschuldigung, das habe ich nicht verstanden. Können Sie das wiederholen?\""
      ],
      science: "Sich selbst vorstellen ist die häufigste Sprachaufgabe für Anfänger. Das Gehirn speichert oft genutzte Sequenzen als automatisierte Routinen. Nach 20 Wiederholungen läuft die Vorstellung ohne nachzudenken ab — echter Sprachfluss beginnt."
    }
  },
  {
    order_index: 6,
    content: {
      goals: [
        "Essen und Trinken auf drei Höflichkeitsstufen bestellen",
        "Vorlieben mit gerne, mögen und lieben ausdrücken",
        "Eine vollständige Restaurantsituation meistern: Ankunft bis Rechnung",
        "30+ Lebensmittel und Getränke auf Deutsch benennen"
      ],
      chunks: [
        "━━━ 3 BESTELLSTUFEN ━━━",
        "STUFE 1 (einfach):  \"Ein Kaffee, bitte.\" / \"Zwei Bier, bitte.\"",
        "STUFE 2 (höflich):  \"Ich möchte + [ITEM] + bitte.\"",
        "STUFE 3 (sehr höflich): \"Ich hätte gerne + [ITEM].\" / \"Ich nehme + [ITEM].\"",
        "━━━ IM RESTAURANT — DER KOMPLETTE ABLAUF ━━━",
        "ANKOMMEN: \"Einen Tisch für zwei Personen, bitte.\"",
        "FRAGEN: \"Haben Sie ___?\" | \"Was empfehlen Sie?\" | \"Ist das vegetarisch/vegan?\"",
        "\"Ich bin allergisch gegen ___\" | \"Ohne [Zutat], bitte.\"",
        "BESTELLEN: \"Wir möchten bestellen.\" | \"Die Speisekarte, bitte.\"",
        "BEZAHLEN: \"Die Rechnung, bitte.\" | \"Stimmt so!\" (keep the change) | \"Getrennt, bitte.\"",
        "REAGIEREN: \"Das ist sehr lecker!\" | \"Das schmeckt gut!\" | \"Prost! / Zum Wohl!\"",
        "━━━ VORLIEBEN AUSDRÜCKEN ━━━",
        "gerne: Ich trinke GERNE Kaffee.  (I like drinking coffee) — mit Verb",
        "mögen: Ich MAG Schokolade.       (I like chocolate) — mit Nomen",
        "lieben: Ich LIEBE Pizza!          (I love pizza) — stark!",
        "nicht gerne: Ich esse NICHT GERNE Fisch.",
        "━━━ LEBENSMITTEL & GETRÄNKE ━━━",
        "Getränke: das Wasser | der Kaffee | der Tee | das Bier | der Wein | der Saft | die Milch",
        "Frühstück: das Brot | die Butter | der Käse | das Ei | die Marmelade | das Müsli",
        "Mittagessen: die Suppe | der Salat | das Fleisch | der Fisch | das Gemüse | die Nudeln",
        "Snacks: der Kuchen | das Eis | die Schokolade | der Apfel | die Banane",
        "━━━ ZAHLEN IM RESTAURANT ━━━",
        "Das kostet ___ Euro. | Das macht zusammen ___. | Stimmt so! (Trinkgeld ist inklusive)",
        "In Deutschland: 5-10% Trinkgeld ist üblich, aber nicht obligatorisch"
      ],
      mnemonic: [
        "STUFEN TRICK: 1-2-3 = Einfach-Möchte-Hätte gerne. Wie Höflichkeitsstufen eines Fahrstuhls!",
        "GERNE vs MAG: gerne + VERB | mögen + NOMEN → \"Ich GERNE esse\" ❌ → \"Ich esse GERNE\" ✓",
        "\"Prost!\" TRICK: klingt wie \"Boast\" — du prahlst mit deinem Getränk!",
        "\"Stimmt so\" TRICK: stimmt = correct/right → das Geld 'stimmt' so — es ist richtig so!",
        "TIPP: Lerne Essens-Vokabeln in BLÖCKEN: alle Getränke zusammen, alle Frühstückssachen zusammen"
      ],
      speak: [
        "Zeige auf 5 Dinge in deiner Küche. Benenne jedes auf Deutsch.",
        "Weißt du eines nicht? Nachschauen — dann 3× laut sagen!",
        "Was hast du heute gegessen? Sage es auf Deutsch.",
        "Bestelle ein vollständiges Frühstück auf Stufe 2: \"Ich möchte...\"",
        "Spiele Kellner und Gast: A fragt, B bestellt — dann tauschen",
        "Sage: \"Die Rechnung, bitte!\" | \"Stimmt so!\" | \"Das war sehr lecker, danke!\""
      ],
      science: "Essensvokabular ist hochfrequent und emotional verankert — wir essen täglich, daher werden diese Wörter schnell automatisiert. Restaurants sind eine der häufigsten realen Situationen für Deutschlernende."
    }
  },
  {
    order_index: 7,
    content: {
      goals: [
        "Die Uhrzeit angeben inkl. der halb-Falle (halb drei = 2:30!)",
        "Alle Wochentage, Monate und Jahreszeiten benennen",
        "Trennbare Verben korrekt verwenden (Vorsilbe ans Ende!)",
        "Reflexive Verben für Tagesroutinen nutzen"
      ],
      chunks: [
        "━━━ DIE UHRZEIT ━━━",
        "OFFIZIELL (24h): Es ist 14:30 Uhr = vierzehn Uhr dreißig",
        "UMGANGSSPRACHLICH (12h):",
        "Es ist 3:00  = drei Uhr",
        "Es ist 3:15  = Viertel nach drei",
        "Es ist 3:30  = halb vier (!!! NICHT halb drei!!!)",
        "Es ist 3:45  = Viertel vor vier",
        "⚠️ FALLE: halb vier = 3:30 (halb WEG zu vier, nicht halb von drei!)",
        "━━━ WOCHENTAGE ━━━",
        "Montag | Dienstag | Mittwoch | Donnerstag | Freitag | Samstag | Sonntag",
        "ESELSBRÜCKE: \"My Dear Mother Doesn't Feed Stray Souls\"",
        "am Montag / am Dienstag / ... (immer mit 'am')",
        "━━━ MONATE ━━━",
        "Januar | Februar | März | April | Mai | Juni",
        "Juli | August | September | Oktober | November | Dezember",
        "Fast identisch mit Englisch — nur deutsche Aussprache!",
        "im Januar / im Februar / ... (immer mit 'im')",
        "━━━ JAHRESZEITEN ━━━",
        "der Frühling (spring) | der Sommer (summer) | der Herbst (autumn) | der Winter (winter)",
        "im Frühling / im Sommer / im Herbst / im Winter",
        "━━━ TRENNBARE VERBEN — Vorsilbe ans ENDE! ━━━",
        "aufstehen  → Ich stehe um 7 Uhr AUF.      (I get up at 7.)",
        "anrufen    → Er ruft seine Mutter AN.      (He calls his mother.)",
        "einkaufen  → Wir kaufen samstags EIN.      (We shop on Saturdays.)",
        "fernsehen  → Sie sieht abends fern.        (She watches TV in the evening.)",
        "aufräumen  → Ich räume mein Zimmer AUF.    (I tidy my room.)",
        "einschlafen → Ich schlafe um 22 Uhr EIN.  (I fall asleep at 10pm.)",
        "━━━ REFLEXIVE VERBEN — Tagesroutine ━━━",
        "sich waschen: Ich wasche mich. (I wash myself.)",
        "sich anziehen: Ich ziehe mich an. (I get dressed.)",
        "sich kämmen: Ich kämme mich. (I comb my hair.)",
        "sich setzen: Ich setze mich. (I sit down.)",
        "Reflexivpronomen: ich→mich | du→dich | er/sie→sich | wir→uns | ihr→euch"
      ],
      mnemonic: [
        "HALB-FALLE: \"halb vier\" = denke an eine Uhr die HALB ZU vier zeigt — also 3:30!",
        "WOCHENTAGE MERKHILFE: Montag=Mond | Dienstag=Thing (altes Gericht) | Mittwoch=Mitte der Woche | Donnerstag=Donner (Thor!) | Freitag=Freya | Samstag=Sabbat | Sonntag=Sonne",
        "TRENNBARE VERBEN TRICK: Die Vorsilbe fliegt ans Ende wie ein Boomerang!",
        "auf-stehen → \"Ich stehe... auf!\" — die Silbe kehrt zurück",
        "REFLEXIV TRICK: -mich/-dich/-sich — immer nach dem Verb, klingt wie 'myself/yourself/himself'"
      ],
      speak: [
        "Schau auf die Uhr jetzt. Sage die Zeit auf Deutsch (offiziell UND umgangssprachlich).",
        "Sage: die Zeit zu der du aufgestanden bist | Mittagszeit | deine Schlafenszeit",
        "Konjugiere aufstehen: ich stehe auf | du stehst auf | er steht auf | wir stehen auf",
        "Beschreibe deinen Tagesablauf mit 5 trennbaren Verben: Ich stehe um ___ auf. Ich...",
        "Alle 7 Wochentage auswendig sagen (mit Eselsbrücke: My Dear Mother...)",
        "Alle 12 Monate auf Deutsch sagen — Aussprache beachten!"
      ],
      science: "Zeit und Routinen sind hochfrequente Themen — wir sprechen täglich darüber. Trennbare Verben klingen zunächst seltsam für Englischsprecher, aber das Gehirn gewöhnt sich schnell an das Muster, wenn man es oft hört und produziert."
    }
  },
  {
    order_index: 8,
    content: {
      goals: [
        "Die 4 Familien starker Verben erkennen und nutzen (a→ä, e→i, e→ie)",
        "Das Perfekt mit haben und sein + Partizip II bilden",
        "Wissen wann sein verwendet wird (Bewegung A→B, Zustandsänderung)",
        "Erzählen was man gestern gemacht hat — in vollständigen Sätzen"
      ],
      chunks: [
        "━━━ WARUM DAS PERFEKT? ━━━",
        "Im mündlichen Alltag = DAS PERFEKT ist die Vergangenheitsform!",
        "\"Was hast du gestern gemacht?\" — nicht \"Was machtest du gestern?\"",
        "Das Präteritum (war, hatte) kommt in Lektion 9.",
        "━━━ PERFEKT FORMEL ━━━",
        "haben/sein (Position 2) + ... + Partizip II (IMMER am ENDE)",
        "Ich HABE gestern Tennis GESPIELT.",
        "Er IST nach Berlin GEFAHREN.",
        "━━━ PARTIZIP II BILDEN ━━━",
        "REGELMÄSSIG (schwach): ge- + STAMM + -t",
        "lernen→gelernt | spielen→gespielt | kaufen→gekauft | kochen→gekocht | machen→gemacht",
        "UNREGELMÄSSIG (stark): ge- + (veränderter) STAMM + -en (auswendig lernen!)",
        "fahren→gefahren | gehen→gegangen | essen→gegessen | trinken→getrunken",
        "sehen→gesehen | lesen→gelesen | sprechen→gesprochen | kommen→gekommen",
        "━━━ HABEN ODER SEIN? ━━━",
        "SEIN mit: Bewegung A→B: gehen, fahren, fliegen, schwimmen, laufen, reisen",
        "SEIN mit: Zustandsänderung: aufwachen, einschlafen, sterben, werden, wachsen",
        "SEIN mit: sein/bleiben/passieren",
        "ALLES ANDERE → haben!",
        "━━━ STARKE VERB-FAMILIEN ━━━",
        "FAMILIE 1 — a → ä: fahren→fährt | schlafen→schläft | tragen→trägt | laufen→läuft",
        "FAMILIE 2 — e → i: sprechen→spricht | essen→isst | geben→gibt | helfen→hilft",
        "FAMILIE 3 — e → ie: sehen→sieht | lesen→liest | empfehlen→empfiehlt",
        "FAMILIE 4 — ei → ie (Partizip): schreiben→geschrieben | bleiben→geblieben",
        "━━━ GESTERN ━━━",
        "gestern = yesterday | heute = today | vorgestern = the day before yesterday",
        "letzten Montag / letzte Woche / letzten Monat / letztes Jahr"
      ],
      mnemonic: [
        "PERFEKT FORMEL: haben/sein + ... + Partizip am ENDE = Sandwich! Inhalt in der Mitte, Brot am Rand!",
        "SEIN oder HABEN: SEIN = Dr. Mrs. VANDERTRAMP: Devenir, Rester, Monter, Retourner, Sortir... (franz. Eselsbrücke) — auf Deutsch: Bewegung oder Veränderung → SEIN",
        "EINFACHER TRICK: Kann ich fragen \"Wohin\"? → SEIN. Sonst → HABEN.",
        "\"Er ist gegangen\" (wohin? → Bewegung → SEIN) vs \"Er hat gespielt\" (kein Wohin → HABEN)",
        "ge-STAMM-t für schwache Verben: ge als Präfix, t als Suffix — Nomen in der Mitte!",
        "FAMILIE 1 Trick: a-Verben bekommen Umlaut — sie werden 'wütend' (ä)!"
      ],
      speak: [
        "Schnellfeuer: Sage die er/sie-Form dieser starken Verben: fahren→ | schlafen→ | essen→ | sehen→ | sprechen→",
        "Bilde Partizip II: lernen→ | spielen→ | fahren→ | essen→ | gehen→ | trinken→",
        "Konjugiere laut: haben (Perfekt-Hilfsverb): ich habe, du hast, er hat...",
        "Konjugiere laut: sein (Perfekt-Hilfsverb): ich bin, du bist, er ist...",
        "Erzähle was du gestern gemacht hast: 5 Sätze mit Perfekt",
        "\"Gestern habe ich ___ gegessen. Ich habe ___ getrunken. Ich bin um ___ aufgestanden.\""
      ],
      science: "\"Muster-Stapeln\": Statt 50 unregelmäßige Verben einzeln zu lernen, zeige das Gehirn 4 Familien mit vorhersehbaren Vokalwechseln. Das Gehirn erkennt Muster und kann neue Verben einordnen — exponentiell effektiver als Vokabelkarten."
    }
  },
  {
    order_index: 9,
    content: {
      goals: [
        "Die 8 Dativ-Präpositionen auswendig sagen (der Reim!)",
        "Korrekte Dativ-Artikel verwenden (dem/der)",
        "Wichtige Dativ-Kontraktionen nutzen: zum/zur/beim/vom/im/am",
        "Schlüssel-Dativ-Verben verwenden: helfen, gefallen, gehören, schmecken"
      ],
      chunks: [
        "━━━ DER DATIV — WAS IST ER? ━━━",
        "Der Dativ = der INDIREKTE Empfänger einer Aktion",
        "Wem gebe ich das Buch? → Ich gebe DEM Mann das Buch.",
        "Deutsch hat 4 Fälle: Nominativ (Subjekt) | Akkusativ (direktes Objekt) | Dativ (indirektes Objekt) | Genitiv (Besitz)",
        "━━━ DATIV-ARTIKEL ━━━",
        "DER Mann → DEM Mann (Dativ, maskulin)",
        "DIE Frau → DER Frau (Dativ, feminin) ← ACHTUNG: DER bei feminin!",
        "DAS Kind → DEM Kind (Dativ, neutral)",
        "DIE Kinder (Plural) → DEN Kindern (+ n am Nomen!)",
        "MEIN Auto → MEINEM Auto | MEINE Mutter → MEINER Mutter",
        "━━━ DER BERÜHMTE REIM ━━━",
        "\"AUS  AUßER  BEI  MIT  NACH  SEIT  VON  ZU\"",
        "(owss · owsser · by · mit · nakh · tsait · fon · tsoo)",
        "Diese 8 Präpositionen verlangen IMMER den Dativ!",
        "aus — Ich komme AUS Deutschland.",
        "außer — Alle AUßER mir waren pünktlich.",
        "bei — Ich wohne BEI meinen Eltern.",
        "mit — Ich fahre MIT dem Zug.",
        "nach — Wir fahren NACH Berlin. (bei Städten/Ländern ohne Artikel)",
        "seit — Ich lerne SEIT zwei Jahren Deutsch.",
        "von — Das ist ein Geschenk VON meiner Mutter.",
        "zu — Ich gehe ZU Fuß. / Ich fahre ZUM Bahnhof.",
        "━━━ KONTRAKTIONEN (Pflicht!) ━━━",
        "zu + dem = ZUM:   Ich gehe zum Bahnhof.",
        "zu + der = ZUR:   Ich gehe zur Schule.",
        "bei + dem = BEIM: Ich bin beim Arzt.",
        "von + dem = VOM:  Ich komme vom Supermarkt.",
        "in + dem = IM:    Ich bin im Kino.",
        "an + dem = AM:    Wir treffen uns am Bahnhof.",
        "━━━ DATIV-VERBEN ━━━",
        "helfen   (to help):    Ich helfe DEM Mann.          (I help the man.)",
        "danken   (to thank):   Ich danke MEINER Mutter.     (I thank my mother.)",
        "gefallen (to please):  Das gefällt MIR.             (I like that.)",
        "gehören  (to belong):  Das gehört MIR.              (That belongs to me.)",
        "schmecken(to taste):   Das schmeckt MIR gut.        (That tastes good to me.)",
        "passen   (to suit):    Das Kleid passt IHR.         (The dress suits her.)",
        "TRICK: gefallen/gehören/schmecken = immer MIT Dativ-Pronomen!"
      ],
      mnemonic: [
        "DER BERÜHMTE REIM singen bis er automatisch ist:",
        "\"AUS AUßER BEI MIT NACH SEIT VON ZU\" — wie ein Kinderlied!",
        "DATIV ARTIKEL TRICK: maskulin+neutral → DEM (DENK AN DAME) | feminin → DER (wie Nominativ maskulin!)",
        "KONTRAKTION TRICK: zum/zur/beim/vom/im/am klingen natürlich — Muttersprachler sagen NIE \"zu dem\"",
        "DATIV-VERBEN TRICK: Wenn das Verb eine REAKTION/EMPFINDUNG ausdrückt, oft Dativ: gefallen, schmecken, passen — das Objekt REAGIERT",
        "SEIT TRICK: seit = since (Zeit von da bis jetzt) — \"Ich lerne seit zwei Jahren\" = I've been learning for two years (noch immer!)"
      ],
      speak: [
        "Singe/Sage den Reim auswendig: AUS AUßER BEI MIT NACH SEIT VON ZU",
        "Fülle laut aus (Kontraktionen verwenden): Ich gehe ___ Bahnhof. | Ich komme ___ Deutschland. | Ich bin ___ Arzt.",
        "Dativ-Verben üben: Das gefällt ___ (mir). | Das gehört ___. | Das schmeckt ___ gut.",
        "Mit Dativ beschreiben: Ich fahre mit ___ (Zug/Bus/Auto) zur Arbeit.",
        "3 Sätze über deinen Alltag mit Dativ-Präpositionen",
        "Test: seit wann lernst du Deutsch? → \"Ich lerne seit ___ Deutsch.\""
      ],
      science: "\"Wünschenswerte Schwierigkeit\": Grammatik die leicht herausfordernd, aber sofort anwendbar ist, wird dauerhafter gespeichert als einfaches Auswendiglernen. Der Dativ-Reim nutzt phonologisches Gedächtnis (Reime werden 40% besser erinnert als Prosa)."
    }
  }
];

function supabaseRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'ypkpsosjkfrgenfcgjtq.supabase.co',
      path,
      method,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    };
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: responseData }));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  console.log('🚀 Aktualisiere Lektionen mit reichhaltigem Inhalt...\n');

  // First get all lessons with their IDs
  const { body } = await supabaseRequest('GET', '/rest/v1/lessons?select=id,order_index,title&order=order_index.asc', null);
  const lessons = JSON.parse(body);
  console.log(`📚 ${lessons.length} Lektionen gefunden.\n`);

  let updated = 0;
  for (const richLesson of RICH_LESSONS) {
    const dbLesson = lessons.find(l => l.order_index === richLesson.order_index);
    if (!dbLesson) {
      console.log(`⚠️  Lektion ${richLesson.order_index} nicht gefunden in DB`);
      continue;
    }

    const result = await supabaseRequest(
      'PATCH',
      `/rest/v1/lessons?id=eq.${dbLesson.id}`,
      { content: richLesson.content }
    );

    if (result.status === 200 || result.status === 204) {
      console.log(`✅ Lektion ${richLesson.order_index}: ${dbLesson.title}`);
      updated++;
    } else {
      console.log(`❌ Fehler bei Lektion ${richLesson.order_index}: ${result.status} ${result.body}`);
    }
  }

  console.log(`\n🎉 ${updated} Lektionen erfolgreich aktualisiert!`);
  console.log('📱 Die ersten 9 A1 Lektionen haben jetzt ausführlichen Inhalt.');
  console.log('\nNächster Schritt: ElevenLabs Credits kaufen → generate_audio_v2.js für neue längere Skripte!');
}

main().catch(console.error);
