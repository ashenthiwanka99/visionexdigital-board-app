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
      <div className="border-l border-r border-t border-neutral-6 bg-white overflow-x-auto">
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
      </div>
    </div>
  );
}