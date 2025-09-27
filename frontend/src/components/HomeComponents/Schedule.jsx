import { useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery.jsx';
import { useGetEventsQuery, useDeleteEventMutation } from '../../redux/calendar/eventsApiSlice.js';
import { useGetCatQuery } from '../../redux/calendar/catApiSlice.js';
import { DateTime } from 'luxon';
import { motion } from 'framer-motion';
import LoadingScreen from './utils/LoadingScreen.jsx';
import Event from './utils/Event';
import DropdownMenu from './utils/DropdownMenu';
import { useSelector } from 'react-redux';
import { ReactComponent as Restimage } from '../../assets/rest.svg';
import "../NotesComponents/NotesList.css";
import './Schedule.css';

/* Animazione per lo scroll */
const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (id) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * id,
    },
  }),
};

const Schedule = () => {

  const TM_date = useSelector((state) => state.time.value);
  const today = DateTime.fromISO(TM_date).toFormat('yyyy-MM-dd');
  const todayDt = DateTime.fromISO(today).startOf('day');


  /* controlla se un evento è odierno */
  const isEventOnToday = (event) => {
    if (!event) return false;
    const start = DateTime.fromISO(event.day).startOf('day');
    const end = event.endDay
      ? DateTime.fromISO(event.endDay).startOf('day')
      : start;

    if (start <= todayDt && todayDt <= end) return true;

    if (event.repeat) {
      const repeat = event.repeat;
      if (repeat === 'everyDay') return true;
      if (
        repeat === 'everyWeek' &&
        Array.isArray(event.weekDay) &&
        event.weekDay.length > 0
      ) {
        if (event.weekDay.includes(todayDt.weekday)) {
          if (todayDt >= start) return true;
        }
      }
      if (repeat === 'everyMonth') {
        if (todayDt.day === start.day && todayDt >= start) return true;
      }
      if (repeat === 'everyYear') {
        if (
          todayDt.day === start.day &&
          todayDt.month === start.month &&
          todayDt >= start
        )
          return true;
      }
    }
    return false;
  };


  const isDesktop = useMediaQuery('(min-width: 960px)');
  const [collapsed, setCollapsed] = useState(true);

  const QueryResult = useGetEventsQuery(today, { refetchOnMountOrArgChange: true });
  const events = QueryResult.data ?? [];
  const isLoading = QueryResult.isLoading;
  const isError = QueryResult.isError;

  const CatResult = useGetCatQuery();
  const categories = CatResult.data !== undefined ? CatResult.data : [];

  const [deleteEvent] = useDeleteEventMutation();

  const todaysEvents = Array.isArray(events)
    ? events.filter(isEventOnToday)
    : [];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredEvents =
    selectedCategory === 'all'
      ? todaysEvents
      : todaysEvents.filter(
        (event) => String(event.category) === String(selectedCategory)
      );


  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const aStart = (a.time?.split('-')[0] || '').trim();
    const bStart = (b.time?.split('-')[0] || '').trim();
    return aStart.localeCompare(bStart);
  });


  const handleDelete = async (event) => {
    try {
      await deleteEvent(event._id).unwrap();
    } catch (error) {
      console.error('Errore cancellazione:', error);
    }
  };



  return (
    <>
      {isDesktop ? 
      /* Visualizzazione desktop */
      (
        <div className="schedule__header border-bottom ">
          <h4>Schedule</h4>
          <button
            id="schedule__categories-button"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bx bx-menu-filter bx-md"></i>
          </button>

          <DropdownMenu
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

        </div>
      ) :

        /* Visualizzazione mobile */
        (
          <div className="schedule__header mt-2">
            <h4 className="ps-1">What's the plan?</h4>
            <div className="buttons_wrap">
              <button
                id="schedule__categories-button"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <i className="bx bx-menu-filter bx-md"></i>
              </button>
              <DropdownMenu
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <button
                className="button_IsCollapsed"
                onClick={() => setCollapsed(!collapsed)}>
                <i
                  className={` bx bx-chevron-down bx-md  ${collapsed ? 'collapsed-icon' : ''
                    }`}
                ></i>
              </button>
            </div>
          </div>
        )}
        
        {/* corpo principale */}
      <div className={`schedule ${collapsed && !isDesktop ? 'd-none h-0' : ''
          }`}>
        {isLoading ? (
          <LoadingScreen />
        ) : isError ? (
          <p style={{
            color: 'var(--white)',
            textAlign: 'center',
            fontWeight: '600',
            marginTop: '5rem'
          }}>
            Error loading events</p>
        ) : todaysEvents.length === 0 ? (
          <div className='no-events__design'>
            <h1> You're free today!
              <h3>Get some rest. </h3>
            </h1>
            <Restimage className='rest-image' />
          </div>
        ) : sortedEvents.length > 0 ? (
          sortedEvents.map((event, idx) => (
            <motion.div
              key={event._id}
              className="event__animation"
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={idx}
            >
              <Event key={event._id} events={event} onDelete={handleDelete} />
            </motion.div>
          ))
        ) : (
          <p id='no-cat'>No events for this category.</p>
        )}
      </div>
    </>
  );
};

export default Schedule;


