import {useState, useRef, useEffect, RefObject} from "react";
import CalendarSection from "./MainCalendarSection/CalendarSection";
import CalendarControlSection from "./MainCalendarSection/CalendarControlSection";
import { Dispatch, SetStateAction } from "react";

interface SideBarSectionProps {
    sideBar: number;
    viewMode: "month" | "week" | "day";
    setViewMode: Dispatch<SetStateAction<"month" | "week" | "day">>;
    today: Date;
    activeAt: Date;
    setActiveAt: Dispatch<SetStateAction<Date>>;
}

export default function MainCalendarSection({ sideBar, activeAt, setActiveAt, viewMode, setViewMode, today }: SideBarSectionProps) {
    // 순차적 초기화: [이전 달, 현재 달, 다음 달]
    const [months, setMonths] = useState<Date[]>([
        new Date(today.getFullYear(), today.getMonth() - 1, 1), // 이전 달
        today, // 현재 달
        new Date(today.getFullYear(), today.getMonth() + 1, 1), // 다음 달
    ]);
    const scrollRef:RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

    // 스크롤 처리: 위/아래 끝에서 무한 스크롤 (useCallback 적용)
    const handleScroll = ():void => {
        if(!scrollRef.current) return;
        const container = scrollRef.current;
        const scrollTop = container.scrollTop;
        const clientHeight = container.clientHeight;
        const scrollHeight = container.scrollHeight;

        if (scrollTop <= 0) {
            setMonths(prev => {
                const first:Date | undefined = prev[0];
                if(!first) return [...prev];
                const newMonth = new Date(first.getFullYear(), first.getMonth() - 1, 1);
                let updated = [newMonth, ...prev];
                if (updated.length > 3) {
                    updated.pop();
                }

                return updated;
            })
            center();
        }

        if (scrollTop + clientHeight >= scrollHeight) {
            setMonths(prev => {
                const last: Date | undefined = prev[2];
                if (!last) return [...prev];

                const newMonth = new Date(last.getFullYear(), last.getMonth() + 1, 1);
                let updated = [...prev, newMonth];

                if (updated.length > 3) {
                    updated.shift();
                }

                return updated;
            });
            center();
        }
    }

    const center:() => void = ():void => {
        if (scrollRef.current) {
            const container:HTMLDivElement = scrollRef.current;
            container.scrollTop = (container.scrollHeight - container.clientHeight) / 2;
        }
    }

    useEffect(():void => {
        center();
    }, []);

    useEffect(() => {
        if (months[1]) {
            setActiveAt(months[1]);
        }
    }, [months]);

    return (
        <div className="flex-1 flex flex-col gap-5">
            <CalendarControlSection activeAt={activeAt} viewMode={viewMode} setViewMode={setViewMode}/>
            <div className="border border-gray-800 rounded flex-1 flex flex-col overflow-hidden">
                <div className="py-2 grid grid-cols-7 text-center text-sm">
                    {['일','월','화','수','목','금','토'].map((d) => (
                        <div key={d} className="font-bold normal-text items-center flex justify-center">{d}</div>
                    ))}
                </div>
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex-1 hidden-scroll overflow-x-hidden overflow-y-auto snap-y snap-mandatory"
                >
                    {months.map((m, index) => (
                        <CalendarSection
                            scrollRef={scrollRef}
                            key={index}
                            date={m}
                            activeAt={activeAt}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
