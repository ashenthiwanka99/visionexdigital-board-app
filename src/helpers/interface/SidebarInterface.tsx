import type { SidebarIconKey } from "@/data/sidebarIconRegistry";

export interface SidebarSubItem {
  id: string;
  label: string;
  route?: string;
  selected?: boolean;
}

export interface SidebarItem {
  id: string;
  title: string;
  iconKey: SidebarIconKey;
  route?: string;
  defaultOpen?: boolean;
  subItems?: SidebarSubItem[];
}

export type SidebarData = SidebarItem[];
