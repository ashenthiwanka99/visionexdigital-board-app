"use client";

import clsx from "clsx";
import SvgIcon from "@/components/ui/SvgIcon";
import ImagePlaceholder from "@/components/ui/CustomImagePlaceholder";
import ArrowDownIcon from "@/images/icons/Arrow_Down.svg";
import Label from "./CustomLabel";

type Props = {
    title: string;
    subtitle?: string;
    className?: string;
};

export default function SidebarWorkspaceCard({
    title,
    subtitle,
    className,
}: Props) {
    return (
        <div
            className={clsx(
                "w-full flex items-center rounded-[10px] border border-neutral-7 bg-white px-3 py-2",
                className
            )}
        >
            <div className="flex items-center gap-3">
                <ImagePlaceholder size={44} />
                <div className="flex flex-col">
                    <Label text={subtitle} fontSize={14} color="text-neutral-5" lineHeight="24" />
                    <Label text={title} fontSize={16} color="text-neutral-3" lineHeight="24" fontWeight="font-medium" />
                </div>
            </div>

            <div className="ml-auto">
                <SvgIcon icon={ArrowDownIcon} size={24} color="neutral-3" />
            </div>
        </div>

    );
}
