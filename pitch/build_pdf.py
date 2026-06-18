#!/usr/bin/env python3
"""Dependency-free PDF builder for the Wundervoll pitch deck (16:9, 960x540pt).
Pure Python standard library — emits vector rectangles + Helvetica text by hand.
"""
import zlib, struct

# ---- page geometry (PowerPoint 16:9 = 960 x 540 pt) ----
PW, PH = 960.0, 540.0

# ---- brand palette (0-1 RGB) ----
def rgb(h): return (int(h[0:2],16)/255, int(h[2:4],16)/255, int(h[4:6],16)/255)
NAVY=rgb("070B18"); NAVY2=rgb("0A1020"); NAVY3=rgb("0F1628"); BORDER=rgb("1E2D45")
GOLD=rgb("C9A84C"); RED=rgb("CC0000"); BLACK=rgb("111111"); WHITE=rgb("FFFFFF")
TEXT=rgb("E2E8F0"); MUTED=rgb("8A9AB0")

# Helvetica average char-width factors (approx, per pt of font size)
def textwidth(s, size, bold=False):
    return len(s) * size * 0.52

def san(s):
    """Map special chars into cp1252-encodable text."""
    repl = {"→":"->","≠":"is not","↓":"|","🇩🇪":"","·":"-","–":"-","—":"-",
            "“":'"',"”":'"',"‘":"'","’":"'","…":"..."}
    for k,v in repl.items(): s=s.replace(k,v)
    # strip remaining emoji / non-cp1252
    out=[]
    for ch in s:
        try: ch.encode("cp1252"); out.append(ch)
        except: pass
    return "".join(out).strip()

def pesc(s):
    return s.replace("\\","\\\\").replace("(","\\(").replace(")","\\)")


class PDF:
    def __init__(self):
        self.pages=[]   # list of content-stream strings
    def add(self, content): self.pages.append(content)

    def build(self, path):
        objs=[]  # raw bytes per object (without "N 0 obj")
        # 1 catalog, 2 pages, then per page: page obj + content obj; fonts at end
        n_pages=len(self.pages)
        font_reg=1+2+2*n_pages+1   # obj number of regular font
        font_bold=font_reg+1
        # catalog (obj1)
        objs.append(b"<< /Type /Catalog /Pages 2 0 R >>")
        # pages (obj2)
        kids=" ".join(f"{3+2*i} 0 R" for i in range(n_pages))
        objs.append(f"<< /Type /Pages /Count {n_pages} /Kids [{kids}] >>".encode())
        # per page
        for i,content in enumerate(self.pages):
            pageobj=3+2*i; contentobj=pageobj+1
            res=(f"<< /Font << /F1 {font_reg} 0 R /F2 {font_bold} 0 R >> >>")
            page=(f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PW} {PH}] "
                  f"/Resources {res} /Contents {contentobj} 0 R >>")
            objs.append(page.encode())
            data=content.encode("cp1252","replace")
            comp=zlib.compress(data)
            stream=(f"<< /Length {len(comp)} /Filter /FlateDecode >>\nstream\n").encode()+comp+b"\nendstream"
            objs.append(stream)
        # fonts
        objs.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>")
        objs.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>")

        # assemble
        out=bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
        offsets=[0]
        for idx,body in enumerate(objs,1):
            offsets.append(len(out))
            out+=f"{idx} 0 obj\n".encode()+body+b"\nendobj\n"
        xref=len(out)
        out+=f"xref\n0 {len(objs)+1}\n".encode()
        out+=b"0000000000 65535 f \n"
        for off in offsets[1:]:
            out+=f"{off:010d} 00000 n \n".encode()
        out+=(f"trailer\n<< /Size {len(objs)+1} /Root 1 0 R >>\n"
              f"startxref\n{xref}\n%%EOF").encode()
        with open(path,"wb") as f: f.write(out)


# ---------- drawing helpers (operate on a content-string builder) ----------
class Canvas:
    def __init__(self): self.s=[]
    def rect(self,x,y,w,h,fill):
        # y is top-based; convert
        Y=PH-y-h
        self.s.append(f"{fill[0]:.3f} {fill[1]:.3f} {fill[2]:.3f} rg")
        self.s.append(f"{x:.2f} {Y:.2f} {w:.2f} {h:.2f} re f")
    def rrect(self,x,y,w,h,fill=None,stroke=None,sw=1.0,r=8):
        Y=PH-y-h
        k=0.5523*r
        x0,y0=x,Y; x1,y1=x+w,Y+h
        p=[]
        p.append(f"{x0+r:.2f} {y0:.2f} m")
        p.append(f"{x1-r:.2f} {y0:.2f} l")
        p.append(f"{x1-r+k:.2f} {y0:.2f} {x1:.2f} {y0+r-k:.2f} {x1:.2f} {y0+r:.2f} c")
        p.append(f"{x1:.2f} {y1-r:.2f} l")
        p.append(f"{x1:.2f} {y1-r+k:.2f} {x1-r+k:.2f} {y1:.2f} {x1-r:.2f} {y1:.2f} c")
        p.append(f"{x0+r:.2f} {y1:.2f} l")
        p.append(f"{x0+r-k:.2f} {y1:.2f} {x0:.2f} {y1-r+k:.2f} {x0:.2f} {y1-r:.2f} c")
        p.append(f"{x0:.2f} {y0+r:.2f} l")
        p.append(f"{x0:.2f} {y0+r-k:.2f} {x0+r-k:.2f} {y0:.2f} {x0+r:.2f} {y0:.2f} c")
        if fill is not None:
            self.s.append(f"{fill[0]:.3f} {fill[1]:.3f} {fill[2]:.3f} rg")
        if stroke is not None:
            self.s.append(f"{stroke[0]:.3f} {stroke[1]:.3f} {stroke[2]:.3f} RG {sw} w")
        self.s.append("\n".join(p))
        if fill is not None and stroke is not None: self.s.append("b")
        elif fill is not None: self.s.append("f")
        else: self.s.append("S")
    def text(self,x,y,s,size,color,bold=False):
        s=san(s)
        if not s: return
        Y=PH-y-size  # y top-based -> baseline
        font="F2" if bold else "F1"
        self.s.append(f"BT /{font} {size} Tf {color[0]:.3f} {color[1]:.3f} {color[2]:.3f} rg "
                      f"{x:.2f} {Y:.2f} Td ({pesc(s)}) Tj ET")
    def textc(self,cx,y,s,size,color,bold=False):
        w=textwidth(san(s),size,bold); self.text(cx-w/2,y,s,size,color,bold)
    def wrap(self,x,y,maxw,s,size,color,bold=False,lh=1.3,bullet=False):
        s=san(s); words=s.split(); lines=[]; cur=""
        for w in words:
            t=(cur+" "+w).strip()
            if textwidth(t,size,bold)>maxw and cur: lines.append(cur); cur=w
            else: cur=t
        if cur: lines.append(cur)
        yy=y
        for i,ln in enumerate(lines):
            bx=x
            if bullet and i==0:
                self.text(x,yy,"-",size,GOLD,True); bx=x+size*0.9
            elif bullet:
                bx=x+size*0.9
            self.text(bx,yy,ln,size,color,bold); yy+=size*lh
        return yy
    def out(self): return "\n".join(self.s)


def flagbar(c,x,y,w=110,h=6):
    seg=w/3
    for i,col in enumerate((BLACK,RED,GOLD)): c.rect(x+seg*i,y,seg,h,col)

def bg(c): c.rect(0,0,PW,PH,NAVY)
def kicker(c,t): c.text(50,40,t.upper(),11,GOLD,True)
def footer(c): c.text(50,512,"WUNDERVOLL  -  German, made wonderful",8,MUTED)
def title(c,t,y=66,size=27,color=WHITE): c.text(50,y,t,size,color,True)

# rich bullet: list where each item is str OR list of (txt,goldbold) segments
def bullets(c,items,x=50,y=160,maxw=860,size=13,gap=10):
    yy=y
    for it in items:
        if isinstance(it,str):
            yy=c.wrap(x,yy,maxw,it,size,TEXT,bullet=True)
        else:
            # render bullet dash then segments on wrapped-ish single block
            c.text(x,yy,"-",size,GOLD,True)
            line=" ".join(seg[0] for seg in it)
            # simple: print full line wrapped in TEXT, then we lose per-seg color.
            # Instead place segments inline on one line (assume fits).
            cx=x+size*0.9
            for txt,goldb in it:
                c.text(cx,yy,txt,size,GOLD if goldb else TEXT,goldb)
                cx+=textwidth(san(txt),size,goldb)
            yy+=size*1.3
        yy+=gap
    return yy


doc=PDF()

# 1 COVER
c=Canvas(); bg(c)
flagbar(c,50,150)
c.text(50,165,"WUNDER",46,rgb("5b6678"),True)
c.text(50+textwidth("WUNDER",46,True),165,"VO",46,RED,True)
c.text(50+textwidth("WUNDERVO",46,True),165,"LL",46,GOLD,True)
c.text(50,235,"German, made wonderful.",23,GOLD,True)
c.wrap(50,290,640,"The language app that actually teaches you to speak - not just tap colourful circles.",17,TEXT,lh=1.4)
c.text(50,400,"A premium mobile language-learning app  -  Expo / React Native  -  iOS  -  Android  -  Web",11,MUTED)
doc.add(c.out())

# 2 PROBLEM
c=Canvas(); bg(c); kicker(c,"The Problem")
title(c,"Millions are learning a language - with nothing to show for it.",size=24)
bullets(c,[
 "Gamified apps optimise for streaks and addiction, not fluency. 1,000-day streaks, still cannot order a coffee.",
 "Endless tapping of colourful bubbles is not real conversation skill.",
 "Grammar is taught like a textbook - dry, abstract, forgettable.",
 "Learners quit because they never feel the payoff of actually speaking.",
],y=150,size=14,gap=14)
c.text(50,420,"The result: high engagement metrics, low real-world competence.",13,MUTED)
footer(c); doc.add(c.out())

# 3 SOLUTION
c=Canvas(); bg(c); kicker(c,"The Solution")
title(c,"A German app built around speaking from day one.",size=25)
bullets(c,[
 [("Real sentences. Real conversations. Real progress.",True)],
 "Every lesson built around phrases you will use immediately.",
 "Grammar explained like a human, not a textbook.",
 "Science-backed: flashcards, spaced repetition, quizzes & mnemonics in one smooth flow.",
 "A love letter to the language itself - its beauty, its untranslatable words, its soul.",
],y=150,size=14,gap=14)
footer(c); doc.add(c.out())

# 4 FEATURES
c=Canvas(); bg(c); kicker(c,"Product"); title(c,"Six features, one wonderful flow.")
feats=[("53 Structured Lessons","A1 to A2 curriculum mapped to CEFR: grammar, listening, vocab & dialogue."),
 ("AI Conversation Partner","Chat by voice or text; real-time grammar corrections with friendly explanations."),
 ("Placement Test","A 20-question quiz instantly places learners at A1-C1."),
 ("Quiz & XP System","Earn XP, level up from Anfaenger to Meister, build daily streaks."),
 ("Wort des Tages","The beautiful, untranslatable words that make German special."),
 ("Native Audio","Professionally generated pronunciation for every lesson.")]
cw,ch=283,118; gx,gy=18,16; x0,y0=50,135
for i,(t,d) in enumerate(feats):
    r,cc=divmod(i,3); x=x0+cc*(cw+gx); y=y0+r*(ch+gy)
    c.rrect(x,y,cw,ch,fill=NAVY2,stroke=BORDER,r=10)
    c.wrap(x+18,y+16,cw-36,t,15,WHITE,bold=True)
    c.wrap(x+18,y+50,cw-36,d,11,MUTED,lh=1.3)
footer(c); doc.add(c.out())

# 5 AI PARTNER
c=Canvas(); bg(c); kicker(c,"Hero Feature")
title(c,"Practise speaking with zero fear of judgement.",size=24)
bullets(c,[
 "Speak or type on real topics: Kennenlernen, Im Cafe, Reisen, Arbeit, Familie, Wetter.",
 "The AI replies naturally, then gently corrects your mistakes.",
 "Voice mode with live transcription - or text mode. Your choice.",
 "The practice partner most learners never find: patient, 24/7, encouraging.",
],x=50,y=150,maxw=470,size=13,gap=12)
fx,fy,fw=560,150,350
c.rrect(fx,fy,fw,250,fill=NAVY2,stroke=BORDER,r=12)
c.text(fx+20,fy+16,"HOW A CORRECTION WORKS",11,GOLD,True)
steps=[("You: Ich habe gegangen.",RED,NAVY3),("v",GOLD,None),
       ("Corrected: Ich bin gegangen.",GOLD,NAVY3),("v",GOLD,None),
       ("Why: movement verbs take sein, not haben.",TEXT,NAVY3)]
yy=fy+48
for txt,col,bx in steps:
    if bx is None:
        c.textc(fx+fw/2,yy,"v",13,GOLD,True); yy+=24
    else:
        c.rrect(fx+20,yy,fw-40,38,fill=bx,stroke=BORDER,r=8)
        c.text(fx+34,yy+12,txt,11.5,col,col==GOLD); yy+=50
footer(c); doc.add(c.out())

# 6 CURRICULUM
c=Canvas(); bg(c); kicker(c,"Pedagogy"); title(c,"A real curriculum - not a game.")
bullets(c,[
 "Lessons progress through pronunciation, grammar, vocabulary, listening & speaking.",
 [("Example - A1.0 Aussprache, Das Fundament: ",True),("the 6 critical sounds that separate German from English.",False)],
 "Clear learning objectives per lesson; XP rewarded on completion.",
 "Built to take a true beginner to confident A2 - and beyond.",
],y=150,size=14,gap=14)
c.rrect(50,400,360,38,fill=NAVY2,stroke=GOLD,r=8)
c.text(66,412,"CEFR-aligned  -  A1 -> A2 -> B1/B2 roadmap",13,GOLD,True)
footer(c); doc.add(c.out())

# 7 WORD OF THE DAY
c=Canvas(); bg(c); kicker(c,"The Emotional Hook"); title(c,"Fall in love with the language.")
words=[("Fernweh","A deep, aching longing to travel to distant places."),
 ("Weltschmerz","The pain of the world falling short of how it should be."),
 ("Zweisamkeit","The warm intimacy of being together with just one other person.")]
yy=140
for w,d in words:
    c.rrect(50,yy,470,72,fill=NAVY2,stroke=BORDER,r=10)
    c.text(66,yy+12,w,18,GOLD,True); c.wrap(66,yy+40,440,d,12,TEXT,lh=1.2)
    yy+=86
c.text(560,140,"EVERY WORD INCLUDES",12,GOLD,True)
bullets(c,["Pronunciation guide","Literal part-by-part breakdown",
 "Rich meaning & example sentence","Why it is beautiful - fully shareable"],
 x=560,y=170,maxw=350,size=13,gap=10)
c.wrap(560,360,350,"Turns a study tool into something people love - and share.",12,MUTED,lh=1.3)
footer(c); doc.add(c.out())

# 8 RETENTION
c=Canvas(); bg(c); kicker(c,"Retention"); title(c,"Gamification done right.")
c.text(50,140,"XP system with six levels of mastery:",15,TEXT)
levels=["Anfaenger","Einsteiger","Lernender","Fortgeschrittener","Experte","Meister"]
x=50; y=180
for lv in levels:
    w=textwidth(lv,12,True)+28
    c.rrect(x,y,w,34,fill=NAVY2,stroke=GOLD,r=8)
    c.textc(x+w/2,y+11,lv,12,GOLD,True); x+=w+14
bullets(c,[
 "Daily streaks build the habit - progress tracking across lessons & skills.",
 "Quizzes reinforce memory through active recall & spaced repetition.",
 [("The difference: ",True),("every engagement mechanic is tied to genuine competence.",False)],
],y=250,size=14,gap=14)
footer(c); doc.add(c.out())

# 9 PERSONALISATION
c=Canvas(); bg(c); kicker(c,"Onboarding"); title(c,"Personalised from the first tap.")
goals=["Travel","Work","Family","Culture","Love","Brain"]
cw=135; x0=50; y0=140
for i,t in enumerate(goals):
    x=x0+i*(cw+10); c.rrect(x,y0,cw,80,fill=NAVY2,stroke=BORDER,r=10)
    c.textc(x+cw/2,y0+32,t,15,WHITE,True)
bullets(c,[
 "Pick your goal - set your level honestly - we start exactly where you are.",
 "Optional placement test fine-tunes the path.",
 [("The experience adapts to why you are learning",True),(" - boosting day-1 retention.",False)],
],y=260,size=14,gap=14)
footer(c); doc.add(c.out())

# 10 TECHNOLOGY
c=Canvas(); bg(c); kicker(c,"Technology"); title(c,"Built to scale - modern, cross-platform, lean.")
bullets(c,[
 [("Expo / React Native",True),(" - one codebase shipping to iOS, Android & Web.",False)],
 [("Supabase",True),(" backend for lesson content and data.",False)],
 [("Dedicated AI backend service",True),(" powering live conversation & corrections.",False)],
 "Premium, distinctive design language: deep navy, gold, German-flag accents.",
 "Fast to iterate, cheap to scale, ready for the app stores today.",
],y=150,size=14,gap=14)
footer(c); doc.add(c.out())

# 11 MARKET
c=Canvas(); bg(c); kicker(c,"Market Opportunity"); title(c,"A massive, proven, growing market.")
stats=[("$10B+","Language-app market,","growing double digits"),
 ("Top 5","Most-studied languages","worldwide: German"),
 ("DACH","Work, study &","migration demand")]
x=50; y=140
for n,l1,l2 in stats:
    c.rrect(x,y,275,120,fill=NAVY2,stroke=BORDER,r=10)
    c.text(x+22,y+18,n,32,GOLD,True); c.text(x+22,y+70,l1,12,MUTED); c.text(x+22,y+90,l2,12,MUTED)
    x+=292
bullets(c,[
 [("Duolingo proved consumers pay at scale - but left a gap for learners who want real fluency.",False)],
 "Wundervoll targets serious learners: travellers, professionals, students & expats.",
],y=300,size=14,gap=14)
footer(c); doc.add(c.out())

# 12 BUSINESS MODEL
c=Canvas(); bg(c); kicker(c,"Business Model"); title(c,"Freemium subscription, premium positioning.")
c.rrect(50,150,400,170,fill=NAVY2,stroke=BORDER,r=10)
c.text(68,166,"FREE",15,GOLD,True)
bullets(c,["Core lessons","Word of the Day","Hook learners in"],x=68,y=205,maxw=360,size=14,gap=10)
c.rrect(470,150,440,170,fill=NAVY2,stroke=GOLD,r=10)
c.text(488,166,"WUNDERVOLL PREMIUM",15,GOLD,True)
bullets(c,["Unlimited AI conversation","Full curriculum & advanced corrections","Offline audio - monthly & annual plans"],
 x=488,y=205,maxw=400,size=14,gap=10)
c.wrap(50,360,860,"Premium brand = premium price vs. mass-market rivals. Future: B2B (schools, corporate relocation, universities) and more languages on the same engine.",13,MUTED,lh=1.4)
footer(c); doc.add(c.out())

# 13 VISION & ASK
c=Canvas(); bg(c); flagbar(c,50,40); kicker(c,"Vision & The Ask")
title(c,"From app to the way the world learns German.",y=78,size=25)
bullets(c,[
 "Become the destination for people who do not just want a streak - they want to truly speak.",
 "Near-term: extend the curriculum to B1/B2, expand AI topics, launch Premium.",
 [("The engine is language-agnostic - German today, the world tomorrow.",True)],
 [("The ask: ",True),("partnership & investment to scale content, AI and growth.",False)],
],y=160,size=14,gap=14)
c.text(50,420,"Sprichst du schon Deutsch? Let's make it wundervoll.",20,GOLD,True)
footer(c); doc.add(c.out())

doc.build("pitch/Wundervoll-Pitch.pdf")
print("saved pitch/Wundervoll-Pitch.pdf")
