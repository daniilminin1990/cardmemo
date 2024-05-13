import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import ArrowIosUp from '@/assets/icons/svg/ArrowIosUp'
import Typography from '@/components/ui/Typography/Typography'
import { Deck } from '@/components/ui/table/decks/deck/Deck'
import { useGetDecksQuery } from '@/services/flashCardsApi'

import s from './decks.module.scss'

import { Table } from '../table'

export const Decks = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [direction, setDirection] = useState('desc')
  const [activeSortColumn, setActiveSortColumn] = useState('updated')

  const { data, isLoading } = useGetDecksQuery({
    authorId: searchParams.get('authorId') ?? '',
    name: searchParams.get('name') || '',
    orderBy: searchParams.get('orderBy') ?? undefined,
  })

  const headersName = [
    { key: 'name', title: 'Name' },
    { key: 'cardsCount', title: 'Cards' },
    { key: 'updated', title: 'Last Updated' },
    { key: 'created', title: 'Created by' },
  ]

  useEffect(() => {
    const orderBy = searchParams.get('orderBy')

    if (orderBy) {
      const [column, dir] = orderBy.split('-')

      setDirection(dir)
      setActiveSortColumn(column)
    }
  }, [])

  const handleSort = (key: string) => {
    const currentOrderBy = searchParams.get('orderBy')

    const newOrderBy = currentOrderBy === `${key}-asc` ? `${key}-desc` : `${key}-asc`

    const newDirection = newOrderBy.split('-')[1]

    setActiveSortColumn(key)
    setDirection(newDirection)

    searchParams.set('orderBy', newOrderBy)
    setSearchParams(searchParams)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return data?.items.length !== 0 ? (
    <Table.Root className={s.root}>
      <Table.Head>
        <Table.Row>
          {headersName.map(name => (
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
      <Table.Body>{data?.items.map(item => <Deck item={item} key={item.id} />)}</Table.Body>
    </Table.Root>
  ) : (
    <Typography as={'div'} className={s.empty} variant={'body1'}>
      No content with these terms...
    </Typography>
  )
}
