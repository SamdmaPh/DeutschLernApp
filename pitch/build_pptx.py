#!/usr/bin/env python3
"""Build the Wundervoll pitch deck as a native .pptx (16:9)."""
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# ---- Brand palette ----
NAVY   = RGBColor(0x07, 0x0B, 0x18)
NAVY2  = RGBColor(0x0A, 0x10, 0x20)
NAVY3  = RGBColor(0x0F, 0x16, 0x28)
BORDER = RGBColor(0x1E, 0x2D, 0x45)
GOLD   = RGBColor(0xC9, 0xA8, 0x4C)
RED    = RGBColor(0xCC, 0x00, 0x00)
BLACK  = RGBColor(0x11, 0x11, 0x11)
WHITE  = RGBColor(0xFF, 0xFF, 0xFF)
TEXT   = RGBColor(0xE2, 0xE8, 0xF0)
MUTED  = RGBColor(0x8A, 0x9A, 0xB0)

EMU = 914400
SW, SH = Inches(13.333), Inches(7.5)

prs = Presentation()
prs.slide_width  = SW
prs.slide_height = SH
BLANK = prs.slide_layouts[6]


def slide():
    s = prs.slides.add_slide(BLANK)
    bg = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, SW, SH)
    bg.fill.solid(); bg.fill.fore_color.rgb = NAVY
    bg.line.fill.background()
    bg.shadow.inherit = False
    s.shapes._spTree.remove(bg._element)
    s.shapes._spTree.insert(2, bg._element)
    return s


def flagbar(s, x, y, w=Inches(1.6), h=Inches(0.09)):
    seg = w / 3
    for i, col in enumerate((BLACK, RED, GOLD)):
        r = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x + seg * i, y, seg, h)
        r.fill.solid(); r.fill.fore_color.rgb = col
        r.line.fill.background(); r.shadow.inherit = False


def box(s, x, y, w, h, fill=None, line=None, radius=False):
    shp = s.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE, x, y, w, h)
    if fill is None:
        shp.fill.background()
    else:
        shp.fill.solid(); shp.fill.fore_color.rgb = fill
    if line is None:
        shp.line.fill.background()
    else:
        shp.line.color.rgb = line; shp.line.width = Pt(1)
    shp.shadow.inherit = False
    return shp


def text(s, x, y, w, h, runs, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP,
         space_after=6, line_spacing=1.1):
    """runs: list of paragraphs; each paragraph is list of (txt,size,color,bold)."""
    tb = s.shapes.add_textbox(x, y, w, h)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    for i, para in enumerate(runs):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.space_after = Pt(space_after)
        p.space_before = Pt(0)
        p.line_spacing = line_spacing
        for (txt, size, color, bold) in para:
            r = p.add_run(); r.text = txt
            r.font.size = Pt(size); r.font.color.rgb = color
            r.font.bold = bold; r.font.name = "Arial"
    return tb


def kicker(s, label):
    text(s, Inches(0.7), Inches(0.55), Inches(8), Inches(0.4),
         [[(label.upper(), 13, GOLD, True)]])


def title(s, t, y=Inches(0.95), size=34, w=Inches(12), color=WHITE):
    text(s, Inches(0.7), y, w, Inches(1.4), [[(t, size, color, True)]],
         line_spacing=1.0)


def bullets(s, items, x=Inches(0.7), y=Inches(2.2), w=Inches(12), size=17,
            gap=8):
    runs = []
    for it in items:
        if isinstance(it, str):
            runs.append([("•  ", size, GOLD, True), (it, size, TEXT, False)])
        else:  # tuple of (plain, bold_gold) segments list
            seg = [("•  ", size, GOLD, True)]
            for txt, b in it:
                seg.append((txt, size, GOLD if b else TEXT, b))
            runs.append(seg)
    text(s, x, y, w, Inches(4.5), runs, space_after=gap, line_spacing=1.15)


def footer(s):
    text(s, Inches(0.7), Inches(7.0), Inches(8), Inches(0.35),
         [[("WUNDERVOLL · German, made wonderful", 10, MUTED, False)]])


# ---------- 1 COVER ----------
s = slide()
flagbar(s, Inches(0.7), Inches(1.9))
text(s, Inches(0.7), Inches(2.1), Inches(12), Inches(1.4),
     [[("WUNDER", 54, RGBColor(0x5b,0x66,0x78), True),
       ("VO", 54, RED, True), ("LL", 54, GOLD, True),
       ("  🇩🇪", 48, WHITE, True)]])
text(s, Inches(0.7), Inches(3.25), Inches(12), Inches(0.7),
     [[("German, made wonderful.", 26, GOLD, True)]])
text(s, Inches(0.7), Inches(4.05), Inches(9.5), Inches(1.2),
     [[("The language app that actually teaches you to ", 19, TEXT, False),
       ("speak", 19, GOLD, True),
       (" — not just tap colourful circles.", 19, TEXT, False)]],
     line_spacing=1.3)
text(s, Inches(0.7), Inches(5.5), Inches(12), Inches(0.5),
     [[("A premium mobile language-learning app · Expo / React Native · iOS · Android · Web",
        13, MUTED, False)]])

# ---------- 2 PROBLEM ----------
s = slide(); kicker(s, "The Problem")
title(s, "Millions are “learning” a language —\nwith nothing to show for it.", size=30)
bullets(s, [
    [("Gamified apps optimise for ", False), ("streaks and addiction", True),
     (", not fluency. 1,000-day streaks, still can’t order a coffee.", False)],
    "Endless tapping of colourful bubbles ≠ real conversation skills.",
    "Grammar is taught like a textbook — dry, abstract, forgettable.",
    [("Learners quit because they never feel the payoff of ", False),
     ("actually speaking", True), (".", False)],
], y=Inches(2.5))
text(s, Inches(0.7), Inches(5.6), Inches(12), Inches(0.5),
     [[("The result: high engagement metrics, low real-world competence.", 15, MUTED, False)]])
footer(s)

# ---------- 3 SOLUTION ----------
s = slide(); kicker(s, "The Solution")
title(s, "A German app built around speaking from day one.", size=30)
bullets(s, [
    [("Real sentences. Real conversations. Real progress.", True)],
    "Every lesson built around phrases you’ll use immediately.",
    "Grammar explained like a human, not a textbook.",
    "Science-backed: flashcards, spaced repetition, quizzes & mnemonics in one smooth flow.",
    "A love letter to the language itself — its beauty, its untranslatable words, its soul.",
], y=Inches(2.3))
footer(s)

# ---------- 4 FEATURES ----------
s = slide(); kicker(s, "Product")
title(s, "Six features, one wonderful flow.")
feats = [
    ("📚", "53 Structured Lessons", "A1 → A2 curriculum mapped to CEFR: grammar, listening, vocab & dialogue."),
    ("🤖", "AI Conversation Partner", "Chat by voice or text; real-time grammar corrections with friendly explanations."),
    ("🎯", "Placement Test", "A 20-question quiz instantly places learners at A1–C1."),
    ("🏆", "Quiz & XP System", "Earn XP, level up from Anfänger to Meister, build daily streaks."),
    ("✨", "Wort des Tages", "The beautiful, untranslatable words that make German special."),
    ("🎧", "Native Audio", "Professionally generated pronunciation for every lesson."),
]
cw, ch = Inches(3.95), Inches(1.85)
gx, gy = Inches(0.25), Inches(0.3)
x0, y0 = Inches(0.7), Inches(2.05)
for i, (ico, t, d) in enumerate(feats):
    r, c = divmod(i, 3)
    x = x0 + c * (cw + gx); y = y0 + r * (ch + gy)
    box(s, x, y, cw, ch, fill=NAVY2, line=BORDER, radius=True)
    text(s, x + Inches(0.25), y + Inches(0.15), cw - Inches(0.5), ch - Inches(0.3),
         [[(ico + "  " + t, 15, WHITE, True)],
          [(d, 11.5, MUTED, False)]], space_after=6, line_spacing=1.1)
footer(s)

# ---------- 5 AI PARTNER ----------
s = slide(); kicker(s, "Hero Feature")
title(s, "Practise speaking with zero fear of judgement.", size=30)
bullets(s, [
    "Speak or type on real topics: Kennenlernen, Im Café, Reisen, Arbeit, Familie, Wetter.",
    "The AI replies naturally, then gently corrects your mistakes.",
    "Voice mode with live transcription — or text mode. Your choice.",
    "The practice partner most learners never find: patient, 24/7, encouraging.",
], y=Inches(2.2), w=Inches(7.0))
# correction flow card
fx, fy, fw = Inches(8.1), Inches(2.2), Inches(4.5)
box(s, fx, fy, fw, Inches(3.4), fill=NAVY2, line=BORDER, radius=True)
text(s, fx + Inches(0.3), fy + Inches(0.2), fw - Inches(0.6), Inches(0.4),
     [[("HOW A CORRECTION WORKS", 12, GOLD, True)]])
steps = [("You: “Ich habe gegangen.”", RED),
         ("↓", GOLD),
         ("Corrected: “Ich bin gegangen.”", GOLD),
         ("↓", GOLD),
         ("Why: movement verbs take sein, not haben.", TEXT)]
yy = fy + Inches(0.7)
for txt, col in steps:
    if txt == "↓":
        text(s, fx, yy, fw, Inches(0.3), [[(txt, 14, GOLD, True)]], align=PP_ALIGN.CENTER)
        yy += Inches(0.35)
    else:
        b = box(s, fx + Inches(0.3), yy, fw - Inches(0.6), Inches(0.55),
                fill=NAVY3, line=BORDER, radius=True)
        text(s, fx + Inches(0.45), yy + Inches(0.1), fw - Inches(0.9), Inches(0.4),
             [[(txt, 12.5, col, col == GOLD)]])
        yy += Inches(0.7)
footer(s)

# ---------- 6 CURRICULUM ----------
s = slide(); kicker(s, "Pedagogy")
title(s, "A real curriculum — not a game.")
bullets(s, [
    "Lessons progress through pronunciation, grammar, vocabulary, listening & speaking.",
    [("Example — A1.0 “Aussprache, Das Fundament”: ", True),
     ("the 6 critical sounds that separate German from English.", False)],
    "Clear learning objectives per lesson; XP rewarded on completion.",
    "Built to take a true beginner to confident A2 — and beyond.",
], y=Inches(2.2))
b = box(s, Inches(0.7), Inches(5.5), Inches(5.2), Inches(0.55),
        fill=NAVY2, line=GOLD, radius=True)
text(s, Inches(0.9), Inches(5.6), Inches(5), Inches(0.4),
     [[("CEFR-aligned · A1 → A2 → B1/B2 roadmap", 13, GOLD, True)]])
footer(s)

# ---------- 7 WORD OF THE DAY ----------
s = slide(); kicker(s, "The Emotional Hook")
title(s, "Fall in love with the language.")
words = [("Fernweh", "A deep, aching longing to travel to distant places."),
         ("Weltschmerz", "The pain of the world falling short of how it should be."),
         ("Zweisamkeit", "The warm intimacy of being together with just one other person.")]
yy = Inches(2.15)
for w, d in words:
    box(s, Inches(0.7), yy, Inches(6.6), Inches(1.0), fill=NAVY2, line=BORDER, radius=True)
    text(s, Inches(0.95), yy + Inches(0.12), Inches(6.2), Inches(0.8),
         [[(w, 19, GOLD, True)], [(d, 12.5, TEXT, False)]], space_after=4)
    yy += Inches(1.2)
text(s, Inches(7.7), Inches(2.15), Inches(5), Inches(0.4),
     [[("EVERY WORD INCLUDES", 13, GOLD, True)]])
bullets(s, ["Pronunciation guide", "Literal part-by-part breakdown",
            "Rich meaning & example sentence", "Why it’s beautiful — fully shareable"],
        x=Inches(7.7), y=Inches(2.65), w=Inches(5), size=15, gap=7)
text(s, Inches(7.7), Inches(5.2), Inches(5), Inches(0.6),
     [[("Turns a study tool into something people love — and share.", 13, MUTED, False)]])
footer(s)

# ---------- 8 RETENTION ----------
s = slide(); kicker(s, "Retention")
title(s, "Gamification done right.")
text(s, Inches(0.7), Inches(2.15), Inches(12), Inches(0.4),
     [[("XP system with six levels of mastery:", 17, TEXT, False)]])
levels = ["Anfänger", "Einsteiger", "Lernender", "Fortgeschrittener", "Experte", "Meister"]
x = Inches(0.7); y = Inches(2.75)
for lv in levels:
    w = Inches(0.55 + 0.115 * len(lv))
    box(s, x, y, w, Inches(0.55), fill=NAVY2, line=GOLD, radius=True)
    text(s, x + Inches(0.12), y + Inches(0.1), w - Inches(0.2), Inches(0.4),
         [[(lv, 13, GOLD, True)]], align=PP_ALIGN.CENTER)
    x += w + Inches(0.18)
bullets(s, [
    "Daily streaks build the habit · progress tracking across lessons & skills.",
    "Quizzes reinforce memory through active recall & spaced repetition.",
    [("The difference: ", True), ("every engagement mechanic is tied to genuine competence.", False)],
], y=Inches(3.75))
footer(s)

# ---------- 9 PERSONALISATION ----------
s = slide(); kicker(s, "Onboarding")
title(s, "Personalised from the first tap.")
goals = [("✈️", "Travel"), ("💼", "Work"), ("👨‍👩‍👧", "Family"),
         ("🎭", "Culture"), ("❤️", "Love"), ("🧠", "Brain")]
cw = Inches(1.9); x0 = Inches(0.7); y0 = Inches(2.1)
for i, (ico, t) in enumerate(goals):
    x = x0 + i * (cw + Inches(0.12))
    box(s, x, y0, cw, Inches(1.3), fill=NAVY2, line=BORDER, radius=True)
    text(s, x, y0 + Inches(0.2), cw, Inches(1.0),
         [[(ico, 30, WHITE, False)], [(t, 13, WHITE, True)]],
         align=PP_ALIGN.CENTER, space_after=4)
bullets(s, [
    "Pick your goal · set your level honestly — we start exactly where you are.",
    "Optional placement test fine-tunes the path.",
    [("The experience adapts to ", False), ("why", True),
     (" you’re learning — boosting day-1 retention.", False)],
], y=Inches(3.85))
footer(s)

# ---------- 10 TECHNOLOGY ----------
s = slide(); kicker(s, "Technology")
title(s, "Built to scale — modern, cross-platform, lean.")
bullets(s, [
    [("Expo / React Native", True), (" — one codebase shipping to iOS, Android & Web.", False)],
    [("Supabase", True), (" backend for lesson content and data.", False)],
    [("Dedicated AI backend service", True), (" powering live conversation & corrections.", False)],
    "Premium, distinctive design language: deep navy, gold, German-flag accents.",
    "Fast to iterate, cheap to scale, ready for the app stores today.",
], y=Inches(2.2))
footer(s)

# ---------- 11 MARKET ----------
s = slide(); kicker(s, "Market Opportunity")
title(s, "A massive, proven, growing market.")
stats = [("$10B+", "Language-app market,\ngrowing double digits"),
         ("Top 5", "Most-studied languages\nworldwide: German"),
         ("DACH", "Work, study &\nmigration demand")]
x = Inches(0.7); y = Inches(2.2)
for n, l in stats:
    box(s, x, y, Inches(3.8), Inches(1.7), fill=NAVY2, line=BORDER, radius=True)
    text(s, x + Inches(0.3), y + Inches(0.2), Inches(3.3), Inches(1.3),
         [[(n, 34, GOLD, True)], [(l, 12.5, MUTED, False)]], space_after=6)
    x += Inches(4.05)
bullets(s, [
    [("Duolingo proved consumers pay at scale — but left a gap for learners who want ", False),
     ("real fluency", True), (".", False)],
    "Wundervoll targets serious learners: travellers, professionals, students & expats.",
], y=Inches(4.3))
footer(s)

# ---------- 12 BUSINESS MODEL ----------
s = slide(); kicker(s, "Business Model")
title(s, "Freemium subscription, premium positioning.")
box(s, Inches(0.7), Inches(2.2), Inches(5.6), Inches(2.6), fill=NAVY2, line=BORDER, radius=True)
text(s, Inches(0.95), Inches(2.35), Inches(5.1), Inches(0.4), [[("FREE", 15, GOLD, True)]])
bullets(s, ["Core lessons", "Word of the Day", "Hook learners in"],
        x=Inches(0.95), y=Inches(2.85), w=Inches(5.1), size=15, gap=7)
box(s, Inches(6.6), Inches(2.2), Inches(6.0), Inches(2.6), fill=NAVY2, line=GOLD, radius=True)
text(s, Inches(6.85), Inches(2.35), Inches(5.5), Inches(0.4),
     [[("WUNDERVOLL PREMIUM", 15, GOLD, True)]])
bullets(s, ["Unlimited AI conversation", "Full curriculum & advanced corrections",
            "Offline audio · monthly & annual plans"],
        x=Inches(6.85), y=Inches(2.85), w=Inches(5.4), size=15, gap=7)
text(s, Inches(0.7), Inches(5.2), Inches(12), Inches(1.2),
     [[("Premium brand = premium price vs. mass-market rivals. Future: B2B (schools, "
        "corporate relocation, universities) and more languages on the same engine.",
        14, MUTED, False)]], line_spacing=1.3)
footer(s)

# ---------- 13 VISION & ASK ----------
s = slide(); flagbar(s, Inches(0.7), Inches(0.55))
kicker(s, "Vision & The Ask");
# move kicker below flagbar
title(s, "From app to the way the world learns German.", y=Inches(1.1), size=30)
bullets(s, [
    "Become the destination for people who don’t just want a streak — they want to truly speak.",
    "Near-term: extend the curriculum to B1/B2, expand AI topics, launch Premium.",
    [("The engine is language-agnostic — ", False), ("German today, the world tomorrow.", True)],
    [("The ask: ", True), ("partnership & investment to scale content, AI and growth.", False)],
], y=Inches(2.4))
text(s, Inches(0.7), Inches(5.6), Inches(12), Inches(0.8),
     [[("Sprichst du schon Deutsch? Let’s make it wundervoll. 🇩🇪", 22, GOLD, True)]])
footer(s)

prs.save("pitch/Wundervoll-Pitch.pptx")
print("saved pitch/Wundervoll-Pitch.pptx")
