import React from 'react';
import { Microscope, BookOpen, Trophy, User, Info, Home, Settings } from 'lucide-react';

export default function Header({ currentView, navigateTo }) {
  return (
    <header className="sticky top-0 z-50 bg-[#0d0f17]/90 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-purple-600 flex items-center justify-center text-gray-950 font-bold shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <Microscope className="w-6 h-6" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-lg text-gradient leading-tight">
              HistoPath
            </div>
            <div className="text-xs font-semibold text-amber-400 tracking-wider">
              India Edition
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={() => navigateTo('home')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentView === 'home'
                ? 'bg-white/10 text-teal-300'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="w-4 h-4" /> Home
          </button>

          <button
            onClick={() => navigateTo('topics')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentView === 'topics' || currentView === 'topic' || currentView === 'mission'
                ? 'bg-white/10 text-teal-300'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Topics
          </button>

          <button
            onClick={() => navigateTo('leaderboard')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentView === 'leaderboard'
                ? 'bg-white/10 text-teal-300'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Trophy className="w-4 h-4" /> Leaderboard
          </button>

          <button
            onClick={() => navigateTo('avatar')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentView === 'avatar'
                ? 'bg-white/10 text-teal-300'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-4 h-4" /> Avatar
          </button>

          <button
            onClick={() => navigateTo('admin')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentView === 'admin'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4 text-purple-400" /> Admin / Creator
          </button>

          <button
            onClick={() => navigateTo('about')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentView === 'about'
                ? 'bg-white/10 text-teal-300'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Info className="w-4 h-4" /> About
          </button>
        </nav>
      </div>
    </header>
  );
}
