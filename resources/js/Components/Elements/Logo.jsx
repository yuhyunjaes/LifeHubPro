import {Link} from "@inertiajs/react";
import {useEffect} from "react";

export default function Logo({ className = "" }) {
    useEffect(() => {
        const htmlClass = document.documentElement.className;
    }, []);
    return (
        <Link
            href="/" className={`block w-[150px] h-auto cursor-pointer m-0 ${className}`}
        >
            <img src="/asset/images/Logo/WhiteLogo.png" className="w-full h-auto object-contain hidden dark:block" alt=""/>
            <img src="/asset/images/Logo/DarkLogo.png" className="w-full h-auto object-contain block dark:hidden" alt=""/>
        </Link>
    );
}
