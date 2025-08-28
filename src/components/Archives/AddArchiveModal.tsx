import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import { NewArchive } from "../../types";
import { translations } from "../../translations";
import { useLanguageStore } from "../../store/languageStore";

interface AddArchiveModalProps {
  isDark: boolean;
  onClose: () => void;
  onSubmit: (archive: NewArchive) => void;
}

export const AddArchiveModal: React.FC<AddArchiveModalProps> = ({
  isDark,
  onClose,
  onSubmit,
}) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  const [newArchive, setNewArchive] = useState<NewArchive>({
    title: "",
    author: "",
    type: "",
    keywords: "",
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
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{t.addNewArchive}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-opacity-20 hover:bg-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Titre */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t.archiveTitle}
                </label>
                <input
                  type="text"
                  value={newArchive.title}
                  onChange={(e) =>
                    setNewArchive((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className={`w-full p-2 rounded-lg border ${
                    isDark
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                  required
                  placeholder={t.TitlePlaceholder}
                />
              </div>

              {/* Auteur */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t.author}
                </label>
                <input
                  type="text"
                  value={newArchive.author}
                  onChange={(e) =>
                    setNewArchive((prev) => ({
                      ...prev,
                      author: e.target.value,
                    }))
                  }
                  className={`w-full p-2 rounded-lg border ${
                    isDark
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                  required
                  placeholder={t.authorPlaceholder}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t.type}
                </label>
                <input
                  type="text"
                  value={newArchive.type}
                  onChange={(e) =>
                    setNewArchive((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className={`w-full p-2 rounded-lg border ${
                    isDark
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                  required
                  placeholder={t.typePlaceholder}
                />
              </div>

              {/* Mots-clés */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t.keywords}
                </label>
                <input
                  type="text"
                  value={newArchive.keywords}
                  onChange={(e) =>
                    setNewArchive((prev) => ({
                      ...prev,
                      keywords: e.target.value,
                    }))
                  }
                  className={`w-full p-2 rounded-lg border ${
                    isDark
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="séparés par des virgules"
                />
              </div>
            </div>

            {/* Fichier */}
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

          {/* Footer */}
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
