import { handleToastSuccess } from '@/common/consts/toastVariants'
import { isCard, isDeck, isProfile, isSignUp } from '@/common/predicateTypes'
import { MeResponse, SignUpResponse } from '@/services/auth/auth.types'
import { CardResponse } from '@/services/cards/cards.types'
import { Deck } from '@/services/decks/deck.types'

export const successApiResponse = (result: any) => {
  if (result && result.meta && result.meta.response) {
    const { status, statusText, url } = result.meta.response
    const { method } = result.meta.request
    const data = result.data

    if (method === 'PATCH') {
      if (status === 200 && statusText === 'OK') {
        if (isDeck(data as Deck)) {
          handleToastSuccess(`Update deck ${(data as Deck).name} - successful!`)
        }
        if (isCard(data as CardResponse)) {
          handleToastSuccess(`Update card ${(data as CardResponse).question} - successful!`)
        }
        if (isProfile(data as MeResponse)) {
          handleToastSuccess(`Update profile - successful!`)
        }
      }
    } else if (method === 'POST') {
      if (status === 200 && statusText === 'OK') {
        if (`refreshToken` in data) {
          handleToastSuccess(`Loggined!`)
        }
      }
      if (status === 201 && statusText === 'Created') {
        if (isDeck(data as Deck)) {
          handleToastSuccess(`Creation deck ${(data as Deck).name} - successful!`)
        }
        if (isCard(data as CardResponse)) {
          handleToastSuccess(`Creation card ${(data as CardResponse).question} - successful!`)
        }
        if (isSignUp(data as SignUpResponse)) {
          handleToastSuccess(`Registration successful!`)
        }
      }
      if (status === 204 && statusText === 'No Content' && url.endsWith('/logout')) {
        handleToastSuccess(`Logout - successful!`)
      }
    } else if (method === 'DELETE') {
      if (status === 200 && statusText === 'OK') {
        handleToastSuccess(`Deletion deck ${(data as Deck).name} - successful!`)
      } else if (status === 204 && statusText === 'No Content') {
        handleToastSuccess(`Deletion card - successful!`)
      } else {
        handleToastSuccess('Deletion - successful!')
      }
    }
  }
}
