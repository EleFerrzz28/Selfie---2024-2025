import './CalendarComponent.css'
import {Info,DateTime,Interval,Settings} from "luxon"
import {useState, useEffect, useRef} from 'react'
import classnames from "classnames"
import SpecificDayModal from "./SpecificDayModal"
import MonthSelection from './MonthSelection'
import EventModal from "./EventModal"
import { useGetCatQuery } from "../../redux/calendar/catApiSlice";
import { useGetAllSessionQuery } from '../../redux/pomodoro/pomodoroApiSlice';
import { useGetActQuery } from '../../redux/calendar/actApiSlice'
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from 'framer-motion';

function CalendarComponent({events, activities, activeDay, setActiveDay, bigView, notifications}){
    const [slide, setSlide]=useState(0);
    const [holidays, setHolidays] = useState([]);
    const totalDays=42;
    const {data: catData = []} = useGetCatQuery();
    const [weeklyView, setWeeklyView] = useState(false);

    const {data: sessionData=[], refetch: refetchSessions } = useGetAllSessionQuery();
    const {data: actData=[], refetch: refetchActs } = useGetActQuery();

    const containerRef = useRef([]);
    const [overflow, setOverflow] = useState([]);

    const categoryMap = catData.reduce((acc, cat) => {
        acc[cat._id] = cat;
        return acc;
    }, {});

    Settings.defaultLocale="en"
    const today=DateTime.local()
    
    const [firstDayOfActiveMonth, setFirstDayOfActiveMonth]=useState(today.startOf("month"))
    const [firstDayOfActiveWeek, setFirstDayOfActiveWeek] = useState(today.startOf("week"))

    //di Default mostreremo il mese contenente la giornata corrente
    //today.startOf("month") contiene il primo giorno dell'attuale mese

    const weekDays=Info.weekdays("short")//array contenente i giorni della settimana
    
    let daysOfMonth=Interval.fromDateTimes(
        firstDayOfActiveMonth.startOf('week'),
        firstDayOfActiveMonth.endOf('month').endOf("week")
    ).splitBy({day:1}).map((day)=>day.start)//array che inizia con la settimana contenente il primo giorno del mese e finisce con la settimana contenente l'ultimo giorno

    let daysOfWeek=Interval.fromDateTimes(
        firstDayOfActiveWeek,
        firstDayOfActiveWeek.endOf("week")
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

    useEffect(() => {
        const newMonth = firstDayOfActiveWeek.month;
        const currentMonth = firstDayOfActiveMonth.month;

        if (newMonth !== currentMonth) {
            setFirstDayOfActiveMonth(firstDayOfActiveWeek.startOf("month"));
        }
    }, [firstDayOfActiveWeek]);

    const goToPrevMonth=()=>{
        if(!weeklyView) setFirstDayOfActiveMonth(firstDayOfActiveMonth.minus({month:1}));
        else setFirstDayOfActiveWeek(firstDayOfActiveWeek.minus({week:1}))
    }
    const goToNextMonth=()=>{
        if(!weeklyView) setFirstDayOfActiveMonth(firstDayOfActiveMonth.plus({month:1}));
        else setFirstDayOfActiveWeek(firstDayOfActiveWeek.plus({week:1}))
    }
    const fivePrevMonth=()=>{
        setFirstDayOfActiveMonth(firstDayOfActiveMonth.minus({month:6}));
    }
    const fiveNextMonth=()=>{
        setFirstDayOfActiveMonth(firstDayOfActiveMonth.plus({month:6}));
    }
    const goToToday=()=>{
        setFirstDayOfActiveMonth(today.startOf("month"));
        setFirstDayOfActiveWeek(today.startOf("week"));
        setActiveDay(today);
    }
    const goToSpecificDate=({year,month,day})=>{
        const specificDate=DateTime.fromObject({year,month,day});
        if(specificDate){
            setFirstDayOfActiveMonth(specificDate.startOf("month"));
            setFirstDayOfActiveWeek(specificDate.startOf("week"))
            setActiveDay(specificDate.toISODate());
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
        const specificMonth=DateTime.fromObject({year:currentYear,month:month,day:1});
        if(specificMonth){
            setFirstDayOfActiveMonth(specificMonth);
            setActiveDay(specificMonth.toISODate());
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
        return holidays.find(h => h.date === date)?.localName ?? null;
    };

    const pomodoroData = sessionData.reduce((acc, pomodoro) => {
        const date = DateTime.fromISO(pomodoro.date).toFormat("yyyy-MM-dd");
        if (!acc[date]) acc[date] = [];
        acc[date].push({
            _id: pomodoro._id,
            type: 'pomodoro',
            prodPeriod: pomodoro.prodPeriod,
            breakPeriod: pomodoro.breakPeriod,
            longBreakPeriod: pomodoro.longBreakPeriod,
            cycles: pomodoro.cycles,
            planned: pomodoro.planned,
            completedPomo: pomodoro.completedPomo,
            notificationsPomo: pomodoro.notificationsPomo,
            title: 'Pomodoro session',
        });
        return acc;
    }, {});

    const holidayName = holidaysNames(activeDay);

    const [holidaysValue, setHolidaysValue] = useState([]);
    useEffect(() => {
        setHolidaysValue(holidayName ? [{
            type: "holiday",
            title: holidayName
        }] : [])
    }, [holidayName])

    const activeDayEvents = [
        ...holidaysValue,
        ...(events[activeDay] ?? []),
        ...(activities[activeDay] ?? []),
        ...(pomodoroData[DateTime.fromISO(activeDay).toISODate()] ?? [])
    ];

    useEffect(() => {
        const check = containerRef.current.map((el) =>{
            if(!el) return false;
            return el.scrollHeight > el.clientHeight;
        });
        setOverflow(check);
    }, [activities, events, firstDayOfActiveWeek]);

    const daysWithEvents = [...Object.keys(events), ...Object.keys(activities), ...Object.keys(pomodoroData)].map((date) => DateTime.fromISO(date).toISODate());

    useEffect(() => {
        const interval = setInterval(() => {
            refetchSessions(); 
            refetchActs();
        }, 1000); // ogni secondo
        return () => clearInterval(interval);
    }, []);

    return(
        <>
            <div className="calendar-container bg-light rounded">
                <div className={`calendar rounded ${bigView ? 'min-vh-100':''}`}>
                    <div className="calendar-headline rounded-top">
                        <div className="shadow-lg calendar-headline-button specificDayButton text-center" data-bs-toggle="modal" data-bs-target="#specificDayModal">Select a <br/>specific date</div>
                        {!weeklyView ? (<div className="calendar-headline-control fivePrev" onClick={()=>fivePrevMonth()}>&#x27EA;</div>) : ""}
                        <div className="calendar-headline-control prev" onClick={()=>goToPrevMonth()}>&#x27E8;</div>
                        <div>
                            <div data-bs-toggle="modal" data-bs-target="#selectMonth" className="calendar-headline-month text-center fs-5">
                                {firstDayOfActiveMonth.monthLong} {firstDayOfActiveMonth.year}
                            </div>
                            {weeklyView ? (<div className='text-center fs-6' onClick={()=>setWeeklyView(!weeklyView)}>
                                month plan
                            </div>) : (<div className='text-center fs-6' onClick={()=>setWeeklyView(!weeklyView)}>
                                weekly plan
                            </div>)}
                        </div>
                        <div className="calendar-headline-control next" onClick={()=>goToNextMonth()}>&#x27E9;</div>
                        {!weeklyView ? (<div className="calendar-headline-control fiveNext" onClick={()=>fiveNextMonth()}>&#x27EB;</div>) : ""}
                        <div id='todayButton' className='shadow-lg calendar-headline-button text-center' onClick={()=>goToToday()}>Turn back to <br/>{today.toLocaleString(DateTime.DATE_MED)}</div>
                    </div>
                    <div className={weeklyView ? `d-none` : ``}>
                        <div className="calendar-weeks-grid">
                            {weekDays.map((weekDay, weekDayIndex)=>(
                                <div key={weekDayIndex} className="calendar-weeks-grid-cell">{weekDay}</div>
                            ))}
                        </div>
                        <div className="calendar-grid">
                            {daysOfMonth.map((dayOfMonth,dayOfMonthIndex)=>{
                                const eventsOfDay = events[dayOfMonth.toISODate()] || []; 
                                const activitiesOfDay = activities[dayOfMonth.toISODate()] || [];
                                const pomodoroOfDay = pomodoroData[dayOfMonth.toISODate()] || [];
                                const dayEvAndAc = [...eventsOfDay, ...activitiesOfDay, ...pomodoroOfDay];
                                let multiDaysEvent = eventsOfDay.some(ev => ev.endDay && (ev.repeat === null || ev.repeat === undefined || ev.repeat === ""));
                                const dayCategory = categoryMap[dayEvAndAc[0]?.category];
                                const categoryClass = daysWithEvents.includes(dayOfMonth.toISODate()) ? (dayCategory ? `category` : "category-none") : null;
                                return(
                                    <div key={dayOfMonthIndex} 
                                    className={classnames({[categoryClass]:true,"calendar-grid-cell":true, 
                                        "calendar-grid-cell-inactive":dayOfMonth.month!==firstDayOfActiveMonth.month,
                                        "calendar-grid-cell-active":activeDay ===dayOfMonth.toISODate(),
                                        "day-with-events": daysWithEvents.includes(dayOfMonth.toISODate()), 
                                        "holiday":isHoliday(dayOfMonth),
                                        "multiDaysEvent": multiDaysEvent ,
                                        "big-view-calendar-days": bigView,})} 
                                    data-title={eventsOfDay.find(ev => ev.firstDay)?.title || activitiesOfDay[0]?.title || pomodoroOfDay[0]?.title || ""}
                                    onClick={()=>{ setActiveDay(dayOfMonth.toISODate());setSlide(0);}}  
                                    data-bs-toggle="dropdown" 
                                    data-bs-auto-close="true"
                                    style={{'--color':dayCategory?.color}}
                                    >
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
                                                <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={slide}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                {activeDayEvents.map((event, eventIndex) => (
                                                    <div key={eventIndex} className={classnames({
                                                        'list-group':true,
                                                        "d-none":eventIndex!==slide,
                                                        "holidaysDay": event.type==="holiday", 
                                                        "deadlineAct": event.type==="activity",
                                                        "pomodoroSession": event.type === "pomodoro"})}>
                                                        <div className="d-flex event-card-width justify-content-between">
                                                            <h5 className="event-title rounded mb-1 fs-6 text-uppercase">{event.title}</h5>
                                                        </div>
                                                        <p className={`mb-1 ${event.type === "pomodoro" ? 'd-none' : ''}`}>{event.description}</p>
                                                        <small className={event.type==="activity" || event.type === 'pomodoro' ? "d-none" : ""}>
                                                            Location: {event.location?.trim() ? event.location : "-"}<br />
                                                            Time: {event.time ? ` ${event.time}` : "00:00"}<br />
                                                            Category: {categoryMap[event.category]?.name ?? "-"}<br/>
                                                            End day:  {event.endDay?.trim() ? DateTime.fromISO(event.endDay).toFormat('yyyy-MM-dd') : "-"}
                                                        </small>
                                                        <small className={event.type==="activity" ? "" : "d-none"}>
                                                            Category: {categoryMap[event.category]?.name ?? "-"}<br/>
                                                            {event.completedAct ? <small className='completed-act-text p-1'>Completed</small> : <small>Not completed yet</small>}<br/>
                                                        </small>
                                                        <div className={event.type==="pomodoro" ? "" : "d-none"}>
                                                            {event.planned ? 
                                                            <small>
                                                                Description: {event.description ? event.description : '-'}<br/>
                                                                Scheduled production period: {event.prodPeriod} minutes.<br/>
                                                                Scheduled break period: {event.breakPeriod} minutes.<br/>
                                                                Scheduled long break period: {event.longBreakPeriod} minutes.<br/>
                                                                Scheduled number of cycles: {event.cycles} {event.cycles === 1 ? "cycle." : "cycles."}<br/>
                                                                {event.completedPomo ? '' : <small> (not completed yet) </small>}<br/>
                                                                <Link to='/Pomodoro' state={{
                                                                    linkProdPeriod:event.prodPeriod, 
                                                                    linkBreakPeriod: event.breakPeriod,
                                                                    linkLongBreak: event.longBreakPeriod,
                                                                    linkCycles: event.cycles,
                                                                    linkId: event._id
                                                                }}>Let's start!</Link>                              
                                                            </small>
                                                            : <small>Production period: {Number(event.prodPeriod) * Number(event.cycles)} minutes.</small>
                                                            }<br/>
                                                        </div>
                                                        <div className='d-flex justify-content-end'>
                                                            <svg data-bs-toggle="modal" data-bs-target="#staticBackdropEvents" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-fullscreen arrow-icon" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                ))}
                                                </motion.div>
                                                </AnimatePresence>
                                                <div id='changeSlideButtons'>
                                                    {activeDayEvents.map((_, eventIndex) => (
                                                        <input key={eventIndex} className="radio-button" type="radio" name="toggle" checked={eventIndex===slide} onChange={()=>setSlide(eventIndex)}/> 
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <button className="btn btn-add-calendar mt-2 rounded-circle" data-bs-toggle="modal" data-bs-target="#modal-event-act">+</button>
                            </div>
                        </div>
                    </div>
                    <div className={weeklyView ? `` : `d-none`}>
                        <div className="calendar-weeks-grid">
                            {weekDays.map((weekDay, weekDayIndex)=>(
                                <div key={weekDayIndex} className="calendar-weeks-grid-cell">{weekDay}</div>
                            ))}
                        </div>
                        <div className="calendar-grid calendar-grid-week">
                            {daysOfWeek.map((_,index)=>{
                                const isRealDay = index < 7;
                                var day = isRealDay ? daysOfWeek[index] : null; //i primi 7 giorni hanno una data
                                const activitiesOfDay = activities[day?.toISODate()]?.map(act =>({...act, type:"activity"})) ?? []
                                const holidayOfDay = isHoliday(day) ?  [{
                                        type: "holiday",
                                        title: holidaysNames(day?.toISODate())
                                    }] : [];
                                const eventsOfDay = isRealDay && day ? events[day.toISODate()] : []; 
                                const pomodorosOfDay = isRealDay && day ? pomodoroData[DateTime.fromISO(day).toISODate()] : [];
                                const dayEvAndAc = [...(eventsOfDay || []), ...(activitiesOfDay || []), ...(holidayOfDay || []), ...(pomodorosOfDay || [])];
                                dayEvAndAc.sort((a,b) => {
                                    const aTime = DateTime.fromISO(a.time);
                                    const bTime = DateTime.fromISO(b.time);
                                    return aTime - bTime; 
                                });

                                const ref = el => (containerRef.current[index] = el);
                                return(
                                    <div key={index} className='calendar-week-column' >
                                        <div 
                                        className={classnames({
                                            "calendar-grid-cell-week":true,
                                            "calendar-grid-cell-inactive":isRealDay && day.month!==firstDayOfActiveMonth.month,
                                            "calendar-grid-cell-active":isRealDay && activeDay ===day.toISODate(),
                                            "day-with-events": isRealDay && dayEvAndAc.length>0})}
                                        >
                                            {day && isRealDay ? 
                                                <div>{day.day}</div> : null}
                                        </div>
                                        <div className="space-under-week border-end" ref={ref}>
                                            {dayEvAndAc && dayEvAndAc.length > 0 ? (
                                                dayEvAndAc.map((ev, index) => { 
                                                    const key = ev._id || `${index}-${ev.title}`;
                                                    const categoryDayWeekColor = categoryMap[ev.category]?.color || '#f4a258ff'
                                                    return (
                                                        <div key={key}>
                                                            <div className="m-2 p-2 event-act-week-plan text-wrap"
                                                                style={{'--color-week':categoryDayWeekColor}}>
                                                                    {ev.title}<br/>
                                                            {ev.type === "event" ? (<>time: {ev.time ? ` ${ev.time}` : "00:00"} <br/>
                                                                <div className='d-flex justify-content-end mt-1'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--color-week)" className="bi bi-calendar-event" viewBox="0 0 16 16">
                                                                        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                                                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                                                                    </svg>
                                                                </div>
                                                            </>) : ""}
                                                            {ev.type === "holiday" ? (
                                                                <div className='d-flex justify-content-end mt-1'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--color-week)" className="bi bi-balloon" viewBox="0 0 16 16">
                                                                        <path fillRule="evenodd" d="M8 9.984C10.403 9.506 12 7.48 12 5a4 4 0 0 0-8 0c0 2.48 1.597 4.506 4 4.984M13 5c0 2.837-1.789 5.227-4.52 5.901l.244.487a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.244-.487C4.789 10.227 3 7.837 3 5a5 5 0 0 1 10 0m-6.938-.495a2 2 0 0 1 1.443-1.443C7.773 2.994 8 2.776 8 2.5s-.226-.504-.498-.459a3 3 0 0 0-2.46 2.461c-.046.272.182.498.458.498s.494-.227.562-.495"/>
                                                                    </svg>
                                                                </div>
                                                            ) : ""}
                                                            {ev.type === "activity" ? (
                                                                <div className='d-flex justify-content-end mt-1'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--color-week)" className="bi bi-check2-circle" viewBox="0 0 16 16">
                                                                        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                                                                        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                                                                    </svg>
                                                                </div>
                                                            ) : ""}
                                                            {ev.type === "pomodoro" ? (
                                                                <>
                                                                    {ev.completedPomo ? '' : <small> (not completed yet)</small>}
                                                                    <div className='d-flex justify-content-end mt-1'>
                                                                        <i className='bx-sm  bx-cherry' style={{color: 'var(--color-week)'}}></i>
                                                                    </div>
                                                                </>
                                                            ) : ""}
                                                            </div>
                                                            <br/>
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <small className='m-2'>No events</small>
                                            )}
                                            <div id='add-btn-weekly' className='d-flex rounded align-items-center align-items-center justify-content-center' data-bs-toggle="modal" data-bs-target="#modal-event-act" onClick={()=>setActiveDay(day.toISODate())}><div className='rounded-circle d-flex justify-content-center align-items-center'>+</div></div>
                                            {overflow[index] && (<p id="scrollMessage" className='p-1 text-center text-muted'>Scroll to see more ↓</p>)}
                                        </div>
                                    </div>
                                );
                            })}
                            
                        </div>
                    </div>
                </div>

                <EventModal activeDayEvents={activeDayEvents} activeDay={activeDay.toLocaleString(DateTime.DATE_MED)} categoryMap={categoryMap} notifications={notifications}></EventModal>
                <MonthSelection months={months} selectSpecificMonth={selectSpecificMonth}></MonthSelection>
                <SpecificDayModal months={months} years={years} currentYear={currentYear} setCurrentYear={setCurrentYear} goToSpecificDate={goToSpecificDate}></SpecificDayModal>

            </div>
        </>
    );
}
export default CalendarComponent;