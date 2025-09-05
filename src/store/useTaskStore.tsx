"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, LaneId } from "@/helpers/types/TaskTypes";

type TaskState = {
  tasks: Record<LaneId, Task[]>;
  setAll: (list: Task[]) => void;
  moveTask: (taskId: string, toLane: LaneId, toIndex?: number) => void;
  reorderWithin: (lane: LaneId, fromIndex: number, toIndex: number) => void;
};

function toBuckets(list: Task[]): Record<LaneId, Task[]> {
  const buckets: Record<LaneId, Task[]> = {
    "todo": [], "in-progress": [], "approved": [], "rejected": []
  };
  list.forEach(t => buckets[t.status].push(t));
  return buckets;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: { "todo": [], "in-progress": [], "approved": [], "rejected": [] },

      setAll: (list) => set({ tasks: toBuckets(list) }),

      moveTask: (taskId, toLane, toIndex) => {
        const state = { ...get().tasks }; // Create a shallow copy of tasks
        let task: Task | null = null;
        let fromLane: LaneId | null = null;

        // Find and remove the task from its current lane
        for (const lid of Object.keys(state) as LaneId[]) {
          const idx = state[lid].findIndex((t) => t.id === taskId);
          if (idx !== -1) {
            task = state[lid][idx];
            state[lid] = [...state[lid].slice(0, idx), ...state[lid].slice(idx + 1)];
            fromLane = lid;
            break;
          }
        }

        // If task not found, exit
        if (!task) return;

        // Update task status and move to destination lane
        task.status = toLane;
        const dest = state[toLane];
        const insertAt = Math.max(0, Math.min(toIndex ?? dest.length, dest.length));
        state[toLane] = [...dest.slice(0, insertAt), task, ...dest.slice(insertAt)];

        set({ tasks: state });
      },

      reorderWithin: (lane, fromIndex, toIndex) => {
        const laneArr = [...get().tasks[lane]];
        const [item] = laneArr.splice(fromIndex, 1);
        laneArr.splice(toIndex, 0, item);
        set((s) => ({ tasks: { ...s.tasks, [lane]: laneArr } }));
      },
    }),
    { name: "kanban-tasks-v1" }
  )
);