import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min"; 

import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App.jsx';
import Notes from "./pages/Notes.jsx"
import NoteItem from './pages/NoteItem.jsx';
import Calendar from "./pages/Calendar.jsx"
import Pomodoro from "./pages/Pomodoro.jsx"

import reportWebVitals from './reportWebVitals.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './redux/store.js';
import {Provider} from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
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
    path: "/Notes/:noteID",
    element: <NoteItem></NoteItem>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <RouterProvider router = {router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
