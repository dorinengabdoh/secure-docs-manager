import { create } from 'zustand';

interface LanguageStore {
  language: 'en' | 'fr';
  setLanguage: (language: 'en' | 'fr') => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
}));