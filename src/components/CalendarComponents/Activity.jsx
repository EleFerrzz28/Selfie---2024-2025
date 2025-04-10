import './Activity.css'
import { DateTime } from 'luxon';
import { useState } from 'react';

function Activity({activities}){
    const [slideAct, setSlideAct]=useState(0)

    const actDate = Object.keys(activities);
    const act= Object.values(activities);
    return(
        <>
            <div id="actContainer d-flex align-items-end" className='mt-3'>
                <div className="card bg-transparent border-0">
                    <div className="card-body">
                        <div>
                            {DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)}
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="var(--lightBlue)" className="bi bi-clock-fill ms-3" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                            </svg>
                        </div>
                        <p className='mt-4'>Welcome back Renato!</p>
                        <p className='fs-6'>Next due dates:</p>
                        {act.map((actIt,actIndex)=>(
                            <div key={actIndex} className={`${actIndex!==slideAct ? "d-none" : ""}`}>
                                <p className="card-title fw-bold text-uppercase pb-2 fs-5">
                                    {actIt}
                                </p>
                                {actDate.map((dateIt, dateIndex)=>(
                                    <p key={dateIndex} className={`fs-6 text-muted ${dateIndex!==actIndex ? "d-none" : ""}`}>Deadline: {dateIt}</p>
                                ))}
                                <p className="card-text fs-6">skibidi skibidi skibidi sibidi ncfukbjhvdbwlbfbffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</p>
                           </div>
                        ))}
                    </div>
                    <div id='changeSlideButtonsAct'>
                        {act.map((actIt, actIndex) => (
                            <input key={actIndex} type="radio" name="toggleAct" checked={actIndex==slideAct} onClick={()=>setSlideAct(actIndex)}/> 
                        ))}
                    </div>
                </div>
            </div>
         </>
    );
   
}
export default Activity