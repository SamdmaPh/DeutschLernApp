export interface JourneyCity {
  id: string;
  name: string;
  level: string;
  emoji: string;
  history: string;
  culture: string;
  funFact: string;
  lessonIds: string[];
}

export const JOURNEY_CITIES: JourneyCity[] = [
  // A1 - Der Anfang
  { id: "berlin", name: "Berlin", level: "A1", emoji: "🏛️", history: "Deutschlands Hauptstadt seit 1871. Die geteilte Stadt wurde 1989 wieder vereint — die Mauer fiel und zwei Welten wurden eins.", culture: "Berlin ist kreativ, chaotisch und frei. Hier sagt man 'Du' statt 'Sie' — sogar zum Chef.", funFact: "Berlin hat mehr Brücken als Venedig — circa 960 Brücken!", lessonIds: ["a1-0-1","a1-0-2","a1-1-1","a1-1-2"] },
  { id: "hamburg", name: "Hamburg", level: "A1", emoji: "⚓", history: "Deutschlands Tor zur Welt. Der größte Hafen Europas machte Hamburg zur reichsten Stadt des Mittelalters.", culture: "Hamburger sagen 'Moin' — zu jeder Tageszeit. Kurz, effizient, norddeutsch.", funFact: "In Hamburg gibt es mehr als 2.500 Brücken — mehr als in jeder anderen Stadt in Europa!", lessonIds: ["a1-1-3","a1-2-1","a1-2-2"] },
  { id: "dresden", name: "Dresden", level: "A1", emoji: "🎭", history: "Das 'Elbflorenz' — 1945 fast vollständig zerstört, dann Stein für Stein wiederaufgebaut.", culture: "Dresden steht für Wiederaufbau und Hoffnung. Die Frauenkirche ist das Symbol der Versöhnung.", funFact: "Die Frauenkirche war 50 Jahre eine Ruine. Seit 2005 ist sie wieder neu!", lessonIds: ["a1-2-3","a1-3-1","a1-3-2"] },

  // A2 - Verbindungen
  { id: "leipzig", name: "Leipzig", level: "A2", emoji: "🎵", history: "Die Stadt der Friedlichen Revolution. 1989 gingen 70.000 Leipziger auf die Straße — ohne Gewalt fiel die Mauer.", culture: "Bach komponierte hier. Goethe studierte hier. Leipzig ist Kultur pur.", funFact: "Richard Wagner und Johann Sebastian Bach haben beide in Leipzig gelebt!", lessonIds: ["a2-1-1","a2-1-2","a2-1-3"] },
  { id: "koeln", name: "Köln", level: "A2", emoji: "⛪", history: "2000 Jahre alt. Der Kölner Dom brauchte 632 Jahre zum Bauen. Die Römer gründeten 'Colonia'.", culture: "Kölner sind die freundlichsten Deutschen. Karneval ist heilig. Kölsch ist Bier UND Dialekt.", funFact: "Der Kölner Dom ist 157 Meter hoch und war einmal das höchste Gebäude der Welt!", lessonIds: ["a2-2-1","a2-2-2","a2-2-3"] },
  { id: "frankfurt", name: "Frankfurt", level: "A2", emoji: "🏙️", history: "Hier wurde die D-Mark geboren. Die Europäische Zentralbank sitzt hier. Deutschlands Geld-Hauptstadt.", culture: "Frankfurt ist international — 30% der Einwohner haben keinen deutschen Pass.", funFact: "Frankfurter Würstchen kommen gar nicht aus Frankfurt — sie kommen aus Wien!", lessonIds: ["a2-3-1","a2-3-2","a2-3-3"] },
  { id: "duesseldorf", name: "Düsseldorf", level: "A2", emoji: "👔", history: "Mode, Kunst und Japaner. Die Königsallee ist Deutschlands teuerste Einkaufsstraße.", culture: "Düsseldorf gegen Köln — die älteste Rivalität Deutschlands. Frag nie einen Düsseldorfer nach Kölsch.", funFact: "In Düsseldorf gibt es über 260 Kneipen in der Altstadt — 'die längste Theke der Welt'!", lessonIds: ["a2-4-1","a2-4-2","a2-4-3"] },

  // B1 - Verstehen
  { id: "stuttgart", name: "Stuttgart", level: "B1", emoji: "🚗", history: "Mercedes-Benz und Porsche wurden hier geboren. Das Auto wurde hier erfunden — 1886 von Carl Benz.", culture: "Schwaben sparen. 'Schaffe, schaffe, Häusle baue' — die schwäbische Philosophie.", funFact: "Das Stuttgarter Wappen zeigt ein Pferd — das wurde zum berühmten Porsche-Logo!", lessonIds: ["b1-1-1","b1-1-2","b1-1-3"] },
  { id: "muenchen", name: "München", level: "B1", emoji: "🍺", history: "Bayerns Hauptstadt. Oktoberfest, BMW, FC Bayern. Die reichste Stadt Deutschlands.", culture: "Bayern ist anders. 'Grüß Gott' statt 'Hallo', 'Servus' statt 'Tschüss'. Ein eigenes Land im Land.", funFact: "Im Englischen Garten darf man legal surfen — auf einer stehenden Welle im Eisbach!", lessonIds: ["b1-2-1","b1-2-2","b1-2-3"] },
  { id: "nuernberg", name: "Nürnberg", level: "B1", emoji: "⚖️", history: "Die Stadt der Nürnberger Prozesse. Nach dem Krieg wurde hier Gerechtigkeit für die Welt geschrieben.", culture: "Der Christkindlesmarkt ist der berühmteste Weihnachtsmarkt der Welt. Lebkuchen seit 1628.", funFact: "Nürnberger Bratwürste sind fingergroß — damit sie durch Schlüssellöcher gereicht werden konnten!", lessonIds: ["b1-3-1","b1-3-2","b1-3-3"] },
  { id: "heidelberg", name: "Heidelberg", level: "B1", emoji: "🏰", history: "Die älteste Uni Deutschlands (1386). Mark Twain: 'Heidelberg ist das letzte Wort in der Schönheit.'", culture: "Die 'Alte Brücke', das Schloss, der Philosophenweg — Heidelberg ist wie ein Gemälde.", funFact: "Im Schloss steht das größte Weinfass der Welt — es fasst über 220.000 Liter!", lessonIds: ["b1-4-1","b1-4-2","b1-4-3"] },

  // B2 - Diskutieren
  { id: "freiburg", name: "Freiburg", level: "B2", emoji: "🌿", history: "Deutschlands sonnigste und grünste Stadt. Nachhaltigkeit als Lebensphilosophie.", culture: "Die 'Bächle' — kleine Wasserkanäle in der Altstadt — sind Freiburgs Markenzeichen.", funFact: "Wer in ein Bächle tritt, muss der Legende nach eine Freiburgerin heiraten!", lessonIds: ["b2-1-1","b2-1-2","b2-1-3"] },
  { id: "bremen", name: "Bremen", level: "B2", emoji: "🐴", history: "Die Bremer Stadtmusikanten — das berühmteste Märchen der Brüder Grimm. Hansestadt und Handelsmetropole.", culture: "Bremen ist klein aber stolz. Ein eigenes Bundesland für eine Stadt.", funFact: "Wer die Beine des Bremer Esels anfasst, dem geht ein Wunsch in Erfüllung!", lessonIds: ["b2-2-1","b2-2-2","b2-2-3"] },
  { id: "hannover", name: "Hannover", level: "B2", emoji: "📐", history: "Das 'reinste Hochdeutsch' wird angeblich hier gesprochen. Die Welfen bestiegen den britischen Thron.", culture: "Die Herrenhäuser Gärten zählen zu den schönsten Barockgärten Europas.", funFact: "Hannover gilt als Referenz für akzentfreies Deutsch!", lessonIds: ["b2-3-1","b2-3-2","b2-3-3"] },
  { id: "weimar", name: "Weimar", level: "B2", emoji: "📚", history: "Goethe und Schiller lebten hier. Die Weimarer Republik wurde hier gegründet.", culture: "Bauhaus-Design, Klassik, Demokratie — alles begann hier in Weimar.", funFact: "Das Bauhaus wurde 1919 in Weimar gegründet — die einflussreichste Designschule der Welt!", lessonIds: ["b2-4-1","b2-4-2","b2-4-3"] },

  // C1 - Meistern
  { id: "potsdam", name: "Potsdam", level: "C1", emoji: "👑", history: "Friedrich der Große baute Sanssouci — 'Ohne Sorge'. Potsdamer Konferenz 1945 ordnete die Welt neu.", culture: "Potsdam ist Berlins eleganter Nachbar. Wo Berlin chaotisch ist, ist Potsdam perfekt geordnet.", funFact: "Friedrich der Große wurde erst 205 Jahre nach seinem Tod in Sanssouci beigesetzt!", lessonIds: ["c1-1-1","c1-1-2","c1-1-3","c1-1-4"] },
  { id: "luebeck", name: "Lübeck", level: "C1", emoji: "🧱", history: "Königin der Hanse. Thomas Mann wurde hier geboren. Das Holstentor zierte den 50-Mark-Schein.", culture: "Lübecker Marzipan ist weltberühmt seit dem 15. Jahrhundert.", funFact: "Lübeck hat drei Nobelpreisträger: Thomas Mann, Willy Brandt und Günter Grass!", lessonIds: ["c1-2-1","c1-2-2","c1-2-3"] },
  { id: "bamberg", name: "Bamberg", level: "C1", emoji: "🍻", history: "UNESCO-Welterbe. Die gesamte Altstadt steht unter Schutz. 9 Brauereien auf 77.000 Einwohner.", culture: "Rauchbier schmeckt wie flüssiger Schinken. Man liebt es oder hasst es.", funFact: "Das Alte Rathaus steht mitten im Fluss — weil der Bischof kein Grundstück hergeben wollte!", lessonIds: ["c1-3-1","c1-3-2","c1-3-3"] },

  // C2 - Meisterschaft
  { id: "rothenburg", name: "Rothenburg o.d.T.", level: "C2", emoji: "🏘️", history: "Die besterhaltene mittelalterliche Stadt Deutschlands. Im Dreißigjährigen Krieg durch einen Trunk gerettet.", culture: "Rothenburg ist so schön, dass es unwirklich wirkt. Japaner nennen es 'das Märchen-Dorf'.", funFact: "Ein Dorf in Japan hat die Rothenburger Altstadt originalgetreu nachgebaut!", lessonIds: ["c2-1-1","c2-1-2","c2-1-3"] },
  { id: "wien", name: "Wien", level: "C2", emoji: "🎼", history: "Mozart, Beethoven, Freud, Klimt. Die Hauptstadt eines verschwundenen Imperiums.", culture: "Wiener Kaffeehaus-Kultur ist UNESCO-Welterbe. Man bestellt einen 'Verlängerten' und bleibt drei Stunden.", funFact: "In Wien gibt es ein Wort fürs Nörgeln — 'Raunzen' — fast eine eigene Kunstform!", lessonIds: ["c2-2-1","c2-2-2"] },
  { id: "zuerich", name: "Zürich", level: "C2", emoji: "🏔️", history: "Banken, Schokolade und perfekte Züge. Einstein studierte hier. Deutsch klingt überall anders.", culture: "'Grüezi' statt 'Hallo', 'Merci vilmal' statt 'Danke schön'. Du bist am Ziel.", funFact: "Im Café Odeon verkehrten Lenin, James Joyce und Einstein — bisweilen am selben Abend!", lessonIds: ["c2-3-1","c2-3-2","c2-3-3"] },
];

export const LEVEL_INFO: Record<string, { name: string; color: string; bg: string }> = {
  A1: { name: "Anfänger", color: "#22C55E", bg: "rgba(34,197,94,0.15)" },
  A2: { name: "Grundlagen", color: "#3B82F6", bg: "rgba(59,130,246,0.15)" },
  B1: { name: "Mittelstufe", color: "#C9A84C", bg: "rgba(201,168,76,0.15)" },
  B2: { name: "Fortgeschritten", color: "#8B5CF6", bg: "rgba(139,92,246,0.15)" },
  C1: { name: "Fachkundig", color: "#F43F5E", bg: "rgba(244,63,94,0.15)" },
  C2: { name: "Meisterschaft", color: "#FFFFFF", bg: "rgba(255,255,255,0.15)" },
};
