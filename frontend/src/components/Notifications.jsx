import { useState, useEffect } from 'react';
import './Notifications.css';
import { useUpdateNotificationsMutation } from '../redux/calendar/eventsApiSlice';
import { useUpdateNotificationActMutation } from '../redux/calendar/actApiSlice';
import { ToastContainer,toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultNotification } from '../redux/calendar/notificationReducer.js';

function Notifications({notifications}){
    const dispatch = useDispatch();
    const defaultNotification = useSelector(state => state.notification.defaultNotification);
    const [valueState, setValueState] = useState(defaultNotification);
    const [updateNotifications] = useUpdateNotificationsMutation();
    const [updateNotificationAct] = useUpdateNotificationActMutation();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await updateNotifications({
                notifications: valueState
            }).unwrap();
            await updateNotificationAct({
                notifications: valueState
            }).unwrap();
            dispatch(setDefaultNotification(valueState));
            toast.success('Settings updated successfully!');
        } catch(err) {
            toast.error(err?.data?.message || "Failed to update settings.");
        }
    }

    return(
        <>
            <ToastContainer></ToastContainer>
            <div id="notBG" className="rounded p-5 text-white border border-white">
                <h3 className="pb-4">Notifications settings <i className="bxr bx-bell-ring" style={{color:'#ffffff'}}/></h3>
                
                <form onSubmit={handleSubmit}>
                    {Object.keys(notifications).map((key)=>(
                        <div key={key}>
                            <div className="form-check pb-2">
                            <input className="form-check-input shadow-none border-0 radio-event-form" type="radio" name="notifications" id={key} 
                                value= {key} checked={valueState === key} onChange={(e)=>setValueState(e.target.value)}/>
                                <label className="form-check-label text-white" htmlFor={key}>
                                    {notifications[key]}
                                    {key === '5min' ? <p>(default value)</p> : ''}
                                </label>
                            </div>
                        </div>
                    ))}
                    <button type='submit' className='btn text-white border rounded m-2'>Save changes</button>
                </form>
                <p className='pt-4'>You will be able to change the settings for each specific event/activity.
                <br/>N.B.: You'll receive your notifications through e-mail.</p>
            </div>
        </>
    );
}

export default Notifications;