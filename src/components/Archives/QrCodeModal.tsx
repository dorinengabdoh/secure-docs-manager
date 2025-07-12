import React from 'react';
import { X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { translations } from '../../translations';
import { useLanguageStore } from '../../store/languageStore';

interface QrCodeModalProps {
  qrCodeData: string;
  isDark: boolean;
  onClose: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ qrCodeData, isDark, onClose }) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-md w-full p-6`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{t.qrCodeTitle}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-opacity-20 hover:bg-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <QRCodeSVG value={qrCodeData} size={200} />
          <p className="mt-4 text-center text-sm text-gray-500">{t.scanToAccess}</p>
        </div>
      </div>
    </div>
  );
};