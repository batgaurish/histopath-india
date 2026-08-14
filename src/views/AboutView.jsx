import React from 'react';
import { Microscope, BookOpen, GraduationCap, Award, Gamepad2, ShieldCheck } from 'lucide-react';
import { getTotalMissions } from '../utils/storage';
import { TOPICS } from '../data/topics';

function InfoCard({ icon: Icon, tint, title, children }) {
  return (
    <div className="card p-4 flex flex-col gap-2">
      <h3 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
        <Icon className="w-4 h-4" style={{ color: tint }} /> {title}
      </h3>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {children}
      </p>
    </div>
  );
}

export default function AboutView() {
  const totalMissions = getTotalMissions();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-8">
      <header className="text-center flex flex-col items-center gap-3">
        <span className="w-16 h-16 rounded-2xl bg-[var(--accent)] flex items-center justify-center text-[var(--text-primary)] shadow-xl">
          <Microscope className="w-8 h-8" />
        </span>
        <h1 className="font-heading font-extrabold text-3xl text-[var(--text-primary)]">
          About <span className="text-gradient">HistoPath India</span>
        </h1>
        <p className="text-sm max-w-xl" style={{ color: 'var(--text-secondary)' }}>
          A game-based learning platform for Indian dental students, aligned with
          Neville's <em>Oral &amp; Maxillofacial Pathology</em>.
        </p>
      </header>

      {/* Curriculum at a glance */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: TOPICS.length, label: 'Pathology domains' },
          { value: totalMissions, label: 'Interactive missions' },
          { value: `${totalMissions * 5}+`, label: 'MCQs' },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <div className="font-heading font-extrabold text-2xl text-gradient">{s.value}</div>
            <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <section className="card p-6 md:p-7 flex flex-col gap-5">
        <h2 className="flex items-center gap-2.5 font-heading font-bold text-lg" style={{ color: 'var(--accent-ink)' }}>
          <BookOpen className="w-5 h-5" /> How it works
        </h2>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Each mission pairs an interactive exercise with a set of MCQs. You label
          structures on real micrographs, match histological features to their
          diagnoses, and work through crosswords built from diagnostic terminology —
          then test recall immediately, while the pattern is fresh.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoCard icon={GraduationCap} tint="var(--accent-2)" title="Who it's for">
            3rd &amp; Final Year BDS students, dental interns (CRRI), NEET-MDS
            aspirants, and MDS postgraduate residents in Oral Pathology, OMR and OMFS.
          </InfoCard>

          <InfoCard icon={Award} tint="var(--gold)" title="Reference">
            Neville, Damm, Allen &amp; Chi — <em>Oral and Maxillofacial Pathology</em>.
            Chapters 5, 6 and 10–16.
          </InfoCard>

          <InfoCard icon={Gamepad2} tint="var(--accent)" title="Exercise types">
            Slide labelling on real micrographs, feature matching, spot-the-difference
            comparisons, and terminology crosswords.
          </InfoCard>

          <InfoCard icon={ShieldCheck} tint="var(--success)" title="Your data">
            Profiles, avatars and progress are stored in this browser only. Nothing is
            uploaded, and clearing site data resets everything.
          </InfoCard>
        </div>
      </section>

      <p className="text-xs text-center leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        A revision aid, not a substitute for textbook study or supervised
        microscopy. Always confirm diagnostic criteria against your prescribed text.
      </p>
    </div>
  );
}
