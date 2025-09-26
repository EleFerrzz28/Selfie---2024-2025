import { apiSlice } from "../features/apiSlice";

export const pomodoroApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addSession: builder.mutation({
            query: (sessionData) => ({
                url: '/api/pomodoros',
                method: 'POST',
                body: sessionData,
            }),
        }),
        getLastSession: builder.query({
            query: ()=>'api/pomodoros/last',
            providesTags: ['Pomodoro'],
        }),
        getAllSession: builder.query({
            query: () => '/api/pomodoros',
            providesTags: ['Pomodoro'],
        }),
        setCompleted: builder.mutation({
            query: ({id})=>({
            url: `/api/pomodoros/${id}`,
                method: 'PATCH'
            }),
        }),
    }),
});

export const {
    useAddSessionMutation,
    useGetLastSessionQuery,
    useGetAllSessionQuery,
    useSetCompletedMutation
} = pomodoroApiSlice;