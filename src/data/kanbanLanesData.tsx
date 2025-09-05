import { LaneConfig } from "@/helpers/types/KanbanTypes";

export const defaultLanes: LaneConfig[] = [
  {
    id: "todo",
    title: "To Do",
    pillLabel: "To Do",
    pillBg: "bg-neutral-6",
    pillText: "text-neutral-3",
    count: 0,
    minWidth: 360,
  },
  {
    id: "in-progress",
    title: "In Progress",
    pillLabel: "In Progress",
    pillBg: "bg-[var(--color-orange-500)]",
    pillText: "text-neutral-3",
    count: 0,
    minWidth: 360,
  },
  {
    id: "approved",
    title: "Approved",
    pillLabel: "Approved",
    pillBg: "bg-[var(--color-green-500)]",
    pillText: "text-neutral-3",
    count: 0,
    minWidth: 360,
  },
  {
    id: "rejected",
    title: "Reject",
    pillLabel: "Reject",
    pillBg: "bg-[var(--color-red-500)]",
    pillText: "text-white",
    count: 0,
    minWidth: 360,
  },
];
