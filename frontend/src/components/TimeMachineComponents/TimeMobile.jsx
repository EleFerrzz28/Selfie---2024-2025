// TimeMachineMobile.jsx
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from "luxon";

import { setTime, resetTime } from "../../redux/timemachine/timemachineSlice.js";
import { useDispatch, useSelector } from "react-redux";

import "../NotesComponents/NotePreviewCard.css";
import "./TimeMobile.css";

function TimeMobile() {
  const timeValue = useSelector((state) => state.time.value);
  const timeData = DateTime.fromISO(timeValue);
  const dispatch = useDispatch();

  // quando selezioni una nuova data/ora dal datepicker
  const handleDateChange = async (date) => {
    if (!date) return;

    const updated = DateTime.fromJSDate(date).set({ second: 0, millisecond: 0 });
    const isoTime = updated.toISO();

    // aggiorna lo store frontend
    dispatch(setTime(isoTime));
  };

  // Travel button (puoi usarlo anche per confermare la TM attuale)
  const handleTravel = async () => {
    const updated = timeData.set({ second: 0, millisecond: 0 });
    const isoTime = updated.toISO();

    dispatch(setTime(isoTime));

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

  // Today button: resetta la TimeMachine all'ora reale
  const handleToday = async () => {
    dispatch(resetTime());

    try {
      await fetch("/timemachine/reset", {
        method: "POST",
      });
    } catch (err) {
      console.error("Errore nel reset della TM:", err);
    }
  };

  return (
    <div className="container-fluid timecontainer vh-100 d-flex justify-content-center">
      <div className="card glass-card shadow" style={{ width: "fit-content", height: "fit-content" }}>
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-center">TIME MACHINE</h5>

          <div className="input-group flex-nowrap d-flex justify-content-center mb-3">
            <DatePicker
              selected={timeData.toJSDate()}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={5}
              timeCaption="Time"
              dateFormat="dd/MM/yyyy HH:mm"
              className="form-control"
              calendarClassName="tm-calendar mobile"
              popperClassName="tm-popper mobile"
              popperProps={{
                modifiers: [
                  {
                    name: "preventOverflow",
                    options: { altAxis: false, tether: true, padding: 8 },
                  },
                ],
              }}
            />
          </div>

          <div className="tMButtons d-flex flex-column gap-2 align-items-center">
            <button type="button" onClick={handleTravel} className="btn btn-danger w-100">
              Travel
            </button>
            <button type="button" onClick={handleToday} className="btn btn-warning w-100">
              Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeMobile;
