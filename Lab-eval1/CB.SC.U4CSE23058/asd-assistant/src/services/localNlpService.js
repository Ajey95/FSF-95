import Sentiment from 'sentiment';
import nlp from 'compromise';

export const analyzeLocally = (text) => {
  console.log("⚠️ Switching to Local NLP Mode...");
  
  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);
  const doc = nlp(text);

  // 1. Simple Logic for Emotion
  let emotion = 'Neutral';
  if (result.score > 0) emotion = 'Happy / Positive';
  if (result.score < 0) emotion = 'Sad / Negative';
  if (text.includes('?')) emotion = 'Curious';

  // 2. Simple Logic for Safety
  const unsafeKeywords = ['password', 'credit card', 'kill', 'stupid', 'hate', 'money'];
  const isUnsafe = unsafeKeywords.some(word => text.toLowerCase().includes(word));
  
  // 3. Return Structure MATCHING Gemini
  return {
    emotion: emotion,
    simplified: `Literal meaning: "${text}" (Topics: ${doc.topics().text() || 'General'})`,
    suggestions: [
      "Okay, noted.", 
      "Can you explain?", 
      "I will get back to you."
    ],
    safety: isUnsafe ? "Potential Risk Detected (Keyword Match)" : "Safe"
  };
};