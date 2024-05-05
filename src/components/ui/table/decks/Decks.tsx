import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import ArrowIosDownOutline from '@/assets/icons/svg/ArrowIosDownOutline'
import ArrowIosUp from '@/assets/icons/svg/ArrowIosUp'
import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'

import s from './decks.module.scss'

import defaltDeckImg from '../../../../assets/img/defaultDeckImg.png'
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

  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          {headersName.map(name => (
            <Table.HeadCell className={s.visible} key={name} onClick={() => handleSort(name)}>
              <span>
                {name}
                {activeColumn === name && sortOrder === 'desc' && (
                  <ArrowIosUp className={s.arrow} />
                )}
                {activeColumn === name && sortOrder === 'asc' && (
                  <ArrowIosDownOutline className={s.arrow} />
                )}
              </span>
            </Table.HeadCell>
          ))}
          <Table.HeadCell></Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sortedItems.length !== 0 ? (
          sortedItems.map(item => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <a className={s.nameBlock} href={'/'}>
                  <img alt={'default card img'} className={s.defaltDeckImg} src={defaltDeckImg} />
                  <h3>{item.name}</h3>
                </a>
              </Table.Cell>
              <Table.Cell>{item.cardsCount}</Table.Cell>
              <Table.Cell>{item.updated}</Table.Cell>
              <Table.Cell>{item.author.name}</Table.Cell>
              <Table.Cell>
                {item.userId === item.author.id ? (
                  <div className={s.iconBtns}>
                    <button>
                      <Edit2Outline className={s.Edit2Outline} />
                    </button>
                    <button disabled={item.cardsCount === 0}>
                      <PlayCircleOutline
                        className={`${s.playCircleOutline} ${item.cardsCount === 0 && s.disabled}`}
                      />
                    </button>
                    <button>
                      <TrashOutline className={s.TrashOutline} />
                    </button>
                  </div>
                ) : (
                  <div className={s.iconBtns}>
                    <button disabled={item.cardsCount === 0}>
                      <PlayCircleOutline
                        className={`${s.playCircleOutline} ${item.cardsCount === 0 && s.disabled}`}
                      />
                    </button>
                  </div>
                )}
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={100} style={{ textAlign: 'center' }}>
              Empty
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  )
}
