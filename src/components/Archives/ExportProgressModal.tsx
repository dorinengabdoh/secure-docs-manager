import React from 'react';
import { translations } from '../../translations';
import { useLanguageStore } from '../../store/languageStore';

interface ExportProgressModalProps {
  progress: number;
  isDark: boolean;
}

export const ExportProgressModal: React.FC<ExportProgressModalProps> = ({ progress, isDark }) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-md w-full p-6`}>
        <h3 className="text-xl font-semibold mb-4">{t.exportingArchives}</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-center">{progress}%</p>
      </div>
    </div>
  );
};