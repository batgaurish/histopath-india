import React, { useState, useEffect } from 'react';
import { Audio } from '../../utils/audio';

export default function MatchingGame({ pairs = [], onComplete, giveHintRef }) {
  const [leftSelected, setLeftSelected] = useState(null);
  const [rightSelected, setRightSelected] = useState(null);
  const [matched, setMatched] = useState([]);
  const [shuffledRight, setShuffledRight] = useState([]);
  const [incorrectPair, setIncorrectPair] = useState(null);
  const [hintIndex, setHintIndex] = useState(null);

  useEffect(() => {
    // Shuffle right side labels
    const right = pairs.map((p, idx) => ({ ...p, origIdx: idx })).sort(() => Math.random() - 0.5);
    setShuffledRight(right);
    setMatched([]);
    setLeftSelected(null);
    setRightSelected(null);
  }, [pairs]);

  // Handle Hint
  useEffect(() => {
    if (giveHintRef) {
      giveHintRef.current = () => {
        const unmatched = pairs.map((_, i) => i).filter(i => !matched.includes(i));
        if (unmatched.length > 0) {
          const hintIdx = unmatched[0];
          setHintIndex(hintIdx);
          Audio.playHint();
          setTimeout(() => setHintIndex(null), 2500);
        }
      };
    }
  }, [giveHintRef, matched, pairs]);

  const handleSelectLeft = (idx) => {
    if (matched.includes(idx)) return;
    Audio.playClick();
    setLeftSelected(idx);

    if (rightSelected !== null) {
      checkMatch(idx, rightSelected);
    }
  };

  const handleSelectRight = (origIdx) => {
    if (matched.includes(origIdx)) return;
    Audio.playClick();
    setRightSelected(origIdx);

    if (leftSelected !== null) {
      checkMatch(leftSelected, origIdx);
    }
  };

  const checkMatch = (leftIdx, rightIdx) => {
    if (leftIdx === rightIdx) {
      // Match!
      const newMatched = [...matched, leftIdx];
      setMatched(newMatched);
      setLeftSelected(null);
      setRightSelected(null);
      Audio.playCorrect();

      if (newMatched.length === pairs.length) {
        setTimeout(() => {
          if (onComplete) onComplete({ hintsUsed: 0, mistakes: 0 });
        }, 500);
      }
    } else {
      // Incorrect
      setIncorrectPair({ left: leftIdx, right: rightIdx });
      Audio.playWrong();
      setTimeout(() => {
        setLeftSelected(null);
        setRightSelected(null);
        setIncorrectPair(null);
      }, 700);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-start">
        {/* Left Column - Structures */}
        <div className="flex flex-col gap-3">
          <div className="text-xs uppercase tracking-wider font-semibold text-gray-400 text-center mb-1">
            Histological Features
          </div>
          {pairs.map((pair, idx) => {
            const isMatched = matched.includes(idx);
            const isSelected = leftSelected === idx;
            const isIncorrect = incorrectPair?.left === idx;
            const isHinted = hintIndex === idx;

            return (
              <button
                key={`left-${idx}`}
                onClick={() => handleSelectLeft(idx)}
                disabled={isMatched}
                className={`p-4 rounded-xl text-xs md:text-sm font-medium text-center border transition-all cursor-pointer min-h-[56px] flex items-center justify-center ${
                  isMatched
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 opacity-60 cursor-default'
                    : isIncorrect
                    ? 'bg-rose-950/50 border-rose-500 text-rose-300 animate-shake'
                    : isSelected
                    ? 'bg-teal-500/20 border-teal-400 text-teal-200 ring-2 ring-teal-400/40'
                    : isHinted
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 animate-pulse'
                    : 'glass-panel border-white/10 text-gray-200 hover:border-purple-500/50 hover:bg-white/5'
                }`}
              >
                {pair.image}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-white/10 self-stretch my-8"></div>

        {/* Right Column - Labels */}
        <div className="flex flex-col gap-3">
          <div className="text-xs uppercase tracking-wider font-semibold text-gray-400 text-center mb-1">
            Matching Classifications
          </div>
          {shuffledRight.map((item, idx) => {
            const isMatched = matched.includes(item.origIdx);
            const isSelected = rightSelected === item.origIdx;
            const isIncorrect = incorrectPair?.right === item.origIdx;
            const isHinted = hintIndex === item.origIdx;

            return (
              <button
                key={`right-${idx}`}
                onClick={() => handleSelectRight(item.origIdx)}
                disabled={isMatched}
                className={`p-4 rounded-xl text-xs md:text-sm font-medium text-center border transition-all cursor-pointer min-h-[56px] flex items-center justify-center ${
                  isMatched
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 opacity-60 cursor-default'
                    : isIncorrect
                    ? 'bg-rose-950/50 border-rose-500 text-rose-300 animate-shake'
                    : isSelected
                    ? 'bg-teal-500/20 border-teal-400 text-teal-200 ring-2 ring-teal-400/40'
                    : isHinted
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 animate-pulse'
                    : 'glass-panel border-white/10 text-gray-200 hover:border-purple-500/50 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
