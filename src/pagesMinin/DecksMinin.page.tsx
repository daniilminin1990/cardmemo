import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import Input from '@/components/ui/Input/Input'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { TabSwitcher } from '@/components/ui/tabs-switcher/TabSwitcher'
import { UniversalTableDeckMinin } from '@/pagesMinin/DecksTable/DecksTableMinin'
import { ModalOnAddDeckMinin } from '@/pagesMinin/ModalsForTable/ModalOnAddDeckMinin'
import { selectOptionPagination, updateSearchParams } from '@/pagesMinin/variablesMinin'

import s from '@/pagesMinin/decksPageMinin.module.scss'

import { useGetDecksQuery } from '../../services/flashCardsAPI'

export function DecksMininPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const itemsPerPage = Number(searchParams.get('itemsPerPage') ?? 10)
  const currentPage = Number(searchParams.get('currentPage') ?? 1)
  const search = searchParams.get('search') ?? ''
  const currentOrderBy = searchParams.get('orderBy')

  const [open, setOpen] = useState(false)
  const [tabsValue, setTabsValue] = useState('All decks')

  // Сортировка
  const handleSort = (key: string) => {
    let newOrderBy

    // Проверяем текущее состояние и определяем новое состояние
    if (currentOrderBy === `${key}-asc`) {
      newOrderBy = `${key}-desc`
    } else if (currentOrderBy === `${key}-desc`) {
      newOrderBy = null
    } else {
      newOrderBy = `${key}-asc`
    }

    // Обновляем Query-параметр orderBy
    if (newOrderBy) {
      searchParams.set('orderBy', newOrderBy)
    } else {
      searchParams.delete('orderBy')
    }
    setSearchParams(searchParams)
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
    updateSearchParams({
      currentPage: 1,
      itemsPerPage: 10,
      search: '',
      searchParams,
      setSearchParams,
    })
    searchParams.delete('orderBy')
    // searchParams.delete('authorId')
    setSearchParams(searchParams)
  }

  const { data, error, isLoading } = useGetDecksQuery({
    currentPage: Number(searchParams.get('currentPage')),
    itemsPerPage: Number(searchParams.get('itemsPerPage')),
    name: searchParams.get('search') || undefined,
    orderBy: searchParams.get('orderBy') || undefined,
  })

  const handleItemsPerPageChange = (value: number) => {
    updateSearchParams({
      currentPage: 1,
      itemsPerPage: value,
      search,
      searchParams,
      setSearchParams,
    })
  }
  const handleCurrentPageChange = (value: number) => {
    updateSearchParams({
      currentPage: value,
      itemsPerPage,
      search,
      searchParams,
      setSearchParams,
    })
  }
  const handleSearch = (value: string) => {
    updateSearchParams({
      currentPage: 1,
      itemsPerPage,
      search: value,
      searchParams,
      setSearchParams,
    })
  }

  if (isLoading) {
    return <h1>... Loading</h1>
  }

  if (error) {
    return <h1>Error: {JSON.stringify(error)}</h1>
  }

  return (
    <div>
      <ModalOnAddDeckMinin open={open} setOpen={setOpen} />
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
            callback={handleSearch}
            className={s.input}
            onChange={e => handleSearch(e.target.value)}
            querySearch={searchParams.get('search')}
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
            Clear Filter
          </Button>
        </div>
      </div>
      <UniversalTableDeckMinin
        data={data}
        handleSort={handleSort}
        searchParamsOrderBy={searchParams.get('orderBy') || ''}
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
    </div>
  )
}
