function MonthSelection({months, selectSpecificMonth}){
    function handleMonthSelection(month){
        if(month){
            selectSpecificMonth(month)
        }
    }
    return(
        <>
            <div className="modal fade" id="staticBackdropMonths" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content border">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Select a specific month:</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="date-container">
                                {months.map((monthIt,monthIndex)=>(
                                    <div data-bs-dismiss="modal" onClick={()=>handleMonthSelection(monthIndex+1)} id="month-selection" key={monthIndex}>
                                        {monthIt}
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
export default MonthSelection;