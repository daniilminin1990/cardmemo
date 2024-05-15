import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import Input from '@/components/ui/Input/Input'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { Table } from '@/components/ui/table'
import { headersNameDecks, selectOptionPagination, updateSearchParams } from '@/pages/variables'

import { DecksListResponse } from '../../services/decks/deck.types'
import { useCreateDeckMutation, useGetDecksQuery } from '../../services/flashCardsAPI'

export function DecksPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('currentPage')) || 1
  )
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    Number(searchParams.get('itemsPerPage')) || 10
  )

  console.log(Number(searchParams.get('itemsPerPage')))
  const [search, setSearch] = useState<string>('')
  const { data, error, isLoading } = useGetDecksQuery({
    currentPage: Number(searchParams.get('currentPage')),
    itemsPerPage: Number(searchParams.get('itemsPerPage')),
    name: search,
  })
  const [createDeck] = useCreateDeckMutation()

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

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setCurrentPage(1)
    setItemsPerPage(10)
    updateSearchParams({ currentPage: 1, itemsPerPage: 10, search, searchParams, setSearchParams })
  }

  if (isLoading) {
    return <h1>... Loading</h1>
  }

  if (error) {
    return <h1>Error: {JSON.stringify(error)}</h1>
  }

  return (
    <div>
      <Input onChange={handleSearch} value={search}></Input>
      <form onSubmit={onSubmit}>
        <FormTextfield className={''} control={control} label={'some label'} name={'name'} />
        <Button>Create deck</Button>
      </form>
      {/*<TableTest data={data} />*/}
      <TableTestDecksBorts data={data} headersName={headersNameDecks} />
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

type headersNameType = {
  key: string
  title: string
}
type TableTestDecksBortsType = {
  data?: DecksListResponse
  headersName?: headersNameType[]
}
const TableTestDecksBorts = ({ data, headersName }: TableTestDecksBortsType) => {
  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          {headersName?.map(name => (
            <Table.HeadCell key={name.key}>
              <Typography as={'span'} variant={'subtitle2'}>
                {name.title}
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
            <Table.Row key={deck.id}>
              <Table.Cell>{deck.name}</Table.Cell>
              <Table.Cell>{deck.cardsCount}</Table.Cell>
              <Table.Cell>{updatedAr}</Table.Cell>
              <Table.Cell>{deck.author.name}</Table.Cell>
              <Table.Cell>{deck.author.name}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}
