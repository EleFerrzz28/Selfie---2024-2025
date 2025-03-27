import "./NotesList.css";
import NotePreviewCard from "../components/NotePreviewCard.jsx"
import { useState, useEffect } from "react"

function NotesList({ notesList, setNotesList }) {
    const [query, setQuery] = useState("");
    const [openMenuId, setOpenMenuId] = useState(null);

    const filteredNotes = notesList.filter(note => {
        return (note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.desc.toLowerCase().includes(query.toLowerCase()) ||
            note.date.toLowerCase().includes(query.toLowerCase()) ||
            note.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        )
    })

    const alphabeticalOrder = () => {
        setNotesList([...notesList].sort((a, b) => {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
            return titleA.localeCompare(titleB);
        }));
    }
    const dateOrder = () => {
        setNotesList([...notesList].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        }));
    }
    const lengthOrder = () => {
        setNotesList([...notesList].sort((a, b) => {
            return b.desc.length - a.desc.length;
        }));
    }

    return (
        <div className="noteListContainer">
            <div className="card mt-2">
                <div className="cardHeading d-flex justify-content-between align-items-center p-1" style={{ borderBottom: "solid 1px rgb(192, 192, 192)" }}>
                    <h5 className="card-title px-3 pt-2 mb-0"><strong>All Notes</strong></h5>
                    <div className="d-flex p-1">
                        <form className="pe-1 d-flex" role="search">
                            <input
                                className="searchNote form-control me-2"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
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
                                <li><button className="dropdown-item" type="button" onClick={alphabeticalOrder}>Alphabetical Order</button></li>
                                <li><button className="dropdown-item" type="button" onClick={dateOrder}>Date Order</button></li>
                                <li><button className="dropdown-item" type="button" onClick={lengthOrder}>Length Order</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div data-spy="scroll" data-target="#noteList" data-offset="50">
                        <div id="noteList" className="card-body p-0 ps-2 pt-2">
                            {filteredNotes.map((note) => (
                                <div className="p-1">
                                    <NotePreviewCard
                                        id={note.id}
                                        title={note.title}
                                        desc={note.desc}
                                        tags={note.tags}
                                        date={note.date}
                                        notesList={notesList}
                                        setNotesList={setNotesList}
                                        openMenuId={openMenuId}
                                        setOpenMenuId={setOpenMenuId}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotesList;