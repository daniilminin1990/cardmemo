import { ReactNode, memo, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { ArrowIosDownOutline } from '@/assets/icons/svg'
import { useQueryParams } from '@/common/hooks/useQueryParams'
import { isDeck } from '@/common/predicateTypes'
import Loading from '@/components/ui/Loading/Loading'
import Typography from '@/components/ui/Typography/Typography'
import { UserContext } from '@/components/ui/changeTheme/Context'
import { Table } from '@/components/ui/table'
import { CardResponse } from '@/services/cards/cards.types'
import { Deck } from '@/services/decks/deck.types'
import { useGetDecksQuery } from '@/services/decks/decks.service'
import clsx from 'clsx'

import s from './tableComponent.module.scss'

import Eye from '../../assets/icons/svg/Eye'
import CloseEye from '../../assets/icons/svg/EyeOff'
// type Item<T> = T extends Deck[] ? Deck : CardResponse

type Props<T extends CardResponse[] | Deck[]> = {
  children: ReactNode
  data?: T
  deckId?: string
  isFetching?: boolean
  isLoading?: boolean
  isMineCards?: boolean
  tableHeader: { key: string; locale: string; title: string }[]
}

export const TableComponentWithTypes = memo(
  <T extends CardResponse[] | Deck[]>({
    children,
    data,
    isLoading,
    // isFetching,
    isMineCards,
    tableHeader,
  }: Props<T>) => {
    const { currentOrderBy, setSortByQuery } = useQueryParams()
    // const header = tableHeader === headersNameDecks ? headersNameDecks : headersNameCards
    const { t } = useTranslation()
    const context = useContext(UserContext)

    const { search: queryParameters } = useLocation()
    let message
    const { data: dataFromGetDecksQuery } = useGetDecksQuery()
    const isDeckEl = isDeck(data?.[0] as Deck)

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
    const onClickEyeHandler = (e: any) => {
      e.stopPropagation()
      context?.setBlur(!context?.blur)
    }
    // const loadingStatus = isLoading || isFetching
    const changeEye = context?.blur ? (
      <Typography as={'button'} className={s.boxEye} onClick={onClickEyeHandler}>
        <CloseEye height={'100%'} width={20} />
      </Typography>
    ) : (
      <Typography as={'button'} className={s.boxEye} onClick={onClickEyeHandler}>
        <Eye height={'100%'} width={20} />
      </Typography>
    )

    if (!context) {
      return
    }

    return (
      <>
        <Table.Root className={s.tableRoot}>
          <Table.Head>
            <Table.Row>
              {tableHeader.map(name => (
                <Table.HeadCell
                  // className={clsx(
                  //   tableHeader === headersNameDecks ? s.tableHeadCellDecks : s.tableHeadCellCards
                  // )}
                  className={clsx(isDeckEl ? s.tableHeadCellDecks : s.tableHeadCellCards)}
                  key={name.key}
                  onClick={() => setSortByQuery(name.key)}
                >
                  <div className={s.answer}>
                    <Typography as={'button'} className={s.nameSortBtn} variant={'subtitle2'}>
                      {/*{name.title}*/}
                      {t(`${name.locale}`)}
                      {(currentOrderBy === `${name.key}-asc` ||
                        currentOrderBy === `${name.key}-desc`) && (
                        <ArrowIosDownOutline
                          className={`${s.arrow} ${currentOrderBy.includes('asc') ? s.rotate : ''}`}
                        />
                      )}
                    </Typography>
                    {name.title === 'Answer' && changeEye}
                  </div>
                </Table.HeadCell>
              ))}
              {/*<Table.HeadCell className={s.emptyTableHeadCell}></Table.HeadCell>*/}
              {(isMineCards || isDeckEl || data?.length === 0 || !data) && (
                <Table.HeadCell className={s.lastTableHeadCell}></Table.HeadCell>
              )}
            </Table.Row>
          </Table.Head>
          <>
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
