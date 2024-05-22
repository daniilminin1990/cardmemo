import { Loading } from '@/components/pages/common/loading/loading'
import { CommonPagination } from '@/components/pages/common/pagination/commonPagination'
import { Deck } from '@/components/pages/decksList1/decks/deck/deck'
import { Decks } from '@/components/pages/decksList1/decks/decks'
import { DecksFilters } from '@/components/pages/decksList1/filters/decksFilters'
import { useDecksList } from '@/components/pages/decksList1/hooks/useDecksList'
import { ModalAddDeck } from '@/components/pages/decksList1/modal/addModal/addDeckModal'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'

import s from './decksList.module.scss'

export const DecksList = () => {
  const {
    currentPage,
    currentPageHandler,
    data,
    isAddModal,
    isLoading,
    itemsPerPage,
    itemsPerPageHandler,
    setIsAddModal,
    showModalAddHandler,
    totalItems,
  } = useDecksList()

  return (
    <>
      <ModalAddDeck open={isAddModal} setOpen={setIsAddModal} />
      <section className={s.root}>
        <div className={s.head}>
          <Typography as={'h1'} variant={'h1'}>
            Decks List
          </Typography>
          <Button className={s.addBtn} onClick={showModalAddHandler}>
            <Typography as={'span'} variant={'subtitle2'}>
              Add New Deck
            </Typography>
          </Button>
        </div>

        <DecksFilters />

        {isLoading ? (
          <Loading />
        ) : (
          <Decks
            Component={Deck}
            data={data?.items}
            headersName={[
              { key: 'name', title: 'Name' },
              { key: 'cardsCount', title: 'Cards' },
              { key: 'updated', title: 'Last Updated' },
              { key: 'created', title: 'Created by' },
            ]}
            sortedColumn={'updated'}
          />
        )}
        <CommonPagination
          currentPage={currentPage}
          currentPageHandler={currentPageHandler}
          itemsPerPage={itemsPerPage}
          itemsPerPageHandler={itemsPerPageHandler}
          totalItems={totalItems}
        />
      </section>
    </>
  )
}
