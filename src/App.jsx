import { useState, useEffect } from "react"

import MainNavbar from './components/MainNavbar';
import BottomNavbar from "./components/BottomNavbar";
import Home from "./components/HomeComponents/Home";
import useMediaQuery from './hooks/useMediaQuery';
import './App.css';

function App() {
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
          <div className="col col-lg-10 col-md-9">
            <Home />
          </div>
        </div>
      </div>
    ) : (
      <div className="mobile-layout">
        <BottomNavbar />
        <Home />
      </div>
    )
  );
}

export default App;
