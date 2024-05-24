export type MeResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
export type SignUpRequest = {
  email: string
  password: string
}
export type LoginRequest = {
  rememberMe?: boolean
} & SignUpRequest

export type UpdateUserDataRequest = {
  avatar?: File | string
  name?: string
}
export type TokenResponse = {
  accessToken: string
  refreshToken: string
}

export type ForgotPasswordRequest = {
  email: string
  html?: string
  subject?: string
}
export type ResetPasswordRequest = {
  password: string
  token: string
}
