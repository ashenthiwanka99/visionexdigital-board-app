"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type MetaState = {
  lastUpdated: number | null;
  setLastUpdated: (ts?: number) => void;
  touch: () => void;
};

export const useMetaStore = create<MetaState>()(
  persist(
    (set) => ({
      lastUpdated: null,
      setLastUpdated: (ts = Date.now()) => set({ lastUpdated: ts }),
      touch: () => set({ lastUpdated: Date.now() }),
    }),
    { name: "meta-store", storage: createJSONStorage(() => sessionStorage) }
  )
);
