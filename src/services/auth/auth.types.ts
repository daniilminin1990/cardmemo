export type MeProps = {
  avatar: any
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
export type SignUpProps = {
  email: string
  password: string
}

export type UpdateUserDataProps = {
  avatar: File | string | undefined
  name: string
}
