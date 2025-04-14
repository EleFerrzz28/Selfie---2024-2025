import "./PomodoroAnimation.css"
function PomodoroAnimation(){
    return(
        <>
            <div id="studyAnimationElement">
                <div className="pomo-container d-flex align-items-center justify-content-center">
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
                        <div className="pomo shadow-lg" id="bigPomo"></div>
                        <div id="fogliaBigPomo"></div>
                    </div>
                </div>
            </div>
            
    </>
    )
    /*
            <div id="breakAnimationElement">
            <div className="pomo-container d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-end justify-content-center">
                    <div className="shadow-lg" id="bigPomoBreak"></div>
                    <div id="fogliaBigPomoBreak"></div>
                    <div class="explosion piece1"></div>
                    <div class="explosion piece2"></div>
                    <div class="explosion piece3"></div>
                    <div class="explosion piece4"></div>
                    <div class="explosion piece5"></div>
                    <div class="explosion piece6"></div>
                    <div class="explosion dropSauce"></div>
                    <div class="explosion drop1Sauce"></div>
                    <div class="explosion drop2Sauce"></div>
                    <div class="explosion drop3Sauce"></div>
                </div>
            </div>
        </div>*/
}
export default PomodoroAnimation;