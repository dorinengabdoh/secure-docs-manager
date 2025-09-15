import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { NewUser } from "../../types";
import { translations } from "../../translations";
import { useLanguageStore } from "../../store/languageStore";

interface NewUserModalProps {
  isDark: boolean;
  onClose: () => void;
  onSubmit: (user: NewUser) => void; // always required now
  user?: NewUser | null;
}

export const AddUserModal: React.FC<NewUserModalProps> = ({
  isDark,
  onClose,
  onSubmit,
  user,
}) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  const [newUser, setNewUser] = useState<NewUser>({
    id: 0,
    name: "",
    email: "",
    password: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    if (user) {
      // preload all except password
      setNewUser({
        id: user.id,
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
        status: user.status,
      });
    } else {
      setNewUser({
        id: 0,
        name: "",
        email: "",
        password: "",
        role: "",
        status: "",
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newUser); // delegate API call to Users.tsx
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`${
          isDark ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-xl max-w-2xl w-full p-6`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            {user ? t.editUser || "Edit User" : t.addNewUser}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-opacity-20 hover:bg-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name */}
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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.userEmail}
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, email: e.target.value }))
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

            {/* Password (only required when adding) */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.userPassword}
              </label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, password: e.target.value }))
                }
                className={`w-full p-2 rounded-lg border ${
                  isDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                required={!user}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.userRole}
              </label>
              <select
                name="role"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, role: e.target.value }))
                }
                className={`w-full p-2 rounded-lg border ${
                  isDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                required
              >
                <option value="">{t.userRoleOpt}</option>
                <option value={t.userRole2.toLocaleLowerCase()}>
                  {t.userRole2}
                </option>
                <option value={t.userRole3.toLocaleLowerCase()}>
                  {t.userRole3}
                </option>
                <option value={t.userRole4.toLocaleLowerCase()}>
                  {t.userRole4}
                </option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {t.userSatus}
              </label>
              <select
                name="status"
                value={newUser.status}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, status: e.target.value }))
                }
                className={`w-full p-2 rounded-lg border ${
                  isDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
                required
              >
                <option value="">{t.userStatusOpt}</option>
                <option value={t.userStatus1}>{t.userStatus1}</option>
                <option value={t.userStatus2}>{t.userStatus2}</option>
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
              {user ? t.saveChanges || "Update" : t.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
