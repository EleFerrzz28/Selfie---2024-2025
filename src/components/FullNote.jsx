import "./FullNote.css"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

function FullNote() {
    const { noteID } = useParams();

    const notes = useSelector((state) =>
        state.notes.value.filter((note) => note.id == noteID)
    );

    const [formData, setFormData] = useState({
        title: notes[0].title,
        desc: notes[0].desc,
        tags: notes[0].tags,
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === "tags"
                ? value.split(",").map((tag) => tag.trim())
                : value
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-7 p-2 m-0">
                    <div className="card w-100 shadow fullNoteCard" style={{ height: "97vh" }}>
                        <div className="card-body">
                            <div className="cardHeading d-flex justify-content-between align-items-center p-1" style={{ borderBottom: "solid 1px rgb(192, 192, 192)" }}>
                                <h5 className="card-title">Full Note</h5>
                                <button id="closeNote" className="d-flex btn p-0 m-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-circle m-0" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </button>
                            </div>
                            <div className="editNoteContainer mt-1">
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
                            <button
                                type="button"
                                className="btn saveNote w-100"
                            >
                                Save Note</button>

                        </div>
                    </div>
                </div>
                <div className="col-lg-5 p-2 ps-1 m-0">
                    <div className="card w-100 shadow" style={{ height: "97vh" }}>
                        <div className="card-body">
                            <div className="cardHeading d-flex justify-content-between align-items-center p-1" style={{ borderBottom: "solid 1px rgb(192, 192, 192)" }}>
                                <h5 className="card-title">Preview</h5>
                            </div>
                            <div className="card rounded p-2 mt-2" style={{ height: "80vh" }}>
                                <h5 className="card-title ps-1" style={{ fontSize: "medium" }}>{formData.title}</h5>
                                <div className="row ps-1">
                                    {
                                        formData.tags.map((tag) => (
                                            <h6 id="tagStyle" className="card-subtitle rounded mb-2 ms-2 p-1 text-muted">{tag}</h6>
                                        ))
                                    }
                                </div>
                                <p className="card-text ps-1" style={{ overflow: "auto" }}>{formData.desc}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FullNote;