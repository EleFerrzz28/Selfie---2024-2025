import { apiSlice } from '../features/apiSlice';

export const actApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAct: builder.mutation({
      query: (actData) => ({
        url: '/api/activities',
        method: 'POST',
        body: actData,
      }),
      providesTags: ['Activity']
    }),
    getAct: builder.query({
      query: () => '/api/activities',
      providesTags: ['Activity'],
    }),
    deleteAct: builder.mutation({
      query: (id)=>({
        url: `/api/activities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Activity']
    }),
    editAct: builder.mutation({
      query: (actData) => ({
        url:`/api/activities/${actData._id}`,
        method: 'PATCH',
        body: actData
      }),
      invalidatesTags: ['Activity'],
    }),
    updateNotificationAct: builder.mutation({
      query: (actData) => ({
        url:`/api/activities`,
        method: 'PATCH',
        body: actData
      }),
      invalidatesTags: ['Activity'],
    }),
    setCompletedAct: builder.mutation({
        query: (id)=>({
        url: `/api/activities/${id}/complete`,
            method: 'PATCH'
        }),
        invalidatesTags: ['Activity'],
    }),
  }),
});

export const {
  useAddActMutation,
  useGetActQuery,
  useDeleteActMutation,
  useEditActMutation,
  useUpdateNotificationActMutation,
  useSetCompletedActMutation
} = actApiSlice;