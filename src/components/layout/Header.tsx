"use client";

import React from "react";
import Image from "next/image";

import CustomButton from "@/components/ui/CustomButton";
import CustomIconButton from "@/components/ui/CustomIconButton";
import CustomNotificationButton from "@/components/ui/CustomNotificationButton";
import SearchInput from "@/components/ui/CustomSearchInput";
import ImagePlaceholder from "@/components/ui/CustomImagePlaceholder";

import PlusIcon from "@/images/icons/Plus.svg";
import SettingIcon from "@/images/icons/Settings.svg";
import BellIcon from "@/images/icons/Bell.svg";
import Logo from "@/images/logos/Logo_Text.svg";

export default function Header() {
    return (
        <header className="w-full border-b border-[#E6E8EC] bg-white">
            <div className="flex items-center justify-between px-4 py-2 md:px-6">

                <div className="flex items-center">
                    <Image
                        src={Logo}
                        alt="Board App"
                        width={97.6}
                        height={24}
                        priority
                    />
                </div>

                <div className="flex items-center gap-12">
                    <div className="hidden md:flex items-center gap-6">
                        <CustomButton
                            label="Create new board"
                            icon={PlusIcon}
                            width={170}
                            height={40}
                            className="text-[12px] font-semibold"
                            onClick={() => alert("New board")}
                        />
                        <div className="max-w-[60vw]">
                            <SearchInput className="w-full" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3.5">
                        <CustomIconButton
                            icon={SettingIcon}
                            color="neutral-5"
                            width={40}
                            height={40}
                            onClick={() => alert("Settings")}
                        />
                        <CustomNotificationButton
                            icon={BellIcon}
                            width={40}
                            height={40}
                            showDot
                        />
                        <ImagePlaceholder size={36} />
                    </div>
                </div>
            </div>
        </header>

    );
}
