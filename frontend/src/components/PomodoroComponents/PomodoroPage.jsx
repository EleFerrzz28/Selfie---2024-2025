import PomodoroAnimation from "./PomodoroAnimation.jsx"
import "./PomodoroPage.css"
import {startTimer, stopTimer, resetTimer, setTimer} from './pomodoroTimer.js';
import { useAddSessionMutation, useGetLastSessionQuery } from '../../redux/pomodoro/pomodoroApiSlice.js'
import { toast, ToastContainer } from "react-toastify";
import 'animate.css'

function PomodoroPage(){
    const [addSession] = useAddSessionMutation();
    const {data: sessionData=[], isLoading, refetch: refetchSession } = useGetLastSessionQuery();

    const lastSessionData = sessionData?.[0];

    const saveSession = async(duration, nCycles)=>{
        try{
            const newSession={
                date: new Date().toISOString(),
                prodPeriod: duration,
                cycles: nCycles
            };
            await addSession(newSession).unwrap();
            toast.success("Session added successfully!");
            refetchSession();
        } catch(err) {
            toast.error(err?.data?.message || err.error)
        }
    };

    return(
        <>
            <ToastContainer/>
            <PomodoroAnimation/>
            <div className="last-session-div p-4">
                <h4 className="pb-2" >Last session</h4>
                {isLoading ? (<p className='animate__animated animate__bounce animate__infinite animate__slow'>Loading...</p>) :
                (
                    lastSessionData ? (
                    <div>
                        <p>Date: {new Date(lastSessionData.date).toLocaleString()}</p>
                        <p>Total production period: {lastSessionData.prodPeriod<60 ? `${lastSessionData.prodPeriod} sec` : `${Math.floor(lastSessionData.prodPeriod/60)} min`}</p>
                        <p>Total number of cycles: {lastSessionData.cycles}</p>
                    </div>
                    ):(
                        <p>Start your first session!</p>
                    )
                )}
            </div>

            <h5 id="general-title" className="text-center">Get ready to concentrate!</h5>
            
            <div className="pomodoroCard d-flex align-items-center justify-content-around flex-wrap">
                <div>
                    <form className="mt-3 mb-4">
                        <div className="d-flex flex-wrap">
                            <div className="me-4">
                                <div>
                                    <label className="mt-3">Period of productivity: (min)</label><br/>
                                    <input id="input-prod" className="border p-2" type="number" name="prod" placeholder="30" min="0"/>
                                </div>
                                <div>
                                    <label className="mt-3">Break: (min)</label><br/>
                                    <input id="input-break" className="border p-2" type="number" name="break" placeholder="5" min="0"/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className="mt-3">Long break: (min)</label><br/>
                                    <input id="input-long-break" className="border p-2" type="number" name="long-break" placeholder="15" min="0"/>
                                </div>
                                <div>
                                    <label className="mt-3">cycles:</label><br/>
                                    <input id="input-cycles" className="border p-2" type="number" name="cycles-number" placeholder="4" min="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="button rounded border-0 p-3 mt-3" onClick={(e)=>{e.preventDefault();setTimer()}}>Change settings</button>
                        </div>
                    </form>
                </div>
                <div className="mt-4">
                    <mark className="title p-3 m-3 fs-3 rounded">Timer Pomodoro</mark>
                    <div className="fs-2 mt-3 mb-3 text-center" id="timerDisplay">30:00</div>
                    <div className="d-flex justify-content-around align-items-center">
                        <small id="prod-break">start session</small>
                        <small id="cycle-count">0 cycles</small>
                    </div>
                    <div className="buttons mt-3 d-flex justify-content-around">
                        <button id="startBtn" className="button rounded border-0 p-3 m-1" onClick={startTimer}>START</button>
                        <button id="resetBtn" className="button rounded border-0 p-3 m-1" onClick={()=>resetTimer(saveSession)}>RESET</button>
                        <button id="stopBtn" className="button rounded border-0 p-3 m-1" onClick={()=>stopTimer(saveSession)}>STOP</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PomodoroPage;