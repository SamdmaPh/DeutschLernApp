// update_lessons_10_18.js
// Fills A1 lessons 10-18 with rich content from "Deutsch Sprechen Ab Tag 1" book
// Run: node update_lessons_10_18.js

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  "https://ypkpsosjkfrgenfcgjtq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwa3Bzb3Nqa2ZyZ2VuZmNnanRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTI4NDMsImV4cCI6MjA4ODY2ODg0M30.CJy-QP9GPf7o1f12aAWtBKOvJM5wXqJv3VIqHKBBRC0"
);

const LESSONS = {

10: {
  goals: [
    "Say how you travel using 'mit + dative'",
    "Buy a train ticket and navigate a station",
    "Give and follow directions in German",
    "Name 15+ key places in a city",
  ],
  science: "Transport vocabulary is immediately useful — Germans use public transport constantly. Knowing these phrases on day one means you can navigate any German city with confidence.",
  chunks: [
    "━━━ TRANSPORT (MIT + DATIV) ━━━",
    "REGEL 1 — Vehicles use 'mit + Dativ': mit dem Auto | mit dem Bus | mit dem Zug | mit dem Fahrrad",
    "→ mit der U-Bahn | mit der S-Bahn | mit der Straßenbahn | mit dem Flugzeug | mit dem Schiff",
    "⚠️ EXCEPTION: 'zu Fuß gehen' (on foot) — NO 'mit'!",
    "━━━ AT THE STATION ━━━",
    "REGEL 2 — Buying a ticket: 'Ein Ticket nach ___, bitte.' / 'Einmal nach ___, einfach / hin und zurück.'",
    "→ 'Wann fährt der nächste Zug nach ___?' (When does the next train to ___ leave?)",
    "→ 'Von welchem Gleis?' (From which platform?)",
    "→ 'Muss ich umsteigen?' (Do I have to change?)",
    "→ 'Ich habe meinen Zug verpasst.' (I missed my train.)",
    "━━━ GIVING DIRECTIONS ━━━",
    "REGEL 3 — Key direction words:",
    "→ geradeaus (straight ahead) | links abbiegen (turn left) | rechts abbiegen (turn right)",
    "→ an der Ampel (at the traffic lights) | an der Kreuzung (at the junction)",
    "→ gegenüber (opposite) | neben (next to) | ungefähr ___ Minuten zu Fuß (about ___ minutes on foot)",
    "━━━ KEY PLACES ━━━",
    "Bahnhof: der Bahnhof | die U-Bahn-Station | der Flughafen | der Hafen",
    "Stadt: das Rathaus | die Kirche | das Museum | der Park | die Apotheke | die Bank",
    "Essen: das Restaurant | das Café | der Supermarkt | der Markt",
    "⚠️ KULTUR: Germany has one of the world's best public transport systems. The 'Deutschlandticket' (49€/month) = unlimited regional travel across ALL of Germany!",
  ],
  mnemonic: [
    "━━━ TRANSPORT TRICKS ━━━",
    "TRICK: 'mit dem' = male/neuter nouns, 'mit der' = female nouns. Auto (das) → mit dem Auto. U-Bahn (die) → mit der U-Bahn.",
    "TRICK: 'Gleis' sounds like 'glide' — the train GLIDES along the Gleis (platform track).",
    "TRICK: 'umsteigen' = um (around) + steigen (climb) → you CLIMB AROUND to change trains.",
    "TRICK: 'geradeaus' = gerade (straight) + aus (out) → go STRAIGHT OUT.",
    "━━━ DIRECTIONS MEMORY ━━━",
    "TRICK: 'Links' = LEFT. Think: 'Links in a chain go LEFT to RIGHT.' L = Left = Links.",
    "TRICK: 'Rechts' sounds like 'RIGHTS' — you have the RIGHT to go RIGHT.",
    "TRICK: 'gegenüber' = gegen (against/opposite) + über (over). Imagine standing OVER and AGAINST something opposite you.",
  ],
  speak: [
    "Mit dem Bus, bitte. :: By bus, please.",
    "Ein Ticket nach München, hin und zurück. :: One ticket to Munich, return.",
    "Wann fährt der nächste Zug? :: When does the next train leave?",
    "Von welchem Gleis? :: From which platform?",
    "Muss ich umsteigen? :: Do I have to change?",
    "Ich habe meinen Zug verpasst. :: I missed my train.",
    "Gehen Sie geradeaus, dann links. :: Go straight ahead, then left.",
    "Die Bank ist gegenüber der Apotheke. :: The bank is opposite the pharmacy.",
    "Ungefähr zehn Minuten zu Fuß. :: About ten minutes on foot.",
    "Wo ist der nächste Bahnhof? :: Where is the nearest train station?",
  ],
},

11: {
  goals: [
    "Navigate a full shopping situation from entering to paying",
    "Describe clothing with colour and size",
    "Use adjective endings after articles (first look)",
    "Make complaints and request exchanges",
  ],
  science: "Shopping vocabulary is one of the most practically useful skill sets for travellers and expats. German shops are often cash-preferred — knowing these phrases saves real embarrassment.",
  chunks: [
    "━━━ SHOPPING PHRASES ━━━",
    "REGEL 1 — Asking: 'Haben Sie ___?' | 'Wo finde ich ___?' | 'Gibt es ___ in groß/klein/rot?'",
    "REGEL 2 — Buying: 'Ich nehme ___.': I'll take ___ | 'Kann ich ___ sehen?' Can I see ___?",
    "REGEL 3 — Price: 'Was kostet das?' | 'Wie viel kostet ___?' | 'Haben Sie etwas Günstigeres?' (anything cheaper?)",
    "REGEL 4 — Paying: 'Ich zahle mit Karte.' | 'Kann ich mit Karte zahlen?' | 'Stimmt so!' (keep the change!)",
    "REGEL 5 — Complaints: 'Das ist kaputt.' | 'Kann ich das umtauschen?' | 'Ich möchte es zurückgeben.'",
    "━━━ CLOTHING VOCABULARY ━━━",
    "Kleidung: das T-Shirt | die Jacke | die Hose | das Kleid | der Rock | der Pullover | die Schuhe",
    "Größen: klein | mittel | groß | Größe 38/40/42",
    "→ 'Kann ich das anprobieren?' (Can I try this on?)",
    "━━━ ADJECTIVE ENDINGS (FIRST LOOK) ━━━",
    "REGEL 6 — After der/die/das: adjective gets -E or -EN",
    "→ der alte Mann | die alte Frau | das alte Haus  ← -e after der/die/das",
    "→ den alten Mann (accusative masculine) ← -en",
    "REGEL 7 — After ein/eine: adjective carries gender signal",
    "→ ein alter Mann | eine alte Frau | ein altes Haus",
    "⚠️ SHORTCUT: After definite article, always -E or -EN. That covers 90% of cases!",
    "⚠️ KULTUR: German shops close at 20:00. NO Sunday trading! Cash is still king — 'Nur Bares ist Wahres.'",
  ],
  mnemonic: [
    "━━━ SHOPPING TRICKS ━━━",
    "TRICK: 'umtauschen' = um (around/over) + tauschen (swap). You're SWAPPING it OVER to something else.",
    "TRICK: 'Stimmt so' literally means 'it's correct like that' — perfect tip phrase!",
    "TRICK: 'anprobieren' = an (on) + probieren (try). You TRY ON the clothes.",
    "━━━ ADJECTIVE ENDINGS TRICK ━━━",
    "TRICK: Think of adjective endings as 'gender detectives'. When der/die/das already shows the gender, the adjective just adds -e (weak ending). When the article is missing or unclear, the adjective adds a stronger ending.",
    "SUPERPOWER: Learn just -E and -EN for definite articles. That's 90% of all cases you'll encounter at A1!",
  ],
  speak: [
    "Haben Sie das in Größe 40? :: Do you have this in size 40?",
    "Kann ich das anprobieren? :: Can I try this on?",
    "Was kostet das? :: How much does this cost?",
    "Gibt es das in Rot? :: Do you have this in red?",
    "Ich nehme das. :: I'll take it.",
    "Kann ich mit Karte zahlen? :: Can I pay by card?",
    "Stimmt so! :: Keep the change!",
    "Das ist kaputt. Kann ich es umtauschen? :: This is broken. Can I exchange it?",
    "Haben Sie etwas Günstigeres? :: Do you have anything cheaper?",
    "Ich möchte es zurückgeben. :: I would like to return it.",
  ],
},

12: {
  goals: [
    "Name all major body parts in German",
    "Describe symptoms using 'Mir tut ___ weh' and 'Ich habe ___'",
    "Handle a doctor's appointment in German",
    "Ask for medicine at a pharmacy",
  ],
  science: "Health vocabulary can literally be life-saving. The patterns 'Mir tut ___ weh' and 'Ich habe ___' are two templates that cover almost every symptom — master these two and you can describe any health problem.",
  chunks: [
    "━━━ BODY PARTS ━━━",
    "Kopf: der Kopf (head) | das Haar (hair) | das Ohr (ear) | das Auge (eye) | die Nase (nose) | der Mund (mouth)",
    "Körper: der Hals (neck/throat) | die Schulter (shoulder) | der Arm (arm) | die Hand (hand) | der Finger (finger)",
    "Unten: der Rücken (back) | der Bauch (stomach) | das Bein (leg) | der Fuß (foot) | der Zeh (toe)",
    "━━━ DESCRIBING SYMPTOMS ━━━",
    "REGEL 1 — Two patterns for pain:",
    "→ 'Mir tut ___ weh.' — My ___ hurts. (Mir tut der Kopf weh. = My head hurts.)",
    "→ 'Ich habe ___ Schmerzen.' — I have ___ pain. (Ich habe Kopfschmerzen.)",
    "REGEL 2 — Other symptoms:",
    "→ Ich habe Fieber. | Ich habe Husten. | Ich habe Schnupfen. | Ich bin erkältet.",
    "→ Ich fühle mich schwach. | Mir ist schlecht. | Ich bin allergisch gegen ___.",
    "━━━ AT THE DOCTOR'S ━━━",
    "→ 'Seit wann haben Sie diese Beschwerden?' (How long have you had these symptoms?)",
    "→ 'Ich habe seit ___ Tagen ___.' (I've had ___ for ___ days.)",
    "━━━ AT THE PHARMACY ━━━",
    "REGEL 3 — Pharmacy frames: 'Ich brauche etwas gegen ___.' (I need something for ___)",
    "→ 'Ohne Rezept' (without prescription) | 'Mit Rezept' (with prescription)",
    "→ 'Wie oft soll ich das nehmen?' | 'Gibt es Nebenwirkungen?' (Are there side effects?)",
    "⚠️ 'Gute Besserung!' = Get well soon! — say this whenever someone is ill.",
  ],
  mnemonic: [
    "━━━ HEALTH TRICKS ━━━",
    "TRICK: 'Mir tut ___ weh' — 'weh' sounds like 'way'. Something hurts when it gets 'in the way'!",
    "TRICK: Kopf-schmerzen = head pain. Bau-schmerzen = stomach pain. Just add 'schmerzen' to the body part!",
    "TRICK: 'Fieber' sounds like 'fever' — easy cognate!",
    "TRICK: 'Husten' → think 'HOOST-en', like a gust of coughing.",
    "TRICK: 'Gute Besserung' = 'good betterment' — bess = better (besser). You're wishing them 'improvement'.",
    "SUPERPOWER: Just two frames: 'Ich habe ___' and 'Mir tut ___ weh' cover 95% of all symptoms you'll ever need to describe!",
  ],
  speak: [
    "Mir tut der Kopf weh. :: My head hurts.",
    "Ich habe Bauchschmerzen. :: I have stomach ache.",
    "Ich habe Fieber und Husten. :: I have a fever and a cough.",
    "Seit zwei Tagen fühle ich mich nicht gut. :: I haven't felt well for two days.",
    "Ich bin allergisch gegen Penicillin. :: I am allergic to penicillin.",
    "Ich brauche etwas gegen Kopfschmerzen. :: I need something for a headache.",
    "Wie oft soll ich das nehmen? :: How often should I take this?",
    "Gibt es das ohne Rezept? :: Is this available without a prescription?",
    "Gute Besserung! :: Get well soon!",
    "Mir ist schlecht. :: I feel sick.",
  ],
},

13: {
  goals: [
    "Describe your home: rooms, floor and features",
    "Name all rooms and key furniture items",
    "Use stehen/liegen/hängen correctly for furniture position",
    "Use two-way prepositions correctly (Wo? Dativ / Wohin? Akkusativ)",
  ],
  science: "Two-way prepositions are one of the most important grammar concepts in German. The simple question 'Wo?' vs 'Wohin?' determines the entire case. Learn this one rule and 9 prepositions become logical instantly.",
  chunks: [
    "━━━ HOME VOCABULARY ━━━",
    "Räume: die Küche (kitchen) | das Wohnzimmer (living room) | das Schlafzimmer (bedroom) | das Badezimmer (bathroom)",
    "→ das Arbeitszimmer (study) | der Keller (cellar) | der Balkon (balcony) | der Garten (garden)",
    "Möbel: das Sofa | der Tisch | der Stuhl | das Bett | der Schrank | das Regal | die Lampe | der Spiegel",
    "━━━ FURNITURE POSITION VERBS ━━━",
    "REGEL 1 — Three position verbs:",
    "→ STEHEN (upright): Der Schrank steht im Zimmer. / der Tisch, der Stuhl, die Lampe",
    "→ LIEGEN (flat/lying): Der Teppich liegt auf dem Boden. / das Buch, die Zeitung",
    "→ HÄNGEN (hanging): Das Bild hängt an der Wand. / der Spiegel, der Vorhang",
    "━━━ HOME PHRASES ━━━",
    "→ 'Meine Wohnung hat ___ Zimmer.' | 'Die Wohnung ist ___ m² groß.'",
    "→ 'Sie liegt im dritten Stock.' | 'Es gibt einen Balkon / Keller / Garten.'",
    "→ 'Wie viel kostet die Miete?' | 'Ist die Wohnung möbliert?'",
    "━━━ TWO-WAY PREPOSITIONS ━━━",
    "REGEL 2 — 9 prepositions: an | auf | hinter | in | neben | über | unter | vor | zwischen",
    "REGEL 3 — The key question:",
    "→ WO? (where is it?) → DATIV: Die Lampe steht AUF DEM Tisch.",
    "→ WOHIN? (where to?) → AKKUSATIV: Ich stelle die Lampe AUF DEN Tisch.",
    "⚠️ KULTUR: ~57% of Germans rent their homes. 'WG' (Wohngemeinschaft) = flat share, very common for students.",
  ],
  mnemonic: [
    "━━━ FURNITURE TRICKS ━━━",
    "TRICK: STEHEN = STAND (upright objects stand). LIEGEN = LIE DOWN (flat objects lie). HÄNGEN = HANG (think of a picture hanging).",
    "TRICK: Schrank → stands upright like a wardrobe. Teppich → lies flat on the floor. Bild → hangs on the wall.",
    "━━━ PREPOSITION TRICKS ━━━",
    "SUPERPOWER: Ask ONE question — 'Wo oder Wohin?' WHERE = Dativ. WHERE TO = Akkusativ. This one question unlocks all 9 prepositions!",
    "TRICK: 'Wohin' has an 'N' at the end → Akkusativ has 'N' too (den, einen). They match!",
    "TRICK: Contractions to memorise: in + dem = im | an + dem = am | in + das = ins | an + das = ans",
  ],
  speak: [
    "Meine Wohnung hat drei Zimmer. :: My flat has three rooms.",
    "Im Wohnzimmer steht ein großes Sofa. :: There is a large sofa in the living room.",
    "Das Bild hängt an der Wand. :: The picture hangs on the wall.",
    "Der Teppich liegt auf dem Boden. :: The carpet lies on the floor.",
    "Ich stelle die Lampe neben das Sofa. :: I'm putting the lamp next to the sofa.",
    "Sie liegt im zweiten Stock. :: It's on the second floor.",
    "Es gibt einen Balkon und einen Keller. :: There is a balcony and a cellar.",
    "Wie viel kostet die Miete? :: How much is the rent?",
    "Ist die Wohnung möbliert? :: Is the flat furnished?",
    "Wann kann ich einziehen? :: When can I move in?",
  ],
},

14: {
  goals: [
    "Describe current weather using all three patterns",
    "Name all four seasons and typical activities",
    "Read and understand a simple weather forecast",
    "Express temperature in Celsius",
  ],
  science: "Weather is the universal conversation starter in German — it opens virtually any interaction. Knowing three simple patterns ('Es regnet / Es ist sonnig / Wir haben Regen') means you can describe any weather situation.",
  chunks: [
    "━━━ WEATHER PATTERNS ━━━",
    "REGEL 1 — Three ways to describe weather:",
    "→ Es + VERB:    Es regnet. | Es schneit. | Es donnert. | Es friert. | Es hagelt.",
    "→ Es ist + ADJ: Es ist kalt. | Es ist sonnig. | Es ist bewölkt. | Es ist schwül. | Es ist windig.",
    "→ Wir haben + NOUN: Wir haben Regen. | Wir haben Schnee. | Wir haben Sonnenschein.",
    "━━━ WEATHER VOCABULARY ━━━",
    "Wetter: die Sonne (sun) | der Regen (rain) | der Schnee (snow) | der Wind (wind) | der Sturm (storm)",
    "→ der Nebel (fog) | das Gewitter (thunderstorm) | der Hagel (hail) | die Wolke (cloud)",
    "Adjektive: sonnig | regnerisch | bewölkt | windig | kalt | warm | heiß | kühl | feucht | schwül",
    "━━━ TEMPERATURE ━━━",
    "REGEL 2 — Temperature expressions:",
    "→ 'Es sind 20 Grad Celsius.' | 'Die Temperatur liegt bei minus 5 Grad.'",
    "→ 'Es ist warm — 25 Grad!' | 'Minus 10 Grad — brrr!'",
    "━━━ SEASONS ━━━",
    "Jahreszeiten: der Frühling (spring) | der Sommer (summer) | der Herbst (autumn) | der Winter (winter)",
    "→ 'Im Sommer ist es warm.' | 'Im Winter schneit es oft.' | 'Im Frühling regnet es viel.'",
    "⚠️ Weather is the most universal German small talk: 'Schönes Wetter heute!' opens any conversation!",
  ],
  mnemonic: [
    "━━━ WEATHER TRICKS ━━━",
    "TRICK: 'Es regnet' — 'Regen' sounds like 'ragin'' — it's RAGING outside, it's raining!",
    "TRICK: 'Es schneit' — think 'it SNOWS' → schneit ≈ 'sh-NITE'",
    "TRICK: 'schwül' (humid) sounds like 'SWOOL' — it's so humid you could SWEAT in a WOOL sweater!",
    "TRICK: Seasons: Frühling = FRÜH (early) + ling → early season. Herbst sounds like 'harvest' = autumn!",
    "━━━ THREE PATTERNS ━━━",
    "SUPERPOWER: Same weather, three ways — learn all three and you sound fluent instantly:",
    "→ Es regnet. / Es ist regnerisch. / Wir haben Regen. ← all mean 'it's raining'!",
  ],
  speak: [
    "Wie ist das Wetter heute? :: What's the weather like today?",
    "Es regnet und es ist windig. :: It's raining and windy.",
    "Es ist sonnig und warm — 25 Grad! :: It's sunny and warm — 25 degrees!",
    "Es schneit! Minus 5 Grad heute. :: It's snowing! Minus 5 degrees today.",
    "Wir haben ein Gewitter heute Abend. :: There's a thunderstorm tonight.",
    "Im Sommer ist es heiß und schwül. :: In summer it's hot and humid.",
    "Im Winter schneit es oft. :: In winter it often snows.",
    "Wie wird das Wetter morgen? :: What will the weather be like tomorrow?",
    "Es sind zwanzig Grad Celsius. :: It's twenty degrees Celsius.",
    "Ich liebe den Herbst — die Blätter sind so schön! :: I love autumn — the leaves are so beautiful!",
  ],
},

15: {
  goals: [
    "Name 20+ hobby and leisure activities",
    "Express likes/dislikes using gerne/nicht gerne",
    "Say how often you do activities using frequency adverbs",
    "Hold a small-talk conversation about hobbies",
  ],
  science: "Hobbies are the number one small-talk topic after weather. Expressing what you love to do creates instant connection — and 'gerne' is one of the most powerful and versatile words you can learn at A1.",
  chunks: [
    "━━━ HOBBIES VOCABULARY ━━━",
    "Sport: Fußball spielen | schwimmen | laufen / joggen | Rad fahren | wandern | Tennis spielen | Yoga machen",
    "Kreativ: malen | zeichnen | singen | Gitarre spielen | Klavier spielen | kochen | backen | fotografieren",
    "Entspannung: lesen | fernsehen | Musik hören | reisen | ins Kino gehen | Freunde treffen | Videospiele spielen",
    "━━━ EXPRESSING HOBBIES ━━━",
    "REGEL 1 — Main patterns:",
    "→ 'Ich ___ gerne.' (I like ___ing.) | 'Ich ___ nicht gerne.' (I don't like ___ing.)",
    "→ 'Als Hobby habe ich ___.' | 'In meiner Freizeit ___e ich ___.'",
    "→ 'Am liebsten ___e ich ___.' (What I love most is ___ing.)",
    "REGEL 2 — How long: 'Ich lerne seit zwei Jahren Gitarre.' (since + Dativ)",
    "━━━ FREQUENCY ADVERBS ━━━",
    "REGEL 3 — How often:",
    "täglich: every day | jeden Tag: every day | oft: often | manchmal: sometimes",
    "selten: rarely | nie: never | einmal pro Woche: once a week | jedes Wochenende: every weekend",
    "⚠️ KULTUR: Germans have the highest club (Verein) membership rate in the world — over 600,000 registered clubs!",
  ],
  mnemonic: [
    "━━━ HOBBY TRICKS ━━━",
    "TRICK: 'gerne' = gladly/with pleasure. 'Ich spiele gerne Gitarre' = 'I play guitar with pleasure.' Think of it as 'I GLADLY play guitar.'",
    "TRICK: 'am liebsten' = am + liebsten (most beloved). It's the superlative of 'gerne'. gerne → lieber → am liebsten.",
    "TRICK: 'seit' + Dativ = SINCE / FOR (duration). 'Ich lerne seit zwei Jahren' = 'I have been learning for two years.' Seit always looks BACK in time.",
    "━━━ FREQUENCY TRICKS ━━━",
    "TRICK: Frequency order: täglich > oft > manchmal > selten > nie. Daily > often > sometimes > rarely > never.",
    "SUPERPOWER: Say 4 sentences about yourself: what hobby, how often, how long, and what you love most. That's a complete small-talk answer!",
  ],
  speak: [
    "Ich lese gerne Bücher. :: I like reading books.",
    "Ich spiele nicht gerne Fußball. :: I don't like playing football.",
    "In meiner Freizeit koche ich gerne. :: In my free time I like cooking.",
    "Ich lerne seit drei Jahren Gitarre. :: I have been learning guitar for three years.",
    "Am liebsten wandere ich in den Bergen. :: What I love most is hiking in the mountains.",
    "Ich spiele jeden Samstag Tennis. :: I play tennis every Saturday.",
    "Was machst du in deiner Freizeit? :: What do you do in your free time?",
    "Ich höre manchmal Musik und lese. :: I sometimes listen to music and read.",
    "Ich gehe selten ins Kino. :: I rarely go to the cinema.",
    "Ich treffe mich gerne mit Freunden. :: I like meeting up with friends.",
  ],
},

16: {
  goals: [
    "Answer the phone and ask for someone in German",
    "Leave and take a telephone message",
    "Write a formal email with correct greeting and sign-off",
    "Write an informal message to a German friend",
  ],
  science: "Telephone German is noticeably different from face-to-face German — Germans answer with their surname! Knowing these set phrases removes the anxiety of unexpected phone calls, one of the biggest fears for language learners.",
  chunks: [
    "━━━ ON THE PHONE ━━━",
    "REGEL 1 — Answering: 'Müller!' / 'Hier ist/spricht [Name].' (Germans answer with surname!)",
    "REGEL 2 — Asking for someone: 'Kann ich bitte mit ___ sprechen?' | 'Ist ___ da?'",
    "REGEL 3 — Not available: 'Tut mir leid, ___ ist gerade nicht da.' | 'Soll ich etwas ausrichten?'",
    "→ 'Können Sie ___ ausrichten, dass ich angerufen habe?' (Can you tell ___ I called?)",
    "→ 'Können Sie das wiederholen?' | 'Ich habe Sie nicht verstanden.' (I didn't understand.)",
    "→ 'Ich glaube, Sie haben sich verwählt.' (I think you have the wrong number.)",
    "⚠️ WICHTIG: Phone goodbye = 'Auf Wiederhören!' NOT 'Auf Wiedersehen!' (you hear, not see!)",
    "━━━ FORMAL EMAIL ━━━",
    "REGEL 4 — Formal email structure:",
    "→ Betreff: [Subject line]",
    "→ Sehr geehrte Damen und Herren, (Dear Sir/Madam — unknown recipient)",
    "→ Sehr geehrter Herr [Name], / Sehr geehrte Frau [Name],",
    "→ [body text]",
    "→ Mit freundlichen Grüßen, (Kind regards,)",
    "━━━ INFORMAL MESSAGE ━━━",
    "REGEL 5 — Informal structure:",
    "→ Hallo [Name] / Lieber [Name] / Liebe [Name],",
    "→ Viele Grüße / Herzliche Grüße / Liebe Grüße,",
  ],
  mnemonic: [
    "━━━ PHONE TRICKS ━━━",
    "TRICK: 'Auf Wiederhören' = 'Until hearing again.' Hören = to hear. On the phone you HEAR, so it's Wiederhören, not Wiedersehen!",
    "TRICK: 'ausrichten' = to pass on a message. Aus (out) + richten (align/direct). You're DIRECTING information OUT to someone.",
    "TRICK: 'verwählt' = mis-dialled. ver- prefix = wrongly/mis- in German. verwählt = wrong-dialled.",
    "━━━ EMAIL TRICKS ━━━",
    "TRICK: 'Sehr geehrte/r' = 'Most honoured' — it sounds very formal in German. Like 'Dear Honourable Mr/Ms...'",
    "TRICK: 'Mit freundlichen Grüßen' = 'With friendly greetings.' Far more literal than English 'Kind regards'!",
    "SUPERPOWER: Learn ONE formal email template by heart. 90% of formal German emails use exactly the same structure every time.",
  ],
  speak: [
    "Hier spricht Müller. Guten Tag! :: This is Müller speaking. Good day!",
    "Kann ich bitte mit Frau Schmidt sprechen? :: Can I speak to Ms Schmidt please?",
    "Tut mir leid, sie ist gerade nicht da. :: I'm sorry, she's not here right now.",
    "Soll ich etwas ausrichten? :: Shall I pass on a message?",
    "Können Sie das bitte wiederholen? :: Could you please repeat that?",
    "Ich glaube, Sie haben sich verwählt. :: I think you have the wrong number.",
    "Auf Wiederhören! :: Goodbye! (on the phone)",
    "Sehr geehrte Damen und Herren, :: Dear Sir or Madam,",
    "Mit freundlichen Grüßen! :: Kind regards!",
    "Viele Grüße an dich! :: Best wishes to you!",
  ],
},

17: {
  goals: [
    "Suggest, accept and decline plans in German",
    "Make a formal appointment by phone",
    "Use Konjunktiv II: möchte, würde, könnte, sollte",
    "Write a short message arranging or cancelling a meeting",
  ],
  science: "Konjunktiv II (möchte/würde/könnte) instantly makes you sound more polite and fluent. These 4 forms are used in thousands of everyday situations — and the good news is they're already conjugated for basic use!",
  chunks: [
    "━━━ MAKING PLANS ━━━",
    "REGEL 1 — Suggesting: 'Hast du am ___ Zeit?' | 'Wollen wir ___?' | 'Wie wäre es mit ___?'",
    "→ 'Lass uns ___!' (informal: 'Let's ___!')",
    "REGEL 2 — Accepting: 'Ja, das passt mir gut.' | 'Abgemacht!' | 'Super Idee! Ich freue mich!'",
    "REGEL 3 — Declining: 'Leider kann ich nicht.' | 'Ich bin leider verhindert.'",
    "→ 'Können wir das verschieben?' (Can we reschedule?)",
    "━━━ APPOINTMENTS ━━━",
    "REGEL 4 — Making appointments: 'Ich möchte einen Termin machen.'",
    "→ 'Haben Sie am ___ um ___ Uhr Zeit?' | 'Um wie viel Uhr passt es Ihnen?'",
    "→ 'Ich bestätige den Termin am ___.' (I confirm the appointment on ___)",
    "━━━ KONJUNKTIV II ━━━",
    "REGEL 5 — The 4 polite forms (use to sound softer and more natural):",
    "→ möchte: Ich möchte einen Termin machen. (I would like to make an appointment.)",
    "→ würde: Würden Sie das bitte machen? (Would you please do that?)",
    "→ könnte: Könnten Sie mir helfen? (Could you help me?)",
    "→ sollte: Du solltest mehr schlafen. (You should sleep more.)",
    "⚠️ SHORTCUT: These ARE the correct forms — no extra conjugation needed for basic A1 use!",
  ],
  mnemonic: [
    "━━━ PLANS TRICKS ━━━",
    "TRICK: 'Abgemacht!' = 'Done deal!' Ab + gemacht (made). Think: 'It's been MADE — it's settled!'",
    "TRICK: 'verhindert' = prevented/unavailable. ver- = wrongly + hindern = to prevent. You've been PREVENTED from coming.",
    "TRICK: 'verschieben' = to reschedule/postpone. ver- + schieben (to push). You're PUSHING the meeting to another time.",
    "━━━ KONJUNKTIV TRICKS ━━━",
    "SUPERPOWER: möchte/würde/könnte/sollte — memorise these 4 forms and you instantly sound 50% more polite and fluent.",
    "TRICK: könnte = COULD (sounds similar!). würde = WOULD. sollte = SHOULD. möchte = WOULD LIKE. Four words, perfect politeness!",
  ],
  speak: [
    "Hast du am Samstag Zeit? :: Do you have time on Saturday?",
    "Wollen wir ins Kino gehen? :: Shall we go to the cinema?",
    "Ja, das passt mir gut! Abgemacht! :: Yes, that suits me! It's a deal!",
    "Leider kann ich nicht. Ich bin verhindert. :: Unfortunately I can't. I'm unavailable.",
    "Können wir das verschieben? :: Can we reschedule?",
    "Ich möchte einen Termin machen. :: I would like to make an appointment.",
    "Haben Sie am Montag um 14 Uhr Zeit? :: Do you have time on Monday at 2pm?",
    "Könnten Sie mir bitte helfen? :: Could you please help me?",
    "Du solltest mehr schlafen! :: You should sleep more!",
    "Ich freue mich auf unser Treffen! :: I'm looking forward to our meeting!",
  ],
},

18: {
  goals: [
    "Review all A1 grammar: cases, tenses, word order and modals",
    "Produce a complete self-introduction in 10+ sentences",
    "Identify which topics need review before moving to A2",
    "Feel confident using German in real everyday situations",
  ],
  science: "Review lessons are scientifically proven to double retention. The spaced repetition effect means revisiting material at the right time is more effective than any amount of new input. This lesson consolidates everything.",
  chunks: [
    "━━━ A1 GRAMMAR OVERVIEW ━━━",
    "REGEL 1 — WORD ORDER: Verb always in position 2. Modal → Infinitive at end. Separable prefix at end.",
    "REGEL 2 — CASES: Nominativ (subject) | Akkusativ (direct object: DER→DEN) | Dativ (indirect object: dem/der/dem)",
    "→ Dativ always with: aus, außer, bei, mit, nach, seit, von, zu",
    "REGEL 3 — ARTICLES: Masc: der/den/dem | Fem: die/die/der | Neut: das/das/dem | Pl: die/die/den",
    "━━━ VERB REVIEW ━━━",
    "REGEL 4 — sein: ich bin | du bist | er ist | wir sind | ihr seid | sie sind",
    "REGEL 5 — haben: ich habe | du hast | er hat | wir haben | ihr habt | sie haben",
    "REGEL 6 — Regular verbs: Stamm + e/st/t/en/t/en",
    "REGEL 7 — Strong verbs (du/er only): a→ä (fährt) | e→i (spricht, isst) | e→ie (liest, sieht)",
    "━━━ PERFEKT TENSE ━━━",
    "REGEL 8 — Perfekt = haben/sein + Partizip II",
    "→ Regular: ge- + Stamm + -t (gemacht, gelernt, gespielt)",
    "→ Irregular: ge- + Stamm + -en (gegangen, gefahren, gesehen)",
    "→ sein für: movement A→B (gegangen, gefahren) and state changes",
    "━━━ MODAL VERBS ━━━",
    "REGEL 9 — Modals: ich muss | kann | möchte | will | darf | soll + INFINITIV (at end)",
    "⚠️ YOU ARE NOW A1! You can introduce yourself, navigate transport, shop, handle health situations, make plans, and talk about your daily life — in German!",
  ],
  mnemonic: [
    "━━━ A1 MASTER REVIEW ━━━",
    "SUPERPOWER: You now know the 80/20 of German. ~500 words and these grammar patterns cover 70% of everyday spoken German.",
    "TRICK: The 3 questions to ask before any sentence: (1) Is the verb in position 2? (2) Is the case right? (3) Is the Infinitive at the end if there's a modal?",
    "TRICK: Perfekt helper verb cheat: MOVEMENT verbs use 'sein' (bin gegangen, bin gefahren). Everything else uses 'haben'.",
    "TRICK: Strong verb changes ONLY happen for du and er/sie/es. ALL other forms are regular!",
    "━━━ WHAT'S NEXT ━━━",
    "TIPP: At A2 you'll learn: Präteritum (narrative past), more complex sentences, Konjunktiv II, and expand your vocabulary to 1,500+ words. You're ready!",
  ],
  speak: [
    "Ich heiße ___ und ich komme aus ___. :: My name is ___ and I come from ___.",
    "Ich wohne in ___ und ich bin ___ Jahre alt. :: I live in ___ and I am ___ years old.",
    "Ich spreche ein bisschen Deutsch! :: I speak a little German!",
    "Ich habe gestern Deutsch gelernt. :: I learned German yesterday.",
    "Ich bin mit dem Bus zur Arbeit gefahren. :: I went to work by bus.",
    "Könnten Sie bitte langsamer sprechen? :: Could you please speak more slowly?",
    "Ich möchte einen Termin machen. :: I would like to make an appointment.",
    "Das Wetter ist heute schön — es sind 22 Grad! :: The weather is nice today — it's 22 degrees!",
    "In meiner Freizeit lese ich gerne und koche. :: In my free time I like reading and cooking.",
    "Ich bin jetzt A1! Weiter zu A2! :: I am now A1! On to A2!",
  ],
},

};

async function updateLessons() {
  console.log("🔄 Fetching A1 lessons...");
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
      console.log(`⏭️  Lesson ${idx} — no update defined`);
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
      console.log(`✅ Lesson ${idx} — full content updated`);
    }
  }
  console.log("\n🎉 Lessons 10-18 done!");
}

updateLessons();
