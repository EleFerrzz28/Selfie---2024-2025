import { useDispatch } from "react-redux";
import "./NotePreviewCard.css";
import { deleteNote, copyNote } from "../redux/notes/notesSlice";
import { Link } from "react-router-dom";

function NotePreviewCard({ id, title, desc, tags, date, openMenuId, setOpenMenuId }) {
    const maxLength = 200;
    const truncated = desc ? (desc.length > maxLength ? desc.substr(0, maxLength) + "..." : desc) : "No description available";
    
    const openNoteMenu = (e)=>{
        e.stopPropagation(); 
        setOpenMenuId(openMenuId === id ? null : id);
    }

    const dispatch = useDispatch(); 
    
    return (
        <div className="card previewNota shadow rounded p-3 mb-3" onClick={() => setOpenMenuId(null)}>
            <div className="cardHeadingPreview d-flex justify-content-between align-items-center p-0 m-0">
                <h5 className="card-title">{title}</h5>
                <div className="d-flex">
                    <div id="noteOption" className = "rounded-2 border border-secondary p-2 mb-2 border-opacity-25" style = {{display : openMenuId === id? "block" : "none"}}>
                        <div className = "p-2 border-bottom border-secondary p-2 border-opacity-50" onClick = {() => dispatch(copyNote(id))}>Copy</div>
                        <div className = "p-2 border-bottom border-secondary p-2 border-opacity-50"><Link to={`/Notes/${id}`} id = "editNote">Edit</Link></div>
                        <div className = "p-2" onClick = {() => dispatch(deleteNote(id))}>Delete</div>
                    </div>
                    <button className="btn p-2" onClick = {openNoteMenu}>
                        <svg style = {{transform : openMenuId === id ? "rotate(90deg)" : "rotate(0)"}} xmlns="http://www.w3.org/2000/svg" id="noteMenu" fill="currentColor" className="bi bi-three-dots p-0 m-0" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="container-fluid p-1">
                <div className="row">
                    {
                        tags.map((tag) => (
                            <h6 id="tagStyle" className="card-subtitle rounded mb-2 ms-2 p-1 text-muted">{tag}</h6>
                        ))
                    }
                </div>
                <p className="card-text">{truncated}</p>
                <h6 className="card-subtitle mb-2 text-muted">Last modified on date: {date}</h6>
            </div>
        </div>
    );
}
export default NotePreviewCard;