# 📍 STATUS — Wo bin ich, was als Nächstes?

> Dieser Steckbrief wird regelmäßig aktualisiert (am besten nach jeder Session).
> Wenn du den Faden verlierst: hier reinschauen.

> **Letztes Update:** 28.04.2026 (Cowork-Audit nach 3 Wochen Pause)

---

## 🎯 Wo bin ich gerade?

**Wundervoll** ist eine **Deutsch-Lern-App für englischsprachige A1-Anfänger**.
Tagline: *"German, made wonderful"*.

**Stand der Technik:**
- ✅ App-Architektur steht (4 Tabs, Onboarding, Auth via Supabase)
- ✅ Lesson V2 funktioniert (7 Phasen: Scene→Listen→Read→Practice→Speak→Write→Done)
- ✅ ElevenLabs-Integration: TTS in Listen, KI-Agent "Hans" in Speak (Lektion `a1-0-1`)
- ✅ Vokabel-Datasets für A1 bis C2 + Goethe-spezifische Sets
- ✅ Onboarding mit 4 Slides + Goal-Selection
- ✅ Backend auf Railway läuft

**Lokal nicht committed (Stand 28.04.):** ein lokaler Commit ist gemacht, aber noch **nicht zu GitHub gepusht** — siehe Schritt 1 unten.

---

## 🚀 3 Schritte zum Loslegen (heute)

### Schritt 1 — App-Stand zu GitHub pushen (1 Min)

**Einfachster Weg — GitHub Desktop:**
1. **GitHub Desktop** öffnen
2. Du siehst oben den Commit *"Update app + add CLAUDE.md..."* (heute angelegt)
3. Klick **"Push origin"**
4. Fertig — Repo ist online aktuell

**Falls du GitHub Desktop nicht hast:** im Terminal:
```bash
cd Desktop\DeutschLernApp
git push
```
(Wenn er nach Login fragt: Username = `SamdmaPh`, Password = dein **Personal Access Token** von GitHub, NICHT das echte Passwort. Token erstellen unter: github.com/settings/tokens)

---

### Schritt 2 — App lokal starten und durchklicken (5 Min)

**Im Terminal:**
```bash
cd Desktop\DeutschLernApp
npx expo start --web
```

→ Browser öffnet sich automatisch mit der App.

**Klick einmal komplett durch:**
1. Onboarding (4 Slides → Goal-Auswahl → Placement)
2. Heute-Tab (siehst du die Hero-Card "Nächste Lektion"?)
3. Klick auf "LEKTION STARTEN" → Lesson V2 → versuch alle 7 Screens
4. Üben-Tab, Bibliothek-Tab, Profil-Tab — was siehst du da?

**Mach pro Tab + pro Lesson-Phase einen Screenshot.** Schickst du mir die Screenshots dann kann Cowork dir konkret helfen mit Bug-Listing.

---

### Schritt 3 — EINE Sache aussuchen, die als Nächstes dran ist

Hier sind 5 Optionen, sortiert nach Aufwand. Wähl eine:

#### Option A: 🎨 **Polish-Phase** (sichtbarste Wirkung, 2–3 Tage)
- Micro-Animationen beim Tab-Wechsel
- Konfetti / Erfolgs-Sound auf Done-Screen
- Übergänge zwischen Lesson-Phasen smoother machen
- → Perfekt für **Claude Design** zum Mockup, dann **Claude Code** zum Bauen

#### Option B: 📚 **Bibliothek-Tab ausgestalten** (UX-Mehrwert, 2–3 Tage)
- Vokabel-Duden mit Suche
- Grammatik-Browser (nach Thema)
- → Daten sind alle da (`vocabA1A2.ts` etc.), nur UI fehlt
- → **Claude Design** für Layout, **Claude Code** für Logic

#### Option C: 🧠 **SRS aktiv einbauen** (Retention-Killer-Feature, 1–2 Tage)
- Service `srs.ts` ist da, aber Heute-Tab hat keine "Tägliche Review"-Karte
- Karteikarten-UI für SRS-Review
- → Mostly **Claude Code**, etwas **Claude Design** für Review-UI

#### Option D: 🎙 **Mehr Lektionen mit Agent bestücken** (Inhaltsarbeit, 1 Woche+)
- Aktuell nur `a1-0-1` hat einen ElevenLabs-Agent
- Für jede A1-Lektion einen Agent erstellen, in `AGENT_IDS` eintragen
- Dialoge prompten, testen, iterieren
- → Outside Cowork (ElevenLabs-UI direkt nutzen)

#### Option E: 🚀 **Beta-Tester finden & Feedback einholen** (Reality-Check, 1 Tag)
- 5–10 Leute aus Familie/Freundeskreis/r/German rekrutieren
- Feedback-Formular bauen oder Loom-Video-Calls
- → Cowork hilft beim Texten + Outreach

---

## 🛠 Mein Werkzeugkasten (was wofür)

| Tool | Wofür | Wann öffnen |
|---|---|---|
| **Claude Code** | Multi-File-Edits, Refactoring, Logic | Wenn du was "bauen" oder "fixen" willst |
| **Claude Design** | UI/Layout-Mockups | Wenn du was "schöner machen" willst (NEU seit 17.04.2026) |
| **Cowork** | Tests, Doku, Marketing, Recherche, Status-Updates | Wenn du außerhalb des Code-Editors arbeitest |
| **GitHub Desktop** | Commit + Push | Nach jeder größeren Änderung |
| **Expo Go (Handy)** | App auf echtem Device testen | Mind. 1× pro Woche |

---

## 📞 Quick Commands

```bash
# App starten (Web)
cd Desktop\DeutschLernApp && npx expo start --web

# App starten (iOS Simulator)
cd Desktop\DeutschLernApp && npx expo start --ios

# Stand prüfen
git status
git log --oneline -10

# Push
git push
```

---

## 💭 Inhaltliche Fragen zum Aufschreiben

> *Wenn dir was zur App einfällt, hier rein. Beim nächsten Auf-Räumen entscheiden ob es Roadmap-würdig ist.*

- [ ] _Beispiel: Sollen Lektionen einen "Wiederhole gestern"-Modus haben?_
- [ ] 

---

## 🎁 Mini-Wins (zum Erinnern)

> *Auch kleine Erfolge zählen. Hier sammeln.*

- ✨ ElevenLabs-Agent integriert — die App spricht jetzt wirklich mit dem Lerner
- ✨ Lesson V2 ist konzeptionell sauber — 7 Phasen abdecken die Sprachforschung
- ✨ Onboarding hat persönliche Note ("Discover the beauty: Fernweh, Weltschmerz, Zweisamkeit")

---

*Beim nächsten Wiedereinstieg: einfach diese Datei öffnen, durchscrollen, Schritt 1–3 durchgehen.*
