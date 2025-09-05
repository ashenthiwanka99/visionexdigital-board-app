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
