import { startTimer, stopTimer, resetTimer} from './pomodoroTimer.js';
import PomodoroAnimation from './PomodoroAnimation.jsx';

function MiniPomodoroPage() {
    return (
        <div
        style={{
            width: '100%',
            height: '100%',
            padding: '10px',
            textAlign: 'center',
            fontFamily: 'Arial',
        }}>
            <PomodoroAnimation/>
            <mark>Pomodoro Timer</mark>
            <div className="fs-2 mt-3 mb-3" id="timerDisplay">30:00</div>
                <div className="buttons d-flex justify-content-around">
                    <button id="startBtn" className="button rounded border-0" onClick={startTimer}>START</button>
                    <button id="resetBtn" className="button rounded border-0" onClick={()=>resetTimer()}>RESET</button>
                    <button id="stopBtn" className="button rounded border-0" onClick={()=>stopTimer()}>STOP</button>
                </div>
        </div>
    );
}
export default MiniPomodoroPage;
