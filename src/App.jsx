import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import Guide from './components/Guide';

import HomeView from './views/HomeView';
import TopicsView from './views/TopicsView';
import TopicDetailView from './views/TopicDetailView';
import MissionView from './views/MissionView';
import AvatarView from './views/AvatarView';
import LeaderboardView from './views/LeaderboardView';
import AboutView from './views/AboutView';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-xl mx-auto my-12 p-8 glass-panel border border-rose-500/40 rounded-3xl flex flex-col items-center gap-4 text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <h2 className="font-heading font-bold text-xl text-rose-300">
            Something went wrong while rendering
          </h2>
          <p className="text-xs text-gray-400">
            {this.state.error?.toString() || 'An unexpected error occurred.'}
          </p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 rounded-xl bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold cursor-pointer"
            >
              Try Again
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-bold cursor-pointer"
            >
              Reset App Data & Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'topics' | 'topic' | 'mission' | 'leaderboard' | 'avatar' | 'about'
  const [selectedTopicId, setSelectedTopicId] = useState('oral_mucosa');
  const [selectedMissionId, setSelectedMissionId] = useState('om_m1');
  const [guideMessage, setGuideMessage] = useState('Welcome to HistoPath India! Explore topics, play games, and test your histology knowledge.');

  const navigateTo = (view, topicId = null, missionId = null) => {
    if (topicId) setSelectedTopicId(topicId);
    if (missionId) setSelectedMissionId(missionId);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0d0f17] text-gray-100 flex flex-col pb-20 md:pb-8">
        {/* Top Header */}
        <Header currentView={currentView} navigateTo={navigateTo} />

        {/* Main View Router */}
        <main className="flex-1">
          {currentView === 'home' && (
            <HomeView navigateTo={navigateTo} />
          )}

          {currentView === 'topics' && (
            <TopicsView 
              onSelectTopic={(tid) => navigateTo('topic', tid)} 
            />
          )}

          {currentView === 'topic' && (
            <TopicDetailView
              topicId={selectedTopicId}
              onBack={() => navigateTo('topics')}
              onSelectMission={(mid) => navigateTo('mission', selectedTopicId, mid)}
            />
          )}

          {currentView === 'mission' && (
            <MissionView
              missionId={selectedMissionId}
              onBack={() => navigateTo('topic', selectedTopicId)}
              onCompleteMission={() => navigateTo('topic', selectedTopicId)}
            />
          )}

          {currentView === 'leaderboard' && (
            <LeaderboardView />
          )}

          {currentView === 'avatar' && (
            <AvatarView />
          )}

          {currentView === 'about' && (
            <AboutView />
          )}
        </main>

        {/* Guide Assistant */}
        <Guide message={guideMessage} onClose={() => setGuideMessage('')} />

        {/* Mobile Bottom Navbar for Phone Browsers */}
        <MobileNav currentView={currentView} navigateTo={navigateTo} />
      </div>
    </ErrorBoundary>
  );
}
