import { useGetAllNotesQuery } from "../../redux/notes/notesApiSlice.js";
import { useGetEventsQuery } from "../../redux/calendar/eventsApiSlice";
import { useGetActQuery } from "../../redux/calendar/actApiSlice";
import "../NotesComponents/NotesList.css";
import './Review.css';


const Review = () => {
  const { data: notesData, isLoading: loadingNotes, error: errorNotes } = useGetAllNotesQuery(undefined, { refetchOnMountOrArgChange: true });
  const { data: eventsData, isLoading: loadingEvents, error: errorEvents } = useGetEventsQuery(undefined, { refetchOnMountOrArgChange: true });
  const { data: actData, isLoading: loadingActs, error: errorActs } = useGetActQuery(undefined, { refetchOnMountOrArgChange: true });

  const allDone = !loadingNotes && !loadingEvents && !loadingActs;
  const notesCount = notesData?.notes?.length ?? 0;
  const eventsCount = Array.isArray(eventsData) ? eventsData.length : 0;
  const actsCount = Array.isArray(actData) ? actData.length : 0;

  return (
    <div className='review'>
      <h2> Review </h2>
      <div className='container'>
        <div className='row'>

          {/* colonna di sinistra */}
          <div className='col-6'>
            <div className='review__box events-counter'>
              <span className='circle-design' id='ev-1'></span>
              <span className='circle-design' id='ev-2'></span>
              <i className='bx-sm bx-calendar-alt review__icons' ></i>
              <h6> {eventsCount}</h6>
              <p>Events Scheduled</p>
            </div>
          </div>

          {/* colonna di destra */}
          <div className='col-6'>
            <div className='row mb-2'>
              <div className='review__box notes-counter'>
                <span className='circle-design' id='not-1'></span>
                <span className='circle-design' id='not-2'></span>
                <i className='bx  bx-pencil-draw review__icons'  ></i>
                <h6> {notesCount}</h6>
                <p>Notes created</p>
              </div>
            </div>
            <div className='row mt-2'>
              <div className='review__box acts-counter'>
                <span className='circle-design' id='acts-1'></span>
                <span className='circle-design' id='acts-2'></span>
                <i className='bx  bx-browser-activity review__icons'></i>
                <h6>{actsCount}</h6>
                <p>Activity in program</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Review;

