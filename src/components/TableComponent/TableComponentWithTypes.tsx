import { ReactNode, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { ArrowIosDownOutline } from '@/assets/icons/svg'
import { headersNameCards, headersNameDecks } from '@/common/globalVariables'
import Loading from '@/components/ui/Loading/Loading'
import Typography from '@/components/ui/Typography/Typography'
import { Table } from '@/components/ui/table'
import { useQueryParams } from '@/hooks/useQueryParams'
import { CardResponse } from '@/services/cards/cards.types'
import { Deck } from '@/services/decks/deck.types'
import { useGetDecksQuery } from '@/services/decks/decks.service'
import clsx from 'clsx'

import s from './tableComponent.module.scss'

// type Item<T> = T extends Deck[] ? Deck : CardResponse

type Props<T extends CardResponse[] | Deck[]> = {
  children: ReactNode
  data?: T
  deckId?: string
  isFetching?: boolean
  isLoading?: boolean
  tableHeader: { key: string; title: string }[]
}

export const TableComponentWithTypes = memo(
  <T extends CardResponse[] | Deck[]>({
    children,
    data,
    // isFetching,
    isLoading,
    tableHeader,
  }: Props<T>) => {
    const { currentOrderBy, setSortByQuery } = useQueryParams()
    const header = tableHeader === headersNameDecks ? headersNameDecks : headersNameCards
    const { t } = useTranslation()

    const { search: queryParameters } = useLocation()
    let message
    const { data: dataFromGetDecksQuery } = useGetDecksQuery()

    const conditionOfZeroData = dataFromGetDecksQuery?.items.length === 0 || data?.length === 0

    if (conditionOfZeroData) {
      if (queryParameters) {
        message = `${t('tableComponentWithTypes.noContent')}...`
      } else {
        message = `${t('tableComponentWithTypes.pleaseAddAnyData')}`
      }
    } else {
      message = `${t('tableComponentWithTypes.unknownCondition')}`
    }

    // const loadingStatus = isLoading || isFetching

    return (
      <>
        <Table.Root className={s.tableRoot}>
          <Table.Head>
            <Table.Row>
              {header.map(name => (
                <Table.HeadCell
                  className={clsx(
                    tableHeader === headersNameDecks ? s.tableHeadCellDecks : s.tableHeadCellCards
                  )}
                  key={name.key}
                  onClick={() => setSortByQuery(name.key)}
                >
                  <Typography as={'button'} className={s.nameSortBtn} variant={'subtitle2'}>
                    {/*{name.title}*/}
                    {t(`${name.locale}`)}
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
          <>
            {isLoading ? (
              <EmptyTable header={header}>
                <Loading style={{ height: '50px' }} type={'small'} />
              </EmptyTable>
            ) : (
              <>
                {data && data?.length !== 0 ? (
                  <Table.Body>{children}</Table.Body>
                ) : (
                  <EmptyTable header={header}>
                    <Typography>{message}</Typography>
                  </EmptyTable>
                )}
              </>
            )}
          </>
        </Table.Root>
      </>
    )
  }
)

const EmptyTable = ({ children, header }: { children: ReactNode; header: any }) => {
  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell className={s.empty} colSpan={header.length + 1}>
          {children}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  )
}
