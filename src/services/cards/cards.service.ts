import { flashCardsAPI } from '../flashCardsAPI'
import {
  CardResponse,
  CardWithGradeResponse,
  CardsListResponse,
  CreateCardArgs,
  DeleteCardArgs,
  GetCardsArgs,
  GetRandomRequest,
  SaveGradeRequest,
  UpdateCardArgs,
} from './cards.types'

export const cardsService = flashCardsAPI.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<CardResponse, { args: CreateCardArgs; deckId: string }>({
        // this is deckId
        invalidatesTags: ['Deck', 'Cards'],
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
        invalidatesTags: ['Cards'],
        query: ({ id }) => ({
          body: { id },
          method: 'DELETE',
          url: `v1/cards/${id}`,
        }),
      }),
      getCardById: builder.query<CardResponse, { id: string }>({
        providesTags: ['Cards'],
        query: ({ id }) => ({
          method: 'GET',
          url: `v1/cards/${id}`,
        }),
      }),
      getCards: builder.query<CardsListResponse, { args: GetCardsArgs; id: string }>({
        providesTags: ['Cards'],
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
      getRandomCardById: builder.query<CardWithGradeResponse, GetRandomRequest>({
        query: ({ id }) => `v1/decks/${id}/learn`,
      }),
      updateCard: builder.mutation<CardResponse, { args: UpdateCardArgs; cardId: string }>({
        // this is cardId
        invalidatesTags: ['Cards'],
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
    }
  },
})

export const {
  useCreateCardMutation,
  useDeleteCardByIdMutation,
  useGetCardByIdQuery,
  useGetCardsQuery,
  useGetRandomCardByIdQuery,
  useUpdateCardGradeMutation,
  useUpdateCardMutation,
} = cardsService
