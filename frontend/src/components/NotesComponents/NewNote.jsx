import "./NewNote.css"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import "./NotePreviewCard.css"
import "./CloseNoteModal.jsx"
import CloseNoteModal from "./CloseNoteModal.jsx";
import { AnimatePresence } from "framer-motion";
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { useEditNoteMutation, useCreateNoteMutation } from "../../redux/notes/notesApiSlice.js"
import { toast } from "react-toastify";

function NewNote({ mode = "edit", note, onClose }) {
    const [openModal, setOpenModal] = useState(false)
    const [editNote, { isLoading, error }] = useEditNoteMutation();
    const [createNote, { isLoading2, error2 }] = useCreateNoteMutation();

    const notes = useSelector((state) => state.notes.value || []);
    const noteToEdit = mode === "edit" ? notes.find(n => n.id === note.id) : null;

    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        tags: [],
    })

    useEffect(() => {
        if (noteToEdit) {
            setFormData({
                title: noteToEdit.title,
                desc: noteToEdit.desc,
                tags: Array.isArray(noteToEdit.tags) ? note.tags : [],
            });
        }
    }, [noteToEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === "tags"
                ? value.split(",").map((tag) => tag.trim())
                : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.desc.trim()) {
            console.warn("Titolo e descrizione sono obbligatori.");
            return;
        }

        try {
            let result;

            if (mode === "edit") {
                result = await editNote({
                    noteId: noteToEdit.id,
                    title: formData.title,
                    desc: formData.desc,
                    tags: formData.tags
                }).unwrap();
                console.log("Note updated:", result);
                toast.success("Note updated successfully!");
            } else {
                result = await createNote({
                    title: formData.title,
                    desc: formData.desc,
                    tags: formData.tags
                }).unwrap();
                console.log("Note created:", result);
                toast.success("Note created successfully!");
            }

            setFormData({ title: "", desc: "", tags: [] });
            onClose();
        } catch (err) {
            console.error("Error submitting note:", err);
            toast.error("Ops! Something went wrong");
        }

    }

    return (
        <div className="container-fluid">
            <AnimatePresence>
                {openModal && (
                    <CloseNoteModal setOpenModal={setOpenModal} handleSubmit={handleSubmit} onClose={onClose} />
                )}
            </AnimatePresence>
            <div className="row">
                <div className="col-lg-7 p-2 m-0">
                    <div className="card w-100 shadow fullNoteCard border-0 mt-2" style={{ height: "97vh" }}>
                        <div className="card-body">
                            <div className="cardHeading d-flex justify-content-between align-items-center p-1" style={{ borderBottom: "solid 1px rgb(192, 192, 192)" }}>
                                <h5 className="card-title">New Note</h5>
                                <button id="closeNote" onClick={() => { setOpenModal(true) }} className="openaModal d-flex btn p-0 m-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-circle m-0" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </button>
                            </div>
                            <div className="editNoteContainer mt-1">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label ">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="New Note"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Your Note</label>
                                    <textarea
                                        style={{ resize: "none" }}
                                        placeholder="Add Note..."
                                        className="form-control"
                                        id="desc"
                                        rows="9"
                                        name="desc"
                                        value={formData.desc}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tags" className="form-label">Tags</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tags"
                                        name="tags"
                                        placeholder="Add Tags, comma separated"
                                        value={formData.tags}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <button type="button" className="btn saveNote w-100" onClick={handleSubmit}>Save Note</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 p-2 ps-1 m-0">
                    <div className="card w-100 shadow fullNoteCard border-0 mt-2" style={{ height: "97vh" }}>
                        <div className="card-body">
                            <div className="cardHeading d-flex justify-content-between align-items-center p-1" style={{ borderBottom: "solid 1px rgb(192, 192, 192)" }}>
                                <h5 className="card-title">Preview</h5>
                            </div>
                            <div className="card rounded p-2 mt-2" style={{ height: "80vh" }}>
                                <h5 className="card-title ps-1" style={{ fontSize: "medium" }}>{formData.title}</h5>
                                <div className="row ps-1">
                                    {formData.tags.map((tag, index) => (
                                        <h6 key={index} className="tagStyle card-subtitle rounded mb-2 ms-2 p-1 text-muted">{tag}</h6>
                                    ))}
                                </div>
                                <p className="card-text previewParagraph ps-1" style={{ overflow: "auto" }}><ReactMarkdown rehypePlugins={[rehypeHighlight]}>{formData.desc}</ReactMarkdown></p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NewNote;
