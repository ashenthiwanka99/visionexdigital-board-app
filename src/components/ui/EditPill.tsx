"use client";

import clsx from "clsx";
import SvgIcon from "@/components/ui/SvgIcon";
import Label from "@/components/ui/CustomLabel";
import type { ButtonHTMLAttributes } from "react";
import type { IconProp } from "@/types/IconTypes";
import EditIcon from "@/images/icons/Pencil.svg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  icon?: IconProp;
  className?: string;
};

export default function EditPill({
  label = "Manage",
  icon = EditIcon,
  className,
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      {...props}
      className={clsx(
        "inline-flex items-center justify-center gap-[10px]",
        "px-[12px] py-[4px] rounded-[46px] border bg-white",
        "border-neutral-6 text-neutral-5",
        "w-[101px] h-[30px]",
        className
      )}
      aria-label={label}
    >
      <Label
        text={label}
        fontSize={12}
        fontWeight="font-medium"
        color="text-neutral-5"
        lineHeight="22"
      />
      <SvgIcon icon={icon} size={16} color="neutral-5" />
    </button>
  );
}
