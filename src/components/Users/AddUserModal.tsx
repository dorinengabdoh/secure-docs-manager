import React, { useState } from "react";
import { X } from "lucide-react";
import { NewUser } from "../../types";
import { translations } from "../../translations";
import { useLanguageStore } from "../../store/languageStore";

interface NewUserModalProps {
  isDark: boolean;
  onClose: () => void;
  onSubmit: (user: NewUser) => void;
}

export const AddUserModal: React.FC<NewUserModalProps> = ({
  isDark,
  onClose,
  onSubmit,
}) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newUser);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`${
          isDark ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-xl max-w-2xl w-full p-6`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{t.addNewUser}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-opacity-20 hover:bg-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.userName}
              </label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, name: e.target.value }))
                }
                className={`w-full p-2 rounded-lg border ${
                  isDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                required
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.userEmail}
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className={`w-full p-2 rounded-lg border ${
                  isDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                placeholder="email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.userPassword}
              </label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className={`w-full p-2 rounded-lg border ${
                  isDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.userRole}
              </label>
              <select
                name="role"
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    role: e.target.value,
                  }))
                }
                className={`w-full p-2 rounded-lg border ${
                  isDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                required
              >
                <option value="">{t.userRoleOpt}</option>
                <option value={t.userRole1}>{t.userRole1}</option>
                <option value={t.userRole2}>{t.userRole2}</option>
              </select>
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
