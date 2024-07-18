import { ReactNode, memo } from 'react'

import { useTableData } from '@/components/TableComponent/lib/hooks/useTableData'
import EmptyTable from '@/components/TableComponent/ui/emptyTable/EmptyTable'
import { TableHeaders } from '@/components/TableComponent/ui/tableHeaders/TableHeaders'
import Loading from '@/components/ui/Loading/Loading'
import Typography from '@/components/ui/Typography/Typography'
import { Table } from '@/components/ui/table'
import { CardResponse } from '@/services/cards/cards.types'
import { Deck } from '@/services/decks/deck.types'

import s from '@/components/TableComponent/ui/TableComponent.module.scss'

export type TableVariantType = 'cards' | 'decks'

export type HeaderType = {
  key: string
  locale: string
  title: string
}

type Props<T extends CardResponse[] | Deck[]> = {
  children: ReactNode
  data?: T
  deckId?: string
  isFetching?: boolean
  isLoading?: boolean
  isMineCards?: boolean
  tableHeader: HeaderType[]
  tableVariant: TableVariantType
}

const TableComponentWithTypes = <T extends CardResponse[] | Deck[]>(props: Props<T>) => {
  const { children, data, isLoading, tableHeader, tableVariant } = props
  const { app, blur, currentOrderBy, message, onClickEyeHandler, setSortByQuery } =
    useTableData(data)

  if (!app) {
    return null
  }

  return (
    <Table.Root className={s.tableRoot}>
      <Table.Head>
        <Table.Row>
          <TableHeaders
            blur={blur}
            currentOrderBy={currentOrderBy}
            onClickEyeHandler={onClickEyeHandler}
            setSortByQuery={setSortByQuery}
            tableHeader={tableHeader}
            tableVariant={tableVariant}
          />
          {tableVariant === 'decks' && (
            <Table.HeadCell className={s.lastTableHeadCell}></Table.HeadCell>
          )}
        </Table.Row>
      </Table.Head>
      {isLoading ? (
        <EmptyTable header={tableHeader}>
          <Loading style={{ height: '50px' }} type={'small'} />
        </EmptyTable>
      ) : (
        <>
          {data && data?.length !== 0 ? (
            <Table.Body>{children}</Table.Body>
          ) : (
            <EmptyTable header={tableHeader}>
              <Typography className={s.empty}>{message}</Typography>
            </EmptyTable>
          )}
        </>
      )}
    </Table.Root>
  )
}

export const TableComponent = memo(TableComponentWithTypes) as typeof TableComponentWithTypes
