import { useState } from "react"

import logo from './logo.svg';
import MainNavbar from './components/MainNavbar';
import BottomNavbar from "./components/BottomNavbar";
import useMediaQuery from './hooks/useMediaQuery';
import './App.css';
function App() {
  const isDesktop = useMediaQuery("(min-width: 960px)");

  return (
    <div className="container-fluid">
      {isDesktop ? (
        <div className="row">
          <div className="col p-0 m-0 col-lg-2 col-md-3">
            <MainNavbar />
          </div>
          <div className="col col-lg-10 col-md-9">
            <h1>This shall be the home page</h1>
          </div>
        </div>
      ) : (
        <div className="mobile-layout p-5">
          <BottomNavbar />
          <h1>This shall be the home page</h1>
        </div>
      )}
    </div>
  );
}


export default App;
