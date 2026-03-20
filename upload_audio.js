const fs = require('fs');
const path = require('path');
const https = require('https');

const SUPABASE_URL = 'https://ypkpsosjkfrgenfcgjtq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwa3Bzb3Nqa2ZyZ2VuZmNnanRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTI4NDMsImV4cCI6MjA4ODY2ODg0M30.CJy-QP9GPf7o1f12aAWtBKOvJM5wXqJv3VIqHKBBRC0';
const BUCKET = 'audio';
const AUDIO_DIR = path.join(__dirname, 'audio');

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
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
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
  const files = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.mp3'));
  console.log(`📤 Lade ${files.length} MP3s in Supabase Storage hoch...\n`);

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const filePath = path.join(AUDIO_DIR, filename);
    const fileBuffer = fs.readFileSync(filePath);

    // Extract lesson ID from filename: lesson_UUID.mp3
    const lessonId = filename.replace('lesson_', '').replace('.mp3', '');
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filename}`;

    console.log(`📤 [${i+1}/${files.length}] ${filename}`);

    try {
      await uploadFile(filename, fileBuffer);
      await updateLessonAudioUrl(lessonId, publicUrl);
      console.log(`   ✅ Hochgeladen & URL gespeichert`);
    } catch (err) {
      console.error(`   ❌ Fehler: ${err.message}`);
    }
  }

  console.log('\n🎉 Fertig! Alle MP3s sind in Supabase Storage.');
  console.log('📱 Die App kann jetzt echte Podcasts abspielen!');
}

main().catch(console.error);
