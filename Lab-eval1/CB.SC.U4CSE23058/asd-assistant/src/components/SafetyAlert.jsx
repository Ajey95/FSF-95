import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function SafetyAlert({ reason }) {
  if (!reason || reason === 'Safe') return null;

  return (
    <div className="relative overflow-hidden bg-red-50 p-5 rounded-2xl border border-red-100 shadow-sm animate-pulse-slow">
      
      <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-red-100 rounded-full opacity-50 blur-xl"></div>

      <div className="relative z-10">
        <h3 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-2">
          <ShieldAlert size={16} /> Safety Warning
        </h3>
        <p className="text-red-900 text-sm font-medium leading-relaxed">
          {reason}
        </p>
      </div>
    </div>
  );
}