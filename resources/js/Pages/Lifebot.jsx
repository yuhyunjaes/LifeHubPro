import Header from '@/Components/Header/Header.jsx';
import Footer from '@/Components/Footer/Footer.jsx';
import Loading from '@/Components/Elements/Loading.jsx';
import { Head } from '@inertiajs/react';
import LifeBotSection from '@/Components/LifeBot/LifeBotSection.jsx';
import SideBarSection from '@/Components/LifeBot/SideBarSection.jsx';
import { useEffect, useState, useCallback } from "react";

export default function Lifebot({ auth }) {
    const [sideBar, setSideBar] = useState(() => (window.innerWidth <= 640 ? 0 : 250));
    const [saveWidth, setSaveWidth] = useState(250);
    const [loading, setLoading] = useState(false);

    const handleResize = useCallback(() => {
        setSideBar((prev) => {
            if (window.innerWidth <= 640) {
                return 0;
            } else {
                return prev === 0 ? saveWidth : prev;
            }
        });
    }, [saveWidth]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    useEffect(() => {
        if (sideBar > 0) {
            setSaveWidth(sideBar);
        }
    }, [sideBar]);

    return (
        <>
            <Head title="LifeBot" />
            <Header auth={auth} />
            <div className="flex h-[calc(100vh-70px)] transition-[width] duration-300">
                <SideBarSection sideBar={sideBar} setSideBar={setSideBar} />
                <LifeBotSection sideBar={sideBar} setLoading={setLoading}/>
            </div>

            {loading && <Loading />}
        </>
    );
}
