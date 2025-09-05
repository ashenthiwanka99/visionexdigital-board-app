"use client";

import { useMemo } from "react";
import clsx from "clsx";
import KanbanLaneHeader from "./KanbanLaneHeader";
import type { LaneConfig } from "@/helpers/types/KanbanTypes";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useTaskStore } from "@/store/useTaskStore";
import type { LaneId } from "@/helpers/types/TaskTypes";
import TaskCardDraggable from "@/components/kanban/TaskCardDraggable";
import KanbanCard from "./KanbanCard";
import type { Task } from "@/helpers/interface/TaskInterface";
import { useSearchStore } from "@/store/useSearchStore";

function rankPriority(p?: string) {
  const k = (p ?? "").toLowerCase();
  if (k === "high") return 0;
  if (k === "medium") return 1;
  return 2;
}

function useLaneDroppable(laneId: string) {
  const { setNodeRef } = useDroppable({ id: `lane-${laneId}` });
  return setNodeRef;
}

function useLaneTasksFilteredAndSorted(laneId: LaneId) {
  const laneTasksRaw = useTaskStore((s) => s.tasks[laneId]) as (Task | null | undefined)[] | undefined;
  const query = useSearchStore((s) => s.query);

  return useMemo(() => {
    const q = (query ?? "").trim().toLowerCase();

    const laneTasks = (laneTasksRaw ?? []).filter(
      (t): t is Task => !!t && typeof t.id === "string"
    );

    const filtered = q.length
      ? laneTasks.filter((t) => (t.title ?? "").toLowerCase().includes(q))
      : laneTasks;

    return [...filtered].sort((a, b) => {
      const pr = rankPriority(a.priority) - rankPriority(b.priority);
      if (pr !== 0) return pr;
      return String(a.title).localeCompare(String(b.title));
    });
  }, [laneTasksRaw, query]);
}


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
  const tasks = useLaneTasksFilteredAndSorted(lane.id as LaneId);
  const setNodeRef = useLaneDroppable(lane.id);

  return (
    <section className={clsx("flex flex-col min-w-[288px] 2xl:min-w-0 2xl:flex-1", className)}>
      <KanbanLaneHeader
        lane={lane}
        onAdd={() => onAddCard?.(lane.id)}
        onMenu={() => onMenu?.(lane.id)}
      />

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
