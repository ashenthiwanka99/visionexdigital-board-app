import { IconProp } from "./IconInterface";
import { Task, FooterItem } from "./TaskInterface";

export interface KanbanCardProps {
  task?: Task;

  categoryText?: string;
  categoryColor?: string;
  title?: string;

  menuIcon?: IconProp;
  onMenuClick?: () => void;

  assignees?: number;
  priorityLabel?: string;

  withImage?: boolean;
  imageHeight?: number;

  footer?: FooterItem[];
  className?: string;
}