"use client";

import clsx from "clsx";
import KanbanLane from "./KanbanLane";
import { LaneConfig } from "@/helpers/types/KanbanTypes";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensors,
  useSensor,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import type { LaneId, Task, TaskMap } from "@/helpers/types/TaskTypes";
import mockTasks from "@/data/tasks.json"; // ⬅️ mock API

type Props = {
  lanes: LaneConfig[];
  className?: string;
  onAddCard?: (laneId: string) => void;
  onLaneMenu?: (laneId: string) => void;
};

export default function KanbanBoard({
  lanes,
  className,
  onAddCard,
  onLaneMenu,
}: Props) {
  const tasks = useTaskStore((s) => s.tasks) as TaskMap;
  const setAll = useTaskStore((s) => s.setAll);
  const moveTask = useTaskStore((s) => s.moveTask);
  const reorderWithin = useTaskStore((s) => s.reorderWithin);

  // ✅ seed store once if empty (won’t overwrite persisted data)
  useEffect(() => {
    const total = Object.values(tasks).reduce((acc, arr) => acc + arr.length, 0);
    if (total === 0) {
      setAll(mockTasks as Task[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const findLaneByTask = (taskId: string): LaneId | undefined => {
    for (const [laneId, list] of Object.entries(tasks) as Array<[LaneId, Task[]]>) {
      if (list.some((t) => t.id === taskId)) return laneId;
    }
    return undefined;
  };

  const findIndexInLane = (laneId: LaneId, taskId: string) =>
    (tasks[laneId] ?? []).findIndex((t) => t.id === taskId);

  const laneIdFromDroppable = (droppableId: string | undefined): LaneId | undefined => {
    if (!droppableId) return undefined;
    if (droppableId.startsWith("lane-")) return droppableId.replace("lane-", "") as LaneId;
    return undefined;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTaskId = String(active.id);
    const overId = String(over.id);

    const fromLane = findLaneByTask(activeTaskId);
    if (!fromLane) return;

    const overLane =
      findLaneByTask(overId) ?? laneIdFromDroppable(overId) ?? fromLane;

    if (!overLane || fromLane === overLane) return;

    const toIndex = (tasks[overLane] ?? []).length;
    moveTask(activeTaskId, overLane, toIndex);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTaskId = String(active.id);
    const overId = String(over.id);

    const fromLane = findLaneByTask(activeTaskId);
    if (!fromLane) return;

    const possibleLaneFromOver =
      findLaneByTask(overId) ?? laneIdFromDroppable(overId);

    if (overId.startsWith("lane-")) {
      const toLane = possibleLaneFromOver ?? fromLane;
      const toIndex = (tasks[toLane] ?? []).length;
      moveTask(activeTaskId, toLane, toIndex);
      return;
    }

    const toLane = possibleLaneFromOver ?? fromLane;
    const fromIndex = findIndexInLane(fromLane, activeTaskId);
    const toIndex = findIndexInLane(toLane, overId);

    if (fromLane === toLane) {
      if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
        reorderWithin(toLane, fromIndex, toIndex);
      }
    } else {
      const insertIndex = toIndex === -1 ? (tasks[toLane] ?? []).length : toIndex;
      moveTask(activeTaskId, toLane, insertIndex);
    }
  };

  return (
    <div className={clsx("w-full", className)}>
      <div className="border-l border-r border-t border-neutral-6 bg-white overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex divide-x divide-neutral-6 w-full min-w-[1000px]">
            {lanes.map((lane) => (
              <KanbanLane
                key={lane.id}
                lane={lane}
                onAddCard={onAddCard}
                onMenu={onLaneMenu}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}
