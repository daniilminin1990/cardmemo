import { Button } from '@/common/components/button'
import { CommonPagination } from '@/common/components/commonPagination/commonPagination'
import { CommonTable } from '@/common/components/commonTable/commonTable'
import { Loading } from '@/common/components/loading/loading'
import Typography from '@/common/components/typography/typography'
import { useDecksList } from '@/features/decksList/lib/hooks/useDecksList'
import { ModalAddDeck } from '@/features/decksList/ui/addModal/addDeckModal'
import { Deck } from '@/features/decksList/ui/deck/deck'
import { DecksFilters } from '@/features/decksList/ui/filters/decksFilters'

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
          <CommonTable
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
