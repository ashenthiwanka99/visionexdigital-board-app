"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useSidebar } from "@/hooks/useSidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();

  return (
    <div className="h-screen bg-white overflow-hidden flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main 
          className={`
            flex-1 overflow-auto pt-4 pb-6 md:pt-6 md:pb-6 max-[760px]:px-4
            min-[1000px]:pl-0
            max-[999px]:transition-all max-[999px]:duration-300 max-[999px]:ease-in-out
            ${isExpanded ? 'max-[999px]:ml-0' : 'max-[999px]:ml-0'}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}