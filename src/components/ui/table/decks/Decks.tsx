import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import ArrowIosUp from '@/assets/icons/svg/ArrowIosUp'
import Typography from '@/components/ui/Typography/Typography'
import { Table } from '@/components/ui/table'

import s from './decks.module.scss'

type Props = {
  Component: any
  data: any
  headersName: { key: string; title: string }[]
  sortedColumn: string
}

export const Decks = ({ Component, data, headersName, sortedColumn }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [direction, setDirection] = useState('desc')
  const [activeSortColumn, setActiveSortColumn] = useState(sortedColumn)

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

  return data?.length !== 0 ? (
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
      <Table.Body>{data?.map(item => <Component item={item} key={item.id} />)}</Table.Body>
    </Table.Root>
  ) : (
    <Typography as={'div'} className={s.empty} variant={'body1'}>
      No content with these terms...
    </Typography>
  )
}
