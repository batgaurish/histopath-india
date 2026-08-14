import React from 'react';
import { getTopicById } from '../data/topics';
import { getTopicProgress } from '../utils/storage';
import { usePlayer } from '../hooks/usePlayer';
import { ArrowLeft, Star, Play, Check } from 'lucide-react';

// Each badge pairs an accessible ink for the label with a pale tint behind it.
const GAME_BADGES = {
  matching:    { label: 'Matching',            ink: 'var(--accent-2-ink)', bg: 'var(--accent-2-soft)' },
  labelling:   { label: 'Labelling',           ink: 'var(--accent-ink)',   bg: 'var(--accent-soft)' },
  jigsaw:      { label: 'Labelling',           ink: 'var(--accent-ink)',   bg: 'var(--accent-soft)' },
  differences: { label: 'Spot the difference', ink: 'var(--gold-ink)',     bg: 'var(--gold-soft)' },
  crossword:   { label: 'Crossword',           ink: 'var(--success-ink)',  bg: 'var(--success-soft)' },
};

export default function TopicDetailView({ topicId, onBack, onSelectMission }) {
  usePlayer();
  const topic = getTopicById(topicId);
  const progress = getTopicProgress(topicId);

  if (!topic) return null;

  const allMissions = (topic.stages || []).flatMap(s => s.missions || []);
  const completed = allMissions.filter(m => progress[m.id]?.completed).length;
  const pct = allMissions.length ? Math.round((completed / allMissions.length) * 100) : 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-8 flex flex-col gap-8">
      {/* Topic header */}
      <header className="flex flex-col gap-4">
        <button
          onClick={onBack}
          className="btn-ghost self-start flex items-center gap-2 px-3 py-2 text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> All topics
        </button>

        <div className="flex items-start gap-4">
          <span
            className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: 'var(--surface-sunken)', border: '1px solid var(--border-subtle)' }}
          >
            {topic.icon}
          </span>

          <div className="min-w-0 flex-1">
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[var(--text-primary)]">
              {topic.title}
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              {topic.description}
            </p>
            <p className="text-xs mt-1.5 font-semibold" style={{ color: 'var(--text-muted)' }}>
              {topic.textbookRef}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="track h-2 flex-1 max-w-sm">
            <div style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs font-semibold tabular-nums" style={{ color: 'var(--text-secondary)' }}>
            {completed}/{allMissions.length} missions
          </span>
        </div>
      </header>

      {/* Stages */}
      {topic.stages.map((stage, sIdx) => (
        <section key={stage.id} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 pb-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <span
              className="w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center"
              style={{ background: 'var(--accent-soft)', color: 'var(--accent-ink)', border: '1px solid var(--accent-border)' }}
            >
              {sIdx + 1}
            </span>
            <h2 className="font-heading font-bold text-base text-[var(--text-primary)]">{stage.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {stage.missions.map((m, i) => {
              const p = progress[m.id];
              const stars = p?.stars || 0;
              const isDone = p?.completed;
              const badge = GAME_BADGES[m.gameType] || { label: 'Game', ink: 'var(--text-secondary)', bg: 'var(--surface-sunken)' };

              return (
                <button
                  key={m.id}
                  onClick={() => onSelectMission(m.id)}
                  className="card-interactive p-4 flex flex-col gap-3 text-left group fade-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide"
                      style={{ background: badge.bg, color: badge.ink }}
                    >
                      {badge.label}
                    </span>

                    <span className="flex items-center gap-0.5 shrink-0">
                      {[1, 2, 3].map(s => (
                        <Star
                          key={s}
                          className="w-3.5 h-3.5"
                          style={{
                            color: s <= stars ? 'var(--gold)' : 'var(--border-strong)',
                            fill: s <= stars ? 'var(--gold)' : 'transparent',
                          }}
                        />
                      ))}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-ink)] transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                      {m.subtitle}
                    </p>
                  </div>

                  <div
                    className="flex items-center justify-between pt-2.5 text-xs font-semibold"
                    style={{ borderTop: '1px solid var(--border-subtle)' }}
                  >
                    <span
                      className="flex items-center gap-1"
                      style={{ color: isDone ? 'var(--success)' : 'var(--text-muted)' }}
                    >
                      {isDone ? <><Check className="w-3.5 h-3.5" /> Completed</> : 'Not started'}
                    </span>

                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ background: 'var(--accent-soft)', color: 'var(--accent-ink)' }}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
