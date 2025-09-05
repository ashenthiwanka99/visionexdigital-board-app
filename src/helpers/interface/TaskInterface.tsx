import type { IconProp } from "@/helpers/interface/IconInterface";
import { LaneId } from "../types/KanbanTypes";
import { Priority, FooterKind } from "../types/TaskTypes";

export interface Category {
  name: string;
  color: string;
}

export interface TaskStats {
  links?: number;
  comments?: number;
  reports?: number;
}

export interface Task {
  id: string;
  title: string;
  status: LaneId;
  category: Category;
  assignees: number;
  priority: Priority;
  hasImage?: boolean;
  stats?: TaskStats;
  dueText?: string;
  stream?: boolean;
}

export interface TaskMap {
  todo: Task[];
  "in-progress": Task[];
  approved: Task[];
  rejected: Task[];
}

export interface FooterItem {
  kind: FooterKind;
  icon: IconProp;
  label: string | number;
  iconColor?: string;
  textColor?: string;
}

export interface FooterIcons {
  links: IconProp;
  comments: IconProp;
  date: IconProp;
  reports: IconProp;
  stream: IconProp;
}

export const FooterTones: Record<FooterKind, { iconColor: string; textColor: string }> = {
  links: { iconColor: "neutral-4", textColor: "text-neutral-4" },
  comments: { iconColor: "neutral-4", textColor: "text-neutral-4" },
  date: { iconColor: "neutral-4", textColor: "text-neutral-4" },
  reports: { iconColor: "red-500", textColor: "text-red-600" },
  stream: { iconColor: "blue-500", textColor: "text-blue-600" },
};


