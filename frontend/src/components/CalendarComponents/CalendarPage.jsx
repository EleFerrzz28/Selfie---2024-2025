import CalendarComponent from "./CalendarComponent"
import EventForm from "./EventForm"
import './CalendarPage.css'
import Activity from './Activity'
import { useState, useEffect } from "react"
import { useAddEventMutation, useGetEventsQuery } from "../../redux/features/calendar/eventsApiSlice" 
import { useAddActMutation, useGetActQuery } from "../../redux/features/calendar/actApiSlice"
import { ToastContainer,toast } from 'react-toastify';
import { DateTime } from "luxon"

function CalendarPage(){
    const [click, clicked]=useState(false);
    const [newEvent, setNewEvent] = useState({});
    const [newAct, setNewAct] = useState({});
    const [formType, changeFormType] = useState(0); // 0 = event, 1 = activity

    const { data: eventsData = [], refetch: refetchEvents  } = useGetEventsQuery();
    const { data: actData = [], refetch: refetchAct  } = useGetActQuery();

    const [addEvent] = useAddEventMutation();
    const [addAct] = useAddActMutation();
    
    // Convert events array in format { "YYYY-MM-DD": [title1, title2, ...] }
    const events = eventsData.reduce((acc, event) => {
        const date = DateTime.fromISO(event.day).toFormat("yyyy-MM-dd");
        if (!acc[date]) acc[date] = [];
        acc[date].push({
            _id: event._id,
            type: 'event',
            title: event.title,
            description: event.description,
            time: event.time,
            location: event.location,
            category: event.category,
            day: event.day,
        });
        return acc;
    }, {});

    const activities = actData.reduce((acc, activity) => {
        const deadline = DateTime.fromISO(activity.deadline).toFormat("yyyy-MM-dd");
        if (!acc[deadline]) acc[deadline] = [];
        acc[deadline].push({
            _id: activity._id,
            type: 'activity',
            title: activity.title,
            description: activity.description,
            deadline: activity.deadline,
            category: activity.category
        });
        return acc;
    }, {});

    const saveChanges = async (e) => {
        e.preventDefault();
        try {
            if (formType === 0) {
                await addEvent(newEvent).unwrap();
                //dispatch(setCredentials({ ...res }));
                toast.success("Event added successfully!");
                refetchEvents();
            } else if (formType === 1) {
                await addAct(newAct).unwrap();
                toast.success("Activity added successfully!");
                refetchAct();
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const normalizeEvents = (rawEvents) => {
    const normalized = {};
    Object.entries(rawEvents).forEach(([key, val]) => {
        const isoKey = DateTime.fromISO(key).toISODate();
        normalized[isoKey] = val;
    });
    return normalized;
    };
/*
    useEffect(() => {
        const handleModalClose = () => {setNewEvent({}); setNewAct({})}

        const modal = document.getElementById('exampleModal');
        modal?.addEventListener('hidden.bs.modal', handleModalClose);
        //hidden.bs.modal → bootstrap event that signals the closure of the modal
    }, []);*/
    return(
        <>
            <ToastContainer/>
            <div className="body container-fluid p-3">
                <div className="row" style={{alignItems:"center"}}>
                    <div className="col-12 col-lg-8">
                        <CalendarComponent events={normalizeEvents(events)}></CalendarComponent>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="row">
                            <Activity activities={activities}></Activity>
                            <div>
                                <div>
                                    <div onClick={() => clicked(true)} id="button-add-event-act" type="button" className={`mt-3 d-flex tooltip-element ${click ? "animation" : ""}`} data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                            <span className="icon-button-add d-flex justify-content-center align-items-center">+</span>
                                            <div className="tooltip-element-text rounded">Add new events/activities</div>
                                        </div>
                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                                        aria-hidden="true">
                                        <div  className="modal-dialog modal-dialog-centered">
                                            <div  id="modal-window" className="modal-content border border-white text-white">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">New event/activity</h1>
                                                    <button onClick={() => clicked(false)} type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                <EventForm setNewEvent={setNewEvent} setNewAct={setNewAct} formType={formType} changeFormType={changeFormType}/>
                                                </div>
                                                <div className="modal-footer">
                                                    <button onClick={() => clicked(false)} type="button" className="buttonClose btn"
                                                        data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="buttonSave btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={saveChanges}>Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CalendarPage
    