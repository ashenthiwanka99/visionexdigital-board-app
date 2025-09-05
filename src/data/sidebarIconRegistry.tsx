import type { IconProp } from "@/helpers/interface/IconInterface";
import Dashboard from "@/images/icons/Grid.svg";
import Folder from "@/images/icons/Folder.svg";
import Messages from "@/images/icons/Message.svg";
import Calendar from "@/images/icons/Calendar.svg";
import Team from "@/images/icons/User.svg";

export const sidebarIconRegistry = {
  dashboard: Dashboard as IconProp,
  folder: Folder as IconProp,
  messages: Messages as IconProp,
  calendar: Calendar as IconProp,
  team: Team as IconProp,
} as const;

export type SidebarIconKey = keyof typeof sidebarIconRegistry;
