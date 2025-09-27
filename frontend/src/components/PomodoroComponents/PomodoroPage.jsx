import PomodoroAnimation from "./PomodoroAnimation.jsx"
import "./PomodoroPage.css"
import {startTimer, stopTimer, resetTimer, setTimer} from './pomodoroTimer.js';
import { useAddSessionMutation, useSetCompletedMutation, useGetAllSessionQuery } from '../../redux/pomodoro/pomodoroApiSlice.js'
import { toast, ToastContainer } from "react-toastify";
import 'animate.css'
import LastSession from "./LastSession.jsx";
import { useLocation } from "react-router";
import { useState } from "react";
import {DateTime} from "luxon";
import { useSelector } from "react-redux";
import useMediaQuery from "../../hooks/useMediaQuery.jsx";

function PomodoroPage(){
    const [addSession] = useAddSessionMutation();
    const [setCompleted] = useSetCompletedMutation();
    const { refetch } = useGetAllSessionQuery();
    const isDesktop = useMediaQuery("(min-width: 960px)");

    const timeData = DateTime.fromISO(useSelector((state) => state.time.value));
    
    //per leggere i dati passati tramite Link
    const location = useLocation();
    const state = location.state;
    
    const [newSession, setNewSession] = useState({
        sessionProd: state?.linkProdPeriod,
        sessionBreak: state?.linkBreakPeriod,
        sessionLongBreak: state?.linkLongBreak,
        sessionCycles: state?.linkCycles
    }); 
    console.log(newSession);

    const pomodoroID = state?.linkId;

    const saveSession = async(duration, nCycles, completed = true)=>{
        try{
            if (pomodoroID && completed) {
                await setCompleted({ id: pomodoroID }).unwrap();
                toast.success('Pomodoro completed!')
                await refetch();
            }
            const newSession={
                date: timeData.toISO(),
                prodPeriod: duration,
                cycles: nCycles,
            };
            await addSession(newSession).unwrap();
            toast.success("Session added successfully!");
            await refetch();
            console.log("sessione pomodoro: ", newSession);
        } catch(err) {
            toast.error(err?.data?.message || err.error)
        }
    };

    return(
        <>
            <ToastContainer/>
            <PomodoroAnimation/>
            {isDesktop && <LastSession/>}

            <h5 id="general-title" className="text-center">Get ready to concentrate!</h5>
            
            <div className="pomodoroCard d-flex align-items-center justify-content-around flex-wrap">
                <div>
                    <form className="mt-3 mb-4">
                        <div className="d-flex flex-wrap">
                            <div className="me-4">
                                <div>
                                    <label className="mt-3">Period of productivity: (min)</label><br/>
                                    <input id="input-prod" className="border p-2" type="number" value={newSession?.sessionProd} name="prod" placeholder="30" min="0" onChange={(e)=>setNewSession((prev)=>({...prev, sessionProd: e.target.value}))}/>
                                </div>
                                <div>
                                    <label className="mt-3">Break: (min)</label><br/>
                                    <input id="input-break" className="border p-2" type="number" value={newSession?.sessionBreak} name="break" placeholder="5" min="0" onChange={(e)=>setNewSession((prev)=>({...prev, sessionBreak: e.target.value}))}/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className="mt-3">Long break: (min)</label><br/>
                                    <input id="input-long-break" className="border p-2" type="number" value={newSession?.sessionLongBreak} name="long-break" placeholder="15" min="0" onChange={(e)=>setNewSession((prev)=>({...prev, sessionLongBreak: e.target.value}))}/>
                                </div>
                                <div>
                                    <label className="mt-3">cycles:</label><br/>
                                    <input id="input-cycles" className="border p-2" type="number" value={newSession?.sessionCycles} name="cycles-number" placeholder="4" min="0" onChange={(e)=>setNewSession((prev)=>({...prev, sessionCycles: e.target.value}))}/>
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
                        <button id="startBtn" className="button rounded border-0 p-3 m-1" onClick={() =>startTimer(saveSession)}>START</button>
                        <button id="resetBtn" className="button rounded border-0 p-3 m-1" onClick={()=>resetTimer(saveSession, false)}>RESET</button>
                        <button id="stopBtn" className="button rounded border-0 p-3 m-1" onClick={()=>stopTimer()}>STOP</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PomodoroPage;