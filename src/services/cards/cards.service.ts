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
        // async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        //   const invalidateBy = cardsService.util.selectInvalidatedBy(getState(), ['Deck', 'Cards'])
        //
        //   try {
        //     const { data } = await queryFulfilled // тут будет cardData
        //
        //     invalidateBy.forEach(({ originalArgs }) => {
        //       dispatch(
        //         cardsService.util.updateQueryData('getCards', originalArgs, draft => {
        //           if (originalArgs.currentPage !== 1) {
        //             return
        //           } // Вот так делать в реальном проекте нельзя
        //           draft.items.unshift(data)
        //           draft.items.pop()
        //         })
        //       )
        //     })
        //   } catch (e) {
        //     console.log(e)
        //   }
        // },
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
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = cardsService.util.selectInvalidatedBy(getState(), [
            { type: 'Cards' },
          ])
          const patchResults: any[] = []

          invalidateBy.forEach(({ originalArgs }) => {
            patchResults.push(
              dispatch(
                cardsService.util.updateQueryData('getCards', originalArgs, draft => {
                  const itemToDeleteIndex = draft.items.findIndex(card => card.id === id)

                  if (itemToDeleteIndex === -1) {
                    return
                  }
                  draft.items.splice(itemToDeleteIndex, 1)
                })
              )
            )
          })

          try {
            await queryFulfilled
          } catch (e) {
            patchResults.forEach(patchResult => patchResult.undo())
          }
        },
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
        // async onQueryStarted({ cardId, ...args }, { dispatch, getState, queryFulfilled }) {
        //   //! 11111111111
        //   // const patchResults: any[] = dispatch(
        //   //   cardsService.util.updateQueryData('getCards', { id: cardId, ...args }, draft => {
        //   //     const itemToUpdateIndex = draft.items.findIndex(card => card.id === cardId)
        //   //
        //   //     if (itemToUpdateIndex === -1) {
        //   //       return
        //   //     }
        //   //     Object.assign(draft.items[itemToUpdateIndex], args)
        //   //   })
        //   // )
        //   //! 222222222222222
        //   const invalidateBy = cardsService.util.selectInvalidatedBy(getState(), ['Cards'])
        //   const patchResults: any[] = []
        //
        //   invalidateBy.forEach(({ originalArgs }) => {
        //     patchResults.push(
        //       dispatch(
        //         cardsService.util.updateQueryData('getCards', originalArgs, draft => {
        //           const itemToUpdateIndex = draft.items.findIndex(card => card.id === cardId)
        //
        //           if (itemToUpdateIndex === -1) {
        //             return
        //           }
        //           Object.assign(draft.items[itemToUpdateIndex], args)
        //         })
        //       )
        //     )
        //   })
        //
        //   try {
        //     await queryFulfilled
        //   } catch (e) {
        //     patchResults.forEach(patchResult => patchResult.undo())
        //   }
        // },
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
