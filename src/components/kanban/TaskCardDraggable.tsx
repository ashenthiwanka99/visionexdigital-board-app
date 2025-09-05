"use client";

import clsx from "clsx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
};

export default function TaskCardDraggable({ id, children, className }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? "transform 180ms cubic-bezier(0.2, 0, 0, 1)",
    willChange: "transform",
    zIndex: isDragging ? 40 : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx("cursor-grab active:cursor-grabbing", className)}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
