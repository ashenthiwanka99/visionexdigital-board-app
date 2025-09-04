"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useSidebarStore } from "@/store/useSidebarStore";

export default function Page() {
    useSidebarStore.getState().setBadge("messages", 3);
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[264px_1fr]">
        <Sidebar />
        <main className="p-4 md:p-6">
        
        </main>
      </div>
    </div>
  );
}
