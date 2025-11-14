import {useCallback, useEffect, useState} from "react";

export default function NotepadListSection({ setLoading }) {
    const [notepads, setNotepads] = useState([]);

    const getNotepads = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/notepads");
            if(res.data.success) {
                setNotepads(res.data.notepads);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getNotepads();
    }, [getNotepads])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
            {notepads.map((notepad, index) => (
                <div key={index} className={`notepad-item ${notepad.color ? "bg-[${notepad.color}]" : "bg-blue-500"}`}>
                    <p className="text-white font-semibold p-5">
                        {notepad.title}
                    </p>
                </div>
            ))}
        </div>
    );
}
