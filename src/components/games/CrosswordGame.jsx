import React, { useState, useEffect } from 'react';
import { Audio } from '../../utils/audio';

export default function CrosswordGame({ puzzleData, onComplete, giveHintRef }) {
  const words = puzzleData?.words || [
    { word: 'ENAMEL', clue: 'Hardest calcified tissue in human body', row: 1, col: 1, direction: 'across' },
    { word: 'DENTIN', clue: 'Main body of the tooth surrounding pulp', row: 1, col: 1, direction: 'down' },
    { word: 'PULP', clue: 'Vascular and nerve central soft tissue', row: 4, col: 1, direction: 'across' }
  ];

  const gridSize = 8;
  const [grid, setGrid] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [userLetters, setUserLetters] = useState({});
  const [revealedCells, setRevealedCells] = useState({});

  useEffect(() => {
    // Build initial grid template from words
    const initialLetters = {};
    words.forEach((w) => {
      const chars = w.word.toUpperCase().split('');
      chars.forEach((char, idx) => {
        const r = w.direction === 'across' ? w.row : w.row + idx;
        const c = w.direction === 'across' ? w.col + idx : w.col;
        const key = `${r}-${c}`;
        initialLetters[key] = { char, number: idx === 0 ? w.number || 1 : null };
      });
    });

    setGrid(initialLetters);
    setUserLetters({});
    setRevealedCells({});
  }, [puzzleData]);

  // Hint handling
  useEffect(() => {
    if (giveHintRef) {
      giveHintRef.current = () => {
        const unrevealedKeys = Object.keys(grid).filter(key => !revealedCells[key] && userLetters[key] !== grid[key].char);
        if (unrevealedKeys.length > 0) {
          const hintKey = unrevealedKeys[0];
          setRevealedCells(prev => ({ ...prev, [hintKey]: true }));
          setUserLetters(prev => ({ ...prev, [hintKey]: grid[hintKey].char }));
          Audio.playHint();
        }
      };
    }
  }, [giveHintRef, grid, revealedCells, userLetters]);

  const handleCellClick = (r, c) => {
    const key = `${r}-${c}`;
    if (!grid[key]) return;
    Audio.playClick();
    setSelectedCell({ r, c });
  };

  const handleKeyPress = (letter) => {
    if (!selectedCell) return;
    const key = `${selectedCell.r}-${selectedCell.c}`;
    if (!grid[key]) return;

    Audio.playClick();
    const newUserLetters = { ...userLetters, [key]: letter.toUpperCase() };
    setUserLetters(newUserLetters);

    // Check completion
    let allCorrect = true;
    Object.keys(grid).forEach((gridKey) => {
      if (newUserLetters[gridKey] !== grid[gridKey].char && !revealedCells[gridKey]) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      Audio.playCorrect();
      setTimeout(() => {
        if (onComplete) onComplete({ hintsUsed: 0, mistakes: 0 });
      }, 500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-6 items-start">
      {/* Grid Canvas Area */}
      <div className="flex-1 w-full flex flex-col items-center gap-4">
        <div 
          className="grid gap-1 p-3 glass-panel border border-white/10 rounded-2xl w-full max-w-[360px] md:max-w-[420px] aspect-square"
          style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, idx) => {
            const r = Math.floor(idx / gridSize);
            const c = idx % gridSize;
            const key = `${r}-${c}`;
            const cellData = grid[key];
            const isSelected = selectedCell?.r === r && selectedCell?.c === c;
            const userChar = userLetters[key] || '';
            const isRevealed = revealedCells[key];

            if (!cellData) {
              return (
                <div key={key} className="bg-slate-950/80 rounded-lg aspect-square" />
              );
            }

            return (
              <button
                key={key}
                onClick={() => handleCellClick(r, c)}
                className={`aspect-square rounded-lg border flex flex-col items-center justify-center relative font-bold text-sm md:text-base cursor-pointer transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-amber-400/20 text-white ring-2 ring-amber-400/40'
                    : isRevealed
                    ? 'border-emerald-500/80 bg-emerald-950/60 text-emerald-300'
                    : userChar
                    ? 'border-teal-400/60 bg-teal-950/40 text-teal-200'
                    : 'border-white/20 bg-slate-900/90 text-white hover:border-teal-400/40'
                }`}
              >
                {cellData.number && (
                  <span className="absolute top-0.5 left-1 text-[9px] text-gray-400 font-semibold">
                    {cellData.number}
                  </span>
                )}
                <span>{isRevealed ? cellData.char : userChar}</span>
              </button>
            );
          })}
        </div>

        {/* On-Screen Touch Keyboard for Phone Browsers */}
        <div className="w-full max-w-[360px] md:max-w-[420px] flex flex-col gap-1.5 glass-panel p-2.5 rounded-xl border border-white/10">
          <div className="text-[10px] uppercase font-semibold text-gray-400 text-center mb-0.5">
            Touch Keyboard (Tap cell, then tap letter)
          </div>
          <div className="grid grid-cols-10 gap-1 text-center">
            {['Q','W','E','R','T','Y','U','I','O','P'].map(l => (
              <button key={l} onClick={() => handleKeyPress(l)} className="p-2 rounded bg-slate-800 hover:bg-teal-600 text-xs font-bold border border-white/10 active:scale-95 transition-transform">{l}</button>
            ))}
          </div>
          <div className="grid grid-cols-9 gap-1 text-center px-2">
            {['A','S','D','F','G','H','J','K','L'].map(l => (
              <button key={l} onClick={() => handleKeyPress(l)} className="p-2 rounded bg-slate-800 hover:bg-teal-600 text-xs font-bold border border-white/10 active:scale-95 transition-transform">{l}</button>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center px-6">
            {['Z','X','C','V','B','N','M'].map(l => (
              <button key={l} onClick={() => handleKeyPress(l)} className="p-2 rounded bg-slate-800 hover:bg-teal-600 text-xs font-bold border border-white/10 active:scale-95 transition-transform">{l}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Clues Column */}
      <div className="w-full md:w-72 glass-panel border border-white/10 p-4 rounded-2xl flex flex-col gap-4">
        <h3 className="font-heading font-bold text-sm text-teal-400 uppercase tracking-wider">
          Crossword Clues
        </h3>

        <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
          {words.map((w, idx) => (
            <div 
              key={`clue-${idx}`}
              onClick={() => handleCellClick(w.row, w.col)}
              className="p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-teal-400/40 cursor-pointer transition-all text-xs"
            >
              <div className="font-bold text-amber-300 mb-0.5">
                {w.direction.toUpperCase()} ({w.row}, {w.col})
              </div>
              <div className="text-gray-300">{w.clue}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
