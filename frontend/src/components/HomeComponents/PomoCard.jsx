import tomato from "../../assets/tomato.png";
import { useGetLastSessionQuery } from '../../redux/pomodoro/pomodoroApiSlice';
import './PomoCard.css';

const PomoCard = () => {
  const { data: sessionData = [], isLoading } = useGetLastSessionQuery();
  const lastSession = sessionData?.[0];

  // Conversione solo se esiste il campo prodPeriod
  const prodPeriod = lastSession?.prodPeriod !== undefined
    ? (lastSession.prodPeriod < 60 
        ? `${lastSession.prodPeriod} sec` 
        : `${Math.floor(lastSession.prodPeriod / 60)} min`)
    : "-";

  const breakTime = lastSession?.break !== undefined ? `${lastSession.break} min` : "-";
  const longBreak = lastSession?.longBreak !== undefined ? `${lastSession.longBreak} min` : "-";
  const cycles = lastSession?.cycles !== undefined ? lastSession.cycles : "-";

  return (
    <div className='PomodoroCard-container m-lg-0 mt-4'>
      <header>Last Pomodoro Session</header>
      <div className='pomodoro-card rounded p-3'>
        <header className='border-bottom'></header>

        {isLoading ? (
          <p>Loading...</p>
        ) : !lastSession ? (
          <p className="text-center mt-3">Start a new pomodoro session !</p>
        ) : (
          <table className="pomo-table table-responsive rounded-2 overflow-hidden">
            <tbody>
              <tr>
                <td className='job'>Period of productivity :</td>
                <td className='data'>{prodPeriod}</td>
              </tr>
              <tr>
                <td className='job'>Break :</td>
                <td className='data'>{breakTime}</td>
              </tr>
              <tr>
                <td className='job'>Long break :</td>
                <td className='data'>{longBreak}</td>
              </tr>
              <tr>
                <td className='job'>Cycles :</td>
                <td className='data'>{cycles}</td>
              </tr>
            </tbody>
          </table>
        )}

        <img className='pomo-icon me-3 mt-2' src={tomato} alt="Tomato icon" />
      </div>
    </div>
  );
};

export default PomoCard;



