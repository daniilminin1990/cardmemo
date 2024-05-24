import { flashcardsApi } from '@/common/instance/flashCardsApi'
import {
  CardResponse,
  CardsRequest,
  CreateCardRequest,
  PaginatedCardsWithGradeResponse,
  UpdateCardRequest,
} from '@/features/cardsList/model/cards.types'

const cardsServices = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      addCard: builder.mutation<CardResponse, CreateCardRequest>({
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
      getCards: builder.query<PaginatedCardsWithGradeResponse, { id: string } & CardsRequest>({
        providesTags: ['Cards'],
        query: ({ id, ...args }) => ({
          params: args ?? undefined,
          url: `v1/decks/${id}/cards`,
        }),
      }),
      updateCard: builder.mutation<CardResponse, UpdateCardRequest>({
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
