import { createSelector } from "@reduxjs/toolkit"
import { DateTime } from "luxon"

const selectNotes = state => state.notes.value;
const selectQuery = state => state.notes.query;
const selectSortBy = state => state.notes.sortBy;

export const selectFilteredSortedNotes = createSelector(
    [selectNotes, selectQuery, selectSortBy],
    (notes, query, sortBy) => {
        if (!notes) return [];
        return notes
            .filter(note =>
                note.title.toLowerCase().includes(query.toLowerCase()) ||
                note.desc.toLowerCase().includes(query.toLowerCase()) ||
                note.last_update_date.toLowerCase().includes(query.toLowerCase()) ||
                note.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            )

            .sort((a, b) => {
                if (a.pinned !== b.pinned) {
                    return b.pinned - a.pinned; 
                }

                if (sortBy === "alphabetical") return a.title.localeCompare(b.title);
                if (sortBy === "last_update_date") return new Date(b.last_update_date) - new Date(a.last_update_date);
                if (sortBy === "length") return b.desc.length - a.desc.length;
                return 0;
            })
    }
);

export const selectTimeData = createSelector(
    (state) => state.time.value,
    (timeValue) => DateTime.fromISO(timeValue) 
);

export const displayLastModifiedNote = createSelector(
    [selectNotes],
    (notes) => {
        if (!notes) return [];

        const sortedNotes = [...notes].sort((a, b) => new Date(b.last_update_date) - new Date(a.last_update_date));
        return sortedNotes[0];
    }
);

export const getAllTags = createSelector(
    [selectNotes], (notes) => {
        if (!notes) return [];
        const allTags = notes.flatMap(note => note.tags);
        return [...new Set(allTags)]; 
    }
);
