
import { MenuItem, Stall } from '../types';

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[],
  menuItems: MenuItem[],
  stalls: Stall[]
): Promise<string> => {
  try {
    const response = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history, menuItems, stalls }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data.text || "I'm having trouble processing that right now. Try again?";
  } catch (error) {
    console.error("Gemini Client Service Error:", error);
    return "Sorry, I seem to be having connection issues. Please check your internet or try again later.";
  }
};

export const getSmartRecommendation = async (userPreferences: string, menuItems: MenuItem[]): Promise<string> => {
  try {
    const response = await fetch('/api/gemini/recommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userPreferences, menuItems }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data.text || "";
  } catch (e) {
    console.error("Gemini Recommendation Client Error:", e);
    return "";
  }
};

