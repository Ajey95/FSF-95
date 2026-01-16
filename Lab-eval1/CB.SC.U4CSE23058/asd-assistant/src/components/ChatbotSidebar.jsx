import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, WifiOff, Sparkles } from 'lucide-react';
import { fetchChatBotResponse } from '../services/geminiService';

export default function ChatbotSidebar({ isOpen, onClose, chatHistory }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I can summarize this chat or answer questions about it. What do you need?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Check if Cloud is Active
  const isCloudActive = !!import.meta.env.VITE_GEMINI_API_KEY;


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  useEffect(() => {
    if (isOpen && isCloudActive && messages.length === 1) {
      handleSend("Summarize this chat for me.");
    }
  }, [isOpen]);

  const handleSend = async (textOverride) => {
    const text = textOverride || input;
    if (!text.trim() || !isCloudActive) return;

    if (!textOverride) {
      setMessages(prev => [...prev, { role: 'user', text }]);
      setInput('');
    }

    setIsTyping(true);

    try {
      // Send entire chat history + question to AI
      const reply = await fetchChatBotResponse(chatHistory, text);
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "I cannot connect to the Cloud right now. Please check your internet or API Key." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-[350px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200 animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="h-[60px] bg-indigo-600 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-white">
          <Bot size={20} />
          <span className="font-bold">Chat Companion</span>
        </div>
        <button onClick={onClose} className="text-indigo-200 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Cloud Status Check */}
      {!isCloudActive && (
        <div className="bg-amber-50 p-4 border-b border-amber-100 flex gap-3">
          <WifiOff className="text-amber-500 shrink-0" />
          <p className="text-xs text-amber-800">
            <strong>Offline Mode:</strong> The Chatbot requires Cloud access to summarize conversations. Please check your API Key.
          </p>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none' 
                : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm flex gap-1">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75" />
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-indigo-500 focus-within:bg-white transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isCloudActive ? "Ask about the chat..." : "Chatbot disabled"}
            disabled={!isCloudActive}
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!isCloudActive || !input.trim()}
            className="text-indigo-600 disabled:text-gray-400 hover:scale-110 transition-transform"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}