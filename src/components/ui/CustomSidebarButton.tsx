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
  variant?: "solid" | "ghost";
  fontSize?: number;
  iconSize?: number;
  radius?: number | string;
};

export default function CustomSidebarButton({
  label,
  icon,
  width,
  height,
  className,
  variant = "solid",
  iconSize = 24,
  radius = 8,
  fontSize = 16,
  type = "button",
  ...props
}: Props) {
  const isSolid = variant === "solid";

  return (
    <button
      {...props}
      type={type}
      style={{ width, height, borderRadius: typeof radius === "number" ? `${radius}px` : radius }}
      className={clsx(
        "w-full inline-flex items-center justify-start gap-5 cursor-pointer transition font-poppins whitespace-nowrap",
        isSolid ? "bg-neutral-3 text-white px-4 py-3" : "bg-transparent text-neutral-4 px-4 py-3",
        className
      )}
    >
      {icon && (
        <span className="flex items-center justify-center">
          <SvgIcon icon={icon} size={iconSize} color={isSolid ? "white" : "neutral-4"} />
        </span>
      )}
      <span
        className={clsx("font-medium", isSolid ? "text-white" : "text-neutral-4")}
        style={{ fontSize }}
      >
        {label}
      </span>
    </button>
  );
}
