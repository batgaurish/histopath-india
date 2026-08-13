import React, { useState, useEffect, useRef } from 'react';
import { Audio } from '../../utils/audio';

export default function JigsawGame({ gridSize = 3, imageDesc = '', onComplete, giveHintRef }) {
  const [pieces, setPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [placedCount, setPlacedCount] = useState(0);
  const totalPieces = gridSize * gridSize;

  useEffect(() => {
    // Generate piece descriptors
    const initialPieces = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const id = r * gridSize + c;
        initialPieces.push({
          id,
          r,
          c,
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
  }, [gridSize, imageDesc]);

  // Hint ref
  useEffect(() => {
    if (giveHintRef) {
      giveHintRef.current = () => {
        const unplaced = pieces.filter(p => !p.placed);
        if (unplaced.length > 0) {
          const target = unplaced[0];
          // Auto place hint
          placePieceOnBoard(target.id, target.r, target.c);
          Audio.playHint();
        }
      };
    }
  }, [giveHintRef, pieces]);

  function getTissueColor(r, c, size, desc) {
    const isEpithelium = desc.toLowerCase().includes('epitheli');
    const isBone = desc.toLowerCase().includes('bone');
    const isGland = desc.toLowerCase().includes('gland');

    const hue = isEpithelium ? 330 : isBone ? 40 : isGland ? 270 : 200;
    const lightness = 35 + ((r * size + c) * 6) % 30;
    return `hsl(${hue}, 60%, ${lightness}%)`;
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
      placePieceOnBoard(selectedPiece.id, r, c);
    } else {
      // Wrong Slot
      Audio.playWrong();
      setSelectedPiece(null);
    }
  };

  const placePieceOnBoard = (pieceId, r, c) => {
    setPieces(prev =>
      prev.map(p => (p.id === pieceId ? { ...p, placed: true } : p))
    );
    setSelectedPiece(null);
    Audio.playPiecePlaced();

    const newPlaced = placedCount + 1;
    setPlacedCount(newPlaced);

    if (newPlaced === totalPieces) {
      setTimeout(() => {
        if (onComplete) onComplete({ hintsUsed: 0, mistakes: 0 });
      }, 500);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center gap-6">
      {/* Target Grid Board */}
      <div 
        className="grid gap-1.5 p-3 glass-panel border border-white/10 rounded-2xl aspect-square w-full max-w-[360px] md:max-w-[420px]"
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
              className={`aspect-square rounded-xl border flex flex-col items-center justify-center relative transition-all cursor-pointer overflow-hidden ${
                placedPiece
                  ? 'border-teal-400/80 shadow-lg shadow-teal-500/20'
                  : selectedPiece
                  ? 'border-dashed border-teal-400/50 bg-teal-500/10 hover:bg-teal-500/20'
                  : 'border-dashed border-white/10 bg-slate-900/60'
              }`}
              style={{
                backgroundColor: placedPiece ? placedPiece.color : undefined
              }}
            >
              {placedPiece ? (
                <div className="flex flex-col items-center justify-center p-1 text-center">
                  <span className="text-xl md:text-2xl mb-1">🔬</span>
                  <span className="text-[10px] font-bold text-white/90">Layer {placedPiece.id + 1}</span>
                </div>
              ) : (
                <span className="text-xs text-gray-500 font-bold">{idx + 1}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Piece Tray */}
      <div className="w-full glass-panel border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-3">
        <div className="text-xs uppercase tracking-wider font-semibold text-gray-400">
          Unplaced Histology Fragments (Tap to select, then tap target slot)
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 min-h-[72px]">
          {pieces.filter(p => !p.placed).map((piece) => {
            const isSelected = selectedPiece?.id === piece.id;

            return (
              <button
                key={`piece-${piece.id}`}
                onClick={() => handlePieceClick(piece)}
                className={`w-16 h-16 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 ring-4 ring-amber-400/40 scale-105 shadow-xl'
                    : 'border-white/20 hover:scale-105 hover:border-teal-400/60'
                }`}
                style={{ backgroundColor: piece.color }}
              >
                <span className="text-lg">🔬</span>
                <span className="text-[10px] font-bold text-white shadow-sm">#{piece.id + 1}</span>
              </button>
            );
          })}

          {pieces.filter(p => !p.placed).length === 0 && (
            <div className="text-sm font-semibold text-teal-300 py-2">
              🎉 All fragments assembled correctly!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
