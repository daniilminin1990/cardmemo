import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Loading from '@/components/ui/Loading/Loading'
import { LoadingBar } from '@/components/ui/LoadingBar/LoadingBar'
import { Page } from '@/components/ui/Page/Page'
import { useGetCardsQuery } from '@/features/cards/api/cardsApi'
import { CardResponse } from '@/features/cards/api/cardsApi.types'
import { useCards } from '@/features/cards/lib/hooks/useCards'
import {
  AddEditCard,
  AddEditDeck,
  DeleteCard,
  DeleteDeck,
  Empty,
  HeadingCardsPage,
  Table,
} from '@/features/cards/ui/Cards/components'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service'

import s from './Cards.module.scss'

const Cards = () => {
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

  const { isCardsCountZero, isMineCards, loadingStatus } = useCards({
    currentData,
    currentDeckData,
    isDeckLoading,
    isFetching,
  })

  if (isLoading || isDeckLoading || isDeckFetching) {
    return <Loading type={'pageLoader'} />
  }

  return (
    <>
      {loadingStatus && <LoadingBar />}
      <Page className={s.common} mt={'24px'}>
        <Empty />
        <AddEditDeck item={currentDeckData} />
        <AddEditCard item={cardItem} />
        <DeleteDeck deckData={deckData} deckId={deckId} />
        <DeleteCard cardItem={cardItem} />
        <HeadingCardsPage
          deckId={deckId}
          isCardsCountZero={isCardsCountZero}
          isMineCards={isMineCards}
        />
        <Table deckId={deckId} setCardItem={setCardItem} />
      </Page>
    </>
  )
}

export default Cards
