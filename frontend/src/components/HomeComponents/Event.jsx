import React, { Component } from 'react';
import './Event.css';

class Event extends Component {
  render() {
    return (
      <div className='card-wrapper w-100 mt-2 d-flex justify-content-around'> 

      <div className='timeline-wrapper m-0 d-flex'>
        <div className='timeline m-0 me-lg-3 h-100 d-flex flex-column align-items-center'> 
        <div className='event-start-time'> 09:00 </div>

          <div id='line'/>
        </div>
      </div>

      <div className='event rounded mb-3 d-flex flex-column justify-content-start p-3'>
        <div className="d-flex event-header justify-content-between mb-2 pb-1 gap-2 border-bottom">
          <h5 className=' mb-0'>{this.props.events.title}</h5>
          <button onClick={() => this.props.onDelete(this.props.events.id)} className='done'/>

        </div>
        <div className='event-data'>
          <p className='event-description text mb-2'>{this.props.events.description}</p>
          <div className='time'>
            <p className='mb-0'>{this.props.events.time}</p>
          </div>
        </div>
      </div>

      </div>
    );
  }

}

export default Event;