"use client";

import SidebarWorkspaceCard from "@/components/ui/SidebarWorkspaceCard";
import SidebarSection from "@/components/ui/SidebarSection";
import data from "@/data/sidebar.json";
import { sidebarIconRegistry } from "@/data/sidebarIconRegistry";
import type { SidebarItem } from "@/types/SidebarTypes";

export default function Sidebar() {
    const items = data as SidebarItem[];

    return (
        <aside className="w-full md:w-[264px] min-h-[calc(100vh-64px)] border-r md:border-r border-[#E6E8EC] bg-white p-0">
            <SidebarWorkspaceCard
                title="Root folder"
                subtitle="workspace"
                className="pt-[24px] pl-[25px] pr-[23px] mb-[24px]"
            />

            <div className="pl-[24px] pr-[24px] space-y-3.5">
                {items.map((item) => (
                    <SidebarSection
                        key={item.id}
                        icon={sidebarIconRegistry[item.iconKey]}
                        title={item.title}
                        defaultOpen={item.defaultOpen}
                        subItems={item.subItems}
                    />
                ))}
            </div>
        </aside>
    );
}
