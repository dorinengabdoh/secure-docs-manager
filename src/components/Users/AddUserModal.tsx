import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { NewUser } from "../../types";
import { translations } from "../../translations";
import { useLanguageStore } from "../../store/languageStore";
import api from "../../utilities/api"; // Axios instance

interface NewUserModalProps {
  isDark: boolean;
  onClose: () => void;
  onSubmit?: (user: NewUser) => void;
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
        password: "", // 🔑 keep empty on edit
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let response;
      if (user) {
        // Editing existing user
        response = await api.put(`/users/${user.id}`, {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          status: newUser.status,
          ...(newUser.password ? { password: newUser.password } : {}),
        });
      } else {
        // Adding new user
        response = await api.post("/users/add", {
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
          status: newUser.status,
        });
      }

      if (onSubmit) onSubmit(response.data);
      onClose();
    } catch (err: any) {
      console.error("Error saving user:", err);
      setError(
        err.response?.data?.error || "Failed to save user. Please try again."
      );
    } finally {
      setLoading(false);
    }
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

        {error && (
          <div className="mb-4 text-red-500 text-sm font-medium">{error}</div>
        )}

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
                required={!user} // required only when adding
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
                <option value={t.userRole1.toLocaleLowerCase()}>
                  {t.userRole1}
                </option>
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
                <option value={t.userStatus1.toLocaleLowerCase()}>
                  {t.userStatus1}
                </option>
                <option value={t.userStatus2.toLocaleLowerCase()}>
                  {t.userStatus2}
                </option>
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
              disabled={loading}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? t.loading || "Submitting..."
                : user
                ? t.saveChanges || "Update"
                : t.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
