import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

export const timeSlice = createSlice({
    name: "time",
    initialState: {
        value: DateTime.now().toISO(),
        loading: false,
        error: null
    },
    reducers: {
        setTime: (state, action) => {
            state.value = DateTime.fromISO(action.payload).toISO();
        },
        resetTime: (state) => {
            state.value = DateTime.now().toISO();
        }
    }
});

export const { setTime, resetTime } = timeSlice.actions;
export default timeSlice.reducer;
