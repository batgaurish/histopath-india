import React, { useState, useEffect } from 'react';
import { Audio } from '../../utils/audio';
import { Check, Sparkles, Trophy, Delete } from 'lucide-react';

export default function CrosswordGame({ puzzleData, onComplete, giveHintRef }) {
  const rawWords = puzzleData?.words || [
    { word: 'KERATIN', clue: 'Fibrous protein that strengthens the cornified layer' },
    { word: 'DESMOSOME', clue: 'Cell junction giving the prickle appearance in stratum spinosum' },
    { word: 'MELANOCYTE', clue: 'Dendritic cell in basal layer producing pigment' },
    { word: 'MERKEL', clue: 'Tactile mechanoreceptor found in basal layer' },
  ];

  const gridSize = 10;
  const [words, setWords] = useState([]);
  const [grid, setGrid] = useState({});
  const [selectedWordNum, setSelectedWordNum] = useState(1);
  const [selectedWordCharIdx, setSelectedWordCharIdx] = useState(0);
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

      // Build cell coordinate list for this word
      const cellKeys = [];
      for (let idx = 0; idx < cleanWord.length; idx++) {
        const r = direction === 'across' ? row : row + idx;
        const c = direction === 'across' ? col + idx : col;
        cellKeys.push(`${r}-${c}`);
      }

      processedWords.push({
        number: i + 1,
        word: cleanWord,
        clue: item.clue || 'Histology terminology',
        row,
        col,
        direction,
        cellKeys,
      });
    });

    setWords(processedWords);

    const initialGrid = {};
    processedWords.forEach((w) => {
      w.cellKeys.forEach((key, idx) => {
        const char = w.word[idx];
        if (!initialGrid[key]) {
          initialGrid[key] = { char, number: idx === 0 ? w.number : null, wordNums: [w.number] };
        } else {
          if (idx === 0) initialGrid[key].number = w.number;
          initialGrid[key].wordNums.push(w.number);
        }
      });
    });

    setGrid(initialGrid);
    setUserLetters({});
    setRevealedCells({});
    setIsCompleted(false);

    if (processedWords.length > 0) {
      setSelectedWordNum(1);
      setSelectedWordCharIdx(0);
    }
  }, [puzzleData]);

  const activeWord = words.find(w => w.number === selectedWordNum) || words[0];
  const activeKey = activeWord?.cellKeys?.[selectedWordCharIdx] || null;

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

    // Find word containing this cell
    const matchingWord = words.find(w => w.cellKeys.includes(key));
    if (matchingWord) {
      setSelectedWordNum(matchingWord.number);
      const charIdx = matchingWord.cellKeys.indexOf(key);
      setSelectedWordCharIdx(charIdx >= 0 ? charIdx : 0);
    }
  };

  const handleClueClick = (w) => {
    Audio.playClick();
    setSelectedWordNum(w.number);
    setSelectedWordCharIdx(0);
  };

  const handleKeyPress = (letter) => {
    if (!activeWord || !activeKey) return;

    Audio.playClick();
    const newUserLetters = { ...userLetters, [activeKey]: letter.toUpperCase() };
    setUserLetters(newUserLetters);

    // Advance to next letter in current word
    if (selectedWordCharIdx + 1 < activeWord.word.length) {
      setSelectedWordCharIdx(selectedWordCharIdx + 1);
    }

    // Check overall crossword completion
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
    if (!activeWord || !activeKey) return;

    setUserLetters(prev => ({ ...prev, [activeKey]: '' }));

    if (selectedWordCharIdx > 0) {
      setSelectedWordCharIdx(selectedWordCharIdx - 1);
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
        {/* Active Word Clue Header Banner */}
        {activeWord && (
          <div className="w-full max-w-[380px] md:max-w-[440px] px-4 py-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold flex items-center justify-between">
            <span>#{activeWord.number} {activeWord.direction.toUpperCase()}: {activeWord.clue}</span>
            <span className="text-[10px] text-amber-400/80 font-mono">({selectedWordCharIdx + 1}/{activeWord.word.length})</span>
          </div>
        )}

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
            const isCurrentCell = activeKey === key;
            const isWordMember = activeWord?.cellKeys?.includes(key);
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
                  isCurrentCell
                    ? 'border-amber-400 bg-amber-400/40 text-white ring-4 ring-amber-400/60 shadow-xl scale-105 z-10'
                    : isWordMember
                    ? 'border-teal-400/80 bg-teal-500/20 text-teal-100 ring-1 ring-teal-400/30'
                    : isRevealed
                    ? 'border-emerald-500/80 bg-emerald-950/60 text-emerald-300'
                    : userChar
                    ? 'border-teal-400/60 bg-slate-900 text-teal-200'
                    : 'border-white/20 bg-slate-900 text-white hover:border-teal-400/60'
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
            Touch Keyboard (Tap clue on right, then type letters)
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
                    ? 'border-amber-400 bg-amber-400/20 text-white ring-2 ring-amber-400/50 shadow-md'
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
