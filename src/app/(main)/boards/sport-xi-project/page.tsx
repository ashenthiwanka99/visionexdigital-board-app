"use client";

import ProjectHeader from "@/components/project/ProjectHeader";
import { useSportXiProjectPage } from "@/hooks/SportXiProjectPage";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { defaultLanes } from "@/data/kanbanLanesData";

export default function SportXiProjectPage() {
  const { headerProps } = useSportXiProjectPage();

  const handleAddCard = (laneId: string) => {
    console.log("Add card in lane:", laneId);
  };

  const handleLaneMenu = (laneId: string) => {
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
