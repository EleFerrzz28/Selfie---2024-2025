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
        add: (state, action) => {
            state.value.push(action.payload)
        },
        deleteNote: (state, action) => {
            state.value = state.value.filter(note => note.id !== action.payload);
        },
        copyNote: (state, action) => {
            const noteToCopy = state.value.find(note => note.id === action.payload);
            if (noteToCopy) {
                state.value.push({
                    ...noteToCopy,
                    id: Date.now()
                })
            }
        },
        updateNote: (state, action) => {
            const { id, newNote } = action.payload;
            const noteIndex = state.value.findIndex(note => note.id === id);
            if (noteIndex !== -1) {
                state.value[noteIndex] = newNote;
            }
        },
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

export const { add, deleteNote, copyNote, updateNote, setQuery, setSortBy } = notesSlice.actions;
export const notesReducer = notesSlice.reducer