import { ChangeEvent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { MemoryRouter, useSearchParams } from 'react-router-dom'

import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { FormTextfield } from '@/components/ui/form/form-textfield'
import { Table } from '@/components/ui/table'
import { Deck } from '@/pages/deck/deck'
import {
  useCreateDecksMutation,
  useDeleteDecksMutation,
  useGetDecksQuery,
  useUpdateDecksMutation,
} from '@/services/decks/decks.service'

import s from './decks.module.scss'

export const Decks = () => {
  const { control, handleSubmit } = useForm()
  // const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search')
  const { data, isLoading } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    // orderBy: '' //sort
    name: search ?? '',
  })
  // const { data, isLoading } = useGetDecksQuery()

  const [createDeck, { isLoading: isDeckBeingCreated }] = useCreateDecksMutation()
  const [updateDeck] = useUpdateDecksMutation()
  const [deleteDeck] = useDeleteDecksMutation()

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    if (newValue.length > 0) {
      searchParams.set('search', newValue)
    } else {
      searchParams.delete('search')
    }
    setSearchParams(searchParams)
  }

  if (isLoading) {
    return <h1>LOADING....</h1>
  }

  const paginationOptions = []

  for (let i = 0; i < (data?.pagination?.totalPages ?? 0); i++) {
    paginationOptions.push(i + 1)
  }

  const headersName = [
    { key: 'name', title: 'Name' },
    { key: 'cardsCount', title: 'Cards' },
    { key: 'updated', title: 'Last Updated' },
    { key: 'created', title: 'Created by' },
  ]

  // const mappedData = data?.items.map(deck => ({
  //   cards: deck.cardsCount,
  //   createdBy: deck.author.name,
  //   id: deck.id,
  //   lastUpdated: deck.updated,
  //   name: deck.name,
  // }))

  return (
    <div>
      <form
        onSubmit={handleSubmit(data => {
          createDeck(data as any)
        })}
        style={{
          border: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          margin: '24px 0',
          padding: '24px',
        }}
      >
        <FormTextfield
          control={control}
          label={'Name'}
          name={'name'}
          placeholder={'Input name new deck'}
        />
        <select
          onChange={e => setItemsPerPage(+e.currentTarget.value)}
          style={{ color: 'black' }}
          value={itemsPerPage}
        >
          <option value={10}> 10</option>
          <option value={20}> 20</option>
          <option value={50}> 50</option>
        </select>
        <Controller
          control={control}
          defaultValue={false}
          name={'isPrivate'}
          render={({ field: { onChange, value } }) => (
            <Checkbox checked={value} label={'Private deck'} onCheckedChange={onChange} />
          )}
        />
        <Button disabled={isDeckBeingCreated}>Create Deck</Button>
      </form>
      <Input onChange={handleSearchChange} placeholder={'Filter name'} value={search ?? ''} />
      {/*{data?.items.map(name => {*/}
      {/*  return (*/}
      {/*    // <div key={deck.id}>*/}
      {/*    //   {JSON.stringify(deck)} /!*{deck.author.id === deck.userId && (*!/*/}
      {/*    //   {deck.author.id === '30b1fbfe-70dc-409d-bbf6-86548fd1653e' && (*/}
      {/*    //     <>*/}
      {/*    //       <Button onClick={() => deleteDeck({ id: `${deck.id}` })}>Remove</Button>*/}
      {/*    //       <Button onClick={() => updateDeck({ id: `${deck.id}`, name: 'updated deck' })}>*/}
      {/*    //         Update*/}
      {/*    //       </Button>*/}
      {/*    //     </>*/}
      {/*    //   )}*/}
      {/*    //   <hr />*/}
      {/*    // </div>*/}
      {/*  )*/}
      {/*})}*/}
      {/*<MemoryRouter initialEntries={['/']}>*/}
      <div className={s.containerTable}>
        <Table.Root>
          <Table.Head>
            <Table.Row>
              {headersName.map(name => (
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
            <Table.Body>{data?.items.map(item => <Deck item={item} key={item.id} />)}</Table.Body>
          </Table.Body>
        </Table.Root>
        {/*</MemoryRouter>*/}
      </div>
      {paginationOptions.map(i => {
        return (
          <Button key={i} onClick={() => setCurrentPage(i)}>
            {i}
          </Button>
        )
      })}
    </div>
  )
}
