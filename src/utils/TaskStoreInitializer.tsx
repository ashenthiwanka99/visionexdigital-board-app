"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { Task } from "@/helpers/interface/TaskInterface";

export default function TaskStoreInitializer() {
  const tasks = useTaskStore((s) => s.tasks);
  const setAll = useTaskStore((s) => s.setAll);

  useEffect(() => {
    const empty = Object.values(tasks).every(arr => arr.length === 0);
    if (!empty) return;

    (async () => {
      const res = await fetch("/data/tasks.json", { cache: "no-store" });
      const list = (await res.json()) as Task[];
      setAll(list);
    })();
  }, [tasks, setAll]);

  return null;
}
