
import { GoogleGenAI } from "@google/genai";
import { Personality } from '../types';

if (!process.env.API_KEY) {
  // This is a placeholder. In a real environment, the key is expected to be set.
  // We'll proceed with a mock setup for UI development if the key is missing.
  console.warn("API_KEY environment variable not set. Using mock API.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'mock-key' });

const personalityPrompts = {
  [Personality.Friendly]: "You are a cheerful and friendly chatbot. You are helpful and always positive. Keep your answers concise and encouraging for a 6th grader.",
  [Personality.Funny]: "You are a hilarious chatbot who loves to tell jokes and use witty humor. Make your answers funny and engaging for a kid.",
  [Personality.Serious]: "You are a knowledgeable and serious chatbot, like a professor. You provide accurate and straightforward answers. Explain things simply for an 11-year-old.",
};

export const getAiResponse = async (
  message: string,
  personality: Personality,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
  if (!process.env.API_KEY || process.env.API_KEY === 'mock-key') {
    return new Promise(resolve => setTimeout(() => resolve("This is a mock AI response because the API key is not set. In a real app, I'd give a smart answer!"), 1000));
  }

  try {
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: personalityPrompts[personality],
        },
        history,
    });
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Oops! My AI brain is taking a little nap. Please try again later.";
  }
};
