import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Note', 'Activity', 'Event', 'Pomodoro', 'Category'],
  endpoints: (builder) => ({}),
});

// FILE genitore di tutte le chiamate api che serve ma non so esattamente come