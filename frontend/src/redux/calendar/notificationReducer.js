import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    defaultNotification: '5min',
}

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setDefaultNotification: (state, action) => {
            state.defaultNotification = action.payload;
        }
    }
    
});

export const { setDefaultNotification } = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;