import React, { useState } from "react";
import {
  Users as UsersIcon,
  UserPlus,
  Shield,
  Trash2,
  SquarePen,
} from "lucide-react";
import { translations } from "../../translations";
import { useLanguageStore } from "../../store/languageStore";
import { AddUserModal } from "./AddUserModal";
import { NewUser } from "../../types";

interface UsersProps {
  isDark: boolean;
}

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "Inactive",
  },
];

export const Users: React.FC<UsersProps> = ({ isDark }) => {
  const { language } = useLanguageStore();
  const t = translations[language];
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);

  const handleSubmitUser = (newUser: NewUser) => {
    const userData = {
      ...newUser,
      id: Date.now(),
      date: new Date().toISOString(),
    };

    console.log("Submitting new user:", userData);
  };

  const handleDelete = (newUser: NewUser) => {
    if (window.confirm(t.confirmDeleteUser)) {
      console.log("Deleting user:", newUser);
    }
  };

  return (
    <div
      className={`${
        isDark ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-lg p-6`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <UsersIcon className="h-6 w-6 mr-3" />
          <h2 className="text-xl font-semibold">{t.users}</h2>
        </div>
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setShowAddUser(true)}
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
          <p className="text-2xl font-bold text-blue-600">{mockUsers.length}</p>
        </div>
        <div
          className={`${isDark ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}
        >
          <h3 className="text-lg font-semibold mb-2">Active Users</h3>
          <p className="text-2xl font-bold text-green-600">
            {mockUsers.filter((u) => u.status === "Active").length}
          </p>
        </div>
        <div
          className={`${isDark ? "bg-gray-700" : "bg-gray-50"} p-4 rounded-lg`}
        >
          <h3 className="text-lg font-semibold mb-2">Administrators</h3>
          <p className="text-2xl font-bold text-purple-600">
            {mockUsers.filter((u) => u.role === "Admin").length}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className={`border-b ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Role</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
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
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      user.role === "Admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role === "Admin" && (
                      <Shield className="h-3 w-3 mr-1" />
                    )}
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      className="p-2 rounded-lg text-blue-500 hover:bg-blue-500 hover:bg-opacity-20"
                      title="Edit User"
                      onClick={() => setShowAddUser(true)}
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
      {showAddUser && (
        <AddUserModal
          isDark={isDark}
          onClose={() => setShowAddUser(false)}
          onSubmit={handleSubmitUser}
        />
      )}
      {showEditUser && (
        <AddUserModal
          isDark={isDark}
          onClose={() => setShowEditUser(false)}
          onSubmit={handleSubmitUser}
        />
      )}
    </div>
  );
};
