import { Head } from '@inertiajs/react';
import MainSection from '@/Pages/Home/Sections/MainSection.jsx';
import IntroduceSection from '@/Pages/Home/Sections/IntroduceSection.jsx';
import ContentsSection from '@/Pages/Home/Sections/ContentsSection.jsx';
import Header from '@/Components/Header/Header.jsx';
import Footer from '@/Components/Footer/Footer.jsx';


export default function Home({ auth }) {
    return (
        <>
            <Head title="Home"></Head>
            <Header auth={auth} className="animate-opacityLoad"/>
            <div className="w-full overflow-x-hidden">
                <MainSection />
                <IntroduceSection />
                <ContentsSection/>
            </div>
            <Footer />
        </>
    );
}
