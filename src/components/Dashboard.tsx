import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { translations } from "../translations";
import { useLanguageStore } from "../store/languageStore";
import api from "../utilities/api"; // axios instance
import { mockNotifications } from "../data/mockData";

interface DashboardProps {
  isDark: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ isDark }) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  const [totalArchives, setTotalArchives] = useState(0);
  const [recentUploads, setRecentUploads] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get users
        const { data: users } = await api.get("/users/get");
        const activeCount = users.filter(
          (u: any) => u.status === "active"
        ).length;
        setActiveUsers(activeCount);

        // Get archives
        const { data: files } = await api.get("/files");
        setTotalArchives(files.length);

        // Recent uploads = files created in last 7 days
        const now = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);

        const recentCount = files.filter((f: any) => {
          const fileDate = new Date(f.date);
          return fileDate >= sevenDaysAgo;
        }).length;

        setRecentUploads(recentCount);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          className={`${
            isDark ? "bg-gray-800" : "bg-white"
          } p-6 rounded-lg shadow-sm`}
        >
          <h3 className="text-lg font-semibold mb-2">{t.totalArchives}</h3>
          <p className="text-3xl font-bold text-blue-600">{totalArchives}</p>
        </div>
        <div
          className={`${
            isDark ? "bg-gray-800" : "bg-white"
          } p-6 rounded-lg shadow-sm`}
        >
          <h3 className="text-lg font-semibold mb-2">{t.recentUploads}</h3>
          <p className="text-3xl font-bold text-green-600">{recentUploads}</p>
        </div>
        <div
          className={`${
            isDark ? "bg-gray-800" : "bg-white"
          } p-6 rounded-lg shadow-sm`}
        >
          <h3 className="text-lg font-semibold mb-2">{t.activeUsers}</h3>
          <p className="text-3xl font-bold text-purple-600">{activeUsers}</p>
        </div>
      </div>

      <div
        className={`${
          isDark ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-sm p-6`}
      >
        <h2 className="text-xl font-semibold mb-4">{t.recentActivity}</h2>
        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center justify-between py-3 border-b ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <p className="font-medium">{notification.title}</p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {t.addedBy} {notification.author}
                  </p>
                </div>
              </div>
              <span
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {new Date(notification.date).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
