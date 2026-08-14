import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MobileNav from './components/MobileNav';

import HomeView from './views/HomeView';
import TopicsView from './views/TopicsView';
import TopicDetailView from './views/TopicDetailView';
import MissionView from './views/MissionView';
import AvatarView from './views/AvatarView';
import LeaderboardView from './views/LeaderboardView';
import AboutView from './views/AboutView';
import AdminView from './views/AdminView';

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
        <div className="w-full max-w-xl mx-auto my-12 p-8 glass-panel border border-[var(--danger)]/40 rounded-3xl flex flex-col items-center gap-4 text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <h2 className="font-heading font-bold text-xl text-[var(--danger-ink)]">
            Something went wrong while rendering
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            {this.state.error?.toString() || 'An unexpected error occurred.'}
          </p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent-ink)] text-xs font-bold cursor-pointer"
            >
              Try Again
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.hash = '';
                window.location.reload();
              }}
              className="px-4 py-2 rounded-xl bg-[var(--danger-soft)] border border-[var(--danger)]/40 text-[var(--danger-ink)] text-xs font-bold cursor-pointer"
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
  const [currentView, setCurrentView] = useState('home'); 
  const [selectedTopicId, setSelectedTopicId] = useState('odontogenic_tumors_cysts');
  const [selectedMissionId, setSelectedMissionId] = useState('otc_m1');

  // Parse Hash URL on load and hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setCurrentView('home');
        return;
      }

      const parts = hash.split('/');
      const route = parts[0];
      const param = parts[1];

      if (route === 'topic' && param) {
        setSelectedTopicId(param);
        setCurrentView('topic');
      } else if (route === 'mission' && param) {
        setSelectedMissionId(param);
        setCurrentView('mission');
      } else if (['home', 'topics', 'leaderboard', 'avatar', 'about', 'admin'].includes(route)) {
        setCurrentView(route);
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view, topicId = null, missionId = null) => {
    if (view === 'topic' && (topicId || selectedTopicId)) {
      window.location.hash = `#topic/${topicId || selectedTopicId}`;
    } else if (view === 'mission' && (missionId || selectedMissionId)) {
      window.location.hash = `#mission/${missionId || selectedMissionId}`;
    } else {
      window.location.hash = `#${view}`;
    }
    window.scrollTo(0, 0);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col pb-24 md:pb-10">
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

          {currentView === 'admin' && (
            <AdminView navigateTo={navigateTo} />
          )}
        </main>

        {/* Mobile Bottom Navbar for Phone Browsers */}
        <MobileNav currentView={currentView} navigateTo={navigateTo} />
      </div>
    </ErrorBoundary>
  );
}
