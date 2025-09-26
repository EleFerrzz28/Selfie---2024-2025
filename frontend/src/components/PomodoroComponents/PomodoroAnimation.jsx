import "./PomodoroAnimation.css"
function PomodoroAnimation(){
    return(
        <>
            <div id="studyAnimationElement">
                <div className="pomo-container d-flex align-items-center justify-content-center">
                    <div className="pianta d-flex align-items-end justify-content-center">
                        <div id="gambo"></div>
                        <div id="contenitore-foglia1"><div className="foglia foglia-dx" id="foglia1"></div></div>
                        <div id="contenitore-foglia2"><div className="foglia foglia-sx" id="foglia2"></div></div>
                        <div id="contenitore-foglia3"><div className="foglia foglia-dx" id="foglia3"></div></div>
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
            <div id="breakAnimationElement" className="d-none">
                <div className="pomo-container d-flex align-items-center justify-content-center">
                    <div className="pianta d-flex align-items-end justify-content-center">
                        <div id="bigPomoBreak"></div>
                        <div id="fogliaBigPomoBreak"></div>
                        <div id="terraPausa"></div>
                        <div id="terraPausa1"></div>
                        <div className="pioggia">
                            <div className="goccia" id="goccia1"></div>
                            <div className="goccia" id="goccia2"></div>
                            <div className="goccia" id="goccia3"></div>
                            <div className="goccia" id="goccia4"></div>
                            <div className="goccia" id="goccia5"></div>
                            <div className="goccia" id="goccia6"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PomodoroAnimation;