"use client";

import ProjectHeader from "@/components/project/ProjectHeader";
import { useSidebarStore } from "@/store/useSidebarStore";
import { useEffect } from "react";

export default function SportXiProjectPage() {
  const clearCurrentPage = useSidebarStore((s) => s.clearCurrentPage);

  useEffect(() => {
    clearCurrentPage();
  }, [clearCurrentPage]);

  return (
    <div className="block">
      <ProjectHeader status={"In progress"} statusBg={"bg-yellow-500"} avatarCount={2} />
    </div>
  );
}