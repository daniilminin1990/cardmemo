import { toast } from 'react-toastify'

import { path } from '@/app/routing/path'
import { router } from '@/app/routing/router'
import { flashcardsApi } from '@/common/instance/flashCardsApi'
import {
  ForgotPasswordRequest,
  LoginRequest,
  MeResponse,
  ResetPasswordRequest,
  SignUpRequest,
  TokenResponse,
  UpdateUserDataRequest,
} from '@/features/auth/model/auth.types'

const authServices = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<TokenResponse, LoginRequest>({
        invalidatesTags: ['Auth'],
        async onQueryStarted(_, { queryFulfilled }) {
          const { data } = await queryFulfilled

          console.log(data)
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
        // invalidatesTags: ['Auth'],
        async onQueryStarted() {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          toast.success(`logout successful`)
          await router.navigate(`${path.login}`)
        },
        query: () => ({
          method: 'POST',
          url: `v2/auth/logout`,
        }),
      }),
      me: builder.query<MeResponse, void>({
        providesTags: ['Auth'],
        query: () => `v1/auth/me`,
      }),

      recoverPassword: builder.mutation<void, ForgotPasswordRequest>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/recover-password`,
        }),
      }),
      resetPassword: builder.mutation<void, ResetPasswordRequest>({
        query: ({ password, token }) => ({
          body: { password },
          method: 'POST',
          url: `v1/auth/reset-password/${token}`,
        }),
      }),
      signUp: builder.mutation<MeResponse, SignUpRequest>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/auth/sign-up`,
        }),
      }),
      updateUserData: builder.mutation<MeResponse, UpdateUserDataRequest>({
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
} = authServices
