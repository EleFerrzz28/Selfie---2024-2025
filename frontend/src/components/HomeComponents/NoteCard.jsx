import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import { useGetLastUpdatedNoteQuery } from '../../redux/notes/notesApiSlice';
import "../NotesComponents/NotesList.css";
import "../NotesComponents/NewNote.css";
import './NoteCard.css';


const NoteCard = () => {
  const { data: lastNote, isLoading, error } = useGetLastUpdatedNoteQuery(undefined, { refetchOnMountOrArgChange: true });
  const maxLength = 200;
  const maxTitleLength = 20;


  let truncated =  "No text available" ;
  let titleTruncated = "No title available";
  let ISOdate = null;
  let edit_date = '-';


  
  if (lastNote) {
  truncated = lastNote.desc.length > maxLength ? lastNote.desc.substr(0, maxLength) + "..." : lastNote.desc;
  titleTruncated =lastNote.title.length > maxTitleLength ? lastNote.title.substr(0, maxTitleLength) + "..." : lastNote.title ;
   ISOdate = lastNote.last_update_date ?
   new Date(lastNote.last_update_date) : null;

   edit_date = ISOdate.toLocaleDateString("it-IT", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

  }







  return (
    <div className="notecard__container">
      <div className="header__box">
        <div className="last_modified"> Last edited
           <h3 id="note"> Note</h3>
        </div>
       <i className='bx  bx-clipboard-detail'  ></i> 
      </div>
      <div className="content__box">
        <span className="left__angle">
          <p id='note__time'>{edit_date}</p>
           </span>
        <div className="note__info">
          <h5>{titleTruncated}</h5>
          <div className='note__text previewParagraph text-muted'>
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
            {truncated}</ReactMarkdown>
        </div>
        </div>
      </div>

    </div>
  );
}

export default NoteCard;

