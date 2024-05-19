import { useState } from 'react'
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
import { useGetDecksQuery } from '../../services/flashCardsAPI'

export function DecksPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const itemsPerPage = Number(searchParams.get('itemsPerPage') ?? 10)
  const currentPage = Number(searchParams.get('currentPage') ?? 1)
  const search = searchParams.get('search') ?? ''

  const [open, setOpen] = useState(false)
  const [tabsValue, setTabsValue] = useState('All decks')

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
    // updateSearchParams({
    //   currentPage: 1,
    //   itemsPerPage: 10,
    //   search: '',
    //   searchParams,
    //   setSearchParams,
    // })
    searchParams.delete('currentPage')
    searchParams.delete('itemsPerPage')
    searchParams.delete('search')
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
  // const [createDeck] = useCreateDeckMutation()

  // const onSubmit = (data: any) => {
  //   // Тип пока any. С пониманием того, какие данные нужно передавать для добавления Deck, тогда и определим
  //   createDeck(data)
  //   updateSearchParams({
  //     currentPage: 1,
  //     itemsPerPage: 10,
  //     search: '',
  //     searchParams,
  //     setSearchParams,
  //   })
  // }
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
      <ModalOnAddDeck open={open} setOpen={setOpen} />
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
            gridTemplateColumns: '300px 1fr 250px 144px',
            marginBottom: '36px',
          }}
        >
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
          <Button onClick={onClearFilter} variant={'secondary'}>
            Clear Filter
          </Button>
        </div>
      </div>
      <div style={{ marginBottom: '24px' }}>
        <UniversalTableDeckMinin
          data={data}
          handleSort={handleSort}
          searchParamsOrderBy={searchParams.get('orderBy') || ''}
        />
      </div>
      <PaginationWithSelect
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        placeholder={itemsPerPage.toString()}
        selectOptions={selectOptionPagination}
        setCurrentPage={handleCurrentPageChange}
        setItemsPerPage={handleItemsPerPageChange}
        totalItems={data?.pagination.totalItems || 0}
      />
    </div>
  )
}

type UniversalTableDeckMininType = {
  data?: DecksListResponse
  handleSort?: (key: string) => void
  searchParamsOrderBy?: string
}
const UniversalTableDeckMinin = ({
  data,
  handleSort,
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
            return <SingleRowDeck deck={deck} key={deck.id} />
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
