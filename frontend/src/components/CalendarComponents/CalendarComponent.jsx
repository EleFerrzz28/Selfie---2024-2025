import './CalendarComponent.css'
import {Info,DateTime,Interval,Settings} from "luxon"
import {useState, useEffect} from 'react'
import classnames from "classnames"
import SpecificDayModal from "./SpecificDayModal"
import MonthSelection from './MonthSelection'
import EventModal from "./EventModal"
import ChangeEventModal from './ChangeEventModal'

function CalendarComponent({events}){
    const [slide, setSlide]=useState(0);
    const [holidays, setHolidays] = useState([]);
    const totalDays=42;

    Settings.defaultLocale="en"
    const today=DateTime.local()
    
    const [activeDay,setActiveDay]=useState(today)
    const [firstDayOfActiveMonth, setFirstDayOfActiveMonth]=useState(today.startOf("month"))

    //di Default mostreremo il mese contenente la giornata corrente
    //today.startOf("month") contiene il primo giorno dell'attuale mese
    var activeDayEvents=events[activeDay?.toISODate()] ?? [];

    const weekDays=Info.weekdays("short")//array contenente i giorni della settimana
    
    let daysOfMonth=Interval.fromDateTimes(
        firstDayOfActiveMonth.startOf('week'),
        firstDayOfActiveMonth.endOf('month').endOf("week")
    ).splitBy({day:1}).map((day)=>day.start)//array che inizia con la settimana contenente il primo giorno del mese e finisce con la settimana contenente l'ultimo giorno

    if(daysOfMonth.length<totalDays){
        const plusDays=totalDays-daysOfMonth.length
        let lastDayOfMonth=daysOfMonth[daysOfMonth.length-1];

        let additionalDays=Interval.fromDateTimes(
            lastDayOfMonth.plus({days:1}), 
            lastDayOfMonth.plus({day:plusDays+1})
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
    
    useEffect(() => {
        async function getHolidays() {
            const countryCode = "IT"; 
            const year = firstDayOfActiveMonth.year;
            const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}?locale=en-US`;
            try {
                const response = await fetch(url);
                const data = await response.json();//contiene i dati relativi alle festività
                setHolidays(data);
            } catch (error) {
                console.error("Errore nel recupero delle festività:", error);
            }
        }
    
        getHolidays();
    }, [firstDayOfActiveMonth.year]);
    

    const isHoliday = (date) => holidays.some(h => h.date === date.toISODate());

    const holidaysNames = (date) => {
        return holidays.find(h => h.date === date.toISODate())?.localName ?? null;
    };
    
    const holidayName = holidaysNames(activeDay);
    activeDayEvents = [
        ...(holidayName ? [{
            type: "holiday",
            title: holidayName
          }] : []),
        ...(events[activeDay?.toISODate()] ?? [])
    ];

    return(
        <>
            <div className="calendar-container bg-light rounded">
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
                        {daysOfMonth.map((dayOfMonth,dayOfMonthIndex)=>{
                            const eventsOfDay = events[dayOfMonth.toISODate()] || []; 
                            const dayCategory = eventsOfDay[0]?.category?.toLowerCase(); 
                            const categoryClass = daysWithEvents.includes(dayOfMonth.toISODate()) ? (dayCategory ? `category-${dayCategory}` : "category-none") : null;
                            return(
                                <div key={dayOfMonthIndex} 
                                className={classnames({[categoryClass]:true,"calendar-grid-cell":true, 
                                    "calendar-grid-cell-inactive":dayOfMonth.month!==firstDayOfActiveMonth.month,
                                    "calendar-grid-cell-active":activeDay?.toISODate()===dayOfMonth.toISODate(),
                                    "day-with-events": daysWithEvents.includes(dayOfMonth.toISODate()), 
                                    "holiday":isHoliday(dayOfMonth)})} 
                                data-title={eventsOfDay[0]?.title || ""} 
                                onClick={()=>{ setActiveDay(dayOfMonth);setSlide(0);}}  
                                data-bs-toggle="dropdown" 
                                data-bs-auto-close="true">
                                    {dayOfMonth.day}
                                </div>
                            );
                        })}

                        <div className="dropdown-menu border">
                            <div className="schedule-headline">
                                {activeDay === null }
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
                                            <div key={eventIndex} className={classnames({'list-group':true, "d-none":eventIndex!==slide,"holidaysDay": event.type==="holiday"})}>
                                                <div className="d-flex event-card-width justify-content-between">
                                                    <h5 className="event-title rounded mb-1 fs-6 text-uppercase">{event.title}</h5>
                                                </div>
                                                <p className="mb-1">{event.description}</p>
                                                <small>
                                                    Location: {event.location?.trim() ? event.location : "-"}<br />
                                                    Time: {event.time}<br />
                                                    Category: {event.category?.trim() ? event.category : "-"}
                                                </small>
                                                <div className='d-flex justify-content-end'>
                                                    <svg data-bs-toggle="modal" data-bs-target="#staticBackdropEvents" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-fullscreen arrow-icon" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        ))}
                                        <div id='changeSlideButtons'>
                                            {activeDayEvents.map((_, eventIndex) => (
                                                <input key={eventIndex} className="radio-button" type="radio" name="toggle" checked={eventIndex===slide} onClick={()=>setSlide(eventIndex)}/> 
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                            </div>
                        </div>
                    </div>
                </div>

                <ChangeEventModal></ChangeEventModal>
                <EventModal activeDayEvents={activeDayEvents} activeDay={activeDay.toLocaleString(DateTime.DATE_FULL)}></EventModal>
                <MonthSelection months={months} selectSpecificMonth={selectSpecificMonth}></MonthSelection>
                <SpecificDayModal months={months} years={years} currentYear={currentYear} setCurrentYear={setCurrentYear} goToSpecificDate={goToSpecificDate}></SpecificDayModal>

            </div>
        </>
    );
}
export default CalendarComponent;