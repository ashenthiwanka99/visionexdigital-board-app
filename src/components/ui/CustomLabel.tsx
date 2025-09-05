"use client";

import React, { HTMLAttributes } from "react";
import clsx from "clsx";
import { Align, VAlign } from "@/helpers/types/LabelTypes";

interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
    text?: string;
    fontFamily?: string;
    fontWeight?: string;
    fontSize?: number | string;
    lineHeight?: string;
    color?: string;
    align?: Align;
    vAlign?: VAlign;
    className?: string;
}

export default function Label({
    text,
    children,
    fontFamily = "font-poppins",
    fontWeight = "font-normal",
    fontSize = "text-sm",
    lineHeight = "leading-normal",
    color = "text-neutral-800",
    align = "left",
    vAlign = "bottom",
    className,
    style,
    ...props
}: LabelProps) {
    const sizeClass = typeof fontSize === "string" ? fontSize : undefined;
    const inlineStyle: React.CSSProperties = {
        ...(typeof fontSize === "number" ? { fontSize: `${fontSize}px` } : {}),
        ...(vAlign ? { verticalAlign: vAlign } : {}),
        ...style,
    };

    return (
        <span
            {...props}
            style={inlineStyle}
            className={clsx(
                fontFamily,
                fontWeight,
                sizeClass ?? undefined,
                lineHeight,
                color,
                {
                    "text-left": align === "left",
                    "text-center": align === "center",
                    "text-right": align === "right",
                },
                className
            )}
        >
            {text ?? children}
        </span>
    );
}
