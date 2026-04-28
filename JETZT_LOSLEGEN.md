# 🚀 Jetzt loslegen — die letzten 3 Schritte

> Cowork hat alles vorbereitet. Diese 3 Schritte sind der Rest, den du selbst machst.

---

## Schritt 1 — Push zu GitHub (1 Min)

Dein lokaler Stand ist mit einem sauberen Commit gespeichert (`Update app + add CLAUDE.md...`), aber noch nicht online.

### 🟢 Einfachster Weg: GitHub Desktop

1. **GitHub Desktop App** öffnen (auf deinem Windows-PC)
2. Wähl oben das Repo **DeutschLernApp** aus (falls nicht schon offen)
3. Stell sicher, dass du auf Branch **`npm-start`** bist
4. Du siehst oben **"1 Commit auszuführen"** (oder ähnlich)
5. Klick **"Push origin"** → Fertig

> 💡 **Falls GitHub Desktop nicht installiert ist:** [desktop.github.com](https://desktop.github.com) → herunterladen, einloggen, Repo `DeutschLernApp` öffnen.

### 🟡 Alternativ: Terminal (Eingabeaufforderung)

```bash
cd Desktop\DeutschLernApp
git push
```

Falls er nach Login fragt:
- Username: `SamdmaPh`
- Password: dein **Personal Access Token** (NICHT das echte GitHub-Passwort!)

> 💡 **Token erstellen:** [github.com/settings/tokens](https://github.com/settings/tokens) → "Generate new token (classic)" → Scope `repo` ankreuzen → Token kopieren und sicher speichern.

---

## Schritt 2 — App lokal starten (2 Min)

**Im Terminal (Eingabeaufforderung):**

```bash
cd Desktop\DeutschLernApp
npx expo start --web
```

→ Nach ein paar Sekunden öffnet sich automatisch ein Browser mit deiner App.

**Was du siehst:**
- Wenn noch kein Account: das Onboarding (4 Slides + Goal-Selection)
- Wenn schon Account: der Heute-Tab mit "Nächste Lektion"-Card

**Klick einmal komplett durch:**
- Heute-Tab → Lektion starten → durch alle 7 Phasen klicken
- Üben-Tab, Bibliothek-Tab, Profil-Tab anschauen

> 💡 **Cowork-Tipp:** Wenn die App läuft und du sagst *"Cowork, mach mir einen Walkthrough"*, dann öffnet Cowork die App im Browser, klickt durch alle Tabs, macht Screenshots und listet dir Bugs/UX-Punkte auf.

---

## Schritt 3 — Claude Design einrichten (5 Min)

> **Wichtig:** Mach das in **deinem normalen Browser**, NICHT im Cowork-Browser (der ist für Claude-Selbstzugriff blockiert).

1. **claude.com** öffnen → einloggen (du hast Max ✓)
2. In der Sidebar **Design** suchen (oder direkt **claude.com/design** versuchen)
3. **Onboarding starten** → Repository verbinden
4. GitHub-URL eingeben: `https://github.com/SamdmaPh/DeutschLernApp`
   - Wenn Claude nach Branch fragt: **`npm-start`** (das ist dein Arbeitsbranch)
5. Claude liest automatisch ein:
   - `theme.ts` → Farbpalette + Typografie
   - `CLAUDE.md` → App-Kontext und Konventionen
   - `app/(tabs)/`-Components → bestehende Patterns
6. Onboarding fertig — du hast jetzt Claude Design mit deinem Wundervoll-Design-System

---

## Schritt 4 (optional, aber empfohlen) — Erstes Mockup

Sobald Claude Design eingerichtet ist, probier den ersten Loop aus mit einer kleinen, abgegrenzten Aufgabe.

### Vorschlag: Done-Screen polishen 🎉

**Prompt für Claude Design:**
> "Mein Lesson V2 hat 7 Phasen. Die letzte heißt 'Done' — der Lerner hat die Lektion abgeschlossen. Aktuell ist der Done-Screen funktional, aber unaufregend. Bau mir einen freudigen, motivierenden Done-Screen im Wundervoll-Vibe (warm, Reisetagebuch-Ästhetik, deutsche Flaggenfarben):
>
> - Großes Erfolgs-Symbol (kein Konfetti-Overload, eher edel)
> - XP-Counter, der hochzählt
> - Streak-Update mit "Tag X von Y"-Anzeige
> - Warmer Übergang zur nächsten Lektion ('Bereit für Lektion X.Y?')
> - Optional: ein deutsches Wort des Tages als Bonus
>
> Halt den Style ruhig — kein Duolingo-Bunt. Eher 'kleine Belohnung im Reisetagebuch'."

→ Iterieren via Chat-Comments, dann **"Hand off to Claude Code"**.

→ Claude Code implementiert in `app/lesson-v2.tsx` (Phase "Done") und du testest mit `npx expo start --web`.

→ Wenn's vibet: commit + push.

→ Loop schließen, nächste Aufgabe.

---

## 📍 Wenn du nicht weiter weißt

Geh zu [STATUS.md](./STATUS.md) — da stehen die 5 Optionen für den nächsten Sprint, sortiert nach Aufwand.

Für den Workflow-Überblick: [VIBE_CODING.md](./VIBE_CODING.md).

Für den App-Kontext: [CLAUDE.md](./CLAUDE.md).

Für die Vision + Done-Liste: [PRODUCT_ROADMAP.md](./PRODUCT_ROADMAP.md).

---

*Cowork hat das Setup so weit gebracht. Den Rest machst du in deinem eigenen Browser + Terminal.*

*Du bist näher dran als du denkst. Viel Erfolg! 🇩🇪*
