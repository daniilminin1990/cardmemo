import {
  AddDeckArgs,
  DeckProps,
  Decks,
  GetDecksArgs,
  UpdateDeckArgs,
} from '@/components/pages/decksList1/decks/decks.types'
import { flashcardsApi } from '@/services/flashCardsApi'

export const decksServices = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      addDeck: builder.mutation<DeckProps, AddDeckArgs>({
        invalidatesTags: ['Decks'],
        query: formData => ({
          body: formData,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),

      deleteDeck: builder.mutation<void, { id: string }>({
        invalidatesTags: ['Decks'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/decks/${id}`,
        }),
      }),
      getDeckById: builder.query<DeckProps, { id: string }>({
        query: ({ id }) => `v1/decks/${id}`,
      }),
      getDecks: builder.query<Decks, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          params: args ?? undefined,
          url: `v2/decks`,
        }),
      }),
      updateDeck: builder.mutation<void, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: ({ formData, id }) => ({
          body: formData,
          method: 'PATCH',
          url: `v1/decks/${id}`,
        }),
      }),
    }
  },
})

export const {
  useAddDeckMutation,
  useDeleteDeckMutation,
  useGetDeckByIdQuery,
  useGetDecksQuery,
  useUpdateDeckMutation,
} = decksServices
