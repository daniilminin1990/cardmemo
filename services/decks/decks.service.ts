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

          console.log(invalidateBy)

          try {
            const { data } = await queryFulfilled // тут будет deckData

            console.log(11111111111111, data)
            invalidateBy.forEach(({ originalArgs }) => {
              dispatch(
                decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                  if (originalArgs.currentPage !== 1) {
                    return
                  } // Вот так делать в реальном проекте нельзя
                  console.log('маГипуляция', data)
                  draft.items.unshift(data) // Добавляем первый элемент
                  draft.items.pop() // Удаляем последний элемент
                })
              )
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
          ]) // Тут диспатч не нужен (хз почему тут не нужен, а для patchResult нужен - в доке так написано
          const patchResults: any[] = [] // Делаем массив для кэшированных уникальных состояний от запросов getDecks И К СОЖАЛЕНИЮ ТИПИЗИРУЕМ как any, а Deck не можем вставить тип потому что это специальный объект RTKQ

          // forEach по invalidateBy
          invalidateBy.forEach(({ originalArgs }) => {
            // Сюда придут аргументы originalArgs, то есть до подмены
            patchResults.push(
              dispatch(
                decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                  const itemToUpdateIndex = draft.items.findIndex(deck => deck.id === id)

                  if (itemToUpdateIndex === -1) {
                    return
                  }
                  Object.assign(draft.items[itemToUpdateIndex], args) // ЗАМЕТЬ -- COVER не передали, потому что у него формат данных - File, а мы тут не можем file ебануть, только string
                })
              )
            ) // updateQueryData принимает 3 параметра, 1 - название endpoint на который уже прошел запрос (а это GET, мы же у него будем подменять данные), то есть то, что закэшировал RTKQ, 2 -  аргументы (то, что будем менять) - originalArgs, а 3 параметром - колбек который называется updater (как редьюсер в RTK)
            // Если залогируем console.log(current.draft()), то увидим state каждого getDeck с подписчиками до отправки запроса на изменение
            // Так как нам обновить нужные данные -- а у нас есть id deck в onQueryStarted в аргументах. Мы ее можем найти есть ли в уникальных getDecks данных нужный нам id, если нет - не трогаем, если есть - произвести подмену.
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
