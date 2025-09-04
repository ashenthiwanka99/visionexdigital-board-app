"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import SvgIcon from "@/components/ui/SvgIcon";
import { IconProp } from "@/types/IconTypes";

import ArrowUpIcon from "@/images/icons/Arrow_Up.svg";
import ArrowRightIcon from "@/images/icons/Arrow_Right.svg";
import Label from "./CustomLabel";

type SubItem = {
    id: string;
    label: string;
    selected?: boolean;
};

type Props = {
    icon: IconProp;
    title: string;
    open?: boolean;
    defaultOpen?: boolean;
    className?: string;
    subItems?: SubItem[];
    onToggle?: (open: boolean) => void;
    onSubClick?: (id: string) => void;
};

export default function SidebarSection({
    icon,
    title,
    open,
    defaultOpen = false,
    className,
    subItems = [],
    onToggle,
    onSubClick,
}: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(open ?? defaultOpen);

    useEffect(() => {
        if (open !== undefined) setIsOpen(open);
    }, [open]);

    const active = isOpen;

    const handleToggle = () => {
        const next = !isOpen;
        if (open === undefined) setIsOpen(next);
        onToggle?.(next);
    };

    return (
        <div className={clsx("w-full", className)}>
            <button
                onClick={handleToggle}
                className={clsx(
                    "w-full flex items-center rounded-[12px] border border-neutral-7 bg-white",
                    "pt-[12px] pb-[12px] pl-[12px]"
                )}
            >
                <div className="flex items-center gap-5 flex-1">
                    <SvgIcon
                        icon={icon}
                        size={24}
                        className={clsx(active && "svg-filter-primary-500")}
                        color={active ? undefined : "neutral-4"}
                    />
                    <Label
                        text={title}
                        fontWeight="font-medium"
                        fontSize={16}
                        color={active ? "text-primary-500" : "text-neutral-4"}
                    />
                </div>

                {subItems.length > 0 && active && (
                    <SvgIcon
                        icon={ArrowUpIcon}
                        size={24}
                        className="svg-filter-primary-500"
                    />
                )}
            </button>

            {isOpen && subItems.length > 0 && (
                <div className="mt-4 rounded-[12px] border border-neutral-7 bg-white px-5 py-4 space-y-4">
                    {subItems.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => onSubClick?.(s.id)}
                            className="w-full flex items-center gap-3"
                        >
                            <SvgIcon
                                icon={ArrowRightIcon}
                                size={18}
                                className={clsx(s.selected && "svg-filter-primary-500")}
                                color={s.selected ? undefined : "neutral-4"}
                            />
                            <Label
                                text={s.label}
                                fontSize={14}
                                fontWeight={s.selected ? "font-semibold" : "font-normal"}
                                color={s.selected ? "text-primary-500" : "text-neutral-4"}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
