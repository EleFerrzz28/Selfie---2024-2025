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
    <div className="container-fluid">
      {isDesktop ? (
        <div className="row">
          <div className="col p-0 m-0 col-auto">
            <MainNavbar />
          </div>
          <div className="col col flex-grow-1">
            <PomodoroPage />
          </div>
        </div>
      ) : (
        <div className="mobile-layout p-5">
          <BottomNavbar />
          <PomodoroPage />
        </div>
      )}
    </div>
  );
}

export default Pomodoro
