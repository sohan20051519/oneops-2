
import { GoogleGenAI } from "@google/genai";

const API_KEY = (window as any).process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getAiErrorExplanation = async (error: string): Promise<string> => {
  const prompt = `
    As an expert DevOps engineer, explain the following deployment error in simple terms and suggest a concrete fix.
    The user is using a "Zero Config" deployment platform, so the fix should be something they can do in their code repository (e.g., editing a file).

    Error: "${error}"

    Structure your response as follows:
    1.  **What went wrong:** A brief, easy-to-understand explanation of the error.
    2.  **How to fix it:** A clear, step-by-step solution. Include code snippets if applicable.
    `;
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (err) {
    console.error("Error calling Gemini API:", err);
    return "Sorry, I couldn't analyze the error. Please check your API key and network connection.";
  }
};

export const getAiChatResponse = async (prompt: string): Promise<string> => {
   const systemInstruction = `You are "OneOps AI", a helpful assistant for a DevOps platform. Your goal is to help users manage their deployments.
   You can understand commands like "add a staging environment", "rollback to last version", "show me the logs for the e-commerce api".
   When a user gives a command, confirm the action you would take in a clear, friendly, and slightly enthusiastic tone. You cannot *actually* perform these actions, so you must simulate the response.
   For example, if the user says "Rollback to the last version", a good response would be: "You got it! Rolling back the 'E-commerce API' to the previous stable version (v1.2.3). This should only take a moment. I'll let you know once it's complete! ✨"
   If the user asks a question, answer it concisely.
   `;
  try {
     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction
        }
    });
    return response.text;
  } catch (err) {
    console.error("Error calling Gemini API:", err);
    return "I seem to be having some trouble connecting. Please try again in a bit.";
  }
};
