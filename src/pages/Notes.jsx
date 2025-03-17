import "./Notes.css"
import NewNoteCard from "../components/NewNoteCard.jsx"
import NotesList from "../components/NotesList.jsx"


function Notes (){
    return(
        <div className = "container-fluid justify-content-center">
            <div className = "row">
                <div className = "col-lg-5 col-12">
                    <NewNoteCard></NewNoteCard>
                </div>
                <div className = "col-lg-7 col-12">
                    <NotesList></NotesList>
                </div>
            </div>
        </div>
    );
}

export default Notes