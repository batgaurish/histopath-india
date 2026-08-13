import React from 'react';
import { TOPICS } from '../data/topics';
import { getTopicProgress } from '../utils/storage';
import { Star, ChevronRight, BookOpen } from 'lucide-react';

export default function TopicsView({ onSelectTopic }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" /> Shafer's Pathology Modules
        </div>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-gradient">
          Oral Pathology Curriculum
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
          Select a topic module to access 2 stages, 6 interactive game missions, and 30 textbook quiz questions.
        </p>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TOPICS.map((topic) => {
          const progress = getTopicProgress(topic.id);
          let topicStars = 0;
          let completedMissions = 0;
          const totalTopicMissions = 6;

          Object.values(progress).forEach((m) => {
            if (m.completed) {
              completedMissions++;
              topicStars += m.stars || 0;
            }
          });

          const pct = Math.round((completedMissions / totalTopicMissions) * 100);

          return (
            <div
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className="glass-panel glass-panel-hover border border-white/10 p-6 rounded-3xl flex flex-col justify-between gap-6 cursor-pointer group shadow-xl"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {topic.icon}
                  </div>
                  <div className="flex items-center gap-1 font-bold text-amber-300 text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{topicStars} / 18</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-teal-300 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                  <span>{topic.shaferRef}</span>
                  <span className="text-teal-400">{completedMissions}/{totalTopicMissions}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-400 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex items-center justify-end text-xs font-semibold text-teal-400 group-hover:translate-x-1 transition-transform pt-1">
                  Explore Missions <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
