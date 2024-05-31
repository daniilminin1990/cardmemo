import { FormValuesAddEditDeck } from '@/common/zodSchemas/decks/decks.schemas'
import { Deck } from '@/services/decks/deck.types'

export const getEditDeckNotifyMsg = ({
  data,
  item,
  preview,
}: {
  data: FormValuesAddEditDeck
  item?: Deck
  preview: null | string
}) => {
  let message = ''

  if (data.name === item?.name) {
    message += 'Deck name is equal to previous. '
  }
  if (preview === item?.cover) {
    message = 'Image is equal to previous. '
  }
  if (data.name === item?.name && preview === item?.cover) {
    message = 'Deck name and cover image are equal to previous. '
  }

  return `${message}It is ok, just let you know 👌`
}
