import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";

interface WeekCalendarSectionProps {
    activeAt: Date;
    setActiveAt: Dispatch<SetStateAction<Date>>;
    activeDay: number | null;
    setActiveDay: Dispatch<SetStateAction<number | null>>;
}

export default function WeekCalendarSection({ activeAt, setActiveAt, activeDay, setActiveDay }: WeekCalendarSectionProps) {
    const [days, setDays] = useState<Date[]>([]);

    const daysCreator = useCallback(() => {
        if(!activeAt || !activeDay) return;

        const baseDate = new Date(activeAt.getFullYear(), activeAt.getMonth(), activeDay);

        const newDays: Date[] = [];

        for(let i = -4; i <= 4; i++) {
            const day = new Date(baseDate);
            day.setDate(baseDate.getDate() + i);
            newDays.push(day);
        }

        setDays(newDays);
    }, [activeAt, activeDay]);

    useEffect(() => {
        daysCreator();
    }, [daysCreator]);

    return(
        <div className="border border-gray-300 dark:border-gray-800 rounded-xl flex-1 flex flex-row overflow-hidden">
            <div className="w-[70px] h-full border-r border-gray-300 dark:border-gray-800"></div>
            <div className="flex-1 overflow-y-hidden hidden-scroll overflow-x-auto snap-x snap-mandatory flex">
                {days.map((day) => (
                    <div key={day.getTime()} className="w-[calc(100%/7)] h-full snap-start flex-shrink-0">
                        <div className="py-2 text-center text-sm bg-white dark:bg-gray-800 max-h-[36px] font-semibold normal-text items-center flex justify-center">
                            {day.getDate()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
