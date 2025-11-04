export default function SideBarSection({ sideBar, setSideBar }) {
    return (
        // <button className="btn main-btn" onClick={() => {
        //     (sideBar > 50) ? setSideBar(50) : setSideBar(250)
        // }}>o</button>
        <>
            <aside className="bg-gray-100 dark:bg-gray-950 hidden sm:block transition-[width] duration-300" style={{width: sideBar+'px'}}>

            </aside>
        </>
    );
}
