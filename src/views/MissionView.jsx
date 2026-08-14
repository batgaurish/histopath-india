import React, { useState, useEffect, useRef } from 'react';
import { getMission, getTopicById } from '../data/topics';
import { getQuestions } from '../data/questions';
import { saveMissionProgress } from '../utils/storage';
import { Timer } from '../utils/timer';
import { ArrowLeft, Lightbulb, Gamepad2, FileText, Clock, RotateCcw } from 'lucide-react';

import MatchingGame from '../components/games/MatchingGame';
import JigsawGame from '../components/games/JigsawGame';
import DifferencesGame from '../components/games/DifferencesGame';
import CrosswordGame from '../components/games/CrosswordGame';
import Quiz from '../components/Quiz';

export default function MissionView({ missionId, onBack, onCompleteMission }) {
  const missionInfo = getMission(missionId);
  const [activeTab, setActiveTab] = useState('game'); // 'game' | 'quiz'
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const giveHintRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  if (!missionInfo) return null;
  const { mission, topic } = missionInfo;
  const questions = getQuestions(missionId);

  const handleGameComplete = (result) => {
    setIsTimerRunning(false);
    // Automatically switch to Quiz tab upon completing the game!
    setActiveTab('quiz');
  };

  const handleQuizComplete = (result) => {
    // Save results
    saveMissionProgress(missionId, {
      stars: result.stars,
      score: result.score,
      timeMs: seconds * 1000,
      topicId: topic.id,
    });

    if (onCompleteMission) {
      onCompleteMission(result);
    }
  };

  const handleHintClick = () => {
    if (giveHintRef.current) {
      giveHintRef.current();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 md:py-6 flex flex-col gap-6">
      {/* Top Navigation & Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl glass-panel border border-white/10 text-gray-300 hover:text-white cursor-pointer transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <span className="text-xs font-semibold text-teal-400 tracking-wide uppercase">
              {topic.title} Mission
            </span>
            <h2 className="font-heading font-extrabold text-xl md:text-2xl text-white">
              {mission.title}
            </h2>
          </div>
        </div>

        {/* Timer & Hint Toolbar */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass-panel border border-white/10 text-xs font-mono font-bold text-amber-300">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{Timer.format(seconds)}</span>
          </div>

          {activeTab === 'game' && (
            <button
              onClick={handleHintClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 hover:bg-amber-400/20 font-semibold text-xs cursor-pointer transition-all active:scale-95"
            >
              <Lightbulb className="w-4 h-4 text-amber-400 animate-pulse" /> Hint
            </button>
          )}
        </div>
      </div>

      {/* Mission Mode Tabs */}
      <div className="flex items-center gap-2 glass-panel p-1.5 rounded-2xl border border-white/10 w-fit">
        <button
          onClick={() => setActiveTab('game')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'game'
              ? 'bg-gradient-to-r from-teal-400 to-purple-600 text-slate-950 shadow-lg shadow-teal-500/20'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Gamepad2 className="w-4 h-4" /> 1. Interactive Game
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-gradient-to-r from-teal-400 to-purple-600 text-slate-950 shadow-lg shadow-teal-500/20'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText className="w-4 h-4" /> 2. Neville's Quiz ({questions.length} MCQs)
        </button>
      </div>

      {/* Main Interactive Game/Quiz Canvas Area */}
      <div className="w-full glass-panel border border-white/10 rounded-3xl p-4 md:p-8 min-h-[480px] flex flex-col justify-center items-center relative shadow-2xl overflow-hidden">
        {activeTab === 'game' ? (
          <>
            {mission.gameType === 'matching' && (
              <MatchingGame
                pairs={mission.pairs}
                onComplete={handleGameComplete}
                giveHintRef={giveHintRef}
              />
            )}

            {mission.gameType === 'jigsaw' && (
              <JigsawGame
                gridSize={3}
                imageDesc={mission.subtitle}
                onComplete={handleGameComplete}
                giveHintRef={giveHintRef}
              />
            )}

            {mission.gameType === 'differences' && (
              <DifferencesGame
                differences={mission.differences}
                onComplete={handleGameComplete}
                giveHintRef={giveHintRef}
              />
            )}

            {mission.gameType === 'crossword' && (
              <CrosswordGame
                puzzleData={mission.puzzleData}
                onComplete={handleGameComplete}
                giveHintRef={giveHintRef}
              />
            )}
          </>
        ) : (
          <Quiz
            questions={questions}
            onComplete={handleQuizComplete}
          />
        )}
      </div>
    </div>
  );
}
