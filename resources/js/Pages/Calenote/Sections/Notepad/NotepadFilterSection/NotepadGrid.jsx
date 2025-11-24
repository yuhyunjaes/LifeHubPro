import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBarsStaggered, faGrip} from "@fortawesome/free-solid-svg-icons";


export default function NotepadGrid({ setViewOption, viewOption }) {
    return(
        <div className="space-x-3 text-sm sm:text-base">
            <button onClick={() => {
                setViewOption("list");
            }} className={`font-semibold cursor-pointer transition-colors duration-300 ${viewOption === "list" ? "normal-text" : "text-gray-500 hover:text-gray-950 dark:hover:text-white"}`}>
                <FontAwesomeIcon icon={faBarsStaggered} />
            </button>
            <button onClick={() => {
                setViewOption("grid");
            }} className={`font-semibold cursor-pointer transition-colors duration-300 ${viewOption === "grid" ? "normal-text" : "text-gray-500 hover:text-gray-950 dark:hover:text-white"}`}>
                <FontAwesomeIcon icon={faGrip} />
            </button>
        </div>
    );
}
