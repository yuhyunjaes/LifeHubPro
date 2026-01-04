import {Dispatch, SetStateAction, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";

interface ReminderControlProps {
    eventReminder: string[];
    setEventReminder: Dispatch<SetStateAction<string[]>>;
}

export default function ReminderControl({ eventReminder, setEventReminder }:ReminderControlProps) {
    const reminderOptions:string[] = [
        "start",
        "5min",
        "10min",
        "15min",
        "30min",
        "1day",
        "2day",
        "3day"
    ];
    const [reminderSelector, setReminderSelector] = useState<boolean>(false);

    const reminderChangeKorean = (reminder: string): string | undefined => {
        if (!reminder) return;

        if(reminder === "start") return"이벤트 시작 시";

        const match = reminder.match(/^(\d+)([a-zA-Z]+)$/);
        if (!match) return;

        const [, number, unit] = match;

        const dayNumber:number = Number(number);
        const dayUnit:string | undefined = unit;

        if(!dayUnit) return;

        if(dayUnit.includes("week")) {
            return dayNumber+"주 전";
        } else if(dayUnit.includes("day")) {
            return dayNumber+"일 전";
        } else if(dayUnit.includes("min")) {
            return dayNumber+"분 전";
        } else {
            return dayNumber+dayUnit;
        }
    };


    return (
        <div className="px-5 flex flex-wrap">
            <label
                htmlFor="eventReminder"
                className="text-xs font-semibold mb-1"
            >
                리마인더
            </label>

            <div className="w-full relative">
                <input
                    onFocus={() => {setReminderSelector(true)}}
                    onBlur={() => {setReminderSelector(false)}}
                    type="number"
                    id="eventTitle"
                    className="border w-full border-gray-300 dark:border-gray-800 px-1 py-2 rounded bg-transparent text-xs font-semibold outline-none"
                    placeholder="리마인더"
                />

                {reminderSelector ?
                    <div className="absolute w-[200px] top-0 right-[calc(100%+0.5rem)] rounded bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800">
                        {reminderOptions.map((reminderOption:string) => (
                            <button onMouseDown={() => {
                                if(!eventReminder.includes(reminderOption)) {
                                    setEventReminder(pre => [...pre, reminderOption]);
                                }
                            }} key={reminderOption} className="p-2 w-full text-xs text-left hover:bg-gray-950/10 dark:hover:bg-gray-600 rounded">
                                {reminderChangeKorean(reminderOption)}
                            </button>
                        ))}
                    </div> : ""}
            </div>
            <div className="mt-2 max-h-[200px] overflow-x-hidden overflow-y-auto space-y-2 bg-transparent rounded outline-none border-gray-300 w-full dark:border-gray-800 font-semibold text-xs">
                {eventReminder.map((reminder) => {
                    const option = reminderOptions.find(
                        option => option === reminder
                    );

                    if (!option) return null;

                    return (
                        <div className="border border-gray-200 dark:border-gray-800 group p-2 w-full rounded hover:bg-gray-950/10 dark:hover:bg-gray-600 flex items-center justify-between" key={reminder}>
                            {reminderChangeKorean(option)}
                            <button onClick={() => {
                                setEventReminder(pre => pre.filter(item => item !== option));
                            }} className="text-[10px] hidden  group-hover:block">
                                <FontAwesomeIcon icon={faX} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
