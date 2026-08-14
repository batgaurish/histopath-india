import React, { useState, useEffect, useMemo } from 'react';
import { Audio } from '../../utils/audio';
import { Check, Sparkles, Trophy } from 'lucide-react';

export default function MatchingGame({ pairs = [], onComplete, giveHintRef }) {
  const [leftSelected, setLeftSelected] = useState(null);
  const [rightSelected, setRightSelected] = useState(null);
  const [matched, setMatched] = useState([]);
  const [incorrectPair, setIncorrectPair] = useState(null);
  const [hintIndex, setHintIndex] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Stable shuffled right side: ONLY shuffle when pairs array changes structurally!
  const shuffledRight = useMemo(() => {
    return pairs.map((p, idx) => ({ ...p, origIdx: idx })).sort(() => Math.random() - 0.5);
  }, [pairs.length, pairs[0]?.image]);

  useEffect(() => {
    setMatched([]);
    setLeftSelected(null);
    setRightSelected(null);
    setIsCompleted(false);
  }, [pairs.length]);

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
      const newMatched = [...matched, leftIdx];
      setMatched(newMatched);
      setLeftSelected(null);
      setRightSelected(null);
      Audio.playCorrect();

      if (newMatched.length === pairs.length) {
        Audio.playStar();
        setIsCompleted(true);
      }
    } else {
      setIncorrectPair({ left: leftIdx, right: rightIdx });
      Audio.playWrong();
      setTimeout(() => {
        setLeftSelected(null);
        setRightSelected(null);
        setIncorrectPair(null);
      }, 700);
    }
  };

  const handleFinish = () => {
    if (onComplete) onComplete({ hintsUsed: 0, mistakes: 0 });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 relative">
      {/* Victory Celebration Modal */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 bg-[var(--surface-sunken)] backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-[var(--success)]/40 p-8 rounded-3xl max-w-md w-full flex flex-col items-center gap-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-[var(--success-soft)] border border-[var(--success)]/40 flex items-center justify-center text-[var(--success-ink)] text-3xl shadow-xl ">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-2xl text-gradient">
                Stage Completed!
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                All histological features correctly matched with Neville's pathology classifications!
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--gold-soft)] border border-[var(--gold)]/40 text-[var(--gold-ink)] font-bold text-sm">
              <Sparkles className="w-4 h-4" /> +300 EXP Earned
            </div>
            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-[var(--accent)] text-[var(--text-on-accent)] font-extrabold text-sm shadow-xl  cursor-pointer hover:scale-[1.02] transition-transform"
            >
              Proceed to Neville's MCQs Quiz →
            </button>
          </div>
        </div>
      )}

      {/* Interactive Matching Columns */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-start">
        {/* Left Column - Features */}
        <div className="flex flex-col gap-3">
          <div className="text-xs uppercase tracking-wider font-bold text-[var(--accent-ink)] text-center mb-1">
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
                className={`p-4 rounded-xl text-xs md:text-sm font-medium text-center border transition-all cursor-pointer min-h-[56px] flex items-center justify-between gap-2 relative ${
                  isMatched
                    ? 'bg-[var(--success-soft)] border-[var(--success)]/40 text-[var(--success-ink)] font-bold shadow-md opacity-75 cursor-default'
                    : isIncorrect
                    ? 'bg-[var(--danger-soft)] border-[var(--danger)]/40 text-[var(--danger-ink)] animate-bounce'
                    : isSelected
                    ? 'bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent-ink)] ring-2 ring-[var(--accent-border)] shadow-lg'
                    : isHinted
                    ? 'bg-[var(--gold-soft)] border-[var(--gold)]/40 text-[var(--gold-ink)] animate-pulse ring-2 ring-[var(--gold)]'
                    : 'glass-panel border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-2-border)] hover:bg-[var(--surface-sunken)]'
                }`}
              >
                <span className="text-left leading-snug">{pair.image}</span>
                {isMatched && (
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--success-soft)] border border-[var(--success)]/40 flex items-center justify-center text-[var(--success-ink)]">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Center Divider */}
        <div className="hidden md:flex flex-col items-center justify-center self-stretch my-6">
          <div className="w-px bg-[var(--surface-sunken)] h-full"></div>
        </div>

        {/* Right Column - Classifications */}
        <div className="flex flex-col gap-3">
          <div className="text-xs uppercase tracking-wider font-bold text-[var(--accent-2-ink)] text-center mb-1">
            Matching Classifications
          </div>
          {shuffledRight.map((item, idx) => {
            const isMatched = matched.includes(item.origIdx);
            const isSelected = rightSelected === item.origIdx;
            const isIncorrect = incorrectPair?.right === item.origIdx;
            const isHinted = hintIndex === item.origIdx;

            return (
              <button
                key={`right-${item.origIdx}`}
                onClick={() => handleSelectRight(item.origIdx)}
                disabled={isMatched}
                className={`p-4 rounded-xl text-xs md:text-sm font-medium text-center border transition-all cursor-pointer min-h-[56px] flex items-center justify-between gap-2 relative ${
                  isMatched
                    ? 'bg-[var(--success-soft)] border-[var(--success)]/40 text-[var(--success-ink)] font-bold shadow-md opacity-75 cursor-default'
                    : isIncorrect
                    ? 'bg-[var(--danger-soft)] border-[var(--danger)]/40 text-[var(--danger-ink)] animate-bounce'
                    : isSelected
                    ? 'bg-[var(--accent-2-soft)] border-[var(--accent-2-border)] text-[var(--accent-2-ink)] ring-2 ring-[var(--accent-2-border)] shadow-lg'
                    : isHinted
                    ? 'bg-[var(--gold-soft)] border-[var(--gold)]/40 text-[var(--gold-ink)] animate-pulse ring-2 ring-[var(--gold)]'
                    : 'glass-panel border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-2-border)] hover:bg-[var(--surface-sunken)]'
                }`}
              >
                <span className="text-left leading-snug">{item.label}</span>
                {isMatched && (
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--success-soft)] border border-[var(--success)]/40 flex items-center justify-center text-[var(--success-ink)]">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
