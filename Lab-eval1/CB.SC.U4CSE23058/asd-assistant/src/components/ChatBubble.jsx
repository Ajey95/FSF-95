import React, { useState } from 'react';
import { Sparkles, Check, X } from 'lucide-react';
import AnalysisCard from './AnalysisCard'; 

export default function ChatBubble({ message, analyzeFn }) {
  const isIncoming = message.type === 'incoming';
  
  // Local state for this specific bubble
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAnalyze = async () => {
    if (isOpen && analysis) {
      setIsOpen(false); 
      return;
    }
    
    setLoading(true);
    setIsOpen(true); 
    
    try {
      const result = await analyzeFn(message.text);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col ${isIncoming ? 'items-start' : 'items-end'} max-w-3xl mx-auto w-full group`}>
      
      {/* MESSAGE ROW */}
      <div className={`flex items-end gap-2 max-w-[85%] ${isIncoming ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* The Bubble */}
        <div 
          className={`relative p-3 shadow-sm text-[15px] leading-snug break-words
            ${isIncoming 
              ? 'bg-white rounded-lg rounded-tl-none text-gray-900' 
              : 'bg-[#d9fdd3] rounded-lg rounded-tr-none text-gray-900'
            }`}
        >
          <p>{message.text}</p>
          <div className="flex justify-end items-center gap-1 mt-1 opacity-60 select-none">
            <span className="text-[11px] font-medium min-w-[50px] text-right">{message.timestamp}</span>
            {!isIncoming && <Check size={14} className="text-blue-500" />}
          </div>
        </div>

        
        {isIncoming && (
          <button 
            onClick={handleAnalyze}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
              ${isOpen 
                ? 'bg-gray-200 text-gray-600 rotate-90' 
                : 'bg-white text-indigo-600 hover:bg-indigo-50 hover:scale-110 opacity-0 group-hover:opacity-100'
              }
            `}
            title="AI Analysis"
          >
            {isOpen ? <X size={16} /> : <Sparkles size={16} />}
          </button>
        )}
      </div>

      
      {isIncoming && isOpen && (
        <div className="mt-2 ml-2 max-w-[85%] w-[400px] animate-in fade-in slide-in-from-top-2 duration-300 z-20 origin-top-left">
          <AnalysisCard analysis={analysis} loading={loading} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}