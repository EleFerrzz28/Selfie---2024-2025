import "./NotesList.css";
import NotePreviewCard from "./NotePreviewCard.jsx"
import NewNote from "./NewNote.jsx"
import TagsModal from "./TagsModal.jsx";
import { AnimatePresence } from "framer-motion";

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setSortBy, setQuery } from "../../redux/notes/notesSlice.js";
import { selectFilteredSortedNotes } from "../../redux/notes/selectors.js";
import { useGetAllNotesQuery } from "../../redux/notes/notesApiSlice.js";


function NotesList() {
    const { mode } = useSelector((state) => state.theme);

    const [openMenuId, setOpenMenuId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [tagsSelected, setTagsSelected] = useState([]);
    const [isCreatingNote, setIsCreatingNote] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null);

    const dispatch = useDispatch();
    const { data: notesData, isLoading, error } = useGetAllNotesQuery();
    const allFilteredSortedNotes = useSelector(selectFilteredSortedNotes);

    const filteredNotes = tagsSelected.length === 0
        ? allFilteredSortedNotes
        : allFilteredSortedNotes.filter(note =>
            note.tags?.some(tag => tagsSelected.includes(tag))
        );


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error occurred</p>;

    return (
        <div className="noteListContainer ps-1 pe-1" data-theme={mode ? "dark" : "light"}
            style={{
                backgroundImage: 'linear-gradient(60deg, var(--sunrise), var(--darkPurple)',
                transition: 'background-color 0.25s ease-in-out',
                overflow: 'hidden'
            }}>
            {isCreatingNote || editingNoteId ? (
                <NewNote
                    mode={isCreatingNote ? "create" : "edit"}
                    note={editingNoteId}
                    onClose={() => {
                        setIsCreatingNote(false);
                        setEditingNoteId(null);
                    }}
                />
            ) : (
                <div className="card border shadow border-0 mt-2 blur-background">
                    <div className="cardHeading d-flex justify-content-between align-items-center pb-1 pt-1" style={{ borderBottom: "solid 1px rgb(192, 192, 192)" }}>
                        <h5 className="card-title px-3 pt-2 mb-0">All Notes</h5>
                        <div className="d-flex">
                            <button onClick={() => setIsCreatingNote(true)} className="noteListButtons newNoteMobile btn rounded me-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus headingIcon" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                </svg>
                            </button>
                            <button onClick={() => { setOpenModal(true) }} className="noteListButtons btn rounded me-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-filter headingIcon" viewBox="0 0 16 16">
                                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                                </svg>
                            </button>
                            <AnimatePresence>
                                {openModal && (
                                    <TagsModal setOpenModal={setOpenModal} tagsSelected={tagsSelected} setTagsSelected={setTagsSelected} />
                                )}
                            </AnimatePresence>
                            <form className="d-flex rounded searchNote me-1" role="search">
                                <input
                                    className="form-control h-100"
                                    onChange={e => dispatch(setQuery(e.target.value))}
                                    type="search"
                                    placeholder="Search Note..."
                                    aria-label="Search" />
                            </form>
                            <div className="dropdown me-1 noteListButtons rounded">
                                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-list-ul headingIcon" viewBox="0 0 16 16">
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
                        <div id="noteList" className="card-body p-1 ps-2 d-flex col flex-wrap justify-content-between align-items-center flex-row">
                            {filteredNotes.map((note) => (
                                <NotePreviewCard key={note.id}
                                    id={note.id}
                                    title={note.title}
                                    desc={note.desc}
                                    tags={note.tags}
                                    creation_date={note.creation_date}
                                    last_update_date={note.last_update_date}

                                    openMenuId={openMenuId}
                                    setOpenMenuId={setOpenMenuId}
                                    setEditingNoteId={setEditingNoteId}
                                />
                            ))}
                        </div>
                        <button type="button" onClick={() => setIsCreatingNote(true)} className="btn newNote">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                        </button>
                    </div>
                </div>)}
        </div>
    );
}

export default NotesList;