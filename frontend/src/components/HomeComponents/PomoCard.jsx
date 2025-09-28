import { useGetLastSessionQuery } from '../../redux/pomodoro/pomodoroApiSlice';
import "../NotesComponents/NotesList.css";
import './PomoCard.css';


const PomoCard = () => {
  const result = useGetLastSessionQuery(undefined, { refetchOnMountOrArgChange: true });
  const sessionData = result.data ? result.data : [];
  const lastSession = sessionData?.[0];


  const prodPeriod = lastSession?.prodPeriod != null
    ? (lastSession.prodPeriod < 60
      ? `${lastSession.prodPeriod} sec`
      : `${Math.floor(lastSession.prodPeriod / 60)} min`)
    : "-";

  const longBreakPeriod = lastSession?.longBreakPeriod != null 
    ? (lastSession.longBreakPeriod < 60
      ? `${lastSession.longBreakPeriod} sec`
      : `${Math.floor(lastSession.longBreakPeriod / 60)} min`)
    : "-";

  const breakPeriod = lastSession?.breakPeriod != null
    ? (lastSession.breakPeriod < 60
      ? `${lastSession.breakPeriod} sec`
      : `${Math.floor(lastSession.breakPeriod / 60)} min`)
    : "-";

  const cycles = lastSession?.cycles != null ? lastSession.cycles : "-";
  const ISOdate = lastSession?.date
    ? new Date(lastSession.date)
    : null;


  const pomo_date = ISOdate
    ? ISOdate.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
    : "-";


  const pomoFields = [
    { label: "Productivity", value: prodPeriod },
    { label: "Break", value: breakPeriod },
    { label: "Long break", value: longBreakPeriod },
    { label: "Cycles", value: cycles },
  ];


  return (
    <div className="pomocard__container">
      <div className="title__box">
        <div className="title__p-text">
          <h3 id="last_pomodoro"> Last Pomodoro </h3>
          <h3 id="session"> Session </h3>
        </div>
        <i className='bx  bx-cherry' ></i>
      </div>
      <div id="content__box">
        <span id="left__angle">
          <p id='pomo__time'>{pomo_date}</p>
        </span>

        <div className="container mt-2 ms-1 me-1 last-session">
          {pomoFields.map((i) => (
            <div id='r' className="row" key={i.label}>
              <div id='session-label' className="col-6 g-1"> {i.label} : </div>
              <div id='session-value' className="col-6 g-1 d-flex justify-content-center align-items-center">
                {i.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PomoCard;
