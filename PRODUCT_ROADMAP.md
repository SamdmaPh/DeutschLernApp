# Wundervoll — Product Roadmap & Projektstruktur

> "Reise durch Deutschland. Überlebe. Mach Freunde. Komm an."
> Ein Spiel, bei dem du Deutsch lernst.

---

## Vision (3 Säulen)

| Säule | Was | Warum |
|-------|-----|-------|
| 🎮 **Spiel** | Avatar reist durch 20 Städte (Berlin → Zürich). Jede Stadt = echte Situationen. | Motivation, Spaß, Wiederkommen |
| 📖 **Lehrbuch** | Goethe-Niveau. Grammatik-Referenz. Vokabel-Duden. Prüfungsvorbereitung A1-C2. | Effektivität, Vollständigkeit, Prüfungserfolg |
| 🎙 **Praxis** | KI-Gespräche als wärst du wirklich dort. Sofortige Anwendung jeder Lektion. | Selbstwirksamkeit, echtes Sprechen |

---

## Core Loop (täglich 15 min)

```
App öffnen → Du siehst Berlin auf der Karte
    ↓
Situation erleben → "Du stehst am Empfang des Hostels"
    ↓
Input: Dialog HÖREN + lesen (3 min)
    ↓
Fokus: Grammatik + Vokabeln im Kontext (3 min)
    ↓
Üben: Quiz, Lückentext, Sätze bauen (3 min)
    ↓
Produzieren: KI-Gespräch — du spielst die Situation (3 min)
    ↓
Reflexion: Was hast du gelernt? +XP (1 min)
    ↓
Tägliche Review: Spaced Repetition alte Wörter (5 min)
    ↓
Morgen: Nächste Situation
```

---

## App-Struktur (4 Tabs)

```
┌─────────┬──────────┬─────────┬──────────┐
│  🏠     │  📝     │  🗺️    │  📚     │
│ Lernen  │ Üben    │ Reise   │ Bibliothek│
└─────────┴──────────┴─────────┴──────────┘
```

### Tab 1: 🏠 Lernen (Home)
- Aktuelle Stadt + Situation
- EIN "Weiter"-Button → nächste Lektion
- Tägliche Review (Spaced Repetition Karteikarten)
- Streak + XP Stats

### Tab 2: 📝 Üben
- Alle Lektionen nach Level (A1-C2)
- Grammatik-Übungen (nach Thema)
- Vokabel-Training (Karteikarten mit SRS)
- Prüfungssimulation (Goethe-Format)

### Tab 3: 🗺️ Reise
- Deutschland-Karte mit Avatar
- Route: Berlin → Hamburg → Dresden → ... → Zürich
- Stadt-Infos, Geschichte, Fun Facts (als Belohnung)
- Level-Fortschritt

### Tab 4: 📚 Bibliothek
- **Vokabel-Duden**: Durchsuchbar, mit Audio, Beispielsätzen, Konjugationen
- **Grammatik-Buch**: Strukturiert wie DW (Verben, Zeitformen, Nomen, Deklination, Satzbau...)
- **Prüfungsvorbereitung**: Goethe A1-C2 Module, Beispielaufgaben, Strategien
- **Wort des Tages**: Tägliches deutsches Wort mit Etymologie

---

## Lektion-Struktur (nach Sprachforschung)

Jede Lektion = eine Situation in einer Stadt (ca. 15 min):

| Phase | Dauer | Was | Wissenschaft |
|-------|-------|-----|-------------|
| 1. Aktivierung | 1 min | Bild der Situation, Was weißt du schon? | Schema-Aktivierung |
| 2. Input (Hören) | 3 min | Dialog HÖREN + Transkript lesen | Krashen's Input-Hypothese |
| 3. Verstehen | 2 min | Fragen zum Gehörten | Global- und Detailverstehen |
| 4. Fokus auf Form | 2 min | Grammatik + Vokabeln die im Dialog vorkamen | Focus on Form (Long) |
| 5. Kontrollierte Übung | 3 min | Lückentext, Zuordnung, Multiple Choice | Skill Building |
| 6. Freie Produktion | 3 min | KI-Gespräch: Situation selbst spielen | Output-Hypothese (Swain) |
| 7. Reflexion | 1 min | Was hast du gelernt? Selbsteinschätzung + XP | Metakognition |

### Alle 4 Fertigkeiten abgedeckt:
- **Hören**: Audio-Dialog in jeder Lektion (Phase 2)
- **Lesen**: Transkript + Lesetexte in Bibliothek
- **Schreiben**: Freie Eingabe in Übungen + KI-Chat
- **Sprechen**: KI-Gespräch (Phase 6) + optional Spracheingabe

---

## Deutschland-Reise (Level-Struktur)

Jedes CEFR-Niveau = eigene Reise mit eigenen Städten:

### A1: Der Anfang (PRIORITÄT!)
| Stadt | Situationen | Grammatik (im Kontext) |
|-------|------------|----------------------|
| 🏛️ Berlin (4 Lektionen) | Flughafen, Hostel, Café, Supermarkt | Aussprache, Begrüßung, SEIN, HABEN |
| ⚓ Hamburg (3 Lektionen) | Fischmarkt, WG-Suche, Hafen | Zahlen, Bestellen, Familie |
| 🎭 Dresden (3 Lektionen) | Museum, U-Bahn, Einkaufen | Regelmäßige Verben, Richtungen, Akkusativ |

### A2: Verbindungen
| Stadt | Situationen |
|-------|------------|
| 🎵 Leipzig | Friedliche Revolution Museum, Universität, Buchmesse |
| ⛪ Köln | Karneval, Dom, Rhein-Schifffahrt |
| 🏙️ Frankfurt | Börse, Buchmesse, Goethe-Haus |
| 👔 Düsseldorf | Altstadt, Japanisches Viertel, Königsallee |

### B1: Verstehen
Stuttgart (🚗), München (🍺), Nürnberg (⚖️), Heidelberg (🏰)

### B2: Diskutieren
Freiburg (🌿), Bremen (🐴), Hannover (📐), Weimar (📚)

### C1: Meistern
Potsdam (👑), Lübeck (🧱), Bamberg (🍻)

### C2: Meisterschaft
Rothenburg (🏘️), Wien (🎼), Zürich (🏔️)

---

## Feature-Roadmap (priorisiert)

### Phase 1: A1 Perfektionieren (nächste 2 Wochen)
> "Ein Level perfekt statt sechs mittelmäßig" — MJ DeMarco

- [ ] **Tab-Navigation einbauen** (4 Tabs statt Button-Chaos)
- [ ] **Fullscreen-Karten** in Lektionen (wie Instagram Stories, nicht Scroll)
- [ ] **Audio/TTS in Lektionen** (Railway Backend /api/speak Endpoint nutzen)
- [ ] **Berlin-Lektionen als Situationen umschreiben**
  - [ ] Lektion 1: "Ankunft am Flughafen" (statt "Aussprache")
  - [ ] Lektion 2: "Im Hostel einchecken" (statt "Erste Worte")
  - [ ] Lektion 3: "Dein erstes Café" (statt "SEIN konjugieren")
  - [ ] Lektion 4: "Im Supermarkt" (statt "HABEN konjugieren")
- [ ] **Spaced Repetition** — tägliche Vokabel-Review (SM-2 Algorithmus)
- [ ] **KI-Gespräch pro Lektion** mit Charakter (Rezeptionist, Kellnerin, etc.)

### Phase 2: Bibliothek (Woche 3-4)
- [ ] **Vokabel-Duden** — alle gelernten Wörter, durchsuchbar, mit Audio
- [ ] **Grammatik-Referenz** — strukturiert nach DW-Vorbild:
  - Verben (Konjugation, Zeitformen, Modal, Trennbar, Reflexiv)
  - Nomen & Artikel (der/die/das, Plural)
  - Deklination (Nominativ, Akkusativ, Dativ, Genitiv)
  - Satzbau (Hauptsatz, Nebensatz, Fragen)
  - Präpositionen, Adjektive, Pronomen
- [ ] **Goethe-Prüfungsinfo** — pro Level: Module, Tipps, Beispielaufgaben

### Phase 3: Polish & Gefühl (Woche 5-6)
- [ ] **Illustrationen** für Städte und Situationen (AI-generiert oder Illustrator)
- [ ] **Sound Design** — richtig/falsch Sounds, Lektion-fertig Jingle, Level-Up
- [ ] **Micro-Animationen** — Konfetti, Avatar-Bewegung, XP zählt hoch
- [ ] **Onboarding als Reise-Intro** — "Wo willst du hin? Berlin? Los geht's!"

### Phase 4: Beta & Feedback (Woche 7)
- [ ] **10 Beta-Tester finden** (Reddit r/German, Facebook Gruppen, Freunde)
- [ ] **Feedback sammeln**: Was funktioniert? Was frustriert? Würdest du zahlen?
- [ ] **Iterieren** basierend auf echtem Feedback

### Phase 5: A2-C2 & Monetarisierung (ab Woche 8)
- [ ] A2 Situationen schreiben (wenn A1 validiert)
- [ ] Abo-Modell einführen (A1 kostenlos, A2+ = 9,99€/Monat)
- [ ] App Store Submission (iOS + Android)
- [ ] Landing Page mit Waitlist

---

## Technische Architektur

### Aktueller Stack
- **Frontend**: React Native + Expo (iOS, Android, Web)
- **Backend**: Railway (KI-Gespräche, TTS)
- **Datenbank**: Supabase (Auth, User-Daten)
- **Lokaler Speicher**: AsyncStorage / localStorage (Progress)
- **Deployment**: GitHub Pages (Web), Expo (Mobile)

### Zu bauen
- **Tab-Navigation**: expo-router Tabs statt Stack-only
- **Audio Player**: expo-av für TTS-Wiedergabe in Lektionen
- **SRS Engine**: Lokaler SM-2 Algorithmus für Vokabel-Review
- **Bibliothek-Daten**: Grammatik-Referenz als strukturierte JSON-Dateien
- **Vokabel-Datenbank**: Alle Wörter aus Lektionen, indexiert und durchsuchbar

### Dateistruktur (Ziel)
```
app/
├── (tabs)/              # Tab-Navigation
│   ├── _layout.tsx      # Tab-Bar Definition
│   ├── index.tsx        # Tab 1: Lernen (Home)
│   ├── exercises.tsx    # Tab 2: Üben
│   ├── journey.tsx      # Tab 3: Reise/Karte
│   └── library.tsx      # Tab 4: Bibliothek
├── lesson.tsx           # Fullscreen Lektion (Modal)
├── onboarding.tsx       # Ersteinrichtung
├── settings.tsx         # Einstellungen
├── placement.tsx        # Einstufungstest
└── _layout.tsx          # Root Layout

data/
├── lessonData.ts        # Alle Lektionen (situationsbasiert)
├── journeyData.ts       # Städte + Routen
├── grammarData.ts       # Grammatik-Referenz (NEU)
├── vocabData.ts         # Vokabel-Datenbank (NEU)
└── srsData.ts           # Spaced Repetition State (NEU)

services/
├── progress.ts          # XP, Streak, Completion
├── supabase.ts          # Auth + Cloud-Daten
├── srs.ts               # Spaced Repetition Engine (NEU)
├── tts.ts               # Text-to-Speech Service (NEU)
└── ai.ts                # KI-Gespräch API (NEU, extrahiert aus conversation.tsx)
```

---

## Erfolgskriterien

### A1 ist "fertig" wenn:
- [ ] 10 situationsbasierte Lektionen (3 Städte × 3-4 Situationen)
- [ ] Jede Lektion hat Audio (TTS)
- [ ] Jede Lektion endet mit KI-Gespräch
- [ ] Spaced Repetition funktioniert (tägliche Review)
- [ ] Bibliothek hat A1-Vokabeln + Grundgrammatik
- [ ] 10 Beta-Tester sagen "Ja, ich würde zahlen"

### Die App ist "gut" wenn:
- [ ] User kommt 5 Tage hintereinander zurück (Retention)
- [ ] User kann nach 30 Tagen ein echtes Café-Gespräch führen
- [ ] User fühlt nach JEDER Lektion: "Ich habe etwas geschafft"

---

## Inspirationen & Referenzen

| App | Was wir übernehmen | Was wir besser machen |
|-----|-------------------|---------------------|
| **Duolingo** | Streak, XP, täglicher Loop | Echte Gespräche statt Multiple Choice |
| **DW Learn German** | Grammatik-Referenz, Wortschatz, Prüfungsvorbereitung | Gamification, KI, visuell attraktiv |
| **Babbel** | Situationsbasierte Dialoge | KI statt vorgefertigte Dialoge |
| **Anki** | Spaced Repetition | In die App integriert, nicht separat |
| **Pokémon** | Reise-Metapher, Städte erkunden, Fortschritt sichtbar | — |

---

*Letzte Aktualisierung: 2026-03-30*
*Status: Phase 1 — A1 perfektionieren*
