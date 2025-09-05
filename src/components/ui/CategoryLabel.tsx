"use client";

import clsx from "clsx";

type Props = {
  label: string;
  squareClassName?: string;
  squareColor?: string;
  className?: string;
};

export default function CategoryLabel({ label, squareClassName, squareColor, className }: Props) {
  const normalizedBg = squareClassName
    ? squareClassName.startsWith("bg-") ? squareClassName : `bg-${squareClassName}`
    : "bg-neutral-400";

  return (
    <div className={clsx("inline-flex items-center gap-2", className)}>
      <span
        className={clsx("inline-block w-2 h-2 rounded-[2px]", normalizedBg)}
        style={squareColor ? { backgroundColor: squareColor } : undefined}
      />
      <span className="text-xs font-medium text-neutral-4">{label}</span>
    </div>
  );
}
