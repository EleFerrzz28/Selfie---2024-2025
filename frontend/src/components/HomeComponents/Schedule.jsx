import React, { useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import Event from './Event';
import './Schedule.css';


const Schedule = () => {
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const [collapsed, setCollapsed] = useState(true);

  const [events, setEvents] = useState([
    { id: 0, title: "title1", description: "university lessons", time: "9:00-10:00" },
    { id: 1, title: "title3", description: "snack", time: "10:00 - 10:30" },
    { id: 2, title: "title più lungo", description: "fare delle cose a caso lunghe così vedo se funziona lo scroll. Dare da mangiare al criceto che non ho, nutrire i gatti che tutte e tre abbiamo, assistere alla nascita dei pulcini, disegnare fanart edomidali e pitone programmatore e austin", time: "14:00", update: "last week" },
    { id: 3, title: "non ho piu idee", description: "go to the mall", time: "15:00", update: "yesterday" },
    { id: 4, title: "Edo Midali>>", description: "lunch with some friends", time: "15:00-16:00", update: "last week" },
    { id: 5, title: "Sara Toma >>", description: "sigma", time: "20:00", update: "last week" },
  ]);

  const handleDelete = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    isDesktop ? (
      <div className='schedule-desktop container-fluid w-100 mt-lg-3'>
        <div className="d-flex plans-filter border-bottom justify-content-between align-items-center mb-2 pb-1 gap-2">
          <h4 className="ps-1">Schedule</h4>
          <div className='buttons-container d-flex justify-content-center align-items-center'>
            <div className="dropdown-center">
              <button className="schedule-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fillRule="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
                  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                </svg>
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">university</a></li>
                <li><a className="dropdown-item" href="#">free time </a></li>
                <li><a className="dropdown-item" href="#">sport </a></li>
              </ul>

            </div>


          </div>
        </div>
        <div className='events-container w-100 h-100'>
          {events.map(event => (
            <Event key={event.id} onDelete={handleDelete} events={event} />
          ))}
        </div>
      </div>)
      :
      (
        <div className='schedule-mobile container-fluid w-100 mt-4 rounded'>
          <div className="d-flex plans-filter border-bottom justify-content-between align-items-center mb-2 pb-1 gap-2">
            <h4 className="ps-1">What to do?</h4>
            <div className='d-flex align-items-center justify-content-between' style={{ width: '25%' }}>
              <div className='buttons-container  d-flex justify-content-center align-items-center'>
                <div className="dropdown-center">
                  <button className="schedule-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fillRule="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
                      <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                    </svg>
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">university</a></li>
                    <li><a className="dropdown-item" href="#">free time </a></li>
                    <li><a className="dropdown-item" href="#">sport </a></li>
                  </ul>

                </div>
                <button className='schedule-button' onClick={() => setCollapsed(!collapsed)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className={`bi bi-chevron-down ${collapsed ? 'collapsed-icon' : ''}`} viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                  </svg>
                </button>
              </div>



            </div>

          </div>
          <div className={`events-container w-100 ${collapsed ? 'd-none h-0' : ''}`}>
            {events.map(event => (
              <Event key={event.id} onDelete={handleDelete} events={event} />
            ))}
          </div>
        </div>
      )
  );
};

export default Schedule;
