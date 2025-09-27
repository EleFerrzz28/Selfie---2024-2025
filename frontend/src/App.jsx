import { useState, useEffect } from "react";
import MainNavbar from './components/MainNavbar';
import BottomNavbar from "./components/BottomNavbar";
import Home from "./components/HomeComponents/HomeLayout";
import useMediaQuery from './hooks/useMediaQuery';
import './App.css';
import "./pages/Page.css";




function App() {
  const [isReady, setIsReady] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 960px)");

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return isDesktop ? (
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
  );
}

export default App;

