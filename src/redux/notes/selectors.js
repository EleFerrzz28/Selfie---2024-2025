import { createSelector } from "@reduxjs/toolkit"

const selectNotes = state => state.notes.value;
const selectQuery = state => state.notes.query;
const selectSortBy = state => state.notes.sortBy;

export const selectFilteredSortedNotes = createSelector(
    [selectNotes, selectQuery, selectSortBy],
    (notes, query, sortBy) => {
        if (!notes) return [];
        return notes
            .filter(note => note.title.toLowerCase().includes(query.toLowerCase()) ||
                note.desc.toLowerCase().includes(query.toLowerCase()) ||
                note.date.toLowerCase().includes(query.toLowerCase()) ||
                note.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())) || false)
            .sort((a, b) => {
                if (sortBy === "alphabetical") return a.title.localeCompare(b.title);
                if (sortBy === "date") return new Date(b.date) - new Date(a.date);
                if (sortBy === "length") return b.desc.length - a.desc.length;
                return 0;
            })
    }
);