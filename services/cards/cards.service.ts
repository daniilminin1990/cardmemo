import { CardsListResponse, GetCardsArgs } from '../decks/deck.types'
import { flashCardsAPI } from '../flashCardsAPI'

export const cardsService = flashCardsAPI.injectEndpoints({
  endpoints: builder => {
    return {
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

export const { useGetCardsQuery } = cardsService
