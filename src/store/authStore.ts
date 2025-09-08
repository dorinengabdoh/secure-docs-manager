import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, LoginCredentials } from "../types";
import api from "../utilities/api";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });

        try {
          const { data } = await api.post("/auth/login", credentials);

          // If backend returns user info and token
          if (data?.user) {
            set({
              user: data.user,
              isAuthenticated: true,
              isLoading: false,
            });

            if (data.token) {
              localStorage.setItem("token", data.token);
            }

            return true;
          }

          set({ isLoading: false });
          return false;
        } catch (error: any) {
          console.error("Login error:", error?.response?.data || error.message);
          set({ isLoading: false });
          return false;
        }
      },

      logout: async () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        localStorage.removeItem("token");
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
