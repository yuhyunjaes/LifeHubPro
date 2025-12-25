import {Dispatch, SetStateAction} from "react";

interface EventTitleControlProps {
    eventTitle: string;
    setEventTitle: Dispatch<SetStateAction<string>>;
}
export default function EventTitleControl({ eventTitle, setEventTitle }:EventTitleControlProps) {
    return (
        <div className="px-5 pt-5">
            <label htmlFor="eventTitle" className="text-xs font-semibold mb-1">제목</label>
            <input autoFocus={true} type="text" id="eventTitle" className="border w-full border-gray-300 dark:border-gray-800 px-1 py-2 rounded bg-transparent text-xs font-semibold outline-none" placeholder="제목" onChange={(e) => {
                setEventTitle(e.target.value);
            }} value={eventTitle} />
        </div>
    );
}
