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
  );
}
