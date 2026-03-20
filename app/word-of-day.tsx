import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, StatusBar, Platform, Share
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const C = {
  navy:       "#070B18", navy2: "#0A1020", navy3: "#0F1628",
  border:     "#1E2D45",
  gold:       "#C9A84C", goldBg: "rgba(201,168,76,0.10)", goldBorder: "rgba(201,168,76,0.25)",
  red:        "#CC0000", redBg: "rgba(204,0,0,0.10)",
  black:      "#111111", white: "#FFFFFF", text: "#E2E8F0", muted: "#64748B",
};
const SAFE_TOP = Platform.OS === "ios" ? 54 : 30;

interface GermanWord {
  word: string;
  pronunciation: string;
  literal: string;           // literal word-part breakdown
  meaning: string;           // rich English explanation
  beauty: string;            // why this word is special
  example: { de: string; en: string };
  parts?: { part: string; meaning: string }[];
  tag: string;
}

const WORDS: GermanWord[] = [
  {
    word: "Fernweh",
    pronunciation: "FERN-veh",
    literal: "Fern (far) + Weh (ache/pain)",
    meaning: "A deep, aching longing to travel to distant places. Not homesickness — the opposite: a yearning for the unknown, the far-away, the undiscovered.",
    beauty: "English has no single word for this. Germans felt it so deeply they invented one.",
    example: { de: "Das Fernweh treibt mich in die weite Welt.", en: "The wanderlust drives me out into the wide world." },
    parts: [{ part: "Fern", meaning: "far, distant" }, { part: "Weh", meaning: "ache, longing pain" }],
    tag: "Gefühl",
  },
  {
    word: "Weltschmerz",
    pronunciation: "VELT-shmertz",
    literal: "Welt (world) + Schmerz (pain)",
    meaning: "The pain felt when the world as it is falls short of the world as it should be. A deep melancholy about the state of existence itself.",
    beauty: "Philosophers adopted this word into many languages. Only German captured this feeling in a single breath.",
    example: { de: "Ein tiefer Weltschmerz überkam ihn beim Lesen der Nachrichten.", en: "A deep world-pain overcame him while reading the news." },
    parts: [{ part: "Welt", meaning: "world" }, { part: "Schmerz", meaning: "pain, ache" }],
    tag: "Philosophie",
  },
  {
    word: "Zweisamkeit",
    pronunciation: "TSVAY-zam-kyte",
    literal: "Zwei (two) + Samkeit (togetherness)",
    meaning: "The beautiful intimacy of being together with just one other person — the warm, cozy feeling of twoness. Not loneliness, not a crowd. Just two.",
    beauty: "It captures something English needs three words to say: 'intimate togetherness for two.'",
    example: { de: "Die Zweisamkeit am Abend ist das Schönste am Tag.", en: "The intimate togetherness in the evening is the most beautiful part of the day." },
    parts: [{ part: "Zwei", meaning: "two" }, { part: "sam", meaning: "together" }, { part: "keit", meaning: "state/quality of" }],
    tag: "Liebe",
  },
  {
    word: "Sehnsucht",
    pronunciation: "ZAYN-zookt",
    literal: "Sehnen (to yearn) + Sucht (addiction/craving)",
    meaning: "An intense, almost addictive longing for something you cannot quite name. Not a specific wish — a deeper, bittersweet ache for something more. C.S. Lewis called it the central feeling of human existence.",
    beauty: "It's been called 'the quintessential German emotion' — too complex for any single English word.",
    example: { de: "Eine tiefe Sehnsucht nach Zuhause erfüllte ihr Herz.", en: "A deep longing for home filled her heart." },
    parts: [{ part: "Sehnen", meaning: "to yearn, to long for" }, { part: "Sucht", meaning: "craving, addiction" }],
    tag: "Gefühl",
  },
  {
    word: "Geborgenheit",
    pronunciation: "geh-BOR-gen-hyte",
    literal: "Geborgen (sheltered/safe) + heit (state of)",
    meaning: "The feeling of being completely safe, warm, and protected — emotionally sheltered from the world. The feeling of home, of belonging, of being held.",
    beauty: "'Cozy' and 'safe' don't touch it. This is warmth for the soul.",
    example: { de: "In ihren Armen fand er Geborgenheit.", en: "In her arms he found shelter and safety." },
    parts: [{ part: "geborgen", meaning: "sheltered, safe, held" }, { part: "heit", meaning: "state of being" }],
    tag: "Liebe",
  },
  {
    word: "Wanderlust",
    pronunciation: "VAN-der-loost",
    literal: "Wandern (to hike/wander) + Lust (desire/pleasure)",
    meaning: "A strong desire to travel, explore, and roam. Unlike Fernweh, this is more joyful — the pleasure of movement itself, of new paths and open roads.",
    beauty: "So perfectly German that English borrowed it whole. One of few German words used unchanged worldwide.",
    example: { de: "Die Wanderlust trieb ihn durch den ganzen Schwarzwald.", en: "The wanderlust drove him through the entire Black Forest." },
    parts: [{ part: "Wandern", meaning: "to wander, to hike" }, { part: "Lust", meaning: "desire, pleasure, joy" }],
    tag: "Natur",
  },
  {
    word: "Fingerspitzengefühl",
    pronunciation: "FING-er-shpitz-en-geh-fühl",
    literal: "Fingerspitzen (fingertips) + Gefühl (feeling/sense)",
    meaning: "An extraordinarily delicate sense of touch — but used figuratively: the rare talent for handling sensitive situations with perfect tact, sensitivity, and intuition.",
    beauty: "The image is perfect: the precise, gentle touch of fingertips, applied to human interaction.",
    example: { de: "Der Diplomat handelte mit großem Fingerspitzengefühl.", en: "The diplomat acted with great sensitivity and tact." },
    parts: [{ part: "Fingerspitzen", meaning: "fingertips" }, { part: "Gefühl", meaning: "feeling, sense, instinct" }],
    tag: "Charakter",
  },
  {
    word: "Torschlusspanik",
    pronunciation: "TOR-shloos-pa-nik",
    literal: "Tor (gate) + Schluss (closing) + Panik (panic)",
    meaning: "The panic of a closing gate — the fear that time is running out, that opportunities are vanishing, that life's doors are closing before you've walked through them.",
    beauty: "Imagine medieval city gates closing at dusk. That exact rushing panic — captured forever in one word.",
    example: { de: "Mit 35 bekam sie plötzlich Torschlusspanik.", en: "At 35, she suddenly felt the panic of closing gates." },
    parts: [{ part: "Tor", meaning: "gate, door" }, { part: "Schluss", meaning: "closing, end" }, { part: "Panik", meaning: "panic" }],
    tag: "Gefühl",
  },
  {
    word: "Schadenfreude",
    pronunciation: "SHA-den-froy-deh",
    literal: "Schaden (damage/harm) + Freude (joy)",
    meaning: "The pleasure derived from witnessing someone else's misfortune. Not cruelty — more like the guilty smile when someone who deserved it gets their comeuppance.",
    beauty: "So universally human that every language eventually borrowed this word. A masterpiece of honest self-awareness.",
    example: { de: "Mit stiller Schadenfreude sah er zu.", en: "With quiet glee at another's misfortune, he watched." },
    parts: [{ part: "Schaden", meaning: "harm, damage, misfortune" }, { part: "Freude", meaning: "joy, pleasure" }],
    tag: "Gefühl",
  },
  {
    word: "Verschlimmbessern",
    pronunciation: "fer-SHLIM-bes-ern",
    literal: "Verschlimmern (to worsen) + verbessern (to improve)",
    meaning: "To make something worse while trying to improve it. The specific pain of a well-intentioned fix that backfires spectacularly.",
    beauty: "A verb that perfectly describes over-engineering, bad advice, and every home renovation ever.",
    example: { de: "Er wollte helfen, hat es aber nur verschlimmbessert.", en: "He wanted to help, but only made it worse by trying to fix it." },
    parts: [{ part: "verschlimmern", meaning: "to make worse" }, { part: "verbessern", meaning: "to improve" }],
    tag: "Alltag",
  },
  {
    word: "Zwischenraum",
    pronunciation: "TSVI-shen-rowm",
    literal: "Zwischen (between) + Raum (space/room)",
    meaning: "The space between things — not emptiness, but meaningful in-between space. The pause between notes that makes music. The silence between words that gives them weight.",
    beauty: "Japanese call it 'ma.' Germans call it Zwischenraum. Great art lives here.",
    example: { de: "Die Musik lebt im Zwischenraum der Noten.", en: "Music lives in the space between the notes." },
    parts: [{ part: "zwischen", meaning: "between, in-between" }, { part: "Raum", meaning: "space, room" }],
    tag: "Philosophie",
  },
  {
    word: "Lebensfreude",
    pronunciation: "LAY-bens-froy-deh",
    literal: "Leben (life) + Freude (joy)",
    meaning: "Pure, exuberant joy of being alive. Not happiness about something specific — but a general, radiating delight in existence itself. The French call it joie de vivre; Germans invented their own.",
    beauty: "The simplest and perhaps most important word on this list. May you have it always.",
    example: { de: "Ihre Lebensfreude steckte jeden an.", en: "Her joy of life was infectious to everyone." },
    parts: [{ part: "Leben", meaning: "life" }, { part: "Freude", meaning: "joy, delight" }],
    tag: "Gefühl",
  },
  {
    word: "Waldeinsamkeit",
    pronunciation: "VALD-eye-n-zam-kyte",
    literal: "Wald (forest) + Einsamkeit (solitude)",
    meaning: "The solitude and peace felt deep in a forest — not loneliness, but the sublime, meditative calm of being alone among ancient trees.",
    beauty: "German Romantics coined this word. Ralph Waldo Emerson loved it so much he used it in a poem.",
    example: { de: "Die Waldeinsamkeit heilte seine müde Seele.", en: "The forest solitude healed his weary soul." },
    parts: [{ part: "Wald", meaning: "forest, woods" }, { part: "Einsamkeit", meaning: "solitude, aloneness" }],
    tag: "Natur",
  },
  {
    word: "Kopfkino",
    pronunciation: "KOPF-kee-no",
    literal: "Kopf (head) + Kino (cinema)",
    meaning: "The cinema in your head — vivid imagination running wild, playing out elaborate scenarios, fantasies, or worst-case fears like a movie you can't stop watching.",
    beauty: "Everyone has experienced this. Only Germans gave it a perfect name.",
    example: { de: "Mein Kopfkino läuft schon auf Hochtouren.", en: "My head-cinema is already running at full speed." },
    parts: [{ part: "Kopf", meaning: "head, mind" }, { part: "Kino", meaning: "cinema, movie theater" }],
    tag: "Alltag",
  },
  {
    word: "Sturmfrei",
    pronunciation: "SHTURM-fry",
    literal: "Sturm (storm) + frei (free)",
    meaning: "Originally 'free from storm attack' (military). Now: the glorious freedom of having the house to yourself — parents away, partner away — to do exactly as you please.",
    beauty: "The entire feeling of an empty house, all yours, on a Saturday afternoon — one word.",
    example: { de: "Heute Abend habe ich sturmfrei — die Wohnung gehört mir!", en: "Tonight I have the place to myself — the apartment is mine!" },
    parts: [{ part: "Sturm", meaning: "storm, assault" }, { part: "frei", meaning: "free, clear" }],
    tag: "Alltag",
  },
  {
    word: "Erklärungsnot",
    pronunciation: "er-KLAIR-oongs-note",
    literal: "Erklärung (explanation) + Not (distress/need)",
    meaning: "The distress of being unable to explain yourself — caught in a situation where any explanation sounds worse than saying nothing, yet silence is not an option.",
    beauty: "Every politician knows this word intimately.",
    example: { de: "Nach dem Abend befand er sich in echter Erklärungsnot.", en: "After that evening, he found himself in genuine need of explanation." },
    parts: [{ part: "Erklärung", meaning: "explanation" }, { part: "Not", meaning: "distress, emergency, need" }],
    tag: "Alltag",
  },
  {
    word: "Heimweh",
    pronunciation: "HYME-veh",
    literal: "Heim (home) + Weh (ache/pain)",
    meaning: "Homesickness — but deeper than the English word suggests. A physical, heart-aching pain for home. The twin of Fernweh. The tug between two impossible desires.",
    beauty: "Together with Fernweh, Germans captured the entire human tension: longing for home, longing to leave.",
    example: { de: "Nach Monaten im Ausland überkam sie starkes Heimweh.", en: "After months abroad, a powerful homesickness overcame her." },
    parts: [{ part: "Heim", meaning: "home" }, { part: "Weh", meaning: "ache, pain, longing" }],
    tag: "Gefühl",
  },
  {
    word: "Gemütlichkeit",
    pronunciation: "geh-MÜÜT-likh-kyte",
    literal: "Gemütlich (cozy/warm) + keit (state of)",
    meaning: "Warm, cozy, convivial comfort — the feeling of a candlelit room, good company, hot drinks. It includes coziness but also a social warmth, a sense of belonging to the moment.",
    beauty: "The Germans invented the feeling and the word. Other languages just borrow it.",
    example: { de: "Das kleine Café strahlte echte Gemütlichkeit aus.", en: "The little café radiated genuine warmth and coziness." },
    parts: [{ part: "Gemüt", meaning: "mind, soul, disposition" }, { part: "lich", meaning: "like, having quality of" }, { part: "keit", meaning: "state of being" }],
    tag: "Alltag",
  },
  {
    word: "Augenblick",
    pronunciation: "OW-gen-blick",
    literal: "Augen (eyes) + Blick (glance/look)",
    meaning: "The blink of an eye — a moment. But its literal image is beautiful: a single glance of the eyes. German pauses to name the smallest possible unit of time after the most fleeting human gesture.",
    beauty: "Faust's final words: 'Verweile doch, du bist so schön!' — 'Stay a while, you are so beautiful!' — he speaks to the Augenblick itself.",
    example: { de: "Genieße jeden Augenblick.", en: "Enjoy every moment — every blink of an eye." },
    parts: [{ part: "Augen", meaning: "eyes" }, { part: "Blick", meaning: "glance, look, gaze" }],
    tag: "Philosophie",
  },
  {
    word: "Drachenfutter",
    pronunciation: "DRA-khen-foot-er",
    literal: "Drachen (dragon) + Futter (feed/fodder)",
    meaning: "A gift bought to appease an angry partner — 'dragon feed.' The flowers, the chocolates, the special dinner that says 'I know I was wrong' without quite saying it.",
    beauty: "Honest, funny, and perfectly human. Only Germans would name this ritual with such affectionate humor.",
    example: { de: "Er kam mit Blumen nach Hause — klassisches Drachenfutter.", en: "He came home with flowers — classic dragon feed." },
    parts: [{ part: "Drachen", meaning: "dragon (slang: nagging partner)" }, { part: "Futter", meaning: "feed, fodder, food" }],
    tag: "Liebe",
  },
  {
    word: "Treppenwitz",
    pronunciation: "TREP-en-vits",
    literal: "Treppen (stairs) + Witz (joke/wit)",
    meaning: "The perfect comeback you think of only after you've left — on the stairs, on the way out. The brilliant response that arrives too late. The French call it 'l'esprit de l'escalier.'",
    beauty: "Germans and French both needed a word for this. A universal human frustration.",
    example: { de: "Natürlich fiel mir die perfekte Antwort erst als Treppenwitz ein.", en: "Of course, the perfect answer only came to me as I was leaving." },
    parts: [{ part: "Treppen", meaning: "stairs" }, { part: "Witz", meaning: "joke, wit, cleverness" }],
    tag: "Alltag",
  },
  {
    word: "Verschwiegen",
    pronunciation: "fer-SHVEE-gen",
    literal: "Ver + schweigen (to be silent about)",
    meaning: "Discreet, confidential — someone who keeps secrets not out of deception but out of loyalty and trustworthiness. A profoundly valued quality in German culture.",
    beauty: "To call someone verschwiegen is one of the highest compliments. A single word that speaks volumes about trust.",
    example: { de: "Sie ist absolut verschwiegen — ihr kann man alles anvertrauen.", en: "She is absolutely discreet — you can entrust her with everything." },
    parts: [{ part: "ver-", meaning: "completeness prefix" }, { part: "schweigen", meaning: "to be silent, to keep quiet" }],
    tag: "Charakter",
  },
  {
    word: "Traumhaft",
    pronunciation: "TROWM-haft",
    literal: "Traum (dream) + haft (having the quality of)",
    meaning: "Dream-like, magical, ethereal — something so beautiful or perfect it feels as if it belongs in a dream rather than reality.",
    beauty: "Simple construction, transcendent meaning. When Germans call something traumhaft, they mean it is almost too good for the waking world.",
    example: { de: "Der Sonnenuntergang war einfach traumhaft.", en: "The sunset was simply dreamlike — magical." },
    parts: [{ part: "Traum", meaning: "dream" }, { part: "haft", meaning: "having the quality of" }],
    tag: "Schönheit",
  },
  {
    word: "Weltanschauung",
    pronunciation: "VELT-an-show-oong",
    literal: "Welt (world) + Anschauung (view/perception)",
    meaning: "A complete worldview — one's entire philosophical framework for understanding existence, morality, and the universe. Not just an opinion, but the entire lens through which a person sees reality.",
    beauty: "Philosophy adopted this word worldwide. It describes something no shorter phrase can: a person's entire way of seeing.",
    example: { de: "Seine Weltanschauung wurde durch Reisen grundlegend verändert.", en: "His entire worldview was fundamentally changed through travel." },
    parts: [{ part: "Welt", meaning: "world" }, { part: "Anschauung", meaning: "view, perception, contemplation" }],
    tag: "Philosophie",
  },
  {
    word: "Wundervoll",
    pronunciation: "VOON-der-foll",
    literal: "Wunder (wonder/miracle) + voll (full)",
    meaning: "Full of wonder. Full of miracles. More than 'wonderful' — it carries the weight of wunder, which also means miracle. Something so beautiful it transcends ordinary experience.",
    beauty: "This is the soul of this app. The German language is wundervoll. Learning it, speaking it — wundervoll.",
    example: { de: "Die deutsche Sprache ist wirklich wundervoll.", en: "The German language is truly wonderful — full of wonder." },
    parts: [{ part: "Wunder", meaning: "wonder, miracle, marvel" }, { part: "voll", meaning: "full, filled with" }],
    tag: "Schönheit",
  },
];

const TAG_COLORS: Record<string, string> = {
  "Gefühl":     C.gold,
  "Philosophie":"#8B5CF6",
  "Liebe":      "#EC4899",
  "Natur":      "#22C55E",
  "Alltag":     C.muted,
  "Charakter":  "#F97316",
  "Schönheit":  C.red,
};

function getTodaysWord(idx?: number): GermanWord {
  if (idx !== undefined && idx >= 0 && idx < WORDS.length) return WORDS[idx];
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return WORDS[dayOfYear % WORDS.length];
}

export default function WordOfDayScreen() {
  const router = useRouter();
  const { idx } = useLocalSearchParams();
  const word = getTodaysWord(idx !== undefined ? Number(idx) : undefined);
  const tagColor = TAG_COLORS[word.tag] || C.gold;

  async function shareWord() {
    try {
      await Share.share({
        message: `🇩🇪 Deutsches Wort des Tages\n\n${word.word}\n"${word.meaning.slice(0, 100)}..."\n\nGelernt mit Wundervoll — wundervolldeutsch.com`,
      });
    } catch {}
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{ height: SAFE_TOP }} />

      {/* Flag bar */}
      <View style={{ flexDirection: "row", height: 3 }}>
        <View style={{ flex: 1, backgroundColor: C.black }} />
        <View style={{ flex: 1, backgroundColor: C.red }} />
        <View style={{ flex: 1, backgroundColor: C.gold }} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 72 }}>
          <Text style={styles.backText}>‹ Zurück</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wort des Tages</Text>
        <TouchableOpacity onPress={shareWord} style={{ width: 72, alignItems: "flex-end" }}>
          <Text style={styles.shareText}>Teilen ↗</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

        {/* Hero card */}
        <View style={styles.heroCard}>
          {/* Tag */}
          <View style={[styles.tagPill, { borderColor: tagColor + "55", backgroundColor: tagColor + "18" }]}>
            <Text style={[styles.tagText, { color: tagColor }]}>{word.tag}</Text>
          </View>

          {/* The word itself */}
          <Text style={styles.heroWord}>{word.word}</Text>

          {/* Pronunciation */}
          <Text style={styles.pronunciation}>[ {word.pronunciation} ]</Text>

          {/* Tricolor divider */}
          <View style={{ flexDirection: "row", height: 2, borderRadius: 1, marginVertical: 20, overflow: "hidden" }}>
            <View style={{ flex: 1, backgroundColor: "#333" }} />
            <View style={{ flex: 1, backgroundColor: C.red }} />
            <View style={{ flex: 1, backgroundColor: C.gold }} />
          </View>

          {/* Word parts breakdown */}
          {word.parts && (
            <View style={styles.partsRow}>
              {word.parts.map((p, i) => (
                <View key={i} style={styles.partBox}>
                  <Text style={styles.partWord}>{p.part}</Text>
                  <Text style={styles.partMeaning}>{p.meaning}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Literal */}
          <View style={styles.literalRow}>
            <Text style={styles.literalLabel}>WÖRTLICH  </Text>
            <Text style={styles.literalText}>{word.literal}</Text>
          </View>
        </View>

        {/* Bedeutung — Meaning */}
        <View style={styles.section}>
          <View style={styles.sectionLabelRow}>
            <View style={[styles.sectionAccent, { backgroundColor: C.gold }]} />
            <Text style={styles.sectionLabel}>BEDEUTUNG</Text>
          </View>
          <Text style={styles.meaningText}>{word.meaning}</Text>
        </View>

        {/* Warum es wundervoll ist */}
        <View style={styles.section}>
          <View style={styles.sectionLabelRow}>
            <View style={[styles.sectionAccent, { backgroundColor: C.red }]} />
            <Text style={styles.sectionLabel}>WARUM ES WUNDERVOLL IST</Text>
          </View>
          <View style={styles.beautyBox}>
            <Text style={styles.beautyQuote}>"</Text>
            <Text style={styles.beautyText}>{word.beauty}</Text>
          </View>
        </View>

        {/* Beispiel — Example */}
        <View style={styles.section}>
          <View style={styles.sectionLabelRow}>
            <View style={[styles.sectionAccent, { backgroundColor: "#8B5CF6" }]} />
            <Text style={styles.sectionLabel}>BEISPIELSATZ</Text>
          </View>
          <View style={styles.exampleBox}>
            <Text style={styles.exampleDE}>{word.example.de}</Text>
            <View style={styles.exampleDivider} />
            <Text style={styles.exampleEN}>{word.example.en}</Text>
          </View>
        </View>

        {/* All words preview */}
        <View style={styles.section}>
          <View style={styles.sectionLabelRow}>
            <View style={[styles.sectionAccent, { backgroundColor: C.muted }]} />
            <Text style={styles.sectionLabel}>WEITERE WÖRTER</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20, paddingHorizontal: 20 }}>
            <View style={{ flexDirection: "row", gap: 10, paddingRight: 20 }}>
              {WORDS.filter(w => w.word !== word.word).map((w, i) => {
                const tc = TAG_COLORS[w.tag] || C.gold;
                const wordIdx = WORDS.indexOf(w);
                return (
                  <TouchableOpacity
                    key={i}
                    style={[styles.wordChip, { borderColor: tc + "44" }]}
                    onPress={() => router.push({ pathname: "/word-of-day", params: { idx: wordIdx } })}
                    activeOpacity={0.75}
                  >
                    <Text style={[styles.wordChipText, { color: tc }]}>{w.word}</Text>
                    <Text style={styles.wordChipTag}>{w.tag}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Share CTA */}
        <TouchableOpacity style={styles.shareBtn} onPress={shareWord} activeOpacity={0.8}>
          <Text style={styles.shareBtnText}>↗ Wort teilen</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: C.navy },
  header:           { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 14, paddingBottom: 16 },
  backText:         { color: C.gold, fontSize: 16, fontWeight: "600" },
  headerTitle:      { color: C.white, fontSize: 16, fontWeight: "700" },
  shareText:        { color: C.muted, fontSize: 14 },

  // Hero
  heroCard:         { marginHorizontal: 20, backgroundColor: C.navy2, borderRadius: 24, borderWidth: 1, borderColor: C.border, padding: 28, marginBottom: 16, alignItems: "center" },
  tagPill:          { borderWidth: 1, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5, marginBottom: 20 },
  tagText:          { fontSize: 11, fontWeight: "800", letterSpacing: 2, textTransform: "uppercase" },
  heroWord:         { fontSize: 52, fontWeight: "900", color: C.white, letterSpacing: -1, textAlign: "center" },
  pronunciation:    { color: C.muted, fontSize: 16, marginTop: 8, fontStyle: "italic", letterSpacing: 1 },
  partsRow:         { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 16 },
  partBox:          { backgroundColor: C.navy3, borderRadius: 10, borderWidth: 1, borderColor: C.border, paddingHorizontal: 12, paddingVertical: 8, alignItems: "center" },
  partWord:         { color: C.gold, fontSize: 15, fontWeight: "800" },
  partMeaning:      { color: C.muted, fontSize: 11, marginTop: 2 },
  literalRow:       { flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap" },
  literalLabel:     { color: C.gold, fontSize: 11, fontWeight: "800", letterSpacing: 2 },
  literalText:      { color: C.muted, fontSize: 13, flex: 1, flexWrap: "wrap" },

  // Sections
  section:          { marginHorizontal: 20, marginBottom: 16 },
  sectionLabelRow:  { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  sectionAccent:    { width: 3, height: 14, borderRadius: 2 },
  sectionLabel:     { color: C.muted, fontSize: 10, fontWeight: "800", letterSpacing: 2 },
  meaningText:      { color: C.text, fontSize: 16, lineHeight: 26, backgroundColor: C.navy2, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 20 },
  beautyBox:        { backgroundColor: C.navy2, borderRadius: 16, borderWidth: 1, borderColor: C.goldBorder, padding: 20, flexDirection: "row", gap: 12 },
  beautyQuote:      { color: C.gold, fontSize: 48, lineHeight: 48, fontWeight: "900", marginTop: -8 },
  beautyText:       { flex: 1, color: C.text, fontSize: 15, lineHeight: 24, fontStyle: "italic" },
  exampleBox:       { backgroundColor: C.navy2, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 20, gap: 12 },
  exampleDivider:   { height: 1, backgroundColor: C.border },
  exampleDE:        { color: C.white, fontSize: 18, fontWeight: "700", lineHeight: 26 },
  exampleEN:        { color: C.muted, fontSize: 15, fontStyle: "italic", lineHeight: 22 },

  // Word chips
  wordChip:         { backgroundColor: C.navy2, borderRadius: 12, borderWidth: 1, padding: 12, alignItems: "center", minWidth: 110 },
  wordChipText:     { fontSize: 16, fontWeight: "800" },
  wordChipTag:      { color: C.muted, fontSize: 10, marginTop: 4, letterSpacing: 1 },

  // Share
  shareBtn:         { marginHorizontal: 20, height: 52, borderRadius: 14, backgroundColor: C.goldBg, borderWidth: 1, borderColor: C.goldBorder, alignItems: "center", justifyContent: "center" },
  shareBtnText:     { color: C.gold, fontSize: 15, fontWeight: "700" },
});
