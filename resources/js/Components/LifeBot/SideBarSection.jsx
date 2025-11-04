export default function SideBarSection({ sideBar, setSideBar }) {
    return (
        <>
            <aside className="bg-gray-400 hidden sm:block transition-[width] duration-300" style={{width: sideBar+'px'}}>
                <button className="btn main-btn" onClick={() => {
                    (sideBar > 50) ? setSideBar(50) : setSideBar(250)
                }}>o</button>
            </aside>
        </>
    );
}
