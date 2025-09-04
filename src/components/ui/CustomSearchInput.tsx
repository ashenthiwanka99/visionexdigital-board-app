"use client";

import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";
import SvgIcon from "./SvgIcon";
import SearchIcon from "@/images/icons/Search.svg";

type Props = InputHTMLAttributes<HTMLInputElement> & {};

export default function SearchInput({ className, ...props }: Props) {
    return (
        <div
            className={clsx(
                "inline-flex items-center gap-2 rounded-[6px]",
                "bg-neutral-7 pt-[15px] pb-[15px] pl-[12px] h-[48px]",
                "w-full max-w-[240px] sm:max-w-[200px] md:max-w-[240px]",
                className
            )}
        >
            <SvgIcon
                icon={SearchIcon}
                size={16}
                color="neutral-4"
                className="cursor-pointer flex-shrink-0"
            />
            <input
                type="text"
                className="flex-1 bg-transparent border-none outline-none font-poppins text-neutral-5 placeholder:text-neutral-5 text-[12px] font-normal"
                placeholder="Search tasks ..."
                {...props}
            />
        </div>
    );
}
