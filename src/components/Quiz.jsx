import React, { useState } from 'react';
import { CheckCircle2, XCircle, Star, RotateCcw, ArrowRight, BookOpen } from 'lucide-react';
import { Audio } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function Quiz({ questions = [], onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [answered, setAnswered] = useState([]);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const letters = ['A', 'B', 'C', 'D'];
  const currentQ = questions[currentIdx];

  const handleSelectOption = (optIdx) => {
    if (selectedOpt !== null) return; // Prevent double click

    setSelectedOpt(optIdx);
    setShowExplanation(true);
    const isCorrect = optIdx === currentQ.a;
    const newAnswered = [...answered, isCorrect];
    setAnswered(newAnswered);

    if (isCorrect) {
      setScore(prev => prev + 1);
      Audio.playCorrect();
    } else {
      Audio.playWrong();
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setShowExplanation(false);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Finished Quiz
      setQuizFinished(true);
      const finalScore = score + (selectedOpt === currentQ.a ? 0 : 0); // score already updated
      const stars = score >= 5 ? 3 : score >= 3 ? 2 : score >= 1 ? 1 : 0;
      Audio.playMissionComplete();
      
      if (stars >= 2) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  const stars = score >= 5 ? 3 : score >= 3 ? 2 : score >= 1 ? 1 : 0;

  if (quizFinished) {
    return (
      <div className="w-full max-w-xl mx-auto p-6 glass-panel border border-teal-500/30 rounded-3xl flex flex-col items-center gap-6 text-center animate-in fade-in zoom-in duration-300">
        {/* Star Rating Header */}
        <div className="flex gap-3">
          {[1, 2, 3].map((s) => (
            <Star
              key={`star-${s}`}
              className={`w-12 h-12 transition-all duration-500 ${
                s <= stars
                  ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                  : 'text-gray-600 fill-transparent'
              }`}
            />
          ))}
        </div>

        <div>
          <h2 className="font-heading font-extrabold text-3xl text-gradient mb-1">
            {stars === 3 ? 'Perfect Score!' : stars === 2 ? 'Great Job!' : stars === 1 ? 'Good Effort!' : 'Keep Practicing!'}
          </h2>
          <p className="text-sm text-gray-400">
            You completed Shafer's Oral Pathology Quiz
          </p>
        </div>

        {/* Score Display */}
        <div className="text-5xl font-heading font-black text-amber-300 tracking-tight">
          {score} <span className="text-xl font-medium text-gray-400">/ {questions.length}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full pt-2">
          <button
            onClick={() => {
              setCurrentIdx(0);
              setSelectedOpt(null);
              setAnswered([]);
              setScore(0);
              setShowExplanation(false);
              setQuizFinished(false);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 glass-panel hover:bg-white/10 text-gray-200 font-semibold text-sm cursor-pointer transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Retry Quiz
          </button>

          <button
            onClick={() => {
              if (onComplete) onComplete({ score, stars, action: 'next' });
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-purple-600 hover:from-teal-300 hover:to-purple-500 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20 cursor-pointer transition-all hover:scale-105"
          >
            Continue Mission <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 flex flex-col gap-6">
      {/* Progress & Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
          <span>Shafer's MCQ {currentIdx + 1} of {questions.length}</span>
          <span className="text-teal-400 font-bold">Score: {score}</span>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-2">
          {questions.map((_, i) => (
            <div
              key={`dot-${i}`}
              className={`h-2 flex-1 rounded-full transition-all ${
                i < answered.length
                  ? answered[i]
                    ? 'bg-emerald-400 shadow-sm shadow-emerald-500/50'
                    : 'bg-rose-500 shadow-sm shadow-rose-500/50'
                  : i === currentIdx
                  ? 'bg-teal-400 animate-pulse'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-panel border border-white/10 p-5 md:p-6 rounded-2xl flex flex-col gap-5 shadow-xl">
        <h3 className="font-heading font-bold text-base md:text-lg text-gray-100 leading-snug">
          Q{currentIdx + 1}. {currentQ?.q}
        </h3>

        {/* Options List */}
        <div className="flex flex-col gap-3">
          {currentQ?.options?.map((opt, i) => {
            const isSelected = selectedOpt === i;
            const isCorrect = i === currentQ.a;
            const showResult = selectedOpt !== null;

            return (
              <button
                key={`opt-${i}`}
                onClick={() => handleSelectOption(i)}
                disabled={selectedOpt !== null}
                className={`w-full p-4 rounded-xl text-left border flex items-center justify-between text-xs md:text-sm font-medium transition-all cursor-pointer ${
                  showResult
                    ? isCorrect
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : isSelected
                      ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : 'bg-slate-900/40 border-white/5 opacity-50'
                    : 'glass-panel border-white/10 text-gray-200 hover:border-teal-400/50 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    showResult && isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-gray-300'
                  }`}>
                    {letters[i]}
                  </div>
                  <span>{opt}</span>
                </div>

                {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Textbook Explanation */}
        {showExplanation && (
          <div className="mt-2 p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs md:text-sm text-purple-200 flex flex-col gap-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-amber-300 text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" /> Shafer's Pathology Explanation
            </div>
            <p className="leading-relaxed">{currentQ?.exp}</p>
          </div>
        )}
      </div>

      {/* Next Button */}
      {selectedOpt !== null && (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-400 to-purple-600 hover:from-teal-300 hover:to-purple-500 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
        >
          {currentIdx + 1 < questions.length ? 'Next Question' : 'View Final Score'} <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
