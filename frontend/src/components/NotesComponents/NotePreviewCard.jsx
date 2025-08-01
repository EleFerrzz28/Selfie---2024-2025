import "./NotePreviewCard.css";
import { useDeleteNoteMutation, useCopyNoteMutation } from "../../redux/notes/notesApiSlice";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

function NotePreviewCard({ id, title, desc, tags, creation_date, last_update_date, openMenuId, setOpenMenuId, setEditingNoteId, setPreviewNoteModal }) {
    const [deleteNote, { isLoading }] = useDeleteNoteMutation();
    const [copyNote, { isLoading2 }] = useCopyNoteMutation();
    const maxLength = 200;
    const truncated = desc ? (desc.length > maxLength ? desc.substr(0, maxLength) + "..." : desc) : "No text available";

    const maxTitleLength = 30;
    const titleTruncated = title ? (title.length > maxTitleLength ? title.substr(0, maxTitleLength) + "..." : title) : "No title available";

    const formattedCreationDate = new Intl.DateTimeFormat('en-US').format(new Date(creation_date));
    const formattedUpdatedDate = new Intl.DateTimeFormat('en-US').format(new Date(last_update_date));

    const openNoteMenu = (e) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    }
    const handleDeleteNote = async () => {
        // if (isLoading2) return;
        // if (!window.confirm('Are you sure you want to delete this note?')) {
        //     return;
        // }
        try {
            await deleteNote(id).unwrap();
            setOpenMenuId(null);
            toast.success("Note deleted successfully!");
        } catch (err) {
            console.error('Failed to delete note:', err);
            toast.error("Failed to delete note");
        }
    };

    const handleCopyNote = async () => {
        try {
            await copyNote(id).unwrap();
            setOpenMenuId(null);
            toast.success("Note copied successfully!");
        } catch (err) {
            console.error('Failed to copy note:', err);
            toast.error("Failed to copy note");
        }
    }
    return (
        <div className="card previewNota glass-card shadow rounded p-3 mb-3 d-flex flex-column"
            style={{ height: "100%", maxHeight: "300px" }}
            onClick={() => { setOpenMenuId(null); setPreviewNoteModal(id) }}>
            
            <div className="cardHeadingPreview d-flex justify-content-between align-items-center p-0 m-0 border-bottom">
                <h5 className="card-title">{titleTruncated}</h5>
                <div className="d-flex">
                    <div id="noteOption" className="rounded-2 border border-secondary p-2 mb-2 border-opacity-25" style={{ display: openMenuId === id ? "block" : "none" }}>
                        <div className="p-2 border-bottom border-secondary p-2 border-opacity-50" onClick={handleCopyNote}>Copy</div>
                        <div className="p-2 border-bottom border-secondary p-2 border-opacity-50" onClick={() => setEditingNoteId({ id, title, desc, tags, creation_date, last_update_date })}>Edit</div>
                        <div className="p-2" onClick={handleDeleteNote}>Delete</div>
                    </div>
                    <button className="btn p-0" onClick={openNoteMenu}>
                        <svg style={{ transform: openMenuId === id ? "rotate(90deg)" : "rotate(0)" }} xmlns="http://www.w3.org/2000/svg" id="noteMenu" fill="currentColor" className="bi bi-three-dots p-0 m-0" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="d-flex flex-column flex-grow-1 p-1 mt-1 noteStuff">
                <div className="row pt-1 mb-2" style={{ maxHeight: "40px", overflowY: "auto" }}>
                    {
                        tags.map((tag, index) => (
                            <h6 key={index} className="tagStyle card-subtitle rounded mb-2 ms-2 p-1 text-muted">{tag}</h6>
                        ))
                    }
                </div>
                <p id="textpreview" className="card-text">{truncated}</p>
                <div className="mt-auto mb-2">
                    <h6 className="card-subtitle mb-2 text-muted">
                        Created on date: {formattedCreationDate}
                    </h6>
                    <h6 className="card-subtitle text-muted">
                        Last modified on date: {formattedUpdatedDate}
                    </h6>
                </div>

            </div>
        </div>
    );
}
export default NotePreviewCard;