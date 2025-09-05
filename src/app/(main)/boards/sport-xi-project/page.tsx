"use client";

import ProjectHeader from "@/components/project/ProjectHeader";
import { useSportXiProjectPage } from "@/hooks/SportXiProjectPage";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { defaultLanes } from "@/data/kanbanLanesData";

export default function SportXiProjectPage() {
  const { headerProps } = useSportXiProjectPage();

  return (
    <div className="block">
      <ProjectHeader
        status={headerProps.status}
        statusBg={headerProps.statusBg}
        avatarCount={headerProps.avatarCount}
      />

      <div className="">
        <KanbanBoard lanes={defaultLanes} />
      </div>
    </div>
  );
}
