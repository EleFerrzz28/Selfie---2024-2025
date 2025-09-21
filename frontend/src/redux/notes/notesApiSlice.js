import { apiSlice } from "../features/apiSlice";

const NOTES_URL = '/api/notes';

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createNote: builder.mutation({
            query: (newNote) => ({
                url: `${NOTES_URL}/add-note`,
                method: 'POST',
                body: newNote,
            }),
            transformResponse: (response) => response.note,
            invalidatesTags: ['Note'],
        }),

        editNote: builder.mutation({
            query: ({ noteId, title, desc, tags, creation_date, last_update_date }) => ({
                url: `${NOTES_URL}/edit-note/${noteId}`,
                method: 'PUT',
                body: { title, desc, tags, creation_date, last_update_date },
            }),
            invalidatesTags: ['Note'],
        }),


        pinNote: builder.mutation({
            query: ({ noteId }) => ({
                url: `${NOTES_URL}/pinunpin-note/${noteId}`,
                method: 'PATCH',
            }),

            invalidatesTags: ['Note'],
        }),

        getAllNotes: builder.query({
            query: () => ({
                url: `${NOTES_URL}/get-all-notes`,
                method: 'GET',
            }),
            providesTags: ['Note'],
        }),

        getLastUpdatedNote: builder.query({
            query: () => ({
                url: `${NOTES_URL}/get-last-updated-note`,
                method: 'GET'
            }),
            providesTags: ['Note'],
        }),

        deleteNote: builder.mutation({
            query: (noteId) => ({
                url: `${NOTES_URL}/delete-note/${noteId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Note'],
        }),

        copyNote: builder.mutation({
            query: (noteId) => ({
                url: `${NOTES_URL}/copy-note/${noteId}`,
                method: 'POST',
            }),
            transformResponse: (response) => response.note,
            invalidatesTags: ['Note'],
        }),
    }),
});

export const {
    useCreateNoteMutation,
    useEditNoteMutation,
    usePinNoteMutation,
    useGetAllNotesQuery,
    useGetLastUpdatedNoteQuery,
    useDeleteNoteMutation,
    useCopyNoteMutation
} = notesApiSlice;
