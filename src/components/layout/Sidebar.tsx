"use client";

import SidebarWorkspaceCard from "@/components/ui/SidebarWorkspaceCard";
import SidebarSection from "@/components/ui/SidebarSection";
import CustomSidebarButton from "@/components/ui/CustomSidebarButton";
import SvgIcon from "@/components/ui/SvgIcon";
import ImagePlaceholder from "@/components/ui/CustomImagePlaceholder";

import sidebarData from "@/data/sidebar.json";
import { sidebarIconRegistry, SidebarIconKey } from "@/data/sidebarIconRegistry";
import { useSidebarStore } from "@/store/useSidebarStore";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import SupportIcon from "@/images/icons/Info_Circle.svg";
import LogoutIcon from "@/images/icons/Sign_Out.svg";

import type { SidebarItem, SidebarSubItem } from "@/types/SidebarTypes";

export default function Sidebar() {
  const items = sidebarData as SidebarItem[];

  const router = useRouter();
  const pathname = usePathname();

  const activeSectionId = useSidebarStore((s) => s.activeSectionId);
  const setActiveSection = useSidebarStore((s) => s.setActiveSection);
  const setCurrentPage = useSidebarStore((s) => s.setCurrentPage);
  const clearCurrentPage = useSidebarStore((s) => s.clearCurrentPage);

  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleMobileIconClick = (item: SidebarItem) => {
    setActiveSection(item.id);
    setIsExpanded(true);
    setCurrentPage(item.title, "header");
    router.push("/");
  };

  const handleSectionClick = (item: SidebarItem) => {
    setActiveSection(item.id);
    setCurrentPage(item.title, "header");
    router.push("/");
  };

  const handleSubItemClick = (subItem: SidebarSubItem, parentTitle: string) => {
    if (subItem.id === "sport-xi-project" || subItem.route === "/boards/sport-xi-project") {
      clearCurrentPage();
      router.push("/boards/sport-xi-project");
    } else {
      setCurrentPage(subItem.label, "subheader");
      router.push("/");
    }
  };

  useEffect(() => {
    const currentItem = items.find((item) => {
      if (item.route === pathname) return true;
      if (item.subItems) {
        return item.subItems.some((subItem) => subItem.route === pathname);
      }
      return false;
    });
    if (currentItem) {
      setActiveSection(currentItem.id);
    }
  }, [pathname, items, setActiveSection]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  return (
    <>
      <aside className="hidden min-[1000px]:flex w-full md:w-[288px] md:min-w-[288px] h-[calc(100vh-64px)] border-r border-[#E6E8EC] bg-white p-0 flex-col">
        <SidebarWorkspaceCard
          title="Root folder"
          subtitle="workspace"
          className="pt-[24px] pl-[24px] pr-[24px] whitespace-nowrap"
        />

        <div className="mt-[24px] ml-[24px] mr-[24px] flex flex-col gap-[14px]">
          {items.map((item) => (
            <SidebarSection
              key={item.id}
              sectionId={item.id}
              icon={sidebarIconRegistry[item.iconKey as SidebarIconKey]}
              title={item.title}
              subItems={item.subItems}
              onSectionClick={() => handleSectionClick(item)}
              onSubClick={(subId: string) => {
                const subItem = item.subItems?.find((sub) => sub.id === subId);
                if (subItem) handleSubItemClick(subItem, item.title);
              }}
            />
          ))}
        </div>

        <div className="mt-auto px-[24px] pb-[40px] space-y-3">
          <CustomSidebarButton
            label="Support"
            icon={SupportIcon}
            variant="ghost"
            height={48}
            width={240}
            onClick={() => {
              setCurrentPage("Support", "header");
              router.push("/");
            }}
          />
          <CustomSidebarButton
            label="Logout"
            icon={LogoutIcon}
            variant="solid"
            height={48}
            width={240}
            onClick={() => {
              setCurrentPage("Logout", "header");
              router.push("/");
            }}
          />
        </div>
      </aside>


      <aside
        ref={sidebarRef}
        className={`flex min-[1000px]:hidden h-[calc(100vh-64px)] border-r border-[#E6E8EC] bg-white p-0 flex-col transition-all duration-300 ease-in-out ${isExpanded ? "w-[288px]" : "w-[72px]"
          }`}
      >
        {!isExpanded ? (
          <>
            <div className="mt-[16px] mb-[12px] flex justify-center">
              <ImagePlaceholder size={44} />
            </div>

            <div className="flex-1 flex flex-col items-center gap-6">
              {items.map((item) => {
                const active = activeSectionId === item.id;
                return (
                  <button
                    key={item.id}
                    className="w-[44px] h-[44px] rounded-[10px] flex items-center justify-center hover:bg-neutral-8/30 cursor-pointer"
                    title={item.title}
                    onClick={() => handleMobileIconClick(item)}
                  >
                    <SvgIcon
                      icon={sidebarIconRegistry[item.iconKey as SidebarIconKey]}
                      size={24}
                      className={active ? "svg-filter-primary-500" : undefined}
                      color={active ? undefined : "neutral-4"}
                    />
                  </button>
                );
              })}
            </div>

            <div className="w-full flex flex-col items-center gap-3 pb-[16px]">
              <button
                className="w-[44px] h-[44px] rounded-[10px] flex items-center justify-center hover:bg-neutral-8/30 cursor-pointer"
                title="Support"
                onClick={() => {
                  setCurrentPage("Support", "header");
                  router.push("/");
                }}
              >
                <SvgIcon icon={SupportIcon} size={24} color="neutral-4" />
              </button>
              <button
                className="w-[44px] h-[44px] rounded-[10px] flex items-center justify-center bg-neutral-3 cursor-pointer"
                title="Logout"
                onClick={() => {
                  setCurrentPage("Logout", "header");
                  router.push("/");
                }}
              >
                <SvgIcon icon={LogoutIcon} size={24} color="white" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full">
            <SidebarWorkspaceCard
              title="Root folder"
              subtitle="workspace"
              className="pt-[24px] pl-[24px] pr-[24px] whitespace-nowrap"
            />

            <div className="mt-[24px] ml-[24px] mr-[24px] flex flex-col gap-[14px]">
              {items.map((item) => (
                <SidebarSection
                  key={item.id}
                  sectionId={item.id}
                  icon={sidebarIconRegistry[item.iconKey as SidebarIconKey]}
                  title={item.title}
                  subItems={item.subItems}
                  onSectionClick={() => handleSectionClick(item)}
                  onSubClick={(subId: string) => {
                    const subItem = item.subItems?.find((sub) => sub.id === subId);
                    if (subItem) handleSubItemClick(subItem, item.title);
                  }}
                />
              ))}
            </div>

            <div className="mt-auto px-[24px] pb-[40px] space-y-3">
              <CustomSidebarButton
                label="Support"
                icon={SupportIcon}
                variant="ghost"
                height={48}
                width={240}
                onClick={() => {
                  setCurrentPage("Support", "header");
                  router.push("/");
                }}
              />
              <CustomSidebarButton
                label="Logout"
                icon={LogoutIcon}
                variant="solid"
                height={48}
                width={240}
                onClick={() => {
                  setCurrentPage("Logout", "header");
                  router.push("/");
                }}
              />
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
