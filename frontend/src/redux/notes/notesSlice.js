import { createSlice } from "@reduxjs/toolkit";
import { notesApiSlice } from "./notesApiSlice.js"

export const notesSlice = createSlice({
    name: "notes",
    initialState: {
        value: [],
        sortBy: "last_update_date",
        query: "",
        loading: false,
        error: null
    },
    reducers: {
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setQuery: (state, action) => {
            state.query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            notesApiSlice.endpoints.getAllNotes.matchFulfilled,
            (state, action) => {
                state.value = action.payload.notes || [];
            }
        );
    },
})

export const { updateNote, setQuery, setSortBy } = notesSlice.actions;
export const notesReducer = notesSlice.reducer