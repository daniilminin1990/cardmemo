import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  CardsListResponse,
  CreateDeckArgs,
  Deck,
  DecksListResponse,
  DeleteDeckArgs,
  GetCardsArgs,
  GetDecksArgs,
  UpdateDeckArgs,
} from './decks/deck.types'
export const flashCardsAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Deck'],
        query: ({ cover, isPrivate, name }) => {
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
            method: 'POST',
            url: 'v1/decks',
          }
        },
      }),
      deleteDeck: builder.mutation<void, DeleteDeckArgs>({
        invalidatesTags: ['Deck'],
        query: ({ id, ...args }) => ({
          body: args,
          method: 'DELETE',
          url: `v1/decks/${id}`,
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
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Deck'],
        query: args => ({
          method: 'GET',
          params: {
            ...(args ?? {}),
            authorId: args?.authorId || undefined,
            currentPage: args?.currentPage || undefined,
            itemsPerPage: args?.itemsPerPage || undefined,
            name: args?.name || undefined,
            orderBy: args?.orderBy || undefined,
          },
          url: 'v2/decks',
        }),
      }),
      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        invalidatesTags: ['Deck'],
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
  tagTypes: ['Deck', 'Card'],
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetCardsQuery,
  useGetDecksQuery,
  useUpdateDeckMutation,
} = flashCardsAPI
