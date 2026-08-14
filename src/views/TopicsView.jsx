import React from 'react';
import { TOPICS } from '../data/topics';
import { getTopicProgress } from '../utils/storage';
import { usePlayer } from '../hooks/usePlayer';
import { Star, ChevronRight, BookOpen, CheckCircle2 } from 'lucide-react';

const MAX_STARS_PER_MISSION = 3;

export default function TopicsView({ onSelectTopic }) {
  usePlayer(); // re-render when progress changes

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-7">
      <header className="flex flex-col gap-2">
        <span
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
          style={{ color: 'var(--accent-ink)' }}
        >
          <BookOpen className="w-4 h-4" /> Curriculum
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)]">
          Oral &amp; Maxillofacial Pathology
        </h1>
        <p className="text-sm max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          Six domains from Neville's textbook. Each holds two stages of interactive
          missions followed by high-yield MCQs.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOPICS.map((topic, i) => {
          const progress = getTopicProgress(topic.id);
          const totalMissions = (topic.stages || []).reduce(
            (n, s) => n + (s.missions || []).length, 0
          );

          let stars = 0;
          let completed = 0;
          Object.values(progress).forEach(m => {
            if (m?.completed) { completed++; stars += m.stars || 0; }
          });

          const maxStars = totalMissions * MAX_STARS_PER_MISSION;
          const pct = totalMissions ? Math.round((completed / totalMissions) * 100) : 0;
          const isDone = totalMissions > 0 && completed === totalMissions;

          return (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className="card-interactive p-5 flex flex-col gap-4 text-left fade-up group"
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110"
                  style={{ background: 'var(--surface-sunken)', border: '1px solid var(--border-subtle)' }}
                >
                  {topic.icon}
                </span>

                {isDone ? (
                  <span
                    className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg"
                    style={{ background: 'rgba(52,211,153,.12)', color: 'var(--success-ink)' }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold" style={{ color: 'var(--gold-ink)' }}>
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="tabular-nums">{stars}/{maxStars}</span>
                  </span>
                )}
              </div>

              <div className="flex-1">
                <h2 className="font-heading font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-ink)] transition-colors">
                  {topic.title}
                </h2>
                <p className="text-xs mt-1 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {topic.description}
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span style={{ color: 'var(--text-muted)' }}>{topic.textbookRef}</span>
                  <span className="tabular-nums" style={{ color: 'var(--accent-ink)' }}>
                    {completed}/{totalMissions}
                  </span>
                </div>

                <div className="track h-1.5">
                  <div style={{ width: `${pct}%` }} />
                </div>

                <span
                  className="flex items-center justify-end gap-0.5 text-xs font-bold pt-0.5 transition-transform group-hover:translate-x-1"
                  style={{ color: 'var(--accent-ink)' }}
                >
                  {completed > 0 ? 'Continue' : 'Start'} <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
