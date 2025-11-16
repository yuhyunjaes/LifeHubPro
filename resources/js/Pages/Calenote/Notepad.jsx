import { Head, router } from '@inertiajs/react';
import { useEffect, useState} from "react";
import Loading from "@/Components/Elements/Loading.jsx";
import NotepadTitleSection from "@/Components/Calenote/Notepad/NotepadTitleSection.jsx";
import NotepadTabSection from "@/Components/Calenote/Notepad/NotepadTabSection.jsx";
import NotepadsSection from "@/Components/Calenote/Notepad/NotepadsSection.jsx";

export default function Notepad({ auth }) {
    const [loading, setLoading] = useState(false);
    const [tap, setTap] = useState("all");
    const [viewOption, setViewOption] = useState("grid");
    const [notepads, setNotepads] = useState([]);

    return (
        <>
            <Head title="Notepad"/>
            <NotepadTitleSection />
            <div className="container py-16 px-5 overflow-y-auto space-y-5">
                <NotepadTabSection viewOption={viewOption} setViewOption={setViewOption}  tap={tap} setTap={setTap}/>
                <NotepadsSection setLoading={setLoading} notepads={notepads} setNotepads={setNotepads} />
            </div>
            <Loading Toggle={loading}/>
        </>
    );
}
