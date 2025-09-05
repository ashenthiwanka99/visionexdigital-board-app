"use client";

import Image from "next/image";
import clsx from "clsx";
import { IconProp } from "@/helpers/interface/IconInterface";

type SvgIconProps = {
    icon: IconProp;
    size?: number | string;
    color?: string;
    className?: string;
};

export default function SvgIcon({ icon, size = 24, color, className }: SvgIconProps) {
    const colorClassName = color ? `svg-filter-${color}` : '';

    return (
        <Image
            src={icon.src}
            alt="Icon"
            width={typeof size === "number" ? size : parseInt(size)}
            height={typeof size === "number" ? size : parseInt(size)}
            className={clsx("inline-block", colorClassName, className)}
        />
    );
}
