import "./PomodoroAnimation.css"
function PomodoroAnimation(){
    return(
        //animazione sessione di studio
        <div className="container d-flex align-items-center justify-content-center">
            <div className="pianta d-flex align-items-end justify-content-center">
                <div id="gambo"></div>
                <div className="foglia" id="foglia1"></div>
                <div className="foglia" id="foglia2"></div>
                <div className="foglia" id="foglia3"></div>
                <div className="pomo" id="pomo1"></div>
                <div className="pomo" id="pomo2"></div>
                <div className="pomo" id="pomo3"></div>
                <div id="terra"></div>
                <div id="terra1"></div>
                <div className="pomo" id="bigPomo"></div>
                <div id="fogliaBigPomo"></div>
            </div>
        </div>
    )
}
export default PomodoroAnimation;