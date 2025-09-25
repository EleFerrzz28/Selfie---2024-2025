import "./TimeMachine.css"
import { DateTime } from "luxon"
import { setTime, resetTime } from "../../redux/timemachine/timemachineSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"

function TimeMachine() {
    const timeValue = useSelector((state) => state.time.value);
    const [timeData, setTimeData] = useState(DateTime.fromISO(timeValue));
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isEditing) {
            const dt = DateTime.fromISO(timeValue);
            setTimeData(dt.isValid ? dt : DateTime.now().set({ second: 0, millisecond: 0 }));
        }
    }, [timeValue, isEditing]);

    const handleInputChange = (e) => {
        setIsEditing(true);
        const { name, value } = e.target;
        let updated = timeData;

        if (name === "date") {
            const [year, month, day] = value.split("-");
            updated = updated.set({ year, month, day, second: 0, millisecond: 0 });
        }

        if (name === "time") {
            const [hour, minute] = value.split(":");
            updated = updated.set({ hour, minute, second: 0, millisecond: 0 });
        }

        setTimeData(updated);
    };

    const handleTravel = async () => {
        setIsEditing(false);
        const updated = timeData.set({ second: 0, millisecond: 0 });
        const isoTime = updated.toISO();

        dispatch(setTime(isoTime));
        console.log(isoTime);

        try {
            await fetch("/timemachine/set", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isoString: isoTime }),
            });
        } catch (err) {
            console.error("Errore nel travel:", err);
        }
    };

    const handleToday = async () => {
        setIsEditing(false);
        dispatch(resetTime());
        try {
            await fetch("/timemachine/reset", { method: "POST" });
        } catch (err) {
            console.error("Errore nel today:", err);
        }
    };

    return (
        <div className="card tMachineContainer shadow-lg p-0 border-0">
            <div className="card-body m-0">
                <h5 className="card-title mb-1 p-0 text-center" style = {{color: "antiquewhite"}}>TIME MACHINE</h5>
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
                    <button type="button" onClick={handleTravel} className="btn btn-danger me-1 w-50">Travel</button>
                    <button type="button" onClick={handleToday} className="btn btn-warning w-50">Today</button>
                </div>
            </div>
        </div>
    );
}

export default TimeMachine