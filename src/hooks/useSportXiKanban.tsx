"use client";

import { useEffect, useCallback } from "react";
import { useSidebarStore } from "@/store/useSidebarStore";
import { defaultLanes } from "@/data/kanbanLanesData";
import type { LaneConfig } from "@/helpers/types/KanbanTypes";

export type SportXiHeaderProps = {
  status: string;
  statusBg: string;
  avatarCount: number;
};

export function useSportXiProjectPage() {
  const clearCurrentPage = useSidebarStore((s) => s.clearCurrentPage);

  useEffect(() => {
    clearCurrentPage();
  }, [clearCurrentPage]);

  const headerProps: SportXiHeaderProps = {
    status: "In progress",
    statusBg: "bg-[var(--color-yellow-500)]",
    avatarCount: 2,
  };

  return { headerProps };
}

type UseSportXiKanbanReturn = {
  headerProps: SportXiHeaderProps;
  lanes: LaneConfig[];
  onAddCard: (laneId: string) => void;
  onLaneMenu: (laneId: string) => void;
};

export function useSportXiKanban(lanes: LaneConfig[] = defaultLanes): UseSportXiKanbanReturn {
  const { headerProps } = useSportXiProjectPage();

  const onAddCard = useCallback((laneId: string) => {
    console.log("Add card in lane:", laneId);
  }, []);

  const onLaneMenu = useCallback((laneId: string) => {
    console.log("Lane menu for:", laneId);
  }, []);

  return { headerProps, lanes, onAddCard, onLaneMenu };
}
