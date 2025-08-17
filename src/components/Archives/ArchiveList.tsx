import React, { useState } from "react";
import { Eye, Download, Trash2, Filter, ArrowUpDown, Mail } from "lucide-react";
import {
  Archive,
  FilterType,
  SendArchive,
  SortBy,
  SortOrder,
} from "../../types";
import { translations } from "../../translations";
import { useLanguageStore } from "../../store/languageStore";
import { SendArchiveModal } from "./SendArchiveModal";

interface ArchiveListProps {
  archives: Archive[];
  isDark: boolean;
  selectedArchives: Archive[];
  onArchiveSelection: (archive: Archive) => void;
  onView: (archive: Archive) => void;
  onDownload: (archive: Archive) => void;
  onDelete: (archive: Archive) => void;
  onExport: () => void;
}

export const ArchiveList: React.FC<ArchiveListProps> = ({
  archives,
  isDark,
  selectedArchives,
  onArchiveSelection,
  onView,
  onDownload,
  onDelete,
  onExport,
}) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("descending");
  const [showAddArchive, setShowSendArchive] = useState(false);

  const filteredArchives = archives
    .filter(
      (archive) =>
        filterType === "all" ||
        archive.type.toLowerCase() === filterType.toLowerCase()
    )
    .sort((a, b) => {
      const order = sortOrder === "ascending" ? 1 : -1;
      if (sortBy === "date") {
        return (
          order * (new Date(b.date).getTime() - new Date(a.date).getTime())
        );
      }
      return order * a[sortBy].localeCompare(b[sortBy]);
    });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      filteredArchives.forEach((archive) => {
        if (!selectedArchives.find((a) => a.id === archive.id)) {
          onArchiveSelection(archive);
        }
      });
    } else {
      filteredArchives.forEach((archive) => {
        if (selectedArchives.find((a) => a.id === archive.id)) {
          onArchiveSelection(archive);
        }
      });
    }
  };

  const handleSubmitArchive = (sendArchive: SendArchive) => {
    const archiveData = {
      ...sendArchive,
      id: Date.now(),
      date: new Date().toISOString(),
      type: sendArchive.file?.type || "Unknown",
      size: sendArchive.file?.size
        ? `${(sendArchive.file.size / 1024 / 1024).toFixed(2)} MB`
        : "Unknown",
      author: "Current User",
    };

    console.log("Submitting new archive:", archiveData);
  };

  return (
    <div
      className={`${
        isDark ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-lg p-6`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as FilterType)}
              className={`appearance-none pl-3 pr-8 py-2 rounded-lg ${
                isDark ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-800"
              } border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none`}
            >
              <option value="all">{t.all}</option>
              <option value="pdf">PDF</option>
              <option value="doc">DOC</option>
            </select>
            <Filter className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className={`appearance-none pl-3 pr-8 py-2 rounded-lg ${
                isDark ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-800"
              } border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none`}
            >
              <option value="date">{t.date}</option>
              <option value="type">{t.type}</option>
              <option value="author">{t.author}</option>
            </select>
            <ArrowUpDown className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button
            onClick={() =>
              setSortOrder(
                sortOrder === "ascending" ? "descending" : "ascending"
              )
            }
            className={`px-3 py-2 rounded-lg ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {t[sortOrder]}
          </button>
        </div>
        <button
          onClick={() => setShowSendArchive(true)}
          className={`flex items-center px-4 py-2 rounded-lg ${
            selectedArchives.length > 0
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : isDark
              ? "bg-gray-700 text-gray-400"
              : "bg-gray-200 text-gray-500"
          }`}
          disabled={selectedArchives.length === 0}
        >
          <Mail className="h-5 w-5 mr-2" />
          {t.exportSelected}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className={`border-b ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <th className="w-8 py-3 px-4">
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  checked={
                    selectedArchives.length === filteredArchives.length &&
                    filteredArchives.length > 0
                  }
                  className="rounded"
                />
              </th>
              <th className="text-left py-3 px-4">{t.archiveTitle}</th>
              <th className="text-left py-3 px-4">{t.type}</th>
              <th className="text-left py-3 px-4">{t.author}</th>
              <th className="text-left py-3 px-4">{t.date}</th>
              <th className="text-left py-3 px-4">{t.fileSize}</th>
              <th className="text-right py-3 px-4">{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredArchives.map((archive) => (
              <tr
                key={archive.id}
                className={`border-b ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } hover:bg-opacity-50 ${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}
              >
                <td className="py-4 px-4">
                  <input
                    type="checkbox"
                    checked={selectedArchives.some((a) => a.id === archive.id)}
                    onChange={() => onArchiveSelection(archive)}
                    className="rounded"
                  />
                </td>
                <td className="py-4 px-4 font-medium">{archive.title}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      archive.type === "PDF"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {archive.type}
                  </span>
                </td>
                <td className="py-4 px-4">{archive.author}</td>
                <td className="py-4 px-4">
                  {new Date(archive.date).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">{archive.size}</td>
                <td className="py-4 px-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onView(archive)}
                      className="p-2 rounded-lg text-blue-500 hover:bg-blue-500 hover:bg-opacity-20"
                      title={t.view}
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDownload(archive)}
                      className="p-2 rounded-lg text-green-500 hover:bg-green-500 hover:bg-opacity-20"
                      title={t.download}
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(archive)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-500 hover:bg-opacity-20"
                      title={t.delete}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddArchive && (
        <SendArchiveModal
          isDark={isDark}
          onClose={() => setShowSendArchive(false)}
          onSubmit={handleSubmitArchive}
        />
      )}
    </div>
  );
};
