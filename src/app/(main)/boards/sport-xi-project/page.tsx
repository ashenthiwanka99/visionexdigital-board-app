"use client";

import ProjectHeader from "@/components/project/ProjectHeader";
import { useSportXiProjectPage } from "@/hooks/SportXiProjectPage";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { defaultLanes } from "@/data/kanbanLanesData";

export default function SportXiProjectPage() {
  const { headerProps } = useSportXiProjectPage();

  // Add-only: handlers the board can call (wire to store later)
  const handleAddCard = (laneId: string) => {
    // TODO: open “new card” dialog or push a stub into the lane
    console.log("Add card in lane:", laneId);
  };

  const handleLaneMenu = (laneId: string) => {
    // TODO: open lane menu (rename, clear, delete, etc.)
    console.log("Lane menu for:", laneId);
  };

  return (
    <div className="block">
      <ProjectHeader
        status={headerProps.status}
        statusBg={headerProps.statusBg}
        avatarCount={headerProps.avatarCount}
      />

      <div className="">
        <KanbanBoard
          lanes={defaultLanes}
          onAddCard={handleAddCard}
          onLaneMenu={handleLaneMenu}
        />
      </div>
    </div>
  );
}
