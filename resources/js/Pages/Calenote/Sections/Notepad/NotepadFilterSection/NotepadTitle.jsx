import FormInputWithButton from "@/Components/Elements/FormInputWithButton.jsx";
export default function NotepadTitle({searchTitle, setSearchTitle, handleSearchNotepadTitle}) {
    return (
        <FormInputWithButton
            buttonText="검색"
            value={searchTitle}
            onChange={(e) => {
            setSearchTitle(e.target.value);
            }}
            onButtonClick={handleSearchNotepadTitle}
        />
    );
}
