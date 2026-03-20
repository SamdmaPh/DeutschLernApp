const https = require('https');
const fs = require('fs');
const path = require('path');

// CONFIG
const ELEVENLABS_API_KEY = 'sk_aaff6645ebdb3f18af9e4bd3ada9eed9029075581357fe6e';
const VOICE_ID = '0tccZ7me7OBktTGzDbvx';
const SUPABASE_URL = 'https://ypkpsosjkfrgenfcgjtq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwa3Bzb3Nqa2ZyZ2VuZmNnanRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTI4NDMsImV4cCI6MjA4ODY2ODg0M30.CJy-QP9GPf7o1f12aAWtBKOvJM5wXqJv3VIqHKBBRC0';

const OUTPUT_DIR = path.join(__dirname, 'audio');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

// Supabase fetch helper
function fetchLessons() {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/lessons?select=*&order=order_index`);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
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

// Build podcast script from lesson content
function buildPodcastScript(lesson) {
  const c = lesson.content || {};
  const goals = c.goals || [];
  const chunks = c.chunks || [];
  const mnemonic = c.mnemonic || [];
  const speak = c.speak || [];
  const science = c.science || '';

  let script = '';

  // Intro
  script += `Hallo und herzlich willkommen! Heute beschäftigen wir uns mit: ${lesson.title}.\n\n`;

  // Goals
  if (goals.length > 0) {
    script += `Nach dieser Lektion wirst du Folgendes können:\n`;
    goals.forEach(g => { script += `${g}.\n`; });
    script += '\n';
  }

  // Science/method note
  if (science) {
    script += `Kleiner Tipp aus der Wissenschaft: ${science}\n\n`;
  }

  // Main content
  if (chunks.length > 0) {
    script += `Jetzt zum Hauptteil.\n\n`;
    chunks.forEach((chunk, i) => {
      script += `${chunk}\n\n`;
    });
  }

  // Mnemonics
  if (mnemonic.length > 0) {
    script += `Hier sind einige Eselsbrücken, die dir helfen werden:\n`;
    mnemonic.forEach(m => { script += `${m}\n`; });
    script += '\n';
  }

  // Speaking exercises
  if (speak.length > 0) {
    script += `Und jetzt übst du! Sprich jeden Satz laut nach:\n\n`;
    speak.forEach(s => {
      script += `${s}.\n`;
    });
    script += '\n';
  }

  // Outro
  script += `Großartig! Du hast Lektion "${lesson.title}" abgeschlossen. Bis zur nächsten Lektion. Tschüss!`;

  return script;
}

// Generate MP3 via ElevenLabs
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
        res.on('end', () => reject(new Error(`ElevenLabs Error ${res.statusCode}: ${err}`)));
        return;
      }
      const filePath = path.join(OUTPUT_DIR, filename);
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filePath);
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// Main
async function main() {
  console.log('📚 Lade Lektionen aus Supabase...');
  const lessons = await fetchLessons();
  console.log(`✅ ${lessons.length} Lektionen gefunden.\n`);

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    const filename = `lesson_${lesson.id}.mp3`;
    const filePath = path.join(OUTPUT_DIR, filename);

    // Skip if already generated
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  [${i+1}/${lessons.length}] Übersprungen (bereits vorhanden): ${lesson.title}`);
      continue;
    }

    const script = buildPodcastScript(lesson);
    console.log(`🎙️  [${i+1}/${lessons.length}] Generiere: ${lesson.title} (${script.length} Zeichen)`);

    try {
      await generateAudio(script, filename);
      console.log(`   ✅ Gespeichert: audio/${filename}`);
      // Wait 1 second between requests to avoid rate limiting
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`   ❌ Fehler: ${err.message}`);
    }
  }

  console.log('\n🎉 Fertig! Alle MP3s sind im Ordner: audio/');
  console.log('📤 Nächster Schritt: MP3s in Supabase Storage hochladen.');
}

main().catch(console.error);
