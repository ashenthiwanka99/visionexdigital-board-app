"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ProjectHeader from "@/components/project/ProjectHeader";
import { useSportXiProjectPage } from "@/hooks/SportXiProjectPage";

export default function SportXiProjectPage() {
  const { headerProps } = useSportXiProjectPage();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[264px_1fr]">
        <Sidebar />
        <main className="p-4 md:p-6">
          <ProjectHeader
            status={headerProps.status}
            statusBg={headerProps.statusBg}
            avatarCount={headerProps.avatarCount}
          />
        </main>
      </div>
    </div>
  );
}
