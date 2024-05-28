import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from './flashCardsBaseQuery'

export const flashCardsAPI = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  refetchOnReconnect: true,
  tagTypes: ['Decks', 'Deck', 'Cards', 'Me'],
})
