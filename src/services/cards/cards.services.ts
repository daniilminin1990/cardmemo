import {
  Card,
  CreateCardRequest,
  GetCardsArgs,
  PaginatedCardsWithGrade,
  UpdateCardRequest,
} from '@/components/pages/cardsList/cards.types'
import { flashcardsApi } from '@/services/flashCardsApi'

const cardsServices = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      addCard: builder.mutation<Card, CreateCardRequest>({
        invalidatesTags: ['Cards'],
        query: ({ formData, id }) => ({
          body: formData,
          method: 'POST',
          url: `v1/decks/${id}/cards`,
        }),
      }),
      deleteCard: builder.mutation<void, { id: string }>({
        invalidatesTags: ['Cards'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/cards/${id}`,
        }),
      }),
      getCards: builder.query<PaginatedCardsWithGrade, { id: string } & GetCardsArgs>({
        providesTags: ['Cards'],
        query: ({ id, ...args }) => ({
          params: args ?? undefined,
          url: `v1/decks/${id}/cards`,
        }),
      }),
      updateCard: builder.mutation<Card, UpdateCardRequest>({
        invalidatesTags: ['Cards'],
        query: ({ formData, id }) => ({
          body: formData,
          method: 'PATCH',
          url: `v1/cards/${id}`,
        }),
      }),
    }
  },
})

export const {
  useAddCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useUpdateCardMutation,
} = cardsServices
