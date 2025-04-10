import "./NewNoteCard.css"
import TestualInput from "./TestualInput.jsx"
import useMediaQuery from "../../hooks/useMediaQuery.jsx"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { add } from "../../redux/notes/notesSlice.js"

function NewNoteCard() {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        tags: "",
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const newNote = {
            id: Date.now(),
            title: formData.title,
            desc: formData.desc,
            tags: formData.tags.split(",").map(tag => tag.trim()),
            date: new Date().toISOString().split('T')[0]
        };
        dispatch(add(newNote));
        setFormData({ title: "", desc: "", tags: "" })
    }

    const [isReady, setIsReady] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 960px)");

    useEffect(() => {
        // Quando il componente è montato, impostiamo isReady a true
        setIsReady(true);
    }, []);

    // Evitiamo il rendering finché isReady non è true
    if (!isReady) return null;

    return (
        <div className="shadow container-Note">
            <div className="card m-0 mt-2">
                <div className="cardHeading d-flex justify-content-between align-items-center pt-1 pb-1" style={{ borderBottom: "solid 1px rgb(192, 192, 192)" }}>
                    <h5 className="card-title px-3 pt-2 pb-1 mb-0"><strong>New Rapid Note</strong></h5>
                    <div className="d-flex fullNote rounded">
                        <button type="button" className="btn p-2 m-1 pb-1 ms-0"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-file-earmark-plus-fill" viewBox="-1 0 16 20">
                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0" />
                        </svg>
                            <span className="ms-2">Open Full Note</span>
                        </button>
                    </div>
                </div>
                <div className="card-body ps-3 mt-0">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
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
                            style={!isDesktop ? { minHeight: "80px", maxHeight: "200px", overflowY: "auto", resize: "none" } : {resize: "none"}}
                            placeholder="Add Note..."
                            className="form-control"
                            id="desc"
                            rows = {isDesktop ? "9" : undefined}
                            name="desc"
                            value={formData.desc}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    {/* <div className="mb-3">
                        <TestualInput></TestualInput>
                    </div> */}
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
                    <button
                        id="saveNote"
                        type="button"
                        className="btn"
                        onClick={handleSubmit}>
                        Save Note</button>
                </div>
            </div>
        </div>
    );
}

export default NewNoteCard;