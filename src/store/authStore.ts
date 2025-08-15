import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials } from '../types';
import { supabase } from '../lib/supabase';

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

        // Authentification via Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) {
          set({ isLoading: false });
          return false;
        }

        // Récupérer les infos du profil depuis la table "profiles"
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

      logout: async () => {
        await supabase.auth.signOut();
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
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
