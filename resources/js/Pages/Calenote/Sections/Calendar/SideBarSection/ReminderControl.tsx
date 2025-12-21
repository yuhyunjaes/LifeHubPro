import { Dispatch, SetStateAction } from "react";

type ReminderType =
    | "5min"
    | "10min"
    | "15min"
    | "30min"
    | "1day"
    | "2day"
    | "3day"
    | "start";

interface ReminderControlProps {
    eventReminder: ReminderType;
    setEventReminder: Dispatch<SetStateAction<ReminderType>>;
}

export default function ReminderControl({
    eventReminder,
    setEventReminder,
}: ReminderControlProps) {
    const reminderOptions: { title: string; standard: ReminderType }[] = [
        { title: "이벤트 시작 시", standard: "start" },
        { title: "5분 전", standard: "5min" },
        { title: "10분 전", standard: "10min" },
        { title: "15분 전", standard: "15min" },
        { title: "30분 전", standard: "30min" },
        { title: "1일 전", standard: "1day" },
        { title: "2일 전", standard: "2day" },
        { title: "3일 전", standard: "3day" },
    ];

    return (
        <div className="px-5 flex flex-wrap">
            <label
                htmlFor="eventReminder"
                className="text-xs font-semibold mb-1"
            >
                리마인더
            </label>

            <select
                id="eventReminder"
                value={eventReminder}
                onChange={(e) =>
                    setEventReminder(e.target.value as ReminderType)
                }
                className="border bg-transparent rounded outline-none border-gray-300 w-full dark:border-gray-800 font-semibold text-xs px-1 py-2"
            >
                {reminderOptions.map((item) => (
                    <option key={item.standard} value={item.standard}>
                        {item.title}
                    </option>
                ))}
            </select>
        </div>
    );
}
