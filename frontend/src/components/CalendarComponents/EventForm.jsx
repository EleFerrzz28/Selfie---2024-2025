import './EventForm.css'
import { DateTime, Info } from 'luxon';
import { useState, useEffect, useRef } from 'react';
import { useGetCatQuery } from "../../redux/calendar/catApiSlice" 

import { useSelector } from 'react-redux';

function EventForm({ newPomo, newAct, newEvent, setNewEvent, setNewAct, setNewPomo, formType, changeFormType, selectedDay, date, setDate, todayCorrectFormat, notifications}){
    const defaultNotification = useSelector(state => state.notification.defaultNotification);

    const [allDay, setAllDay] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [repeatValue, setRepeatValue] = useState("");
    const [selectedWeekDay, setSelectedWeekDay] = useState({
        1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false
    });
    const [time, setTime] = useState(DateTime.now().toFormat("HH:mm"));
    const [endTime, setEndTime] = useState(DateTime.now().toFormat("HH:mm"));
    const [startDay, setStartDay] = useState(date);
    const refRepeat = useRef(null);
    const [category, setCategory] = useState("");
    const [notEvent, setNotEvent] = useState();
    const [notAct, setNotAct] = useState();
    const [notPomo, setNotPomo] = useState();

    const { data: catData = [] } = useGetCatQuery();

    useEffect(() => {
        setNotEvent(defaultNotification);
        setNotAct(defaultNotification);
        setNotPomo(defaultNotification);

        setNewEvent(prev => ({ ...prev, notificationsEvent: defaultNotification }));
        setNewAct(prev => ({ ...prev, notificationsAct: defaultNotification }));
        setNewPomo(prev => ({ ...prev, notificationsPomo: defaultNotification }));
    }, [defaultNotification]);

    const weekDays=Info.weekdays("narrow");

    useEffect(()=>{
        setEndTime(time);
    }, [time])

    useEffect(() => {
        if (selectedDay) {
            setNewAct(prev => ({ ...prev, deadline: DateTime.fromISO(selectedDay).toISODate() }));
            setNewEvent(prev => ({ ...prev, day: DateTime.fromISO(selectedDay).toISODate() }));
            setNewPomo(prev => ({ ...prev, date: DateTime.fromISO(selectedDay).toISODate() }));
        }
    }, [selectedDay]);

    useEffect(() => {
        if (selectedDay) {
            setDate(DateTime.fromISO(selectedDay).toISODate());
        }
    }, [selectedDay]);

    useEffect(()=>{
        if(date){
            setSelectedWeekDay(prev => ({...prev, [DateTime.fromISO(date).weekday]: true}));
        }
    }, [date])

    useEffect(()=>{
        const weekDaysArray = Object.keys(selectedWeekDay)
        .filter(day => selectedWeekDay[day])
        .map(day => parseInt(day));

        setNewEvent(prev=>({
            ...prev, 
            weekDay: weekDaysArray
        }))
    }, [selectedWeekDay])

    const handleChangeEvent = (e) => {
        const { name, value } = e.target;
        setNewEvent(prev => ({ ...prev, [name]: value }));
    };

    const handleChangeTime = (e) => {
        setTime(e.target.value)
    }

    const handleChangeCat = (e) => {
        setCategory(e.target.value)
    }

    const handleChangeActivity = (e) => {
        const { name, value } = e.target;
        setNewAct(prev => ({ ...prev, [name]: value }));
    };

    const handleChangePomo = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === "number" ? Number(value) : value;
        const updatedValuePomo = { ...newPomo, [name]: newValue };

        setNewPomo(prev => ({
            ...prev,
            ...updatedValuePomo
        }));
    };

    const changeCategoryRegexRepeat = (regex, value, element) => {
        const found = catData.find(cat => 
            regex.test(cat.name));
        element.checked = true;
        setRepeat(true);
        setRepeatValue(value);
        setNewEvent(prev => ({ ...prev, 
            repeat: value,
            ...(found && {category: found._id})
        }));
        if(found) setCategory(found._id);
    }

    const changeCategoryRegexTime = (regex, time) => {
        const found = catData.find(cat=>
                regex.test(cat.name));
        setTime(time);
        setNewEvent(prev => ({ ...prev, 
            time: time,
            ...(found && {category: found._id}) 
        }));
        if(found) setCategory(found._id);
    }
    
    const handleChangeTitle = (e) => {
        setTime(DateTime.now().toFormat("HH:mm"));
        setRepeat(false);
        setCategory("");
        const element = refRepeat.current;
        element.checked = false;
        const dinnerRegex = new RegExp("cen[a-zA-Z]+|dinner", "i");
        const lunchRegex = new RegExp("pranz[a-zA-Z]+|lunch", "i");
        const apeRegex = new RegExp("aperitiv[a-zA-Z]+", "i");
        const breakfastRegex = new RegExp("breakfast|colazion[a-zA-Z]+", "i");
        const lectureRegex = new RegExp("lecture|lezion[a-zA-Z]+", "i");
        const birthdayRegex = new RegExp("birthday|compleann[a-zA-Z]+", "i")//la i serve ad ignorare maiuscole/minuscole
        const gymRegex = new RegExp("gym|palestr[a-zA-Z]+|allenament[a-zA-Z]+", "i");
        
        const value = e.target.value;
        if(dinnerRegex.test(value)){
            changeCategoryRegexTime(dinnerRegex, '19:00');
        } 
        else if(lunchRegex.test(value)){
            changeCategoryRegexTime(lunchRegex, '12:00');
        }
        else if(apeRegex.test(value)){
            changeCategoryRegexTime(apeRegex, '17:00');
        }
        else if(breakfastRegex.test(value)){
            changeCategoryRegexTime(breakfastRegex, '09:00');
        }
        else if(lectureRegex.test(value)){
            changeCategoryRegexTime(lectureRegex, '09:00')
        }
        else if(birthdayRegex.test(value)){
            changeCategoryRegexRepeat(birthdayRegex, 'everyYear', element);
        }
        else if(gymRegex.test(value)){
            changeCategoryRegexRepeat(gymRegex, 'everyWeek', element);
        }
    }
    return(
        <>
            <form id="modal-form" method="get" className='was-validated '>
                <div className='m-2 d-flex justify-content-around'>
                    <button className={`btn button-event-act-form ${formType === 0 ? '' : 'border-0'}`} onClick={()=>changeFormType(0)}> Event </button>
                    <button className={`btn button-event-act-form ${formType === 1 ? '' : 'border-0'}`} onClick={()=>changeFormType(1)}> Activity </button>
                    <button className={`btn button-event-act-form ${formType === 2 ? '' : 'border-0'}`} onClick={()=>changeFormType(2)}> Pomodoro </button>
                </div>
                <div className={`EventForm form-slide ${formType===0 ? "show" : ""}`}>
                    <div className="mb-3">
                        <label htmlFor="titleEvent" className="form-label ">Title:</label>
                        <input type="text" className="form-control shadow-none border-0" id="titleEvent" name="title" onChange={(e)=>{handleChangeEvent(e);handleChangeTitle(e);}} placeholder="Business meeting" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descEvent" className="form-label">Description</label>
                        <textarea className="form-control shadow-none border-0" id="descEvent" rows="2" name='description' onChange={handleChangeEvent}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dayEvent" className="form-label">Day/Start day:</label>
                        <input type="date" min={todayCorrectFormat} className="form-control shadow-none border-0" id="dayEvent" name="day" value={newEvent.day ? newEvent.day : ''} onChange={(e)=>{handleChangeEvent(e);}} required/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="endEvent" className="form-label">End day (if the event lasts several days):</label>
                        <input type="date" min={startDay} className="form-control shadow-none border-0" id="endEvent" name="endDay" onChange={handleChangeEvent}/> 
                    </div>
                    <hr></hr>
                    <div className="mb-3 form-check form-switch">
                        <input className='form-check-input shadow-none border-0' type='checkbox' id='allDayEvent' onClick={()=>setAllDay(!allDay)}></input>
                        <label className="form-check-label text-white" htmlFor="allDayEvent">All day</label>
                    </div>
                    {!allDay && (
                    <div className="mb-3">
                        <p>Time:</p>
                        <label htmlFor="timeEvent" className="form-label">From:</label>
                        <input type="time" className="form-control shadow-none border-0" id="timeEvent" name="time" value={time ? time : ''} onChange={(e)=>{handleChangeEvent(e);handleChangeTime(e)}} required/>
                        <label htmlFor="timeEvent" className="form-label mt-3">To:</label>
                        <input type="time" className="form-control shadow-none border-0" id="timeEvent" name="endTime" value={endTime ? endTime : ''} onChange={(e)=>{handleChangeEvent(e)}} required/>
                    </div> )}
                    <hr></hr>
                    <div className="mb-3 form-check form-switch">
                        <input className='form-check-input shadow-none border-0' type='checkbox' id='repeatEvent' onClick={()=>setRepeat(!repeat)} ref={refRepeat}></input>
                        <label className="form-check-label text-white" htmlFor="repeatEvent">Repeat</label>
                    </div>
                    {repeat && (
                        <>
                            <div className="form-check">
                                <input className="form-check-input shadow-none border-0 radio-event-form" type="radio" name="repeat" id="repeatEveryDay" 
                                value="everyDay" checked={repeatValue === "everyDay"} onChange={(e)=>{setRepeatValue(e.target.value);handleChangeEvent(e)}}/>
                                <label className="form-check-label text-white" htmlFor="repeatEveryDay">
                                    Every day
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input shadow-none border-0 radio-event-form" type="radio" name="repeat" id="repeatEveryWeek" 
                                value="everyWeek" checked={repeatValue === "everyWeek"} onChange={(e)=>{setRepeatValue(e.target.value);handleChangeEvent(e)}}/>
                                <label className="form-check-label text-white" htmlFor="repeatEveryWeek">
                                    Every week
                                </label>
                            </div>
                            {repeatValue === 'everyWeek' && 
                                <div className='d-flex justify-content-between m-2'>
                                    {weekDays.map((week, index) => (
                                        <p key={index} className={`text-center text-uppercase p-3 ${selectedWeekDay[index + 1] ? 'border border-white rounded-circle p-3' : ''}`} onClick={()=>setSelectedWeekDay(prev => ({...prev, [index + 1]: !prev[index + 1]}))}>{week}</p>
                                    ))}
                                </div>
                            }
                            <div className="form-check">
                                <input className="form-check-input shadow-none border-0 radio-event-form" type="radio" name="repeat" id="repeatEveryMonth" 
                                value="everyMonth" checked={repeatValue === "everyMonth"} onChange={(e)=>{setRepeatValue(e.target.value);handleChangeEvent(e)}}/>
                                <label className="form-check-label text-white" htmlFor="repeatEveryMonth">
                                    Every month
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input shadow-none border-0 radio-event-form" type="radio" name="repeat" id="repeatEveryYear" 
                                value="everyYear" checked={repeatValue === "everyYear"} onChange={(e)=>{setRepeatValue(e.target.value);handleChangeEvent(e)}}/>
                                <label className="form-check-label text-white" htmlFor="repeatEveryYear">
                                    Every year
                                </label>
                            </div>
                        </>
                    )}
                    <hr></hr>
                    <div className="mb-3">
                        <label htmlFor="locEvent" className="form-label">Location:</label>
                        <input type="text" className="form-control shadow-none border-0" id="locEvent" name="location" onChange={handleChangeEvent} placeholder="Home"/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='notEvent' className='form-label'>Do you want to change notifications settings for this event?</label>
                        {Object.keys(notifications).map((key)=>(
                            <div key={key}>
                                <div className="form-check pb-2">
                                <input className="form-check-input shadow-none border-0 radio-event-form" type="radio" name="notificationsEvent" id={key} 
                                    value= {key} checked={key === notEvent} onChange={(e)=>{setNotEvent(e.target.value); setNewEvent(prev => ({ ...prev, notificationsEvent: e.target.value }))}}/>
                                    <label className="form-check-label text-white" htmlFor={key}>
                                        {notifications[key]}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className='mb-3'>
                            <label htmlFor="catEvent" className="form-label">Category:</label>
                            <select className="form-control shadow-none border-0" name="category" value={category} onChange={(e)=>{handleChangeEvent(e);handleChangeCat(e);}} id="catEvent">
                                <option value="">Type to search...</option>
                                {catData.map((cat)=>(
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className={`ActForm form-slide ${formType===1 ? "show" : ""}`}>
                    <div className="mb-3">
                        <label htmlFor="titleAct" className="form-label ">Title:</label>
                        <input type="text" className="form-control shadow-none border-0" onChange={handleChangeActivity} id="titleAct" name="title" placeholder="Uni project" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descAct" className="form-label">Description: </label>
                        <textarea className="form-control shadow-none border-0" onChange={handleChangeActivity} id="descAct" rows="2" name='description'></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="deadline" className="form-label">Deadline:</label>
                        <input type="date" className="form-control shadow-none border-0" value={newAct.deadline ? newAct.deadline : ''} onChange={(e)=>{handleChangeActivity(e);}} id="deadline" name="deadline" required/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='notAct' className='form-label'>Do you want to change notifications settings for this activity?</label>
                        {Object.keys(notifications).map((key)=>(
                            <div key={key}>
                                <div className="form-check pb-2">
                                <input className="form-check-input shadow-none border-0 radio-event-form" type="radio" name="notificationsAct" id={key} 
                                    value= {key} checked={key === notAct} onChange={(e)=>{setNotAct(e.target.value);setNewAct(prev => ({ ...prev, notificationsAct: e.target.value }))}}/>
                                    <label className="form-check-label text-white" htmlFor={key}>
                                        {notifications[key]}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className='mb-3'>
                            <label htmlFor="catAct" className="form-label">Category:</label>
                            <select className="form-control shadow-none border-0" name="category" onChange={handleChangeActivity} id="catAct">
                                <option value="">Type to search...</option>
                                {catData.map((cat)=>(
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className={`PomoForm form-slide ${formType===2 ? "show" : ""}`}>
                    <p>schedule your next study sessions!</p>
                    <div className='mb-3 mt-3'>
                        <label className="form-label">Description: </label><br/>
                        <input id="input-prod" className="border-0 form-control shadow-none" type="text" name="description" onChange={handleChangePomo}/>      
                    </div>
                    <div className='mb-3'>
                        <label className="form-label">Period of productivity: (min)</label><br/>
                        <input id="input-prod" className="border-0 form-control shadow-none" type="number" name="prodPeriod" value={newPomo.prodPeriod ? newPomo.prodPeriod : ''} min="0" onChange={(e)=>{handleChangePomo(e)}} required/>
                    </div>
                    <div className='mb-3'>
                        <label className="form-label">Break: (min)</label><br/>
                        <input id="input-break" className="border-0 form-control shadow-none" type="number" name="breakPeriod" value={newPomo.breakPeriod ? newPomo.breakPeriod : ''} min="0" onChange={(e)=>{handleChangePomo(e)}} required/>
                    </div>
                    <div className='mb-3'>
                        <label className="form-label">Long break: (min)</label><br/>
                        <input id="input-long-break" className="border-0 shadow-none form-control" type="number" name="longBreakPeriod" value={newPomo.longBreakPeriod ? newPomo.longBreakPeriod : ''} min="0" onChange={(e)=>{handleChangePomo(e)}} required/>
                    </div>
                    <div className='mb-3'>
                        <label className="form-label">cycles:</label><br/>
                        <input id="input-cycles" className="border-0 shadow-none form-control" type="number" name="cycles" value={newPomo.cycles ? newPomo.cycles : ''} min="0" onChange={(e)=>{handleChangePomo(e)}} required/>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Day:</label><br/>
                        <input id='pomoDay' className='border-0 shadow-none form-control' type='date' name='date' value={newPomo.date ? newPomo.date : ''} onChange={(e)=>{handleChangePomo(e)}}/>
                    </div>
                    <div>
                        <label htmlFor='notPomo' className='form-label'>Do you want to change notifications settings for this pomodoro?</label>
                        {Object.keys(notifications).map((key)=>(
                            <div key={key}>
                                <div className="form-check pb-2">
                                <input className="form-check-input shadow-none border-0 radio-event-form" type="radio" name="notificationsPomo" id={key} 
                                    value= {key} checked={key === notPomo} onChange={(e)=>{setNotPomo(e.target.value); setNewPomo(prev => ({ ...prev, notificationsPomo: e.target.value }))}}/>
                                    <label className="form-check-label text-white" htmlFor={key}>
                                        {notifications[key]}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </>
    );
}
export default EventForm;