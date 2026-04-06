// ─── Story Layer: Erzählung pro Lektion ─────────────────────────────────────
// Jede Lektion hat eine Geschichte die den Spieler durch die Phasen führt

export interface LessonStory {
  lessonId: string;
  // Phase 1: Hook — cinematic intro
  hookNarration: string;      // Erzähler-Text (atmosphärisch)
  hookEmoji: string;          // Situation-Emoji
  hookVideo?: string;         // Pexels video URL (mp4)
  // Zwischentexte zwischen Phasen
  listenIntro: string;        // Vor Phase 2
  checkIntro: string;         // Vor Phase 3
  practiceIntro: string;      // Vor Phase 5-6
  speakIntro: string;         // Vor Phase 11
  // Phase 12-13: Story-Abschluss
  outroNarration: string;     // Was passiert nach der Lektion
  outroEmoji: string;
  // NPC Character
  npcName: string;
  npcEmoji: string;
  npcGreeting: string;        // Erster Satz des NPC
}

export const STORY_DATA: Record<string, LessonStory> = {
  "a1-0-1": {
    lessonId: "a1-0-1",
    hookNarration: "Das Flugzeug ist gelandet. Du stehst am Flughafen Berlin Brandenburg — allein, mit einem Koffer und null Deutschkenntnissen. Draußen warten die Taxis. Deine Mission: finde ein Taxi und komm zum Hostel. Los geht's!",
    hookEmoji: "✈️",
    hookVideo: "https://videos.pexels.com/video-files/2029036/2029036-sd_640_360_30fps.mp4",
    listenIntro: "Ein Taxifahrer winkt dir zu. Er sagt etwas auf Deutsch. Hör genau zu — was sagt er?",
    checkIntro: "Hast du alles verstanden? Mal sehen...",
    practiceIntro: "Jetzt bist du dran. Übe die Wörter die du gerade gehört hast.",
    speakIntro: "Der Taxifahrer wartet. Zeit, WIRKLICH Deutsch zu sprechen — mit echtem Gespräch!",
    outroNarration: "Der Taxifahrer lächelt. 'Willkommen in Berlin!' sagt er und fährt los. Durch das Fenster siehst du die Stadt zum ersten Mal — die Lichter, die Menschen, die Straßen. Dein Abenteuer hat begonnen.",
    outroEmoji: "🚕",
    npcName: "Taxi driver",
    npcEmoji: "🚕",
    npcGreeting: "Guten Tag! Wohin?",
  },
  "a1-0-2": {
    lessonId: "a1-0-2",
    hookNarration: "Das Taxi hält vor einem alten Gebäude in Berlin-Mitte. 'Hostel Berlin' steht über der Tür. Du ziehst deinen Koffer die Stufen hoch. An der Rezeption wartet jemand. Dein nächstes Gespräch auf Deutsch.",
    hookEmoji: "🏨",
    hookVideo: "https://videos.pexels.com/video-files/4995888/4995888-sd_640_360_25fps.mp4",
    listenIntro: "Die Rezeptionistin spricht mit dir. Sie will deinen Namen und deine Reservierung. Hör zu!",
    checkIntro: "Was hat sie gesagt? Teste dein Verständnis.",
    practiceIntro: "Du brauchst diese Wörter für jedes Hotel in Deutschland. Übe sie!",
    speakIntro: "Die Rezeptionistin wartet auf deine Antwort. Sprich mit ihr!",
    outroNarration: "Zimmer 204. Der Schlüssel ist in deiner Hand. Du öffnest die Tür — ein kleines Zimmer, ein Bett, ein Fenster mit Blick auf die Straße. Du legst dich aufs Bett und lächelst. Du hast es geschafft. Dein erstes Hotel auf Deutsch.",
    outroEmoji: "🔑",
    npcName: "Receptionist",
    npcEmoji: "👩‍💼",
    npcGreeting: "Guten Abend! Haben Sie eine Reservierung?",
  },
  "a1-1-1": {
    lessonId: "a1-1-1",
    hookNarration: "Morgens in Berlin. Dein Magen knurrt. Du gehst die Straße runter und findest ein kleines Café an der Ecke. Der Duft von frischem Kaffee und Croissants zieht dich rein. Zeit für dein erstes deutsches Frühstück!",
    hookEmoji: "☕",
    hookVideo: "https://videos.pexels.com/video-files/3209211/3209211-sd_640_360_25fps.mp4",
    listenIntro: "Die Kellnerin kommt an deinen Tisch. Was sagt sie? Was steht auf der Karte?",
    checkIntro: "Hast du die Bestellung verstanden?",
    practiceIntro: "Bestellen auf Deutsch — das brauchst du jeden Tag!",
    speakIntro: "Die Kellnerin wartet. Bestelle dein Frühstück — auf Deutsch!",
    outroNarration: "Ein Kaffee, ein Brötchen mit Käse, und ein Lächeln der Kellnerin. 'Guten Appetit!' sagt sie. Du sitzt am Fenster, schaust auf die Straße und denkst: Berlin ist gar nicht so schwer.",
    outroEmoji: "🥐",
    npcName: "Kellnerin",
    npcEmoji: "👩‍🍳",
    npcGreeting: "Guten Morgen! Was möchten Sie bestellen?",
  },
  "a1-1-2": {
    lessonId: "a1-1-2",
    hookNarration: "Der Kühlschrank im Hostel ist leer. Du brauchst Essen. Auf der Karte findest du einen Supermarkt: REWE, 5 Minuten zu Fuß. Du nimmst deinen Rucksack und gehst los. Im Supermarkt ist alles auf Deutsch — Schilder, Preise, Durchsagen.",
    hookEmoji: "🛒",
    hookVideo: "https://videos.pexels.com/video-files/3191572/3191572-sd_640_360_25fps.mp4",
    listenIntro: "An der Kasse spricht jemand mit dir. Was sagt die Kassiererin?",
    checkIntro: "Hast du alles verstanden was an der Kasse passiert ist?",
    practiceIntro: "Einkaufen auf Deutsch — Preise, Mengen, Höflichkeit.",
    speakIntro: "Du stehst an der Kasse. Antworte der Kassiererin!",
    outroNarration: "Tüte gepackt, Wechselgeld in der Hand. Du hast auf Deutsch eingekauft! 'Schönen Tag noch!' ruft die Kassiererin. Du winkst zurück und gehst stolz nach Hause. Berlin, Tag 2 — geschafft.",
    outroEmoji: "🛍️",
    npcName: "Kassiererin",
    npcEmoji: "🧑‍💼",
    npcGreeting: "Das macht 12,50 Euro. Brauchen Sie eine Tüte?",
  },
  "a1-1-3": {
    lessonId: "a1-1-3",
    hookNarration: "Berlin ist geschafft — Zeit für die nächste Stadt! Du stehst am Hauptbahnhof. Dein Zug nach Hamburg fährt in 30 Minuten. Aber zuerst brauchst du ein Ticket. Und wo ist Gleis 7?",
    hookEmoji: "🚂",
    hookVideo: "https://videos.pexels.com/video-files/5765320/5765320-sd_640_360_30fps.mp4",
    listenIntro: "Am Ticketschalter erklärt dir jemand die Verbindung. Hör genau zu!",
    checkIntro: "Wann fährt der Zug? Von welchem Gleis? Teste dein Verständnis.",
    practiceIntro: "Fahrplan, Gleis, Abfahrt — die wichtigsten Wörter am Bahnhof.",
    speakIntro: "Am Schalter musst du dein Ticket kaufen. Sprich!",
    outroNarration: "Der ICE rollt aus dem Berliner Hauptbahnhof. Durch das Fenster ziehen die Felder vorbei — grün, flach, endlos. In 2 Stunden bist du in Hamburg. Neue Stadt, neue Abenteuer. Du schaust auf dein Handy: 'Moin!' — so grüßt man im Norden.",
    outroEmoji: "⚓",
    npcName: "Schaffner",
    npcEmoji: "🧑‍✈️",
    npcGreeting: "Die Fahrkarte bitte! Wohin fahren Sie?",
  },
};

// Fallback für Lektionen ohne eigene Story
export const getStory = (lessonId: string): LessonStory => {
  if (STORY_DATA[lessonId]) return STORY_DATA[lessonId];
  // Generate basic story from lesson data
  return {
    lessonId,
    hookNarration: "Ein neues Abenteuer wartet auf dich. Bist du bereit?",
    hookEmoji: "🗺️",
    listenIntro: "Hör dir das Gespräch an.",
    checkIntro: "Hast du alles verstanden?",
    practiceIntro: "Jetzt bist du dran — übe!",
    speakIntro: "Zeit zu sprechen!",
    outroNarration: "Gut gemacht! Du bist einen Schritt weiter auf deiner Reise.",
    outroEmoji: "⭐",
    npcName: "Partner",
    npcEmoji: "🗣️",
    npcGreeting: "Hallo! Können wir anfangen?",
  };
};
