"use client";

import clsx from "clsx";
import CustomPill from "@/components/ui/CustomPill";
import CustomIconButton from "@/components/ui/CustomIconButton";
import type { LaneConfig } from "@/helpers/types/KanbanTypes";

import PlusIcon from "@/images/icons/Plus.svg";
import DotsIcon from "@/images/icons/Dots.svg";

type Props = {
    lane: LaneConfig;
    onAdd?: () => void;
    onMenu?: () => void;
    className?: string;
};

export default function KanbanLaneHeader({ lane, onAdd, onMenu, className }: Props) {
    const {
        pillLabel = lane.title,
        pillBg = "bg-neutral-7",
        pillText = "text-neutral-3",
    } = lane;

    return (
        <div
            className={clsx(
                "flex items-center justify-between sticky top-0 bg-white z-10",
                "border-b border-neutral-6",
                "px-3 sm:px-4 pb-4 sm:pb-5 pt-3 sm:pt-3",
                className
            )}
        >
            <CustomPill
                label={pillLabel}
                radius={46}
                textColor={pillText}
                fontSize={14}
                fontWeight="font-medium"
                className={clsx("px-3 sm:px-6", pillBg)}
            />

            <div className="flex items-center gap-1">
                <CustomIconButton
                    aria-label="Add card"
                    icon={PlusIcon}
                    width={32}
                    height={32}
                    color="neutral-3"
                    onClick={onAdd}
                    className="border border-neutral-7 hover:bg-neutral-8/40"
                />
                <CustomIconButton
                    aria-label="Lane menu"
                    icon={DotsIcon}
                    width={32}
                    height={32}
                    color="neutral-3"
                    onClick={onMenu}
                    className="border border-neutral-7 hover:bg-neutral-8/40"
                />
            </div>
        </div>
    );
}
