const https = require('https');

const SUPABASE_URL = 'https://ypkpsosjkfrgenfcgjtq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwa3Bzb3Nqa2ZyZ2VuZmNnanRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTI4NDMsImV4cCI6MjA4ODY2ODg0M30.CJy-QP9GPf7o1f12aAWtBKOvJM5wXqJv3VIqHKBBRC0';
const BUCKET = 'audio';

// Mapping: order_index → alter Dateiname (die 9 echten Audio-Dateien)
const ORDER_TO_FILENAME = {
  1: 'lesson_d6a03bac-a773-44c7-b464-2e09f0186e5e.mp3',
  2: 'lesson_82e2692c-bab8-4751-a31d-8f0c85dcd715.mp3',
  3: 'lesson_2af26d69-4540-4a0e-9b69-e642267a570c.mp3',
  4: 'lesson_0d6f80a4-698d-466d-a508-07eedeab6ed7.mp3',
  5: 'lesson_f88f0837-acbb-44ad-84db-307579547f12.mp3',
  6: 'lesson_f344cec4-f179-4b82-be7d-4929f2119788.mp3',
  7: 'lesson_535e51c2-f50b-42e4-8ae8-23611a13359f.mp3',
  8: 'lesson_627c57d4-e31b-4ac7-9be2-71bdcdea9603.mp3',
  9: 'lesson_18b91942-7d74-40e8-b322-5f4e228d7e71.mp3',
};

function fetchLessons() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'ypkpsosjkfrgenfcgjtq.supabase.co',
      path: '/rest/v1/lessons?select=id,order_index&order=order_index.asc',
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
  console.log('🔍 Lade neue Lektions-IDs aus Supabase...\n');
  const lessons = await fetchLessons();

  let updated = 0;
  for (const lesson of lessons) {
    const filename = ORDER_TO_FILENAME[lesson.order_index];
    if (!filename) continue; // Keine Audio-Datei für diese Lektion

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filename}`;
    await updateLessonAudioUrl(lesson.id, publicUrl);
    console.log(`✅ Lektion ${lesson.order_index} (${lesson.id}) → ${filename}`);
    updated++;
  }

  console.log(`\n🎉 Fertig! ${updated} Audio-URLs aktualisiert.`);
  console.log('📱 Die ersten 9 Lektionen haben jetzt echten Podcast!');
}

main().catch(console.error);
