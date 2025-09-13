import React, { useState, useEffect } from "react";
import { X, Download, FileWarning } from "lucide-react";
import { Archive } from "../../types";
import { translations } from "../../translations";
import { useLanguageStore } from "../../store/languageStore";

interface ArchiveModalProps {
  archive: Archive;
  isDark: boolean;
  onClose: () => void;
}

export const ArchiveModal: React.FC<ArchiveModalProps> = ({
  archive,
  isDark,
  onClose,
}) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  const [previewError, setPreviewError] = useState(false);

  // List of extensions that browsers can usually render inline
  const previewableExtensions = [
    "pdf",
    "png",
    "jpg",
    "jpeg",
    "gif",
    "txt",
    "mp4",
    "mp3",
  ];

  const canPreview = previewableExtensions.includes(
    archive.extension.toLowerCase()
  );

  // Reset preview error when modal is reopened
  useEffect(() => {
    setPreviewError(false);
  }, [archive.id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } rounded-lg shadow-xl max-w-2xl w-full p-6`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{archive.title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-opacity-20 hover:bg-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Preview Section */}
        {canPreview && !previewError ? (
          <iframe
            src={`http://localhost:3000/files/preview/${archive.id}`}
            width="100%"
            height="600px"
            style={{ border: "none" }}
            onError={() => setPreviewError(true)}
          ></iframe>
        ) : (
          <div className="flex flex-col items-center justify-center h-60 border rounded-lg bg-gray-100 dark:bg-gray-700">
            <FileWarning className="h-12 w-12 mb-2 text-yellow-500" />
            <p>{"Preview not available"}</p>
          </div>
        )}

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 my-4 text-sm">
          <div>
            <span className="font-semibold">{t.type}:</span> {archive.type}
          </div>
          <div>
            <span className="font-semibold">{t.author}:</span> {archive.author}
          </div>
          <div>
            <span className="font-semibold">{t.date}:</span>{" "}
            {new Date(archive.date).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold">{t.fileSize}:</span> {archive.size}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <a
            href={`http://localhost:3000/files/download/${archive.id}`}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="h-5 w-5 mr-2" />
            {t.download}
          </a>
        </div>
      </div>
    </div>
  );
};
