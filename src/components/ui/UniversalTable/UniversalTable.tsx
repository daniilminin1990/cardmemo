//? Делайте копию этой компоненты и дальше уже изгаляйтесь как хотите. Потом можно выбрать самый лучший вариант и все
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { ArrowIosUp } from '@/assets/icons/svg'
import Typography from '@/components/ui/Typography/Typography'
import { UniSingleRowDeck } from '@/components/ui/UniversalTable/SingleRow/UniSingleRowDeck'
import { Table } from '@/components/ui/table'
import { headersNameDecks } from '@/pagesMinin/utls/variablesMinin'

import s from './universalTable.module.scss'

import { DecksListResponse } from '../../../../services/decks/deck.types'

//? Копируй это гавно и редактируй так как тебе хочется!
type UniversalTableDeckProps = {
  data?: DecksListResponse //? Тут должна быть типизация ответа от get запроса для Deck (или для Card)
  // onDeleteClick?: (id: string) => void
  // onEditClick?: (id: string, name: string) => void
  // searchParams?: URLSearchParams
  // ! Вот это и setSearchParams понадобится для установки query параметров.
  // ? Лучше скидывать как пропсы, чтобы все query можно было устанавливать в одном месте. Либо создать свой searchParams setSearchParams здесь
  // setSearchParams?: (searchParams: URLSearchParams) => void
  sortedColumn?: string
}
export const UniversalTableDeck = (props: UniversalTableDeckProps) => {
  const {
    data,
    // searchParams,
    // setSearchParams,
    sortedColumn,
    // onDeleteClick, onEditClick, searchParams, setSearchParams, sortedColumn
  } = props
  const [searchParams, setSearchParams] = useSearchParams()
  const [direction, setDirection] = useState('desc')
  const [activeSortColumn, setActiveSortColumn] = useState(sortedColumn)

  // Это для сортирвки
  const handleSort = (key: string) => {
    const currentOrderBy = searchParams?.get('orderBy')

    const newOrderBy = currentOrderBy === `${key}-asc` ? `${key}-desc` : `${key}-asc`

    const newDirection = newOrderBy.split('-')[1]

    setActiveSortColumn(key)
    setDirection(newDirection)

    searchParams?.set('orderBy', newOrderBy)
    searchParams && setSearchParams?.(searchParams)
  }

  // Это тоже для сортировки
  useEffect(() => {
    const orderBy = searchParams?.get('orderBy')

    if (orderBy) {
      const [column, dir] = orderBy.split('-')

      setDirection(dir)
      setActiveSortColumn(column)
    }
  }, [])

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
              <UniSingleRowDeck // Компонента для строки в таблице (см в файлах)
                deck={deck}
                key={deck.id}
                // onDeleteClick={(id: string) => {
                //   onDeleteClick?.(id)
                // }}
                // onEditClick={(name: string) => {
                //   onEditClick?.(deck.id, name)
                // }}
                //? Тут нужно будет добавлять функции удаления и изменения или что там еще потребуется
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
