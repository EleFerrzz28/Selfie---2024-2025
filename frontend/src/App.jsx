import { useState, useEffect } from "react"

import MainNavbar from './components/MainNavbar';
import BottomNavbar from "./components/BottomNavbar";
import Home from "./components/HomeComponents/Home";
import useMediaQuery from './hooks/useMediaQuery';
import './App.css';
import "./pages/Page.css"
import SplashScreen from "./SplashScreen";

function App() {
  const [isReady, setIsReady] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // mostra splash per 3 secondi
    return () => clearTimeout(timer); 
  }, []);
  
  useEffect(() => {
    // Quando il componente è montato, impostiamo isReady a true
    setIsReady(true);
  }, []);

  // Evitiamo il rendering finché isReady non è true
  if (!isReady) return ;
  return (
    <>
      {showSplash ? (<SplashScreen/>) : 
        isDesktop ? (
          <div className="container-fluid">
            <div className="row">
              <div className="col-auto p-0 m-0">
                <MainNavbar />
              </div>
              <div className="col flex-grow-1 m-0 p-0">
                <Home />
              </div>
            </div>
          </div>
        ) : (
          <div className="mobile-layout">
            <BottomNavbar />
            <div className="row mobilerow">
              <Home />
            </div>
          </div>
        )
      }
    </>
  );
}

export default App;
