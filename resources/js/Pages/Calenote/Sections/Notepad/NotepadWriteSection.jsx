import { Head } from '@inertiajs/react';
import {useCallback, useEffect, useRef, useState} from "react";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import WriteSection from "@/Pages/Calenote/Sections/Notepad/NotepadWriteSection/WriteSection.jsx";
import ControlSection from "@/Pages/Calenote/Sections/Notepad/NotepadWriteSection/ControllSection.jsx";

export default function NotepadWriteSection({ content, uuid, title }) {
    const [notepadText, setNotepadText] = useState(content || "");
    const [saveStatus, setSaveStatus] = useState(false);

    const handleSaveNotepadContent = useCallback(async (text) => {
        if(!uuid) return;
        try {
            const res = await axios.put(`/api/notepads/${uuid}`, {
                text : text
            });

            if(res.data.success) {
                setSaveStatus(false);
            }
        } catch (err) {
            console.error(err);
        }
    }, [uuid]);


    return (
        <>
            <Head title="Notepad Write" />
            <div className="h-full flex flex-col relative overflow-y-auto">
                <ControlSection saveStatus={saveStatus} title={title}/>
                <WriteSection handleSaveNotepadContent={handleSaveNotepadContent} notepadText={notepadText} setNotepadText={setNotepadText} setSaveStatus={setSaveStatus}/>
            </div>
        </>
    );
}
