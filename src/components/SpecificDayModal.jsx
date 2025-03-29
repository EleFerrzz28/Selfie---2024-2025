import "./SpecificDayModal.css"
import {useState} from "react"
import {DateTime} from "luxon"

function SpecificDayModal({months, years,goToSpecificDate}){
    const [state, setState]=useState(1)
    const [selectedYear, setSelectedYear]=useState(null)
    const [selectedMonth, setSelectedMonth]=useState(null)

    function selectYear(yearParam){
        setSelectedYear(yearParam);
        setState(2);
    }

    function selectMonth(monthParam){
        const monthNumber = DateTime.fromFormat(monthParam, "LLLL").month;
        setSelectedMonth(monthNumber);
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
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Select a specific day:</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className={`container ${state!==1 ? "d-none" : ""}`}>
                            {years.map((yearIt,yearIndex)=>(
                                <div onClick={()=>selectYear(yearIt.year)} id="year-selection" key={yearIndex}>
                                    {yearIt.year}
                                </div>
                            ))}
                        </div>
                        <div className={`container ${state!==2 ? "d-none" : ""}`}>
                            {months.map((monthIt,monthIndex)=>(
                                <div onClick={() => selectMonth(monthIt)} id="month-selection" key={monthIndex}>
                                    {monthIt}
                                </div>
                            ))}
                        </div>
                        <div className={`container ${state!==3 ? "d-none" : ""}`}>
                            {DaysArray().map((dayIt,dayIndex)=>(
                                <div onClick={()=>handleDateSelection(dayIt)} data-bs-dismiss="modal" id="day-selection" key={dayIndex}>
                                    {dayIt}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
    
}
export default SpecificDayModal;