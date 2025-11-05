import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TITLE_PROMPT, DEFAULT_PROMPT, HISTORY_PROMPT } from "/config/prompt.js";
import {useCallback, useEffect, useRef, useState} from "react";
import { router } from '@inertiajs/react';

export default function LifeBotSection({sideBar, setLoading, chatId, setChatId, rooms, setRooms, auth, roomId, setMessages, messages}) {
    const START_API = import.meta.env.VITE_GEMINI_API_START;
    const END_API = import.meta.env.VITE_GEMINI_API_END;
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const MODEL_NAME = import.meta.env.VITE_GEMINI_API_MODEL;

    const [prompt, setPrompt] = useState("");
    const [load, setLoad] = useState(false);

    const textareaRef = useRef(null);

    const handleSubmit = useCallback(async () => {
        if (!prompt.trim()) return;
        setLoad(true);

        const titlePrompt = `USER_TEXT***${prompt}***${TITLE_PROMPT}`;

        try {
            let currentRoomId = chatId;
            if (!chatId && !currentRoomId) {
                const titleRes = await axios.post("/api/lifebot/title", {
                    model_name: MODEL_NAME,
                    prompt: titlePrompt,
                });
                const title = titleRes.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || prompt.trim();

                const roomRes = await axios.post("/api/rooms", {
                    title,
                    model_name: MODEL_NAME,
                });

                const roomData = roomRes.data;
                if (roomData.success) {
                    currentRoomId = roomData.room_id;
                    setChatId(roomData.room_id);

                    const newRoom = { room_id: roomData.room_id, title: roomData.title };
                    setRooms((prev) => [newRoom, ...prev]);

                    router.visit(`/lifebot/${roomData.room_id}`, {
                        method: "get",
                        preserveState: true,
                        preserveScroll: true,
                    });
                }
            }

            setMessages((prev) => [
                ...prev,
                { role: "user", text: prompt },
                { role: "model", text: "" },
            ]);
            setPrompt("");
            if (textareaRef.current) textareaRef.current.style.height = "40px";

            const historyText =
                messages && messages.length > 0
                    ? JSON.stringify(messages)
                        .replace(/\\/g, "\\\\")
                        .replace(/`/g, "\\`")
                    : "empty-message";

            const response = await fetch(`${START_API}${MODEL_NAME}${END_API}${API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: DEFAULT_PROMPT },
                                { text: HISTORY_PROMPT },
                                { text: `HISTORY-JSON***${historyText}***` },
                                { text: `USER-TEXT***${prompt}***` },
                            ],
                        },
                    ],
                    generationConfig: { temperature: 0.8, maxOutputTokens: 5120 },
                }),
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let fullText = "";
            let aiCode = "";
            let combined = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk
                    .split("\n")
                    .filter((line) => line.trim().startsWith("data: "));

                for (const line of lines) {
                    if (line.includes("[DONE]")) continue;

                    try {
                        const json = JSON.parse(line.replace(/^data: /, ""));
                        const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || "";

                        if (text) {
                            combined += text;

                            const patternStart = combined.indexOf("***{");
                            const patternEnd = combined.lastIndexOf("}***");
                            let cleaned = combined;

                            if (patternStart !== -1 && patternEnd !== -1 && patternEnd > patternStart) {
                                cleaned = combined.slice(0, patternStart) + combined.slice(patternEnd + 4);
                            }

                            fullText = cleaned.trim();
                            if (fullText.includes("***{")) break;

                            setMessages((prev) => {
                                const updated = [...prev];
                                updated[updated.length - 1].text = fullText;
                                return updated;
                            });
                        }
                    } catch (err) {
                        console.warn("파싱 오류:", err);
                    }
                }
            }

            const startIdx = combined.indexOf("***{");
            const endIdx = combined.lastIndexOf("}***");

            if (startIdx !== -1 && endIdx !== -1) {
                aiCode = combined.slice(startIdx + 3, endIdx + 1).trim();
                fullText = (combined.slice(0, startIdx) + combined.slice(endIdx + 4)).trim();
            }

            if (fullText.trim().length === 0) {
                alert("AI 응답이 비어있습니다.");
                setLoad(false);
                setPrompt("");
                setLoading(false);
                return;
            }

            let aiArr = [];

            if (aiCode) {
                try {
                    aiArr = [JSON.parse(aiCode)];

                    if (aiArr[0].chat_id) {
                        aiArr = aiArr.map(obj => {
                            const { chat_id, ...rest } = obj;
                            return { id: chat_id, ...rest };
                        });
                    }
                } catch {
                    console.warn("AI JSON 파싱 실패:", aiCode);
                }
            }


            if (aiArr.length > 0) {
                if (aiArr[0].id) {
                    await handleNotepad(aiArr[0]);
                }
                await saveMessageToDB(currentRoomId, prompt, fullText, !aiArr[0].id ? aiArr : '');
            } else {
                await saveMessageToDB(currentRoomId, prompt, fullText, '');
            }

        } catch (err) {
            console.error("Chat submit error:", err);
        } finally {
            setLoad(false);
            setPrompt("");
        }
    }, [prompt, chatId, MODEL_NAME, roomId]);

    const saveMessageToDB = async (roomId, userText, aiText, arr) => {
        try {
            const res = await axios.post("/api/messages", {
                room_id: roomId,
                user_message: userText,
                ai_message: aiText,
            });

            const data = res.data;
            if (data.success) {
                if(arr) {
                    arr[0].id = data.ai_id;
                    await handleNotepad(arr[0]);
                }
                setMessages((prev) => {
                    const updated = [...prev];
                    if (updated[updated.length - 2]) updated[updated.length - 2].id = data.user_id;
                    if (updated[updated.length - 1]) updated[updated.length - 1].id = data.ai_id;
                    return updated;
                });
            }
        } catch (err) {
            console.error("메시지 저장 오류:", err);
        }
    };

    const handleNotepad = async (msg) => {
        const content = msg.text;
        const chat_id = msg.id;

        if(!content || !chat_id) return;

        const res = await axios.post("/api/notepads", {
            content: content,
            chat_id: chat_id,
        })
        const data = res.data;
        // if (data.success) {
        //     navigate(`/notepad/write/${data.id}`);
        // }
    };

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter" && !e.shiftKey && !load) {
                e.preventDefault();
                handleSubmit();
            }
        },
        [handleSubmit, load]
    );

    return (
        <>
            <main className="bg-white dark:bg-[#0d1117] transition-[width] duration-300" style={{width: `calc(100% - ${sideBar}px`}}>
                <div className="w-full h-[calc(100%-80px)] flex flex-col-reverse overflow-x-hidden overflow-y-auto px-5">
                    {chatId && (
                        <div className="w-full max-w-3xl mx-auto py-5">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex chat-item mb-[100px] transition-opacity duration-300 ${
                                        msg.role === "user"
                                            ? "justify-end"
                                            : "justify-start relative"
                                    }`}
                                >
                                    <div
                                        className={`p-3 mx-0 rounded-[0.75rem] shadow-sm max-w-[70%] whitespace-pre-wrap break-words font-semibold ${
                                            msg.role === "user"
                                                ? "bg-blue-500 text-white"
                                                : "bg-white text-black border border-gray-50"
                                        }`}
                                    >
                                        {msg.text}
                                    </div>

                                    {msg.id && msg.role === "model" && (
                                        <div
                                            className="absolute h-[50px] bottom-[-50px] left-0 w-full flex justify-start items-center">
                                            <button
                                                className="btn"
                                                title="복사"
                                                // onClick={() => {
                                                //     window.navigator.clipboard.writeText(msg.text);
                                                //     showAlert("복사가 완료되었습니다.", true);
                                                // }}
                                            >
                                                <i className="fa-solid fa-copy"></i>
                                            </button>
                                            <button
                                                className="btn"
                                                title="메모장 저장"
                                                onClick={() => handleNotepad(msg)}
                                            >
                                                <i className="fa-solid fa-clipboard"></i>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="w-full h-[80px] relative">

                    <div
                        className={`w-full flex justify-center items-end absolute left-0 bottom-0 mb-3 px-5`}
                    >
                        <div className="w-full max-w-3xl bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-[2rem] shadow-sm p-2 flex items-end overflow-hidden">
                            <textarea
                                ref={textareaRef}
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
                                onKeyDown={handleKeyDown}
                                value={prompt}
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
