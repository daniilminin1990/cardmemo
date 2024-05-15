import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { CreateDeckArgs, Deck, DecksListResponse, GetDecksArgs } from './decks/deck.types'
export const flashCardsAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Deck'],
        query: args => ({
          body: args,
          method: 'POST',
          url: 'v1/decks',
        }),
      }),
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Deck'],
        query: args => ({
          method: 'GET',
          params: {
            ...(args ?? {}),
            currentPage: args?.currentPage || undefined,
            itemsPerPage: args?.itemsPerPage || undefined,
            name: args?.name || undefined,
          },
          url: 'v2/decks',
        }),
      }),
    }
  },
  tagTypes: ['Deck'],
})

export const { useCreateDeckMutation, useGetDecksQuery } = flashCardsAPI
