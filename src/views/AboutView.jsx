import React from 'react';
import { Microscope, BookOpen, GraduationCap, Award } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8">
      <div className="text-center flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-purple-600 flex items-center justify-center text-slate-950 shadow-xl shadow-teal-500/20">
          <Microscope className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-extrabold text-3xl text-gradient">
          About HistoPath India
        </h2>
        <p className="text-sm text-gray-400 max-w-xl">
          An interactive, game-based learning platform for Indian Dental Students (BDS / MDS) aligned with Neville's Textbook of Oral & Maxillofacial Pathology.
        </p>
      </div>

      <div className="glass-panel border border-white/10 p-6 md:p-8 rounded-3xl flex flex-col gap-6">
        <div className="flex items-center gap-3 font-heading font-bold text-lg text-teal-400">
          <BookOpen className="w-5 h-5" />
          <span>Curriculum Overview</span>
        </div>

        <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
          Oral Histology & Pathology forms the core foundation of dental medicine in India. Designed to help dental undergraduate and postgraduate students master complex microscopic structures through active gamified recall and self-assessment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col gap-2">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-400" /> Target Audience
            </h4>
            <p className="text-xs text-gray-400">
              3rd & Final Year BDS Students, Dental Interns (CRRI), NEET-MDS Aspirants, and MDS Postgraduate Residents (Oral Pathology, OMR, OMFS) across dental institutions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col gap-2">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" /> Standard Reference
            </h4>
            <p className="text-xs text-gray-400">
              Based on Neville's Oral & Maxillofacial Pathology (6th Edition).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
