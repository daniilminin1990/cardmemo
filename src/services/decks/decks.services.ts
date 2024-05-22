import {
  CardWithGrade,
  GetRandomCard,
  SaveGradeRequest,
} from '@/components/pages/cardsList/cards.types'
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

        query: ({ cover, isPrivate, name }) => {
          const formData = new FormData()

          formData.append('cover', cover)
          formData.append('name', name)
          formData.append('isPrivate', isPrivate.toString())

          return {
            body: formData,
            method: 'POST',
            url: 'v1/decks',
          }
        },
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
      getRandomCardById: builder.query<CardWithGrade, GetRandomCard>({
        query: ({ id }) => `v1/decks/${id}/learn`,
      }),
      updateCardGrade: builder.mutation<CardWithGrade, SaveGradeRequest>({
        invalidatesTags: ['Cards'],

        query: args => {
          return {
            body: args,
            method: 'POST',
            url: `v1/decks/${args.cardId}/learn`,
          }
        },
      }),
      updateDeck: builder.mutation<void, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: ({ cover, id, isPrivate, name }) => {
          const formData = new FormData()

          formData.append('cover', cover ? cover : '')
          formData.append('name', name ? name : '')
          formData.append('isPrivate', isPrivate ? isPrivate.toString() : '')

          return {
            body: formData,
            method: 'PATCH',
            url: `v1/decks/${id}`,
          }
        },
      }),
    }
  },
})

export const {
  useAddDeckMutation,
  useDeleteDeckMutation,
  useGetDeckByIdQuery,
  useGetDecksQuery,
  useGetRandomCardByIdQuery,
  useUpdateCardGradeMutation,
  useUpdateDeckMutation,
} = decksServices
