"use client";

import SidebarWorkspaceCard from "@/components/ui/SidebarWorkspaceCard";
import SidebarSection from "@/components/ui/SidebarSection";
import CustomButtonLeftIcon from "@/components/ui/CustomButtonLeftIcon";

import data from "@/data/sidebar.json";
import { sidebarIconRegistry, SidebarIconKey } from "@/data/sidebarIconRegistry";
import type { SidebarItem } from "@/types/SidebarTypes";
import { useSidebarStore } from "@/store/useSidebarStore";

import SupportIcon from "@/images/icons/Info_Circle.svg";
import LogoutIcon from "@/images/icons/Sign_Out.svg";

export default function Sidebar() {
  const items = data as unknown as SidebarItem[];
  useSidebarStore.getState().setBadge("messages", 3);

  return (
    <aside className="w-full md:w-[288px] md:min-w-[288px] h-[calc(100vh-64px)] border-r md:border-r border-[#E6E8EC] bg-white p-0 flex flex-col">
      <SidebarWorkspaceCard
        title="Root folder"
        subtitle="workspace"
        className="pt-[24px] pl-[24px] pr-[24px]"
      />

      <div className="mt-[24px] ml-[24px] mr-[24px] flex flex-col gap-[14px]">
        {items.map((item) => (
          <SidebarSection
            key={item.id}
            sectionId={item.id}
            icon={sidebarIconRegistry[item.iconKey as SidebarIconKey]}
            title={item.title}
            subItems={item.subItems}
          />
        ))}
      </div>

      <div className="mt-auto px-[24px] pb-[24px] space-y-3">
        <CustomButtonLeftIcon
          label="Support"
          icon={SupportIcon}
          variant="ghost"
          height={48}
          width={240}
        />
        <CustomButtonLeftIcon
          label="Logout"
          icon={LogoutIcon}
          variant="solid"
          height={48}
          width={240}
        />
      </div>
    </aside>
  );
}
