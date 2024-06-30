export type LoginResponse = {
  accessToken: string
  refreshToken: string
}

export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}

export type MeResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export type UpdateUserDataRequest = {
  avatar?: File | string
  name?: string
}
export type SignUpRequest = {
  email: string
  password: string
}
export type SignUpResponse = {
  email: string
  id: string
  name: string
}

export type ResetPasswordRequest = {
  password: string
  token: string
}

export type RecoverPasswordRequest = {
  email: string
  html: string
}
