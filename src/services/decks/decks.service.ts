import { router } from '@/router/router'

import { flashCardsAPI } from '../flashCardsAPI'
import {
  CreateDeckArgs,
  Deck,
  DecksListResponse,
  DeleteDeckArgs,
  GetDecksArgs,
  MinMaxArgs,
  UpdateDeckArgs,
} from './deck.types'

export const decksService = flashCardsAPI.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = decksService.util.selectInvalidatedBy(getState(), [
            { type: 'Decks' },
          ])

          try {
            const { data } = await queryFulfilled // тут будет deckData

            invalidateBy.forEach(({ originalArgs }) => {
              dispatch(
                decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                  if (originalArgs.currentPage !== 1) {
                    return
                  } // Вот так делать в реальном проекте нельзя
                  draft.items.unshift(data) // Добавляем первый элемент
                  draft.items.pop() // Удаляем последний элемент
                })
              )
              // Переходим на созданный deck сразу после создания

              router.navigate(`/decks/${data.id}`)
            })
          } catch (e) {
            ;() => {}
          }
        },
        query: ({ cover, isPrivate, name }) => {
          const formData = new FormData()

          // if (name) {
          formData.append('name', name)
          // }
          if (isPrivate) {
            formData.append('isPrivate', isPrivate.toString())
          }
          if (cover) {
            formData.append('cover', cover)
          } else if (cover === null) {
            formData.append('cover', '')
          }

          return {
            body: formData,
            method: 'POST',
            url: 'v1/decks',
          }
        },
      }),
      deleteDeck: builder.mutation<void, DeleteDeckArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = decksService.util.selectInvalidatedBy(getState(), [
            { type: 'Decks' },
          ])
          const patchResults: any[] = []

          invalidateBy.forEach(({ originalArgs }) => {
            patchResults.push(
              dispatch(
                decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                  const itemToDeleteIndex = draft.items.findIndex(deck => deck.id === id)

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
        query: ({ id, ...args }) => ({
          body: args,
          method: 'DELETE',
          url: `v1/decks/${id}`,
        }),
      }),
      deleteFavoriteDeckStatus: builder.mutation<void, { id: string }>({
        invalidatesTags: ['Decks'],

        query: ({ id }) => ({
          method: 'DELETE',
          url: `/v1/decks/${id}/favorite`,
        }),
      }),
      getDeckById: builder.query<Deck, { id: string }>({
        providesTags: ['Deck'],
        query: ({ id }) => ({
          method: 'GET',
          url: `v1/decks/${id}`,
        }),
      }),
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          method: 'GET',
          params: {
            ...(args ?? {}),
            authorId: args?.authorId || undefined,
            currentPage: args?.currentPage || undefined,
            itemsPerPage: args?.itemsPerPage || undefined,
            maxCardsCount: args?.maxCardsCount || 0,
            minCardsCount: args?.minCardsCount || 0,
            name: args?.name || undefined,
            orderBy: args?.orderBy || undefined,
          },
          url: 'v2/decks',
        }),
      }),
      getMinMaxCardsCount: builder.query<MinMaxArgs, void>({
        query: () => ({
          method: 'GET',
          url: '/v2/decks/min-max-cards',
        }),
      }),
      setFavoriteDeck: builder.mutation<void, { id: string }>({
        invalidatesTags: ['Decks'],

        query: ({ id }) => {
          return {
            body: id,
            method: 'POST',
            url: `/v1/decks/${id}/favorite`,
          }
        },
      }),
      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        invalidatesTags: ['Decks', 'Deck'],
        async onQueryStarted({ cover, id, ...args }, { dispatch, getState, queryFulfilled }) {
          const invalidateBy = decksService.util.selectInvalidatedBy(getState(), [
            { type: 'Decks' },
          ])
          const patchResults: any[] = []

          invalidateBy.forEach(({ originalArgs }) => {
            patchResults.push(
              dispatch(
                decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                  const itemToUpdateIndex = draft.items.findIndex(deck => deck.id === id)

                  if (itemToUpdateIndex === -1) {
                    return
                  }
                  Object.assign(draft.items[itemToUpdateIndex], args)
                })
              )
            )
          })

          try {
            // Тут мы будем await дожидаться queryFulfilled, то есть ответ от запроса
            await queryFulfilled // Делаем операцию по подмене данных
          } catch (e) {
            patchResults.forEach(patchResult => patchResult.undo()) // Если будет ошибка, то мы все вернем назад и никому ничего не скажем
          }
        },
        query: ({ cover, id, isPrivate, name }) => {
          const formData = new FormData()

          if (name) {
            formData.append('name', name)
          }

          formData.append('isPrivate', isPrivate ? isPrivate.toString() : 'false')
          if (cover) {
            formData.append('cover', cover)
          } else if (cover === null) {
            formData.append('cover', '')
          }

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
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useDeleteFavoriteDeckStatusMutation,
  useGetDeckByIdQuery,
  useGetDecksQuery,
  useGetMinMaxCardsCountQuery,
  useSetFavoriteDeckMutation,
  useUpdateDeckMutation,
} = decksService
