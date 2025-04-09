import React, { Component } from 'react';
import './WeatherApp.css';



class WeatherApp extends Component {
    render() {
        return (
            <div className='weather-app me-3'>
                <div className='container-fluid p-3'> 
                    <div className='row'>
                        <div className='col-5 d-flex justify-content-center align-items-center'>

                            <div className='weather-animation'>
                            <div className='weather-container'>
                                <div className='cloud cloud-front'>
                                    <span className='cloud-part cloud-left-front'> </span>
                                    <span className='cloud-part cloud-right-front'> </span>
                                </div>
                                <span className='sun sun-glow'> </span>
                                <span className='sun'> </span>
                                <div className='cloud cloud-back'>
                                <span className='cloud-part cloud-left-back'> </span>
                                <span className='cloud-part cloud-right-back'> </span>

                                </div>
                            </div>
                        </div>

                        </div>
                        <div className='col-7'> 
                            <div className='row h-100'>
                                <div className='col-12 d-flex justify-content-center align-items-center'>
                            <h4 className='degree'> 24°C </h4>
                            <div className='weather-data'> 
                            <p className='weather-description'> Sunny </p>
                            <p className='location'> Rome </p>
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

export default WeatherApp;
            