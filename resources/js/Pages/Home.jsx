import { Head } from '@inertiajs/react';
import MainSection from '@/Components/Home/MainSection.jsx';
import IntroduceSection from '@/Components/Home/IntroduceSection.jsx';
import ContentsSection from '@/Components/Home/ContentsSection.jsx';
import {useState} from "react";
import Header from '@/Components/Header/Header.jsx';
import Footer from '@/Components/Footer/Footer.jsx';

export default function Home({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Home"></Head>
            <Header />
            <div className="w-full overflow-x-hidden">
                <MainSection />
                <IntroduceSection />
                <ContentsSection/>
            </div>
            <Footer />
        </>
    );
}
