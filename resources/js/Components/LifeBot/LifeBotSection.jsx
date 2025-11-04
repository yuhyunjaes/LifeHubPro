export default function LifeBotSection({sideBar}) {
    return (
        <>
            <main className="bg-white transition-[width] duration-300" style={{width: `calc(100% - ${sideBar}px`}}>

            </main>
        </>
    );
}
