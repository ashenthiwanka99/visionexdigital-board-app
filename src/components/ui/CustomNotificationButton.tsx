"use client";

import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import SvgIcon from "./SvgIcon";
import { IconProp } from "@/types/IconTypes";


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: IconProp;
    width?: string | number;
    height?: string | number;
    className?: string;
    showDot?: boolean;
    dotSize?: number;
    dotColor?: string;
}

export default function CustomNotificationButton({
    icon,
    width,
    height,
    className,
    showDot,
    dotSize = 6,
    dotColor = "var(--color-orange-500)",
    ...props
}: Props) {
    return (
        <button
            {...props}
            style={{ width, height }}
            className={clsx(
                "relative inline-flex items-center justify-center rounded-xl cursor-pointer",
                "hover:opacity-90 transition font-poppins whitespace-nowrap",
                className
            )}
        >
            {icon && (
                <span className="flex items-center justify-center h-full w-full">
                    <SvgIcon icon={icon} size={24} color="neutral-5" />
                </span>
            )}

            {showDot && (
                <span
                    className="absolute rounded-full"
                    style={{
                        top: "11px",
                        right: "12px",
                        width: dotSize,
                        height: dotSize,
                        background: dotColor,
                    }}
                />
            )}
        </button>
    );
}