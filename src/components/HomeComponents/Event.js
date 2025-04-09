import React, { Component } from 'react';
import './Event.css';

class Event extends Component {
  render() {
    return (
      <div className='col-11 d-flex justify-content-center align-item-center'>
        <div className='event'>
          <div className='container-fluid p-2'>
            <div className='row'>
              <div className='col-2 d-flex justify-content-start'>
                <button onClick={() => this.props.onDelete(this.props.events.id)} className='done' />
              </div>
              <div className='col-10 justify-content-center align-item-center'>
                <div className='event-data'>
                  <div className='text'>
                    <p className='event-description'> {this.props.events.description} </p>
                  </div>
                  <div className='time'>
                    <p > {this.props.events.time} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    );
  }

}

export default Event;
