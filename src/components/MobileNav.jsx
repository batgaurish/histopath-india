import React from 'react';
import { Home, BookOpen, Trophy, User, Info } from 'lucide-react';

export default function MobileNav({ currentView, navigateTo }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d0f17]/95 backdrop-blur-lg border-t border-white/10 px-3 py-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            currentView === 'home'
              ? 'text-teal-300 font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => navigateTo('topics')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            currentView === 'topics' || currentView === 'topic' || currentView === 'mission'
              ? 'text-teal-300 font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px]">Topics</span>
        </button>

        <button
          onClick={() => navigateTo('leaderboard')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            currentView === 'leaderboard'
              ? 'text-teal-300 font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[10px]">Scores</span>
        </button>

        <button
          onClick={() => navigateTo('avatar')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            currentView === 'avatar'
              ? 'text-teal-300 font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Avatar</span>
        </button>

        <button
          onClick={() => navigateTo('about')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            currentView === 'about'
              ? 'text-teal-300 font-bold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Info className="w-5 h-5" />
          <span className="text-[10px]">About</span>
        </button>
      </div>
    </nav>
  );
}
