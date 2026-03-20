// update_lessons_19_27.js
// Fills A1 lessons 19-27 with rich content
// Run: node update_lessons_19_27.js

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  "https://ypkpsosjkfrgenfcgjtq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwa3Bzb3Nqa2ZyZ2VuZmNnanRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTI4NDMsImV4cCI6MjA4ODY2ODg0M30.CJy-QP9GPf7o1f12aAWtBKOvJM5wXqJv3VIqHKBBRC0"
);

const LESSONS = {

19: {
  goals: [
    "Use correct adjective endings after der/die/das",
    "Use correct adjective endings after ein/eine/kein",
    "Use adjectives without articles (predicative — no ending!)",
    "Describe nouns with colour, size and quality adjectives",
  ],
  science: "Adjective endings are the most feared part of German — but there's a simple system. Predicative adjectives (after sein) NEVER change. After definite articles, only -E or -EN. That covers 80% of all cases immediately.",
  chunks: [
    "━━━ PREDICATIVE — NO ENDINGS ━━━",
    "REGEL 1 — After sein/werden/bleiben: adjective NEVER changes!",
    "→ Der Mann ist ALT. | Die Frau ist JUNG. | Das Haus ist GROSS. | Die Kinder sind MÜDE.",
    "⚠️ SHORTCUT: If unsure about endings, restructure to predicative position — always correct!",
    "━━━ AFTER DEFINITE ARTICLE (der/die/das) ━━━",
    "REGEL 2 — Only TWO endings: -E or -EN",
    "→ Nominative (subject): -E for all genders: der alte Mann | die junge Frau | das kleine Kind",
    "→ Everything else: -EN always: den alten Mann (acc.) | dem alten Mann (dat.) | die alten Männer (pl.)",
    "━━━ AFTER INDEFINITE ARTICLE (ein/eine/kein) ━━━",
    "REGEL 3 — Adjective must signal the gender (3 'strong' endings):",
    "→ -ER (masculine nom.): ein alter Mann  ← sounds like 'DER'",
    "→ -E  (feminine nom/acc.): eine junge Frau  ← sounds like 'DIE'",
    "→ -ES (neuter nom/acc.): ein großes Haus  ← sounds like 'DAS'",
    "→ Everything else: -EN (accusative masc., all dative, all plural)",
    "━━━ TOP 20 ADJECTIVES ━━━",
    "Größe: groß | klein | mittel | riesig (huge) | winzig (tiny)",
    "Alter: alt | jung | neu | modern | antik",
    "Qualität: gut | schlecht | schön | hässlich | teuer | günstig | lecker | furchtbar",
    "Gefühl: glücklich | traurig | müde | hungrig | lustig | langweilig | interessant",
  ],
  mnemonic: [
    "━━━ ADJECTIVE ENDING TRICKS ━━━",
    "SUPERPOWER: Just 2 rules cover 80% of all cases: (1) After sein = no ending. (2) After der/die/das = only -E or -EN.",
    "TRICK: Think of the definite article as doing all the hard work. It already shows gender, so the adjective just whispers '-e' or '-en' quietly.",
    "TRICK: After ein/eine, the adjective has to SHOUT the gender because 'ein' is ambiguous. So it copies the article ending: -ER (like der), -E (like die), -ES (like das).",
    "TRICK: 'After definite = weak endings. After indefinite = strong endings.' The article and adjective share the job!",
    "━━━ MEMORY AIDS ━━━",
    "TRICK: Nominative always gets -E after definite article. Think: N for Nominative, E for Easy.",
    "TRICK: When in doubt, use -EN. It's the most common ending by far!",
  ],
  speak: [
    "Das Haus ist alt. :: The house is old.",
    "Der alte Mann lächelt. :: The old man is smiling.",
    "Ich sehe einen großen Hund. :: I see a big dog.",
    "Sie trägt ein rotes Kleid. :: She's wearing a red dress.",
    "Das ist ein interessantes Buch! :: That's an interesting book!",
    "Ich helfe der alten Frau. :: I'm helping the old woman.",
    "Er kauft den teuren Wein. :: He's buying the expensive wine.",
    "Kleine Kinder schlafen viel. :: Small children sleep a lot.",
    "Das Essen ist wirklich lecker! :: The food is really delicious!",
    "Ich möchte ein warmes Zimmer. :: I would like a warm room.",
  ],
},

20: {
  goals: [
    "Use Präteritum of sein: war/waren",
    "Use Präteritum of haben: hatte/hatten",
    "Use Präteritum of all modal verbs (musste, konnte, wollte...)",
    "Know when to use Perfekt vs Präteritum",
  ],
  science: "The 80/20 rule at its best: sein, haben, and the 5 modal verbs account for ~50% of all past tense usage in spoken German. Learn just these 7 verbs in Präteritum and you're covered for almost every real conversation.",
  chunks: [
    "━━━ SEIN IM PRÄTERITUM ━━━",
    "REGEL 1 — sein → WAR (was/were):",
    "ich WAR | du WARST | er/sie/es WAR | wir WAREN | ihr WART | sie/Sie WAREN",
    "→ Gestern war ich müde. | Das Wetter war schön. | Wir waren in Wien.",
    "━━━ HABEN IM PRÄTERITUM ━━━",
    "REGEL 2 — haben → HATTE (had):",
    "ich HATTE | du HATTEST | er HATTE | wir HATTEN | ihr HATTET | sie HATTEN",
    "→ Er hatte Hunger. | Wir hatten keine Zeit. | Hattest du Erfolg?",
    "━━━ MODAL VERBS IM PRÄTERITUM ━━━",
    "REGEL 3 — Remove umlaut + add -TE endings:",
    "müssen → MUSSTE | können → KONNTE | wollen → WOLLTE",
    "dürfen → DURFTE | sollen → SOLLTE | mögen → MOCHTE",
    "→ Ich musste früh aufstehen. | Er konnte nicht kommen. | Sie wollte schlafen.",
    "━━━ PERFEKT VS PRÄTERITUM ━━━",
    "REGEL 4 — When to use which:",
    "→ SPOKEN German: Use PERFEKT for almost everything: 'Ich habe gegessen / Ich bin gegangen.'",
    "→ EXCEPTIONS — always use Präteritum even when speaking: sein (war) | haben (hatte) | all modals",
    "→ WRITTEN German (novels, news): use Präteritum for narratives.",
    "⚠️ RULE OF THUMB: If in doubt → Perfekt. Nobody will correct you!",
  ],
  mnemonic: [
    "━━━ PRÄTERITUM TRICKS ━━━",
    "TRICK: 'WAR' sounds like English 'war' — old and past! Perfect for the past tense of sein.",
    "TRICK: HATTE → think 'had a HABIT' in the past. Ich hatte eine Gewohnheit.",
    "TRICK: All modals: drop the umlaut, add -te. müSSEN → muSSTE. könNEN → konNTE. Easy pattern!",
    "━━━ WHEN TO USE WHICH ━━━",
    "SUPERPOWER: Only 7 verbs need Präteritum in spoken German: war/hatte + musste/konnte/wollte/durfte/sollte. Everything else = Perfekt!",
    "TRICK: 'Perfekt for actions, Präteritum for states.' Ich BIN gegangen (action) vs. Ich WAR müde (state).",
    "TRICK: In writing = Präteritum sounds natural. In speaking = Perfekt sounds natural. Simple rule!",
  ],
  speak: [
    "Gestern war ich sehr müde. :: Yesterday I was very tired.",
    "Das Wetter war gestern schön. :: The weather was nice yesterday.",
    "Wir waren letztes Jahr in Berlin. :: We were in Berlin last year.",
    "Er hatte keine Zeit gestern. :: He had no time yesterday.",
    "Ich musste früh aufstehen. :: I had to get up early.",
    "Sie konnte nicht kommen. :: She wasn't able to come.",
    "Ich wollte schlafen, aber ich musste arbeiten. :: I wanted to sleep but I had to work.",
    "Wir durften nicht rauchen. :: We weren't allowed to smoke.",
    "Hattest du gestern Spaß? :: Did you have fun yesterday?",
    "Das Konzert war fantastisch! :: The concert was fantastic!",
  ],
},

21: {
  goals: [
    "Form and use the comparative (größer, schneller, besser)",
    "Form and use the superlative (am größten, am besten)",
    "Make comparisons with 'als' (than) and 'so...wie' (as...as)",
    "Use irregular comparatives: gut→besser, viel→mehr, gern→lieber",
  ],
  science: "Comparatives and superlatives are high-frequency in everyday conversation — opinions, preferences, descriptions all use them. The good news: the pattern is almost identical to English. 'schnell → schneller → am schnellsten' mirrors 'fast → faster → fastest'.",
  chunks: [
    "━━━ COMPARATIVE ━━━",
    "REGEL 1 — Formation: adjective + -ER",
    "→ schnell → schneller | klein → kleiner | interessant → interessanter",
    "REGEL 2 — Short adjectives (1 syllable) often add UMLAUT:",
    "→ alt → älter | jung → jünger | groß → größer | kalt → kälter | warm → wärmer | lang → länger",
    "REGEL 3 — Comparing with 'als' (than):",
    "→ Berlin ist größer als München. | Er ist älter als ich.",
    "REGEL 4 — Equal comparison: so + adjective + wie (as...as):",
    "→ Sie ist so groß wie ich. (She is as tall as me.)",
    "━━━ SUPERLATIVE ━━━",
    "REGEL 5 — Predicative (after sein): am + adjective + -STEN",
    "→ schnell → am schnellsten | groß → am größten | alt → am ältesten",
    "REGEL 6 — Attributive (before noun): definite article + adjective + -STE + ending",
    "→ der schnellste Zug | die größte Stadt | das älteste Haus",
    "━━━ IRREGULAR FORMS ━━━",
    "⚠️ MUST MEMORISE — most common words in German:",
    "→ gut → besser → am besten  (like English: good/better/best!)",
    "→ viel → mehr → am meisten  (like English: much/more/most!)",
    "→ gern → lieber → am liebsten  (like/prefer/love most)",
  ],
  mnemonic: [
    "━━━ COMPARATIVE TRICKS ━━━",
    "TRICK: German -ER = English -ER. schneller = faster. kleiner = smaller. Almost identical!",
    "TRICK: Umlaut rule: short, common adjectives get an umlaut in comparative. alt→älter (think: Ä is 'older' looking with its dots!)",
    "━━━ SUPERLATIVE TRICKS ━━━",
    "TRICK: 'am besten' = 'at the best'. The 'am' frames it as 'at the top of the scale'.",
    "TRICK: gut/besser/am besten mirrors English good/better/best exactly. Same irregular pattern — free memory!",
    "TRICK: viel/mehr/am meisten mirrors English much/more/most exactly. Another free one!",
    "SUPERPOWER: gern/lieber/am liebsten = like/prefer/love most. Master this trio for instant preference expressions: 'Ich esse am liebsten Pizza!'",
  ],
  speak: [
    "Berlin ist größer als München. :: Berlin is bigger than Munich.",
    "Im Sommer ist es wärmer als im Winter. :: In summer it's warmer than in winter.",
    "Sie spricht besser Deutsch als ich. :: She speaks better German than me.",
    "Er ist so alt wie ich. :: He is the same age as me.",
    "Das ist die schönste Stadt Deutschlands! :: That is the most beautiful city in Germany!",
    "Ich esse am liebsten Pizza. :: Pizza is my favourite food.",
    "Dieser Kaffee ist besser als der andere. :: This coffee is better than the other one.",
    "Welches ist das günstigste Hotel? :: Which is the cheapest hotel?",
    "Ich trinke lieber Tee als Kaffee. :: I prefer tea to coffee.",
    "Am meisten mag ich den Sommer. :: I like summer the most.",
  ],
},

22: {
  goals: [
    "Say and write ordinal numbers 1st–31st",
    "Say and write dates in German correctly",
    "Say which floor a room is on",
    "Use 'am' + ordinal for 'on a date'",
  ],
  science: "Dates and ordinal numbers appear constantly in everyday German — appointments, birthdays, addresses, floors. The pattern is highly regular (just add -te or -ste) with only 4 irregulars to learn.",
  chunks: [
    "━━━ ORDINAL NUMBERS ━━━",
    "REGEL 1 — Formation:",
    "→ 2–19: number + -TE: zweite | dritte | vierte | fünfte | sechste | siebte | achte | neunte | zehnte",
    "→ 20+: number + -STE: zwanzigste | dreißigste | einundzwanzigste",
    "⚠️ IRREGULAR — must memorise: 1. → ERST- | 3. → DRITT- | 7. → SIEBT- | 8. → ACHT- (no extra T!)",
    "━━━ DATES ━━━",
    "REGEL 2 — Asking: 'Der Wievielte ist heute?' / 'Welches Datum haben wir?'",
    "REGEL 3 — Answering: 'Heute ist der [ordinal]. [month].'",
    "→ Heute ist der erste Oktober. | Heute ist der fünfzehnte März.",
    "REGEL 4 — 'On a date' = AM + ordinal (dative, so add -N to ending):",
    "→ am ersten Oktober | am fünfzehnten März | am dritten April",
    "━━━ FLOORS ━━━",
    "REGEL 5 — German floors:",
    "→ Erdgeschoss (EG) = ground floor | 1. Stock / 1. OG = first floor (one above ground)",
    "→ 2. Stock = second floor | Dachgeschoss (DG) = attic floor",
    "⚠️ IMPORTANT: German 1. Stock = British 1st floor (one above ground), NOT ground floor!",
  ],
  mnemonic: [
    "━━━ ORDINAL TRICKS ━━━",
    "TRICK: -TE for 2-19 (like the word 'eight' has a T). -STE for 20+ (bigger numbers, bigger ending!).",
    "TRICK: The 4 irregulars as a rhyme: ERST, DRITT, SIEBT, ACHT — learn these four and the rest is automatic!",
    "TRICK: 7. = SIEBT (not siebent — drop the EN). 8. = ACHT (not achtt — no double T!).",
    "━━━ DATE TRICKS ━━━",
    "TRICK: 'AM' + ordinal for dates = 'ON the...' — like English 'on the first of October'. AM ersten Oktober.",
    "TRICK: Written dates use a dot: 1. Oktober. The dot replaces the ordinal ending in writing.",
    "TRICK: German 'Erdgeschoss' = ground floor = floor 0. So the '1. Stock' is what British English calls the 1st floor!",
  ],
  speak: [
    "Der Wievielte ist heute? :: What's the date today?",
    "Heute ist der dritte März. :: Today is the third of March.",
    "Ich habe am fünfzehnten Juli Geburtstag. :: My birthday is on the 15th of July.",
    "Weihnachten ist am fünfundzwanzigsten Dezember. :: Christmas is on the 25th of December.",
    "Das Zimmer ist im zweiten Stock. :: The room is on the second floor.",
    "Ich wohne im Erdgeschoss. :: I live on the ground floor.",
    "Nehmen Sie die zweite Straße rechts. :: Take the second street on the right.",
    "Am ersten Januar beginnt das neue Jahr. :: On the first of January the new year begins.",
    "Der Aufzug fährt in den dritten Stock. :: The lift goes to the third floor.",
    "Wann ist das Treffen? Am zwölften um zehn Uhr. :: When is the meeting? On the 12th at ten o'clock.",
  ],
},

23: {
  goals: [
    "Say your nationality in German (Ich bin Engländer/Engländerin)",
    "Name 20+ countries and their nationalities",
    "Say which languages you speak and how well",
    "Ask others about their background and language skills",
  ],
  science: "Nationality and language vocabulary is among the most personally relevant vocabulary you can learn — you'll use it every time you introduce yourself. The patterns are highly regular, making this one of the easiest vocabulary sets to master.",
  chunks: [
    "━━━ NATIONALITY FORMATION ━━━",
    "REGEL 1 — Most nationalities: country + -ER (m) / -ERIN (f):",
    "→ England → Engländer / Engländerin | Deutschland → Deutscher / Deutsche",
    "→ Amerika → Amerikaner / Amerikanerin | Australien → Australier / Australierin",
    "⚠️ NO article with nationalities after sein: 'Ich bin Engländer.' NOT 'Ich bin ein Engländer.'",
    "━━━ COUNTRIES & NATIONALITIES ━━━",
    "Europa: Deutschland-Deutscher | England-Engländer | Frankreich-Franzose/Französin | Spanien-Spanier | Italien-Italiener | Österreich-Österreicher | die Schweiz-Schweizer",
    "Welt: die USA-Amerikaner | Kanada-Kanadier | Australien-Australier | Japan-Japaner | China-Chinese/Chinesin | Brasilien-Brasilianer | die Türkei-Türke/Türkin",
    "⚠️ Countries with article: die Schweiz | die Niederlande | die Türkei | die USA | der Iran | der Irak",
    "━━━ DESCRIBING LANGUAGE SKILLS ━━━",
    "REGEL 2 — Language phrases:",
    "→ 'Ich spreche ___ fließend.' (fluently) | 'Ich spreche ein bisschen ___.' (a little)",
    "→ 'Meine Muttersprache ist ___.' | 'Ich lerne ___ seit ___ Jahren.'",
    "→ 'Ich bin zweisprachig.' (bilingual) | 'Auf Deutsch / Auf Englisch' (in German/English)",
    "⚠️ Languages: NO article! 'Ich spreche Deutsch.' NOT 'Ich spreche das Deutsch.'",
  ],
  mnemonic: [
    "━━━ NATIONALITY TRICKS ━━━",
    "TRICK: Most nationalities = country name + -er. England → Engländer. Easy! The female form always adds -in at the end.",
    "TRICK: No article with nationalities after sein. 'Ich bin Arzt' and 'Ich bin Deutscher' — jobs and nationalities work the same way!",
    "TRICK: Countries with 'die': die Schweiz, die Türkei, die USA, die Niederlande. These 4 are the main ones to remember.",
    "━━━ LANGUAGE TRICKS ━━━",
    "TRICK: 'fließend' sounds like 'flowing' — your language flows! Fließend = fluent.",
    "TRICK: 'Muttersprache' = mother tongue. Mutter (mother) + Sprache (language). Your mother's language!",
    "SUPERPOWER: 5 sentences introduce your whole linguistic background: where from, nationality, mother tongue, other languages, how long learning German.",
  ],
  speak: [
    "Ich komme aus England. Ich bin Engländer. :: I come from England. I am English.",
    "Meine Muttersprache ist Englisch. :: My mother tongue is English.",
    "Ich spreche Englisch fließend und Deutsch ein bisschen. :: I speak English fluently and a little German.",
    "Ich lerne seit sechs Monaten Deutsch. :: I have been learning German for six months.",
    "Sprechen Sie Englisch? :: Do you speak English?",
    "Auf Deutsch, bitte! :: In German, please!",
    "Ich bin zweisprachig — Englisch und Spanisch. :: I am bilingual — English and Spanish.",
    "Woher kommen Sie? :: Where are you from?",
    "Welche Sprachen sprechen Sie? :: Which languages do you speak?",
    "Ihr Deutsch ist wirklich gut! :: Your German is really good!",
  ],
},

24: {
  goals: [
    "Check into and out of a hotel in German",
    "Describe what kind of room you want",
    "Make complaints about a room politely",
    "Ask for hotel services and facilities",
  ],
  science: "Hotel German is one of the most immediately practical skill sets. The conversations are predictable and formulaic — once you know the key phrases, you can handle any hotel situation confidently. Predictable = easy to learn!",
  chunks: [
    "━━━ HOTEL VOCABULARY ━━━",
    "Zimmertypen: das Einzelzimmer (single) | das Doppelzimmer (double) | das Familienzimmer | die Suite",
    "Ausstattung: das WLAN | die Klimaanlage | die Heizung | der Aufzug | das Frühstück | der Parkplatz",
    "→ das Handtuch (towel) | das Kissen (pillow) | die Decke (blanket) | der Schlüssel (key)",
    "━━━ CHECK-IN PHRASES ━━━",
    "REGEL 1 — Checking in: 'Ich habe eine Reservierung auf den Namen ___.'",
    "→ 'Ein Doppelzimmer für zwei Nächte, bitte.'",
    "→ 'Ist Frühstück inbegriffen?' (Is breakfast included?)",
    "→ 'Wann ist Check-out?' | 'Um wie viel Uhr ist Frühstück?'",
    "━━━ MAKING COMPLAINTS ━━━",
    "REGEL 2 — Complaint phrases:",
    "→ 'Entschuldigung, es gibt ein Problem mit dem Zimmer.'",
    "→ 'Die Klimaanlage funktioniert nicht.' | 'Die Heizung ist kaputt.'",
    "→ 'Das Zimmer ist zu laut / zu kalt / zu heiß / nicht sauber.'",
    "→ 'Könnte ich ein anderes Zimmer haben?' | 'Können Sie bitte jemanden schicken?'",
    "⚠️ KULTUR: In Germany you must show your passport at check-in (Meldepflicht — legal requirement). Normal!",
  ],
  mnemonic: [
    "━━━ HOTEL TRICKS ━━━",
    "TRICK: 'Reservierung auf den Namen ___' = reservation under the name ___. Auf = under/on (like 'on the books').",
    "TRICK: 'inbegriffen' = included. In + begriffen (grasped/included). Think: it's 'grasped within' the price.",
    "TRICK: 'funktioniert nicht' = doesn't work/function. Funktionieren looks just like English 'function'. Easy!",
    "━━━ COMPLAINT FORMULA ━━━",
    "SUPERPOWER: One formula handles all complaints: 'Die/Das ___ funktioniert nicht.' OR 'Das Zimmer ist zu ___.' Two templates = every hotel complaint covered!",
    "TRICK: 'Könnte ich...' (Konjunktiv II) makes complaints polite. Always use 'könnte' for requests, not 'kann' — sounds much more professional.",
  ],
  speak: [
    "Ich habe eine Reservierung auf den Namen Müller. :: I have a reservation under the name Müller.",
    "Ein Doppelzimmer für drei Nächte, bitte. :: A double room for three nights, please.",
    "Ist Frühstück inbegriffen? :: Is breakfast included?",
    "Wann ist Check-out? :: When is check-out?",
    "Das WLAN funktioniert nicht. :: The WiFi doesn't work.",
    "Das Zimmer ist zu laut — könnte ich ein anderes haben? :: The room is too noisy — could I have another one?",
    "Es gibt keine Handtücher im Badezimmer. :: There are no towels in the bathroom.",
    "Können Sie bitte jemanden schicken? :: Could you please send someone?",
    "Darf ich Ihren Reisepass sehen? :: May I see your passport?",
    "Gute Nacht und einen angenehmen Aufenthalt! :: Good night and a pleasant stay!",
  ],
},

25: {
  goals: [
    "Describe the German school system",
    "Talk about your own education and qualifications",
    "Name school subjects and say which you liked or hated",
    "Discuss what you studied or are studying",
  ],
  science: "Education vocabulary is deeply personal — it connects to your own life story. Research shows that personally relevant vocabulary is retained up to 3× faster. Talking about your own school experiences supercharges this effect.",
  chunks: [
    "━━━ GERMAN SCHOOL SYSTEM ━━━",
    "REGEL 1 — After 4 years of Grundschule (primary), students go to:",
    "→ Hauptschule (ends grade 9) | Realschule (ends grade 10) | Gymnasium (ends grade 12/13 = Abitur)",
    "→ Abitur = university entrance qualification (like A-levels)",
    "→ Ausbildung = apprenticeship (2-3 years, work + school combined). ~50% choose this. Highly respected!",
    "━━━ SCHOOL VOCABULARY ━━━",
    "Fächer: Mathematik | Deutsch | Englisch | Biologie | Chemie | Physik | Geschichte | Geographie | Kunst | Musik | Sport",
    "Schule: die Klasse | der Lehrer/die Lehrerin | die Hausaufgaben | die Prüfung/Klausur | die Note (grade) | das Zeugnis (report card)",
    "→ der Stundenplan (timetable) | die Pause (break) | das Schuljahr (school year)",
    "━━━ TALKING ABOUT EDUCATION ━━━",
    "REGEL 2 — Key phrases:",
    "→ 'Ich habe ___ als Lieblingsfach.' | 'Ich finde ___ interessant / langweilig / schwer.'",
    "→ 'Ich habe das Abitur / den Realschulabschluss gemacht.'",
    "→ 'Ich studiere ___ an der Universität ___.' | 'Ich mache eine Ausbildung als ___.'",
    "→ 'Ich bin im dritten Semester.' | 'Ich schreibe meine Bachelorarbeit.'",
  ],
  mnemonic: [
    "━━━ EDUCATION TRICKS ━━━",
    "TRICK: 'Abitur' = the famous German school-leaving exam. Think 'Ab-i-tur' = the turning point of your education!",
    "TRICK: 'Ausbildung' = aus (out) + Bildung (education/formation). You go OUT into the world to get your formation/training.",
    "TRICK: 'Gymnasium' in German = academic secondary school (NOT a sports hall!). English false friend alert!",
    "━━━ SUBJECTS TRICKS ━━━",
    "TRICK: Many subjects are cognates: Mathematik | Biologie | Chemie | Physik | Geographie | Musik. Just add German pronunciation!",
    "TRICK: 'Note' in German = GRADE (not a musical note or written note!). Eine Eins (1) = excellent in Germany. The scale goes 1-6.",
    "SUPERPOWER: German grades: 1 = sehr gut | 2 = gut | 3 = befriedigend | 4 = ausreichend | 5/6 = fail. The LOWER the number, the BETTER!",
  ],
  speak: [
    "Mein Lieblingsfach war Biologie. :: My favourite subject was Biology.",
    "Ich fand Mathematik sehr schwer. :: I found Maths very difficult.",
    "Ich habe das Abitur mit einer 2,1 gemacht. :: I got my Abitur with a 2.1 average.",
    "Ich studiere Informatik im zweiten Semester. :: I'm studying Computer Science in my second semester.",
    "Ich mache eine Ausbildung als Elektriker. :: I'm doing an apprenticeship as an electrician.",
    "Hattest du gute Noten in der Schule? :: Did you get good grades at school?",
    "Das Gymnasium dauert bis zur zwölften Klasse. :: Grammar school goes until year 12.",
    "Ich schreibe gerade meine Bachelorarbeit. :: I'm currently writing my Bachelor's thesis.",
    "Was war dein Lieblingsfach? :: What was your favourite subject?",
    "In Deutschland ist die Ausbildung sehr respektiert. :: In Germany, apprenticeships are highly respected.",
  ],
},

26: {
  goals: [
    "Name 30+ common professions (male and female forms)",
    "Describe your working day and workplace",
    "Talk about job satisfaction and working conditions",
    "Write a brief professional introduction",
  ],
  science: "Work vocabulary is used in nearly every social introduction — 'Was machst du beruflich?' is one of the first questions Germans ask. The female form pattern (-in) is highly regular, making this a very learnable vocabulary set.",
  chunks: [
    "━━━ PROFESSIONS — FEMALE FORMS ━━━",
    "REGEL 1 — Female form: usually add -IN to male form:",
    "→ Lehrer → Lehrerin | Arzt → Ärztin | Ingenieur → Ingenieurin | Kaufmann → Kauffrau",
    "→ Koch → Köchin | Rechtsanwalt → Rechtsanwältin | Programmierer → Programmiererin",
    "⚠️ NO article with professions after sein/werden/arbeiten als:",
    "→ 'Ich bin Arzt.' NOT 'Ich bin ein Arzt.' | 'Ich arbeite als Ingenieurin.'",
    "━━━ COMMON PROFESSIONS ━━━",
    "Medizin: der Arzt/die Ärztin | die Krankenschwester/der Krankenpfleger | der Zahnarzt",
    "Bildung: der Lehrer/die Lehrerin | der Professor | der Erzieher (nursery teacher)",
    "Technik: der Ingenieur | der Programmierer | der Elektriker | der Mechaniker",
    "Business: der Kaufmann | der Manager | der Buchhalter (accountant) | der Anwalt (lawyer)",
    "Service: der Koch | der Kellner | der Friseur (hairdresser) | der Taxifahrer | der Polizist",
    "━━━ TALKING ABOUT WORK ━━━",
    "REGEL 2 — Key work phrases:",
    "→ 'Ich bin ___ von Beruf.' | 'Ich arbeite als ___.' | 'Ich arbeite bei + [Unternehmen].'",
    "→ 'Ich arbeite Vollzeit / Teilzeit / im Homeoffice.' | '___ Stunden pro Woche.'",
    "→ 'Mein Job macht mir Spaß.' | 'Mein Job ist stressig / abwechslungsreich / langweilig.'",
    "→ 'Ich bin selbstständig.' (self-employed) | 'Ich bin arbeitslos.' (unemployed)",
  ],
  mnemonic: [
    "━━━ PROFESSIONS TRICKS ━━━",
    "TRICK: Female form = male form + -IN. Almost always works! Lehr-ER → Lehr-ERIN. Ingenieur → Ingenieur-IN.",
    "TRICK: No article with jobs — same rule as nationalities! 'Ich bin Arzt' = 'Ich bin Deutscher'. Same pattern.",
    "TRICK: 'von Beruf' = 'by profession'. Beruf = profession/calling. Ich bin Lehrer von Beruf = Teaching is my calling.",
    "━━━ WORK PHRASES TRICKS ━━━",
    "TRICK: 'abwechslungsreich' = varied/diverse. Abwechslung (variety) + reich (rich). Rich in variety!",
    "TRICK: 'selbstständig' = self-standing/independent. Selbst (self) + ständig (standing). You STAND ON YOUR OWN!",
    "SUPERPOWER: Three sentences describe any job: (1) what you are, (2) where you work, (3) how you find it. 'Ich bin Lehrerin. Ich arbeite an einer Schule in München. Mein Job macht mir viel Spaß!'",
  ],
  speak: [
    "Ich bin Lehrerin von Beruf. :: I am a teacher by profession.",
    "Ich arbeite als Ingenieur bei Siemens. :: I work as an engineer at Siemens.",
    "Was machst du beruflich? :: What do you do for work?",
    "Ich arbeite Vollzeit — 40 Stunden pro Woche. :: I work full time — 40 hours a week.",
    "Mein Job macht mir sehr viel Spaß! :: I really enjoy my job!",
    "Ich arbeite im Homeoffice zwei Tage pro Woche. :: I work from home two days a week.",
    "Ich bin selbstständig — ich habe meine eigene Firma. :: I'm self-employed — I have my own company.",
    "Mein Job ist manchmal stressig, aber abwechslungsreich. :: My job is sometimes stressful but varied.",
    "Ich möchte Ärztin werden. :: I want to become a doctor.",
    "In Deutschland hat man mindestens 20 Urlaubstage. :: In Germany you have at least 20 days of holiday.",
  ],
},

27: {
  goals: [
    "Review and consolidate all A1 vocabulary and grammar",
    "Hold a 5-minute conversation on any A1 topic",
    "Identify personal strengths and gaps before A2",
    "Feel proud of reaching A1 level in German!",
  ],
  science: "You have completed A1. Research on language learning shows that learners who review and celebrate milestones are significantly more likely to continue. Take a moment to recognise what you have achieved — it matters for motivation.",
  chunks: [
    "━━━ A1 COMPLETE — WHAT YOU CAN DO ━━━",
    "→ Introduce yourself: name, age, origin, family, job, hobbies",
    "→ Navigate daily life: transport, shopping, restaurants, health, hotels",
    "→ Express time: dates, days, months, seasons, telling the time",
    "→ Describe the world: weather, home, people, objects with adjectives",
    "→ Talk about the past: Perfekt + Präteritum of sein/haben/modals",
    "→ Make plans: appointments, suggestions, accepting and declining",
    "→ Communicate formally: phone calls, emails, official situations",
    "━━━ A1 GRAMMAR MASTERED ━━━",
    "REGEL 1 — Word order: Verb always position 2. Modal + Infinitive at end.",
    "REGEL 2 — Cases: Nominativ | Akkusativ (DER→DEN) | Dativ (aus/bei/mit/nach/seit/von/zu/nach)",
    "REGEL 3 — sein: bin/bist/ist/sind/seid/sind | haben: habe/hast/hat/haben/habt/haben",
    "REGEL 4 — Perfekt: haben/sein + Partizip II | Präteritum: war/hatte/musste/konnte/wollte",
    "REGEL 5 — Adjective endings: predicative = none | after def. article = -e/-en | after indef. = -er/-e/-es/-en",
    "REGEL 6 — Comparisons: -er + als | am -sten | gut→besser→am besten",
    "━━━ WHAT'S WAITING AT A2 ━━━",
    "→ Präteritum for all verbs (narrative past tense)",
    "→ Relativsätze (relative clauses): 'Das ist der Mann, der...'",
    "→ Konjunktiv II expanded: würde, könnte, sollte in full use",
    "→ Vocabulary expansion to 1,500+ words",
    "⚠️ YOU DID IT — A1 COMPLETE! Weiter zu A2! 🎉",
  ],
  mnemonic: [
    "━━━ A1 ACHIEVEMENT UNLOCKED ━━━",
    "SUPERPOWER: You now know the foundation of German. ~600 words and these grammar patterns give you access to 70% of everyday spoken German.",
    "TRICK: The 5-second test: Can you say where you're from, what you do, and what you like in German? If yes — you're genuinely A1.",
    "TRICK: The best way to maintain A1 is to USE it: watch German YouTube with subtitles, listen to easy German podcasts, label objects at home.",
    "━━━ MOTIVATION ━━━",
    "TIPP: The jump from A1 to A2 is the fastest progress you'll ever make — your foundation is solid and everything builds quickly now.",
    "TIPP: Try to have ONE German conversation per week, even just 5 minutes. Consistency beats intensity every time.",
    "TIPP: 'Easy German' on YouTube is perfect for A1/A2 learners — real street interviews with subtitles in German and English.",
  ],
  speak: [
    "Ich heiße ___ und ich komme aus ___. Ich bin ___ Jahre alt. :: My name is ___ and I come from ___. I am ___ years old.",
    "Ich bin ___ von Beruf und ich wohne in ___. :: I am a ___ by profession and I live in ___.",
    "In meiner Freizeit ___ ich gerne ___. :: In my free time I like ___ing.",
    "Gestern habe ich ___ gemacht und ich war sehr ___. :: Yesterday I ___ and I was very ___.",
    "Ich spreche ein bisschen Deutsch! :: I speak a little German!",
    "Ich lerne Deutsch seit ___ Monaten. :: I have been learning German for ___ months.",
    "Mein Lieblingswort auf Deutsch ist ___. :: My favourite German word is ___.",
    "Deutschland ist interessant, weil ___. :: Germany is interesting because ___.",
    "Ich möchte eines Tages nach Deutschland reisen! :: I would like to travel to Germany one day!",
    "Ich bin jetzt A1 — auf zu A2! :: I am now A1 — on to A2! 🎉",
  ],
},

};

async function updateLessons() {
  console.log("🔄 Fetching A1 lessons 19-27...");
  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("id, order_index, content")
    .eq("level", "A1")
    .order("order_index");

  if (error) { console.error("❌", error.message); return; }

  for (const lesson of lessons) {
    const idx = lesson.order_index;
    const update = LESSONS[idx];
    if (!update) {
      console.log(`⏭️  Lesson ${idx} — skipped`);
      continue;
    }

    const updatedContent = {
      ...lesson.content,
      goals: update.goals,
      science: update.science,
      chunks: update.chunks,
      mnemonic: update.mnemonic,
      speak: update.speak,
    };

    const { error: updateError } = await supabase
      .from("lessons")
      .update({ content: updatedContent })
      .eq("id", lesson.id);

    if (updateError) {
      console.error(`❌ Lesson ${idx}:`, updateError.message);
    } else {
      console.log(`✅ Lesson ${idx} — updated`);
    }
  }
  console.log("\n🎉 All A1 lessons complete!");
}

updateLessons();
