import "./NewNoteCard.css"
import TestualInput from "../components/TestualInput.jsx"

function NewNoteCard() {
    return (
        <div className="container-Note">
            <div className="card mt-2">
                <div className="cardHeading d-flex justify-content-between align-items-center p-1" style={{ borderBottom: "solid 1px rgb(192, 192, 192)" }}>
                    <h5 className="card-title px-3 pt-2 pb-1 mb-0">New Rapid Note</h5>
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
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="yourNote" className="form-label">Your Note</label>
                        <textarea placeholder="Add Note..." className="form-control" id="yourNote" name="yourNote" rows="5"></textarea>
                    </div>
                    {/* <div className="mb-3">
                        <TestualInput></TestualInput>
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="tags" className="form-label">Tags</label>
                        <input type="text" className="form-control" id="tags" placeholder="Add Tags" />
                    </div>
                    <button id="saveNote" type="button" className="btn">Save Note</button>
                </div>
            </div>
        </div>
    );
}

export default NewNoteCard;