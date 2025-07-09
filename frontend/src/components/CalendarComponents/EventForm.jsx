import './EventForm.css'
import { DateTime, Settings } from 'luxon';
import { useState, useEffect } from 'react';

function EventForm({ setNewEvent, setNewAct, formType, changeFormType }){

    Settings.defaultLocale="it"
    const today=DateTime.local()
    const year=today.year;
    const month=today.month;
    const day=today.day;

    const [date, setDate] = useState(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    //pads the beginning of a string with another string until it reaches a certain length.

    useEffect(() => {
        setNewEvent(prev => ({ ...prev, day: date }));
    }, [date]);

    const handleChangeEvent = (e) => {
        const { name, value } = e.target;
        setNewEvent(prev => ({ ...prev, [name]: value }));
    };

    const handleChangeEventDate = (e) => {
        setDate(e.target.value);
    }

    const handleChangeActivity = (e) => {
        const { name, value } = e.target;
        setNewAct(prev => ({ ...prev, [name]: value }));
    };
    
    return(
        <form id="modal-form" method="get" className='was-validated '>
            <input type="radio" id="event" name="eventOrAct" value="Event" onClick={()=>changeFormType(0)} defaultChecked/>
            <label htmlFor="event" className='ms-2'>Event</label><br/>
            <input type="radio" id="activity" name="eventOrAct" value="Activity" onClick={()=>changeFormType(1)}/>
            <label htmlFor="activity" className='ms-2 mb-2'>Activity</label>
            <div className={`EventForm form-slide ${formType===0 ? "show" : ""}`}>
                <div className="mb-3">
                    <label htmlFor="titleEvent" className="form-label ">Title:</label>
                    <input type="text" className="form-control shadow-none border-0" id="titleEvent" name="title" onChange={handleChangeEvent} placeholder="Business meeting" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="descEvent" className="form-label">Description</label>
                    <textarea className="form-control shadow-none border-0" id="descEvent" rows="2" name='description' onChange={handleChangeEvent}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="timeEvent" className="form-label">Time:</label>
                    <input type="time" className="form-control shadow-none border-0" id="timeEvent" name="time" onChange={handleChangeEvent} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="dayEvent" className="form-label">Day:</label>
                    <input type="date" className="form-control shadow-none border-0" id="dayEvent" name="day" onChange={(e)=>{handleChangeEventDate(e); handleChangeEvent(e);}} value={date} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="locEvent" className="form-label">Location:</label>
                    <input type="text" className="form-control shadow-none border-0" id="locEvent" name="location" onChange={handleChangeEvent} placeholder="Home"/>
                </div>
                <div>
                    <div className='mb-3'>
                        <label htmlFor="catEvent" className="form-label">Category:</label>
                        <select className="form-control shadow-none border-0" name="category" onChange={handleChangeEvent} id="select">
                            <option value="">Type to search...</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Work">Work</option>
                            <option value="Education">Education</option>
                        </select>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Want to add a new category?</label>
                    <input type="text" className="form-control input rounded shadow-none border-0" id="exampleFormControlInput1" name="newCat" placeholder="Business meeting"/>
                    </div>
                </div>
            </div>
            <div className={`ActForm form-slide ${formType===1 ? "show" : ""}`}>
                <div className="mb-3">
                    <label htmlFor="titleAct" className="form-label ">Title:</label>
                    <input type="text" className="form-control shadow-none border-0" onChange={handleChangeActivity} id="titleAct" name="title" placeholder="Uni project" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="descAct" className="form-label">Description</label>
                    <textarea className="form-control shadow-none border-0" onChange={handleChangeActivity} id="descAct" rows="2" name='description'></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="deadline" className="form-label">Deadline:</label>
                    <input type="date" className="form-control shadow-none border-0" onChange={handleChangeActivity} id="deadline" name="deadline" required/>
                </div>
                <div>
                    <div className='mb-3'>
                        <label htmlFor="catAct" className="form-label">Category:</label>
                        <select className="form-control shadow-none border-0" name="category" onChange={handleChangeActivity} id="select">
                            <option value="">Type to search...</option>
                            <option value="Project">Project</option>
                            <option value="Work">Work</option>
                            <option value="Education">Education</option>
                        </select>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Want to add a new category?</label>
                    <input type="text" className="form-control input rounded shadow-none border-0" id="exampleFormControlInput1" name="newCat" placeholder="Business meeting"/>
                    </div>
                </div>
            </div>
        </form>
    );
}
export default EventForm;