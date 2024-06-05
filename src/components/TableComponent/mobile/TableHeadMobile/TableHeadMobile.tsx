import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { ArrowIosDownOutline } from '@/assets/icons/svg'
import Loading from '@/components/ui/Loading/Loading'
import Typography from '@/components/ui/Typography/Typography'
import { useQueryParams } from '@/hooks/useQueryParams'
import { Deck } from '@/services/decks/deck.types'
import { useGetDecksQuery } from '@/services/decks/decks.service'

import s from './tableHeadMobile.module.scss'

type Props = {
  children: ReactNode
  data?: Deck[]
  isFetching?: boolean
  isLoading?: boolean
  tableHeader: { key: string; title: string }[]
}

export const TableHeadMobile = ({ children, data, isLoading, tableHeader }: Props) => {
  const { currentOrderBy, setSortByQuery } = useQueryParams()

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

  return (
    <>
      <div className={s.box}>
        {tableHeader.map(name => {
          return (
            <Typography
              as={'button'}
              className={s.boxItem}
              key={name.key}
              onClick={() => setSortByQuery(name.key)}
            >
              {name.title}
              {currentOrderBy.includes(name.key) && (
                <ArrowIosDownOutline
                  className={`${s.arrow} ${currentOrderBy.includes('asc') ? s.rotate : ''}`}
                />
              )}
            </Typography>
          )
        })}
      </div>
      {isLoading ? (
        <Loading style={{ height: '50px' }} type={'small'} />
      ) : (
        <>{data && data?.length !== 0 ? children : message}</>
      )}
      <Typography as={'p'}></Typography>
    </>
  )
}
