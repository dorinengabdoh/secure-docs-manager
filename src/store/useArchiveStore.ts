// src/store/archiveStore.ts
import { create } from "zustand";
import api from "../utilities/api";
import { Archive } from "../types";

interface ArchiveStore {
  archives: Archive[];
  loading: boolean;
  fetchArchives: () => Promise<void>;
  setArchives: (archives: Archive[]) => void;
}

export const useArchiveStore = create<ArchiveStore>((set) => ({
  archives: [],
  loading: false,

  fetchArchives: async () => {
    set({ loading: true });
    try {
      const res = await api.get<Archive[]>("/files");
      set({ archives: res.data, loading: false });
    } catch (error) {
      console.error("Error fetching archives:", error);
      set({ loading: false });
    }
  },

  setArchives: (archives) => set({ archives }),
}));
