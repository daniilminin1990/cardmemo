import Loading from '@/components/ui/Loading/Loading'
import { Page } from '@/components/ui/Page/Page'
import { LoadingBar } from '@/components/ui/loadingBar/LoadingBar'
import { useCards } from '@/features/cards/lib/hooks/useCards'
import {
  AddEditCard,
  AddEditDeck,
  DeleteCard,
  DeleteDeck,
  HeadingCardsPage,
  Table,
} from '@/features/cards/ui/Cards/components'
import { Empty } from '@/features/cards/ui/Cards/components/modals/Empty/Empty'

import s from './CardsPage.module.scss'

const CardsPage = () => {
  const {
    cardItem,
    currentDeckData,
    deckData,
    deckId,
    isCardsCountZero,
    isCardsLoader,
    isMineCards,
    loadingStatus,
    setCardItem,
  } = useCards()

  if (isCardsLoader) {
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

export default CardsPage
