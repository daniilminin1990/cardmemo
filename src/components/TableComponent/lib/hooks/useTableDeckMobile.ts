import { useTranslation } from 'react-i18next'

import { headersNameDecks } from '@/common/consts/globalVariables'
import { useMeQuery } from '@/features/auth/services/auth.service'
import { Deck } from '@/services/decks/deck.types'

type Props = {
  item: Deck
  openDeleteModalHandler: (value: boolean) => void
  openEditModalHandler: (value: boolean) => void
  retrieveDeckItem: (item: Deck) => void
}

export const useTableDeckMobile = (props: Props) => {
  const { item } = props
  const { data: meData } = useMeQuery()
  const { t } = useTranslation()

  const updatedAr = new Date(item.updated).toLocaleDateString('ru-RU')

  const name = t(`${headersNameDecks[0].locale}`)
  const cards = t(`${headersNameDecks[1].locale}`)
  const lastUpdated = t(`${headersNameDecks[2].locale}`)
  const createdBy = t(`${headersNameDecks[3].locale}`)

  return {
    cards,
    createdBy,
    lastUpdated,
    meData,
    name,
    updatedAr,
  }
}
