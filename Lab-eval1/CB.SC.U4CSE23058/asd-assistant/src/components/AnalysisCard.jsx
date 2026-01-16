import React, { useState } from 'react';
import { Smile, ShieldAlert, MessageSquare, Zap, WifiOff, Copy, Check } from 'lucide-react';
import SafetyAlert from './SafetyAlert';

export default function AnalysisCard({ analysis, loading }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-indigo-100 flex items-center gap-3">
        <Zap className="animate-spin text-indigo-500" size={20} />
        <span className="text-sm font-medium text-indigo-900">AI is interpreting intent...</span>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white ring-1 ring-black/5 overflow-hidden">
      
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-2 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SparklesIcon source={analysis.source} />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            {analysis.source.includes('Cloud') ? 'Cloud Intelligence' : 'Offline Mode'}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
          {analysis.emotion}
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Simplified Meaning */}
        <div>
          <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
            <MessageSquare size={12} /> True Meaning
          </h4>
          <p className="text-sm font-medium text-gray-800 leading-snug">
            {analysis.simplified}
          </p>
        </div>

        {/* Safety Warning */}
        <SafetyAlert reason={analysis.safety === 'Safe' ? null : analysis.safety} />

        {/* Quick Replies (Chips) */}
        <div>
          <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Suggested Replies</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.suggestions.map((reply, idx) => (
              <button
                key={idx}
                onClick={() => handleCopy(reply, idx)}
                className={`
                  text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5
                  ${copiedIndex === idx 
                    ? 'bg-green-100 border-green-200 text-green-700' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm'
                  }
                `}
              >
                {copiedIndex === idx ? <Check size={12} /> : null}
                {reply}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Small helper for the icon
const SparklesIcon = ({ source }) => {
  const isCloud = source.includes('Cloud');
  return isCloud 
    ? <Zap size={14} className="text-amber-500 fill-amber-500" /> 
    : <WifiOff size={14} className="text-gray-400" />;
};