"use client";

import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import SvgIcon from "./SvgIcon";
import { IconProp } from "@/types/IconTypes";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: IconProp;
    width?: string | number;
    height?: string | number;
    color?: string;
    className?: string;
};

export default function CustomIconButton({
    icon,
    width,
    height,
    color,
    className,
    ...props
}: Props) {
    return (
        <button
            {...props}
            style={{ width, height }}
            className={clsx(
                "inline-flex items-center justify-center rounded-xl cursor-pointer",
                "hover:opacity-90 transition font-poppins whitespace-nowrap",
                className
            )}
        >
            {icon && (
                <span className="flex items-center justify-center h-full w-full">
                    <SvgIcon icon={icon} size={24} color={color} />
                </span>
            )}
        </button>
    );
}
