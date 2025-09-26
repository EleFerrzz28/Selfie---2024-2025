import { useEffect } from "react";
import { useGetAllNotesQuery } from "../../redux/notes/notesApiSlice.js";
import { useGetEventsQuery } from "../../redux/calendar/eventsApiSlice";
import { useGetActQuery } from "../../redux/calendar/actApiSlice";
import { DateTime } from 'luxon';
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

  /*DA MODIFICARE CON TIME MACHINE */
  const todayISO = DateTime.local().toISODate(); // es. "2025-09-11"
  const todayEvents = Array.isArray(eventsData)
    ? eventsData.filter(ev => {
        if (!ev.day) return false;
        const eventDate = DateTime.fromISO(ev.day).toISODate();
        return eventDate === todayISO;
      }).length
    : 0;

    /*--------------------------------------------------- */


  return (
    <div className='review'>
      <h2> Review </h2>
      <div className='container'>
        <div className='row'>
          {/* colonna di sinistra */}
          <div className='col-6'>
            <div className='review__box events-counter'>
              <span className='circle-design'  id='ev-1'></span>
              <span className='circle-design'  id='ev-2'></span>
              <i className='bx-sm bx-calendar-alt review__icons' ></i> 
             <h6> {eventsCount}</h6>
               <p>Events Scheduled</p>
              </div> 

          </div>

          {/* colonna di destra */}
          <div className='col-6'> 
            <div className='row mb-2'>
              <div className='review__box notes-counter'>
              <span className='circle-design'  id='not-1'></span>
              <span className='circle-design'  id='not-2'></span>
              <i className='bx  bx-pencil-draw review__icons'  ></i> 
              <h6> {notesCount}</h6>
               <p>Notes created</p>
              </div> 
               </div>
            <div className='row mt-2'> 
              <div className='review__box acts-counter'>
              <span className='circle-design'  id='acts-1'></span>
              <span className='circle-design'  id='acts-2'></span>
                <i class='bx  bx-browser-activity review__icons'></i> 
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


/*
 
 <div className='container'>
        <div className='col-6'>
          <div className='review__item item-notesCounter'>
            <p className='review-description'>Created Notes </p>
            {loadingNotes ? (
              <p className='review-number'>...</p>
            ) : errorNotes ? (
              <p className='review-number'>Err </p>
            ) : (
              <p className='review-number'>{notesCount}</p>
            )}
          </div>

          <div className='review__item item-eventsToDo'>
            {loadingEvents ? (
              <p className='review-number'>...</p>
            ) : errorEvents ? (
              <p className='review-number'>Err</p>
            ) : (
              <p className='review-number'>{eventsCount}</p>
            )}
            <p className='review-description'>Events Scheduled</p>
          </div>
        </div>

        <div className='col-6'>
          <div className='review__item item-activities'>
            {loadingActs ? (
              <p className='review-number'>...</p>
            ) : errorActs ? (
              <p className='review-number'>Err</p>
            ) : (
              <p className='review-number'>{actsCount}</p>
            )}
            <p className='review-description'>Activities</p>
          </div>

          <div className='review__item item-activityScheduled'>
            {loadingEvents ? (
              <p className='review-number'>...</p>
            ) : errorEvents ? (
              <p className='review-number'>Err</p>
            ) : (
              <p className='review-number'>{todayEvents}</p>
            )}
            <p className='review-description'>Events Today</p>
          </div>
        </div>
      </div>
 
 */
