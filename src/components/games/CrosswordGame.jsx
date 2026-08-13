import React, { useState, useEffect } from 'react';
import { Audio } from '../../utils/audio';
import { Check, Sparkles, Trophy, Delete } from 'lucide-react';

export default function CrosswordGame({ puzzleData, onComplete, giveHintRef }) {
  const rawWords = puzzleData?.words || [
    { word: 'ENAMEL', clue: 'Hardest calcified tissue in human body' },
    { word: 'DENTIN', clue: 'Main body of the tooth surrounding pulp' },
    { word: 'PULP', clue: 'Vascular and nerve central soft tissue' },
  ];

  const gridSize = 10;
  const [words, setWords] = useState([]);
  const [grid, setGrid] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedWordNum, setSelectedWordNum] = useState(1);
  const [userLetters, setUserLetters] = useState({});
  const [revealedCells, setRevealedCells] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const processedWords = [];

    rawWords.forEach((item, i) => {
      const cleanWord = (item.word || '').toUpperCase().trim();
      if (!cleanWord) return;

      let direction = (item.direction || (i % 2 === 0 ? 'across' : 'down')).toLowerCase();
      let row = item.row !== undefined ? item.row : Math.min(i * 2, gridSize - 1);
      let col = item.col !== undefined ? item.col : 0;

      if (direction === 'across') {
        if (col + cleanWord.length > gridSize) {
          col = Math.max(0, gridSize - cleanWord.length);
        }
      } else {
        if (row + cleanWord.length > gridSize) {
          row = Math.max(0, gridSize - cleanWord.length);
        }
      }

      processedWords.push({
        number: i + 1,
        word: cleanWord,
        clue: item.clue || 'Histology terminology',
        row,
        col,
        direction,
      });
    });

    setWords(processedWords);

    const initialGrid = {};
    processedWords.forEach((w) => {
      const chars = w.word.split('');
      chars.forEach((char, idx) => {
        const r = w.direction === 'across' ? w.row : w.row + idx;
        const c = w.direction === 'across' ? w.col + idx : w.col;
        if (r < gridSize && c < gridSize) {
          const key = `${r}-${c}`;
          if (!initialGrid[key]) {
            initialGrid[key] = { char, number: idx === 0 ? w.number : null, wordNums: [w.number] };
          } else {
            if (idx === 0) initialGrid[key].number = w.number;
            initialGrid[key].wordNums.push(w.number);
          }
        }
      });
    });

    setGrid(initialGrid);
    setUserLetters({});
    setRevealedCells({});
    setIsCompleted(false);

    if (processedWords.length > 0) {
      setSelectedCell({ r: processedWords[0].row, c: processedWords[0].col });
      setSelectedWordNum(1);
    }
  }, [puzzleData]);

  useEffect(() => {
    if (giveHintRef) {
      giveHintRef.current = () => {
        const unrevealedKeys = Object.keys(grid).filter(
          key => !revealedCells[key] && userLetters[key] !== grid[key].char
        );
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

    const matchingWord = words.find(w => w.number === grid[key].wordNums[0]);
    if (matchingWord) setSelectedWordNum(matchingWord.number);
  };

  const handleClueClick = (w) => {
    Audio.playClick();
    setSelectedWordNum(w.number);
    setSelectedCell({ r: w.row, c: w.col });
  };

  const handleKeyPress = (letter) => {
    if (!selectedCell) return;
    const key = `${selectedCell.r}-${selectedCell.c}`;
    if (!grid[key]) return;

    Audio.playClick();
    const newUserLetters = { ...userLetters, [key]: letter.toUpperCase() };
    setUserLetters(newUserLetters);

    // Advance selection to next grid cell in active word direction
    const activeWord = words.find(w => w.number === selectedWordNum);
    if (activeWord) {
      const nextR = activeWord.direction === 'across' ? selectedCell.r : selectedCell.r + 1;
      const nextC = activeWord.direction === 'across' ? selectedCell.c + 1 : selectedCell.c;
      const nextKey = `${nextR}-${nextC}`;
      if (grid[nextKey]) {
        setSelectedCell({ r: nextR, c: nextC });
      }
    }

    // Check completion
    let allCorrect = true;
    Object.keys(grid).forEach((gridKey) => {
      if (newUserLetters[gridKey] !== grid[gridKey].char && !revealedCells[gridKey]) {
        allCorrect = false;
      }
    });

    if (allCorrect && Object.keys(grid).length > 0) {
      Audio.playStar();
      setIsCompleted(true);
    }
  };

  const handleBackspace = () => {
    if (!selectedCell) return;
    const key = `${selectedCell.r}-${selectedCell.c}`;
    setUserLetters(prev => ({ ...prev, [key]: '' }));

    const activeWord = words.find(w => w.number === selectedWordNum);
    if (activeWord) {
      const prevR = activeWord.direction === 'across' ? selectedCell.r : selectedCell.r - 1;
      const prevC = activeWord.direction === 'across' ? selectedCell.c - 1 : selectedCell.c;
      const prevKey = `${prevR}-${prevC}`;
      if (grid[prevKey]) {
        setSelectedCell({ r: prevR, c: prevC });
      }
    }
  };

  const handleFinish = () => {
    if (onComplete) onComplete({ hintsUsed: 0, mistakes: 0 });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex flex-col lg:flex-row gap-6 items-start relative">
      {/* Victory Modal */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-emerald-500/40 p-8 rounded-3xl max-w-md w-full flex flex-col items-center gap-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 text-3xl shadow-xl shadow-emerald-500/30">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-2xl text-gradient">
                Crossword Solved!
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                All pathology terms correctly identified and filled!
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-sm">
              <Sparkles className="w-4 h-4" /> +300 EXP Earned
            </div>
            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-purple-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/20 cursor-pointer hover:scale-[1.02] transition-transform"
            >
              Proceed to Shafer's MCQs Quiz →
            </button>
          </div>
        </div>
      )}

      {/* Grid & Touch Keyboard */}
      <div className="flex-1 w-full flex flex-col items-center gap-4">
        {/* Crossword Grid */}
        <div 
          className="grid gap-1 p-3 glass-panel border border-white/10 rounded-2xl w-full max-w-[380px] md:max-w-[440px] aspect-square"
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
                <div key={key} className="bg-slate-950/90 rounded-md aspect-square" />
              );
            }

            return (
              <button
                key={key}
                onClick={() => handleCellClick(r, c)}
                className={`aspect-square rounded-md border flex flex-col items-center justify-center relative font-extrabold text-sm md:text-base cursor-pointer transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-amber-400/30 text-white ring-2 ring-amber-400/60 shadow-lg scale-105 z-10'
                    : isRevealed
                    ? 'border-emerald-500/80 bg-emerald-950/60 text-emerald-300'
                    : userChar
                    ? 'border-teal-400/80 bg-teal-950/60 text-teal-200'
                    : 'border-white/20 bg-slate-900/90 text-white hover:border-teal-400/60'
                }`}
              >
                {cellData.number && (
                  <span className="absolute top-0.5 left-1 text-[8px] md:text-[9px] text-amber-300 font-bold leading-none">
                    {cellData.number}
                  </span>
                )}
                <span className="mt-1">{isRevealed ? cellData.char : userChar}</span>
              </button>
            );
          })}
        </div>

        {/* Touch Keyboard */}
        <div className="w-full max-w-[380px] md:max-w-[440px] flex flex-col gap-1.5 glass-panel p-2.5 rounded-xl border border-white/10">
          <div className="text-[10px] uppercase font-semibold text-gray-400 text-center mb-0.5">
            Touch Keyboard (Tap cell above or clue on right, then type letter)
          </div>
          <div className="grid grid-cols-10 gap-1 text-center">
            {['Q','W','E','R','T','Y','U','I','O','P'].map(l => (
              <button key={l} onClick={() => handleKeyPress(l)} className="p-2 rounded bg-slate-800 hover:bg-teal-600 active:scale-95 text-xs font-bold text-white border border-white/10 transition-transform cursor-pointer">{l}</button>
            ))}
          </div>
          <div className="grid grid-cols-9 gap-1 text-center px-2">
            {['A','S','D','F','G','H','J','K','L'].map(l => (
              <button key={l} onClick={() => handleKeyPress(l)} className="p-2 rounded bg-slate-800 hover:bg-teal-600 active:scale-95 text-xs font-bold text-white border border-white/10 transition-transform cursor-pointer">{l}</button>
            ))}
          </div>
          <div className="grid grid-cols-8 gap-1 text-center px-4">
            {['Z','X','C','V','B','N','M'].map(l => (
              <button key={l} onClick={() => handleKeyPress(l)} className="p-2 rounded bg-slate-800 hover:bg-teal-600 active:scale-95 text-xs font-bold text-white border border-white/10 transition-transform cursor-pointer">{l}</button>
            ))}
            <button 
              onClick={handleBackspace}
              className="p-2 rounded bg-rose-600/80 hover:bg-rose-500 active:scale-95 text-xs font-bold text-white border border-white/10 flex items-center justify-center cursor-pointer"
            >
              <Delete className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Clues Column */}
      <div className="w-full lg:w-80 glass-panel border border-white/10 p-4 rounded-2xl flex flex-col gap-4">
        <h3 className="font-heading font-bold text-sm text-teal-400 uppercase tracking-wider">
          Crossword Clues
        </h3>

        <div className="flex flex-col gap-2.5 max-h-96 overflow-y-auto pr-1">
          {words.map((w) => {
            const isSelectedWord = selectedWordNum === w.number;

            return (
              <div 
                key={`clue-${w.number}`}
                onClick={() => handleClueClick(w)}
                className={`p-3 rounded-xl border text-xs flex flex-col gap-1 cursor-pointer transition-all ${
                  isSelectedWord
                    ? 'border-amber-400 bg-amber-400/10 text-white ring-1 ring-amber-400/40'
                    : 'bg-slate-900/70 border-white/5 text-gray-300 hover:border-teal-400/40'
                }`}
              >
                <div className="font-bold text-amber-300 flex items-center justify-between">
                  <span>{w.number}. {(w.direction || 'across').toUpperCase()}</span>
                  <span className="text-[10px] text-gray-400 font-mono">({w.word.length} letters)</span>
                </div>
                <div className="text-gray-200 leading-relaxed">{w.clue}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
