"use client";

import clsx from "clsx";
import SvgIcon from "@/components/ui/SvgIcon";
import Label from "@/components/ui/CustomLabel";
import type { IconProp } from "@/helpers/interface/IconInterface";

type Props = {
  icon: IconProp;
  label: string | number;
  iconColor?: string;
  textColor?: string;
  className?: string;
};

export default function CustomIconText({
  icon,
  label,
  iconColor = "neutral-4",
  textColor = "text-neutral-4",
  className,
}: Props) {
  const textColorClass = textColor.startsWith("text-") ? textColor : `text-${textColor}`;

  return (
    <div className={clsx("inline-flex items-center gap-2", className)}>
      <SvgIcon icon={icon} size={16} color={iconColor} />
      <Label text={String(label)} fontSize={12} fontWeight="font-medium" color={textColorClass} />
    </div>
  );
}
