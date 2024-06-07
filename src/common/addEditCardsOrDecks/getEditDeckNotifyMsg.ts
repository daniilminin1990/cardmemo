import { useTranslation } from 'react-i18next'

import { FormValuesAddEditDeck } from '@/common/zodSchemas/decks/decks.schemas'
import { Deck } from '@/services/decks/deck.types'
import i18n from 'i18next'

export const getEditDeckNotifyMsg = ({
  data,
  item,
  preview,
}: {
  data: FormValuesAddEditDeck
  item?: Deck
  preview: null | string
}) => {
  const t = i18n.t
  let message = ''

  if (data.name === item?.name) {
    message += `${t(`successApiResponse.commonInfo.equal.deckName`)}`
  }
  if (preview === item?.cover) {
    message = `${t(`successApiResponse.commonInfo.equal.deckImg`)}`
  }
  if (data.name === item?.name && preview === item?.cover) {
    message = `${t(`successApiResponse.commonInfo.equal.common`)}`
  }

  return `${message} ${t(`successApiResponse.commonInfo.equal.success`)}`
}
