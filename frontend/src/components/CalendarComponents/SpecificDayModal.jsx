import "./SpecificDayModal.css"
import {useState} from "react"
import {DateTime} from "luxon"


function SpecificDayModal({months, years, currentYear, setCurrentYear, goToSpecificDate}){
    const [state, setState]=useState(1)
    const [selectedYear, setSelectedYear]=useState(null)
    const [selectedMonth, setSelectedMonth]=useState(null)


    function selectYear(yearParam){
        setSelectedYear(yearParam);
        setState(2);
    }

    function selectMonth(monthParam){
        setSelectedMonth(monthParam);
        setState(3);
    }
   
    function DaysArray(){
        if (!selectedYear || !selectedMonth) return [];

        const firstDayOfMonth = DateTime.fromObject({year: selectedYear, month:selectedMonth}); //year-month-01
        const numberOfDays = firstDayOfMonth.daysInMonth; //numero di giorni in un mese
     
        const daysArray = [];
        for (let day = 1; day <= numberOfDays; day++) {
          daysArray.push(firstDayOfMonth.set({day}).toFormat('dd'));
        }


        return daysArray;
      };


    function handleDateSelection(dayParam){
        if(selectedYear && selectedMonth && dayParam){
            goToSpecificDate({year:selectedYear, month:selectedMonth, day: dayParam})
        }
        setState(1)
    }

    return(
    <>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Select a specific day:</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body ">
                        <div className={`container ${state!==1 ? "d-none" : ""}`}>
                        <div className="d-flex justify-content-between">
                            <svg onClick={()=>{setCurrentYear(currentYear-4)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle " viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                            </svg>
                            <svg onClick={()=>{setCurrentYear(currentYear+6)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                            </svg>
                        </div>
                        <div className="date-container">
                            {years.map((yearIt,yearIndex)=>(
                                <div onClick={()=>selectYear(yearIt.year)} id="year-selection" key={yearIndex}>
                                    {yearIt.year}
                                </div>
                            ))}
                        </div>
                        </div>
                        <div className={`${state!==2 ? "d-none" : ""}`}>
                            <div className="date-container">
                                {months.map((monthIt,monthIndex)=>(
                                    <div onClick={() => selectMonth(monthIndex+1)} id="month-selection" key={monthIndex}>
                                        {monthIt}
                                    </div>
                                ))}
                            </div>
                            <svg onClick={()=>setState(1)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 15 15">
                                <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </div>
                        <div className={`${state!==3 ? "d-none" : ""}`}>
                            <div className="date-container">
                                {DaysArray().map((dayIt,dayIndex)=>(
                                    <div onClick={()=>handleDateSelection(dayIt)} data-bs-dismiss="modal" id="day-selection" key={dayIndex}>
                                        {dayIt}
                                    </div>
                                ))}
                            </div>
                            <svg onClick={()=>setState(2)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 15 15">
                                <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
   
}
export default SpecificDayModal;