import PomodoroAnimation from "./PomodoroAnimation"
import "./PomodoroPage.css"
function PomodoroPage(){
    return(
        <>
            <PomodoroAnimation/>
            <div class="card-body d-flex align-items-center justify-content-center">
                <div>
                    <h5 class="card-title m-3">Get ready to concentrate!</h5>
                    <form class="m-3">
                        <div>
                            <label className="me-3">Period of productivity:</label>
                            <input type="time" name="prod" value="30:00"/>
                        </div>
                        <div>
                            <label className="me-3">Break:</label>
                            <input type="time" name="prod"/>
                        </div>
                    </form>
                    <button class="btn border rounded">START</button>
                </div>
            </div>
        </>
    )
}
export default PomodoroPage;