import MainNavbar from '../components/MainNavbar';
import BottomNavbar from "../components/BottomNavbar";
import useMediaQuery from '../hooks/useMediaQuery';
import {useEffect, useState} from "react";

/* NOTA: la struttura per la renderizzazione è questa, cioè, per usare due navbar differenti
è obbligatorio importare l'hook useMediaQuery e poi fare rendering condizionale; la
gestione del layout invece è a vostra discrezione*/

function Pomodoro() {
  const [isReady, setIsReady] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 960px)");

  useEffect(() => {
    // Quando il componente è montato, impostiamo isReady a true
    setIsReady(true);
  }, []);

  // Evitiamo il rendering finché isReady non è true
  if (!isReady) return null;

  return (
    <div className="container-fluid">
      {isDesktop ? (
        <div className="row">
          <div className="col p-0 m-0 col-lg-2 col-md-3">
            <MainNavbar />
          </div>
          <div className="col col-lg-10 col-md-9">
            <h1>This shall be the pomodoro page</h1>
          </div>
        </div>
      ) : (
        <div className="mobile-layout p-5">
          <BottomNavbar />
          <h1>This shall be the pomodoro page</h1>
        </div>
      )}
    </div>
  );
}

export default Pomodoro
