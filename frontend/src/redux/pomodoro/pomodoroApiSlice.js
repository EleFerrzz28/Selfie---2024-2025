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
    }),
});

export const {
    useAddSessionMutation,
    useGetLastSessionQuery
} = pomodoroApiSlice;