import React from 'react';
import { Microscope, Play, Star, BookOpen, Puzzle, Award, CheckCircle2 } from 'lucide-react';
import { getCurrentPlayer, getOverallStats, getAvatar } from '../utils/storage';
import { AvatarSVG } from '../components/AvatarEditor';

export default function HomeView({ navigateTo }) {
  const player = getCurrentPlayer() || { name: 'Dental Student' };
  const avatar = getAvatar() || { skinTone: 0, hairStyle: 0, hairColor: 0, accessory: 0, eyeStyle: 0 };
  const stats = getOverallStats();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-10">
      {/* Hero Section */}
      <div className="relative glass-panel border border-white/10 rounded-3xl p-6 md:p-12 overflow-hidden shadow-2xl">
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-xs font-semibold">
              <Microscope className="w-4 h-4 text-amber-400" />
              <span>Neville's Textbook Aligned Curriculum</span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-white leading-tight">
              HistoPath <span className="text-gradient">India</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
              Master Oral Histology & Pathology through interactive histological matching games, microscopic jigsaw puzzles, tissue difference spotters, crosswords, and board-exam style MCQs.
            </p>

            {/* Quick Action Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('topics')}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-400 to-purple-600 hover:from-teal-300 hover:to-purple-500 text-slate-950 font-extrabold text-base shadow-xl shadow-teal-500/25 cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-5 h-5 fill-slate-950" /> Start Learning Now
              </button>
            </div>
          </div>

          {/* Player Quick Stats Profile Card */}
          <div className="lg:col-span-4 glass-panel border border-white/10 p-6 rounded-2xl flex flex-col gap-4 bg-slate-900/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-teal-400/40 flex items-center justify-center overflow-hidden shadow-inner p-1">
                <AvatarSVG
                  skinTone={avatar.skinTone || 0}
                  hairStyle={avatar.hairStyle || avatar.hair || 0}
                  hairColor={avatar.hairColor || 0}
                  accessory={avatar.accessory || 0}
                  eyeStyle={avatar.eyeStyle || 0}
                  size={44}
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-white">{player.name}</h3>
                <span className="text-xs text-teal-400 font-medium">BDS Student Candidate</span>
              </div>
            </div>

            <div className="h-px bg-white/10 w-full" />

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col items-center">
                <span className="text-amber-400 font-bold text-lg flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400" /> {stats.totalStars}
                </span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">Total Stars</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col items-center">
                <span className="text-teal-300 font-bold text-lg">
                  {stats.missionsCompleted} / {stats.totalMissions}
                </span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">Missions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel border border-white/10 p-5 rounded-2xl flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-400/10 border border-teal-400/30 flex items-center justify-center text-teal-300">
            <Puzzle className="w-5 h-5" />
          </div>
          <h4 className="font-heading font-bold text-base text-white">4 Interactive Game Modes</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Matching, Jigsaw Puzzles, Differences, and Crosswords tailored for mobile touch & desktop.
          </p>
        </div>

        <div className="glass-panel border border-white/10 p-5 rounded-2xl flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="font-heading font-bold text-base text-white">180 Neville's MCQs</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Comprehensive quiz bank with instant textbook explanations for every single option.
          </p>
        </div>

        <div className="glass-panel border border-white/10 p-5 rounded-2xl flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="font-heading font-bold text-base text-white">6 Core Dental Topics</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Oral Mucosa, Tooth Dev, Tooth Structure, Salivary Glands, Periodontium, and TMJ/Bone.
          </p>
        </div>

        <div className="glass-panel border border-white/10 p-5 rounded-2xl flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h4 className="font-heading font-bold text-base text-white">Installable Web App</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            PWA support enables installation on mobile phone home screens for offline study.
          </p>
        </div>
      </div>
    </div>
  );
}
