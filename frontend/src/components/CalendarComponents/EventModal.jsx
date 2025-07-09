import { useState} from "react";
import { useDeleteEventMutation, useGetEventsQuery, useEditEventMutation } from "../../redux/features/calendar/eventsApiSlice";
import "./EventModal.css"
import { ToastContainer, toast } from 'react-toastify';
import { DateTime } from "luxon";

function EventModal({activeDayEvents, activeDay}){
    const [eventToDelete, setEventToDelete] = useState(null);
    const [eventToUpdate, setEventToUpdate] = useState({});
    
    const { refetch } = useGetEventsQuery();
    const [deleteEvent] = useDeleteEventMutation();
    const [editEvent] = useEditEventMutation();

    const delEvents=async(id)=>{
        try {
            await deleteEvent(id).unwrap();
            toast.success("Event deleted successfully!");
            refetch();
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
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update the event.")
        }
    }
    return(
        <>
            <ToastContainer/>
            <div className="modal fade" id="staticBackdropEvents" data-bs-backdrop="static" aria-labelledby="staticBackdropLabel" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered">
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
                                    <div key={event._id} className= {`list-group-item border-0 border-bottom p-3 ${event.type==="holiday" ? "holidaysDay": ""} `}>
                                        <div className="d-flex w-70  justify-content-between">
                                            <h5 className="event-title rounded mb-1 fs-6 text-uppercase">{event.title}</h5>
                                            <small className="button-modDel-event" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={()=>setEventToUpdate(event)}>modifica</small>
                                            <small className="button-modDel-event" data-bs-toggle="modal" data-bs-target="#deleteModal"  onClick={()=>setEventToDelete(event._id)}>elimina</small>
                                        </div>
                                        <p className="mb-1">{event.description}</p>
                                        <small>
                                            Location: {event.location?.trim() ? event.location : "-"}<br />
                                            Time: {event.time}<br />
                                            Category: {event.category?.trim() ? event.category : "-"}
                                        </small>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-white rounded">
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
                        <div className="modal-body">
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
                                        <label htmlFor="dayEvent" className="form-label">Day:</label>
                                        <input type="date" className="form-control" id="dayEvent" name="day" value={eventToUpdate.day ? DateTime.fromISO(eventToUpdate.day).toFormat('yyyy-MM-dd') : ''} onChange={handleChangeEvent} required/>
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
                                                <option value="Lunch">Lunch</option>
                                                <option value="Dinner">Dinner</option>
                                                <option value="Work">Work</option>
                                                <option value="Education">Education</option>
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
        </>
    );
}
export default EventModal;