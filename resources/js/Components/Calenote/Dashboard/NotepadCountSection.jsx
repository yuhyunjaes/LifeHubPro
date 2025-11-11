import {useCallback, useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function NotepadCountSection() {
    const [notepads, setNotepads] = useState(0);
    const [todayNotepads, setTodayNotepads] = useState(0);

    const getNotepads = useCallback(async () => {
        try {
            const res = await axios.get("/api/notepads/count");
            if(res.data.success) {
                setNotepads(res.data.total_count);
                setTodayNotepads(res.data.today_count);
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        getNotepads();
    }, [getNotepads]);

    return (
        <div className="card border border-gray-300 dark:border-gray-800 p-3 flex flex-col">
            <div className="flex-2">
                <div className="size-8 bg-gray-300 dark:bg-gray-600 normal-text flex justify-center items-center rounded">
                    <FontAwesomeIcon icon={faClipboard} />
                </div>
            </div>
            <h3 className="text-sm normal-text font-semibold mb-3 flex-1">
                메모장
            </h3>
            <div className="flex-2 flex justify-between items-center">
                <h1 className="normal-text font-black text-3xl">
                    {notepads}
                </h1>
                <div className="relative h-full">
                    <span className="px-2 bg-green-400/20 absolute bottom-0 right-0 flex justify-center items-center rounded-xl text-sm text-green-600">
                        <FontAwesomeIcon className="mr-1" icon={faArrowUp} />
                        {todayNotepads}
                    </span>
                </div>
            </div>
        </div>
    );
}
