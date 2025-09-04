"use client";

import clsx from "clsx";
import Label from "./CustomLabel";

interface Props {
    label: string;
    width?: number | string;
    height?: number | string;
    radius?: number | string;
    textColor?: string;
    fontSize?: number;
    fontWeight?: string;
    className?: string;
}

export default function CustomPill({
    label,
    width,
    height = 28,
    radius = 10,
    textColor = "text-neutral-3",
    fontSize = 14,
    fontWeight = "font-medium",
    className,
}: Props) {
    const br = typeof radius === "number" ? `${radius}px` : radius;

    return (
        <span
            style={{ width, height, borderRadius: br, }}
            className={clsx(
                "inline-flex items-center justify-center px-3 select-none",
                className
            )}
        >
            <Label text={label} fontSize={fontSize} fontWeight={fontWeight} color={textColor} lineHeight="12" />
        </span>
    );
}
