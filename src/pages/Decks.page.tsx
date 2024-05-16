import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import ArrowIosUp from '@/assets/icons/svg/ArrowIosUp'
import Input from '@/components/ui/Input/Input'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { Table } from '@/components/ui/table'
import { DeckBtns } from '@/components/ui/table/decks/btns/DeckBtns'
import { ModalDeleteDeck } from '@/pages/ModalsForTable/ModalDeleteDeck'
import { ModalUpdateDeck } from '@/pages/ModalsForTable/ModalUpdateDeck'
import { headersNameDecks, selectOptionPagination, updateSearchParams } from '@/pages/variables'

import s from '@/components/ui/table/decks/decks.module.scss'

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
  const { data, error, isLoading } = useGetDecksQuery({
    currentPage: Number(searchParams.get('currentPage')),
    itemsPerPage: Number(searchParams.get('itemsPerPage')),
    name: search,
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
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value)
        }}
        querySearch={searchParams.get('search')}
        value={search}
      ></Input>
      <form onSubmit={onSubmit}>
        <FormTextfield className={''} control={control} label={'some label'} name={'name'} />
        <Button>Create deck</Button>
      </form>
      {/*<TableTest data={data} />*/}
      <div style={{ marginBottom: '24px' }}>
        <TableTestDecksBorts
          data={data}
          onDeleteClick={id => deleteDeck({ id })}
          onEditClick={id => updateDeck({ id, name: 'NEW TITLE' })}
          sortedColumn={headersNameDecks[0].key}
        />
      </div>
      <PaginationWithSelect
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        selectOptions={selectOptionPagination}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        totalItems={data?.pagination.totalItems || 0}
      />
    </div>
    // <Decks />
  )
}

// const TableTest = ({ data }: { data?: DecksListResponse }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Cards</th>
//           <th>Last Updated</th>
//           <th>Created By</th>
//         </tr>
//         <tbody>
//           {data?.items.map(deck => {
//             const updatedAr = new Date(deck.updated).toLocaleDateString('ru-RU')
//
//             return (
//               <tr key={deck.id}>
//                 <td>{deck.name}</td>
//                 <td>{deck.cardsCount}</td>
//                 <td>{updatedAr}</td>
//                 <td>{deck.author.name}</td>
//               </tr>
//             )
//           })}
//         </tbody>
//       </thead>
//     </table>
//   )
// }

type TableTestDecksBortsType = {
  data?: DecksListResponse
  onDeleteClick?: (id: string) => void
  onEditClick: (id: string) => void
  searchParams?: URLSearchParams
  setSearchParams?: (searchParams: URLSearchParams) => void
  sortedColumn?: string
}
const TableTestDecksBorts = ({
  data,
  onDeleteClick,
  onEditClick,
  searchParams,
  setSearchParams,
  sortedColumn,
}: TableTestDecksBortsType) => {
  // const [searchParams, setSearchParams] = useSearchParams()
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
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

  const showUpdateHandler = () => {
    setIsUpdateModal(true)
  }
  const showDeleteHandler = () => {
    setIsDeleteModal(true)
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
        {data?.items.map(deck => {
          const updatedAr = new Date(deck.updated).toLocaleDateString('ru-RU')

          return (
            <Fragment key={deck.id}>
              <ModalUpdateDeck
                item={deck}
                onEditClick={onEditClick}
                open={isUpdateModal}
                setOpen={setIsUpdateModal}
              />
              <ModalDeleteDeck
                item={deck}
                onDeleteClick={onDeleteClick}
                open={isDeleteModal}
                setIsDeleteModal={setIsDeleteModal}
              />
              <Table.Row key={deck.id}>
                <Table.Cell>{deck.name}</Table.Cell>
                <Table.Cell>{deck.cardsCount}</Table.Cell>
                <Table.Cell>{updatedAr}</Table.Cell>
                <Table.Cell>{deck.author.name}</Table.Cell>
                <Table.Cell>
                  <DeckBtns
                    disabled={deck.cardsCount === 0}
                    item={deck}
                    showDeleteModal={showDeleteHandler}
                    showUpdateModal={showUpdateHandler}
                  />
                </Table.Cell>
              </Table.Row>
            </Fragment>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}
