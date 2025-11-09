import {useCallback, useEffect, useRef, useState} from "react";
import { router } from '@inertiajs/react';
import MessageList from '@/Components/LifeBot/LifeBotSection/MessageList.jsx';
import ChatInput from '@/Components/LifeBot/LifeBotSection/ChatInput.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

export default function LifeBotSection({ setNewChat, sideBar, setLoading, chatId, setChatId, setRooms, auth, roomId, setMessages, messages, prompt, setPrompt }) {

    const handleNotepad = useCallback(async (msg) => {
        if (!msg?.text || !msg?.id) return;
        setLoading(true);
        try {
            const content = msg.text;
            const chat_id = msg.id;

            if(!content || !chat_id) return;

            const res = await axios.post("/api/notepads", {
                content: content,
                chat_id: chat_id,
            })
            const data = res.data;
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [])



    return (
        <>
            <main className="bg-white relative dark:bg-[#0d1117] transition-[width] duration-300" style={{width: `calc(100% - ${sideBar}px`}}>
                <MessageList chatId={chatId} messages={messages} handleNotepad={handleNotepad}/>
                <ChatInput auth={auth} setNewChat={setNewChat} prompt={prompt} setPrompt={setPrompt} setLoading={setLoading} roomId={roomId} chatId={chatId} setChatId={setChatId} setRooms={setRooms} setMessages={setMessages} messages={messages} handleNotepad={handleNotepad}/>
            </main>
        </>
    );
}
