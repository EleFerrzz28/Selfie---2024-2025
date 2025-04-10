import { useState, useEffect } from 'react';
import './Clock.css';



function Clock() {
    const [time, setTime] = useState('');

    function formatTime(val) {
        if (val < 10) {
            return '0';
        } else {
            return '';
        }
    }

    useEffect(() => {
        const TimerID = setInterval(() => tick(), 1000)
        return function cleanup() {
            clearInterval(TimerID)
        }
    })

    function tick() {
        const d = new Date();
        const h = d.getHours();
        const m = d.getMinutes();


        setTime(formatTime(h) + h + ':' + formatTime(m) + m);
    }

    return (
        <div className='clock-container'>
            <div className='container-fluid '>
                <div className='row'>
                    <div className='col-12 d-flex flex-column justify-content-center align-items-center'>
                        <div className='clock'>
                            <div className='screen'>
                                <h1 className='current-time'> {time} </h1>
                            </div>
                        </div>
                        <h3 style={{color: 'var(--midnight)'}} className='day'> Monday, 01 April </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Clock;