import {Dispatch, SetStateAction, useEffect, useState} from "react";
import EventDateView from "./SideBarSection/EventDateView";

interface SideBarSectionProps {

    viewMode: "month" | "week" | "day";
    sideBar: number;
    startAt: Date | null;
    setStartAt: Dispatch<SetStateAction<Date | null>>;
    endAt: Date | null;
    setEndAt: Dispatch<SetStateAction<Date | null>>;
}

export default function SideBarSection({  viewMode, sideBar, startAt, setStartAt, endAt, setEndAt }:SideBarSectionProps) {

    return (
        <div
            className={`${sideBar <= 0 ? "hidden" : ""} border max-h-[calc(100vh-(70px+2.5rem))] sticky top-[1.25rem] bg-white dark:bg-[#0d1117] border-gray-300 dark:border-gray-800 rounded-xl normal-text user-select-none`}
            style={{ width: `${sideBar}px` }}
        >
            <EventDateView startAt={startAt} setStartAt={setStartAt} endAt={endAt} setEndAt={setEndAt} />
        </div>
    );
}
