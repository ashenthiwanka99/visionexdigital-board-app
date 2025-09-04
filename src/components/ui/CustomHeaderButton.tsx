"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import SvgIcon from "./SvgIcon";
import { IconProp } from "@/types/IconTypes";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    icon?: IconProp;
    width?: string | number;
    height?: string | number;
    className?: string;
};

export default function CustomHeaderButton({
    label,
    icon,
    width,
    height,
    className,
    ...props
}: Props) {
    return (
        <button
            {...props}
            style={{ width, height }}
            className={clsx(
                "inline-flex items-center justify-center gap-3 rounded-[6px] cursor-pointer",
                "bg-primary-500 text-white p-3 text-sm font-medium shadow",
                "hover:opacity-90 transition font-poppins whitespace-nowrap",
                "w-full max-w-[140px] sm:max-w-[160px] md:max-w-[170px]",
                className
            )}
        >
            <span>{label}</span>
            {icon && (
                <span className="flex items-center justify-center h-full w-full">
                    <SvgIcon icon={icon} size={24} color="white" />
                </span>
            )}
        </button>
    );
}