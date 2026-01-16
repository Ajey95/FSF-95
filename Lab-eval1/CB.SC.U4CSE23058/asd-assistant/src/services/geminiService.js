import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const fetchGeminiAnalysis = async (text) => {

  console.log("🔑 Debug: Checking API Key...");
  if (!API_KEY) {
    console.error("❌ Error: API Key is MISSING or undefined.");
    throw new Error("API Key missing");
  } else {
    console.log("✅ Debug: API Key is present (Ends with):", API_KEY.slice(-4));
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    console.log("📡 Debug: Sending request to Gemini...");
    
    const prompt = `
      You are an assistant for an Autistic user. Analyze this text: "${text}".
      Return a valid JSON object strictly with these keys:
      {
        "emotion": "One word (e.g., Happy, Sarcastic, Angry, Neutral)",
        "simplified": "A literal, simple explanation of the meaning.",
        "suggestions": ["Reply 1", "Reply 2", "Reply 3"],
        "safety": "Safe" or "Unsafe (Reason)"
      }
      Do not use Markdown. Return JSON only.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    console.log("✅ Debug: Received Response:", textResponse);

    const cleanedText = textResponse.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedText);

  } catch (error) {
    
    console.error("❌ CRITICAL GEMINI ERROR:", error);
    throw error; 
  }
};
export const fetchChatBotResponse = async (history, userQuery) => {
  if (!API_KEY) throw new Error("Offline");

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  // Format chat history for the AI
  const context = history.map(m => `[${m.sender}]: ${m.text}`).join("\n");

  const prompt = `
    Context: The following is a chat history on WhatsApp:
    ${context}

    User Question: "${userQuery}"

    Instructions:
    1. If the user asks for a summary, briefly explain what is happening in the chat.
    2. Answer questions based ONLY on the provided chat history.
    3. Be helpful and calm.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
};