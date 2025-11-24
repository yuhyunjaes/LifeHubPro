// 메모장 필터 영역 (찜, grid)

import NotepadTab from "@/Pages/Calenote/Sections/Notepad/NotepadFilterSection/NotepadTab.jsx";
import NotepadGrid from "@/Pages/Calenote/Sections/Notepad/NotepadFilterSection/NotepadGrid.jsx";
import NotepadTitle from "@/Pages/Calenote/Sections/Notepad/NotepadFilterSection/NotepadTitle.jsx";

export default function NotepadFilterSection({ tab, setTab, viewOption, setViewOption, searchTitle, setSearchTitle, handleSearchNotepadTitle }) {
    return (
        <div className="sticky top-0 py-3 z-[1] bg-gray-100 dark:bg-gray-950 space-y-3">
            <div className="flex justify-between">
                <NotepadTab tab={tab} setTab={setTab} />
                <NotepadGrid viewOption={viewOption} setViewOption={setViewOption} />
            </div>

            <div className="flex justify-between">
                <NotepadTitle searchTitle={searchTitle} setSearchTitle={setSearchTitle} handleSearchNotepadTitle={handleSearchNotepadTitle} />
            </div>
        </div>
    );
}
