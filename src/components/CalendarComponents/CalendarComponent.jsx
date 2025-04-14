import './CalendarComponent.css'
import {Info,DateTime,Interval,Settings} from "luxon"
import {useState} from 'react'
import classnames from "classnames"
import SpecificDayModal from "./SpecificDayModal"
import MonthSelection from './MonthSelection'

function CalendarComponent({events}){
    const [slide, setSlide]=useState(0);
    const totalDays=42;

    Settings.defaultLocale="en"
    const today=DateTime.local()
    
    const [activeDay,setActiveDay]=useState(today)
    const [firstDayOfActiveMonth, setFirstDayOfActiveMonth]=useState(today.startOf("month"))

    //di Default mostreremo il mese contenente la giornata corrente
    //today.startOf("month") contiene il primo giorno dell'attuale mese
    const activeDayEvents=events[activeDay?.toISODate()] ?? [];
    
    const weekDays=Info.weekdays("short")//array contenente i giorni della settimana
    
    let daysOfMonth=Interval.fromDateTimes(
        firstDayOfActiveMonth.startOf('week'),
        firstDayOfActiveMonth.endOf('month').endOf("week")
    ).splitBy({day:1}).map((day)=>day.start)//array che inizia con la settimana contenente il primo giorno del mese e finisce con la settimana contenente l'ultimo giorno

    if(daysOfMonth.length<totalDays){
        const plusDays=totalDays-daysOfMonth.length
        let lastDayOfMonth=daysOfMonth[daysOfMonth.length-1];

        let additionalDays=Interval.fromDateTimes(
            lastDayOfMonth, 
            lastDayOfMonth.plus({day:plusDays})
        ).splitBy({day:1}).map((day)=>day.start)

        daysOfMonth=[...daysOfMonth, ...additionalDays]
    }

    const daysWithEvents = Object.keys(events).map((date) => DateTime.fromISO(date).toISODate())

    const goToPrevMonth=()=>{
        setFirstDayOfActiveMonth(firstDayOfActiveMonth.minus({month:1}));
    }
    const goToNextMonth=()=>{
        setFirstDayOfActiveMonth(firstDayOfActiveMonth.plus({month:1}));
    }
    const fivePrevMonth=()=>{
        setFirstDayOfActiveMonth(firstDayOfActiveMonth.minus({month:6}));
    }
    const fiveNextMonth=()=>{
        setFirstDayOfActiveMonth(firstDayOfActiveMonth.plus({month:6}));
    }
    const goToToday=()=>{
        setFirstDayOfActiveMonth(today.startOf("month"));
        setActiveDay(today);
    }
    const goToSpecificDate=({year,month,day})=>{
        const specificDate=DateTime.fromObject({year,month,day});
        if(specificDate){
            setFirstDayOfActiveMonth(specificDate.startOf("month"));
            setActiveDay(specificDate);
        }
        
    }
    //intervallo di 10 anni 
    const [currentYear, setCurrentYear] = useState(firstDayOfActiveMonth.year); 

    const years=Interval.fromDateTimes(
    DateTime.local(currentYear-4),
    DateTime.local(currentYear+6)
    ).splitBy({year:1}).map((year)=>year.start)

    //array mesi
    const months=Info.months();

    const selectSpecificMonth=(month)=>{
        const specificMonth=DateTime.fromObject({year:today.year,month:month,day:1});
        if(specificMonth){
            setFirstDayOfActiveMonth(specificMonth.startOf("month"));
            setActiveDay(specificMonth);
        }
    }
    
    return(
        <>
            <div className="calendar-container">
                <div className="calendar rounded">
                    <div className="calendar-headline rounded-top">
                        <div className="shadow-lg calendar-headline-button specificDayButton text-center" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Select a <br/>specific date</div>
                        <div className="calendar-headline-control fivePrev" onClick={()=>fivePrevMonth()}>&#x27EA;</div>
                        <div className="calendar-headline-control prev" onClick={()=>goToPrevMonth()}>&#x27E8;</div>
                        <div data-bs-toggle="modal" data-bs-target="#staticBackdropMonths" className="calendar-headline-month text-center h4">
                            {firstDayOfActiveMonth.monthLong} {firstDayOfActiveMonth.year}
                        </div>
                        <div className="calendar-headline-control next" onClick={()=>goToNextMonth()}>&#x27E9;</div>
                        <div className="calendar-headline-control fiveNext" onClick={()=>fiveNextMonth()}>&#x27EB;</div>
                        <div id='todayButton' className='shadow-lg calendar-headline-button text-center' onClick={()=>goToToday()}>Turn back to <br/>{today.toLocaleString(DateTime.DATE_MED)}</div>
                    </div>
                    <div className="calendar-weeks-grid">
                        {weekDays.map((weekDay, weekDayIndex)=>(
                            <div key={weekDayIndex} className="calendar-weeks-grid-cell">{weekDay}</div>
                        ))}
                    </div>
                    <div className="calendar-grid">
                        {daysOfMonth.map((dayOfMonth,dayOfMonthIndex)=>(
                        <div key={dayOfMonthIndex} className={classnames({"calendar-grid-cell ":true, "calendar-grid-cell-inactive":dayOfMonth.month!==firstDayOfActiveMonth.month,"calendar-grid-cell-active":activeDay?.toISODate()===dayOfMonth.toISODate(),"day-with-events": daysWithEvents.includes(dayOfMonth.toISODate()),})} onClick={()=>{ setActiveDay(dayOfMonth);setSlide(0);}}  data-bs-toggle="dropdown" aria-expanded="false">
                            {dayOfMonth.day}
                        </div>
                        ))}
                        <div className="dropdown-menu border">
                            <div className="schedule-headline">
                                {activeDay === null && <div>Please select a day</div>}
                                {activeDay && (
                                    <div>{activeDay.toLocaleString(DateTime.DATE_FULL)}</div>
                                )}
                            </div>
                            <hr/>
                            <div>
                            {activeDay && activeDayEvents.length === 0 && (
                                <div>No Planned events Today</div>
                            )}
                            {activeDay && activeDayEvents.length > 0 && (
                                <>
                                    <div id='carousel'>
                                        {activeDayEvents.map((event, eventIndex) => (
                                            <div key={eventIndex} className={`list-group ${eventIndex!==slide ? "d-none" : ""}`}>
                                                <div className="d-flex w-70 justify-content-between">
                                                    <h5 className="event-title mb-1 fs-6 text-uppercase">{event}</h5>
                                                    <small className='text-muted'>modifica</small>
                                                    <small className='text-muted'>elimina</small>
                                                </div>
                                                <p className="mb-1">Lorem ipsum dolor sit amet consectetur.</p>
                                                <small>info</small>
                                            </div>
                                        ))}
                                        <div id='changeSlideButtons'>
                                            {activeDayEvents.map((event, eventIndex) => (
                                                <input key={eventIndex} className="radio-button" type="radio" name="toggle" checked={eventIndex==slide} onClick={()=>setSlide(eventIndex)}/> 
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                            </div>
                        </div>
                    </div>
                </div>

                <MonthSelection months={months} selectSpecificMonth={selectSpecificMonth}></MonthSelection>
                <SpecificDayModal months={months} years={years} currentYear={currentYear} setCurrentYear={setCurrentYear} goToSpecificDate={goToSpecificDate}></SpecificDayModal>

            </div>
        </>
    );
}
export default CalendarComponent;