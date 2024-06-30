import { MeResponse, SignUpResponse } from '@/features/auth/services/auth.types'
import { CardResponse } from '@/services/cards/cards.types'
import { Deck } from '@/services/decks/deck.types'

export const isDeck = (data: Deck): data is Deck => {
  return (
    data &&
    typeof data === 'object' &&
    'name' in data &&
    !('question' in data) &&
    !('avatar' in data) &&
    !('email' in data)
  )
}

export const isCard = (data: CardResponse): data is CardResponse => {
  return data && typeof data === 'object' && 'question' in data && !('name' in data)
}

export const isProfile = (data: MeResponse): data is MeResponse => {
  return data && typeof data === 'object' && 'avatar' in data && !('question' in data)
}
export const isSignUp = (data: SignUpResponse): data is SignUpResponse => {
  return (
    data &&
    typeof data === 'object' &&
    'email' in data &&
    !('question' in data) &&
    !('author' in data)
  )
}
