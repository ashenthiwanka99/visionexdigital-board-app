"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SearchState = {
    query: string;
    setQuery: (q: string) => void;
    clear: () => void;
};

export const useSearchStore = create<SearchState>()(
    persist(
        (set) => ({
            query: "",
            setQuery: (q) => set({ query: q }),
            clear: () => set({ query: "" }),
        }),
        {
            name: "kanban-search-v1",
            storage: createJSONStorage(() => sessionStorage),
            partialize: (s) => ({ query: s.query }),
        }
    )
);
