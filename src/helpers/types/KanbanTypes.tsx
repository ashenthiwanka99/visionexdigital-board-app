import { IconProp } from "../interface/IconInterface";

export type LaneId = string;

export type LaneConfig = {
    id: LaneId;
    title: string;
    count?: number;
    pillBg?: string;
    pillText?: string;
    pillLabel?: string;
    minWidth?: number;
};

export type FooterItem = {
    icon: IconProp;
    label: string | number;
    iconColor?: string;
    textColor?: string;
};