// 메시지 read 영역

import MessageBubble from "./MessageList/MessageBubble";
import { Message, Notepad } from "../../../../Types/LifeBotTypes";

interface MessageListProps {
    chatId: string | null;
    messages: Message[];
    handleNotepad: (notepad: Notepad) => Promise<void>;
}

export default function MessageList({ chatId, messages, handleNotepad } : MessageListProps) {
    return (
        <div className="w-full h-[calc(100%-80px)] flex flex-col-reverse overflow-x-hidden overflow-y-auto px-5">
            {chatId && (
                <div className="w-full max-w-3xl mx-auto py-5">
                    {messages.map((msg, i) => (
                        <MessageBubble key={i} msg={msg} handleNotepad={handleNotepad} />
                    ))}
                </div>
            )}
        </div>
    );
}
