import Header from '@/Components/Header/Header.jsx';
import Footer from '@/Components/Footer/Footer.jsx';
import { Head } from '@inertiajs/react';
import LifeBotSection from '@/Components/LifeBot/LifeBotSection.jsx';
import SideBarSection from '@/Components/LifeBot/SideBarSection.jsx';
import { useEffect, useState } from "react";

export default function Lifebot({ auth, laravelVersion, phpVersion }) {
    const [sideBar, setSideBar] = useState(() => (window.innerWidth <= 640 ? 0 : 250));
    const [saveWidth, setSaveWidth] = useState(250);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 640) {
                setSideBar(0);
            } else {
                setSideBar(saveWidth);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [saveWidth]);

    useEffect(() => {
        if (sideBar > 0) {
            setSaveWidth(sideBar);
        }
    }, [sideBar]);

    return (
        <>
            <Head title="LifeBot" />
            <Header auth={auth} />
            <div className="flex h-[calc(100vh-70px)]">
                <SideBarSection sideBar={sideBar} setSideBar={setSideBar} />
                <LifeBotSection sideBar={sideBar} />
            </div>
            <Footer />
        </>
    );
}
