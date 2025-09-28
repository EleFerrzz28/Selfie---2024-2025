import Notifications from "../components/Notifications";
import {NavLink} from 'react-router-dom'

function NotificationsPage(){
    const notifications = { 
        'oneDay':'1 day earlier, 4 times.', 
        'oneHour':'1 hour earlier, 3 times.', 
        '30min':'30 minutes earlier, 2 times.', 
        '15min':'15 minutes earlier.', 
        '5min':'5 minutes earlier.' 
    };

    return(
        <>
            <NavLink to={'/Home'}>
                <button className='btn m-4 fs-5 text-white position-absolute'>
                    <span>&lt;</span> Back
                </button>
            </NavLink>
            <div className='h-100 d-flex justify-content-center align-items-center'>
                <Notifications notifications={notifications}></Notifications> 
            </div>
        </>
        
    );
}

export default NotificationsPage;