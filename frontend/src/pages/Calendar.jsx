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
    <div className="container-fluid calendar-font" >
      {isDesktop ? (
        <div className="row">
          <div className="col-auto p-0 m-0 min-vh-100 vh-100">
            <MainNavbar />
          </div>
          <div className="col-8 flex-grow-1 m-0 p-0 min-vh-100 vh-100" style={{ display: "flex", alignItems: "center", overflow: 'hidden' }}>
            <CalendarPage></CalendarPage>
          </div>
        </div>
      ) : (
        <div className="mobile-layout">
          <BottomNavbar />
          <div className="mobilerow row me-0" style={{ height: '100dvh' }}>
            <CalendarPage></CalendarPage>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar