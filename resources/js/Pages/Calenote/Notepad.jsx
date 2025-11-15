import { Head, router } from '@inertiajs/react';
import { useEffect, useState} from "react";
import Loading from "@/Components/Elements/Loading.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export default function Notepad({ auth }) {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <Head title="Notepad"/>
            <div className="container mx-auto min-h-full px-5 py-16 overflow-y-auto space-y-5">
            </div>
            <Loading Toggle={loading}/>
        </>
    );
}
