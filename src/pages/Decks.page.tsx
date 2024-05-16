import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { ArrowIosUp } from '@/assets/icons/svg'
import Input from '@/components/ui/Input/Input'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { Table } from '@/components/ui/table'
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

  const sortBy = searchParams.get('sortBy') || ''
  const sortDirection = searchParams.get('sortDirection') || ''
  // Проверяем, что sortBy и sortDirection содержат допустимые значения
  const isValidSortBy = ['author.name', 'cardsCount', 'created', 'name', 'updated'].includes(sortBy)
  const isValidSortDirection = ['asc', 'desc'].includes(sortDirection)

  const orderBy = isValidSortBy && isValidSortDirection ? `${sortBy}-${sortDirection}` : undefined // или установить другое допустимое значение по умолчанию

  const { data, error, isLoading } = useGetDecksQuery({
    currentPage: Number(searchParams.get('currentPage')),
    itemsPerPage: Number(searchParams.get('itemsPerPage')),
    name: search,
    orderBy,
  })
  const [createDeck] = useCreateDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const { control, handleSubmit } = useForm<{ name: string }>({
    defaultValues: { name: '' },
  })

  const onSubmit = handleSubmit(data => {
    createDeck(data)
    setCurrentPage(1)
    setItemsPerPage(10)
    setSearch('')
    updateSearchParams({ currentPage, itemsPerPage, search, searchParams, setSearchParams })
  })

  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1)
    setSearch(e.target.value)
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
      <Input
        onChange={onSearchHandler}
        querySearch={searchParams.get('search')}
        value={search}
      ></Input>
      <form onSubmit={onSubmit}>
        <FormTextfield className={''} control={control} label={'some label'} name={'name'} />
        <Button>Create deck</Button>
      </form>
      {/*<TableTest data={data} />*/}
      <div style={{ marginBottom: '24px' }}>
        <UniversalTableDeckMinin
          data={data}
          onDeleteClick={id => deleteDeck({ id })}
          onEditClick={(id, name) => updateDeck({ id, name })}
          // searchParams={searchParams}
          // setSearchParams={setSearchParams}
          sortedColumn={headersNameDecks[0].key}
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
  onDeleteClick?: (id: string) => void
  onEditClick?: (id: string, name: string) => void
  // searchParams?: URLSearchParams
  // setSearchParams?: (searchParams: URLSearchParams) => void
  sortedColumn?: string
}
const UniversalTableDeckMinin = ({
  data,
  onDeleteClick,
  onEditClick,
  // searchParams,
  // setSearchParams,
  sortedColumn,
}: UniversalTableDeckMininType) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [direction, setDirection] = useState('desc')
  const [activeSortColumn, setActiveSortColumn] = useState(sortedColumn)

  useEffect(() => {
    const orderBy = searchParams?.get('orderBy')

    if (orderBy) {
      const [column, dir] = orderBy.split('-')

      setDirection(dir)
      setActiveSortColumn(column)
    }
  }, [])

  const handleSort = (key: string) => {
    const currentOrderBy = searchParams?.get('orderBy')

    const newOrderBy = currentOrderBy === `${key}-asc` ? `${key}-desc` : `${key}-asc`

    const newDirection = newOrderBy.split('-')[1]

    setActiveSortColumn(key)
    setDirection(newDirection)

    searchParams?.set('orderBy', newOrderBy)
    searchParams && setSearchParams?.(searchParams)
  }

  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          {headersNameDecks.map(name => (
            <Table.HeadCell key={name.key} onClick={() => handleSort(name.key)}>
              <Typography as={'span'} variant={'subtitle2'}>
                {name.title}
                {name.key === activeSortColumn && (
                  <ArrowIosUp className={`${s.arrow} ${direction === 'asc' ? s.rotate : ''}`} />
                )}
              </Typography>
            </Table.HeadCell>
          ))}
          <Table.HeadCell></Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data && data.items.length !== 0 ? (
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
