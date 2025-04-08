import PomodoroAnimation from "./PomodoroAnimation"
import "./PomodoroPage.css"
import {startTimer, stopTimer, resetTimer} from './pomodoroTimer.js';

function PomodoroPage(){
    return(
        <>
            <PomodoroAnimation/>
            <div class="card-body d-flex align-items-center justify-content-around">
                <div>
                    <h5 class="card-title">Get ready to concentrate!</h5>
                    <form class="mt-3">
                        <div>
                            <label className="mt-3">Period of productivity: (min)</label><br/>
                            <input className="border" type="number" name="prod" value="30"/>
                        </div>
                        <div>
                            <label className="mt-3">Break: (min)</label><br/>
                            <input className="border" type="number" name="break" value="5"/>
                        </div>
                    </form>
                </div>
                <div>
                    <mark className="title p-3 m-3 fs-3 rounded">Timer Pomodoro</mark>
                    <div className="fs-2 mt-3 mb-3 text-center" id="timerDisplay">30:00</div>
                    <div className="buttons mt-3 d-flex justify-content-around">
                        <button id="startBtn" className="button rounded border-0 p-3 m-1" onClick={startTimer}>START</button>
                        <button id="resetBtn" className="button rounded border-0 p-3 m-1" onClick={resetTimer}>RESET</button>
                        <button id="stopBtn" className="button rounded border-0 p-3 m-1" onClick={stopTimer}>STOP</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PomodoroPage;