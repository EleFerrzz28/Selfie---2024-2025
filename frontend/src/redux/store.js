import { configureStore } from '@reduxjs/toolkit';
import { notesReducer } from './notes/notesSlice';
import timeMachineReducer from "./timemachine/timemachineSlice"
import authReducer from './features/authSlice.js';
import { apiSlice } from './features/apiSlice.js';
import { notificationReducer } from './calendar/notificationReducer.js'

const store = configureStore({
  reducer: {
    notes: notesReducer,
    auth: authReducer,
    time: timeMachineReducer,
    notification: notificationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  }, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true
});

export default store;