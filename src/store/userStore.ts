import { create } from "zustand";
import api from "../utilities/api";
import { NewUser } from "../types";

interface UserState {
  users: NewUser[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  setUsers: (users: NewUser[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: true,
  setUsers: (users) => set({ users }),
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await api.get("/users/get");
      set({ users: response.data });
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      set({ loading: false });
    }
  },
}));
