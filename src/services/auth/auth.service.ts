import { flashCardsAPI } from '../flashCardsAPI'
import { LoginArgs, LoginResponse, MeResponse, UpdateUserDataRequest } from './auth.types'

export const authService = flashCardsAPI.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<LoginResponse, LoginArgs>({
        invalidatesTags: ['Me'],
        async onQueryStarted(_, { queryFulfilled }) {
          const { data } = await queryFulfilled

          if (!data) {
            return
          }

          localStorage.setItem('accessToken', data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken)
        },
        query: data => ({
          body: data,
          method: 'POST',
          url: `v1/auth/login`,
        }),
      }),
      logout: builder.mutation<void, void>({
        // invalidatesTags: ['Me'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          dispatch(authService.util.resetApiState())
        },
        query: () => ({
          method: 'POST',
          url: `v2/auth/logout`, // Поменял на v2
        }),
      }),
      me: builder.query<MeResponse, void>({
        providesTags: ['Me'],
        query: () => ({
          method: 'GET',
          url: `v1/auth/me`,
        }),
      }),
      updateUserData: builder.mutation<MeResponse, UpdateUserDataRequest>({
        invalidatesTags: ['Me'],
        query: ({ avatar, name }) => {
          const formData = new FormData()

          avatar && formData.append('avatar', avatar)
          name && formData.append('name', name)

          return {
            body: formData,
            method: 'PATCH',
            url: `v1/auth/me`,
          }
        },
      }),
    }
  },
})

export const { useLoginMutation, useLogoutMutation, useMeQuery, useUpdateUserDataMutation } =
  authService
