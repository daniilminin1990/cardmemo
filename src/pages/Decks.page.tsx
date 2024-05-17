import { ChangeEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { ArrowIosDownOutline } from '@/assets/icons/svg'
import Input from '@/components/ui/Input/Input'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { TabSwitcher } from '@/components/ui/tabs-switcher/TabSwitcher'
import { ModalOnAddDeck } from '@/pages/ModalOnAddDeck'
import { SingleRowDeck } from '@/pages/SingleRowDeck'
import { headersNameDecks, selectOptionPagination, updateSearchParams } from '@/pages/variables'

import s from '@/pages/decksPage.module.scss'

import { DecksListResponse } from '../../services/decks/deck.types'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '../../services/flashCardsAPI'

export function DecksPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('currentPage')) || 1
  )
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    Number(searchParams.get('itemsPerPage')) || 10
  )
  const [search, setSearch] = useState<string>(searchParams.get('search') || '')
  const [open, setOpen] = useState(false)
  const [tabsValue, setTabsValue] = useState('All decks')

  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1)
    setSearch(e.target.value)
  }

  // Сортировка
  const handleSort = (key: string) => {
    const currentOrderBy = searchParams.get('orderBy')
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
    setCurrentPage(1)
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
    searchParams.delete('search')
    setSearch('')
    searchParams.delete('itemsPerPage')
    setItemsPerPage(10)
    searchParams.delete('currentPage')
    setCurrentPage(1)
    searchParams.delete('orderBy')
    // searchParams.delete('authorId')
    setSearchParams(searchParams)
  }

  const { data, error, isLoading } = useGetDecksQuery({
    currentPage: Number(searchParams.get('currentPage')),
    itemsPerPage: Number(searchParams.get('itemsPerPage')),
    name: search,
    orderBy: searchParams.get('orderBy') || undefined,
  })
  const [createDeck] = useCreateDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const onSubmit = (data: any) => {
    // Тип пока any. С пониманием того, какие данные нужно передавать для добавления Deck, тогда и определим
    createDeck(data)
    setCurrentPage(1)
    setItemsPerPage(10)
    setSearch('')
    updateSearchParams({ currentPage, itemsPerPage, search, searchParams, setSearchParams })
  }

  useEffect(() => {
    updateSearchParams({ currentPage, itemsPerPage, search, searchParams, setSearchParams })
  }, [currentPage, itemsPerPage, search])

  if (isLoading) {
    return <h1>... Loading</h1>
  }

  if (error) {
    return <h1>Error: {JSON.stringify(error)}</h1>
  }

  return (
    <div>
      <ModalOnAddDeck onSubmit={onSubmit} open={open} setOpen={setOpen} />
      <div
        style={{
          display: 'grid',
          gap: '7px',
          gridTemplateRows: 'auto 1fr',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography as={'h1'} variant={'h1'}>
            Decks list
          </Typography>
          <Button onClick={() => setOpen(true)} variant={'primary'}>
            Open Modal
          </Button>
        </div>
        <div
          style={{
            alignItems: 'end',
            columnGap: '25px',
            display: 'grid',
            gridTemplateColumns: '300px 231px 250px 1fr',
            marginBottom: '36px',
          }}
        >
          <Input
            callback={search => setSearch(search)}
            className={s.input}
            onChange={onSearchHandler}
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
          <Button onClick={onClearFilter} variant={'secondary'}>
            Clear Filter
          </Button>
        </div>
      </div>
      <div style={{ marginBottom: '24px' }}>
        <UniversalTableDeckMinin
          data={data}
          handleSort={handleSort}
          onDeleteClick={id => deleteDeck({ id })}
          onEditClick={(id, name) => updateDeck({ id, name })}
          searchParamsOrderBy={searchParams.get('orderBy') || ''}
        />
      </div>
      <PaginationWithSelect
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        placeholder={itemsPerPage.toString()}
        selectOptions={selectOptionPagination}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        totalItems={data?.pagination.totalItems || 0}
      />
      {/*<UniversalTableDeck data={data} sortedColumn={headersNameDecks[0].key} />*/}
    </div>
    // <Decks />
  )
}

type UniversalTableDeckMininType = {
  data?: DecksListResponse
  handleSort?: (key: string) => void
  onDeleteClick?: (id: string) => void
  onEditClick?: (id: string, name: string) => void
  searchParamsOrderBy?: string
}
const UniversalTableDeckMinin = ({
  data,
  handleSort,
  onDeleteClick, // Для удаления Deck
  onEditClick, // Для изменения Deck
  searchParamsOrderBy,
}: UniversalTableDeckMininType) => {
  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          {headersNameDecks.map(name => (
            <Table.HeadCell key={name.key} onClick={() => handleSort?.(name.key)}>
              <Typography as={'span'} variant={'subtitle2'}>
                {name.title}
                {/*{name.key === searchParams && (*/}
                {searchParamsOrderBy?.includes(name.key) && (
                  <ArrowIosDownOutline
                    className={`${s.arrow} ${searchParamsOrderBy?.includes('asc') ? s.rotate : ''}`}
                  />
                )}
              </Typography>
            </Table.HeadCell>
          ))}
          <Table.HeadCell></Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data && data?.items.length !== 0 ? (
          data?.items.map(deck => {
            return (
              <SingleRowDeck
                deck={deck}
                key={deck.id}
                onDeleteClick={(id: string) => {
                  onDeleteClick?.(id)
                }}
                onEditClick={(name: string) => {
                  onEditClick?.(deck.id, name)
                }}
              />
            )
          })
        ) : (
          <Typography as={'div'} className={s.empty} variant={'body1'}>
            No content with these terms...
          </Typography>
        )}
      </Table.Body>
    </Table.Root>
  )
}
