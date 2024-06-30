import { path } from '@/app/router/path'
import { router } from '@/app/router/router'

import {
  LoginArgs,
  LoginResponse,
  MeResponse,
  RecoverPasswordRequest,
  ResetPasswordRequest,
  SignUpRequest,
  SignUpResponse,
  UpdateUserDataRequest,
} from '../../../features/auth/services/auth.types'
import { flashCardsAPI } from '../../../services/flashCardsAPI'

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
          url: `v2/auth/logout`,
        }),
      }),
      me: builder.query<MeResponse, void>({
        providesTags: ['Me'],
        query: () => ({
          method: 'GET',
          url: `v1/auth/me`,
        }),
      }),
      recoverPassword: builder.mutation<void, RecoverPasswordRequest>({
        query: body => ({
          body,
          method: 'POST',
          url: 'v1/auth/recover-password',
        }),
      }),
      resetPassword: builder.mutation<void, ResetPasswordRequest>({
        query: ({ password, token }) => ({
          body: { password },
          method: 'POST',
          url: `v1/auth/reset-password/${token}`,
        }),
      }),
      signUp: builder.mutation<SignUpResponse, SignUpRequest>({
        async onQueryStarted(_, { queryFulfilled }) {
          await queryFulfilled
          await router.navigate(`${path.login}`)
        },
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/sign-up`,
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

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRecoverPasswordMutation,
  useResetPasswordMutation,
  useSignUpMutation,
  useUpdateUserDataMutation,
} = authService
