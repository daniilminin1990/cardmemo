import { handleToastInfo, handleToastSuccess } from '@/common/consts/toastVariants'
import { isCard, isDeck, isProfile, isSignUp } from '@/common/predicateTypes'
import { MeResponse, SignUpResponse } from '@/features/auth/services/auth.types'
import { CardResponse } from '@/services/cards/cards.types'
import { Deck } from '@/services/decks/deck.types'
import i18n from 'i18next'

export const successApiResponse = (result: any) => {
  const t = i18n.t

  if (result && result.meta && result.meta.response) {
    const { status, statusText, url } = result.meta.response
    const { method } = result.meta.request
    const data = result.data

    if (method === 'PATCH') {
      if (status === 200 && statusText === 'OK') {
        if (isDeck(data as Deck)) {
          const message = `${(data as Deck).name} - ${t('successApiResponse.update.deck')}  `

          handleToastSuccess(message)
        }
        if (isCard(data as CardResponse)) {
          const message = `${(data as CardResponse).question} - ${t(
            'successApiResponse.update.card'
          )} `

          handleToastSuccess(message)
        }
        if (isProfile(data as MeResponse)) {
          const message = `${t('successApiResponse.update.profile')}`

          handleToastSuccess(message)
        }
      }
    } else if (method === 'POST') {
      if (status === 200 && statusText === 'OK') {
        if (`refreshToken` in data) {
          const message = `${t('successApiResponse.loggedIn')}`

          handleToastInfo(message)
        }
      }
      if (status === 201 && statusText === 'Created') {
        if (isDeck(data as Deck)) {
          const message = `${(data as Deck).name}  - ${t('successApiResponse.creation.deck')}  `

          handleToastSuccess(message)
        }
        if (isCard(data as CardResponse)) {
          const message = `${(data as CardResponse).question}  - ${t(
            'successApiResponse.creation.card'
          )}  `

          handleToastSuccess(message)
        }
        if (isSignUp(data as SignUpResponse)) {
          const message = t('successApiResponse.registrationSuccessful')

          handleToastSuccess(message)
        }
      }
      if (status === 204 && statusText === 'No Content') {
        if (url.endsWith('/logout')) {
          const kostilb = setTimeout(() => {
            const message = t('successApiResponse.logOut')

            handleToastInfo(message)

            return () => {
              clearTimeout(kostilb)
            }
          }, 1)
        }
        if (url.endsWith('/favorite')) {
          const message = t('successApiResponse.favorites')

          handleToastSuccess(message)
        }
      }
    } else if (method === 'DELETE') {
      if (status === 200 && statusText === 'OK') {
        const message = `${(data as Deck).name}  - ${t('successApiResponse.deletion.deck')}  `

        handleToastSuccess(message)
      }
      if (status === 204 && statusText === 'No Content') {
        if (url.endsWith('/favorite')) {
          const message = t('successApiResponse.deleteFavorites')

          handleToastSuccess(message)
        } else {
          const message = t('successApiResponse.deleted')

          handleToastSuccess(message)
        }
      }
    }
  }
}
