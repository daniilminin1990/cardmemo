import { flashCardsAPI } from '../flashCardsAPI'
import {
  Card,
  CardsListResponse,
  CreateCardArgs,
  DeleteCardArgs,
  GetCardsArgs,
  UpdateCardArgs,
} from './cards.types'

export const cardsService = flashCardsAPI.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<Card, { args: CreateCardArgs; deckId: string }>({
        // this is deckId
        invalidatesTags: ['Card'],
        query: ({ args, deckId }) => {
          const formData = new FormData()
          const { answer, answerImg, question, questionImg } = args

          if (answer) {
            formData.append('answer', answer)
          }
          if (question) {
            formData.append('question', question)
          }
          if (answerImg) {
            formData.append('answerImg', answerImg)
          } else if (answerImg === null) {
            formData.append('answerImg', '')
          }
          if (questionImg) {
            formData.append('questionImg', questionImg)
          } else if (questionImg === null) {
            formData.append('questionImg', '')
          }

          return {
            body: formData,
            method: 'POST',
            url: `v1/decks/${deckId}/cards`,
          }
        },
      }),
      deleteCardById: builder.mutation<void, DeleteCardArgs>({
        invalidatesTags: ['Card'],
        query: ({ id }) => ({
          body: { id },
          method: 'DELETE',
          url: `v1/cards/${id}`,
        }),
      }),
      getCardById: builder.query<Card, { id: string }>({
        providesTags: ['Card'],
        query: ({ id }) => ({
          method: 'GET',
          url: `v1/cards/${id}`,
        }),
      }),
      getCards: builder.query<CardsListResponse, { args: GetCardsArgs; id: string }>({
        providesTags: ['Card'],
        query: ({ args, id }) => ({
          method: 'GET',
          params: {
            ...(args ?? {}),
            answer: args.answer,
            currentPage: args?.currentPage || undefined,
            itemsPerPage: args?.itemsPerPage || undefined,
            orderBy: args?.orderBy || undefined,
            question: args?.question || undefined,
          },
          url: `v1/decks/${id}/cards`,
        }),
      }),
      updateCard: builder.mutation<Card, { args: UpdateCardArgs; cardId: string }>({
        // this is cardId
        invalidatesTags: ['Card'],
        query: ({ args, cardId }) => {
          const formData = new FormData()
          const { answer, answerImg, question, questionImg } = args

          if (answer) {
            formData.append('answer', answer)
          }
          if (question) {
            formData.append('question', question)
          }
          if (answerImg) {
            formData.append('answerImg', answerImg)
          } else if (answerImg === null) {
            formData.append('answerImg', '')
          }
          if (questionImg) {
            formData.append('questionImg', questionImg)
          } else if (questionImg === null) {
            formData.append('questionImg', '')
          }

          return {
            body: formData,
            method: 'PATCH',
            url: `v1/cards/${cardId}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useDeleteCardByIdMutation,
  useGetCardByIdQuery,
  useGetCardsQuery,
  useUpdateCardMutation,
} = cardsService
