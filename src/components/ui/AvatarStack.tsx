"use client";

import clsx from "clsx";
import ImagePlaceholder from "@/components/ui/CustomImagePlaceholder";
import Label from "@/components/ui/CustomLabel";

interface Props {
  count: number;      
  size?: number;
  overlap?: number;
  className?: string;
  countBg?: string;
  countText?: string;
  countFontWeight?: string;
}

export default function AvatarStack({
  count,
  size = 24,
  overlap = 10,
  className,
  countBg = "bg-neutral-6",
  countText = "text-neutral-3",
  countFontWeight = "font-semibold",
}: Props) {
  const VISIBLE = 3;

  const circleCount = Math.max(0, Math.min(count, VISIBLE));
  const circles = Array.from({ length: circleCount });


  const showLabel = count > VISIBLE;
  const labelCount = Math.max(count - VISIBLE, 0);

  return (
    <div className={clsx("flex items-center", className)}>
      {circles.map((_, i) => (
        <div
          key={i}
          className="rounded-full ring-2 ring-white"
          style={{
            width: size,
            height: size,
            marginLeft: i === 0 ? 0 : -overlap,
          }}
        >
          <ImagePlaceholder size={size} className="cursor-default" />
        </div>
      ))}

      {showLabel && (
        <span
          className={clsx(
            "inline-flex items-center justify-center rounded-full ring-2 ring-white select-none",
            countBg
          )}
          style={{
            width: size,
            height: size,
            marginLeft: circles.length ? -overlap : 0,
          }}
          role="status"
          aria-label={`+${labelCount}`}
        >
          <Label
            text={`+${labelCount}`}
            fontSize={9}
            fontWeight={countFontWeight}
            color={countText}
          />
        </span>
      )}
    </div>
  );
}
