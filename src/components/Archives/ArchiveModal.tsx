import React from 'react';
import { X, Download } from 'lucide-react';
import { Archive } from '../../types';
import { translations } from '../../translations';
import { useLanguageStore } from '../../store/languageStore';

interface ArchiveModalProps {
  archive: Archive;
  isDark: boolean;
  onClose: () => void;
  onDownload: (archive: Archive) => void;
}

export const ArchiveModal: React.FC<ArchiveModalProps> = ({ 
  archive, 
  isDark, 
  onClose, 
  onDownload 
}) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-2xl w-full p-6`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{archive.title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-opacity-20 hover:bg-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4 mb-4 min-h-[200px] flex items-center justify-center`}>
          <p className="text-gray-500">{t.noPreview}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="font-semibold">{t.type}:</span> {archive.type}
          </div>
          <div>
            <span className="font-semibold">{t.author}:</span> {archive.author}
          </div>
          <div>
            <span className="font-semibold">{t.date}:</span> {new Date(archive.date).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold">{t.fileSize}:</span> {archive.size}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onDownload(archive)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="h-5 w-5 mr-2" />
            {t.download}
          </button>
        </div>
      </div>
    </div>
  );
};