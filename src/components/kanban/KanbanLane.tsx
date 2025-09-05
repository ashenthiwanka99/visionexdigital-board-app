"use client";

import clsx from "clsx";
import KanbanLaneHeader from "./KanbanLaneHeader";
import type { LaneConfig } from "@/helpers/types/KanbanTypes";

// NEW: dnd-kit + data/store + card imports
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useTaskStore } from "@/store/useTaskStore";
import type { LaneId } from "@/helpers/types/TaskTypes";
import TaskCardDraggable from "@/components/kanban/TaskCardDraggable";
import KanbanCard from "./KanbanCard";


type LaneProps = {
  lane: LaneConfig;
  className?: string;
  onAddCard?: (laneId: string) => void;
  onMenu?: (laneId: string) => void;
};

export default function KanbanLane({
  lane,
  className,
  onAddCard,
  onMenu,
}: LaneProps) {
  // NEW: pull tasks for this lane from the store
  const tasks = useTaskStore((s) => s.tasks[lane.id as LaneId]);

  // NEW: make the lane a droppable area
  const { setNodeRef } = useDroppable({ id: `lane-${lane.id}` });

  return (
    <section
      className={clsx("flex flex-col", className)}
      style={{ minWidth: "0", width: "100%" }}
    >
      <KanbanLaneHeader
        lane={lane}
        onAdd={() => onAddCard?.(lane.id)}
        onMenu={() => onMenu?.(lane.id)}
      />

      {/* KEEP your classes; only added ref + SortableContext + mapping */}
      <div ref={setNodeRef} className="flex-1 p-4 min-h-[calc(100vh-200px)]">
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {tasks.map((t) => (
              <TaskCardDraggable key={t.id} id={t.id}>
                <KanbanCard task={t} />
              </TaskCardDraggable>
            ))}
          </div>
        </SortableContext>
      </div>
    </section>
  );
}
