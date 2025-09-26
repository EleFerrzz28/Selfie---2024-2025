import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import App from "../App.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SplashScreen from "../features/SplashScreen.jsx";

function DirectRoutes() {
  const { userInfo } = useSelector((state) => state.auth);
  const [showSplash, setShowSplash] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (userInfo) {
      const justLogged = sessionStorage.getItem("justLoggedIn");
      if (justLogged) {
        setShowSplash(true);
        sessionStorage.removeItem("justLoggedIn");
        const timer = setTimeout(() => {
          setShowSplash(false);
          setReady(true);
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        setReady(true);
      }
    } else {
      setReady(true);
    }
  }, [userInfo]);

  if (showSplash) return <SplashScreen />;
  if (!ready) return null;

  return userInfo ? <App /> : <LoginPage />;
}

export default DirectRoutes;
