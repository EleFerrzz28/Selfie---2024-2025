import "./TimeMachine.css"
import { DateTime } from "luxon"
import { setTime, resetTime } from "../../redux/timemachine/timemachineSlice.js"
import { useDispatch } from "react-redux"
import { useState } from "react"

function TimeMachine() {
    const [timeData, setTimeData] = useState(DateTime.now());
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "date") {
            const [year, month, day] = value.split("-");
            setTimeData((prev) =>
                prev.set({ year, month, day })
            );
        }

        if (name === "time") {
            const [hour, minute] = value.split(":");
            setTimeData((prev) =>
                prev.set({ hour, minute })
            );
        }
    };

    const handleTravel = () => {
        dispatch(setTime(timeData.toISO()));
    }

    const handleToday = () => {
        const now = DateTime.now();
        setTimeData(now);
        dispatch(resetTime());
    }

    return (
        <div className="card tMachineContainer ms-1 p-0 border-0">
            <div className="card-body m-0">
                <h5 className="card-title mb-1 p-0 text-center">TIME MACHINE</h5>
                <div className="input-group flex-nowrap mb-1">
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={timeData.toISODate()}
                        onChange={handleInputChange} />
                </div>
                <div className="input-group flex-nowrap mb-1">
                    <input
                        type="time"
                        className="form-control"
                        name="time"
                        value={timeData.toFormat("HH:mm")}
                        onChange={handleInputChange} />
                </div>
                <div className="tMButtons d-flex justify-content-evenly">
                    <button type="button" onClick = {handleTravel} className="btn btn-danger me-1 w-50">Travel</button>
                    <button type="button" onClick = {handleToday} className="btn btn-warning w-50">Today</button>
                </div>
            </div>
        </div>
    );
}

export default TimeMachine