import React, { useState } from 'react';
import { ViewType } from './types';
import { useTheme } from './hooks/useTheme';
import { useAuthStore } from './store/authStore';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { Archives } from './components/Archives/Archives';
import { Users } from './components/Users';
import { Settings } from './components/Settings';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuthStore();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [showAddArchive, setShowAddArchive] = useState(false);

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard isDark={isDark} />;
      case 'archives':
        return (
          <Archives
            isDark={isDark}
            showAddArchive={showAddArchive}
            onCloseAddArchive={() => setShowAddArchive(false)}
          />
        );
      case 'users':
        return <Users isDark={isDark} />;
      case 'settings':
        return <Settings isDark={isDark} toggleTheme={toggleTheme} />;
      default:
        return <Dashboard isDark={isDark} />;
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="flex">
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          isDark={isDark}
        />
        <div className="flex-1 p-8">
          <Header
            isDark={isDark}
            toggleTheme={toggleTheme}
            onAddArchive={() => setShowAddArchive(true)}
          />
          {renderCurrentView()}
        </div>
      </div>
    </div>
  );
}

export default App;