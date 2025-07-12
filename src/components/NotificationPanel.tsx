import React from 'react';
import { translations } from '../translations';
import { useLanguageStore } from '../store/languageStore';
import { mockNotifications } from '../data/mockData';

interface NotificationPanelProps {
  isDark: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isDark, onClose }) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div 
      className={`absolute right-0 top-full mt-2 w-80 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-lg overflow-hidden z-50`}
    >
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold">{t.notifications}</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {mockNotifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 border-b ${
              isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'
            } cursor-pointer`}
            onClick={onClose}
          >
            <p className="font-medium">{notification.title}</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t.addedBy} {notification.author}
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {new Date(notification.date).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};