import { ChangeEvent, useState } from 'react'

import TrashOutline from '@/assets/icons/svg/TrashOutline'
import Input from '@/components/ui/Input/Input'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { TabSwitcher } from '@/components/ui/tabs-switcher/TabSwitcher'
import { UniversalTableDeckMinin } from '@/pagesMinin/DecksTable/DecksTableMinin'
import { ModalAddEditDeck } from '@/pagesMinin/ModalsForTable/ModalAddEditDeck'
import { PageMinin } from '@/pagesMinin/componentsMinin/PageMinin/PageMinin'
import { useQueryParams } from '@/pagesMinin/useQueryParams'
import { initCurrentPage, selectOptionPagination } from '@/pagesMinin/variablesMinin'

import s from '@/pagesMinin/decksPageMinin.module.scss'

import { useGetDecksQuery } from '../../services/flashCardsAPI'

export function DecksMininPage() {
  const {
    clearQuery,
    currentOrderBy,
    currentPage,
    itemsPerPage,
    search,
    setCurrentPageQuery,
    setItemsPerPageQuery,
    setSearchQuery,
    setSortByQuery,
  } = useQueryParams()

  const [open, setOpen] = useState(false)
  const [tabsValue, setTabsValue] = useState('All decks')
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setSearchQuery(e.currentTarget.value)
  }
  // Сортировка
  const handleSort = (key: string) => {
    setSortByQuery(key)
  }
  // tabsSwitcher function to changeTabs
  const tabsSwitcherHandler = (value: string) => {
    // От этого, полагаю тоже можно избавиться через searchParams
    setTabsValue(value)
    //! Сюда нужно прикрутить ID пользователя, чтобы вытащить только его Decks (после урока авторизации)
    // if(value === authorId){
    //   searchParams.set('authorId', value)
    //   setSearchParams(searchParams)
    // } else {
    //   searchParams.delete('authorId')
    //   setSearchParams(searchParams)
    // }
  }

  // Clear filter func on Click
  const onClearFilter = () => {
    clearQuery()
  }

  const { data, error, isLoading } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    name: search,
    orderBy: currentOrderBy,
  })

  const handleItemsPerPageChange = (value: number) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setItemsPerPageQuery(value)
  }
  const handleCurrentPageChange = (value: number) => {
    setCurrentPageQuery(value)
  }

  if (isLoading) {
    return <h1>... Loading</h1>
  }

  if (error) {
    return <h1>Error: {JSON.stringify(error)}</h1>
  }

  return (
    <PageMinin>
      {/*<ModalOnAddDeckMinin open={open} setOpen={setOpen} />*/}
      <ModalAddEditDeck open={open} setOpen={setOpen} />
      <div className={s.heading}>
        <div className={s.headingFirstRow}>
          <Typography as={'h1'} variant={'h1'}>
            Decks list
          </Typography>
          <Button onClick={() => setOpen(true)} variant={'primary'}>
            Add New Deck
          </Button>
        </div>
        <div className={s.headingGrid}>
          <Input
            callback={setSearchQuery}
            className={s.input}
            onChange={handleSearch}
            // querySearch={search}
            type={'search'}
            value={search}
          />
          <TabSwitcher
            className={s.tabsSwitcher}
            label={'Show decks cards'}
            onValueChange={tabsSwitcherHandler}
            tabs={[
              { text: 'My decks', value: 'authorId' }, // ! Тут value должен быть authorId. После авторизации определим
              { text: 'All decks', value: 'allDecks' },
            ]}
            value={tabsValue}
          />
          <div>Slider</div>
          <Button className={s.clearFilter} onClick={onClearFilter} variant={'secondary'}>
            <TrashOutline />
            <Typography variant={'subtitle2'}>Clear Filter</Typography>
          </Button>
        </div>
      </div>
      <UniversalTableDeckMinin
        data={data}
        handleSort={handleSort}
        searchParamsOrderBy={currentOrderBy}
      />
      <div className={s.footer}>
        <PaginationWithSelect
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          selectOptions={selectOptionPagination}
          setCurrentPage={handleCurrentPageChange}
          setItemsPerPage={handleItemsPerPageChange}
          totalItems={data?.pagination.totalItems || 0}
        />
      </div>
    </PageMinin>
  )
}
