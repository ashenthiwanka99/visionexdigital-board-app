"use client";

import clsx from "clsx";
import Label from "@/components/ui/CustomLabel";
import AvatarStack from "@/components/ui/AvatarStack";
import ImagePlaceholder from "@/components/ui/CustomImagePlaceholder";
import CustomIconButton from "@/components/ui/CustomIconButton";
import CategoryLabel from "@/components/ui/CategoryLabel";

import type { IconProp } from "@/helpers/interface/IconInterface";

import LinkIcon from "@/images/icons/link.svg";
import MessageIcon from "@/images/icons/Message.svg";
import FileIcon from "@/images/icons/Folder.svg";
import DotsIcon from "@/images/icons/Dots.svg";
import FlashIcon from "@/images/icons/Flash.svg";
import { getCategoryBg } from "@/utils/Helpers";
import CustomIconText from "../ui/CustomIconText";
import { Task } from "@/helpers/interface/TaskInterface";

type FooterItem = {
    icon: IconProp;
    label: string;
    iconColor?: string;
    textColor?: string;
};

type Props = {
    task?: Task;
    categoryText?: string;
    categoryColor?: string;
    title?: string;
    menuIcon?: IconProp;
    onMenuClick?: () => void;
    assignees?: number;
    priorityLabel?: string;
    withImage?: boolean;
    imageHeight?: number;
    footer?: FooterItem[];
    className?: string;
};

function getFooterFromTask(task: Task): FooterItem[] {
    const f: FooterItem[] = [];
    if (!task.stats) return f;
    if (task.stats.links) f.push({ icon: LinkIcon as IconProp, label: String(task.stats.links), iconColor: "neutral-4", textColor: "text-neutral-4" });
    if (task.stats.comments) f.push({ icon: MessageIcon as IconProp, label: String(task.stats.comments), iconColor: "neutral-4", textColor: "text-neutral-4" });
    if (task.stats.reports) f.push({ icon: FileIcon as IconProp, label: `${task.stats.reports} Reports`, iconColor: "neutral-4", textColor: "text-neutral-4" });
    return f;
}

export default function KanbanCard({
    task,
    categoryText: propCategoryText,
    categoryColor: propCategoryColor,
    title: propTitle,
    menuIcon,
    onMenuClick,
    assignees: propAssignees,
    priorityLabel: propPriorityLabel,
    withImage: propWithImage = false,
    imageHeight: propImageHeight = 176,
    footer: propFooter = [],
    className,
}: Props) {
    const categoryText = task?.category?.name ?? propCategoryText ?? "";
    const rawCategoryColor = task?.category?.color ?? propCategoryColor;
    const title = task?.title ?? propTitle ?? "";
    const assignees = task?.assignees ?? propAssignees ?? 0;
    const priorityLabel = task?.priority ?? propPriorityLabel;
    const withImage = task?.hasImage ?? propWithImage ?? false;
    const imageHeight = propImageHeight ?? 176;
    const footer = task ? getFooterFromTask(task) : propFooter ?? [];

    const squareClassName = rawCategoryColor?.startsWith("bg-") ? rawCategoryColor : getCategoryBg(categoryText);
    const squareColor = rawCategoryColor && !rawCategoryColor.startsWith("bg-") ? rawCategoryColor : undefined;

    return (
        <article
            className={clsx(
                "w-full min-w-[260px] rounded-[12px] border border-neutral-6 bg-white px-[12px] py-[7px]",
                "flex flex-col gap-0 cursor-pointer",
                className
            )}
        >
            <div className="flex items-center justify-between">
                <CategoryLabel label={categoryText} squareClassName={squareClassName} squareColor={squareColor} />
                <CustomIconButton
                    aria-label="Card menu"
                    icon={menuIcon ?? (DotsIcon as IconProp)}
                    width={32}
                    height={32}
                    color="neutral-3"
                    onClick={onMenuClick}
                />
            </div>

            <div className="mt-[10px]">
                <Label text={title} fontSize={18} fontWeight="font-semibold" color="text-neutral-3" lineHeight="24" />
            </div>

            <div className="mt-[10px] flex items-center gap-[6px]">
                <AvatarStack count={assignees} size={24} overlap={6} />
                {priorityLabel && (
                    <CustomIconText
                        icon={FlashIcon as IconProp}
                        label={priorityLabel}
                    />
                )}
            </div>

            {withImage ? (
                <>
                    <div
                        className="mt-[14px] mb-[14px] w-full rounded-[10px] bg-neutral-3/100 flex items-center justify-center"
                        style={{ height: imageHeight }}
                    >
                        <ImagePlaceholder size={20} borderRadius={6} />
                    </div>

                    <div className="px-[12px] pt-[7px]">
                        <div className="h-px w-full bg-neutral-6" />
                    </div>
                </>
            ) : (

                <div className="px-[12px] pt-[7px] mt-[32px]">
                    <div className="h-px w-full bg-neutral-6" />
                </div>
            )}
            {footer.length > 0 && (
                <div className="mt-3 flex items-center gap-[24px]">
                    {footer.map((f, idx) => (
                        <CustomIconText
                            key={idx}
                            icon={f.icon as IconProp}
                            label={f.label}
                            iconColor={f.iconColor ?? "neutral-4"}
                            textColor={f.textColor ?? "text-neutral-4"}
                        />
                    ))}
                </div>
            )}
        </article>
    );
}
