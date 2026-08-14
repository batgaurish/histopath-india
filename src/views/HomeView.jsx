import React from 'react';
import { Microscope, Play, Star, BookOpen, Puzzle, Award, CheckCircle2 } from 'lucide-react';
import AvatarSVG from '../components/avatar/AvatarSVG';
import { usePlayer, useStats } from '../hooks/usePlayer';

export default function HomeView({ navigateTo }) {
  const player = usePlayer();
  const avatar = player.avatar;
  const stats = useStats();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-10">
      {/* Hero Section */}
      <div className="relative glass-panel border border-[var(--border-subtle)] rounded-3xl p-6 md:p-12 overflow-hidden shadow-2xl">
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--accent-2-soft)] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--accent-soft)] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent-ink)] text-xs font-semibold">
              <Microscope className="w-4 h-4 text-[var(--gold-ink)]" />
              <span>Neville's Textbook Aligned Curriculum</span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-[var(--text-primary)] leading-tight">
              HistoPath <span className="text-gradient">India</span>
            </h1>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              Master Oral &amp; Maxillofacial Pathology for 3rd &amp; Final Year BDS, Dental Interns (CRRI), and MDS / PG Residents through interactive histological matching games, slide-labelling exercises, challenging crosswords, and high-yield Neville-aligned MCQs.
            </p>

            {/* Quick Action Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('topics')}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--accent)] hover:brightness-105 text-[var(--text-primary)] font-extrabold text-base shadow-xl  cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-5 h-5 fill-current" /> Start Pathology Quests
              </button>
            </div>
          </div>

          {/* Player Quick Stats Profile Card */}
          <div className="lg:col-span-4 glass-panel border border-[var(--border-subtle)] p-6 rounded-2xl flex flex-col gap-4 bg-[var(--surface-sunken)]/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--accent-border)] shrink-0">
                <AvatarSVG {...avatar} size={48} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[var(--text-primary)]">{player.name}</h3>
                <span className="text-xs text-[var(--accent-ink)] font-medium">{player.role}</span>
              </div>
            </div>

            <div className="h-px bg-[var(--surface-sunken)] w-full" />

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] flex flex-col items-center">
                <span className="text-[var(--gold-ink)] font-bold text-lg flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[var(--gold)]" /> {stats.totalStars}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-wider mt-0.5">Total Stars</span>
              </div>

              <div className="p-3 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] flex flex-col items-center">
                <span className="text-[var(--accent-ink)] font-bold text-lg">
                  {stats.missionsCompleted} / {stats.totalMissions}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-wider mt-0.5">Missions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel border border-[var(--border-subtle)] p-5 rounded-2xl flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent-ink)]">
            <Puzzle className="w-5 h-5" />
          </div>
          <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">4 Interactive Game Modes</h4>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Slide labelling, feature matching, spot-the-difference, and crosswords — built for touch and desktop.
          </p>
        </div>

        <div className="glass-panel border border-[var(--border-subtle)] p-5 rounded-2xl flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-2-soft)] border border-[var(--accent-2-border)] flex items-center justify-center text-[var(--accent-2-ink)]">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">180 Neville's MCQs</h4>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Comprehensive quiz bank with instant textbook explanations for every single option.
          </p>
        </div>

        <div className="glass-panel border border-[var(--border-subtle)] p-5 rounded-2xl flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--gold-soft)] border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold-ink)]">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">6 Core Dental Topics</h4>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Odontogenic tumours, epithelial pathology, salivary gland, bone, infectious, and soft-tissue lesions.
          </p>
        </div>

        <div className="glass-panel border border-[var(--border-subtle)] p-5 rounded-2xl flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--success-soft)] border border-[var(--success)]/40 flex items-center justify-center text-[var(--success-ink)]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">Installable Web App</h4>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            PWA support enables installation on mobile phone home screens for offline study.
          </p>
        </div>
      </div>
    </div>
  );
}
