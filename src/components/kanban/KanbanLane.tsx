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
            className={clsx("flex-1 min-w-0 flex flex-col", className)}
            style={{ minWidth: lane.minWidth ?? 360 }}
        >
            <KanbanLaneHeader
                lane={lane}
                onAdd={() => onAddCard?.(lane.id)}
                onMenu={() => onMenu?.(lane.id)}
            />

            <div className="flex-1 overflow-auto p-4"></div>
        </section>
    );
}
