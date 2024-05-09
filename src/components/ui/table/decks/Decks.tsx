import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import ArrowIosUp from '@/assets/icons/svg/ArrowIosUp'
import Typography from '@/components/ui/Typography/Typography'
import { Deck } from '@/components/ui/table/decks/deck/Deck'

import s from './decks.module.scss'

import { Table } from '../table'

export type DecksProps = {
  author: {
    id: string
    name: string
  }
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export const Decks = () => {
  const headersName = ['Name', 'Cards', 'Last Updated', 'Created By']
  const items: DecksProps[] = [
    {
      author: {
        id: '1',
        name: 'BD',
      },
      cardsCount: 0,
      cover: '…',
      created: '02.05.2024',
      id: 'c1',
      isPrivate: true,
      name: 'My Deck',
      updated: '02.05.2024',
      userId: '1',
    },
    {
      author: {
        id: '2',
        name: 'Author name',
      },
      cardsCount: 8,
      cover: '…',
      created: '02.05.2024',
      id: 'c2',
      isPrivate: false,
      name: 'Other Deck',
      updated: '12.02.2022',
      userId: '1',
    },
    {
      author: {
        id: '3',
        name: 'Other7',
      },
      cardsCount: 5,
      cover: '…',
      created: '17.02.2024',
      id: 'c3',
      isPrivate: false,
      name: 'Z',
      updated: '17.02.2023',
      userId: '1',
    },
    {
      author: {
        id: '4',
        name: 'Other1',
      },
      cardsCount: 0,
      cover: '…',
      created: '17.02.2023',
      id: 'c4',
      isPrivate: false,
      name: 'C',
      updated: '22.02.2023',
      userId: '1',
    },
  ]

  const [searchParams, setSearchParams] = useSearchParams()
  const activeColumn = searchParams.get('sort') || 'Last Updated'
  const sortOrder = searchParams.get('order') || 'asc'

  const handleSort = (columnName: any) => {
    const order = activeColumn === columnName && sortOrder === 'asc' ? 'desc' : 'asc'

    setSearchParams({ order, sort: columnName })
  }

  const columnKeys = {
    Cards: 'cardsCount',
    'Created By': 'author.name',
    'Last Updated': 'updated',
    Name: 'name',
  }

  const sortedItems = useMemo(() => {
    //@ts-ignore
    if (!activeColumn || !columnKeys[activeColumn]) {
      return items
    }
    //@ts-ignore
    const key = columnKeys[activeColumn]

    return [...items].sort((a, b) => {
      const aValue = key.split('.').reduce((o: string, i: number) => o[i], a)
      const bValue = key.split('.').reduce((o: string, i: number) => o[i], b)

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1
      }

      return 0
    })
  }, [items, activeColumn, sortOrder, columnKeys])

  return sortedItems.length !== 0 ? (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          {headersName.map(name => (
            <Table.HeadCell key={name} onClick={() => handleSort(name)}>
              <Typography as={'span'} variant={'subtitle2'}>
                {name}
                {activeColumn === name && (
                  <ArrowIosUp className={`${s.arrow} ${sortOrder === 'asc' ? s.rotate : ''}`} />
                )}
              </Typography>
            </Table.HeadCell>
          ))}
          <Table.HeadCell></Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sortedItems.map(item => (
          <Deck item={item} key={item.id} />
        ))}
      </Table.Body>
    </Table.Root>
  ) : (
    <Typography as={'div'} className={s.empty} variant={'body1'}>
      No content with these terms...
    </Typography>
  )
}
