import { useGetCatQuery } from '../../redux/calendar/catApiSlice';
import './Event.css';


const Event = ({ events, onDelete }) => {
  const { data: categories = [] } = useGetCatQuery();
  const category = categories.find(cat => cat._id === events.category);


  return (
    <div className="event__box">
      <div className="event__header border-bottom">
        <div className='event__start-time'>
          <i class='bx  bx-clock-4 bx-sm'  ></i>
          {events.time?.split("-")[0] || "All day"}
        </div>
        <button 
         onClick={() => onDelete(events)} 
          style={{
          backgroundColor: category ? category.color : "var(--bs-light)",
          border: "none"
        }}
          className='done' />
      </div>

      <div className="event__title">{events.title}</div>
    </div>

  );
};

export default Event;


/* <div className='card-wrapper mt-2 d-flex justify-content-center'>
      <div className='timeline-wrapper d-flex'>
        <div className='timeline m-0 me-lg-3 d-flex flex-column align-items-center'>
          <div className='event-start-time'> 
            {events.time?.split("-")[0] || "All day"} 
            </div>
          <div id='line' />
        </div>
      </div>
      <div className='event rounded mb-3 d-flex flex-column justify-content-start p-3'>
        <div className="d-flex event-header justify-content-between mb-2 pb-1 border-bottom">
          <h5 className='mb-0'>{events.title}</h5>
          <button onClick={() => onDelete(events)} 
          style={{
          backgroundColor: category ? category.color : "var(--bs-light)",
          border: "none"
        }}
          className='done' />
        </div>
        <div className='event-data'>
          <p className='event-description text mb-2 mt-2'>{events.description}</p>
          <div className='time'>
            <p className='mb-0'>{events.time}</p>
          </div>
        </div>
      </div>

    </div> */


   
    /*
    <button 
         onClick={() => onDelete(events)} 
          style={{
          backgroundColor: category ? category.color : "var(--bs-light)",
          border: "none"
        }}
          className='done' />
    */