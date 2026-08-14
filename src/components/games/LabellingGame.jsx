import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Audio } from '../../utils/audio';
import { Trophy, Sparkles, RotateCcw, Check, ImageOff } from 'lucide-react';
import { getExercise, isPlayable } from '../../utils/labelling';

// ═══════════════════════════════════════════════════════════
// Slide labelling
//
// A micrograph with numbered markers; students drag each term onto the
// structure it names. The image is displayed unmodified — markers are
// drawn as an overlay — so the underlying slide is never altered.
// ═══════════════════════════════════════════════════════════

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function LabellingGame({ missionId, exercise: exProp, onComplete, giveHintRef }) {
  // Authored exercises live in the admin store; fall back to anything
  // passed in directly (e.g. bundled curriculum data).
  const exercise = useMemo(
    () => getExercise(missionId) || exProp || null,
    [missionId, exProp]
  );

  const markers = useMemo(
    () => (exercise?.markers || []).filter(m => m.label && m.label.trim()),
    [exercise]
  );

  const [solved, setSolved] = useState({});      // markerId -> true
  const [selected, setSelected] = useState(null); // label id held by the player
  const [wrong, setWrong] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [hints, setHints] = useState(0);
  const [done, setDone] = useState(false);
  const [tray, setTray] = useState([]);

  const finishedRef = useRef(false);

  useEffect(() => {
    setSolved({});
    setSelected(null);
    setWrong(null);
    setMistakes(0);
    setHints(0);
    setDone(false);
    finishedRef.current = false;
    setTray(shuffle(markers.map(m => m.id)));
  }, [markers]);

  const remaining = tray.filter(id => !solved[id]);

  const checkDone = useCallback((next) => {
    if (markers.length > 0 && Object.keys(next).length >= markers.length && !finishedRef.current) {
      finishedRef.current = true;
      Audio.playStar();
      setDone(true);
    }
  }, [markers.length]);

  const attempt = useCallback((labelId, markerId) => {
    if (labelId == null || solved[markerId]) return;
    if (labelId === markerId) {
      Audio.playPiecePlaced();
      setSolved(prev => {
        const next = { ...prev, [markerId]: true };
        checkDone(next);
        return next;
      });
      setSelected(null);
    } else {
      Audio.playWrong();
      setMistakes(m => m + 1);
      setWrong(markerId);
      setTimeout(() => setWrong(null), 450);
    }
  }, [solved, checkDone]);

  useEffect(() => {
    if (!giveHintRef) return;
    giveHintRef.current = () => {
      const next = markers.find(m => !solved[m.id]);
      if (!next) return;
      Audio.playHint();
      setHints(h => h + 1);
      setSolved(prev => {
        const n = { ...prev, [next.id]: true };
        checkDone(n);
        return n;
      });
    };
  }, [giveHintRef, markers, solved, checkDone]);

  const reset = () => {
    setSolved({});
    setSelected(null);
    setDone(false);
    finishedRef.current = false;
    setTray(shuffle(markers.map(m => m.id)));
    Audio.playClick();
  };

  if (!isPlayable(exercise)) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3 py-14 text-center">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
          <ImageOff className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-bold text-base text-white">No labelling exercise yet</h3>
        <p className="text-sm text-slate-400 max-w-sm">
          This mission needs a slide and at least two labelled markers. Build one
          in <span className="text-teal-300 font-semibold">Admin → Slide Labeller</span>,
          then it appears here automatically.
        </p>
      </div>
    );
  }

  const labelOf = (id) => markers.find(m => m.id === id)?.label || '';
  const progress = Math.round((Object.keys(solved).length / markers.length) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-500 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-slate-300 tabular-nums shrink-0">
          {Object.keys(solved).length}/{markers.length}
        </span>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold hover:bg-white/10 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Slide with marker overlay */}
      <div className="relative rounded-xl overflow-hidden border border-white/12 bg-slate-950 shadow-2xl select-none">
        <img
          src={exercise.image}
          alt={exercise.caption || 'Histopathology slide'}
          className="w-full block"
          draggable={false}
        />

        {markers.map((m, i) => {
          const isSolved = solved[m.id];
          const isWrong = wrong === m.id;
          const hot = exercise.markerStyle === 'hotspot';
          const armed = (selected != null || dragging != null) && !isSolved;

          return (
            <div
              key={m.id}
              onClick={() => selected != null && attempt(selected, m.id)}
              onDragOver={(e) => { if (!isSolved) e.preventDefault(); }}
              onDrop={(e) => {
                e.preventDefault();
                const id = Number(e.dataTransfer.getData('text/plain'));
                if (!Number.isNaN(id)) attempt(id, m.id);
                setDragging(null);
              }}
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            >
              {/* Pin */}
              <div
                className={`flex items-center justify-center rounded-full font-bold transition-all duration-200 ${
                  hot && !isSolved && !armed
                    ? 'w-9 h-9 bg-transparent ring-2 ring-white/25'
                    : isSolved
                    ? 'w-7 h-7 bg-emerald-400 text-slate-950 text-xs ring-2 ring-emerald-200/60 shadow-lg'
                    : isWrong
                    ? 'w-9 h-9 bg-rose-500 text-white text-xs ring-4 ring-rose-400/40 animate-pulse'
                    : armed
                    ? 'w-9 h-9 bg-teal-400/25 text-teal-100 text-xs ring-2 ring-dashed ring-teal-300 cursor-pointer'
                    : 'w-7 h-7 bg-amber-400 text-slate-950 text-xs ring-2 ring-amber-200/50 shadow-lg'
                }`}
              >
                {isSolved ? <Check className="w-4 h-4" /> : hot && !armed ? '' : i + 1}
              </div>

              {/* Answer, revealed on the slide once correct */}
              {isSolved && (
                <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md bg-slate-950/90 border border-emerald-400/40 text-emerald-200 text-[11px] font-semibold shadow-lg">
                  {labelOf(m.id)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {exercise.caption && (
        <p className="text-xs text-slate-400 text-center -mt-1">{exercise.caption}</p>
      )}

      {/* Label tray */}
      {remaining.length > 0 ? (
        <div className="flex flex-col gap-2.5">
          <p className="text-xs text-slate-400 text-center">
            Drag each term onto its marker — or tap the term, then tap the marker.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {remaining.map(id => {
              const isSel = selected === id;
              return (
                <button
                  key={id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', String(id));
                    e.dataTransfer.effectAllowed = 'move';
                    setDragging(id);
                  }}
                  onDragEnd={() => setDragging(null)}
                  onClick={() => {
                    Audio.playClick();
                    setSelected(prev => (prev === id ? null : id));
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-grab active:cursor-grabbing max-w-[280px] text-left ${
                    isSel
                      ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 scale-105 shadow-lg'
                      : 'bg-white/6 border border-white/12 text-slate-100 hover:border-teal-400/60 hover:bg-white/10'
                  } ${dragging === id ? 'opacity-40' : ''}`}
                >
                  {labelOf(id)}
                </button>
              );
            })}
          </div>
        </div>
      ) : !done && (
        <p className="text-center text-sm text-teal-300 font-semibold">All labels placed.</p>
      )}

      {/* Completion */}
      {done && (
        <div className="rounded-2xl bg-gradient-to-br from-teal-500/15 to-fuchsia-500/15 border border-teal-400/30 p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-teal-400/20 border border-teal-300/40 flex items-center justify-center text-teal-300">
            <Trophy className="w-6 h-6" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-heading font-bold text-lg text-white">Slide fully labelled</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {mistakes === 0 && hints === 0
                ? 'Flawless — every structure identified first time.'
                : `${mistakes} misidentification${mistakes === 1 ? '' : 's'}, ${hints} hint${hints === 1 ? '' : 's'}.`}
            </p>
          </div>
          <button
            onClick={() => onComplete && onComplete({ hintsUsed: hints, mistakes })}
            className="w-full sm:w-auto shrink-0 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-fuchsia-500 text-slate-950 font-bold text-sm shadow-lg hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Continue to MCQs
          </button>
        </div>
      )}

      {exercise.credit && (
        <p className="text-[11px] text-slate-500 text-center">Image: {exercise.credit}</p>
      )}
    </div>
  );
}
