import { useState} from "react";
import { useDeleteEventMutation, useGetEventsQuery, useEditEventMutation } from "../../redux/calendar/eventsApiSlice";
import { useDeletePomodoroMutation, useEditPomodoroMutation, useGetAllSessionQuery } from "../../redux/pomodoro/pomodoroApiSlice";
import "./EventModal.css"
import { ToastContainer, toast } from 'react-toastify';
import { DateTime } from "luxon";
import { useGetCatQuery } from "../../redux/calendar/catApiSlice";

function EventModal({activeDayEvents, activeDay, categoryMap, notifications}){
    const [eventToDelete, setEventToDelete] = useState(null);
    const [eventToUpdate, setEventToUpdate] = useState({});
    const [pomoToUpdate, setPomoToUpdate] = useState({});
    const [pomoToDelete, setPomoToDelete] = useState(null);
    
    const { refetch: refetchEvent } = useGetEventsQuery();
    const { refetch: refetchPomodoro } = useGetAllSessionQuery();
    const {data:catData=[]} = useGetCatQuery();
    const [deleteEvent] = useDeleteEventMutation();
    const [editEvent] = useEditEventMutation();
    const [deletePomodoro] = useDeletePomodoroMutation();
    const [editPomodoro] = useEditPomodoroMutation();

    const delEvents=async(id)=>{
        try {
            await deleteEvent(id).unwrap();
            toast.success("Event deleted successfully!");
            refetchEvent();
        } catch (err) {
            toast.error(err?.data?.message || "Failed to delete event.");
        }
    }

    const handleChangeEvent = (e) => {
        const { name, value } = e.target;
        setEventToUpdate(prev => ({ ...prev, [name]: value}));
    };

    const updateEvent = async() => {
        if (!eventToUpdate._id) {
        toast.error("Error: Missing event ID");
        return;
        }
        try {
            await editEvent(eventToUpdate).unwrap();
            toast.success("Event updated successfully!");
            refetchEvent();
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update the event.")
        }
    }

    const delPomo=async(id)=>{
        try {
            await deletePomodoro(id).unwrap();
            toast.success("Pomodoro deleted successfully!");
            refetchPomodoro();
        } catch (err) {
            toast.error(err?.data?.message || "Failed to delete Pomodoro.");
        }
    }

    const handleChangePomo = (e) => {
        const { name, value } = e.target;
        setPomoToUpdate(prev => ({ ...prev, [name]: value}));
    };

    const updatePomo = async() => {
        if (!pomoToUpdate._id) {
        toast.error("Error: Missing Pomodoro ID");
        return;
        }
        try {
            await editPomodoro(pomoToUpdate).unwrap();
            toast.success("Pomodoro updated successfully!");
            refetchPomodoro();
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update the Pomodoro.")
        }
    }
    return(
        <>
            <ToastContainer/>
            <div className="modal fade" id="staticBackdropEvents" data-bs-backdrop="static" aria-labelledby="staticBackdropLabel" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border">
                        <div className="modal-header border-0">
                            <div className="modal-title text-light">
                                {activeDay}
                            </div>
                            <div className="btn btn-close btn-close-white" data-bs-dismiss="modal"></div>
                        </div>
                        <div className='m-3 mt-1'>
                            <div className="list-group">
                                {activeDayEvents.map((event, _) => (
                                    <div key={event._id} className= {`list-group-item border-0 border-bottom p-3 ${event.type==="holiday" ? "holidaysDay": ""} ${event.type === "activity" ? "deadlineAct" : ""} ${event.type === "pomodoro" ? "pomodoroSession" : ""}`}>
                                        <div className="d-flex w-70  justify-content-between flex-wrap">
                                            <h5 className="event-title rounded mb-1 fs-6 text-uppercase">{event.title}</h5>
                                            {event.type === 'event' ?
                                                <>
                                                    <small className="button-modDel-event border p-1 rounded border-black m-1" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={()=>setEventToUpdate(event)}>modify</small>
                                                    <small className="button-modDel-event border p-1 rounded border-black m-1" data-bs-toggle="modal" data-bs-target="#deleteModal"  onClick={()=>setEventToDelete(event._id)}>delete</small>
                                                </> : 
                                                    event.type === "pomodoro" && event.planned ? 
                                                <>
                                                    <small className="button-modDel-event border p-1 rounded border-black m-1" data-bs-toggle="modal" data-bs-target="#updatePomoModal" onClick={()=>setPomoToUpdate(event)}>modify</small>
                                                    <small className="button-modDel-event border p-1 rounded border-black m-1" data-bs-toggle="modal" data-bs-target="#deletePomoModal"  onClick={()=>setPomoToDelete(event._id)}>delete</small>
                                                </> : ''
                                            }
                                        </div>
                                        <p className="mb-1">{event.description}</p>
                                        <small className={event.type==="event" ? "" : "d-none"}>
                                            Location: {event.location?.trim() ? event.location : "-"}<br />
                                            Time: {event.time ? event.time : "All day"}<br />
                                            Category: {categoryMap[event.category]?.name ?? "-"}<br/>
                                            End day:  {event.endDay?.trim() ? DateTime.fromISO(event.endDay).toFormat('yyyy-MM-dd') : "-"}
                                        </small>
                                        <small className={event.type==="activity" ? "" : "d-none"}>
                                            Category: {categoryMap[event.category]?.name ?? "-"}<br/>
                                        </small>
                                        <div className={event.type==="pomodoro" ? "" : "d-none"}>
                                            {event.planned ? 
                                            <small>
                                                Description: {event.description ? event.description : '-'}<br/>
                                                Scheduled production period: {event.prodPeriod / event.cycles} minutes.<br/>
                                                Scheduled break period: {event.breakPeriod} minutes.<br/>
                                                Scheduled long break period: {event.longBreakPeriod} minutes.<br/>
                                                Scheduled number of cycles: {event.cycles} {event.cycles === 1 ? "cycle." : "cycles."}<br/>
                                                {event.completed ? <small>Completato</small> : <small>Non completato</small>}<br/>                             
                                            </small>
                                            : <small>Production period: {event.prodPeriod} minutes.</small>
                                            }<br/>
                                        </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded text-light">
                        <div className="modal-body">
                            <p className="m-2">Are you sure you want to delete this event?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>delEvents(eventToDelete)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded">
                        <div className="modal-body text-light border border-white rounded">
                            <form id="modal-form" method="get" className='was-validated'>
                                <div>
                                    <div className="mb-3">
                                        <label htmlFor="titleEvent" className="form-label ">Title:</label>
                                        <input type="text" className="form-control" id="titleEvent" name="title" value={eventToUpdate.title ?? ""} onChange={handleChangeEvent} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="descEvent" className="form-label">Description</label>
                                        <textarea className="form-control" id="descEvent" rows="2" name='description' value={eventToUpdate.description ?? ""} onChange={handleChangeEvent}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="timeEvent" className="form-label">Time:</label>
                                        <input type="time" className="form-control" id="timeEvent" name="time" value={eventToUpdate.time ?? ""} onChange={handleChangeEvent} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="dayEvent" className="form-label">Day/Start day:</label>
                                        <input type="date" className="form-control" id="dayEvent" name="day" value={eventToUpdate.day ? DateTime.fromISO(eventToUpdate.day).toFormat('yyyy-MM-dd') : ''} onChange={handleChangeEvent} required/>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="endEvent" className="form-label">End day (if the event lasts several days):</label>
                                        <input type="date" className="form-control" id="endEvent" name="endDay" value={eventToUpdate.endDay ? DateTime.fromISO(eventToUpdate.endDay).toFormat('yyyy-MM-dd') : ''} onChange={handleChangeEvent}/> 
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="locEvent" className="form-label">Location:</label>
                                        <input type="text" className="form-control" id="locEvent" name="location" value={eventToUpdate.location ?? ""} onChange={handleChangeEvent}/>
                                    </div>
                                    <div>
                                        <div className='mb-3'>
                                            <label htmlFor="catEvent" className="form-label">Category:</label>
                                            <select className="form-control" name="category" value={eventToUpdate.category ?? ""} onChange={handleChangeEvent} id="select">
                                                <option value="">Type to search...</option>
                                                {catData.map((cat)=>(
                                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={updateEvent}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="deletePomoModal" tabIndex="-1" aria-labelledby="deletePomoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded text-light border border-white rounded">
                        <div className="modal-body">
                            <p className="m-2">Are you sure you want to delete this pomodoro?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary buttonClose" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger buttonSave" data-bs-dismiss="modal" onClick={()=>delPomo(pomoToDelete)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="updatePomoModal" tabIndex="-1" aria-labelledby="updatePomoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border border-white rounded">
                        <div className="modal-body text-light">
                            <form id="modal-form" method="get" className='was-validated'>
                                <div>
                                    <div className="mb-3">
                                        <label htmlFor="descPomo" className="form-label">Description</label>
                                        <textarea className="form-control border-0 shadow-none" id="descPomo" rows="2" name='description' value={pomoToUpdate.description ?? ""} onChange={handleChangePomo}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="prod" className="form-label">Period of productivity: (min)</label>
                                        <input type="number" className="form-control border-0 shadow-none" id="prod" name="prodPeriod" value={pomoToUpdate.prodPeriod} onChange={handleChangePomo} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="break" className="form-label">Break: (min)</label>
                                        <input type="number" className="form-control border-0 shadow-none" id="break" name="breakPeriod" value={pomoToUpdate.breakPeriod} onChange={handleChangePomo} required/>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="longBreak" className="form-label">Long break: (min)</label>
                                        <input type="number" className="form-control border-0 shadow-none" id="longBreak" name="longBreakPeriod" value={pomoToUpdate.longBreakPeriod} onChange={handleChangePomo} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cycles" className="form-label">Cycles:</label>
                                        <input type="number" className="form-control border-0 shadow-none" id="cycles" name="cycles" value={pomoToUpdate.cycles} onChange={handleChangePomo} required/>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label' htmlFor="pomoDay">Day:</label><br/>
                                        <input id='pomoDay' className='border-0 shadow-none form-control' type='date' name='date' value={pomoToUpdate.date ? DateTime.fromISO(pomoToUpdate.date).toFormat('yyyy-MM-dd') : ''} onChange={handleChangePomo}/>
                                    </div>
                                    <div>
                                        <label htmlFor='notPomo' className='form-label'>Do you want to change notifications settings for this pomodoro?</label>
                                        {Object.keys(notifications).map((key)=>(
                                            <div key={key}>
                                                <div className="form-check pb-2">
                                                <input className="form-check-input shadow-none border-0 radio-event-form" type="radio" name="notificationsPomo" id={key} 
                                                    value= {key} checked={key === pomoToUpdate.notificationsPomo} onChange={handleChangePomo}/>
                                                    <label className="form-check-label text-white" htmlFor={key}>
                                                        {notifications[key]}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary buttonClose" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger buttonSave" data-bs-dismiss="modal" onClick={updatePomo}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default EventModal;