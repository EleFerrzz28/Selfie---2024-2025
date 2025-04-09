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
    console.log(state);
    return(
    <>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog  modal-dialog-centered">
                <div className="modal-content border">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Select a specific day:</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className={`container ${state!==1 ? "d-none" : ""}`}>
                            {years.map((yearIt,yearIndex)=>(
                                <div onClick={()=>selectYear(yearIt.year)} id="year-selection" key={yearIndex}>
                                    {yearIt.year}
                                </div>
                            ))}
                        </div>
                        <div className={`${state!==2 ? "d-none" : ""}`}>
                            <div className="container">
                                {months.map((monthIt,monthIndex)=>(
                                    <div onClick={() => selectMonth(monthIt)} id="month-selection" key={monthIndex}>
                                        {monthIt}
                                    </div>
                                ))}
                            </div>
                            <svg onClick={()=>setState(1)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 15 15">
                                <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </div>
                        <div className={`${state!==3 ? "d-none" : ""}`}>
                            <div className="container">
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
