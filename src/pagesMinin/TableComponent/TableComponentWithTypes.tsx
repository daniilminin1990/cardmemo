import { ReactNode } from 'react'

import { ArrowIosDownOutline } from '@/assets/icons/svg'
import Typography from '@/components/ui/Typography/Typography'
import { Table } from '@/components/ui/table'
import { useQueryParams } from '@/pagesMinin/utls/useQueryParams'
import { headersNameCards, headersNameDecks } from '@/pagesMinin/utls/variablesMinin'
import clsx from 'clsx'

import s from './tableComponent.module.scss'

import { Card, CardsListResponse } from '../../../services/cards/cards.types'
import { Deck, DecksListResponse } from '../../../services/decks/deck.types'

// Типизация для Item, которая будет применена для map от data,
// она поймет что тип Deck или Card для соответствующей таблицы
type Item<T> = T extends DecksListResponse ? Deck : Card

// Передаем эту типизацию Item для children в Props
type Props<T extends CardsListResponse | DecksListResponse> = {
  children: (item: Item<T>) => ReactNode
  data?: T
  tableHeader: { key: string; title: string }[]
}
// Получается что TableComponentWithTypes похож немного на полиморфную компоненту, только с 2 типами
// для CardsListResponse или для DecksListResponse
export const TableComponentWithTypes = <T extends CardsListResponse | DecksListResponse>({
  children,
  data,
  tableHeader,
}: Props<T>) => {
  const { currentOrderBy, setSortByQuery } = useQueryParams()
  const header = tableHeader === headersNameDecks ? headersNameDecks : headersNameCards

  return (
    <Table.Root className={s.tableRoot}>
      <Table.Head>
        <Table.Row>
          {header.map(name => (
            <Table.HeadCell
              // className={s.tableHeadCellCards}
              className={clsx(
                tableHeader === headersNameDecks ? s.tableHeadCellDecks : s.tableHeadCellCards
              )}
              key={name.key}
              onClick={() => setSortByQuery(name.key)}
            >
              <Typography as={'span'} variant={'subtitle2'}>
                {name.title}
                {currentOrderBy.includes(name.key) && (
                  <ArrowIosDownOutline
                    className={`${s.arrow} ${currentOrderBy.includes('asc') ? s.rotate : ''}`}
                  />
                )}
              </Typography>
            </Table.HeadCell>
          ))}
          <Table.HeadCell className={s.emptyTableHeadCell}></Table.HeadCell>
        </Table.Row>
      </Table.Head>
      {data && data?.items.length !== 0 ? (
        data?.items.map(item => {
          return <Table.Body key={item.id}>{children(item as Item<T>)}</Table.Body>
        })
      ) : (
        <Table.Body>
          <Table.Row>
            <Table.Cell className={s.empty} colSpan={header.length + 1}>
              <Typography as={'span'} variant={'body1'}>
                No content with these terms...
              </Typography>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      )}
    </Table.Root>
  )
}
