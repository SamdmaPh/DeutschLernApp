/**
 * AI Conversation Service
 * Handles text-based conversations with the Railway backend.
 */

const BACKEND = "https://deutschlernappbackend2-production.up.railway.app";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  text: string;
  corrections?: { original: string; corrected: string; explanation: string }[];
}

export const AI = {
  /**
   * Send a message in a conversation context.
   * @param messages - conversation history
   * @param topic - the situation/topic for context
   * @param level - CEFR level (A1, A2, etc.)
   */
  async chat(messages: ChatMessage[], topic: string, level: string): Promise<ChatResponse> {
    try {
      const res = await fetch(`${BACKEND}/api/conversation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          topic,
          level,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      return {
        text: data.text || "...",
        corrections: data.corrections || [],
      };
    } catch (err: any) {
      return { text: `Verbindungsfehler: ${err.message}` };
    }
  },
};
