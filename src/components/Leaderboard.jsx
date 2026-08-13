import React from 'react';
import { Trophy, Star, Medal } from 'lucide-react';
import { getLeaderboard } from '../utils/storage';

export default function Leaderboard() {
  const leaderboard = getLeaderboard();

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 flex flex-col gap-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 mb-3">
          <Trophy className="w-6 h-6" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-gradient">
          BDS Leaderboard
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mt-1">
          Top scores across Shafer's Oral Pathology curriculum
        </p>
      </div>

      <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs md:text-sm">
          <thead className="bg-slate-900/80 border-b border-white/10 text-gray-400 font-semibold">
            <tr>
              <th className="p-4 w-16 text-center">Rank</th>
              <th className="p-4">Student Name</th>
              <th className="p-4 text-center">Missions</th>
              <th className="p-4 text-right">Stars</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leaderboard.map((player) => (
              <tr 
                key={`rank-${player.rank}-${player.name}`}
                className={`transition-colors ${
                  player.isCurrentPlayer ? 'bg-teal-500/10' : 'hover:bg-white/5'
                }`}
              >
                <td className="p-4 text-center font-bold">
                  {player.rank === 1 ? (
                    <span className="text-amber-400 flex items-center justify-center gap-1"><Medal className="w-4 h-4" /> 1</span>
                  ) : player.rank === 2 ? (
                    <span className="text-slate-300">2</span>
                  ) : player.rank === 3 ? (
                    <span className="text-amber-600">3</span>
                  ) : (
                    <span className="text-gray-500">{player.rank}</span>
                  )}
                </td>

                <td className="p-4 font-semibold text-gray-200 flex items-center gap-2">
                  <span>{player.name}</span>
                  {player.isCurrentPlayer && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-teal-400/20 border border-teal-400/40 text-teal-300">
                      You
                    </span>
                  )}
                </td>

                <td className="p-4 text-center font-medium text-gray-400">
                  {player.missionsCompleted} / 36
                </td>

                <td className="p-4 text-right font-bold text-amber-300 flex items-center justify-end gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{player.totalStars}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
