import React from 'react';
import { Home, BookOpen, Trophy, User, Settings } from 'lucide-react';

const ITEMS = [
  { id: 'home', label: 'Home', icon: Home, matches: ['home'] },
  { id: 'topics', label: 'Topics', icon: BookOpen, matches: ['topics', 'topic', 'mission'] },
  { id: 'leaderboard', label: 'Ranks', icon: Trophy, matches: ['leaderboard'] },
  { id: 'avatar', label: 'Profile', icon: User, matches: ['avatar'] },
  { id: 'admin', label: 'Admin', icon: Settings, matches: ['admin'] },
];

export default function MobileNav({ currentView, navigateTo }) {
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t backdrop-blur-xl"
      style={{
        background: 'rgba(11,13,20,.94)',
        borderColor: 'var(--border-subtle)',
        // Clear the iOS home indicator.
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-stretch justify-around max-w-md mx-auto px-1 py-1.5">
        {ITEMS.map(({ id, label, icon: Icon, matches }) => {
          const active = matches.includes(currentView);
          return (
            <button
              key={id}
              onClick={() => navigateTo(id)}
              aria-current={active ? 'page' : undefined}
              // 56px keeps every target above the 44px minimum.
              className="relative flex flex-col items-center justify-center gap-1 flex-1 min-w-0 min-h-[56px] rounded-xl transition-colors cursor-pointer"
              style={{ color: active ? 'var(--accent)' : 'var(--text-muted)' }}
            >
              {active && (
                <span
                  className="absolute top-0 w-8 h-0.5 rounded-full"
                  style={{ background: 'var(--accent)' }}
                />
              )}
              <Icon className="w-5 h-5" strokeWidth={active ? 2.4 : 2} />
              <span className={`text-[10px] leading-none ${active ? 'font-bold' : 'font-medium'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
