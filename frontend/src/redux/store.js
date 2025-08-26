import { configureStore } from '@reduxjs/toolkit';
import { notesReducer } from './notes/notesSlice';
import timeMachineReducer from "./timemachine/timemachineSlice"
import themeReducer   from './features/themeSlice';
import authReducer from './features/authSlice.js';
import { apiSlice } from './features/apiSlice.js';

const store = configureStore({
  reducer: {
    notes: notesReducer,
    theme: themeReducer,
    auth: authReducer,
    time: timeMachineReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  }, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true
});

export default store;
