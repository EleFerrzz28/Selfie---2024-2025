import React from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import './NoteCard.css';
import "../NotesComponents/NewNote.css"
import { useGetLastUpdatedNoteQuery } from '../../redux/notes/notesApiSlice';

const NoteCard = () => {
  const { data: lastNote, isLoading, error } = useGetLastUpdatedNoteQuery(undefined, { refetchOnMountOrArgChange: true });

  if (isLoading) return <div class="card-body d-flex justify-content-around align-items-center p-1">
    <div className="spinner-border" role="status" />
    <h5 className="card-title mt-1" style={{
      fontFamily: '"Cal Sans", sans-serif',
      fontStyle: "normal",
      fontOpticalSizing: "auto",
    }}>Loading...</h5>
  </div>;
  if (!lastNote) return <h1>Nessuna nota trovata</h1>;
  if (error) return <h1>Errore nel caricamento</h1>;


  const maxLength = 200;
  const truncated = lastNote.desc ? (lastNote.desc.length > maxLength ? lastNote.desc.substr(0, maxLength) + "..." : lastNote.desc) : "No text available";

  const maxTitleLength = 20;
  const titleTruncated = lastNote.title ? (lastNote.title.length > maxTitleLength ? lastNote.title.substr(0, maxTitleLength) + "..." : lastNote.title) : "No title available";

  return (
    <div className='NoteCard-container m-lg-0 mt-4'>
      <header> Last Modified Note </header>
      <div className='note-card rounded d-flex flex-column justify-content-center p-3'>
        <svg xmlns="http://www.w3.org/2000/svg" className="note-icon bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z" />
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
        </svg>
        <div className='note-header  d-flex justify-content-between'>
          <h5 className='note-title '>{titleTruncated}</h5>
        </div>
        <div className='note-text previewParagraph mt-2 mb-2'>
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
            {truncated}</ReactMarkdown>
        </div>
        <div className='note-footer d-flex align-items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
          </svg>
          <h5 id='footer'>{lastNote.date}</h5>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;


/*
<div className='tags-container mb-3'>
          {
            lastNote.tags.map((tag, index) => (
              <h6
                key={index}
                className="tag card-subtitle rounded mb-2 me-2 p-1 text-muted">{tag}</h6>
            ))
          }
        </div>
*/