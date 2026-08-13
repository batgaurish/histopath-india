import React, { useState, useEffect } from 'react';
import { Audio } from '../../utils/audio';
import { Check, Sparkles, Trophy } from 'lucide-react';

export default function JigsawGame({ gridSize = 3, imageDesc = '', puzzleData, onComplete, giveHintRef }) {
  const [pieces, setPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [placedCount, setPlacedCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

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

  // Realistic H&E Stained Histology Slide Pattern (Eosin pink & Hematoxylin purple stains)
  const defaultSlideBg = `radial-gradient(circle at 30% 30%, #a855f7 0%, #ec4899 40%, #be185d 70%, #831843 100%)`;
  const slideImageUrl = puzzleData?.slideImage || null;

  useEffect(() => {
    const initialPieces = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const id = r * gridSize + c;
        const label = labels[id % labels.length] || `Layer ${id + 1}`;
        
        // Calculate background position percentages for 3x3 slicing
        const bgPosX = c * (100 / (gridSize - 1));
        const bgPosY = r * (100 / (gridSize - 1));

        initialPieces.push({
          id,
          r,
          c,
          label,
          placed: false,
          bgPosX: `${bgPosX}%`,
          bgPosY: `${bgPosY}%`,
        });
      }
    }

    const shuffled = [...initialPieces].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
    setPlacedCount(0);
    setSelectedPiece(null);
    setIsCompleted(false);
  }, [gridSize, imageDesc, puzzleData]);

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
          if (next >= totalPieces) {
            Audio.playStar();
            setIsCompleted(true);
          }
          return next;
        });
      };
    }
  }, [giveHintRef, totalPieces]);

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
      placePieceOnBoard(selectedPiece.id);
    } else {
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
        Audio.playStar();
        setIsCompleted(true);
      }
      return nextCount;
    });
  };

  const handleFinish = () => {
    if (onComplete) onComplete({ hintsUsed: 0, mistakes: 0 });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center gap-6 relative">
      {/* Victory Celebration Modal */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-emerald-500/40 p-8 rounded-3xl max-w-md w-full flex flex-col items-center gap-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 text-3xl shadow-xl shadow-emerald-500/30">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-2xl text-gradient">
                Microscopic Slide Assembled!
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                All histological tissue fragments accurately reconstructed!
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

      {/* Assembly Grid Frame */}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="text-xs uppercase font-bold tracking-wider text-teal-400 text-center">
          Histology Slide Frame — Tap a fragment below, then tap its grid slot
        </div>

        <div 
          className="grid gap-1.5 p-3 glass-panel border-2 border-teal-500/40 rounded-2xl aspect-square w-full max-w-[360px] md:max-w-[420px] shadow-2xl shadow-teal-500/20 relative"
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
                className={`aspect-square rounded-xl border flex flex-col items-center justify-center relative transition-all cursor-pointer overflow-hidden p-1 ${
                  placedPiece
                    ? 'border-teal-300 shadow-lg'
                    : selectedPiece
                    ? 'border-dashed border-amber-400 bg-amber-400/20 hover:bg-amber-400/30'
                    : 'border-dashed border-white/20 bg-slate-900/90'
                }`}
                style={
                  placedPiece
                    ? slideImageUrl
                      ? { backgroundImage: `url(${slideImageUrl})`, backgroundSize: `${gridSize * 100}%`, backgroundPosition: `${placedPiece.bgPosX} ${placedPiece.bgPosY}` }
                      : { background: defaultSlideBg, backgroundSize: '300% 300%', backgroundPosition: `${placedPiece.bgPosX} ${placedPiece.bgPosY}` }
                    : undefined
                }
              >
                {placedPiece ? (
                  <div className="flex flex-col items-center justify-center text-center bg-slate-950/70 p-1 rounded-lg border border-white/10 w-full h-full">
                    <span className="text-[10px] font-extrabold text-white leading-tight">
                      {placedPiece.label}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400 gap-0.5">
                    <span className="text-xs font-bold">Slot {idx + 1}</span>
                    <span className="text-[9px] text-gray-500 font-medium">({r + 1},{c + 1})</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Piece Tray Container */}
      <div className="w-full glass-panel border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-3">
        <div className="text-xs uppercase tracking-wider font-bold text-gray-300">
          Unplaced Histology Fragments ({pieces.filter(p => !p.placed).length} remaining)
        </div>

        <div className="grid grid-cols-3 gap-2.5 w-full max-w-[420px]">
          {pieces.filter(p => !p.placed).map((piece) => {
            const isSelected = selectedPiece?.id === piece.id;

            return (
              <button
                key={`piece-${piece.id}`}
                onClick={() => handlePieceClick(piece)}
                className={`aspect-video p-2 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-amber-400 ring-4 ring-amber-400/50 scale-105 shadow-xl font-bold'
                    : 'border-white/20 hover:scale-105 hover:border-teal-400/60'
                }`}
                style={
                  slideImageUrl
                    ? { backgroundImage: `url(${slideImageUrl})`, backgroundSize: `${gridSize * 100}%`, backgroundPosition: `${piece.bgPosX} ${piece.bgPosY}` }
                    : { background: defaultSlideBg, backgroundSize: '300% 300%', backgroundPosition: `${piece.bgPosX} ${piece.bgPosY}` }
                }
              >
                <div className="bg-slate-950/80 p-1.5 rounded-lg border border-white/10 w-full h-full flex items-center justify-center">
                  <span className="text-[10px] font-extrabold text-white text-center leading-tight">
                    {piece.label}
                  </span>
                </div>
              </button>
            );
          })}

          {pieces.filter(p => !p.placed).length === 0 && (
            <div className="col-span-3 text-sm font-bold text-teal-300 text-center py-2 flex items-center justify-center gap-2">
              🎉 All histology fragments assembled cleanly!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
