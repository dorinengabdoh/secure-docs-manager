import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, Plus, LogOut, User } from 'lucide-react';
import { translations } from '../translations';
import { useLanguageStore } from '../store/languageStore';
import { useAuthStore } from '../store/authStore';
import { NotificationPanel } from './NotificationPanel';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  onAddArchive: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme, onAddArchive }) => {
  const { language, setLanguage } = useLanguageStore();
  const { user, logout } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const t = translations[language];

  const toggleLanguage = () => setLanguage(language === 'fr' ? 'en' : 'fr');

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className={`flex items-center ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-2 flex-1 mr-4`}>
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          className={`flex-1 outline-none ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
        />
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button
          onClick={toggleLanguage}
          className={`px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {language.toUpperCase()}
        </button>
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>
          {showNotifications && (
            <NotificationPanel 
              isDark={isDark} 
              onClose={() => setShowNotifications(false)} 
            />
          )}
        </div>
        <button
          onClick={onAddArchive}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t.addArchive}
        </button>
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={`flex items-center p-2 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <User className="h-5 w-5" />
          </button>
          {showUserMenu && (
            <div className={`absolute right-0 top-full mt-2 w-48 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } rounded-lg shadow-lg overflow-hidden z-50 border ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="p-3 border-b border-gray-700">
                <p className="font-medium">{user?.name}</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {user?.email}
                </p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${
                  user?.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user?.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className={`w-full flex items-center px-3 py-2 text-left ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } text-red-500`}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t.logout}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};