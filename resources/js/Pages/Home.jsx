import { Head } from '@inertiajs/react';
import MainSection from '@/Components/Home/MainSection.jsx';
import IntroduceSection from '@/Components/Home/IntroduceSection.jsx';
import ContentsSection from '@/Components/Home/ContentsSection.jsx';
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
