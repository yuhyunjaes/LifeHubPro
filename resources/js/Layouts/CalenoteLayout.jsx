import {useEffect} from "react";
import SideBarSection from "@/Components/Calenote/SideBarSection.jsx";
import Header from "@/Components/Header/Header.jsx";

export default function CalenoteLayout({ children, auth }) {
    return (
        <>
            <Header auth={auth} />
            <div className="w-full h-[calc(100vh-70px)] flex">
                <SideBarSection />
                <div className="w-[calc(100%-250px)] h-full">
                    {children}
                </div>
            </div>
        </>
    );
}
