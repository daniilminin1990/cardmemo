import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const flashCardsAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    // credentials: 'include',
    // prepareHeaders: headers => {
    //   headers.append('x-auth-skip', 'true')
    // },
    prepareHeaders: headers => {
      const token = localStorage.getItem('accessToken')

      if (headers.get('Authorization')) {
        return headers
      }

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Decks', 'Deck', 'Cards', 'Me'],
})
