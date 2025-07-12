import React from 'react';
import { Bell } from 'lucide-react';
import { translations } from '../translations';
import { useLanguageStore } from '../store/languageStore';
import { mockNotifications } from '../data/mockData';

interface DashboardProps {
  isDark: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ isDark }) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h3 className="text-lg font-semibold mb-2">{t.totalArchives}</h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h3 className="text-lg font-semibold mb-2">{t.recentUploads}</h3>
          <p className="text-3xl font-bold text-green-600">56</p>
        </div>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h3 className="text-lg font-semibold mb-2">{t.activeUsers}</h3>
          <p className="text-3xl font-bold text-purple-600">89</p>
        </div>
      </div>

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
        <h2 className="text-xl font-semibold mb-4">{t.recentActivity}</h2>
        <div className="space-y-4">
          {mockNotifications.map(notification => (
            <div 
              key={notification.id}
              className={`flex items-center justify-between py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <p className="font-medium">{notification.title}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.addedBy} {notification.author}
                  </p>
                </div>
              </div>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {new Date(notification.date).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};