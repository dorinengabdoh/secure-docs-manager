import React from 'react';
import { Settings as SettingsIcon, Globe, Palette, Bell, Shield, Database } from 'lucide-react';
import { translations } from '../translations';
import { useLanguageStore } from '../store/languageStore';

interface SettingsProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ isDark, toggleTheme }) => {
  const { language, setLanguage } = useLanguageStore();
  const t = translations[language];

  const toggleLanguage = () => setLanguage(language === 'fr' ? 'en' : 'fr');

  const settingSections = [
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          label: 'Dark Mode',
          description: 'Toggle between light and dark themes',
          action: (
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isDark ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          ),
        },
      ],
    },
    {
      title: 'Language & Region',
      icon: Globe,
      settings: [
        {
          label: 'Language',
          description: 'Select your preferred language',
          action: (
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'fr')}
              className={`px-3 py-2 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
              }`}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          ),
        },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          label: 'Email Notifications',
          description: 'Receive email notifications for new archives',
          action: (
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-blue-600`}
            >
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
            </button>
          ),
        },
        {
          label: 'Push Notifications',
          description: 'Receive push notifications in your browser',
          action: (
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-gray-200`}
            >
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
            </button>
          ),
        },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      settings: [
        {
          label: 'Two-Factor Authentication',
          description: 'Add an extra layer of security to your account',
          action: (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Enable
            </button>
          ),
        },
        {
          label: 'Session Timeout',
          description: 'Automatically log out after period of inactivity',
          action: (
            <select
              className={`px-3 py-2 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
              }`}
            >
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="240">4 hours</option>
              <option value="never">Never</option>
            </select>
          ),
        },
      ],
    },
    {
      title: 'Data Management',
      icon: Database,
      settings: [
        {
          label: 'Export Data',
          description: 'Download all your archive data',
          action: (
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Export
            </button>
          ),
        },
        {
          label: 'Delete Account',
          description: 'Permanently delete your account and all data',
          action: (
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Delete
            </button>
          ),
        },
      ],
    },
  ];

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
      <div className="flex items-center mb-6">
        <SettingsIcon className="h-6 w-6 mr-3" />
        <h2 className="text-xl font-semibold">{t.settings}</h2>
      </div>

      <div className="space-y-8">
        {settingSections.map((section, index) => (
          <div key={index}>
            <div className="flex items-center mb-4">
              <section.icon className="h-5 w-5 mr-2 text-blue-500" />
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>
            <div className="space-y-4 pl-7">
              {section.settings.map((setting, settingIndex) => (
                <div key={settingIndex} className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium">{setting.label}</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {setting.description}
                    </p>
                  </div>
                  <div>{setting.action}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-8 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className="text-lg font-semibold mb-4">About</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Version:</span> 1.0.0
          </div>
          <div>
            <span className="font-medium">Last Updated:</span> March 15, 2024
          </div>
          <div>
            <span className="font-medium">License:</span> MIT
          </div>
          <div>
            <span className="font-medium">Support:</span> support@archiveapp.com
          </div>
        </div>
      </div>
    </div>
  );
};