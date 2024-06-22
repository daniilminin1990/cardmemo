import { useTranslation } from 'react-i18next'

import { CardsListResponse } from '@/features/cards/api/cardsApi.types'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useMeQuery } from '@/services/auth/auth.service'
import { Deck } from '@/services/decks/deck.types'

type Props = {
  currentData?: CardsListResponse
  currentDeckData?: Deck
  isDeckLoading: boolean
  isFetching: boolean
}

export const useCards = ({ currentData, currentDeckData, isDeckLoading, isFetching }: Props) => {
  const { search } = useQueryParams()

  const { data: meData } = useMeQuery()

  const { t } = useTranslation()

  const isCardsCountZero = currentData?.items.length === 0

  const isMineCards = currentDeckData?.userId === meData?.id

  const loadingStatus = isFetching || isDeckLoading

  const conditionIsMineMessage = isMineCards
    ? `${t('cardsPage.emptyDeck')}`
    : `${t('cardsPage.unfortunatelyEmptyDeck')}`

  const conditionMessage =
    search !== '' ? `${t('cardsPage.noResultsFound')}` : conditionIsMineMessage

  return { conditionMessage, isCardsCountZero, isMineCards, loadingStatus }
}
