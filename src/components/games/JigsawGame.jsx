import React, { useState, useEffect } from 'react';
import { Audio } from '../../utils/audio';

export default function JigsawGame({ gridSize = 3, imageDesc = '', puzzleData, onComplete, giveHintRef }) {
  const [pieces, setPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [placedCount, setPlacedCount] = useState(0);

  const labels = puzzleData?.labels || [
    'Stratum Basale',
    'Stratum Spinosum',
    'Stratum Granulosum',
    'Stratum Corneum',
    'Lamina Propria',
    'Submucosa',
    'Basement Membrane',
    'Capillary Loop',
    'Fibroblasts',
  ];

  const totalPieces = gridSize * gridSize;

  useEffect(() => {
    // Generate piece descriptors with histological titles
    const initialPieces = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const id = r * gridSize + c;
        const label = labels[id % labels.length] || `Layer ${id + 1}`;
        initialPieces.push({
          id,
          r,
          c,
          label,
          placed: false,
          color: getTissueColor(r, c, gridSize, imageDesc),
        });
      }
    }

    // Shuffle initial pieces for the tray
    const shuffled = [...initialPieces].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
    setPlacedCount(0);
    setSelectedPiece(null);
  }, [gridSize, imageDesc, puzzleData]);

  // Hint ref
  useEffect(() => {
    if (giveHintRef) {
      giveHintRef.current = () => {
        setPieces(prev => {
          const unplaced = prev.filter(p => !p.placed);
          if (unplaced.length > 0) {
            const target = unplaced[0];
            Audio.playHint();
            return prev.map(p => (p.id === target.id ? { ...p, placed: true } : p));
          }
          return prev;
        });

        setPlacedCount(prev => {
          const next = prev + 1;
          if (next >= totalPieces && onComplete) {
            setTimeout(() => onComplete({ hintsUsed: 1, mistakes: 0 }), 500);
          }
          return next;
        });
      };
    }
  }, [giveHintRef, totalPieces, onComplete]);

  function getTissueColor(r, c, size, desc) {
    const isEpithelium = desc.toLowerCase().includes('epitheli');
    const isBone = desc.toLowerCase().includes('bone');
    const isGland = desc.toLowerCase().includes('gland');

    const hue = isEpithelium ? 330 : isBone ? 40 : isGland ? 270 : 200;
    const lightness = 30 + ((r * size + c) * 7) % 35;
    return `hsl(${hue}, 65%, ${lightness}%)`;
  }

  const handlePieceClick = (piece) => {
    if (piece.placed) return;
    Audio.playClick();
    if (selectedPiece?.id === piece.id) {
      setSelectedPiece(null);
    } else {
      setSelectedPiece(piece);
    }
  };

  const handleSlotClick = (r, c) => {
    if (!selectedPiece) return;

    if (selectedPiece.r === r && selectedPiece.c === c) {
      // Correct Placement!
      placePieceOnBoard(selectedPiece.id);
    } else {
      // Wrong Slot placement attempt
      Audio.playWrong();
    }
  };

  const placePieceOnBoard = (pieceId) => {
    setPieces(prev =>
      prev.map(p => (p.id === pieceId ? { ...p, placed: true } : p))
    );
    setSelectedPiece(null);
    Audio.playPiecePlaced();

    setPlacedCount(prev => {
      const nextCount = prev + 1;
      if (nextCount === totalPieces) {
        Audio.playCorrect();
        setTimeout(() => {
          if (onComplete) onComplete({ hintsUsed: 0, mistakes: 0 });
        }, 500);
      }
      return nextCount;
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center gap-6">
      {/* Target Grid Board */}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="text-xs uppercase font-semibold tracking-wider text-teal-400 text-center">
          Assembly Grid — Tap a fragment below, then tap matching slot
        </div>

        <div 
          className="grid gap-2 p-3 glass-panel border border-white/10 rounded-2xl aspect-square w-full max-w-[360px] md:max-w-[440px]"
          style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
        >
          {Array.from({ length: totalPieces }).map((_, idx) => {
            const r = Math.floor(idx / gridSize);
            const c = idx % gridSize;
            const placedPiece = pieces.find(p => p.placed && p.r === r && p.c === c);

            return (
              <button
                key={`slot-${r}-${c}`}
                onClick={() => handleSlotClick(r, c)}
                className={`aspect-square rounded-xl border flex flex-col items-center justify-center relative transition-all cursor-pointer overflow-hidden p-1.5 ${
                  placedPiece
                    ? 'border-teal-400 shadow-xl shadow-teal-500/30'
                    : selectedPiece
                    ? 'border-dashed border-amber-400/80 bg-amber-400/10 hover:bg-amber-400/20'
                    : 'border-dashed border-white/15 bg-slate-900/80'
                }`}
                style={{
                  backgroundColor: placedPiece ? placedPiece.color : undefined
                }}
              >
                {placedPiece ? (
                  <div className="flex flex-col items-center justify-center text-center leading-tight">
                    <span className="text-xl mb-0.5">🔬</span>
                    <span className="text-[10px] md:text-xs font-bold text-white shadow-sm">
                      {placedPiece.label}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500 gap-1">
                    <span className="text-xs font-bold">Slot {idx + 1}</span>
                    <span className="text-[9px] text-gray-600 font-medium">({r + 1},{c + 1})</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Piece Tray */}
      <div className="w-full glass-panel border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-3">
        <div className="text-xs uppercase tracking-wider font-semibold text-gray-300">
          Unplaced Histology Fragments ({pieces.filter(p => !p.placed).length} remaining)
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 min-h-[80px]">
          {pieces.filter(p => !p.placed).map((piece) => {
            const isSelected = selectedPiece?.id === piece.id;

            return (
              <button
                key={`piece-${piece.id}`}
                onClick={() => handlePieceClick(piece)}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer min-w-[90px] min-h-[70px] ${
                  isSelected
                    ? 'border-amber-400 ring-4 ring-amber-400/40 scale-105 shadow-xl bg-amber-400/20'
                    : 'border-white/20 hover:scale-105 hover:border-teal-400/60'
                }`}
                style={{ backgroundColor: piece.color }}
              >
                <span className="text-base mb-0.5">🔬</span>
                <span className="text-[10px] font-extrabold text-white text-center leading-tight">
                  {piece.label}
                </span>
              </button>
            );
          })}

          {pieces.filter(p => !p.placed).length === 0 && (
            <div className="text-sm font-bold text-teal-300 py-2 flex items-center gap-2">
              🎉 All histology layers assembled in correct position!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
