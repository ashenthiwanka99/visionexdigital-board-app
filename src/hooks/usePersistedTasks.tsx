/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import mockTasks from "@/data/tasks.json";
import type { Task } from "@/helpers/interface/TaskInterface";

export function usePersistedTasks() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const api = (useTaskStore as any).persist;

    const seedIfEmpty = () => {
      const s = useTaskStore.getState();
      const total = Object.values(s.tasks).reduce((n: number, arr: any[]) => n + (arr?.length ?? 0), 0);
      if (total === 0) s.setAll(mockTasks as Task[]);
    };

    if (api?.hasHydrated?.()) {
      setHydrated(true);
      seedIfEmpty();
    }
    const unsub = api?.onFinishHydration?.(() => {
      setHydrated(true);
      seedIfEmpty();
    });

    return () => unsub?.();
  }, []);

  return hydrated;
}
