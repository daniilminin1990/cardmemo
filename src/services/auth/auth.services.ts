import {
  MeProps,
  SignUpProps,
  SignUpResponse,
  UpdateUserDataProps,
} from '@/services/auth/auth.types'
import { flashcardsApi } from '@/services/flashCardsApi'

const authServices = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<void, any>({
        invalidatesTags: ['Auth'],
        async onQueryStarted(_, { queryFulfilled }) {
          const { data } = await queryFulfilled

          if (!data) {
            return
          }
          localStorage.setItem('accessToken', data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken)
        },
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/login`,
        }),
      }),
      logout: builder.mutation<void, void>({
        invalidatesTags: ['Auth'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/logout`,
        }),
      }),
      me: builder.query<MeProps, void>({
        providesTags: ['Auth'],
        query: () => `v1/auth/me`,
      }),

      recoverPassword: builder.mutation<void, any>({
        // invalidatesTags: ['Auth'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/recover-password`,
        }),
      }),
      refreshToken: builder.mutation<void, any>({
        // invalidatesTags: ['Auth'],
        query: () => ({
          method: 'POST',
          url: `v2/auth/refresh-token`,
        }),
      }),
      resendVerifyEmail: builder.mutation<void, any>({
        // invalidatesTags: ['Cards'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/resend-verification-email`,
        }),
      }),
      resetPassword: builder.mutation<void, any>({
        // invalidatesTags: ['Cards'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/reset-password/{token}`,
        }),
      }),
      signUp: builder.mutation<MeProps, SignUpProps>({
        // invalidatesTags: ['Cards'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/sign-up`,
        }),
      }),
      updateUserData: builder.mutation<MeProps, UpdateUserDataProps>({
        invalidatesTags: ['Auth'],
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
      verifyEmail: builder.mutation<void, any>({
        // invalidatesTags: ['Cards'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/verify-email`,
        }),
      }),
    }
  },
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRecoverPasswordMutation,
  useSignUpMutation,
  useUpdateUserDataMutation,
} = authServices
