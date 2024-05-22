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
        query: ({ answer, answerImg, answerVideo, id, question, questionImg, questionVideo }) => {
          const formData = new FormData()

          questionImg && formData.append('questionImg', questionImg)
          answerImg && formData.append('answerImg', answerImg)
          questionVideo && formData.append('questionVideo', questionVideo)
          answerVideo && formData.append('answerVideo', answerVideo)

          formData.append('question', question)
          formData.append('answer', answer)

          return {
            body: formData,
            method: 'POST',
            url: `v1/decks/${id}/cards`,
          }
        },
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
        query: ({ answer, answerImg, answerVideo, id, question, questionImg, questionVideo }) => {
          const formData = new FormData()

          questionImg && formData.append('questionImg', questionImg)
          answerImg && formData.append('answerImg', answerImg)
          questionVideo && formData.append('questionVideo', questionVideo)
          answerVideo && formData.append('answerVideo', answerVideo)
          question && formData.append('question', question)
          answer && formData.append('answer', answer)

          return {
            body: formData,
            method: 'PATCH',
            url: `v1/cards/${id}`,
          }
        },
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
