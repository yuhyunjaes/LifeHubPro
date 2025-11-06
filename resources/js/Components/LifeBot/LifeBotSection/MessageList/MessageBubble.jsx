// MessageBubble.jsx
import MessageActions from './MessageActions.jsx';

export default function MessageBubble({ msg, handleNotepad }) {
    const isUser = msg.role === "user";

    return (
        <div
            className={`flex chat-item mb-[100px] transition-opacity duration-300 ${
                isUser ? "justify-end" : "justify-start relative"
            }`}
        >
            <div
                className={`p-3 mx-0 rounded-[0.75rem] shadow-sm max-w-[70%] whitespace-pre-wrap break-words font-semibold ${
                    isUser ? "bg-blue-500 text-white" : "bg-white text-black border border-gray-50"
                }`}
            >
                {msg.text}
            </div>

            {!isUser && msg.id && <MessageActions msg={msg} handleNotepad={handleNotepad} />}
        </div>
    );
}
