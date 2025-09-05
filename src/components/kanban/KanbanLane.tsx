"use client";

import clsx from "clsx";
import KanbanLaneHeader from "./KanbanLaneHeader";
import type { LaneConfig } from "@/helpers/types/KanbanTypes";

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

      <div className="flex-1 p-4 min-h-[calc(100vh-200px)]"></div>
    </section>
  );
}