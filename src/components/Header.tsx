import React, { useState } from "react";
import { Bell, Sun, Moon, LogOut, User, FileDown } from "lucide-react";
import { translations } from "../translations";
import { useLanguageStore } from "../store/languageStore";
import { useAuthStore } from "../store/authStore";
import { NotificationPanel } from "./NotificationPanel";

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  onAddArchive: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  toggleTheme,
  onAddArchive,
}) => {
  const { language, setLanguage } = useLanguageStore();
  const { user, logout } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const t = translations[language];

  const toggleLanguage = () => setLanguage(language === "fr" ? "en" : "fr");

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };
  return (
    <div
      className={`${
        user?.role === "admin" || user?.role === "editor"
          ? "flex items-center justify-between mb-8"
          : "flex items-center justify-end mb-8"
      } `}
    >
      {/* Add New Archive Button */}
      {(user?.role === "admin" || user?.role === "editor") && (
        <button
          onClick={onAddArchive}
          className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
        >
          <FileDown className="h-5 w-5 mr-2" />
          <span className="font-medium">{t.addNewArchive}</span>
        </button>
      )}

      {/* User, Theme, Language & Notifications */}
      <div className="flex items-center gap-3 relative">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl shadow-sm transition-colors ${
            isDark
              ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className={`px-4 py-2 rounded-xl shadow-sm text-sm font-medium transition-colors ${
            isDark
              ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          {language.toUpperCase()}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2.5 rounded-xl shadow-sm relative transition-colors ${
              isDark
                ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
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

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={`flex items-center p-2.5 rounded-full shadow-sm transition-colors ${
              isDark
                ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <User className="h-5 w-5" />
          </button>

          {showUserMenu && (
            <div
              className={`absolute right-0 top-full mt-3 w-56 rounded-xl shadow-lg overflow-hidden z-50 border transition-all ${
                isDark
                  ? "bg-gray-900 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* User Info */}
              <div
                className={`p-4 border-b ${
                  isDark ? "border-gray-700" : "border-gray-100"
                }`}
              >
                <p className="font-medium">{user?.name}</p>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {user?.email}
                </p>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs mt-2 ${
                    user?.role === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user?.role}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className={`w-full flex items-center px-4 py-3 text-left text-red-600 font-medium transition-colors ${
                  isDark ? "hover:bg-gray-800" : "hover:bg-gray-50"
                }`}
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
