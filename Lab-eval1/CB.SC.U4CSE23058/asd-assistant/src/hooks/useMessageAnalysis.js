import { useState } from 'react';
import { fetchGeminiAnalysis } from '../services/geminiService';
import { analyzeLocally } from '../services/localNlpService';

export function useMessageAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeMessage = async (text) => {
    setLoading(true);
    setError(null);
    let result = null;
    let source = '';

    try {
      // 1. Try Google Gemini First
      result = await fetchGeminiAnalysis(text);
      source = 'Gemini AI (Cloud) ☁️';
    } catch (err) {
      console.warn("Gemini Failed, switching to Local NLP...", err);
      // 2. Fallback to Local NLP if API fails
      result = analyzeLocally(text);
      source = 'Local NLP (Offline) 💻';
      setError("Network issue. Switched to offline mode.");
    } finally {
      setLoading(false);
    }

    return { ...result, source };
  };

  return { analyzeMessage, loading, error };
}