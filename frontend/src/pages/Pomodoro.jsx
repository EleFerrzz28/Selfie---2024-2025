import MainNavbar from '../components/MainNavbar';
import BottomNavbar from "../components/BottomNavbar";
import useMediaQuery from '../hooks/useMediaQuery';
import PomodoroPage from '../components/PomodoroComponents/PomodoroPage.jsx';

import {useState, useEffect} from "react"

/* NOTA: la struttura per la renderizzazione è questa, cioè, per usare due navbar differenti
è obbligatorio importare l'hook useMediaQuery e poi fare rendering condizionale; la
gestione del layout invece è a vostra discrezione*/

function Pomodoro() {
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <div className="container-fluid calendar-font " style={{backgroundColor:"var(--color-background)"}}>
      {isDesktop ? (
        <div className="row">
          <div className="col-auto p-0 m-0 min-vh-100 vh-100" style = {{overflow: "hidden"}}>
            <MainNavbar />
          </div>
          <div className="col flex-grow-1 m-0 p-0 min-vh-100 vh-100" style = {{overflow: "hidden"}}>
            <PomodoroPage/>
          </div>
        </div>
      ) : (
        <div className="mobile-layout">
          <BottomNavbar />
          <div className="mobilerow row ">
            <PomodoroPage />
          </div>
        </div>
      )}
    </div>
  );
}

export default Pomodoro
