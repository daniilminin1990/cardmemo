import { flashCardsAPI } from '../flashCardsAPI'
import { LoginArgs, LoginResponse, MeResponse } from './auth.types'

export const authService = flashCardsAPI.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<LoginResponse, LoginArgs>({
        query: data => ({
          body: data,
          method: 'POST',
          url: `v1/auth/login`,
        }),
      }),
      me: builder.query<MeResponse, void>({
        query: () => ({
          method: 'GET',
          url: `v1/auth/me`,
        }),
      }),
    }
  },
})

export const { useLoginMutation, useMeQuery } = authService
