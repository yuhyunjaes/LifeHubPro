import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faShareNodes, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import {useCallback, useEffect, useState} from "react";

export default function NotepadsSection({ notepads, setNotepads, setLoading, viewOption, notepadLikes, setNotepadLikes }) {
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

    const getNotepadLikes = useCallback(async ()=> {
        setLoading(true);
        try {
            const res = await axios.get("/notepads/likes");
            if(res.data.success) {
                setNotepadLikes(res.data.likes);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getNotepadLikes();
    }, [getNotepadLikes]);

    const handleLikeInsert = async (uuid) => {
        setLoading(true);
        try {
            const res = await axios.post(`/notepads/${uuid}/like`);
            if(res.data.success) {
                setNotepadLikes(prev => [...prev, { notepad_id: uuid }]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLikeDelete = async (uuid) => {
        setLoading(true);
        try {
            const res = await axios.delete(`/notepads/${uuid}/like`);
            if(res.data.success) {
                setNotepadLikes(prev => prev.filter(like => like.notepad_id !== uuid));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className={`grid gap-5 ${viewOption === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
            {notepads.map((notepad, index) => (
                <div key={index} className="notepad-item">
                    <h5 className="normal-text font-semibold truncate">{notepad.title}</h5>
                    <p className="text-white normal-text text-sm min-h-[80px] max-h-[80px] line-clamp-4">
                        {notepad.content}
                    </p>
                    <p className="text-sm normal-text truncate">{notepad.created_at.substring(0, 10)}</p>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500 text-sm">{notepad.category}</p>

                        <div className="space-x-2">
                            <button className="transition-colors duration-300 text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-700">
                                <FontAwesomeIcon icon={faShareNodes}/>
                            </button>
                            {
                                notepadLikes.some(like => like.notepad_id === notepad.id) ? (
                                    <button
                                        className="transition-colors duration-300 text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-700"
                                        onClick={() => handleLikeDelete(notepad.id)}
                                    >
                                        <FontAwesomeIcon icon={faHeartSolid} />
                                    </button>
                                ) : (
                                    <button
                                        className="transition-colors duration-300 text-blue-500 cursor-pointer hover:text-blue-600 active:text-blue-700"
                                        onClick={() => handleLikeInsert(notepad.id)}
                                    >
                                        <FontAwesomeIcon icon={faHeartRegular} />
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
}
