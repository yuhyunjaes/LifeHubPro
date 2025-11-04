import { Link, router } from "@inertiajs/react";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import DesktopMenu from "./DesktopMenu";
import MobileSidebar from "./MobileSidebar";
import Logo from "../Elements/Logo.jsx";

export default function Header({ auth, className = "" }) {
    const [sideBar, setSideBar] = useState(false);
    const [myBox, setMyBox] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (myBox && profileRef.current && !profileRef.current.contains(e.target)) {
                setMyBox(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [myBox]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setMyBox(false)
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = async () => {
        router.post("/logout", {}, {
            onError: (err) => {
                alert('로그아웃 중 오류가 발생했습니다.');
                console.error(err);
            }
        })
    }

    return (
        <>
            <header
                className={`
                    w-full h-[70px] sticky top-0 left-0 z-[999]
                    border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-950
                    ${className && className}
                `}
            >
                <div className="w-full h-full flex justify-between items-center px-5 sm:px-12">
                    <Logo />

                    <div className="m-0 flex items-center">
                        <DesktopMenu />

                        {auth.user ? (
                            <div ref={profileRef} className="relative">
                                <button
                                    className="profile"
                                    onClick={() => setMyBox(!myBox)}
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </button>

                                {myBox && (
                                    <div
                                        className={`
                                        absolute overflow-hidden w-[200px] bg-gray-100 dark:bg-gray-950 top-[calc(100%+10px)] right-0
                                        shadow-md rounded-md
                                        border border-gray-200 dark:border-gray-800
                                    `}
                                    >
                                        <div className="p-5 space-y-5">
                                            <Link className="py-2 block">
                                                <span className="normal-text font-semibold ms-2">마이페이지</span>
                                            </Link>
                                            <button onClick={handleLogout} className="btn w-full main-btn">로그아웃</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className="btn hidden md:block btn-outline-white">
                                로그인
                            </Link>
                        )}


                        <button
                            className="block md:hidden text-xl"
                            onClick={() => setSideBar(true)}
                        >
                            <FontAwesomeIcon
                                className="text-gray-950 dark:text-white"
                                icon={faBars}
                            />
                        </button>
                    </div>
                </div>
            </header>

            <MobileSidebar sideBar={sideBar} setSideBar={setSideBar} auth={auth} />
        </>
    );
}
