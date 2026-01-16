/**
 * Formats a raw date object or ISO string into "HH:MM AM/PM"
 */
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  // Check if valid date, else return original string (for mock data)
  if (isNaN(date.getTime())) return dateString; 
  
  return date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

/**
 * Removes Markdown code blocks if the AI accidentally adds them.
 */
export const cleanAiResponse = (text) => {
  if (!text) return "";
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
};