import React, { useState, useEffect, useRef } from 'react';
import { Audio } from '../../utils/audio';
import { CheckCircle2 } from 'lucide-react';

export default function DifferencesGame({ differences = [], onComplete, giveHintRef }) {
  const [found, setFound] = useState([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintCoords, setHintCoords] = useState(null);
  const totalDiffs = differences.length || 5;

  // Preset difference coordinates (x%, y%)
  const defaultDiffs = [
    { x: 25, y: 30, label: 'Altered Cell Nucleus' },
    { x: 70, y: 25, label: 'Missing Capillary Loop' },
    { x: 45, y: 65, label: 'Changed Collagen Density' },
    { x: 80, y: 75, label: 'Ectopic Granule Deposit' },
    { x: 20, y: 80, label: 'Modified Rete Peg Depth' },
  ];

  const activeDiffs = differences.length > 0 ? differences.map((d, i) => ({
    x: defaultDiffs[i % 5].x,
    y: defaultDiffs[i % 5].y,
    label: typeof d === 'string' ? d : `Difference ${i + 1}`,
  })) : defaultDiffs;

  useEffect(() => {
    setFound([]);
  }, [differences]);

  // Hint handling
  useEffect(() => {
    if (giveHintRef) {
      giveHintRef.current = () => {
        const unfoundIndices = activeDiffs.map((_, i) => i).filter(i => !found.includes(i));
        if (unfoundIndices.length > 0) {
          const hintIdx = unfoundIndices[0];
          setHintCoords(activeDiffs[hintIdx]);
          setHintsUsed(prev => prev + 1);
          Audio.playHint();
          setTimeout(() => setHintCoords(null), 2500);
        }
      };
    }
  }, [giveHintRef, found, activeDiffs]);

  const handleImageClick = (e, isRightImage) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Check proximity to any unfound difference
    let foundIndex = -1;
    activeDiffs.forEach((diff, idx) => {
      if (found.includes(idx)) return;
      const distX = Math.abs(clickX - diff.x);
      const distY = Math.abs(clickY - diff.y);
      if (distX < 12 && distY < 12) {
        foundIndex = idx;
      }
    });

    if (foundIndex !== -1) {
      // Correct!
      const newFound = [...found, foundIndex];
      setFound(newFound);
      Audio.playCorrect();

      if (newFound.length === activeDiffs.length) {
        setTimeout(() => {
          if (onComplete) onComplete({ hintsUsed, mistakes: 0 });
        }, 500);
      }
    } else {
      Audio.playWrong();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center gap-6">
      {/* Score bar */}
      <div className="flex items-center justify-between w-full glass-panel px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] text-sm">
        <span className="font-semibold text-[var(--text-secondary)]">Spot 5 Microscopic Differences</span>
        <span className="font-bold text-[var(--accent-ink)]">Found: {found.length} / {activeDiffs.length}</span>
      </div>

      {/* Side-by-side Image Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Left Image (Normal Tissue) */}
        <div className="flex flex-col gap-2">
          <div className="text-xs uppercase tracking-wider font-semibold text-[var(--text-muted)] text-center">
            Normal Tissue Specimen
          </div>
          <div 
            onClick={(e) => handleImageClick(e, false)}
            className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-sunken)] cursor-crosshair shadow-lg select-none"
          >
            {/* SVG Histology Illustration */}
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <defs>
                <linearGradient id="bgNorm" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F0D8E0" />
                  <stop offset="100%" stopColor="#E0C0D0" />
                </linearGradient>
              </defs>
              <rect width="400" height="300" fill="url(#bgNorm)" />

              {/* Fibers */}
              <path d="M 20 50 Q 150 20 300 80" stroke="#B47896" strokeWidth="2" opacity="0.3" fill="none" />
              <path d="M 50 180 Q 200 220 350 150" stroke="#B47896" strokeWidth="2" opacity="0.3" fill="none" />

              {/* Cells */}
              <circle cx="100" cy="90" r="16" fill="#E8C8D4" stroke="#A05078" strokeWidth="1.5" />
              <circle cx="100" cy="90" r="6" fill="#803050" />

              <circle cx="280" cy="75" r="18" fill="#E8C8D4" stroke="#A05078" strokeWidth="1.5" />
              <circle cx="280" cy="75" r="7" fill="#803050" />

              <circle cx="180" cy="195" r="15" fill="#E8C8D4" stroke="#A05078" strokeWidth="1.5" />
              <circle cx="180" cy="195" r="5" fill="#803050" />

              <circle cx="320" cy="225" r="17" fill="#E8C8D4" stroke="#A05078" strokeWidth="1.5" />
              <circle cx="320" cy="225" r="6" fill="#803050" />

              <circle cx="80" cy="240" r="14" fill="#E8C8D4" stroke="#A05078" strokeWidth="1.5" />
              <circle cx="80" cy="240" r="5" fill="#803050" />

              {/* Blood Vessel */}
              <path d="M 0 140 Q 200 120 400 160" stroke="#C83C50" strokeWidth="12" opacity="0.4" fill="none" />
            </svg>

            {/* Found Markers */}
            {found.map((diffIdx) => {
              const diff = activeDiffs[diffIdx];
              return (
                <div 
                  key={`left-found-${diffIdx}`}
                  className="absolute w-8 h-8 rounded-full border-2 border-[var(--success)]/40 bg-[var(--success-soft)] shadow-lg  -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center text-[var(--success-ink)] font-bold text-xs"
                  style={{ left: `${diff.x}%`, top: `${diff.y}%` }}
                >
                  ✓
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Image (Pathological Specimen with Differences) */}
        <div className="flex flex-col gap-2">
          <div className="text-xs uppercase tracking-wider font-semibold text-[var(--text-muted)] text-center">
            Modified / Altered Specimen
          </div>
          <div 
            onClick={(e) => handleImageClick(e, true)}
            className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-sunken)] cursor-crosshair shadow-lg select-none"
          >
            {/* SVG Histology Illustration with 5 variations */}
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <rect width="400" height="300" fill="url(#bgNorm)" />

              <path d="M 20 50 Q 150 20 300 80" stroke="#B47896" strokeWidth="2" opacity="0.3" fill="none" />
              <path d="M 50 180 Q 200 220 350 150" stroke="#B47896" strokeWidth="2" opacity="0.3" fill="none" />

              {/* Diff 1: Cell nucleus modified */}
              <circle cx="100" cy="90" r="16" fill="#80A0E0" stroke="#305090" strokeWidth="1.5" />
              <circle cx="100" cy="90" r="10" fill="#103060" />

              {/* Diff 2: Missing capillary loop */}
              <circle cx="280" cy="75" r="10" fill="#E8C8D4" stroke="#A05078" strokeWidth="1" />

              {/* Diff 3: Extra Granule */}
              <circle cx="180" cy="195" r="15" fill="#E8C8D4" stroke="#A05078" strokeWidth="1.5" />
              <circle cx="180" cy="195" r="5" fill="#FFD700" />

              {/* Diff 4: Altered Cell size */}
              <circle cx="320" cy="225" r="24" fill="#E8C8D4" stroke="#A05078" strokeWidth="2" />
              <circle cx="320" cy="225" r="8" fill="#803050" />

              {/* Diff 5: Modified Rete Peg / Cell shape */}
              <rect x="70" y="230" width="20" height="20" rx="4" fill="#D4A0BC" stroke="#A05078" />

              <path d="M 0 140 Q 200 120 400 160" stroke="#C83C50" strokeWidth="12" opacity="0.4" fill="none" />
            </svg>

            {/* Found Markers */}
            {found.map((diffIdx) => {
              const diff = activeDiffs[diffIdx];
              return (
                <div 
                  key={`right-found-${diffIdx}`}
                  className="absolute w-8 h-8 rounded-full border-2 border-[var(--success)]/40 bg-[var(--success-soft)] shadow-lg  -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center text-[var(--success-ink)] font-bold text-xs"
                  style={{ left: `${diff.x}%`, top: `${diff.y}%` }}
                >
                  ✓
                </div>
              );
            })}

            {/* Hint Marker */}
            {hintCoords && (
              <div 
                className="absolute w-12 h-12 rounded-full border-2 border-[var(--gold)]/40 shadow-xl shadow-amber-500/60 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-ping"
                style={{ left: `${hintCoords.x}%`, top: `${hintCoords.y}%` }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
