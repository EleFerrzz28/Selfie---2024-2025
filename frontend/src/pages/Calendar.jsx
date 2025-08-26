import MainNavbar from '../components/MainNavbar';
import BottomNavbar from "../components/BottomNavbar";
import useMediaQuery from '../hooks/useMediaQuery';
import CalendarPage from "../components/CalendarComponents/CalendarPage"
import "./Page.css"
import { useEffect, useState } from "react";

/* NOTA: la struttura per la renderizzazione è questa, cioè, per usare due navbar differenti
è obbligatorio importare l'hook useMediaQuery e poi fare rendering condizionale; la
gestione del layout invece è a vostra discrezione */

function Calendar() {
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
          <div className="col flex-grow-1" style={{ display: "flex", alignItems: "center" }}>
            <CalendarPage></CalendarPage>
          </div>
        </div>
      ) : (
        <div className="mobile-layout">
          <BottomNavbar />
          <div className="mobilerow row">
            <CalendarPage></CalendarPage>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar