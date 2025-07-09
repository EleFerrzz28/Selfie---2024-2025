import { useState } from 'react';
import './Charts.css';



const Chart = () => {
    const [percentage, SetPercentage] = useState(60);
    const circleWidth = 200;
    const radius = 85;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray- (dashArray * percentage) / 100;

    return (
        <div className='chart-card d-flex flex-column justify-content-center align-items-center'>
            <svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth}`} className='circle-chart p-2'>

            <defs> 
                <linearGradient id='gradient'>
                <stop offset="10%" stop-color="var(--herb)"/>
                <stop offset="50%" stop-color="var(--lightBlue)"/>
                <stop offset="100%" stop-color="var(--electricBlue)"/>
                </linearGradient>
            </defs>

                <circle
                    cx={circleWidth / 2}
                    cy={circleWidth / 2}
                    strokeWidth="30px"
                    r={radius}
                    className='circle-background' />

                <circle
                    cx={circleWidth / 2}
                    cy={circleWidth / 2}
                    strokeWidth="30px"
                    r={radius}
                    className='circle-progress'
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset
                    }}
                    transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
                    stroke='url(#gradient)'
                    />

                    <text 
                    x="50%" 
                    y="50%" 
                    dy="0.3rem" 
                    textAnchor='middle'
                    className='circle-text'
                    fill='url(#gradient)'
                    > 
                        {percentage}% 
                        </text>

                    <text 
                    x="50%" 
                    y="60%" 
                    dy="0.3rem" 
                    textAnchor='middle'
                    className='goal-text'
                    > 
                        Your goal 
                    </text>    

            </svg>
           

               

        </div>

    );
}



export default Chart;

/*
 <input
                type='range'
                min="1"
                max="100"
                value={percentage}
                onChange={(ev) => SetPercentage(ev.target.value)} />
*/


/*
fill='url(#gradient)'

*/


/*
 <div className='legenda d-flex flex-row justify-content-around mt-4 mb-2'>
                    <div className='your-goal d-flex'> 
                    <div className='circle-icon me-1' style={{backgroundColor: 'var(--lightBlue)'}}/>
                        <p className='legenda-text'> Your goal </p>
                    </div>
                    <div className='progression d-flex'>
                    <div className='circle-icon me-1' style={{backgroundColor: 'var(--midnight)'}}/>
                        <p className='legenda-text'> Progress </p>
                    </div>
                    
                </div>
*/


/* 

const Chart = () => {
    const [percentage, SetPercentage] = useState(35);
    const circleWidth = 200;
    const radius = 85;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray- (dashArray * percentage) / 100;

    return (
        <div className='chart-card d-flex flex-column justify-content-center align-items-center'>
            <svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth}`} className='circle-chart p-2'>

            <defs> 
                <linearGradient id='gradient'>
                <stop offset="10%" stop-color="var(--herb)"/>
                <stop offset="50%" stop-color="var(--lightBlue)"/>
                <stop offset="100%" stop-color="var(--electricBlue)"/>
                </linearGradient>
            </defs>

                <circle
                    cx={circleWidth / 2}
                    cy={circleWidth / 2}
                    strokeWidth="15px"
                    r={radius}
                    className='circle-background' />

                <circle
                    cx={circleWidth / 2}
                    cy={circleWidth / 2}
                    strokeWidth="15px"
                    r={radius}
                    className='circle-progress'
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset
                    }}
                    transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
                    stroke='url(#gradient)'
                    />

                    <text 
                    x="50%" 
                    y="50%" 
                    dy="0.3rem" 
                    textAnchor='middle'
                    className='circle-text'
                    fill='url(#gradient)'
                    > 
                        {percentage}% 
                        </text>

                    <text 
                    x="50%" 
                    y="60%" 
                    dy="0.3rem" 
                    textAnchor='middle'
                    className='goal-text'
                    > 
                        Your goal 
                    </text>    

            </svg>
           

               

        </div>

    );
}



export default Chart;
*/