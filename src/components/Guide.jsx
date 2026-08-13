import React, { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

export default function Guide({ message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) setVisible(true);
  }, [message]);

  if (!visible || !message) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 max-w-xs md:max-w-sm flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="relative glass-panel bg-slate-900/95 border border-teal-500/30 p-4 rounded-2xl shadow-2xl text-xs md:text-sm text-gray-200 leading-relaxed">
        <button 
          onClick={() => { setVisible(false); if (onClose) onClose(); }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 border border-gray-700 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2 mb-1.5 font-heading font-bold text-teal-400">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Dantika (Histology Guide)</span>
        </div>

        <p>{message}</p>
      </div>

      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-400 to-purple-600 p-0.5 shadow-lg shadow-teal-500/30 flex items-center justify-center text-xl cursor-pointer hover:scale-110 transition-transform">
        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
          🦷
        </div>
      </div>
    </div>
  );
}
