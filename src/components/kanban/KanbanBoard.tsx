/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import clsx from "clsx";
import { LaneConfig } from "@/helpers/types/KanbanTypes";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  KeyboardSensor,
  useSensors,
  useSensor,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
  MeasuringStrategy,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import type { LaneId } from "@/helpers/types/TaskTypes";
import { TaskMap, Task } from "@/helpers/interface/TaskInterface";
import KanbanLaneCmp from "./KanbanLane";
import KanbanCard from "./KanbanCard";
import { usePersistedTasks } from "@/hooks/usePersistedTasks";

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
  const moveTask = useTaskStore((s) => s.moveTask);
  const reorderWithin = useTaskStore((s) => s.reorderWithin);

  const hydrated = usePersistedTasks();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  const allTasksFlat = useMemo(() => Object.values(tasks).flat(), [tasks]);
  const getTaskById = (id?: string | null): Task | undefined =>
    id ? allTasksFlat.find((t) => t.id === id) : undefined;

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

  const handleDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id));

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
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeTaskId = String(active.id);
    const overId = String(over.id);

    const fromLane = findLaneByTask(activeTaskId);
    if (!fromLane) {
      setActiveId(null);
      return;
    }

    const possibleLaneFromOver =
      findLaneByTask(overId) ?? laneIdFromDroppable(overId);

    if (overId.startsWith("lane-")) {
      const toLane = possibleLaneFromOver ?? fromLane;
      const toIndex = (tasks[toLane] ?? []).length;
      moveTask(activeTaskId, toLane, toIndex);
      setActiveId(null);
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

    setActiveId(null);
  };

  const activeTask = getTaskById(activeId);

  return (
    <div className={clsx("w-full", className)}>
      <div className="border-l border-r border-t border-neutral-6 bg-white overflow-x-auto">
        {hydrated ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
          >
            <div className="flex divide-x divide-neutral-6 w-max 2xl:w-full">
              {lanes.map((lane) => (
                <KanbanLaneCmp
                  key={lane.id}
                  lane={lane}
                  onAddCard={onAddCard}
                  onMenu={onLaneMenu}
                />
              ))}
            </div>

            <DragOverlay dropAnimation={{ duration: 180, easing: "cubic-bezier(0.2, 0, 0, 1)" }}>
              {activeTask ? (
                <div className="pointer-events-none w-[260px]">
                  <KanbanCard task={activeTask} />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        ) : (
          <div className="p-6 text-sm text-neutral-4">Loading board…</div>
        )}
      </div>
    </div>
  );
}
