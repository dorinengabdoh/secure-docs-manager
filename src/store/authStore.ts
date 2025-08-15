<<<<<<< HEAD
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials } from '../types';
import { supabase } from '../lib/supabase'; // <-- important
=======
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, LoginCredentials } from "../types";
>>>>>>> 954ed46a1601fd0308e58e4a2defc462aada9ff9

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

<<<<<<< HEAD
=======
// Mock users for demonstration
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

>>>>>>> 954ed46a1601fd0308e58e4a2defc462aada9ff9
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });

<<<<<<< HEAD
        // Authentification via Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) {
=======
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock authentication - in real app, this would be an API call
        const user = mockUsers.find(
          (u) =>
            u.email === credentials.email &&
            credentials.password === "password123"
        );

        if (user) {
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } else {
>>>>>>> 954ed46a1601fd0308e58e4a2defc462aada9ff9
          set({ isLoading: false });
          return false;
        }

        // Récupérer les infos du profil (depuis une table "profiles")
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
      },

<<<<<<< HEAD
      logout: async () => {
        await supabase.auth.signOut();
=======
      logout: () => {
>>>>>>> 954ed46a1601fd0308e58e4a2defc462aada9ff9
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
<<<<<<< HEAD
      name: 'auth-storage',
=======
      name: "auth-storage",
>>>>>>> 954ed46a1601fd0308e58e4a2defc462aada9ff9
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
