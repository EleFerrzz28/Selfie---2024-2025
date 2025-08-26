import "./NotePreviewCard.css";
import "./NewNote.css"
import { useCopyNoteMutation, usePinNoteMutation } from "../../redux/notes/notesApiSlice";
import { useEffect, useState } from "react";
import { toast, Bounce } from 'react-toastify';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks"

function NotePreviewCard({ id, title, desc, tags, creation_date, last_update_date, pinned, openMenuId, setOpenMenuId, setEditingNoteId, setPreviewNoteModal, setDeleteNoteModal }) {
    const [copyNote, { isLoading1 }] = useCopyNoteMutation();
    const [pinNote, { isLoading2 }] = usePinNoteMutation();
    const maxLength = 200;
    const truncated = desc ? (desc.length > maxLength ? desc.substr(0, maxLength) + "..." : desc) : "No text available";

    const maxTitleLength = 30;
    const titleTruncated = title ? (title.length > maxTitleLength ? title.substr(0, maxTitleLength) + "..." : title) : "No title available";

    const formattedCreationDate = new Intl.DateTimeFormat('en-US').format(new Date(creation_date));
    const formattedUpdatedDate = new Intl.DateTimeFormat('en-US').format(new Date(last_update_date));

    const [isPinned, setIsPinned] = useState(pinned);

    useEffect(() => {
        setIsPinned(pinned);
    }, [pinned]);

    const openNoteMenu = (e) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    }

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

    const handlePinNote = async () => {
        try {
            setIsPinned(prev => !prev);
            await pinNote({ noteId: id }).unwrap();
            isPinned ?
                toast('Note unpinned succesfully', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                }) : toast('Note pinned succesfully', {
                   position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
        } catch (err) {
            setIsPinned(pinned);
            toast.error("Error!");
        }
    };
    return (
        <div className="card previewNota glass-card shadow rounded p-3 m-1 d-flex flex-column"
            style={{ height: "100%", maxHeight: "300px" }}
            onClick={() => { setOpenMenuId(null); setDeleteNoteModal(null) }}>
            
            <div className="cardHeadingPreview d-flex justify-content-between align-items-center p-0 m-0 border-bottom">

                <button id="pinUnpin" className="btn btn-light" onClick={handlePinNote}>
                    {isPinned ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-angle-fill" viewBox="0 0 16 16">
                        <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-angle" viewBox="0 0 16 16">
                        <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146m.122 2.112v-.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a5 5 0 0 0-.288-.076 5 5 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a5 5 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034q.172.002.343-.04L9.927 2.028q-.042.172-.04.343a1.8 1.8 0 0 0 .062.46z" />
                    </svg>}</button>
                <h5 className="card-title">{titleTruncated}</h5>

                <div className="d-flex">
                    <div id="noteOption" className="rounded-2 border border-secondary p-2 mb-2 border-opacity-25" style={{ display: openMenuId === id ? "block" : "none" }}>
                        <div className="p-2 border-bottom border-secondary p-2 border-opacity-50" onClick={handleCopyNote}>Copy</div>
                        <div className="p-2 border-bottom border-secondary p-2 border-opacity-50" onClick={() => setEditingNoteId({ id, title, desc, tags, creation_date, last_update_date })}>Edit</div>
                        <div className="p-2" onClick={(e) => { e.stopPropagation(); setDeleteNoteModal(id) }}>Delete</div>
                    </div>
                    <button className="btn p-0" onClick={openNoteMenu}>
                        <svg style={{ transform: openMenuId === id ? "rotate(90deg)" : "rotate(0)" }} xmlns="http://www.w3.org/2000/svg" id="noteMenu" fill="currentColor" className="bi bi-three-dots p-0 m-0" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="d-flex flex-column flex-grow-1 p-1 mt-1 noteStuff">
                <div className="row pt-1 mb-1" style={{ maxHeight: "40px", overflowY: "auto" }}>
                    {
                        tags.map((tag, index) => (
                            <h6 key={index} className="tagStyle card-subtitle rounded mb-2 ms-2 p-1 text-muted">{tag}</h6>
                        ))
                    }
                </div>
                <div id="textpreview" className="card-text previewParagraph"><ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{truncated}</ReactMarkdown>
                    <div className="viewNote p-0 m-0" onClick={() => { setPreviewNoteModal(id) }}>see more...</div> </div>
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