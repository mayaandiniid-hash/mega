import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider, useAuth } from './lib/authContext';
import { LoginPage } from './components/auth/LoginPage';
import { AurelOnboarding } from './components/onboarding/AurelOnboarding';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { SearchModal } from './components/common/SearchModal';
import { HomeDashboard } from './components/dashboard/HomeDashboard';
import { SubjectsPage } from './components/subjects/SubjectsPage';
import { LearningReader } from './components/learning/LearningReader';
import { QuizBankPage } from './components/quiz/QuizBankPage';
import { QuizModal } from './components/quiz/QuizModal';
import { RewardsPage } from './components/rewards/RewardsPage';
import { MiniGamesPage } from './components/games/MiniGamesPage';
import { RankingPage } from './components/ranking/RankingPage';
import { HistoryPage } from './components/history/HistoryPage';
import { WalletTransactionsPage } from './components/wallet/WalletTransactionsPage';
import { HelpCenterPage } from './components/help/HelpCenterPage';
import { NotificationsPage } from './components/notifications/NotificationsPage';
import { AccountSettingsPage } from './components/account/AccountSettingsPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Subject, Chapter } from './types';

const MainAppContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  // Navigation state
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Active Reader state
  const [readingSubject, setReadingSubject] = useState<Subject | null>(null);
  const [readingChapter, setReadingChapter] = useState<Chapter | null>(null);

  // Active Quiz Modal state
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [selectedSubjectIdForPage, setSelectedSubjectIdForPage] = useState<string | undefined>(undefined);
  const [initialGameId, setInitialGameId] = useState<string | undefined>(undefined);

  // 1. If not authenticated, show Login page
  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  // 2. If onboarding not completed, show Flying Cloud Aurel Onboarding
  if (!user.profile?.onboardingCompleted) {
    return (
      <AurelOnboarding
        onComplete={() => {
          setActiveTab('home');
        }}
      />
    );
  }

  // 3. If reading a chapter, show Fullscreen Learning Reader
  if (readingSubject && readingChapter) {
    return (
      <LearningReader
        subject={readingSubject}
        chapter={readingChapter}
        onBack={() => {
          setReadingSubject(null);
          setReadingChapter(null);
        }}
        onLaunchQuiz={(quizId) => {
          setActiveQuizId(quizId);
        }}
      />
    );
  }

  const handleOpenReader = (subject: Subject, chapter: Chapter) => {
    setReadingSubject(subject);
    setReadingChapter(chapter);
  };

  const handleLaunchQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
  };

  const handleOpenSubject = (subjectId: string) => {
    setSelectedSubjectIdForPage(subjectId);
    setActiveTab('subjects');
  };

  const handleLaunchGame = (gameId: string) => {
    setInitialGameId(gameId);
    setActiveTab('games');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900 font-sans selection:bg-sky-200 selection:text-sky-900">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Routed Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <HomeDashboard
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onLaunchQuiz={handleLaunchQuiz}
            onOpenSubject={handleOpenSubject}
            onLaunchGame={handleLaunchGame}
          />
        )}

        {activeTab === 'subjects' && (
          <SubjectsPage
            onOpenReader={handleOpenReader}
            onLaunchQuiz={handleLaunchQuiz}
            selectedSubjectId={selectedSubjectIdForPage}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizBankPage onLaunchQuiz={handleLaunchQuiz} />
        )}

        {activeTab === 'rewards' && <RewardsPage />}

        {activeTab === 'games' && <MiniGamesPage initialGameId={initialGameId} />}

        {activeTab === 'ranking' && <RankingPage />}

        {activeTab === 'history' && (
          <HistoryPage onLaunchQuiz={handleLaunchQuiz} />
        )}

        {activeTab === 'transactions' && <WalletTransactionsPage />}

        {activeTab === 'help' && <HelpCenterPage />}

        {activeTab === 'notifications' && <NotificationsPage />}

        {activeTab === 'account' && <AccountSettingsPage />}

        {activeTab === 'settings' && <AccountSettingsPage />}

        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer info (Desktop) */}
      <footer className="hidden lg:block bg-white border-t border-slate-200/80 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-extrabold text-slate-700">
            <span>AURELIA EDU</span>
            <span className="text-slate-300">•</span>
            <span className="text-sky-600 font-medium text-[11px]">Platform Pembelajaran Terpersonalisasi Indonesia</span>
          </div>
          <div>© 2026 AURELIA EDU. Hak Cipta Dilindungi Undang-Undang.</div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSubject={handleOpenSubject}
        onSelectReward={() => setActiveTab('rewards')}
        onSelectGame={handleLaunchGame}
      />

      {/* Interactive 5-Lives Quiz Modal */}
      {activeQuizId && (
        <QuizModal
          quizId={activeQuizId}
          isOpen={!!activeQuizId}
          onClose={() => setActiveQuizId(null)}
          onOpenRewards={() => setActiveTab('rewards')}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
};

const rootElement = typeof document !== 'undefined' ? document.getElementById('root') : null;
if (rootElement && !rootElement.hasChildNodes()) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;
