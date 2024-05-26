import { flashcardsApi } from '@/common/instance/flashCardsApi'
import {
  CardWithGradeResponse,
  GetRandomRequest,
  MinMaxCardsResponse,
  SaveGradeRequest,
} from '@/features/cardsList/model/cards.types'
import {
  AddDeckRequest,
  DeckResponse,
  DecksResponse,
  GetDecksRequest,
  UpdateDeckRequest,
  UpdateDeckResponse,
} from '@/features/decksList/model/decks.types'

export const decksServices = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      addDeck: builder.mutation<DeckResponse, AddDeckRequest>({
        invalidatesTags: ['Decks'],

        query: ({ cover, isPrivate, name }) => {
          const formData = new FormData()

          cover && formData.append('cover', cover)
          name && formData.append('name', name)
          isPrivate && formData.append('isPrivate', isPrivate.toString())

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
      getDeckById: builder.query<DeckResponse, { id: string }>({
        providesTags: ['Cards'],
        query: ({ id }) => `v1/decks/${id}`,
      }),
      getDecks: builder.query<DecksResponse, GetDecksRequest | void>({
        providesTags: ['Decks'],
        query: args => ({
          params: args ?? undefined,
          url: `v2/decks`,
        }),
      }),
      getMinMaxCards: builder.query<MinMaxCardsResponse, void>({
        providesTags: ['Decks'],
        query: () => `v2/decks/min-max-cards`,
      }),
      getRandomCardById: builder.query<CardWithGradeResponse, GetRandomRequest>({
        query: ({ id }) => `v1/decks/${id}/learn`,
      }),
      updateCardGrade: builder.mutation<CardWithGradeResponse, SaveGradeRequest>({
        invalidatesTags: ['Cards'],

        query: args => {
          return {
            body: args,
            method: 'POST',
            url: `v1/decks/${args.cardId}/learn`,
          }
        },
      }),
      updateDeck: builder.mutation<UpdateDeckResponse, UpdateDeckRequest>({
        invalidatesTags: ['Decks', 'Cards'],
        query: ({ cover, id, isPrivate, name }) => {
          const formData = new FormData()

          formData.append('cover', cover === '' ? '' : cover)
          name && formData.append('name', name)
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
  useGetMinMaxCardsQuery,
  useGetRandomCardByIdQuery,
  useUpdateCardGradeMutation,
  useUpdateDeckMutation,
} = decksServices
