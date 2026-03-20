const https = require('https');
const fs = require('fs');
const path = require('path');

const ELEVENLABS_API_KEY = 'sk_aaff6645ebdb3f18af9e4bd3ada9eed9029075581357fe6e';
const VOICE_ID = '0tccZ7me7OBktTGzDbvx';
const SUPABASE_URL = 'https://ypkpsosjkfrgenfcgjtq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwa3Bzb3Nqa2ZyZ2VuZmNnanRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTI4NDMsImV4cCI6MjA4ODY2ODg0M30.CJy-QP9GPf7o1f12aAWtBKOvJM5wXqJv3VIqHKBBRC0';
const BUCKET = 'audio';
const OUTPUT_DIR = path.join(__dirname, 'audio_v2');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

function fetchLessons() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'ypkpsosjkfrgenfcgjtq.supabase.co',
      path: '/rest/v1/lessons?select=*&order=order_index',
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  });
}

// Build a rich ~12-minute podcast script per lesson (~1800 words)
function buildRichPodcastScript(lesson) {
  const c = lesson.content || {};
  const goals = c.goals || [];
  const chunks = c.chunks || [];
  const mnemonic = c.mnemonic || [];
  const speak = c.speak || [];
  const science = c.science || '';
  const level = lesson.level || 'A1';

  let s = '';

  // === INTRO (ca. 1 Minute) ===
  s += `Hallo und herzlich willkommen zu deinem Deutsch-Podcast! Ich bin Philipp, und heute begleite ich dich durch eine neue Lektion.\n\n`;
  s += `Die heutige Folge trägt den Titel: ${lesson.title}.\n\n`;
  s += `Wir sind heute auf dem Niveau ${level}. Das bedeutet: Wir bauen aufeinander auf. Alles, was du heute lernst, macht dich einen Schritt sicherer auf Deutsch.\n\n`;
  s += `Bevor wir anfangen, kurz ein Hinweis: Lern nicht passiv. Sprich mit. Wann immer ich einen Satz sage und eine Pause mache — nutze diese Pause. Sprich den Satz laut nach. Dein Gehirn lernt durch Aktivität, nicht durch Zuhören allein.\n\n`;
  s += `Okay. Bereit? Dann starten wir.\n\n`;

  // === LERNZIELE (ca. 1 Minute) ===
  s += `Was wirst du heute lernen?\n\n`;
  if (goals.length > 0) {
    s += `Nach dieser Lektion wirst du Folgendes können:\n\n`;
    goals.forEach((g, i) => {
      s += `Punkt ${i + 1}: ${g}.\n\n`;
    });
  } else {
    s += `Du wirst heute neue Strukturen und Vokabeln kennenlernen, die du sofort im Alltag anwenden kannst.\n\n`;
  }
  s += `Das klingt nach viel — aber keine Sorge. Wir gehen alles Schritt für Schritt durch. Am Ende wird es sich natürlich anfühlen.\n\n`;

  // === WISSENSCHAFT/METHODE (ca. 1 Minute) ===
  if (science) {
    s += `Kleiner Exkurs: Warum funktioniert diese Methode?\n\n`;
    s += `${science}\n\n`;
    s += `Das ist der Grund, warum wir in diesem Kurs so vorgehen wie wir vorgehen. Nicht Grammatik pauken. Nicht Vokabellisten auswendig lernen. Sondern echte Sprache, in echten Situationen, sofort angewendet.\n\n`;
  } else {
    s += `Kurzer wissenschaftlicher Einschub: Studien zeigen, dass wir Sprachen am schnellsten lernen, wenn wir sie aktiv benutzen — nicht wenn wir sie nur studieren. Das nennt sich Output-basiertes Lernen. Genau das machen wir heute.\n\n`;
  }

  // === HAUPTINHALT — CHUNKS (ca. 5 Minuten) ===
  s += `Jetzt zum Herzstück dieser Lektion: dem Hauptinhalt.\n\n`;

  if (chunks.length > 0) {
    chunks.forEach((chunk, i) => {
      s += `Abschnitt ${i + 1}.\n\n`;
      s += `${chunk}\n\n`;
      s += `Lass uns das kurz sacken lassen. Hast du das verstanden? Gut. Weiter geht's.\n\n`;

      // Add elaboration for longer episodes
      if (i === 0) {
        s += `Dieses Prinzip ist fundamental. Wenn du nichts anderes aus dieser Lektion mitnimmst — nimm das mit. Es wird dir immer wieder begegnen.\n\n`;
      }
      if (i === 1) {
        s += `Merkst du, wie das mit dem vorherigen Punkt zusammenhängt? Sprache ist kein Zufall. Es gibt Muster. Und wenn du die Muster erkennst, wird alles leichter.\n\n`;
      }
      if (i === 2) {
        s += `Gut. Wir haben jetzt schon einiges abgedeckt. Kurze mentale Pause — atme durch — und wir machen weiter.\n\n`;
      }
    });
  } else {
    s += `Das Thema dieser Lektion ist: ${lesson.title}. Lass uns tief eintauchen.\n\n`;
    s += `Im Deutschen gibt es viele Wege, dasselbe auszudrücken. Was wichtig ist: Du musst nicht perfekt sein. Du musst verständlich sein. Das ist ein riesiger Unterschied.\n\n`;
    s += `Muttersprachler machen auch Fehler. Immer. Jeden Tag. Das ist normal. Was sie richtig machen: Sie sprechen trotzdem. Sie korrigieren sich, lachen darüber, und machen weiter.\n\n`;
    s += `Das ist deine Einstellung ab heute.\n\n`;
  }

  // === ESELSBRÜCKEN (ca. 2 Minuten) ===
  if (mnemonic.length > 0) {
    s += `Jetzt kommen meine Lieblingsteil jeder Lektion: die Eselsbrücken.\n\n`;
    s += `Eselsbrücken sind kleine Tricks, die dir helfen, Dinge im Gedächtnis zu behalten. Das Gehirn liebt Bilder, Geschichten und Verbindungen. Nutzen wir das.\n\n`;
    mnemonic.forEach((m, i) => {
      s += `Eselsbrücke Nummer ${i + 1}: ${m}\n\n`;
      s += `Kannst du dir das vorstellen? Gut. Dann wirst du es nicht vergessen.\n\n`;
    });
  } else {
    s += `Ein Tipp zum Merken: Verbinde neue Wörter immer mit einem Bild oder einer Geschichte. Dein Gehirn denkt in Bildern — nutze das.\n\n`;
    s += `Zum Beispiel: Wenn du dir ein neues deutsches Wort merkst, stell dir eine verrückte Szene dazu vor. Je absurder, desto besser. Das Gehirn merkt sich Ungewöhnliches viel besser als Normales.\n\n`;
  }

  // === SPRECHÜBUNGEN (ca. 2 Minuten) ===
  s += `Und jetzt kommt der wichtigste Teil: Du sprichst!\n\n`;
  s += `Ich werde jetzt Sätze sagen. Nach jedem Satz mache ich eine Pause. Nutze diese Pause. Sprich den Satz laut nach. Auch wenn du alleine bist. Auch wenn es sich komisch anfühlt. Besonders dann.\n\n`;

  if (speak.length > 0) {
    s += `Bereit? Los geht's.\n\n`;
    speak.forEach((sentence, i) => {
      s += `Satz ${i + 1}: ${sentence}.\n\n`;
      s += `Noch einmal: ${sentence}.\n\n`;
      if (i % 3 === 2) {
        s += `Super! Du machst das großartig. Weiter.\n\n`;
      }
    });
  } else {
    s += `Wiederhole nach mir:\n\n`;
    s += `Ich lerne Deutsch.\n\n`;
    s += `Noch einmal: Ich lerne Deutsch.\n\n`;
    s += `Ich spreche jeden Tag ein bisschen mehr.\n\n`;
    s += `Noch einmal: Ich spreche jeden Tag ein bisschen mehr.\n\n`;
    s += `Ich mache Fehler — und das ist gut so.\n\n`;
    s += `Noch einmal: Ich mache Fehler — und das ist gut so.\n\n`;
  }

  // === VERTIEFUNG UND KONTEXT (ca. 2 Minuten) ===
  s += `Jetzt lass uns das Gelernte in einen echten Kontext setzen.\n\n`;
  s += `Stell dir vor, du bist in ${level === 'A1' ? 'Wien und gehst zum ersten Mal in ein Café' : 'Berlin und unterhältst dich mit einem neuen Kollegen'}. Was würdest du sagen?\n\n`;
  s += `Du hast jetzt die Werkzeuge. Vielleicht noch nicht perfekt. Aber du kannst es versuchen. Und das ist der entscheidende Unterschied zwischen jemandem, der Deutsch lernt, und jemandem, der Deutsch spricht.\n\n`;
  s += `Der einzige Unterschied ist: einer traut sich. Trau dich.\n\n`;
  s += `Eine kleine Herausforderung für heute: Benutze mindestens einen Satz aus dieser Lektion heute noch. Im echten Leben. Zu einem echten Menschen. Oder zumindest zu dir selbst im Spiegel.\n\n`;
  s += `Es klingt simpel. Aber es macht einen riesigen Unterschied.\n\n`;

  // === WIEDERHOLUNG (ca. 1 Minute) ===
  s += `Kurze Wiederholung: Was haben wir heute gelernt?\n\n`;
  if (goals.length > 0) {
    goals.forEach(g => {
      s += `Du kannst jetzt: ${g}.\n\n`;
    });
  }
  s += `Das ist nicht wenig. Das ist echter Fortschritt.\n\n`;

  // === OUTRO (ca. 1 Minute) ===
  s += `Bevor ich dich entlasse, noch ein letzter Gedanke.\n\n`;
  s += `Sprachenlernen ist wie Sport. Du wirst nicht nach einem Training zum Athleten. Aber jeden Tag ein bisschen — und nach einem Jahr wirst du dich nicht wiedererkennen.\n\n`;
  s += `Bleib dran. Komm morgen wieder. Und übermorgen.\n\n`;
  s += `Du schaffst das. Ich bin sicher.\n\n`;
  s += `Das war die Lektion "${lesson.title}" auf Niveau ${level}. Ich bin Philipp, und ich freue mich, dich in der nächsten Folge wieder zu sehen.\n\n`;
  s += `Bis dann. Mach's gut. Tschüss!\n`;

  return s;
}

function generateAudio(text, filename) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.75 }
    });

    const options = {
      hostname: 'api.elevenlabs.io',
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      }
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let err = '';
        res.on('data', d => err += d);
        res.on('end', () => reject(new Error(`ElevenLabs ${res.statusCode}: ${err}`)));
        return;
      }
      const filePath = path.join(OUTPUT_DIR, filename);
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => { fileStream.close(); resolve(filePath); });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function uploadFile(filename, fileBuffer) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'ypkpsosjkfrgenfcgjtq.supabase.co',
      path: `/storage/v1/object/${BUCKET}/${filename}`,
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'audio/mpeg',
        'Content-Length': fileBuffer.length,
        'x-upsert': 'true',
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.write(fileBuffer);
    req.end();
  });
}

function updateLessonAudioUrl(lessonId, audioUrl) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ audio_url: audioUrl });
    const options = {
      hostname: 'ypkpsosjkfrgenfcgjtq.supabase.co',
      path: `/rest/v1/lessons?id=eq.${lessonId}`,
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Prefer': 'return=minimal',
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('📚 Lade Lektionen aus Supabase...');
  const lessons = await fetchLessons();
  console.log(`✅ ${lessons.length} Lektionen gefunden.\n`);

  // Process one lesson at a time to test first
  const startFrom = parseInt(process.argv[2] || '0');
  console.log(`🚀 Starte ab Lektion ${startFrom + 1}\n`);

  for (let i = startFrom; i < lessons.length; i++) {
    const lesson = lessons[i];
    const filename = `lesson_${lesson.id}.mp3`;

    const script = buildRichPodcastScript(lesson);
    const wordCount = script.split(' ').length;
    const estimatedMinutes = Math.round(wordCount / 130); // ~130 words/min

    console.log(`🎙️  [${i+1}/${lessons.length}] ${lesson.title}`);
    console.log(`     📝 ${wordCount} Wörter → ca. ${estimatedMinutes} Minuten`);

    try {
      const filePath = await generateAudio(script, filename);
      console.log(`     ✅ MP3 generiert`);

      const fileBuffer = fs.readFileSync(filePath);
      await uploadFile(filename, fileBuffer);

      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filename}`;
      await updateLessonAudioUrl(lesson.id, publicUrl);
      console.log(`     ☁️  Hochgeladen & URL gespeichert\n`);

      // 2 second pause between requests
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.error(`     ❌ Fehler: ${err.message}\n`);
    }
  }

  console.log('🎉 Fertig! Alle Lektionen haben jetzt ~12-Minuten Podcasts.');
}

main().catch(console.error);
