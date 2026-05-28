import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const generateSystemInstruction = (menuItems: any[], stalls: any[]) => `
You are "DineBot", the intelligent food assistant for DineTime at Bicol University Polangui Campus (BUPC).
Your goal is to help students and staff find food, recommend meals based on preferences, and answer questions about the menu.

Context Data:
Menu Items: ${JSON.stringify(menuItems.map(i => `${i.name} (${i.category}) - ₱${i.price} at ${i.stallName}. Attributes: ${i.isSpicy ? 'Spicy' : ''} ${i.isVeg ? 'Vegetarian' : ''}`))}
Stalls: ${JSON.stringify(stalls.map(s => s.name))}

Guidelines:
1. Be friendly, concise, and helpful.
2. Use Bicolano friendly tone occasionally if appropriate (like "Oragon!").
3. When recommending, suggest specific items from the provided menu.
4. If asked about prices, be accurate based on the data.
5. Emphasize the BUPC spirit (Blue & Orange).
6. Keep responses relatively short suitable for a chat interface.
`;

async function main() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Safe API Key retrieval (Lazy check when API is consumed)
  const getApiKey = () => {
    return process.env.GEMINI_API_KEY || process.env.API_KEY;
  };

  // Endpoint for chatbot interactions
  app.post("/api/gemini/chat", async (req, res) => {
    const { message, history, menuItems, stalls } = req.body;
    const apiKey = getApiKey();

    if (!apiKey) {
      return res.json({ text: "Hey there! Please configure your GEMINI_API_KEY under Settings > Secrets to enable DineBot AI assistance!" });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      // Prepare contents with user message and past history
      const contents = [
        ...(history || []).map((h: any) => ({
          role: h.role === "model" ? "model" : "user",
          parts: [{ text: h.text || h.message || "" }]
        })),
        { role: "user", parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: generateSystemInstruction(menuItems || [], stalls || []),
        },
      });

      const replyText = response.text || "I was unable to formulate a response. Let me try again!";
      res.json({ text: replyText });
    } catch (error: any) {
      console.error("Gemini Backend Chat Error:", error);
      res.json({ text: "I encountered an issue connecting to my cognitive hub. Please verify your GEMINI_API_KEY or network connection!" });
    }
  });

  // Endpoint for smart dish recommendation
  app.post("/api/gemini/recommendation", async (req, res) => {
    const { userPreferences, menuItems } = req.body;
    const apiKey = getApiKey();

    if (!apiKey) {
      return res.json({ text: "" });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Menu: ${JSON.stringify((menuItems || []).map((i: any) => i.name))}. User likes: ${userPreferences}. Recommend one item name.`,
        config: {
          systemInstruction: "You are a recommendation engine. Based on the user's past history or preferences, suggest one specific meal from the menu provided previously. Return ONLY the name of the meal item.",
        },
      });

      res.json({ text: response.text?.trim() || "" });
    } catch (error) {
      console.error("Gemini Recommendation Error:", error);
      res.json({ text: "" });
    }
  });

  // Serve Frontend with Vite middleware or static files
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[DineTime Server] Full-Stack Server running at http://0.0.0.0:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start DineTime backend server:", err);
});
