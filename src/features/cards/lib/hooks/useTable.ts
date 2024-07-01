import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'

import { ModalKey, useModal } from '@/common/hooks/useModal'
import { useQueryParams } from '@/common/hooks/useQueryParams'
import { useMeQuery } from '@/features/auth/services/auth.service'
import { useGetCardsQuery } from '@/services/cards/cards.service'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service'

type Props = {
  deckId: string
}

export const useTable = ({ deckId }: Props) => {
  const { currentOrderBy, currentPage, debouncedSearchValue, itemsPerPage, search } =
    useQueryParams()

  const { currentData: currentDeckData, isLoading: isDeckLoading } = useGetDeckByIdQuery({
    id: deckId,
  })

  const { currentData, data, isFetching, isLoading } = useGetCardsQuery(
    {
      args: { currentPage, itemsPerPage, orderBy: currentOrderBy, question: debouncedSearchValue },
      id: deckId ?? '',
    },
    { skip: !currentDeckData }
  )
  const { t } = useTranslation()
  const { data: meData } = useMeQuery()
  const isMineCards = currentDeckData?.userId === meData?.id
  const conditionIsMineMessage = isMineCards
    ? `${t('cardsPage.emptyDeck')}`
    : `${t('cardsPage.unfortunatelyEmptyDeck')}`

  const conditionMessage =
    search !== '' ? `${t('cardsPage.noResultsFound')}` : conditionIsMineMessage

  const isCardsCountZero = currentData?.items.length === 0
  const cardsData = currentData ?? data
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 860px)' })
  const loadingStatus = isFetching || isDeckLoading
  const { setOpen: setIsDeleteCardModal } = useModal(ModalKey.DeleteCard)
  const { setOpen: setIsUpdateCardModal } = useModal(ModalKey.EditCard)
  const { setOpen: setIsCreateCardModal } = useModal(ModalKey.AddCard)

  return {
    cardsData,
    conditionMessage,
    currentData,
    isCardsCountZero,
    isFetching,
    isLoading,
    isMineCards,
    isTabletOrMobile,
    loadingStatus,
    search,
    setIsCreateCardModal,
    setIsDeleteCardModal,
    setIsUpdateCardModal,
  }
}
