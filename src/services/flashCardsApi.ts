import { DecksProps } from '@/components/ui/table/decks/Decks'
import { Decks, GetDecksArgs } from '@/components/ui/table/decks/deck/deck.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const flashcardsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      getDecks: builder.query<Decks, GetDecksArgs | void>({
        query: args => ({
          params: args ?? undefined,
          url: `v2/decks`,
        }),
      }),
    }
  },
  reducerPath: 'flashcardsApi',
})

export const { useGetDecksQuery } = flashcardsApi
