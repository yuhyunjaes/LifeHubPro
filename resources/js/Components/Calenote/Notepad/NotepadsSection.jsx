import {useCallback, useEffect} from "react";

export default function NotepadsSection({ notepads, setNotepads, setLoading }) {
    const getNotepads = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/notepads");
            if(res.data.success) {
                setNotepads(res.data.notepads);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getNotepads();
    }, [getNotepads]);

    return (
        <div className="columns-3 gap-5">
            {notepads.map((notepad, index) => (
                <div
                    key={index}
                    className="notepad-item mb-5 break-inside-avoid-column"
                >
                    <h5 className="normal-text font-semibold">{notepad.title}</h5>
                    <p className="text-white text-sm">{notepad.content}</p>
                </div>
            ))}
        </div>
    );
}
