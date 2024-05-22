import { flashCardsAPI } from '../flashCardsAPI'
import { Card, CardsListResponse, CreateCardArgs, GetCardsArgs } from './cards.types'

export const cardsService = flashCardsAPI.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<Card, { args: CreateCardArgs; id: string }>({
        invalidatesTags: ['Card'],
        query: ({ args, id }) => {
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
            url: `v1/decks/${id}/cards`,
          }
        },
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
    }
  },
})

export const { useCreateCardMutation, useGetCardsQuery } = cardsService
