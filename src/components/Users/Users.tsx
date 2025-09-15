import React, { useState, useEffect } from "react";
import { Users as UsersIcon, UserPlus, Trash2, SquarePen } from "lucide-react";
import { translations } from "../../translations";
import { useLanguageStore } from "../../store/languageStore";
import { AddUserModal } from "./AddUserModal";
import { NewUser } from "../../types";
import api from "../../utilities/api"; // Axios instance
import { useUserStore } from "../../store/userStore";

interface UsersProps {
  isDark: boolean;
  onClose: () => void;
  onSubmit: (user: NewUser) => Promise<void>;
}

export const Users: React.FC<UsersProps> = ({ isDark }) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  const users = useUserStore((s) => s.users);
  const loading = useUserStore((s) => s.loading);
  const setUsers = useUserStore((s) => s.setUsers);
  const fetchUsers = useUserStore((s) => s.fetchUsers);

  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<NewUser | null>(null);
  const [alert, setAlert] = useState<{ message: string; type: string } | null>(
    null
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const showAlert = (message: string, type: string) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  // Add or Edit user
  const handleSubmitUser = async (user: NewUser) => {
    try {
      if (editingUser) {
        // Update user
        const response = await api.put(`/users/${editingUser.id}`, user);
        setUsers(
          users.map((u) => (u.id === editingUser.id ? response.data : u))
        );
        showAlert(t.userUpdated || "User updated successfully", "success");
        setEditingUser(null);
      } else {
        // Add new user
        const response = await api.post("/users/add", user);
        setUsers([...users, response.data]);
        showAlert(t.userAdded || "User added successfully", "success");
      }
      setShowAddUser(false);
    } catch (err: any) {
      console.error("Failed to save user:", err);
      showAlert(err.response?.data?.error || "Failed to save user.", "error");
    }
  };

  // Delete user
  const handleDelete = async (user: NewUser) => {
    if (!window.confirm(t.confirmDeleteUser)) return;
    try {
      await api.delete(`/users/${user.id}`);
      setUsers(users.filter((u) => u.id !== user.id));
      showAlert(t.userDeleted || "User deleted successfully", "success");
    } catch (err) {
      console.error("Failed to delete user:", err);
      showAlert(t.deleteUserError || "Failed to delete user.", "error");
    }
  };

  return (
    <div
      className={`${
        isDark ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-lg p-6`}
    >
      {/* Brief alert */}
      {alert && (
        <div
          className={`fixed top-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white z-50 transition-transform transform ${
            alert.type === "success"
              ? "bg-green-500"
              : alert.type === "error"
              ? "bg-red-500"
              : "bg-gray-500"
          }`}
        >
          {alert.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <UsersIcon className="h-6 w-6 mr-3" />
          <h2 className="text-xl font-semibold">{t.users}</h2>
        </div>
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => {
            setEditingUser(null);
            setShowAddUser(true);
          }}
        >
          <UserPlus className="h-5 w-5 mr-2" />
          {t.addNewUser}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          className={`${isDark ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}
        >
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-2xl font-bold text-blue-600">{users.length}</p>
        </div>
        <div
          className={`${isDark ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}
        >
          <h3 className="text-lg font-semibold mb-2">Active Users</h3>
          <p className="text-2xl font-bold text-green-600">
            {users.filter((u) => u.status === "active").length}
          </p>
        </div>
        <div
          className={`${isDark ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}
        >
          <h3 className="text-lg font-semibold mb-2">Administrators</h3>
          <p className="text-2xl font-bold text-purple-600">
            {users.filter((u) => u.role === "admin").length}
          </p>
        </div>
      </div>

      {loading && users.length === 0 ? (
        <div className="text-center py-10 text-gray-500">{t.loading}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <th className="text-left py-3 px-4">{t.userName}</th>
                <th className="text-left py-3 px-4">{t.userEmail}</th>
                <th className="text-left py-3 px-4">{t.userRole}</th>
                <th className="text-left py-3 px-4">{t.userSatus}</th>
                <th className="text-right py-3 px-4">{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className={`border-b ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  } hover:bg-opacity-50 ${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="py-4 px-4 font-medium">{user.name}</td>
                  <td className="py-4 px-4">{user.email}</td>
                  <td className="py-4 px-4">{user.role}</td>
                  <td className="py-4 px-4">{user.status}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        className="p-2 rounded-lg text-blue-500 hover:bg-blue-500 hover:bg-opacity-20"
                        title="Edit User"
                        onClick={() => {
                          setEditingUser(user);
                          setShowAddUser(true);
                        }}
                      >
                        <SquarePen className="h-5 w-5" />
                      </button>
                      <button
                        className="p-2 rounded-lg text-red-500 hover:bg-red-500 hover:bg-opacity-20"
                        title="Delete user"
                        onClick={() => handleDelete(user)}
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
      )}

      {showAddUser && (
        <AddUserModal
          isDark={isDark}
          onClose={() => {
            setShowAddUser(false);
            setEditingUser(null);
          }}
          onSubmit={handleSubmitUser}
          user={editingUser}
          key={editingUser?.id || "new"}
        />
      )}
    </div>
  );
};
