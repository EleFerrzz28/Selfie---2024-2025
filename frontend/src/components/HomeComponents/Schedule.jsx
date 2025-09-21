// Schedule.jsx
import { useState, useRef } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';

import { useGetEventsQuery, useDeleteEventMutation } from '../../redux/calendar/eventsApiSlice.js';
import { useGetCatQuery } from '../../redux/calendar/catApiSlice.js';
import { DateTime } from 'luxon';
import { motion } from "framer-motion";

import Event from './Event';
import PopUp from './PopUp.jsx';

import './Schedule.css';


const fadeInAnimationVariants = {
  initial : {
    opacity:0,
    y:100,
  },
  animate: (id) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * id,
    }
  }),
}



const Schedule = () => {
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const [collapsed, setCollapsed] = useState(true);

  // oggi in formato yyyy-MM-dd (stringa)
  const today = DateTime.now().toFormat('yyyy-MM-dd');
  const todayDt = DateTime.fromISO(today).startOf('day');

  const { data: events = [], isLoading, isError } = useGetEventsQuery(today);
  const { data: categories = [] } = useGetCatQuery();

  // DELETE AN EVENT
  const [pendingDelete, setPendingDelete] = useState(null);
  const timerRef = useRef(null);

  const [deleteEvent] = useDeleteEventMutation();

  const handleDelete = (event) => {
    setPendingDelete(event);

    timerRef.current = setTimeout(async () => {
      try {
        
        await deleteEvent(event._id).unwrap();
        setPendingDelete(null);
      } catch (error) {
        console.error("Errore cancellazione:", error);
      }
    }, 5000); // 5 secondi
  };

  const handleUndo = () => {
    clearTimeout(timerRef.current);
    setPendingDelete(null);
  };

  // funzione helper: controlla se un evento "tocca" il giorno odierno
  const isEventOnToday = (ev) => {
    if (!ev) return false;
    // se manca day non lo consideriamo
    if (!ev.day) return false;

    const start = DateTime.fromISO(ev.day).startOf('day');
    const end = ev.endDay ? DateTime.fromISO(ev.endDay).startOf('day') : start;

    // evento che copre l'intervallo (inclusivo)
    if (start <= todayDt && todayDt <= end) return true;

    // gestione repeat
    if (ev.repeat) {
      const repeat = ev.repeat;
      // everyDay -> sempre
      if (repeat === 'everyDay') return true;

      // everyWeek -> serve weekDay (array di numeri 1..7)
      if (repeat === 'everyWeek' && Array.isArray(ev.weekDay) && ev.weekDay.length > 0) {
        // DateTime.weekday è 1 (lun) .. 7 (dom)
        if (ev.weekDay.includes(todayDt.weekday)) {
          // inoltre partire da start (non includere giorni precedenti al start)
          if (todayDt >= start) return true;
        }
      }

      // everyMonth -> confronto giorno del mese (es. every month on day 15)
      if (repeat === 'everyMonth') {
        if (todayDt.day === start.day && todayDt >= start) return true;
      }

      // everyYear -> confronto giorno+mese
      if (repeat === 'everyYear') {
        if (todayDt.day === start.day && todayDt.month === start.month && todayDt >= start) return true;
      }
    }

    return false;
  };

  // prima riduciamo la lista degli eventi a quelli che sono effettivamente per oggi
  const todaysEvents = Array.isArray(events)
    ? events.filter(isEventOnToday)
    : [];

  // ✅ Filtro categoria (applicato solo sugli eventi di oggi)
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredEvents =
    selectedCategory === "all"
      ? todaysEvents
      : todaysEvents.filter(ev => String(ev.category) === String(selectedCategory));

  // ✅ Ordinamento eventi per orario (estrae la parte iniziale "HH:MM" da "HH:MM-HH:MM" o simili)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const aStart = (a.time?.split("-")[0] || "").trim();
    const bStart = (b.time?.split("-")[0] || "").trim();

    // per sicurezza, se formato orario ISO (es "09:00") usiamo localeCompare,
    // altrimenti li consideriamo uguali
    return aStart.localeCompare(bStart);
  });

  // Dropdown di categorie (aggiungiamo "All")
  const renderCategoryDropdown = () => (
    <ul className="dropdown-menu">
      <li>
        <button
          className={`dropdown-item ${selectedCategory === "all" ? "active" : ""}`}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>
      </li>
      {categories.map(cat => (
        <li key={cat._id}>
          <button
            className={`dropdown-item ${selectedCategory === cat._id ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat._id)}
          >
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                backgroundColor: cat.color,
                borderRadius: "50%",
                marginRight: "8px"
              }}
            />
            {cat.name}
          </button>
        </li>
      ))}
    </ul>
  );


  return (
    <>
      {isDesktop ? (
        <>
           <div className="schedule__header border-bottom ">
            <h4>Schedule</h4>
              <button
                id="schedule__categories-button"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <i className='bx  bx-menu-filter bx-sm' ></i> 
              </button>
              {renderCategoryDropdown()}
            </div>  
</>
      ) : ( 
      <div className='schedule__header-mobile'>
        <h4 className="ps-1">What to do?</h4>
          <div className='d-flex align-items-center justify-content-between' style={{ width: '25%' }}>
            <div className='buttons-container d-flex justify-content-center align-items-center'>
              <button
                id="schedule__categories-button"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <i className='bx  bx-menu-filter bx-sm' ></i> 
              </button>
              {renderCategoryDropdown()}

              <button className='schedule-button' onClick={() => setCollapsed(!collapsed)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className={`bi bi-chevron-down ${collapsed ? 'collapsed-icon' : ''}`} viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </div>
          </div>

      </div>
      )}
        <div className='schedule'>     
           <PopUp
    pendingDelete={pendingDelete} 
    onUndo={handleUndo} 
  />
        
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error loading events</p>
          ) : 
          sortedEvents.length > 0 ? (
            sortedEvents.map((event, idx) => (
              <motion.div 
              key={event._id}
              className='event__animation'
              variants={fadeInAnimationVariants}
              initial='initial'
              whileInView='animate'
              viewport={{
                once: true,
              }}
              custom={idx}
              >
              <Event 
              key={event._id} 
              events={event} 
              onDelete={handleDelete}  
              />
              </motion.div>
            ))
          ) : (
            <p> No events for this category.</p>
          )}
        </div>
</>
  );
};

export default Schedule;


/*

 isDesktop ? (
      <div className='schedule-desktop container-fluid mt-lg-3'>
        <div className="d-flex plans-filter border-bottom justify-content-between align-items-center mb-2 pb-1 gap-2">
          <h4 className="ps-1">Schedule</h4>
          <div className='buttons-container d-flex justify-content-center align-items-center'>
            <button className="schedule-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fillRule="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
              </svg>
            </button>
            {renderCategoryDropdown()}
          </div>
        </div>

        {pendingDelete && (
          <div className="undo-popup rounded d-flex justify-content-center align-items-center">
            <p>Evento "{pendingDelete.title}" cancellato <button onClick={handleUndo}>Annulla</button></p>
          </div>
        )}

        <div className='events-container w-100 h-100'>
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error loading events</p>
          ) : sortedEvents.length > 0 ? (
            sortedEvents.map(event => (
              <Event key={event._id} events={event} onDelete={handleDelete} />
            ))
          ) : (
            <p>No events for this category.</p>
          )}
        </div>
      </div>
    ) : (
      <div className='schedule-mobile container-fluid mt-4 rounded'>
        <div className="d-flex plans-filter border-bottom justify-content-between align-items-center mb-2 pb-1 gap-2">
          <h4 className="ps-1">What to do?</h4>
          <div className='d-flex align-items-center justify-content-between' style={{ width: '25%' }}>
            <div className='buttons-container d-flex justify-content-center align-items-center'>
              <button className="schedule-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fillRule="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
                  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                </svg>
              </button>
              {renderCategoryDropdown()}

              <button className='schedule-button' onClick={() => setCollapsed(!collapsed)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className={`bi bi-chevron-down ${collapsed ? 'collapsed-icon' : ''}`} viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {pendingDelete && (
          <div className="undo-popup rounded d-flex justify-content-center align-items-center">
            <p>Evento "{pendingDelete.title}" cancellato <button onClick={handleUndo}>Annulla</button></p>
          </div>
        )}

        <div className={`events-container w-100 ${collapsed ? 'd-none h-0' : ''}`}>
          {isLoading ? (
            <p id='loading'>Loading...</p>
          ) : isError ? (
            <p>Error loading events</p>
          ) : sortedEvents.length > 0 ? (
            sortedEvents.map(event => (
              <Event key={event._id} events={event} onDelete={handleDelete} />
            ))
          ) : (
            <p>No events for this category.</p>
          )}
        </div>
      </div>
    )
*/