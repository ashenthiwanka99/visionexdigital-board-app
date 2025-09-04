"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";
import PlaceholderImage from "@/images/Image_Placeholder.svg"

interface ImageWithFallbackProps {
    src: string | StaticImageData;
    alt?: string;
    width?: number;
    height?: number;
    borderRadius: string | number;
    className?: string;
}

export default function CustomImage({
    src,
    alt = "image",
    width = 40,
    height = 40,
    borderRadius,
    className,
}: ImageWithFallbackProps) {
    const [imgSrc, setImgSrc] = useState<string | StaticImageData>(src);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            onError={() => setImgSrc(PlaceholderImage)}
            className={clsx("object-cover", className)}
            style={{ borderRadius }}
        />
    );
}
