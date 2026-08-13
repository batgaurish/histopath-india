import React from 'react';
import { getTopicById, getTopicMissions } from '../data/topics';
import { getTopicProgress } from '../utils/storage';
import { ArrowLeft, Star, Play, Lock } from 'lucide-react';

export default function TopicDetailView({ topicId, onBack, onSelectMission }) {
  const topic = getTopicById(topicId);
  const missions = getTopicMissions(topicId);
  const progress = getTopicProgress(topicId);

  if (!topic) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-8 flex flex-col gap-8">
      {/* Header Bar */}
      <div className="flex flex-col gap-4">
        <button
          onClick={onBack}
          className="self-start flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-white/10 text-xs font-semibold text-gray-300 hover:text-white cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Topics
        </button>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-teal-500/30 flex items-center justify-center text-3xl shadow-lg">
            {topic.icon}
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-gradient">
              {topic.title}
            </h2>
            <p className="text-xs md:text-sm text-gray-400">
              {topic.shaferRef} — {topic.description}
            </p>
          </div>
        </div>
      </div>

      {/* Stages & Missions */}
      <div className="flex flex-col gap-8">
        {topic.stages.map((stage, sIdx) => (
          <div key={stage.id} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-white/10 pb-2">
              <span className="w-7 h-7 rounded-lg bg-teal-400/10 border border-teal-400/30 text-teal-300 font-bold text-xs flex items-center justify-center">
                {sIdx + 1}
              </span>
              <h3 className="font-heading font-bold text-lg text-gray-200">
                {stage.title}
              </h3>
            </div>

            {/* Mission Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stage.missions.map((m) => {
                const mProgress = progress[m.id];
                const isCompleted = mProgress?.completed;
                const stars = mProgress?.stars || 0;

                const gameTypeBadges = {
                  matching: { label: '🔗 Matching', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
                  jigsaw: { label: '🧩 Jigsaw Puzzle', color: 'bg-teal-500/20 text-teal-300 border-teal-500/40' },
                  differences: { label: '🔍 Spot Differences', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
                  crossword: { label: '✏️ Crossword', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
                };

                const badge = gameTypeBadges[m.gameType] || { label: '🎮 Game', color: 'bg-slate-800 text-gray-300' };

                return (
                  <div
                    key={m.id}
                    onClick={() => onSelectMission(m.id)}
                    className="glass-panel glass-panel-hover border border-white/10 p-5 rounded-2xl flex flex-col justify-between gap-4 cursor-pointer group shadow-lg"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${badge.color}`}>
                          {badge.label}
                        </span>

                        <div className="flex items-center gap-1">
                          {[1, 2, 3].map((s) => (
                            <Star
                              key={`star-${s}`}
                              className={`w-3.5 h-3.5 ${
                                s <= stars
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-gray-600 fill-transparent'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-heading font-bold text-base text-white group-hover:text-teal-300 transition-colors">
                          {m.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          {m.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-semibold">
                      <span className={isCompleted ? 'text-emerald-400' : 'text-gray-400'}>
                        {isCompleted ? '✓ Completed' : 'Ready to Start'}
                      </span>

                      <span className="w-8 h-8 rounded-xl bg-teal-400/10 border border-teal-400/30 text-teal-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-teal-300" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
