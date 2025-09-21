import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";

import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App.jsx';
import Notes from "./pages/Notes.jsx"
import Calendar from "./pages/Calendar.jsx"
import Pomodoro from "./pages/Pomodoro.jsx"
import SettingsPage from './pages/SettingsPage.js';
import LoginPage from './pages/LoginPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import TMachine from "./pages/TMachine.jsx";
import NotificationsPage from './pages/NotificationsPage.jsx';


import reportWebVitals from './reportWebVitals.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './redux/store.js';
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
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
    path: "/ResetPassword",
    element: <ResetPasswordPage />
  },
  {
    path: "/Notifications",
    element: <NotificationsPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
