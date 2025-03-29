import MainNavbar from '../components/MainNavbar';
import BottomNavbar from "../components/BottomNavbar";
import useMediaQuery from '../hooks/useMediaQuery';
import CalendarPage from "../components/CalendarPage";
import {useState, useEffect} from "react";

/* NOTA: la struttura per la renderizzazione è questa, cioè, per usare due navbar differenti
è obbligatorio importare l'hook useMediaQuery e poi fare rendering condizionale; la
gestione del layout invece è a vostra discrezione */

function Calendar() {
  const [isReady, setIsReady] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 960px)");

  useEffect(() => {
    // Quando il componente è montato, impostiamo isReady a true
    setIsReady(true);
  }, []);

  // Evitiamo il rendering finché isReady non è true
  if (!isReady) return null;

  return (

    isDesktop ? (
      <div className="container-fluid">
        <div className="row">
          <div className="col p-0 m-0 col-lg-2 col-md-3">
            <MainNavbar />
          </div>
          <div className="col col-lg-10 col-md-9 col-sm-12" style={{ display: "flex", alignItems: "center" }}>
            <CalendarPage></CalendarPage>
          </div>
        </div>
      </div>
    ) : (
      <div className="mobile-layout pt-5 pb-5">
        <BottomNavbar />
        <CalendarPage></CalendarPage>
      </div>
    )

  );
}

export default Calendar