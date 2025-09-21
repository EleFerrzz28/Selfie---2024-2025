import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: JSON.parse(localStorage.getItem("darkMode")) || false,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.mode = !state.mode;
            localStorage.setItem("darkMode", JSON.stringify(state.mode));
        }

    }
    
});

export const {toggleDarkMode} = themeSlice.actions;

export default themeSlice.reducer;
