import React, { useState } from "react";
import { Archive } from "../../types";
import { mockArchives } from "../../data/mockData";
import { ApproveTable } from "./ApproveTable";
import { ArchiveModal } from "../Archives/ArchiveModal";

interface ApproveDocProps {
  isDark: boolean;
}

export const ApproveDoc: React.FC<ApproveDocProps> = ({ isDark }) => {
  const [selectedArchive, setSelectedArchive] = useState<Archive | null>(null);
  const [selectedArchives, setSelectedArchives] = useState<Archive[]>([]);

  const handleView = (archive: Archive) => {
    setSelectedArchive(archive);
  };

  const handleArchiveSelection = (archive: Archive) => {
    setSelectedArchives((prev) => {
      const isSelected = prev.find((a) => a.id === archive.id);
      if (isSelected) {
        return prev.filter((a) => a.id !== archive.id);
      }
      return [...prev, archive];
    });
  };

  const handleDownload = (archive: Archive) => {
    const link = document.createElement("a");
    link.href = "#";
    link.download = archive.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <ApproveTable
        archives={mockArchives}
        isDark={isDark}
        selectedArchives={selectedArchives}
        onArchiveSelection={handleArchiveSelection}
        onView={handleView}
      />

      {selectedArchive && (
        <ArchiveModal
          archive={selectedArchive}
          isDark={isDark}
          onClose={() => setSelectedArchive(null)}
          onDownload={handleDownload}
        />
      )}
    </>
  );
};
