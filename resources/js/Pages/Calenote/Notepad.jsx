import { Head, router } from '@inertiajs/react';
import { useEffect, useState} from "react";
import Loading from "@/Components/Elements/Loading.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NotepadTitleSection from "@/Components/Calenote/Notepad/NotepadTitleSection.jsx";
import NotepadFilterSection from "@/Components/Calenote/Notepad/NotepadFilterSection.jsx";
export default function Notepad({ auth }) {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <Head title="Notepad"/>
            <div className="container mx-auto min-h-full px-5 py-16 overflow-y-auto space-y-5">
                <NotepadTitleSection />
                <NotepadFilterSection setLoading={setLoading} />
            </div>
            <Loading Toggle={loading}/>
        </>
    );
}
