import React from 'react';
import { Microscope, BookOpen, Trophy, Info, Home, Settings } from 'lucide-react';
import AvatarSVG from './avatar/AvatarSVG';
import { usePlayer, useStats } from '../hooks/usePlayer';

const NAV = [
  { id: 'home', label: 'Home', icon: Home, matches: ['home'] },
  { id: 'topics', label: 'Topics', icon: BookOpen, matches: ['topics', 'topic', 'mission'] },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, matches: ['leaderboard'] },
  { id: 'about', label: 'About', icon: Info, matches: ['about'] },
];

export default function Header({ currentView, navigateTo }) {
  const player = usePlayer();
  const stats = useStats();

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{ background: 'rgba(255,255,255,.86)', borderColor: 'var(--border-subtle)' }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
        >
          <span className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center text-[var(--text-primary)] shadow-lg group-hover:scale-105 transition-transform">
            <Microscope className="w-5 h-5" />
          </span>
          <span className="hidden sm:flex flex-col items-start leading-none">
            <span className="font-heading font-extrabold text-base text-[var(--text-primary)]">HistoPath</span>
            <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
              India
            </span>
          </span>
        </button>

        {/* Primary nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({ id, label, icon: Icon, matches }) => {
            const active = matches.includes(currentView);
            return (
              <button
                key={id}
                onClick={() => navigateTo(id)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  active ? 'text-[var(--text-primary)]' : 'hover:text-[var(--text-primary)]'
                }`}
                style={{
                  background: active ? 'var(--accent-soft)' : 'transparent',
                  color: active ? 'var(--accent-ink)' : 'var(--text-secondary)',
                }}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            );
          })}
        </nav>

        {/* Player summary */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: 'var(--gold-soft)', color: 'var(--gold-ink)' }}
            title={`${stats.totalStars} stars · ${stats.missionsCompleted} of ${stats.totalMissions} missions`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span className="tabular-nums">{stats.totalStars}</span>
          </div>

          <button
            onClick={() => navigateTo('admin')}
            aria-label="Admin"
            className={`p-2 rounded-lg transition-colors cursor-pointer ${currentView === 'admin' ? 'text-[var(--accent-2-ink)]' : 'hover:text-[var(--text-primary)]'}`}
            style={{
              background: currentView === 'admin' ? 'rgba(192,132,252,.14)' : 'transparent',
              color: currentView === 'admin' ? 'var(--accent-2-ink)' : 'var(--text-muted)',
            }}
          >
            <Settings className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={() => navigateTo('avatar')}
            aria-label="Edit your profile"
            className="rounded-full overflow-hidden transition-transform hover:scale-105 cursor-pointer shrink-0"
            style={{
              boxShadow: currentView === 'avatar'
                ? '0 0 0 2px var(--accent)'
                : '0 0 0 1px var(--border-default)',
            }}
          >
            <AvatarSVG {...player.avatar} size={34} />
          </button>
        </div>
      </div>
    </header>
  );
}
