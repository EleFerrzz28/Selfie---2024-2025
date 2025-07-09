import { apiSlice } from '../apiSlice';

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
  }),
});

export const {
  useAddActMutation,
  useGetActQuery,
  useDeleteActMutation,
  useEditActMutation
} = actApiSlice;