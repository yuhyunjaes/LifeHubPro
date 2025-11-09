import {useEffect} from "react";
import Header from '@/Components/Header/Header.jsx';

export default function CalenoteLayout({ children, auth }) {
    return (
        <>
            <Header auth={auth} />

            {children}
        </>
    );
}
