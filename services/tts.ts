/**
 * Text-to-Speech Service
 * Uses the Railway backend /api/speak endpoint.
 */

const BACKEND = "https://deutschlernappbackend2-production.up.railway.app";

export const TTS = {
  /**
   * Get audio URL for a German text.
   * Returns a base64 audio string or null on error.
   */
  async speak(text: string): Promise<string | null> {
    try {
      const res = await fetch(`${BACKEND}/api/speak`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language: "de" }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.audio || null;
    } catch {
      return null;
    }
  },
};
