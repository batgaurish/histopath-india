import React, { useState, useEffect, useRef } from 'react';
import { getMission, getTopicById } from '../data/topics';
import { getQuestions } from '../data/questions';
import { saveMissionProgress } from '../utils/storage';
import { Timer } from '../utils/timer';
import { ArrowLeft, Lightbulb, Gamepad2, FileText, Clock, RotateCcw } from 'lucide-react';

import MatchingGame from '../components/games/MatchingGame';
import LabellingGame from '../components/games/LabellingGame';
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
            className="btn-ghost p-2.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
              {topic.title}
            </span>
            <h2 className="font-heading font-extrabold text-xl md:text-2xl text-white">
              {mission.title}
            </h2>
          </div>
        </div>

        {/* Timer & Hint Toolbar */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <div className="btn-ghost flex items-center gap-2 px-3 py-2 text-xs font-mono font-bold" style={{ color: 'var(--gold)' }}>
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{Timer.format(seconds)}</span>
          </div>

          {activeTab === 'game' && (
            <button
              onClick={handleHintClick}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold text-xs cursor-pointer transition-all active:scale-95"
              style={{ background: 'rgba(251,191,36,.12)', border: '1px solid rgba(251,191,36,.3)', color: 'var(--gold)' }}
            >
              <Lightbulb className="w-4 h-4 text-amber-400 animate-pulse" /> Hint
            </button>
          )}
        </div>
      </div>

      {/* Mission Mode Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit" style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)' }}>
        <button
          onClick={() => setActiveTab('game')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'game' ? 'btn-primary' : 'hover:text-white'
          }`}
          style={activeTab !== 'game' ? { color: 'var(--text-secondary)' } : undefined}
        >
          <Gamepad2 className="w-4 h-4" /> Exercise
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'quiz' ? 'btn-primary' : 'hover:text-white'
          }`}
          style={activeTab !== 'quiz' ? { color: 'var(--text-secondary)' } : undefined}
        >
          <FileText className="w-4 h-4" /> Quiz ({questions.length})
        </button>
      </div>

      {/* Main Interactive Game/Quiz Canvas Area */}
      <div className="card w-full p-4 md:p-7 min-h-[460px] flex flex-col justify-center items-center relative overflow-hidden">
        {activeTab === 'game' ? (
          <>
            {mission.gameType === 'matching' && (
              <MatchingGame
                pairs={mission.pairs}
                onComplete={handleGameComplete}
                giveHintRef={giveHintRef}
              />
            )}

            {(mission.gameType === 'labelling' || mission.gameType === 'jigsaw') && (
              <LabellingGame
                missionId={missionId}
                exercise={mission.labelling}
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
