"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

export default function TaskCardDraggable({
  id,
  children,
}: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(isDragging && "opacity-50")}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
