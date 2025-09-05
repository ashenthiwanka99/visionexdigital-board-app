
export enum Category {
    Research = "Research",
    Design = "Design",
    Other = "Other",
    Feedback = "Feedback",
    Presentation = "Presentation",
    Interface = "interface",
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
