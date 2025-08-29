import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, LoginCredentials } from "../types";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials?: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Regular User",
    role: "user",
  },
];

const DEFAULT_PASSWORD = "password123";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials?: LoginCredentials) => {
        set({ isLoading: true });

        const email = credentials?.email || mockUsers[0].email;
        const password = credentials?.password || DEFAULT_PASSWORD;

        await new Promise((resolve) => setTimeout(resolve, 1000));
        const user = mockUsers.find(
          (u) => u.email === email && password === DEFAULT_PASSWORD
        );

        if (user) {
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }

        /*
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error || !data.user) {
          set({ isLoading: false });
          return false;
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError || !profileData) {
          set({ isLoading: false });
          return false;
        }

        const user: User = {
          id: data.user.id,
          email: data.user.email!,
          name: profileData.name,
          role: profileData.role,
        };

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        return true;
        */

        set({ isLoading: false });
        return false;
      },

      logout: async () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
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
