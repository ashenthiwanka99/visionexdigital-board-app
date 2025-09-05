"use client";

import ProjectHeader from "@/components/project/ProjectHeader";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { useSportXiKanban } from "@/hooks/useSportXiKanban";

export default function SportXiProjectPage() {
  const { headerProps, lanes, onAddCard, onLaneMenu } = useSportXiKanban();

  return (
    <div className="block">
      <ProjectHeader
        status={headerProps.status}
        statusBg={headerProps.statusBg}
        avatarCount={headerProps.avatarCount}
      />

      <div>
        <KanbanBoard
          lanes={lanes}
          onAddCard={onAddCard}
          onLaneMenu={onLaneMenu}
        />
      </div>
    </div>
  );
}
