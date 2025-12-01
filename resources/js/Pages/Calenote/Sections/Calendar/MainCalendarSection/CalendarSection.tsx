// CalendarSection.tsx
import { RefObject } from "react";

interface CalendarSectionProps {
    date: Date;
    scrollRef: RefObject<HTMLDivElement | null>;
    activeAt: Date;
}

export default function CalendarSection({ date, scrollRef, activeAt }: CalendarSectionProps) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const prevLastDay = new Date(year, month, 0).getDate();

    const TOTAL_CELLS = 42;

    const allDays: { day: number; isWeekend: boolean; isActive: boolean; isCurrentMonth: boolean }[] = [];
    let dayCounter = 0;

    // 1. 이전 달 날짜 채우기
    for (let i = firstDayIndex; i > 0; i--) {
        const day = prevLastDay - i + 1;
        const weekIndex = (firstDayIndex - i) % 7;

        allDays.push({
            day: day,
            isWeekend: weekIndex === 0 || weekIndex === 6,
            isActive: false,
            isCurrentMonth: false
        });
        dayCounter++;
    }

    // 2. 이번 달 날짜 채우기
    for (let i = 1; i <= lastDay; i++) {
        const weekIndex = dayCounter % 7;
        const isWeekend = weekIndex === 0 || weekIndex === 6;

        const isActive =
            activeAt.getFullYear() === year &&
            activeAt.getMonth() === month;

        allDays.push({
            day: i,
            isWeekend,
            isActive,
            isCurrentMonth: true
        });
        dayCounter++;
    }

    // 3. 다음 달 날짜 채우기
    let nextMonthDay = 1;
    while (dayCounter < TOTAL_CELLS) {
        const weekIndex = dayCounter % 7;
        const isWeekend = weekIndex === 0 || weekIndex === 6;

        allDays.push({
            day: nextMonthDay,
            isWeekend,
            isActive: false,
            isCurrentMonth: false
        });
        nextMonthDay++;
        dayCounter++;
    }

    // 7개씩 묶어서 주 단위로 분리
    const weeks = [];
    for (let i = 0; i < allDays.length; i += 7) {
        weeks.push(allDays.slice(i, i + 7));
    }

    return (
        <div className="flex flex-col h-full">
            {weeks.map((week, weekIdx) => (
                <div
                    key={weekIdx}
                    className="grid grid-cols-7 text-sm text-right flex-1 snap-start"
                >
                    {week.map((dayData, dayIdx) => {
                        const { day, isWeekend, isActive, isCurrentMonth } = dayData;
                        const textColorClass = isActive ? "normal-text" : "text-gray-400";
                        const dayBgClass = isWeekend && "bg-[#0d1117]";

                        return (
                            <div
                                key={`${day}-${dayIdx}-${weekIdx}`}
                                className={`border-[0.5px] border-gray-800 ${textColorClass} ${dayBgClass}`}
                            >
                                <p className="pt-2">
                                    <span className="p-2">{day}</span>
                                </p>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
