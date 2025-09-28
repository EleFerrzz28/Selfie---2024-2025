import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import Notes from "./pages/Notes.jsx"
import Calendar from "./pages/Calendar.jsx"
import Pomodoro from "./pages/Pomodoro.jsx"
import SettingsPage from './pages/SettingsPage.js';
import TMachine from "./pages/TMachine.jsx";
import NotificationsPage from './pages/NotificationsPage.jsx';
import DirectRoutes from './components/DirectRoutes.jsx';
import reportWebVitals from './reportWebVitals.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from './features/supabaseClient.js';
import store from './redux/store.js';
import { Provider } from "react-redux";
import './index.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <DirectRoutes />
  },
  {
    path: "/Home",
    element: <App />
  },
  {
    path: "/Calendar",
    element: <Calendar></Calendar>
  },
  {
    path: "/Pomodoro",
    element: <Pomodoro></Pomodoro>
  },
  {
    path: "/Notes",
    element: <Notes></Notes>
  },
  {
    path: "/TimeMachine",
    element: <TMachine></TMachine>
  },
  {
    path: "/Settings",
    element: <SettingsPage />
  },
  {
    path: "/Notifications",
    element: <NotificationsPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <SessionContextProvider supabaseClient={supabase}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </SessionContextProvider>
  </React.StrictMode>
);

reportWebVitals();