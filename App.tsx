
import React, { useState, useCallback } from 'react';
import type { Badge, ChatbotConfig } from './types';
import { Page, Personality } from './types';
import { LandingPage } from './components/LandingPage';
import { LearningModule } from './components/LearningModule';
import { ChatbotBuilder } from './components/ChatbotBuilder';
import { Playground } from './components/Playground';
import { Gamification } from './components/Gamification';
import { INITIAL_BADGES } from './constants';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Landing);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [chatbotConfig, setChatbotConfig] = useState<ChatbotConfig>({
    name: "MyBot",
    personality: Personality.Friendly,
    rules: [],
  });

  const handleEarnBadge = useCallback((badgeId: string) => {
    setBadges(prevBadges =>
      prevBadges.map(b => (b.id === badgeId && !b.earned ? { ...b, earned: true } : b))
    );
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Landing:
        return <LandingPage onStart={() => setCurrentPage(Page.Learning)} />;
      case Page.Learning:
        return <LearningModule onComplete={handleEarnBadge} onFinishModule={() => setCurrentPage(Page.Builder)} />;
      case Page.Builder:
        return <ChatbotBuilder config={chatbotConfig} onConfigChange={setChatbotConfig} onContinue={() => setCurrentPage(Page.Playground)} />;
      case Page.Playground:
        return <Playground config={chatbotConfig} onGoBack={() => setCurrentPage(Page.Builder)} onEarnBadge={handleEarnBadge} />;
      default:
        return <LandingPage onStart={() => setCurrentPage(Page.Learning)} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
       {currentPage !== Page.Landing && <Gamification currentPage={currentPage} badges={badges} />}
       <main className={currentPage !== Page.Landing ? "pt-28" : ""}>
        {renderPage()}
       </main>
    </div>
  );
}

export default App;
