import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useQueryParams } from '@/common/hooks/useQueryParams'
import { useMeQuery } from '@/features/auth/services/auth.service'
import { useGetCardsQuery } from '@/features/cards/api/cardsApi'
import { CardResponse } from '@/features/cards/api/cardsApi.types'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service'

export const useCards = () => {
  const { currentOrderBy, currentPage, debouncedSearchValue, itemsPerPage } = useQueryParams()

  const { deckId = '' } = useParams()

  const {
    currentData: currentDeckData,
    data: deckData,
    isFetching: isDeckFetching,
    isLoading: isDeckLoading,
  } = useGetDeckByIdQuery({ id: deckId })

  const { currentData, isFetching, isLoading } = useGetCardsQuery(
    {
      args: { currentPage, itemsPerPage, orderBy: currentOrderBy, question: debouncedSearchValue },
      id: deckId ?? '',
    },
    { skip: !currentDeckData }
  )

  const [cardItem, setCardItem] = useState<CardResponse>()

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

  const isCardsLoader = isLoading || isDeckLoading || isDeckFetching

  return {
    cardItem,
    conditionMessage,
    currentDeckData,
    deckData,
    deckId,
    isCardsCountZero,
    isCardsLoader,
    isMineCards,
    loadingStatus,
    setCardItem,
  }
}
