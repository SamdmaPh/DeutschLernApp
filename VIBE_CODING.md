# Vibe-Coding-Workflow für Wundervoll

> Stand: April 2026 · Tools: **Claude Design** + **Claude Code** + **Cowork** (+ Browser-Plugin "Claude in Chrome")

Dies ist der Loop, den Anthropic seit Launch von Claude Design (17.04.2026) für die Idee→Prototype→Ship-Schleife empfiehlt.

---

## Die Tool-Aufteilung (was macht was)

| Tool | Stärke | Wann verwenden |
|---|---|---|
| **Claude Design** | UI/UX-Mockups aus Prompts, kennt dein Design-System | Neue Screens, Layout-Iteration, Style-Refinement |
| **Claude Code** | Code schreiben, Refactoring, Multi-File-Edits | Feature implementieren, Bugs fixen, Tests |
| **Cowork** (Desktop) | Browser-Steuerung, Datei-Operations, Doku, Marketing | App live testen, Screenshots, README, Landing-Page |

---

## Der Loop (für ein neues Feature)

```
   ┌──────────────────────────────────────────────────────┐
   │                                                      │
   │   1. KONZEPT                                         │
   │      → Idee: "Onboarding als Reise-Intro"            │
   │                                                      │
   │   2. MOCKUP                                          │
   │      → Claude Design: Prompt + iterieren             │
   │      → Bundle exportieren                            │
   │                                                      │
   │   3. IMPLEMENTATION                                  │
   │      → Claude Code: Bundle übergeben, Code schreiben │
   │      → Lokal mit `npx expo start` testen             │
   │                                                      │
   │   4. LIVE-TEST                                       │
   │      → Cowork öffnet App im Browser                  │
   │      → klickt durch, macht Screenshots               │
   │      → identifiziert Bugs / UX-Probleme              │
   │                                                      │
   │   5. FIX                                             │
   │      → Bugs an Claude Code geben → Iteration         │
   │                                                      │
   │   ←  zurück zu 4 oder 2 bis es sich richtig anfühlt  │
   │                                                      │
   └──────────────────────────────────────────────────────┘
```

---

## Erstmaliges Setup (einmalig, ~10 Min)

### 1. Repo bereit machen ✅
- [x] Müll-Dateien entfernt (0-Byte-Tippfehler)
- [x] `CLAUDE.md` als Kontext-Datei angelegt
- [x] `theme.ts` ist die Design-System-Quelle

### 2. Repo zu GitHub pushen
Falls noch nicht geschehen — Claude Design verbindet sich am besten mit einem GitHub-Repo:

```bash
git add CLAUDE.md VIBE_CODING.md
git commit -m "Add Claude Design / Code context files"
git push
```

### 3. Claude Design einrichten (im Browser)
1. Öffne **claude.ai** und logge dich ein (Max-Tier ✓)
2. Klick auf **Design** in der Sidebar (oder direkt: claude.ai/design)
3. Onboarding starten → **Design System** → **Repository verbinden**
4. GitHub-Repo der DeutschLernApp angeben
5. Claude liest **automatisch** ein:
   - `theme.ts` → Farbpalette, Spacing, Typografie
   - `app/` → bestehende Components als Pattern-Referenz
   - `CLAUDE.md` → Kontext der App, Vibe-Beschreibung
6. Onboarding fertig → du hast ein Design-System, das in jedem Mockup automatisch greift

### 4. Claude Code in der IDE
Wenn nicht schon installiert:
```bash
# CLI: claude.ai/code installieren oder
# IDE-Plugin (VS Code, JetBrains): aus dem Marketplace
```

---

## Konkretes Beispiel: Tab-Navigation einbauen

So sieht der Loop für das erste Feature aus der Roadmap aus:

### Phase 1: Mockup in Claude Design (~15 min)

Prompt-Vorschlag:
> "Basierend auf meinem Design-System (Travel-Journal-Vibe, Georgia-Serif, deutsche Flaggenfarben) — entwirf eine **Bottom-Tab-Navigation** mit 4 Tabs:
> 🏠 Lernen · 📝 Üben · 🗺️ Reise · 📚 Bibliothek
>
> Aktiver Tab: gold-Akzent (#FFB300). Inaktiv: muted (#8A8AA0).
> Die Tab-Bar soll sich wie aus einem Reisetagebuch herausgeschnitten anfühlen — nicht wie eine generische iOS-Tab-Bar.
> Pass auch den Home-Screen ('Lernen') an: oben Avatar + aktuelle Stadt, in der Mitte EIN großer 'Weiter'-Button zur nächsten Lektion, unten 'Tägliche Review'-Karte."

→ Iterieren via Chat, Comments auf Elemente, Adjustment-Slider für Spacing/Color.

→ Wenn's stimmt: **"Hand off to Claude Code"** klicken.

### Phase 2: Code in Claude Code (~30 min)
- Claude Code bekommt das Mockup-Bundle
- Liest `CLAUDE.md` für Konventionen (expo-router, theme.ts, AsyncStorage-Regeln)
- Erstellt `app/(tabs)/_layout.tsx` und die 4 Tab-Files
- Migriert bestehende `index.tsx` Logik in `app/(tabs)/index.tsx`
- Du reviewst die Diffs

### Phase 3: Test mit Cowork (~10 min)
- `npx expo start --web` lokal
- Cowork: "Öffne die App im Browser, klick alle 4 Tabs durch, mach pro Tab einen Screenshot, identifiziere visuelle Bugs oder fehlende Inhalte"
- Cowork liefert: 4 Screenshots + Liste der Issues

### Phase 4: Iteration
- Bugs an Claude Code zurück
- Fixes → erneut Test in Cowork
- Wenn's "vibet": commit + push

---

## Wann welches Tool — Faustregel

- **"Wie soll das aussehen?"** → Claude Design
- **"Wie kriege ich das technisch hin?"** → Claude Code
- **"Funktioniert es in der echten App?"** → Cowork (Browser-Test)
- **"Wie verkaufe ich das?"** → Cowork (Landing-Page, App-Store-Texte, Demo-Video-Storyboard)
- **"Was sollte ich als nächstes bauen?"** → Claude Design + Roadmap zusammen anschauen

---

## Was Cowork drumherum noch übernimmt

Außerhalb der Code-Schleife:
- **App-Store-Beschreibung** (iOS + Android) als .docx
- **Landing-Page-Mockup** als HTML-Artefakt
- **Demo-Video-Storyboard** als PowerPoint
- **Beta-Tester-Akquise** — z.B. Reddit-Posts vorbereiten, Email-Texte
- **Audio-Pipeline-Wartung** — Batch-Skripte für TTS-Generierung, Metadata-Bereinigung
- **Wiederkehrende Reports** — z.B. wöchentlicher Beta-Tester-Feedback-Digest
- **Schnelles Recherchen** — "Wie macht Babbel Onboarding?", "Welche Goethe-A1-Themen werden geprüft?"

---

## Tipps aus der Praxis

1. **Halte Claude Design Repos klein** — bei monorepos lieber Subdirectory statt ganzes Repo verlinken
2. **Pflege CLAUDE.md aktiv** — bei jedem größeren Konzept-Update kurz reinschauen, ergänzen
3. **Vibe-Check vor Commit** — wenn ein Feature sich nicht "richtig anfühlt", lieber eine Iteration mehr in Claude Design als zu früh ins Production
4. **Eine Sache zur Zeit** — der Loop funktioniert am besten für ein klar abgegrenztes Feature, nicht für "die ganze App auf einmal"

---

*Letzte Aktualisierung: 28.04.2026 · Workflow-Empfehlung von Anthropic + Praxis*
