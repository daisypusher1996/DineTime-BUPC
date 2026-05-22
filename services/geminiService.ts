
import { GoogleGenAI } from "@google/genai";
import { MenuItem, Stall } from '../types';

const generateSystemInstruction = (menuItems: MenuItem[], stalls: Stall[]) => `
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

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[],
  menuItems: MenuItem[],
  stalls: Stall[]
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({
          role: h.role,
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: generateSystemInstruction(menuItems, stalls),
      },
    });

    return response.text || "I'm having trouble processing that right now. Try again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I seem to be having connection issues. Please check your internet or try again later.";
  }
};

export const getSmartRecommendation = async (userPreferences: string, menuItems: MenuItem[]): Promise<string> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Menu: ${JSON.stringify(menuItems.map(i => i.name))}. User likes: ${userPreferences}. Recommend one item name.`,
            config: {
                systemInstruction: "You are a recommendation engine. Based on the user's past history or preferences, suggest one specific meal from the menu provided previously. Return ONLY the name of the meal item.",
            },
        });
        return response.text?.trim() || "";
    } catch (e) {
        return "";
    }
}
