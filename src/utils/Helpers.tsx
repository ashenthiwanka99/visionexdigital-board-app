import { categoryColorRegistry, Category } from "@/data/categoryColorRegistry";
import { Task, FooterIcons, FooterItem, FooterTones } from "@/helpers/interface/TaskInterface";

export function formatDateTimeLong(ts: number): string {
  const d = new Date(ts);
  const date = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);

  return `${date}, ${time}`;
}

export function getCategoryBg(name?: string): string {
    if (!name) return "bg-[var(--color-grey-500)]";
    const key = name.trim().toLowerCase();

    const lookup: Record<string, string> = {
        "research": categoryColorRegistry[Category.Research],
        "design": categoryColorRegistry[Category.Design],
        "other": categoryColorRegistry[Category.Other],
        "feedback": categoryColorRegistry[Category.Feedback],
        "presentation": categoryColorRegistry[Category.Presentation],
        "interface": categoryColorRegistry[Category.Interface],
        "ux research": categoryColorRegistry[Category.UXResearch],
    };

    return lookup[key] ?? "bg-[var(--color-grey-500)]";
}

export function buildFooter(task: Task, icons: FooterIcons): FooterItem[] {
  const items: FooterItem[] = [];
  if (task.stats?.links)
    items.push({ kind: "links", icon: icons.links, label: task.stats.links, ...FooterTones.links });
  if (task.stats?.comments)
    items.push({ kind: "comments", icon: icons.comments, label: task.stats.comments, ...FooterTones.comments });
  if (task.dueText)
    items.push({ kind: "date", icon: icons.date, label: task.dueText, ...FooterTones.date });
  if (task.stats?.reports)
    items.push({ kind: "reports", icon: icons.reports, label: `${task.stats.reports} Reports`, ...FooterTones.reports });
  items.push({
    kind: "stream",
    icon: icons.stream,
    label: task.stream ? "Stream" : "Bell",
    ...FooterTones.stream,
  });
  return items;
}