import './Review.css';
import { useGetAllNotesQuery } from "../../redux/notes/notesApiSlice.js";
import { useGetEventsQuery } from "../../redux/calendar/eventsApiSlice";
import { useGetActQuery } from "../../redux/calendar/actApiSlice";
import { DateTime } from 'luxon';

const Review = () => {
  // --- Recupero dati ---
  const { data: notesData, isLoading: loadingNotes, error: errorNotes } = useGetAllNotesQuery();
  const { data: eventsData, isLoading: loadingEvents, error: errorEvents } = useGetEventsQuery();
  const { data: actData, isLoading: loadingActs, error: errorActs } = useGetActQuery();

  // --- Calcoli ---
  const notesCount = notesData?.notes?.length ?? 0;
  const eventsCount = Array.isArray(eventsData) ? eventsData.length : 0;
  const actsCount = Array.isArray(actData) ? actData.length : 0;

  // 📌 Eventi solo per oggi
  const todayISO = DateTime.local().toISODate(); // es. "2025-09-11"
  const todayEvents = Array.isArray(eventsData)
    ? eventsData.filter(ev => {
        if (!ev.day) return false;
        const eventDate = DateTime.fromISO(ev.day).toISODate();
        return eventDate === todayISO;
      }).length
    : 0;

  return (
    <div className='review m-lg-0 m-md-0 mt-2'>
      <header>Monthly Review</header>

      <div className='container d-flex m-0'>
        {/* Colonna sinistra */}
        <div className='col-6 d-flex flex-column justify-content-center align-items-center m-0'>
          {/* Box NOTE */}
          <div className='box-eventsDone'>
            {loadingNotes ? (
              <p className='review-number'>...</p>
            ) : errorNotes ? (
              <p className='review-number text-danger'>Err</p>
            ) : (
              <p className='review-number'>{notesCount}</p>
            )}
            <p className='review-description'>Notes Created</p>
          </div>

          {/* Box EVENTI TOTALI */}
          <div className='box-eventsToDo'>
            {loadingEvents ? (
              <p className='review-number'>...</p>
            ) : errorEvents ? (
              <p className='review-number text-danger'>Err</p>
            ) : (
              <p className='review-number'>{eventsCount}</p>
            )}
            <p className='review-description'>Events Scheduled</p>
          </div>
        </div>

        {/* Colonna destra */}
        <div className='col-6 flex-column d-flex justify-content-center align-items-center m-0'>
          {/* Box ATTIVITÀ */}
          <div className='box-activityInProgress'>
            {loadingActs ? (
              <p className='review-number'>...</p>
            ) : errorActs ? (
              <p className='review-number text-danger'>Err</p>
            ) : (
              <p className='review-number'>{actsCount}</p>
            )}
            <p className='review-description'>Activities</p>
          </div>

          {/* Box EVENTI DI OGGI */}
          <div className='box-activityScheduled'>
            {loadingEvents ? (
              <p className='review-number'>...</p>
            ) : errorEvents ? (
              <p className='review-number text-danger'>Err</p>
            ) : (
              <p className='review-number'>{todayEvents}</p>
            )}
            <p className='review-description'>Events Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
