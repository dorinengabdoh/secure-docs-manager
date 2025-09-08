import { useEffect, useState } from "react";
import { NewArchive, ViewType } from "./types";
import { useTheme } from "./hooks/useTheme";
import { useAuthStore } from "./store/authStore";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { Archives } from "./components/Archives/Archives";
import { Users } from "./components/Users/Users";
import { Settings } from "./components/Settings";
import { AddArchiveModal } from "./components/Archives/AddArchiveModal";
import { ApproveDoc } from "./components/approveDoc/ApproveDoc";
import { IndexDoc } from "./components/indexDoc/IndexDoc";
import { ImportDoc } from "./components/ImportDoc/importDOc";
import api from "./utilities/api";
import { useArchiveStore } from "./store/useArchiveStore";
import { useUserStore } from "./store/userStore";

function App() {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuthStore();
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [showEditArchive, setshowEditArchive] = useState(false);
  const fetchArchives = useArchiveStore((state) => state.fetchArchives);
  const fetchUsers = useUserStore((s) => s.fetchUsers);

  useEffect(() => {
    fetchArchives();
    fetchUsers();
  }, [fetchArchives, fetchUsers]);

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const handleSubmitArchive = async (newArchive: NewArchive) => {
    try {
      const formData = new FormData();

      if (newArchive.file) {
        formData.append("file", newArchive.file);
      }

      formData.append("title", newArchive.title);

      // Use the type input from the modal (fallback to file type if empty)
      formData.append(
        "type",
        newArchive.type || newArchive.file?.type || "Unknown"
      );

      formData.append(
        "author",
        newArchive.author || "Current User" // fallback if missing
      );
      formData.append("date", new Date().toISOString());
      formData.append("status", newArchive.status || "draft");
      formData.append("keywords", newArchive.keywords || "");

      const { data } = await api.post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Archive uploaded successfully:", data);
      return data;
    } catch (error: any) {
      console.error(
        "Error uploading archive:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard isDark={isDark} />;
      case "archives":
        return <Archives isDark={isDark} />;
      case "import-document":
        return <ImportDoc isDark={isDark} />;
      case "document-index":
        return <IndexDoc isDark={isDark} />;
      case "approve-document":
        return <ApproveDoc isDark={isDark} />;
      case "users":
        return <Users isDark={isDark} />;
      case "settings":
        return <Settings isDark={isDark} toggleTheme={toggleTheme} />;
      default:
        return <Dashboard isDark={isDark} />;
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="flex">
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          isDark={isDark}
          userType={user?.role || ""}
        />
        <div className="flex-1 p-8">
          <Header
            isDark={isDark}
            toggleTheme={toggleTheme}
            onAddArchive={() => setshowEditArchive(true)}
          />
          {renderCurrentView()}
        </div>
      </div>
      {showEditArchive && (
        <AddArchiveModal
          isDark={isDark}
          onClose={() => setshowEditArchive(false)}
          onSubmit={handleSubmitArchive}
        />
      )}
    </div>
  );
}

export default App;
