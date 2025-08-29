import React, { useState } from "react";
import { Eye, Filter, ArrowUpDown, Search, Edit, Trash2 } from "lucide-react";
import {
  Archive,
  FilterType,
  NewArchive,
  SortBy,
  SortOrder,
} from "../../types";
import { translations } from "../../translations";
import { useLanguageStore } from "../../store/languageStore";
import { useAuthStore } from "../../store/authStore";
import { EditArchiveModal } from "../Archives/EditArchiveModal";

interface ImportTableProps {
  archives: Archive[];
  isDark: boolean;
  selectedArchives: Archive[];
  onArchiveSelection: (archive: Archive) => void;
  onView: (archive: Archive) => void;
  onEdit: (archive: Archive) => void;
  onDelete: (archive: Archive) => void;
}

export const ImportTable: React.FC<ImportTableProps> = ({
  archives,
  isDark,
  onView,
}) => {
  const { language } = useLanguageStore();
  const t = translations[language];
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("descending");
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditArchive, setShowEditArchive] = useState(false);

  // Filtering + searching
  const filteredArchives = archives
    .filter(
      (archive) =>
        (filterType === "all" ||
          archive.type.toLowerCase() === filterType.toLowerCase()) &&
        (searchTerm === "" ||
          archive.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          archive.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          archive.keywords?.toLowerCase().includes(searchTerm.toLowerCase()))
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

  const handleSubmitArchive = (newArchive: NewArchive) => {
    const archiveData = {
      ...newArchive,
      id: Date.now(),
      date: new Date().toISOString(),
      type: newArchive.file?.type || "Unknown",
      size: newArchive.file?.size
        ? `${(newArchive.file.size / 1024 / 1024).toFixed(2)} MB`
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
      {/* Filters + Search */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          {/* Filter dropdown */}
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
              <option value="other">Other</option>
            </select>
            <Filter className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className={`appearance-none pl-3 pr-8 py-2 rounded-lg ${
                isDark ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-800"
              } border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none`}
            >
              <option value="author">{t.author}</option>
              <option value="type">{t.type}</option>
              <option value="date">{t.date}</option>
            </select>
            <ArrowUpDown className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-3 py-2 rounded-lg ${
                isDark ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-800"
              } border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none`}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className={`border-b ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <th className="text-left py-3 px-4">{t.archiveTitle}</th>
              <th className="text-left py-3 px-4">{t.author}</th>
              <th className="text-left py-3 px-4">{t.type}</th>
              <th className="text-left py-3 px-4">{t.keywords}</th>
              <th className="text-left py-3 px-4">{t.date}</th>
              <th className="text-left py-3 px-4">{t.status}</th>
              <th className="text-right py-3 px-4">{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredArchives
              .filter(
                (archive) =>
                  archive.status === "pending" || archive.status === "reject"
              )
              .map((archive) => (
                <tr
                  key={archive.id}
                  className={`border-b ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  } hover:bg-opacity-50 ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="py-4 px-4 font-medium">{archive.title}</td>
                  <td className="py-4 px-4">{archive.author}</td>
                  <td className="py-4 px-4">{archive.type}</td>
                  <td className="py-4 px-4">{archive.keywords}</td>
                  <td className="py-4 px-4">
                    {new Date(archive.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">{archive.status}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      {/* View button */}
                      <button
                        onClick={() => onView(archive)}
                        className="p-2 rounded-lg text-blue-500 hover:bg-blue-500 hover:bg-opacity-20"
                        title={t.view}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      {/* Edit button */}
                      {archive.status === "reject" && (
                        <button
                          onClick={() => setShowEditArchive(true)}
                          className="p-2 rounded-lg text-green-500 hover:bg-green-500 hover:bg-opacity-20"
                          title={t.edit}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                      )}
                      {/* Delete button */}
                      {archive.status === "reject" && (
                        <button
                          onClick={() => onDelete(archive)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-500 hover:bg-opacity-20"
                          title={t.delete}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showEditArchive && (
        <EditArchiveModal
          isDark={isDark}
          onClose={() => setShowEditArchive(false)}
          onSubmit={handleSubmitArchive}
        />
      )}
    </div>
  );
};
