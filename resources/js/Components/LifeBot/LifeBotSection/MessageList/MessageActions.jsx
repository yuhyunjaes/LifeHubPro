export default function MessageActions({ msg, handleNotepad }) {
    return (
        <div className="absolute h-[50px] bottom-[-50px] left-0 w-full flex justify-start items-center space-x-2">
            <button
                className="btn"
                title="복사"
                onClick={() => {
                    navigator.clipboard.writeText(msg.text);
                    alert("복사가 완료되었습니다.");
                }}
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
    );
}
