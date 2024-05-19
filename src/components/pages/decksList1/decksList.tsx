import TrashOutline from '@/assets/icons/svg/TrashOutline'
import { CommonPagination } from '@/components/pages/common/pagination/commonPagination'
import { Deck } from '@/components/pages/decksList1/decks/deck/deck'
import { Decks } from '@/components/pages/decksList1/decks/decks'
import { useDecksList } from '@/components/pages/decksList1/hooks/useDecksList'
import { ModalAddDeck } from '@/components/pages/decksList1/modal/addModal/addDeckModal'
import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { TabSwitcher } from '@/components/ui/tabs-switcher/TabSwitcher'

import s from './decksList.module.scss'

export const DecksList = () => {
  const {
    activeTab,
    changeTabHandler,
    clearFilterHandler,
    clearSearchFieldHandler,
    currentPage,
    currentPageHandler,
    data,
    handleSearch,
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
        <div className={s.filter}>
          <Input
            callback={clearSearchFieldHandler}
            className={s.input}
            onChange={handleSearch}
            type={'search'}
          />

          <TabSwitcher
            className={s.tabSwitch}
            label={'Show decks cards'}
            onValueChange={changeTabHandler}
            tabs={[
              { text: 'MyCards', value: 'MyCards' },
              { text: 'All Cards', value: 'All Cards' },
            ]}
            value={activeTab}
          />

          <Typography
            as={'label'}
            className={s.label}
            style={{ border: '1px solid red', width: '250px' }}
            variant={'body2'}
          >
            Number of cards
            <div>Slider</div>
          </Typography>

          <Button className={s.clearBtn} onClick={clearFilterHandler} variant={'secondary'}>
            <TrashOutline className={s.trashOutlineIcon} />
            <Typography className={s.text} variant={'subtitle2'}>
              Clear Filter
            </Typography>
          </Button>
        </div>

        {isLoading ? (
          <div>Loading...</div>
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
