import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {Link} from "@inertiajs/react";
import {CalenoteSectionsData} from "@/Pages/Calenote/Sections/CalenoteSectionsData.js";
export default function ControlSection({ title, saveStatus }) {
    return(
        <div className="flex justify-between items-center px-5 border border-t-transparent border-x-transparent bg-white dark:bg-gray-950 py-2 border-b-gray-300 dark:border-b-gray-800 sticky top-0 z-[1]">
            <Link href={CalenoteSectionsData[1].link} className="normal-text cursor-pointer">
                <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <div className="flex justify-center items-center space-x-2">
                <h1 className="normal-text font-semibold">
                    {title}
                </h1>
                <div className={`size-2 rounded-full bg-gray-300 dark:bg-gray-800 transition-opacity duration-300 ${saveStatus ? "opacity-100" : "opacity-0"}`}></div>
            </div>
            <div></div>
        </div>
    );
}
