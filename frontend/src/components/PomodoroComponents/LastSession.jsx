import "./LastSession.css"
import { useGetLastSessionQuery } from '../../redux/pomodoro/pomodoroApiSlice.js'

function LastSession(){
    const {data: sessionData=[], isLoading } = useGetLastSessionQuery();
    const lastSessionData = sessionData?.[0];

    const totalProductionTime = lastSessionData ?(lastSessionData.prodPeriod * lastSessionData.cycles) : 0;
    return(
        <div className="last-session-div p-4">
            <h4 className="pb-2" >Last session</h4>
            {isLoading ? (<p className='animate__animated animate__bounce animate__infinite animate__slow'>Loading...</p>) :
            (
                lastSessionData ? (
                <div>
                    <p>Date: {new Date(lastSessionData.date).toLocaleString()}</p>
                    <p>Total production period: {totalProductionTime<60 ? `${totalProductionTime} sec` : `${Math.floor(totalProductionTime/60)} min`}</p>
                    <p>Total number of cycles: {lastSessionData.cycles}</p>
                </div>
                ):(
                    <p>Start your first session!</p>
                )
            )}
        </div>
    )
}
export default LastSession;