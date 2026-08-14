import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Audio } from '../../utils/audio';
import { Check, Sparkles, Trophy, Delete, RotateCcw } from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// Proper Interlocking Crossword Grid Generator
// Places words so they share intersecting letters,
// creating a challenging real crossword puzzle.
// ═══════════════════════════════════════════════════════════

function generateCrosswordLayout(rawWords, maxGridSize = 20) {
  const sorted = [...rawWords]
    .map(w => ({ ...w, word: (w.word || '').toUpperCase().replace(/[^A-Z]/g, '') }))
    .filter(w => w.word.length > 0)
    .sort((a, b) => b.word.length - a.word.length);

  if (sorted.length === 0) return { placed: [], gridSize: 10 };

  const placed = [];
  const occupiedCells = {}; // key "r,c" => letter

  const getCell = (r, c) => occupiedCells[`${r},${c}`];
  const setCell = (r, c, ch) => { occupiedCells[`${r},${c}`] = ch; };

  // Place first word horizontally in the center
  const first = sorted[0];
  const startRow = Math.floor(maxGridSize / 2);
  const startCol = Math.floor((maxGridSize - first.word.length) / 2);
  const firstEntry = {
    ...first,
    row: startRow,
    col: startCol,
    direction: 'across',
    number: 1,
    cellKeys: [],
  };
  for (let i = 0; i < first.word.length; i++) {
    const r = startRow;
    const c = startCol + i;
    setCell(r, c, first.word[i]);
    firstEntry.cellKeys.push(`${r}-${c}`);
  }
  placed.push(firstEntry);

  // Try to place remaining words by finding intersections
  for (let wi = 1; wi < sorted.length; wi++) {
    const wordObj = sorted[wi];
    const word = wordObj.word;
    let bestPlacement = null;
    let bestScore = -1;

    // For each already-placed word, try to find shared letters
    for (const pw of placed) {
      for (let pi = 0; pi < pw.word.length; pi++) {
        for (let wi2 = 0; wi2 < word.length; wi2++) {
          if (pw.word[pi] !== word[wi2]) continue;

          // Calculate position for new word
          const newDir = pw.direction === 'across' ? 'down' : 'across';
          let newRow, newCol;

          if (newDir === 'down') {
            // pw is across, new word goes down through intersection
            newRow = pw.row - wi2;
            newCol = pw.col + pi;
          } else {
            // pw is down, new word goes across through intersection
            newRow = pw.row + pi;
            newCol = pw.col - wi2;
          }

          // Validate placement
          if (!canPlace(word, newRow, newCol, newDir, occupiedCells, maxGridSize)) continue;

          // Score: prefer placements that create more intersections
          let score = 0;
          for (let k = 0; k < word.length; k++) {
            const cr = newDir === 'down' ? newRow + k : newRow;
            const cc = newDir === 'across' ? newCol + k : newCol;
            const existing = getCell(cr, cc);
            if (existing === word[k]) score += 10; // intersection bonus
          }
          // Prefer central placements
          const centerR = maxGridSize / 2;
          const centerC = maxGridSize / 2;
          const midR = newDir === 'down' ? newRow + word.length / 2 : newRow;
          const midC = newDir === 'across' ? newCol + word.length / 2 : newCol;
          score -= Math.abs(midR - centerR) * 0.5 + Math.abs(midC - centerC) * 0.5;

          if (score > bestScore) {
            bestScore = score;
            bestPlacement = { row: newRow, col: newCol, direction: newDir };
          }
        }
      }
    }

    if (bestPlacement) {
      const entry = {
        ...wordObj,
        row: bestPlacement.row,
        col: bestPlacement.col,
        direction: bestPlacement.direction,
        number: placed.length + 1,
        cellKeys: [],
      };
      for (let i = 0; i < word.length; i++) {
        const r = bestPlacement.direction === 'down' ? bestPlacement.row + i : bestPlacement.row;
        const c = bestPlacement.direction === 'across' ? bestPlacement.col + i : bestPlacement.col;
        setCell(r, c, word[i]);
        entry.cellKeys.push(`${r}-${c}`);
      }
      placed.push(entry);
    }
  }

  // Normalize coordinates to start from 0
  let minR = Infinity, minC = Infinity, maxR = -Infinity, maxC = -Infinity;
  placed.forEach(w => {
    w.cellKeys.forEach(k => {
      const [r, c] = k.split('-').map(Number);
      minR = Math.min(minR, r);
      minC = Math.min(minC, c);
      maxR = Math.max(maxR, r);
      maxC = Math.max(maxC, c);
    });
  });

  // Rebase
  const offsetR = minR;
  const offsetC = minC;
  placed.forEach(w => {
    w.row -= offsetR;
    w.col -= offsetC;
    w.cellKeys = w.cellKeys.map(k => {
      const [r, c] = k.split('-').map(Number);
      return `${r - offsetR}-${c - offsetC}`;
    });
  });

  const gridSize = Math.max(maxR - minR + 1, maxC - minC + 1, 8);

  // Renumber: assign numbers at starting cells in reading order
  const startCells = {};
  placed.forEach(w => {
    const startKey = w.cellKeys[0];
    if (!startCells[startKey]) startCells[startKey] = [];
    startCells[startKey].push(w);
  });

  const sortedStarts = Object.keys(startCells).sort((a, b) => {
    const [ar, ac] = a.split('-').map(Number);
    const [br, bc] = b.split('-').map(Number);
    return ar - br || ac - bc;
  });

  let num = 1;
  const numberMap = {};
  sortedStarts.forEach(key => {
    numberMap[key] = num;
    startCells[key].forEach(w => { w.number = num; });
    num++;
  });

  return { placed, gridSize: Math.min(gridSize + 2, 20) };
}

function canPlace(word, row, col, direction, occupiedCells, maxGridSize) {
  const getCell = (r, c) => occupiedCells[`${r},${c}`];

  for (let i = 0; i < word.length; i++) {
    const r = direction === 'down' ? row + i : row;
    const c = direction === 'across' ? col + i : col;

    if (r < 0 || r >= maxGridSize || c < 0 || c >= maxGridSize) return false;

    const existing = getCell(r, c);
    if (existing && existing !== word[i]) return false;

    if (!existing) {
      // Check adjacent cells (no parallel touching)
      if (direction === 'across') {
        const above = getCell(r - 1, c);
        const below = getCell(r + 1, c);
        if (above || below) return false;
      } else {
        const left = getCell(r, c - 1);
        const right = getCell(r, c + 1);
        if (left || right) return false;
      }
    }
  }

  // Check cell before and after the word
  if (direction === 'across') {
    if (getCell(row, col - 1)) return false;
    if (getCell(row, col + word.length)) return false;
  } else {
    if (getCell(row - 1, col)) return false;
    if (getCell(row + word.length, col)) return false;
  }

  return true;
}

export default function CrosswordGame({ puzzleData, onComplete, giveHintRef }) {
  const rawWords = puzzleData?.words || [
    { word: 'AMELOBLAST', clue: 'Cell responsible for enamel matrix secretion during amelogenesis' },
    { word: 'KERATIN', clue: 'Fibrous structural protein forming the cornified layer of epithelium' },
    { word: 'DESMOSOME', clue: 'Intercellular junction giving prickle-cell appearance in stratum spinosum' },
    { word: 'MELANOCYTE', clue: 'Neural crest–derived dendritic cell producing melanin pigment in basal layer' },
    { word: 'ODONTOBLAST', clue: 'Cell lining the pulp chamber that forms dentin throughout life' },
    { word: 'ENAMEL', clue: 'Hardest substance in the human body, 96% hydroxyapatite by weight' },
    { word: 'CEMENTUM', clue: 'Calcified tissue covering the root surface of teeth' },
    { word: 'PULP', clue: 'Vascular connective tissue core within the tooth containing nerves' },
    { word: 'DENTIN', clue: 'Tubular calcified tissue forming the bulk of tooth structure' },
    { word: 'MERKEL', clue: 'Slowly adapting tactile mechanoreceptor in the basal epithelial layer' },
  ];

  const [words, setWords] = useState([]);
  const [gridSize, setGridSize] = useState(12);
  const [grid, setGrid] = useState({});
  const [selectedWordNum, setSelectedWordNum] = useState(1);
  const [selectedWordCharIdx, setSelectedWordCharIdx] = useState(0);
  const [userLetters, setUserLetters] = useState({});
  const [revealedCells, setRevealedCells] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [solvedWords, setSolvedWords] = useState(new Set());
  const keyboardRef = useRef(null);

  useEffect(() => {
    const { placed, gridSize: gs } = generateCrosswordLayout(rawWords);
    setWords(placed);
    setGridSize(gs);

    const initialGrid = {};
    placed.forEach((w) => {
      w.cellKeys.forEach((key, idx) => {
        const char = w.word[idx];
        if (!initialGrid[key]) {
          initialGrid[key] = { char, number: idx === 0 ? w.number : null, wordNums: [w.number] };
        } else {
          if (idx === 0 && !initialGrid[key].number) initialGrid[key].number = w.number;
          if (!initialGrid[key].wordNums.includes(w.number)) {
            initialGrid[key].wordNums.push(w.number);
          }
        }
      });
    });

    setGrid(initialGrid);
    setUserLetters({});
    setRevealedCells({});
    setIsCompleted(false);
    setSolvedWords(new Set());

    if (placed.length > 0) {
      setSelectedWordNum(placed[0].number);
      setSelectedWordCharIdx(0);
    }
  }, [puzzleData]);

  const activeWord = words.find(w => w.number === selectedWordNum) || words[0];
  const activeKey = activeWord?.cellKeys?.[selectedWordCharIdx] || null;

  // Check if a word is fully solved
  const checkWordSolved = useCallback((wordObj, letters, revealed) => {
    return wordObj.cellKeys.every((k, i) => 
      letters[k] === wordObj.word[i] || revealed[k]
    );
  }, []);

  useEffect(() => {
    if (giveHintRef) {
      giveHintRef.current = () => {
        const unrevealedKeys = Object.keys(grid).filter(
          key => !revealedCells[key] && userLetters[key] !== grid[key].char
        );
        if (unrevealedKeys.length > 0) {
          const hintKey = unrevealedKeys[Math.floor(Math.random() * unrevealedKeys.length)];
          const newRevealed = { ...revealedCells, [hintKey]: true };
          const newLetters = { ...userLetters, [hintKey]: grid[hintKey].char };
          setRevealedCells(newRevealed);
          setUserLetters(newLetters);
          Audio.playHint();

          // Check for newly solved words
          const newSolved = new Set(solvedWords);
          words.forEach(w => {
            if (!newSolved.has(w.number) && checkWordSolved(w, newLetters, newRevealed)) {
              newSolved.add(w.number);
            }
          });
          setSolvedWords(newSolved);

          // Check overall completion
          if (Object.keys(grid).every(k => newLetters[k] === grid[k].char || newRevealed[k])) {
            Audio.playStar();
            setIsCompleted(true);
          }
        }
      };
    }
  }, [giveHintRef, grid, revealedCells, userLetters, words, solvedWords, checkWordSolved]);

  const handleCellClick = (r, c) => {
    const key = `${r}-${c}`;
    if (!grid[key]) return;
    Audio.playClick();

    // If clicking on a cell that belongs to multiple words, toggle between them
    const cellWordNums = grid[key].wordNums || [];
    if (cellWordNums.includes(selectedWordNum)) {
      // Toggle to the other word at this intersection
      const otherWord = cellWordNums.find(n => n !== selectedWordNum);
      if (otherWord) {
        setSelectedWordNum(otherWord);
        const w = words.find(ww => ww.number === otherWord);
        if (w) {
          const charIdx = w.cellKeys.indexOf(key);
          setSelectedWordCharIdx(charIdx >= 0 ? charIdx : 0);
        }
        return;
      }
    }

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

  const handleKeyPress = useCallback((letter) => {
    if (!activeWord || !activeKey) return;

    Audio.playClick();
    const newUserLetters = { ...userLetters, [activeKey]: letter.toUpperCase() };
    setUserLetters(newUserLetters);

    // Advance to next empty letter in current word
    let nextIdx = selectedWordCharIdx + 1;
    while (nextIdx < activeWord.word.length) {
      const nextKey = activeWord.cellKeys[nextIdx];
      if (!newUserLetters[nextKey] && !revealedCells[nextKey]) break;
      nextIdx++;
    }
    if (nextIdx < activeWord.word.length) {
      setSelectedWordCharIdx(nextIdx);
    }

    // Check for solved words
    const newSolved = new Set(solvedWords);
    words.forEach(w => {
      if (!newSolved.has(w.number) && checkWordSolved(w, newUserLetters, revealedCells)) {
        newSolved.add(w.number);
        Audio.playCorrect();
      }
    });
    setSolvedWords(newSolved);

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
  }, [activeWord, activeKey, userLetters, selectedWordCharIdx, revealedCells, grid, words, solvedWords, checkWordSolved]);

  const handleBackspace = () => {
    if (!activeWord || !activeKey) return;

    if (userLetters[activeKey]) {
      setUserLetters(prev => ({ ...prev, [activeKey]: '' }));
    } else if (selectedWordCharIdx > 0) {
      const prevIdx = selectedWordCharIdx - 1;
      setSelectedWordCharIdx(prevIdx);
      const prevKey = activeWord.cellKeys[prevIdx];
      setUserLetters(prev => ({ ...prev, [prevKey]: '' }));
    }
  };

  // Physical keyboard support
  useEffect(() => {
    const handler = (e) => {
      if (isCompleted) return;
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        e.preventDefault();
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleKeyPress, handleBackspace, isCompleted]);

  const handleFinish = () => {
    if (onComplete) onComplete({ hintsUsed: 0, mistakes: 0 });
  };

  const acrossWords = words.filter(w => w.direction === 'across').sort((a, b) => a.number - b.number);
  const downWords = words.filter(w => w.direction === 'down').sort((a, b) => a.number - b.number);

  return (
    <div className="w-full max-w-6xl mx-auto p-2 md:p-4 flex flex-col lg:flex-row gap-4 items-start relative">
      {/* Victory Modal */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-emerald-500/40 p-8 rounded-3xl max-w-md w-full flex flex-col items-center gap-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 text-3xl shadow-xl shadow-emerald-500/30">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-2xl text-gradient">
                Crossword Mastered!
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                All {words.length} pathology terms correctly identified — excellent clinical vocabulary!
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-sm">
              <Sparkles className="w-4 h-4" /> +300 EXP Earned
            </div>
            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-purple-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/20 cursor-pointer hover:scale-[1.02] transition-transform"
            >
              Proceed to Neville's MCQs Quiz →
            </button>
          </div>
        </div>
      )}

      {/* Grid & Touch Keyboard */}
      <div className="flex-1 w-full flex flex-col items-center gap-3">
        {/* Active Word Clue Header Banner */}
        {activeWord && (
          <div className="w-full max-w-[500px] px-4 py-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold flex items-center justify-between gap-2">
            <span className="flex-1">#{activeWord.number} {activeWord.direction.toUpperCase()}: {activeWord.clue}</span>
            <span className="text-[10px] text-amber-400/80 font-mono shrink-0">({selectedWordCharIdx + 1}/{activeWord.word.length})</span>
          </div>
        )}

        {/* Progress indicator */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
          <span>{solvedWords.size} / {words.length} words solved</span>
          <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${words.length > 0 ? (solvedWords.size / words.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Crossword Grid */}
        <div 
          className="grid gap-[2px] p-2 glass-panel border border-white/10 rounded-2xl w-full max-w-[500px] shadow-2xl"
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            aspectRatio: '1 / 1',
          }}
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
            const isCorrect = userChar === cellData?.char;
            const isSolvedWordCell = cellData?.wordNums?.some(n => solvedWords.has(n));

            if (!cellData) {
              return (
                <div key={key} className="bg-slate-950/90 rounded-[3px]" style={{ aspectRatio: '1' }} />
              );
            }

            return (
              <button
                key={key}
                onClick={() => handleCellClick(r, c)}
                className={`rounded-[3px] border flex flex-col items-center justify-center relative font-extrabold text-[11px] md:text-sm cursor-pointer transition-all ${
                  isCurrentCell
                    ? 'border-amber-400 bg-amber-400/40 text-white ring-2 ring-amber-400/60 shadow-lg scale-[1.03] z-10'
                    : isWordMember
                    ? 'border-teal-400/80 bg-teal-500/20 text-teal-100 ring-1 ring-teal-400/30'
                    : isSolvedWordCell
                    ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300'
                    : isRevealed
                    ? 'border-emerald-500/80 bg-emerald-950/60 text-emerald-300'
                    : userChar
                    ? 'border-teal-400/60 bg-slate-900 text-teal-200'
                    : 'border-white/20 bg-slate-900 text-white hover:border-teal-400/60'
                }`}
                style={{ aspectRatio: '1' }}
              >
                {cellData.number && (
                  <span className="absolute top-[1px] left-[3px] text-[7px] md:text-[8px] text-amber-300 font-bold leading-none">
                    {cellData.number}
                  </span>
                )}
                <span className="mt-0.5">{isRevealed ? cellData.char : userChar}</span>
              </button>
            );
          })}
        </div>

        {/* Touch Keyboard */}
        <div ref={keyboardRef} className="w-full max-w-[500px] flex flex-col gap-1 glass-panel p-2 rounded-xl border border-white/10">
          <div className="grid grid-cols-10 gap-1 text-center">
            {['Q','W','E','R','T','Y','U','I','O','P'].map(l => (
              <button key={l} onClick={() => handleKeyPress(l)} className="p-1.5 md:p-2 rounded bg-slate-800 hover:bg-teal-600 active:scale-90 text-[10px] md:text-xs font-bold text-white border border-white/10 transition-transform cursor-pointer">{l}</button>
            ))}
          </div>
          <div className="grid grid-cols-9 gap-1 text-center px-2">
            {['A','S','D','F','G','H','J','K','L'].map(l => (
              <button key={l} onClick={() => handleKeyPress(l)} className="p-1.5 md:p-2 rounded bg-slate-800 hover:bg-teal-600 active:scale-90 text-[10px] md:text-xs font-bold text-white border border-white/10 transition-transform cursor-pointer">{l}</button>
            ))}
          </div>
          <div className="grid grid-cols-8 gap-1 text-center px-4">
            {['Z','X','C','V','B','N','M'].map(l => (
              <button key={l} onClick={() => handleKeyPress(l)} className="p-1.5 md:p-2 rounded bg-slate-800 hover:bg-teal-600 active:scale-90 text-[10px] md:text-xs font-bold text-white border border-white/10 transition-transform cursor-pointer">{l}</button>
            ))}
            <button 
              onClick={handleBackspace}
              className="p-1.5 md:p-2 rounded bg-rose-600/80 hover:bg-rose-500 active:scale-90 text-xs font-bold text-white border border-white/10 flex items-center justify-center cursor-pointer"
            >
              <Delete className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Clues Column — Separated into Across & Down */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        {/* Across Clues */}
        <div className="glass-panel border border-white/10 p-4 rounded-2xl flex flex-col gap-3">
          <h3 className="font-heading font-bold text-sm text-teal-400 uppercase tracking-wider flex items-center gap-2">
            → Across
          </h3>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
            {acrossWords.map((w) => {
              const isSelectedWord = selectedWordNum === w.number;
              const isSolved = solvedWords.has(w.number);
              return (
                <div 
                  key={`clue-a-${w.number}`}
                  onClick={() => handleClueClick(w)}
                  className={`p-2.5 rounded-xl border text-xs flex flex-col gap-0.5 cursor-pointer transition-all ${
                    isSolved
                      ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 opacity-70'
                      : isSelectedWord
                      ? 'border-amber-400 bg-amber-400/20 text-white ring-2 ring-amber-400/50 shadow-md'
                      : 'bg-slate-900/70 border-white/5 text-gray-300 hover:border-teal-400/40'
                  }`}
                >
                  <div className="font-bold text-amber-300 flex items-center justify-between">
                    <span>{w.number}. {isSolved ? '✓' : ''}</span>
                    <span className="text-[9px] text-gray-400 font-mono">({w.word.length})</span>
                  </div>
                  <div className={`leading-relaxed ${isSolved ? 'line-through opacity-60' : 'text-gray-200'}`}>{w.clue}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Down Clues */}
        <div className="glass-panel border border-white/10 p-4 rounded-2xl flex flex-col gap-3">
          <h3 className="font-heading font-bold text-sm text-purple-400 uppercase tracking-wider flex items-center gap-2">
            ↓ Down
          </h3>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
            {downWords.map((w) => {
              const isSelectedWord = selectedWordNum === w.number;
              const isSolved = solvedWords.has(w.number);
              return (
                <div 
                  key={`clue-d-${w.number}`}
                  onClick={() => handleClueClick(w)}
                  className={`p-2.5 rounded-xl border text-xs flex flex-col gap-0.5 cursor-pointer transition-all ${
                    isSolved
                      ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 opacity-70'
                      : isSelectedWord
                      ? 'border-amber-400 bg-amber-400/20 text-white ring-2 ring-amber-400/50 shadow-md'
                      : 'bg-slate-900/70 border-white/5 text-gray-300 hover:border-teal-400/40'
                  }`}
                >
                  <div className="font-bold text-purple-300 flex items-center justify-between">
                    <span>{w.number}. {isSolved ? '✓' : ''}</span>
                    <span className="text-[9px] text-gray-400 font-mono">({w.word.length})</span>
                  </div>
                  <div className={`leading-relaxed ${isSolved ? 'line-through opacity-60' : 'text-gray-200'}`}>{w.clue}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
