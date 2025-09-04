"use client";

import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";
import SvgIcon from "./SvgIcon";
import SearchIcon from "@/images/icons/Search.svg"



type Props = InputHTMLAttributes<HTMLInputElement> & {};

export default function SearchInput({ className, ...props }: Props) {
    return (
        <div
            className={clsx(
                "inline-flex items-center gap-2 rounded-xl",
                "bg-neutral-7 pt-[15px] pb-[15px] pl-[12px] pr-[112px] w-[240px] h-[48px]",
                className
            )}
        >
            <SvgIcon icon={SearchIcon} size={16} color="neutral-4" className="cursor-pointer"/>
            <input
                type="text"
                className="flex-1 bg-transparent border-none outline-none font-poppins text-neutral-5 placeholder:text-neutral-5 text-[12px] font-normal"
                placeholder="Search tasks ..."
                {...props}
            />
        </div>
    );
}