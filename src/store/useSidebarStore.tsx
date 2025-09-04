"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SidebarStore = {
  activeSectionId: string | null;
  selected: Record<string, string | null>;
  setActiveSection: (id: string | null) => void;
  selectSubItem: (sectionId: string, subId: string) => void;

  badges: Record<string, number>;
  setBadge: (sectionId: string, count: number) => void;
};

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      activeSectionId: null,
      selected: {},
      setActiveSection: (id) => set({ activeSectionId: id }),
      selectSubItem: (sectionId, subId) =>
        set((s) => ({ selected: { ...s.selected, [sectionId]: subId } })),

      badges: {},
      setBadge: (sectionId, count) =>
        set((s) => ({ badges: { ...s.badges, [sectionId]: count } })),
    }),
    {
      name: "sidebar-state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
