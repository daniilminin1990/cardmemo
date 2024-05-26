export type LoginResponse = {
  accessToken: string
  refreshToken: string
  // В API называется Sign in using email and password. Must have an acc to do so.
}

// LoginResponse может принимать аргументы
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
  // Какого то черта в API называется Current user data И Update user data
  // "avatar": "…",
  // "id": "…",
  // "email": "…",
  // "isEmailVerified": true,
  // "name": "…",
  // "created": "…",
  // "updated": "…"
  //! Update отличается тем, что он принимает в body avatar и name и метод Patch
  //! Body - multipart/form-data
}

export type UpdateMeResponse = MeResponse

export type UpdateUserDataRequest = {
  avatar?: File | string
  name?: string
}
export type SignUpRequest = {
  email: string
  password: string
}

export type ResetPasswordRequest = {
  password: string
  token: string
}
