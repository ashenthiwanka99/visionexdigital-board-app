"use client";

import CustomButton from "@/components/ui/CustomButtonWIthIcon";
import CustomIconButton from "@/components/ui/CustomIconButton";
import CustomNotificationButton from "@/components/ui/CustomNotificationButton";
import SearchInput from "@/components/ui/CustomSearchInput";
import PlusIcon from "@/images/icons/Plus.svg";
import SettingIcon from "@/images/icons/Settings.svg";
import BellIcon from "@/images/icons/Bell.svg";
import CustomImage from "@/components/ui/CustomImage";
import PlaceholderImage from "@/images/Image_Placeholder.svg"


export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      
      <CustomImage
        src={PlaceholderImage}
        alt="User profile"
        width={30}
        height={30}
        borderRadius="50%"
        className="shadow-md"
      />

      <CustomButton
        label="Create new board"
        icon={PlusIcon}
        width={170}
        height={48}
        className="text-[12px] font-semibold"
        onClick={() => alert("New board")}
      />
      <SearchInput />

      <CustomIconButton
        icon={SettingIcon}
        color="neutral-5"
        onClick={() => alert('Add item clicked!')}
      />

      <CustomNotificationButton
        icon={BellIcon}
        width={40}
        height={40}
        showDot
      />

    </div>

  );
}
