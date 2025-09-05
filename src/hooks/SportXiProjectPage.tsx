"use client";

import { useEffect } from "react";
import { useSidebarStore } from "@/store/useSidebarStore";

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
        statusBg: "bg-[var(--color-orange-500)]",
        avatarCount: 2,
    };

    return { headerProps };
}
