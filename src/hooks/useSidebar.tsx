"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import sidebarData from "@/data/sidebar.json";
import { useSidebarStore } from "@/store/useSidebarStore";
import type { SidebarItem, SidebarSubItem } from "@/helpers/interface/SidebarInterface";

export function useSidebar() {
  const items = sidebarData as SidebarItem[];

  const router = useRouter();
  const pathname = usePathname();

  const activeSectionId = useSidebarStore((s) => s.activeSectionId);
  const setActiveSection = useSidebarStore((s) => s.setActiveSection);
  const setCurrentPage = useSidebarStore((s) => s.setCurrentPage);
  const clearCurrentPage = useSidebarStore((s) => s.clearCurrentPage);

  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const goHomeWithLabel = (label: string) => {
    setCurrentPage(label, "header");
    router.push("/");
  };

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

  const handleSubItemClick = (subItem: SidebarSubItem, _parentTitle: string) => {
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
      if (item.subItems) return item.subItems.some((s) => s.route === pathname);
      return false;
    });
    if (currentItem) setActiveSection(currentItem.id);
  }, [pathname, items, setActiveSection]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isExpanded]);

  return {
    items,
    activeSectionId,
    isExpanded,
    setIsExpanded,
    sidebarRef,
    handleMobileIconClick,
    handleSectionClick,
    handleSubItemClick,
    goHomeWithLabel,
  };
}
