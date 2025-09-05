"use client";

import clsx from "clsx";
import { useSidebarStore } from "@/store/useSidebarStore";
import SvgIcon from "@/components/ui/SvgIcon";
import { IconProp } from "@/helpers/interface/IconInterface";
import ArrowUpIcon from "@/images/icons/Arrow_Up.svg";
import ArrowRightIcon from "@/images/icons/Arrow_Right.svg";
import Label from "./CustomLabel";
import { SidebarSubItem } from "@/helpers/interface/SidebarInterface";


type Props = {
  sectionId: string;
  icon: IconProp;
  title: string;
  className?: string;
  subItems?: SidebarSubItem[];
  onSectionClick?: () => void;
  onSubClick?: (id: string) => void;
};

export default function SidebarSection({
  sectionId,
  icon,
  title,
  className,
  subItems = [],
  onSectionClick,
  onSubClick,
}: Props) {
  const activeSectionId = useSidebarStore((s) => s.activeSectionId);
  const setActiveSection = useSidebarStore((s) => s.setActiveSection);
  const selectedId = useSidebarStore((s) => s.selected[sectionId] ?? null);
  const selectSubItem = useSidebarStore((s) => s.selectSubItem);
  const badgeCount = useSidebarStore((s) => s.badges[sectionId] ?? 0);

  const isOpen = activeSectionId === sectionId;

  const handleToggle = () => {
    if (activeSectionId !== sectionId) {
      setActiveSection(sectionId);
    }
    onSectionClick?.();
  };

  const handleSubItemClick = (subItem: SidebarSubItem) => {
    selectSubItem(sectionId, subItem.id);
    onSubClick?.(subItem.id);
  };

  return (
    <div className={clsx("w-full", className)}>
      <button
        onClick={handleToggle}
        className={clsx(
          "w-full flex items-center border border-neutral-7 bg-white cursor-pointer",
          "pt-[12px] pb-[12px] pl-[12px] pr-[12px]"
        )}
      >
        <div className="flex items-center gap-5 flex-1">
          <SvgIcon
            icon={icon}
            size={24}
            className={clsx(isOpen && "svg-filter-primary-500")}
            color={isOpen ? undefined : "neutral-4"}
          />
          <Label
            text={title}
            fontWeight="font-medium"
            fontSize={16}
            color={isOpen ? "text-primary-500" : "text-neutral-4"}
          />
        </div>

        {subItems.length > 0 && isOpen && (
          <SvgIcon icon={ArrowUpIcon} size={24} className="svg-filter-primary-500" />
        )}

        {subItems.length === 0 && badgeCount > 0 && (
          <span
            className="inline-flex items-center justify-center min-w-[22px] h-[22px] rounded-full text-white text-[12px] leading-none font-medium"
            style={{ background: "var(--color-orange-500)" }}
            aria-label={`${badgeCount} unread`}
          >
            {badgeCount}
          </span>
        )}
      </button>

      {subItems.length > 0 && (
        <div
          className={clsx(
            "grid transition-all duration-300 ease-in-out",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
          aria-hidden={!isOpen}
        >
          <div className="overflow-hidden pl-[12px] space-y-3">
            {subItems.map((subItem: SidebarSubItem) => (
              <button
                key={subItem.id}
                onClick={() => handleSubItemClick(subItem)}
                className="w-full flex items-center gap-[10px] cursor-pointer"
              >
                <SvgIcon
                  icon={ArrowRightIcon}
                  size={18}
                  className={clsx(selectedId === subItem.id && "svg-filter-primary-500")}
                  color={selectedId === subItem.id ? undefined : "neutral-4"}
                />
                <Label
                  text={subItem.label}
                  fontSize={14}
                  fontWeight={selectedId === subItem.id ? "font-medium" : "font-normal"}
                  color={selectedId === subItem.id ? "text-primary-500" : "text-neutral-4"}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}