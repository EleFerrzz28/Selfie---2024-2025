import React, { Component, useState } from 'react';
import './UpcomingTasks.css';


const UpcomingTasks = () => {
    return (
        <div className='UpcomingTasks mt-4 ms-3'>
            <header className='tasks-header'>
                <p> Activities </p>
            </header>
            <div className='tasks-wrapper'>
               
                <div className='task d-flex align-items-center'>
                    <div className='task-icon d-flex justify-content-center align-items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-calendar-event" viewBox="0 0 16 16">
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                    </svg>
                    </div>
                    <div className='container d-flex ms-3 justify-content-around align-items-center'>
                    <div className='task-info'> Project </div>
                    <div className='task-info'> expiring date </div>
                    <div className='task-info'> state  </div>
                    </div>  
                </div>

                <div className='task d-flex align-items-center'>
                    <div className='task-icon d-flex justify-content-center align-items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-calendar-event" viewBox="0 0 16 16">
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                    </svg>
                    </div>
                    <div className='container d-flex ms-3 justify-content-around align-items-center'>
                    <div className='task-info'> Project </div>
                    <div className='task-info'> expiring date </div>
                    <div className='task-info'> state  </div>
                    </div>  
                </div>

                

            </div>

            
        </div>

    );
}



export default UpcomingTasks;

