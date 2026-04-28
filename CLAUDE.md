# CLAUDE.md — Kontext für Claude Design & Claude Code

> Diese Datei gibt Claude (Design + Code) sofort den Kontext, den es für gute Vorschläge braucht.
> Bei Änderungen am Konzept oder Tech-Stack: hier kurz aktualisieren.

---

## Was ist diese App?

**Name:** Wundervoll (Repo: `DeutschLernApp`)

**Tagline:** *"Reise durch Deutschland. Überlebe. Mach Freunde. Komm an."*
Ein Spiel, bei dem du Deutsch lernst.

**Vision (3 Säulen):**
- 🎮 **Spiel** — Avatar reist durch 20 Städte (Berlin → Zürich), jede Stadt = echte Situationen (Café, Hostel, Museum, Supermarkt …)
- 📖 **Lehrbuch** — Goethe-Niveau A1–C2, Grammatik-Referenz, Vokabel-Duden, Prüfungsvorbereitung
- 🎙 **Praxis** — KI-Gespräche zur Lektion, der Lerner spielt die Situation selbst

**Aktueller Status:** Phase 1 — A1 perfektionieren. Drei Städte (Berlin, Hamburg, Dresden) mit insgesamt 10 situationsbasierten Lektionen.

**Lese auch:** `PRODUCT_ROADMAP.md` für die volle Vision, Feature-Roadmap und Erfolgskriterien.

---

## Tech-Stack

| Schicht | Stack |
|---|---|
| Frontend | **Expo (~54)** + **React Native (0.81)** + **TypeScript**, Targets: iOS · Android · Web |
| Routing | `expo-router` (file-based) — Tab-Navigation in `app/(tabs)/` |
| Audio | `expo-av` für TTS-Wiedergabe in Lektionen |
| Auth + Cloud-Daten | **Supabase** (`@supabase/supabase-js`) |
| KI-Gespräche + TTS | **Railway**-Backend, Endpoints `/api/speak` u.a. |
| Lokaler Speicher | `AsyncStorage` (Mobile) / `localStorage` (Web) |
| Icons | `@expo/vector-icons`, `expo-symbols` |
| Animationen | `react-native-reanimated`, `react-native-gesture-handler` |
| Vector Graphics | `react-native-svg` |

---

## Design-System

**Quelle der Wahrheit:** `theme.ts` — Farben + Spacing-Konstanten.

**Vibe:** Reisetagebuch-Ästhetik. Warmes Weiß, Serif-Schrift, deutsche Flaggenfarben als Akzent. Premium, ruhig, nicht überladen — bewusst nicht "Duolingo-bunt".

**Schrift:** Georgia (Serif) — definiert als `SERIF` in `theme.ts`.

**Farb-Palette (Auszug):**
- Backgrounds warm/clean: `#FAFAFA`, `#F2F2F7`, `#E8E8ED`
- Text: `#1A1A2E` (dark) · `#4A4A60` (sec) · `#8A8AA0` (muted)
- **Akzent (deutsche Flagge):** `flagBlack #1A1A2E` · `flagRed #E53935` · `flagGold #FFB300`
- Status: `green #43A047`, `red #E53935`, `blue #1E88E5`, `purple #7E57C2`
- Jede Akzentfarbe hat zusätzlich eine `*Line` (25% Alpha) und `*Dim` (8% Alpha) Variante für subtile Hintergründe und Borders.

**Convention:** Alle Farben aus `C.{name}` importieren — keine Hex-Werte direkt im Component-Code.

---

## App-Struktur (Ziel — wird gerade ausgebaut)

```
app/
├── (tabs)/
│   ├── _layout.tsx          # Tab-Bar (4 Tabs)
│   ├── index.tsx            # 🏠 Lernen (Home: aktuelle Stadt + Lektion)
│   ├── exercises.tsx        # 📝 Üben (Grammatik, Vokabel-SRS, Prüfung)
│   ├── journey.tsx          # 🗺️ Reise (Deutschland-Karte mit Avatar)
│   └── library.tsx          # 📚 Bibliothek (Vokabel-Duden, Grammatik, Goethe-Info)
├── lesson.tsx               # Fullscreen-Lektion (Story-Karten-Stil, nicht Scroll)
├── onboarding.tsx, settings.tsx, placement.tsx
└── _layout.tsx              # Root Layout

data/
├── lessonData.ts            # Lektionen (situationsbasiert, 7 Phasen)
├── journeyData.ts           # Städte + Routen
├── grammarData.ts, vocabData.ts, srsData.ts  # (geplant)

services/
├── progress.ts              # XP, Streak, Completion
├── supabase.ts              # Auth + Cloud
├── srs.ts                   # Spaced Repetition (SM-2, geplant)
├── tts.ts                   # Text-to-Speech (geplant)
└── ai.ts                    # KI-Gespräch-API (geplant)
```

---

## Lektion-Struktur (7 Phasen, ca. 15 min)

Jede Lektion = **eine Situation in einer Stadt**, didaktisch nach Sprachforschung (Krashen, Long, Swain) strukturiert:

1. **Aktivierung** (1 min) — Bild der Situation, "Was weißt du schon?"
2. **Input — Hören** (3 min) — Audio-Dialog + Transkript
3. **Verstehen** (2 min) — Global- und Detailfragen
4. **Fokus auf Form** (2 min) — Grammatik + Vokabeln aus dem Dialog
5. **Kontrollierte Übung** (3 min) — Lückentext, Zuordnung, MC
6. **Freie Produktion** (3 min) — KI-Gespräch, Lerner spielt die Situation
7. **Reflexion** (1 min) — Selbsteinschätzung + XP

**UI-Regel:** Lektionen werden im **Fullscreen-Story-Stil** dargestellt (wie Instagram Stories), nicht als endlose Scroll-Seite. Eine Phase pro Karte.

---

## Konventionen

- **Sprache:** Deutsch in Lektion-Inhalten · Englisch oder Deutsch in Code-Kommentaren · UI-Texte auf Deutsch
- **Files:** `kebab-case.ts` für Daten, `camelCase.ts` für Services, `PascalCase.tsx` für Components (wenn extrahiert)
- **Imports:** `@/` als Alias auf Repo-Root (siehe `tsconfig.json`)
- **State:** Lokal `useState` — globale State nur wo wirklich nötig (Auth, Progress)
- **Async-Speicher:** Immer über `services/progress.ts` schreiben, nicht direkt `AsyncStorage` aufrufen

---

## Was fehlt noch / wo will ich hin

Nicht erschöpfend — die Master-Liste steht in `PRODUCT_ROADMAP.md`. Aktuell offen:

**UI/Design (gut für Claude Design):**
- Tab-Navigation einbauen (4 Tabs statt der aktuellen Button-Logik)
- Fullscreen-Lektionen-Karten (statt Scroll)
- Onboarding als "Reise-Intro" (Stadt-Auswahl, Avatar)
- Illustrationen für Städte und Situationen
- Micro-Animationen (Konfetti, XP-Counter, Avatar-Bewegung)

**Logik (gut für Claude Code):**
- Spaced Repetition Engine (SM-2)
- Audio-Player für TTS in Lektionen
- KI-Gespräch-Integration aus `services/ai.ts`
- Bibliothek-Daten als strukturiertes JSON

---

## Vibe-Coding-Workflow

Siehe `VIBE_CODING.md` (separater Steckbrief für den Tool-Loop: Claude Design → Claude Code → Cowork-Test).

---

*Diese Datei wurde am 28.04.2026 für Claude Design Onboarding angelegt.*
