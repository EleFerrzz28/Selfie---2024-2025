import "./NewNoteCard.css"

function NewNoteCard() {
    return (
        <div className="container-Note">
            <div className="card mt-2">
                <h5 className="card-title px-3 pt-3 pb-0 mb-0"><svg id="noteSvg" xmlns="http://www.w3.org/2000/svg" width="4vmin" height="4vmin" fill="currentColor" className="bi bi-stickies-fill" viewBox="0 0 16 16">
                    <path d="M0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5A1.5 1.5 0 0 0 0 1.5" />
                    <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177z" />
                </svg>New Rapid Note</h5>
                <hr></hr>
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
                        <textarea placeholder="Add Note..." className="form-control" id="yourNote" rows="5"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tags" className="form-label"><svg xmlns="http://www.w3.org/2000/svg" width="3vmin" height="4vmin" fill="currentColor" className="bi bi-tags-fill" viewBox="0 0 16 16">
                            <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                            <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z" />
                        </svg> Tags</label>
                        <input type="text" className="form-control" id="tags" placeholder="Add Tags" />
                    </div>
                    <div id="buttonGroup">
                        <button id = "saveNote" type="button" className="btn"><svg id="saveIcon" xmlns="http://www.w3.org/2000/svg" width="3vmin" height="3vmin" fill="currentColor" className="bi bi-floppy-fill" viewBox="0 0 16 16">
                            <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
                            <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
                        </svg> Save Note</button>
                        <button id = "fullNote" type="button" className="btn">Open Full Note</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewNoteCard;