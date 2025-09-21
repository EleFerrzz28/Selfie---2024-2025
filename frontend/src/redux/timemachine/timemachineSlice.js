import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

export const timeSlice = createSlice({
    name: "time",
    initialState: {
        value: DateTime.now().toISO(),
        isFlowing: true,
    },
    reducers: {
        setTime: (state, action) => {
            state.value = DateTime.fromISO(action.payload).toISO();
        },
        resetTime: (state) => {
            state.value = DateTime.now().toISO();
            state.isFlowing = true;
        },
        incrementTime: (state, action) => {
            const dt = DateTime.fromISO(state.value).plus({ milliseconds: action.payload });
            state.value = dt.toISO();
        },
        pauseTime: (state) => {
            state.isFlowing = false;
        },
        resumeTime: (state) => {
            state.isFlowing = true;
        }
    }
});

export const { setTime, resetTime, incrementTime, pauseTime, resumeTime } = timeSlice.actions;
export default timeSlice.reducer;
