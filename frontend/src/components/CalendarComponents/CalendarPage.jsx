import CalendarComponent from "./CalendarComponent"
import EventForm from "./EventForm"
import './CalendarPage.css'
import Activity from './Activity'
import { useState, useEffect } from "react"
import { useAddEventMutation, useGetEventsQuery } from "../../redux/calendar/eventsApiSlice"
import { useAddActMutation, useGetActQuery } from "../../redux/calendar/actApiSlice"
import { ToastContainer, toast } from 'react-toastify';
import { DateTime, Interval, Settings } from "luxon"
import CategoryList from "./CategoryList"
import ChangeView from "./ChangeView"
import useMediaQuery from '../../hooks/useMediaQuery';
import { useAddSessionMutation, useGetAllSessionQuery } from '../../redux/pomodoro/pomodoroApiSlice'

import { createGoogleEvent } from "./GoogleCalendar"
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function CalendarPage() {
    Settings.defaultLocale = "it"

    const today = DateTime.local();
    const todayISO = today.toISODate();
    const [activeDay, setActiveDay] = useState(todayISO);

    const supabase = useSupabaseClient();



    const [date, setDate] = useState(activeDay ? activeDay : todayISO);
    //pads the beginning of a string with another string until it reaches a certain length.

    useEffect(() => {
        setDate(activeDay);
    }, [activeDay]);


    const notifications = {
        'oneDay': '1 day earlier, 4 times.',
        'oneHour': '1 hour earlier, 3 times.',
        '30min': '30 minutes earlier, 2 times.',
        '15min': '15 minutes earlier.',
        '5min': '5 minutes earlier.'
    };

    const [newEvent, setNewEvent] = useState({
        date: todayISO,
    });
    const [newAct, setNewAct] = useState({
        deadline: todayISO,
    });
    const [newPomo, setNewPomo] = useState({
        date: todayISO,
        originalDate: '',
        description: '',
        prodPeriod: 120,
        breakPeriod: 5,
        longBreakPeriod: 15,
        cycles: 4,
        planned: true,
        completed: false
    });
    const [formType, changeFormType] = useState(0); // 0 = event, 1 = activity, //2 = pomodoro
    const [normalizedEvents, setNormalizedEvents] = useState({});
    const [open, setOpen] = useState(false);
    const [bigView, setBigView] = useState(false);
    const [reset, setReset] = useState(false);

    const { data: eventsData = [], refetch: refetchEvents } = useGetEventsQuery();
    const { data: actData = [], refetch: refetchAct } = useGetActQuery();
    const { refetch: refetchPomo } = useGetAllSessionQuery();

    const [addEvent] = useAddEventMutation();
    const [addAct] = useAddActMutation();
    const [addPomo] = useAddSessionMutation();

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
            endDay: event.endDay,
            repeat: event.repeat,
            weekDay: event.weekDay
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

    useEffect(() => {
        setNewPomo(prev => ({ ...prev, originalDate: newPomo.date }));
    }, [newPomo.date]);

    useEffect(() => {
        setNewAct(prev => ({ ...prev, originalDeadline: newAct.deadline }));
    }, [newAct.deadline]);

    const saveChanges = async (e) => {
        e.preventDefault();
        try {
            if (formType === 0) {
                let googleId = null;
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.provider_token) {
                    googleId = await createGoogleEvent(newEvent);
                }

                await addEvent({ ...newEvent, googleEventId: googleId }).unwrap();
                //dispatch(setCredentials({ ...res }));
                toast.success("Event added successfully!", { toastId: 'event-added' });
                refetchEvents();
            } else if (formType === 1) {
                await addAct(newAct).unwrap();
                toast.success("Activity added successfully!", { toastId: 'act-added' });
                refetchAct();
            } else if (formType === 2) {
                await addPomo(newPomo).unwrap();
                toast.success("Pomodoro added successfully!", { toastId: 'act-added' });
                refetchPomo();
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const normalizeEvents = (rawEvents) => {
        const normalized = {};

        Object.entries(rawEvents).forEach(([key, events]) => {
            events.forEach(event => {
                const start = DateTime.fromISO(event.day || key).startOf('day');
                const end = event.endDay ? DateTime.fromISO(event.endDay).startOf('day') : start;
                const limit = event.endDay ? DateTime.fromISO(event.endDay).startOf('day') : start.plus({ years: 10 });

                if (!event.repeat) {
                    const intervalDays = Interval.fromDateTimes(start, end.plus({ days: 1 }))
                        .splitBy({ days: 1 })
                        .map(i => i.start.toISODate());//converte le date in formato ISO
                    //è stato creato un array di date per gli eventi da più giorni
                    intervalDays.forEach((date, index) => {
                        if (!normalized[date]) normalized[date] = [];
                        normalized[date].push({ ...event, firstDay: index === 0 });
                    });
                } else if (event.weekDay && event.weekDay.length > 0) {
                    let weekPointer = start;
                    while (weekPointer <= limit) {
                        event.weekDay.forEach(day => {
                            let dayIt = weekPointer.set({ weekday: day })
                            if (dayIt >= start && dayIt <= limit) {
                                if (!normalized[dayIt.toISODate()]) normalized[dayIt.toISODate()] = [];
                                normalized[dayIt.toISODate()].push({ ...event, firstDay: true });
                            }
                        })
                        weekPointer = weekPointer.plus({ weeks: 1 });
                    }

                } else {
                    let next = start;

                    while (next <= limit) {
                        if (!normalized[next.toISODate()]) normalized[next.toISODate()] = [];
                        normalized[next.toISODate()].push({ ...event, firstDay: true });
                        switch (event.repeat) {
                            case 'everyDay':
                                next = next.plus({ days: 1 });
                                break;
                            case 'everyWeek':
                                next = next.plus({ weeks: 1 });
                                break;
                            case 'everyMonth':
                                next = next.plus({ months: 1 });
                                break;
                            case 'everyYear':
                                next = next.plus({ years: 1 });
                                break;
                            default:
                                next = limit.plus({ days: 1 });
                                break;
                        }
                    }
                }
            })
        });
        return normalized;
    };

    useEffect(() => {
        const normalized = normalizeEvents(events);
        setNormalizedEvents(normalized);
    }, [eventsData]);


    const isDesktop = useMediaQuery("(min-width: 960px)");

    useEffect(() => {
        if (reset) {
            setNewAct({});
            setNewEvent({});
            setNewPomo({
                date: date,
                originalDate: '',
                description: '',
                prodPeriod: 120,
                breakPeriod: 5,
                longBreakPeriod: 15,
                cycles: 4,
                planned: true,
                completed: false
            });
            setReset(false);
        }
    }, [reset])
    return (
        <>
            <ToastContainer autoClose={3000} />
            <div className={`body container-fluid ${bigView ? 'p-0 m-0' : 'p-0 p-sm-3 p-md-3 p-lg-3'}`}>
                <div className="row" style={{ alignItems: "center" }}>
                    <div className={`col-12 ${bigView ? 'col-lg-12' : 'col-lg-8'}`}>
                        <CalendarComponent events={normalizedEvents} activities={activities} activeDay={activeDay} setActiveDay={setActiveDay} bigView={bigView}></CalendarComponent>
                    </div>
                    {isDesktop &&
                        <div className={`${bigView ? 'd-none' : 'col-12 col-lg-4'}`}>
                            <div className="row">
                                <Activity activities={activities} notifications={notifications}></Activity>
                                <div>
                                    <div>
                                        <div className="d-flex justify-content-around">
                                            <div id="button-add-event-act" type="button" className={`mt-3 d-flex tooltip-element`} data-bs-toggle="modal"
                                                data-bs-target="#modal-event-act">
                                                <span className="icon-button-add d-flex justify-content-center align-items-center" onClick={() => setReset(false)}>+</span>
                                                <div className="tooltip-element-text rounded">Add new events/activities</div>
                                            </div>
                                            <button className="btn text-light border m-2" data-bs-toggle="modal"
                                                data-bs-target="#categoryList">Manage your events by dividing them into categories!</button>
                                        </div>
                                        <CategoryList />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <>
                <div className="modal fade" id="modal-event-act" tabIndex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div id="modal-window" className="modal-content border border-white text-white">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="modal-event">New event/activity</h1>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setDate(todayISO)} data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <EventForm newPomo={newPomo} newAct={newAct} newEvent={newEvent} setNewEvent={setNewEvent} setNewAct={setNewAct} setNewPomo={setNewPomo} formType={formType} changeFormType={changeFormType} selectedDay={activeDay} date={date} setDate={setDate} todayCorrectFormat={todayISO} notifications={notifications} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="buttonClose btn"
                                    data-bs-dismiss="modal" onClick={() => { setDate(todayISO); setReset(true) }}>Close</button>
                                <button type="button" className="buttonSave btn" onClick={(e) => { saveChanges(e); setDate(todayISO); setReset(true) }}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ChangeView setBigView={setBigView} open={open} setOpen={setOpen} />
            </>
        </>
    );
}
export default CalendarPage
