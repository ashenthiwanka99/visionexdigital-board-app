"use client";

import React from "react";
import Image from "next/image";

import CustomIconButton from "@/components/ui/CustomIconButton";
import CustomNotificationButton from "@/components/ui/CustomNotificationButton";
import SearchInput from "@/components/ui/CustomSearchInput";
import ImagePlaceholder from "@/components/ui/CustomImagePlaceholder";

import PlusIcon from "@/images/icons/Plus.svg";
import SettingIcon from "@/images/icons/Settings.svg";
import BellIcon from "@/images/icons/Bell.svg";
import Logo from "@/images/logos/Logo_Text.svg";
import CustomHeaderButton from "@/components/ui/CustomHeaderButton";

export default function Header() {
  return (
    <header className="w-full h-[80px] border-b border-[#E6E8EC] bg-white pl-[25px] pr-[25px]">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center">
          <Image src={Logo} alt="Board App" width={97.6} height={24} priority />
        </div>

        <div className="flex items-center gap-12">
          <div className="hidden md:flex items-center gap-6">
            <CustomHeaderButton
              label="Create new board"
              icon={PlusIcon}
              width={170}
              height={40}
              className="text-[12px] font-semibold"
              onClick={() => console.info("Create new board Clicked!")}
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
              onClick={() => console.info("Setting Clicked!")}
            />
            <CustomNotificationButton icon={BellIcon} width={40} height={40} showDot onClick={() => console.info("Notification Clicked!")}/>
            <ImagePlaceholder size={36} />
          </div>
        </div>
      </div>
    </header>
  );
}
