import { apiSlice } from '../features/apiSlice';

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addEvent: builder.mutation({
      query: (eventData) => ({
        url: '/api/events',
        method: 'POST',
        body: eventData,
      }),
      providesTags: ['Event'],//this endpoint provides data
    }),
    getEvents: builder.query({
      query: () => '/api/events',
      providesTags: ['Event'],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/api/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],//this endpoint invalidates data (delete or update data)
    }),
    editEvent: builder.mutation({
      query: (eventData) => ({
        url:`/api/events/${eventData._id}`,
        method: 'PATCH',
        body: eventData
      }),
      invalidatesTags: ['Event'],
    }),
    updateNotifications: builder.mutation({
      query: (eventData) => ({
        url:`/api/events`,
        method: 'PATCH',
        body: eventData
      }),
      invalidatesTags: ['Event'],
    }),
  }),
});

export const {
  useAddEventMutation,
  useGetEventsQuery,
  useDeleteEventMutation,
  useEditEventMutation,
  useUpdateNotificationsMutation,
} = eventsApiSlice;