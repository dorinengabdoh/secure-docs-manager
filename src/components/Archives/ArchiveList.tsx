import React, { useState } from "react";
import { Eye, Filter, Search, Edit, Trash2 } from "lucide-react";
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
import api from "../../utilities/api";
import { useArchiveStore } from "../../store/useArchiveStore";

interface ArchiveListProps {
  isDark: boolean;
  onArchiveSelection?: (archive: Archive) => void;
  onView: (archive: Archive) => void;
}

export const ArchiveList: React.FC<ArchiveListProps> = ({ isDark, onView }) => {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const t = translations[language];

  const { archives, loading, setArchives } = useArchiveStore();

  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascending");
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditArchive, setShowEditArchive] = useState(false);
  const [selectedArchive, setSelectedArchive] = useState<Archive | null>(null);

  // Handle file preview
  const handleView = (archive: Archive) => {
    const url = `http://localhost:3000/files/preview/${archive.id}`;
    console.log("url", url);

    window.open(url, "_blank"); // Opens in new tab
  };

  // Handle delete
  const handleDelete = async (archive: Archive) => {
    if (!window.confirm(`Are you sure you want to delete "${archive.title}"?`))
      return;

    try {
      await api.delete(`/files/${archive.id}`);
      setArchives(archives.filter((a) => a.id !== archive.id));
    } catch (error: any) {
      console.error("Error deleting archive:", error.response?.data || error);
    }
  };

  // Handle edit submit
  const handleSubmitArchive = async (updatedArchive: NewArchive) => {
    if (!selectedArchive) return false;

    try {
      const { data } = await api.put(`/files/${selectedArchive.id}`, {
        title: updatedArchive.title,
        author: updatedArchive.author,
        type: updatedArchive.type,
        keywords: updatedArchive.keywords,
        status: updatedArchive.status,
      });

      setArchives(
        archives.map((a) => (a.id === selectedArchive.id ? data : a))
      );

      setShowEditArchive(false);
      setSelectedArchive(null);
      return true;
    } catch (error: any) {
      console.error("Error updating archive:", error.response?.data || error);
      return false;
    }
  };

  // Filtering + searching
  const filteredArchives = archives
    .filter((archive) => {
      if (!searchTerm) return true; // no search, show everything

      const term = searchTerm.toLowerCase();

      // Always allow global search across everything
      const inAnyField =
        archive.title?.toLowerCase().includes(term) ||
        archive.author?.toLowerCase().includes(term) ||
        archive.type?.toLowerCase().includes(term) ||
        archive.keywords?.toLowerCase().includes(term) ||
        String(archive.date)?.toLowerCase().includes(term) ||
        String(archive.status)?.toLowerCase().includes(term);

      if (filterType === "all") return inAnyField;

      // If filterType is set, give priority to that field but still fallback to global search
      switch (filterType) {
        case "author":
          return archive.author?.toLowerCase().includes(term) || inAnyField;
        case "type":
          return archive.type?.toLowerCase().includes(term) || inAnyField;
        case "date":
          return (
            String(archive.date)?.toLowerCase().includes(term) || inAnyField
          );
        default:
          return inAnyField;
      }
    })
    .sort((a, b) => {
      const order = sortOrder === "ascending" ? 1 : -1;

      if (sortBy === "date") {
        const ta = new Date(a.date).getTime() || 0;
        const tb = new Date(b.date).getTime() || 0;
        return order * (ta - tb);
      }

      const fieldA = String((a as any)[sortBy] || "").toLowerCase();
      const fieldB = String((b as any)[sortBy] || "").toLowerCase();
      return order * fieldA.localeCompare(fieldB);
    });

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
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className={`appearance-none pl-3 pr-8 py-2 rounded-lg ${
                isDark ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-800"
              } border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none`}
            >
              <option value="author">{t.author}</option>
              <option value="type">{t.type}</option>
              <option value="date">{t.date}</option>
              <option value="title">{t.archiveTitle}</option>
              <option value="status">{t.status}</option>
            </select>
            <Filter className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
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

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          {t.loading || "Loading..."}
        </div>
      ) : filteredArchives.filter((archive) => archive.status === "archive")
          .length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          {t.noArchives || "No archives found"}
        </div>
      ) : (
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
                .filter((archive) => archive.status === "archive")
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
                      {new Date(archive.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-4 px-4">
                      {archive.status === "draft" ? "pending" : archive.status}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        {/* View */}
                        <button
                          onClick={() => handleView(archive)}
                          className="p-2 rounded-lg text-blue-500 hover:bg-blue-500 hover:bg-opacity-20"
                          title={t.view}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        {/* Edit */}
                        {(archive.status === "reject" ||
                          user?.role === "admin") && (
                          <button
                            onClick={() => {
                              setSelectedArchive(archive);
                              setShowEditArchive(true);
                            }}
                            className="p-2 rounded-lg text-green-500 hover:bg-green-500 hover:bg-opacity-20"
                            title={t.edit}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                        )}
                        {/* Delete */}
                        {(archive.status === "reject" ||
                          user?.role === "admin") && (
                          <button
                            onClick={() => handleDelete(archive)}
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
      )}

      {/* Edit modal */}
      {showEditArchive && selectedArchive && (
        <EditArchiveModal
          isDark={isDark}
          onClose={() => {
            setShowEditArchive(false);
            setSelectedArchive(null);
          }}
          onSubmit={handleSubmitArchive}
          archive={selectedArchive}
        />
      )}
    </div>
  );
};
