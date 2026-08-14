import React from 'react';
import { Trophy, Star, UserPlus, Crown } from 'lucide-react';
import AvatarSVG from './avatar/AvatarSVG';
import { useLeaderboard } from '../hooks/usePlayer';
import { getTotalMissions, createPlayer } from '../utils/storage';

const RANK_STYLES = {
  1: { ring: 'ring-amber-400/60', chip: 'bg-amber-400 text-slate-950', label: '1st' },
  2: { ring: 'ring-slate-300/50', chip: 'bg-slate-300 text-slate-950', label: '2nd' },
  3: { ring: 'ring-orange-400/50', chip: 'bg-orange-400 text-slate-950', label: '3rd' },
};

export default function Leaderboard() {
  const rows = useLeaderboard();
  const totalMissions = getTotalMissions();

  const addPlayer = () => {
    const name = window.prompt('Name for the new player profile?');
    if (name && name.trim()) createPlayer(name.trim());
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 flex flex-col gap-6">
      <header className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-3">
          <Trophy className="w-6 h-6" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-gradient">
          Leaderboard
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-md mx-auto">
          Ranked by stars earned across the Oral &amp; Maxillofacial Pathology
          curriculum. Scores are stored on this device.
        </p>
      </header>

      {rows.length <= 1 && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-teal-500/10 border border-teal-400/25 text-teal-100 text-xs">
          <UserPlus className="w-4 h-4 shrink-0 mt-px" />
          <span>
            A leaderboard needs more than one profile. Add classmates on this
            device to compare progress — each keeps its own avatar and stars.
          </span>
        </div>
      )}

      <ol className="flex flex-col gap-2.5">
        {rows.map(p => {
          const style = RANK_STYLES[p.rank];
          const pct = totalMissions
            ? Math.round((p.missionsCompleted / totalMissions) * 100)
            : 0;

          return (
            <li
              key={p.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                p.isCurrentPlayer
                  ? 'bg-teal-500/10 border-teal-400/40'
                  : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
              }`}
            >
              {/* Rank */}
              <div className="w-9 shrink-0 flex justify-center">
                {style ? (
                  <span className={`px-1.5 py-0.5 rounded-md text-[11px] font-extrabold ${style.chip}`}>
                    {style.label}
                  </span>
                ) : (
                  <span className="text-sm font-bold text-slate-500 tabular-nums">{p.rank}</span>
                )}
              </div>

              {/* Avatar */}
              <div className={`shrink-0 rounded-full overflow-hidden ring-2 ${style?.ring || 'ring-white/12'}`}>
                <AvatarSVG {...p.avatar} size={44} />
              </div>

              {/* Identity + progress */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-white truncate">{p.name}</span>
                  {p.rank === 1 && p.totalStars > 0 && (
                    <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                  {p.isCurrentPlayer && (
                    <span className="shrink-0 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-400/20 border border-teal-400/40 text-teal-300">
                      You
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate">{p.role}</p>

                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden max-w-[180px]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 tabular-nums">
                    {p.missionsCompleted}/{totalMissions}
                  </span>
                </div>
              </div>

              {/* Stars */}
              <div className="shrink-0 flex items-center gap-1.5 pl-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-amber-300 tabular-nums">{p.totalStars}</span>
              </div>
            </li>
          );
        })}
      </ol>

      <button
        onClick={addPlayer}
        className="self-center flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/12 text-slate-200 text-xs font-semibold hover:bg-white/10 cursor-pointer transition-colors"
      >
        <UserPlus className="w-4 h-4" /> Add another player
      </button>
    </div>
  );
}
