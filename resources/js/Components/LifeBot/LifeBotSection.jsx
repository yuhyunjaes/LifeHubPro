import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TITLE_PROMPT, DEFAULT_PROMPT, HISTORY_PROMPT } from "/config/prompt.js";
import {useCallback, useState} from "react";
export default function LifeBotSection({sideBar, setLoading}) {
    const START_API = import.meta.env.VITE_GEMINI_API_START;
    const END_API = import.meta.env.VITE_GEMINI_API_END;
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const MODEL_NAME = import.meta.env.VITE_GEMINI_API_MODEL;

    const [prompt, setPrompt] = useState("");
    const [load, setLoad] = useState(false);

    const handleSubmit = async () => {
        if(!prompt.trim()) return;
        setLoad(true);

        const titlePrompt = `USER_TEXT***${prompt}***${TITLE_PROMPT}`;
        // 여기까지 하였음
    }

    return (
        <>
            <main className="bg-white dark:bg-[#0d1117] transition-[width] duration-300" style={{width: `calc(100% - ${sideBar}px`}}>
                <div className="w-full h-[calc(100%-80px)]"></div>
                <div className="w-full h-[80px] relative">

                    <div
                        className={`w-full flex justify-center items-end absolute left-0 bottom-0 mb-3 px-5`}
                    >
                        <div className="w-full max-w-3xl bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-[2rem] shadow-sm p-2 flex items-end overflow-hidden">
                            <textarea
                                className="
                                prompt-form
                                leading-[40px] ms-2 min-h-[40px] max-h-[150px] font-semibold
                                placeholder-gray-950 dark:placeholder-white focus:bg-transparent border-0
                                text-gray-950 dark:text-white bg-transparent flex-grow overflow-y-auto
                                overflow-x-hidden resize-none outline-none
                                "
                                placeholder="AI에게 물어볼 내용을 입력하세요"
                                onInput={(e) => {
                                    e.target.style.height = "auto";
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                }}
                                onChange={(e) => setPrompt(e.target.value)}
                                rows="1"
                                disabled={load}
                            />

                            <button
                                onClick={handleSubmit}
                                className="w-[40px] h-[40px] bg-gray-950 dark:bg-white border rounded-full px-3 ml-2 flex justify-center items-center"
                            >
                                {load ? (
                                    <div className="animate-spin m-0 p-0 w-[1rem] text-white dark:text-gray-950 h-[1rem] flex justify-center items-center">
                                        <FontAwesomeIcon icon={faSpinner} />
                                    </div>
                                ) : (
                                    <FontAwesomeIcon icon={faArrowUp} className="text-white dark:text-gray-950" />
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}
