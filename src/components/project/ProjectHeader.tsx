"use client";

import { useEffect } from "react";
import clsx from "clsx";
import Label from "@/components/ui/CustomLabel";
import CustomPill from "@/components/ui/CustomPill";
import AvatarStack from "@/components/ui/AvatarStack";
import EditPill from "@/components/ui/EditPill";
import { useMetaStore } from "@/store/useMetaStore";
import { formatDateTimeLong } from "@/utils/Helpers";

interface Props {
  title?: string;
  status: string;
  statusBg: string;
  subtitle?: string;
  assignedText?: string;
  avatarCount: number;
  className?: string;
}

export default function ProjectHeader({
  title = "Sport Xi Project",
  status,
  statusBg,
  subtitle = "event production",
  avatarCount,
  className,
}: Props) {
  const lastUpdated = useMetaStore((s) => s.lastUpdated);
  const touch = useMetaStore((s) => s.touch);

  useEffect(() => {
    if (!lastUpdated) touch();
  }, [lastUpdated, touch]);

  return (
    <>
      <section className={clsx("w-full px-[24px] pt-[24px]", className)}>
        <div className="flex items-center gap-6">
          <Label
            text={title}
            fontSize={24}
            fontWeight="font-semibold"
            color="text-neutral-1"
            lineHeight="32"
          />
          <CustomPill
            label={status}
            textColor="text-neutral-3"
            fontSize={10}
            fontWeight="font-medium"
            height={20}
            width={81}
            radius={5}
            className={statusBg}
          />
        </div>

        <div className="mt-2">
          <Label
            text={subtitle}
            fontSize={16}
            fontWeight="font-normal"
            color="text-neutral-5"
            lineHeight="32"
          />
        </div>

        <div className="mt-2 flex items-center gap-4">
          <Label
            text="assigned"
            fontSize={16}
            fontWeight="font-normal"
            color="text-neutral-5"
            lineHeight="auto"
          />
          <AvatarStack count={avatarCount} size={28} overlap={8} />
          <EditPill className="ml-1" />
        </div>

        <div className="mt-6 h-px w-full bg-neutral-6" />
      </section>

      <div className="pt-[17px] pl-[28px] pb-[22px]">
        <Label
          text={`Last updated on: ${formatDateTimeLong(lastUpdated ?? Date.now())}`}
          fontSize={14}
          fontWeight="font-normal"
          color="text-neutral-5"
          lineHeight="auto"
        />
      </div>
    </>
  );
}
