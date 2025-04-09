import React, { useState } from 'react';
import './CalendarCard.css';



const CalendarCard = () => {
  const [startDate, setStartDate] = useState(new Date());

  const nextTwoWeeks = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() + 14);
    setStartDate(newStartDate);
  };
  const prevTwoWeeks = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() - 14);
    setStartDate(newStartDate);
  };

  const renderCalendarWeeksDays = () => {
    const days = [];
    const currentDate = new Date(startDate);

    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    for (let i = 0; i < 7; i++) {
      days.push(
        <span className='day' key={i}>
          {weekday[currentDate.getDay()]}
        </span>
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  };


  const renderCalendarDaysNumbers = () => {
    const days = [];
    const currentDate = new Date(startDate);
    for (let i = 0; i < 14; i++) {
      if (i == 0) {
        days.push(
          <div key={i} className='current-day'>
            <div key={i}>
              {currentDate.getDate()}
            </div>
          </div>
        );
      } else days.push(
        <div key={i} className='days-box'>
          <div key={i}>
            {currentDate.getDate()}
          </div>
        </div>
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;

  };


  return (
    <div className='calendar-card mt-4' >
      <div className='heading' >
        <button className='button-ahead' onClick={prevTwoWeeks}>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="var(--midnight)" className="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
          </svg>
        </button>
        <h2 className='interval'>{`${startDate.toDateString()} - ${new Date(
          startDate.getTime() + 13 * 24 * 60 * 60 * 1000
        ).toDateString()}`}</h2>
        <button className='button-back' onClick={nextTwoWeeks}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="var(--midnight)" className="bi bi-chevron-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
</svg>
        </button>
      </div>
      <div className='structure'>
        <div className='row'>
          <div className='week-days'>{renderCalendarWeeksDays()}</div>
        </div>
        <div className='row'>
          <div className='days-container'>
            {renderCalendarDaysNumbers()}
          </div>
        </div>
      </div>
    </div>
  );
};



export default CalendarCard;