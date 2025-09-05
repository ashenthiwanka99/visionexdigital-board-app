export enum Category {
  Research = "Research",
  Design = "Design",
  Other = "Other",
  Feedback = "Feedback",
  Presentation = "Presentation",
  Interface = "Interface",
  UXResearch = "UX Research",
}

export const categoryColorRegistry: Record<Category, string> = {
  [Category.Research]: "bg-[var(--color-green-500)]",
  [Category.Design]: "bg-[var(--color-red-500)]",
  [Category.Other]: "bg-[var(--color-grey-500)]",
  [Category.Feedback]: "bg-[var(--color-primary-500)]",
  [Category.Presentation]: "bg-[var(--color-orange-500)]",
  [Category.Interface]: "bg-[var(--color-darkgrey-500)]",
  [Category.UXResearch]: "bg-[var(--color-yellow-500)]",
};

export function normalizeCategory(name?: string): Category | null {
  if (!name) return null;
  const k = name.trim().toLowerCase();

  if (k === "research" || k === "research") return Category.Research;
  if (k === "design") return Category.Design;
  if (k === "other") return Category.Other;
  if (k === "feedback") return Category.Feedback;
  if (k === "presentation") return Category.Presentation;
  if (k === "interface") return Category.Interface;
  if (k === "ux research" || k === "ux research" || k === "ux-research") return Category.UXResearch;

  return null;
}
