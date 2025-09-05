"use client";

import clsx from "clsx";
import KanbanLane from "./KanbanLane";
import { LaneConfig } from "@/helpers/types/KanbanTypes";

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
  return (
    <div className={clsx("w-full", className)}>
      <div className="h-[calc(100vh-64px)] border border-neutral-6 bg-white">
        <div className="flex h-full divide-x divide-neutral-6">
          {lanes.map((lane) => (
            <KanbanLane
              key={lane.id}
              lane={lane}
              onAddCard={onAddCard}
              onMenu={onLaneMenu}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
