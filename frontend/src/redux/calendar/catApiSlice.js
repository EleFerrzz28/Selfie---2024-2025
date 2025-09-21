import { apiSlice } from '../features/apiSlice';

export const catApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCat: builder.mutation({
      query: (catData) => ({
        url: '/api/categories',
        method: 'POST',
        body: catData,
      }),
      providesTags: ['Category']
    }),
    getCat: builder.query({
      query: () => '/api/categories',
      providesTags: ['Category'],
    }),
    deleteCat: builder.mutation({
      query: (id)=>({
        url: `/api/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category']
    }),
    modifyCat: builder.mutation({
      query: ({id, ...catData})=>({
        url: `/api/categories/${id}`,
        method: 'PATCH',
        body: catData,
      }),
      invalidatesTags: ['Category']
    })
  }),
});

export const {
  useAddCatMutation,
  useGetCatQuery,
  useDeleteCatMutation,
  useModifyCatMutation
} = catApiSlice;