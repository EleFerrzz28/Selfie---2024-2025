import React, { Component } from 'react';
import Event from './Event';
import chevronDown from '../../assets/chevron-down.svg'
import './Schedule.css';



class Schedule extends Component {
  state = {
    events: [
      { id: 0, description: "university lessons", time: "9:00-10:00" },
      { id: 1, description: "snack", time: "10:00 - 10:30" },
      { id: 2, description: "fare delle cose a caso lunghe così vedo se funziona lo scroll. Dare da mangiare al criceto che non ho", time: "14:00", update: "last week" },
      { id: 3, description: "go to the mall", time: "15:00", update: "yesterday" },
      { id: 4, description: "lunch with some friends", time: "15:00-16:00", update: "last week" },
      { id: 5, description: "sigma", time: "20:00", update: "last week" },

    ]
  }

  handleDelete = eventId => {
    const updatedEvents = this.state.events.filter(events => events.id !== eventId);
    this.setState({ events: updatedEvents }); // qua se dessi il nome events alla costante potrei scrivere soltanto this.setState({events})
  }

  render() {
    return (
      <div className='schedule mt-3'>
        <div className='container-fluid p-1'>
          <div className='row'>
            <div className='plans-filter mt-4 mb-4'>
              <h4> Today's timeline </h4>
              <div className='filter p-2'>
                All
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
            </div>


          </div>
          <div className='row'>
            <div className='events-container mb-5'>
              {
                this.state.events.map(events =>
                  <Event
                    key={events.id}
                    onDelete={this.handleDelete}
                    events={events} />
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Schedule;

