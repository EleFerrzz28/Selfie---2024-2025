import "./NotesList.css";
import NotePreviewCard from "../components/NotePreviewCard.jsx"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setSortBy, setQuery } from "../redux/notes/notesSlice.js";
import { selectFilteredSortedNotes } from "../redux/notes/selectors.js";


function NotesList() {
    const dispatch = useDispatch();
    const notes = useSelector(selectFilteredSortedNotes);

    const [openMenuId, setOpenMenuId] = useState(null);

    return (
        <div className="shadow noteListContainer">
            <div className="card mt-2">
                <div className="cardHeading d-flex justify-content-between align-items-center pb-1 pt-1" style={{ borderBottom: "solid 1px rgb(192, 192, 192)" }}>
                    <h5 className="card-title px-3 pt-2 mb-0"><strong>All Notes</strong></h5>
                    <div className="d-flex p-1">
                        <form className="pe-1 d-flex" role="search">
                            <input
                                className="searchNote form-control me-2"
                                onChange={e => dispatch(setQuery(e.target.value))}
                                type="search"
                                placeholder="Search Note..."
                                aria-label="Search" />
                        </form>
                        <div className="dropdown ms-1">
                            <button className="btn dropdown-toggle orderButton me-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" id="orderIcon" fill="currentColor" className="bi bi-list-ul" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                </svg>
                            </button>
                            <ul className="dropdown-menu">
                                <li><button className="dropdown-item" onClick={() => dispatch(setSortBy("alphabetical"))}>Alphabetical Order</button></li>
                                <li><button className="dropdown-item" onClick={() => dispatch(setSortBy("date"))}>Date Order</button></li>
                                <li><button className="dropdown-item" onClick={() => dispatch(setSortBy("length"))}>Length Order</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div data-spy="scroll" data-target="#noteList" data-offset="50">
                        <div id="noteList" className="card-body p-0 ps-2 pt-2">
                            {notes.map((note) => (
                                <NotePreviewCard key={note.id}
                                    id={note.id}
                                    title={note.title}
                                    desc={note.desc}
                                    tags={note.tags}
                                    date={note.date}

                                    openMenuId={openMenuId}
                                    setOpenMenuId={setOpenMenuId}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotesList;