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
            console.log(e)
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
        query: ({ id, ...args }) => ({
          body: args,
          method: 'DELETE',
          url: `v1/decks/${id}`,
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
            maxCardsCount: args?.maxCardsCount || undefined,
            minCardsCount: args?.minCardsCount || undefined,
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
      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
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
  useGetDeckByIdQuery,
  useGetDecksQuery,
  useGetMinMaxCardsCountQuery,
  useUpdateDeckMutation,
} = decksService
