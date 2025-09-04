"use client";

import { useSidebarStore } from "@/store/useSidebarStore";
import { useEffect } from "react";

export default function SportXiProjectPage() {
  const clearCurrentPage = useSidebarStore((s) => s.clearCurrentPage);

  useEffect(() => {
    clearCurrentPage();
  }, [clearCurrentPage]);

  return (
    <div className="p-6">
      xi project page
    </div>
  );
}