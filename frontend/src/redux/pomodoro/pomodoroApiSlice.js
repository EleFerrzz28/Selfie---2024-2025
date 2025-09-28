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
            query: (id)=>({
            url: `/api/pomodoros/${id}/complete`,
                method: 'PATCH'
            }),
        }),
        editPomodoro: builder.mutation({
            query: (pomodoroData) => ({
                url:`/api/pomodoros/${pomodoroData._id}`,
                method: 'PATCH',
                body: pomodoroData
            }),
            invalidatesTags: ['Pomodoro'],
        }),
        updateNotificationsPomo: builder.mutation({
            query: (pomodoroData) => ({
                url:`/api/pomodoros/notifications`,
                method: 'PATCH',
                body: pomodoroData
            }),
            invalidatesTags: ['Pomodoro'],
        }),
        deletePomodoro: builder.mutation({
            query: (id) => ({
                url: `/api/pomodoros/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Pomodoro'],
        }),
    }),
});

export const {
    useAddSessionMutation,
    useGetLastSessionQuery,
    useGetAllSessionQuery,
    useSetCompletedMutation,
    useEditPomodoroMutation,
    useDeletePomodoroMutation,
    useUpdateNotificationsPomoMutation,
} = pomodoroApiSlice;