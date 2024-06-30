import { getCardsFormData } from '@/common/utils/getCardsFormData'

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
        invalidatesTags: ['Decks', 'Cards'],
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = cardsService.util.selectInvalidatedBy(getState(), [
            'Deck',
            'Cards',
            { id: 'List', type: 'Decks' },
          ])

          try {
            const { data } = await queryFulfilled // тут будет cardData

            invalidateBy.forEach(({ originalArgs }) => {
              dispatch(
                cardsService.util.updateQueryData('getCards', originalArgs, draft => {
                  if (originalArgs.args.currentPage !== 1) {
                    return
                  } // Вот так делать в реальном проекте нельзя
                  draft.items.unshift(data)
                  draft.items.pop()
                })
              )
            })
          } catch (e) {
            console.log(e)
          }
        },
        query: ({ args, deckId }) => {
          return {
            body: getCardsFormData(args),
            method: 'POST',
            url: `v1/decks/${deckId}/cards`,
          }
        },
      }),
      deleteCardById: builder.mutation<void, DeleteCardArgs>({
        invalidatesTags: ['Cards', 'Deck'],
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = cardsService.util.selectInvalidatedBy(getState(), [
            { type: 'Cards' || 'Deck' },
          ])

          console.log(invalidateBy)
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
        async onQueryStarted({ args, cardId }, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = cardsService.util.selectInvalidatedBy(getState(), ['Cards'])
          const patchResults: any[] = []

          invalidateBy.forEach(({ originalArgs }) => {
            patchResults.push(
              dispatch(
                cardsService.util.updateQueryData('getCards', originalArgs, draft => {
                  const itemToUpdateIndex = draft.items.findIndex(card => card.id === cardId)

                  if (itemToUpdateIndex === -1) {
                    return
                  }
                  Object.assign(draft.items[itemToUpdateIndex], getCardsFormData(args))
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
        query: ({ args, cardId }) => {
          return {
            body: getCardsFormData(args),
            method: 'PATCH',
            url: `v1/cards/${cardId}`,
          }
        },
      }),
      updateCardGrade: builder.mutation<CardWithGradeResponse, SaveGradeRequest>({
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          const res = await queryFulfilled
          const newCard: CardWithGradeResponse = res.data

          dispatch(
            cardsService.util.updateQueryData(
              'getRandomCardById',
              { id: newCard.deckId },
              draft => {
                Object.assign(draft, newCard)
              }
            )
          )
        },

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
