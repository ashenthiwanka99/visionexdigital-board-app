"use client";

import React from "react";
import SvgIcon from "./SvgIcon";
import ImageIcon from "@/images/icons/Image_Field.svg";


interface PlaceholderProps {
  size?: number;
  borderRadius?: string | number;
  className?: string;
}

export default function ImagePlaceholder({
  size,
  borderRadius = "50%",
  className,
}: PlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center bg-neutral-3 ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius,
      }}
    >
      <SvgIcon icon={ImageIcon} size={12.5} color="white" />
    </div>
  );
}
