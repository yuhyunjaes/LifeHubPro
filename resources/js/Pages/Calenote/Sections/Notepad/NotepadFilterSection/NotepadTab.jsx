import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faLayerGroup} from "@fortawesome/free-solid-svg-icons";

export default function NotepadTab({ tab, setTab }) {
    return(
        <div className="space-x-3 text-sm sm:text-base">
            <button onClick={() => {
                setTab("all");
            }} className={`font-semibold space-x-1 rounded-2xl cursor-pointer transition-colors duration-300 ${tab === "all" ? "normal-text" : "text-gray-500 hover:text-gray-950 dark:hover:text-white"}`}>
                <FontAwesomeIcon icon={faLayerGroup}/>
                <span>전체</span>
            </button>
            <button onClick={() => {
                setTab("liked");
            }} className={`font-semibold space-x-1 rounded-2xl cursor-pointer transition-colors duration-300 ${tab === "liked" ? "normal-text" : "text-gray-500 hover:text-gray-950 dark:hover:text-white"}`}>
                <FontAwesomeIcon icon={faHeart} />
                <span>찜</span>
            </button>
        </div>
    );
}
