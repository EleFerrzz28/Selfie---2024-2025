import './Activity.css'
import { DateTime } from 'luxon';

function Activity({activities}){
    const actDate = Object.keys(activities);
    const act= Object.values(activities);
    return(
        <>
            <div id="actContainer overflow-scroll" className='mt-4 me-5'>
                <div className="flexbox">
                    <p>Welcome back!</p>
                    <div>{DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)} 
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-clock ms-2" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                        </svg>
                    </div>
                </div>
                <p>Next due dates:</p>
                <ol>
                    {act.map((actIt,actIndex)=>(
                    <div key={actIndex} >
                        {actIt}
                    </div>
                    ))}
                </ol>
            </div>
         </>
    );
   
}
export default Activity