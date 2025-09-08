import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { Archive, NewArchive } from "../../types";
import { translations } from "../../translations";
import { useLanguageStore } from "../../store/languageStore";
import { useAuthStore } from "../../store/authStore";

interface EditArchiveModalProps {
  isDark: boolean;
  archive: Archive; // 👈 receive selected archive
  onClose: () => void;
  onSubmit: (archive: NewArchive) => Promise<boolean>;
}

export const EditArchiveModal: React.FC<EditArchiveModalProps> = ({
  isDark,
  archive,
  onClose,
  onSubmit,
}) => {
  const { language } = useLanguageStore();
  const t = translations[language];
  const { user } = useAuthStore();

  const [newArchive, setNewArchive] = useState<NewArchive>({
    title: "",
    author: "",
    type: "",
    keywords: "",
    status: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // 👇 when archive changes, populate the form
  useEffect(() => {
    if (archive) {
      setNewArchive({
        title: archive.title || "",
        author: archive.author || "",
        type: archive.type || "",
        keywords: archive.keywords || "",
        status: archive.status || "",
        file: null, // file can't be preloaded, leave empty
      });
    }
  }, [archive]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewArchive((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const success = await onSubmit(newArchive);

      if (success) {
        setMessage({ type: "success", text: t.archiveUpdatedSuccessfully });
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setMessage({ type: "error", text: t.archiveUpdateFailed });
      }
    } catch (err) {
      setMessage({ type: "error", text: t.archiveUpdateFailed });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative transition-transform transform scale-100 animate-fadeIn`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{t.editDoc}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.archiveTitle}
              </label>
              <input
                type="text"
                value={newArchive.title}
                onChange={(e) =>
                  setNewArchive((prev) => ({ ...prev, title: e.target.value }))
                }
                className={`w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                required
                placeholder={t.TitlePlaceholder}
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.author}
              </label>
              <input
                type="text"
                value={newArchive.author}
                onChange={(e) =>
                  setNewArchive((prev) => ({ ...prev, author: e.target.value }))
                }
                className={`w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                required
                placeholder={t.authorPlaceholder}
              />
            </div>
          </div>

          {/* Type & Keywords */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t.type}</label>
              <input
                type="text"
                value={newArchive.type}
                onChange={(e) =>
                  setNewArchive((prev) => ({ ...prev, type: e.target.value }))
                }
                className={`w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                required
                placeholder={t.typePlaceholder}
              />
            </div>

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
                className={`w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                placeholder="séparés par des virgules"
              />
            </div>
          </div>

          {/* Status */}
          {user?.role === "admin" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.userSatus}
              </label>
              <select
                name="status"
                value={newArchive.status}
                onChange={(e) =>
                  setNewArchive((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className={`w-full p-2 rounded-lg border ${
                  isDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                required
              >
                <option value="">{t.userStatusOpt}</option>
                <option value={t.archiveStatus1}>{t.archiveStatus1}</option>
                <option value={t.archiveStatus2}>{t.archiveStatus2}</option>
                <option value={t.archiveStatus3}>{t.archiveStatus3}</option>
              </select>
            </div>
          )}

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t.archiveFile}
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
                isDark
                  ? "border-gray-600 hover:border-gray-400"
                  : "border-gray-300 hover:border-gray-500"
              }`}
            >
              {/* Hidden input */}
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="archive-file"
              />

              {/* Label clickable everywhere */}
              <label
                htmlFor="archive-file"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload className="h-12 w-12 mx-auto mb-3 text-blue-500 hover:text-blue-600 transition" />
                <p className="text-sm">{t.dragAndDrop}</p>
                <p className="text-sm">{t.or}</p>
                <span className="text-blue-600 font-medium hover:underline">
                  {t.browse}
                </span>
              </label>

              {/* Selected file feedback */}
              {newArchive.file && (
                <div className="mt-3">
                  <p
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full shadow-sm ${
                      isDark
                        ? "bg-green-700 text-green-100"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {t.selectedFile}:{" "}
                    <span className="font-bold">{newArchive.file.name}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg transition ${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              disabled={loading}
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? t.loading : t.saveChanges}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
