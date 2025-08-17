import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import { SendArchive } from "../../types";
import { translations } from "../../translations";
import { useLanguageStore } from "../../store/languageStore";

interface SendArchiveModalProps {
  isDark: boolean;
  onClose: () => void;
  onSubmit: (archive: SendArchive) => void;
}

export const SendArchiveModal: React.FC<SendArchiveModalProps> = ({
  isDark,
  onClose,
  onSubmit,
}) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  const [newArchive, setNewArchive] = useState<SendArchive>({
    subject: "",
    description: "",
    recipient: "",
    file: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewArchive((prev) => ({ ...prev, file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newArchive);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`${
          isDark ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-xl max-w-2xl w-full p-6`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{t.sendArchive}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-opacity-20 hover:bg-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">
                  {t.recipientEMail}
                </label>
                <input
                  type="email"
                  value={newArchive.recipient}
                  onChange={(e) =>
                    setNewArchive((prev) => ({
                      ...prev,
                      recipient: e.target.value,
                    }))
                  }
                  className={`w-full p-2 rounded-lg border ${
                    isDark
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                  required
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">
                  {t.emailSubject}
                </label>
                <input
                  type="text"
                  value={newArchive.subject}
                  onChange={(e) =>
                    setNewArchive((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  className={`w-full p-2 rounded-lg border ${
                    isDark
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                  required
                  placeholder="Financial Report 2024"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.description}
              </label>
              <textarea
                value={newArchive.description}
                onChange={(e) =>
                  setNewArchive((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className={`w-full p-2 rounded-lg border ${
                  isDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.archiveFile}
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  isDark ? "border-gray-600" : "border-gray-300"
                }`}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="archive-file"
                />
                <label htmlFor="archive-file" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">{t.dragAndDrop}</p>
                  <p className="text-sm text-gray-500">{t.or}</p>
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    {t.browse}
                  </button>
                </label>
                {newArchive.file && (
                  <p className="mt-2 text-sm text-gray-500">
                    {t.selectedFile}: {newArchive.file.name}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {t.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
