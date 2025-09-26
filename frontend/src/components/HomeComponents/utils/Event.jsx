import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetCatQuery } from '../../../redux/calendar/catApiSlice';
import { DateTime } from 'luxon';
import { motion } from 'framer-motion';
import './Event.css';


const Event = ({ events, onDelete }) => {

  const result = useGetCatQuery();
  const categories = result.data !== undefined ? result.data : [];
  const category = categories.find(cat => cat._id === events.category);
  const [checked, setChecked] = useState(false);

  const maxTitleLenght = 29;
  



  const handleClick = (events) => {
    setChecked(true);
    const confermation = window.confirm(
      `Are you sure you want to delete the event "${events.title}" ?`
    );
    if (confermation) {
      onDelete(events);
    } else {
      setChecked(false);
    }
  };


  const truncateTitle = (title) =>
    title.length > maxTitleLenght ? 
    title.substr(0, maxTitleLenght) + "..."
      : title || "No title available";




  return (
    <motion.div
      className={`event__box`}
      initial={{ opacity: 1 }}
      transition={{
        delay: 0.7,
        duration: 0.6,
        ease: 'easeInOut'
      }}
      animate={{ opacity: checked ? 0 : 1 }}
    >
      <div className="event__header border-bottom">
        <div className='event__start-time'>
          <i className='bx bx-clock-4 bx-sm'></i>
          {events.time?.split("-")[0] || "All day"}
        </div>
        <motion.button
          className="animated-check"
          style={{
            background: 'none',
            border: `${category ? category.color : 'var(--bs-light)'} solid 3px`,
            width: '1.6rem',
            height: '1.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            borderRadius: '50%',
            padding: 0,
          }}
          onClick={() => handleClick(events)}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width='21'
            height='21'
            viewBox="0 0 16 16"
            style={{ position: 'absolute' }}
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: checked ? 1 : 0,
                opacity: checked ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
                type: 'tween',
                ease: 'easeInOut'
              }}

              d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.button>
      </div>
      <p className="event__title">{truncateTitle(events.title)}</p>
    </motion.div>

  );
};

export default Event;

