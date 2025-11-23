import { useEffect, useRef } from "react";
import Quill from "quill";
import 'quill/dist/quill.snow.css';

export default function WriteSection({ setNotepadText, notepadText, setSaveStatus, handleSaveNotepadContent }) {
    const quillRef = useRef(null);
    const quillInstance = useRef(null);
    const timer = useRef(null);

    const notepadTextRef = useRef(notepadText);
    useEffect(() => {
        notepadTextRef.current = notepadText;
    }, [notepadText]);
    useEffect(() => {
        if (quillInstance.current) return;

        const toolbarOptions = [
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'align': [] }],
        ];

        const quill = new Quill(quillRef.current, {
            theme: 'snow',
            placeholder: '메모를 작성하세요...',
            modules: {
                toolbar: toolbarOptions,
                clipboard: {
                    matchVisual: false,
                },
            },
        });

        if (notepadText) {
            quill.clipboard.dangerouslyPasteHTML(notepadText);
        } else {
            quill.setText("");
        }

        quill.history.clear();

        quill.on("text-change", () => {
            const html = quill.root.innerHTML;
            setNotepadText(html);
            setSaveStatus(true);

            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                handleSaveNotepadContent(notepadTextRef.current);
            }, 500);
        });

        quillInstance.current = quill;
    }, []);

    return (
        <div className="write-notepad flex flex-col flex-1 bg-gray-100 dark:bg-gray-950">
            <div ref={quillRef} className="flex-1"/>
        </div>
    );
}
