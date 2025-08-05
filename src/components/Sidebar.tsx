import React from 'react';
import { Archive, Users, Settings, LayoutDashboard } from 'lucide-react';
import { ViewType } from '../types';
import { translations } from '../translations';
import { useLanguageStore } from '../store/languageStore';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isDark: boolean;
  userType: string
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isDark, userType }) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  const navigationItems = [
    { id: 'dashboard' as ViewType, label: t.dashboard, icon: LayoutDashboard },
    { id: 'archives' as ViewType, label: t.archives, icon: Archive },
    ...(userType === 'admin' ? [{ id: 'users' as ViewType, label: t.users, icon: Users }] : []),
    { id: 'settings' as ViewType, label: t.settings, icon: Settings },
  ];

  return (
    <div className={`w-64 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="p-6">
        <h1 className="text-xl font-bold">{t.title}</h1>
      </div>
      <nav className="mt-6">
        {navigationItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCurrentView(id)}
            className={`w-full flex items-center px-6 py-3 ${currentView === id
              ? isDark ? 'bg-gray-700' : 'bg-gray-200'
              : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
          >
            <Icon className="h-5 w-5 mr-3" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
};