import React, { useState } from 'react';
import { Archive } from '../../types';
import { mockArchives } from '../../data/mockData';
import { translations } from '../../translations';
import { useLanguageStore } from '../../store/languageStore';
import { ArchiveList } from './ArchiveList';
import { ArchiveModal } from './ArchiveModal';
// import { QrCodeModal } from './QrCodeModal';
import { ExportProgressModal } from './ExportProgressModal';

interface ArchivesProps {
  isDark: boolean;
}

export const Archives: React.FC<ArchivesProps> = ({
  isDark,
}) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  const [selectedArchive, setSelectedArchive] = useState<Archive | null>(null);
  const [selectedArchives, setSelectedArchives] = useState<Archive[]>([]);
  const [showExportProgress, setShowExportProgress] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  // const [qrCodeData, setQrCodeData] = useState('');
  // const [showQrCode, setShowQrCode] = useState(false);

  const handleView = (archive: Archive) => {
    setSelectedArchive(archive);
  };

  const handleDownload = (archive: Archive) => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = archive.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (archive: Archive) => {
    if (window.confirm(t.confirmDelete)) {
      console.log('Deleting archive:', archive);
    }
  };

  const handleExport = async () => {
    if (selectedArchives.length === 0) {
      alert(t.selectArchivesToExport);
      return;
    }

    setShowExportProgress(true);
    setExportProgress(0);

    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setExportProgress(i);
    }

    const link = document.createElement('a');
    link.href = '#';
    link.download = 'archives.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowExportProgress(false);
    setSelectedArchives([]);
  };

  const handleArchiveSelection = (archive: Archive) => {
    setSelectedArchives(prev => {
      const isSelected = prev.find(a => a.id === archive.id);
      if (isSelected) {
        return prev.filter(a => a.id !== archive.id);
      }
      return [...prev, archive];
    });
  };

  // const generateQrCode = (archiveData: any) => {
  //   const qrData = `archive:${archiveData.title}-${Date.now()}`;
  //   setQrCodeData(qrData);
  //   setShowQrCode(true);
  // };

  // const closeQrModal = () => {
  //   setShowQrCode(false);
  // };

  return (
    <>
      <ArchiveList
        archives={mockArchives}
        isDark={isDark}
        selectedArchives={selectedArchives}
        onArchiveSelection={handleArchiveSelection}
        onView={handleView}
        onDelete={handleDelete}
      />

      {selectedArchive && (
        <ArchiveModal
          archive={selectedArchive}
          isDark={isDark}
          onClose={() => setSelectedArchive(null)}
          onDownload={handleDownload}
        />
      )}

      {/* {showQrCode && (
        <QrCodeModal
          qrCodeData={qrCodeData}
          isDark={isDark}
          onClose={closeQrModal}
        />
      )} */}

      {showExportProgress && (
        <ExportProgressModal
          progress={exportProgress}
          isDark={isDark}
        />
      )}
    </>
  );
};