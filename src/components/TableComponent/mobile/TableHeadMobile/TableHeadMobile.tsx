import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { ArrowIosDownOutline } from '@/assets/icons/svg'
import { useQueryParams } from '@/common/hooks/useQueryParams'
import Loading from '@/components/ui/Loading/Loading'
import Typography from '@/components/ui/Typography/Typography'
import { CardResponse } from '@/services/cards/cards.types'
import { Deck } from '@/services/decks/deck.types'

import s from './tableHeadMobile.module.scss'

type Props = {
  children: ReactNode
  data?: CardResponse[] | Deck[]
  isFetching?: boolean
  isLoading?: boolean
  tableHeader: { key: string; locale: string; title: string }[]
}

export const TableHeadMobile = ({ children, data, isLoading, tableHeader }: Props) => {
  const { currentOrderBy, setSortByQuery } = useQueryParams()

  const { t } = useTranslation()

  const { search: queryParameters } = useLocation()
  let message

  const conditionOfZeroData = data?.length === 0

  if (conditionOfZeroData) {
    if (queryParameters) {
      message = `${t('tableComponentWithTypes.noContent')}...`
    } else {
      message = `${t('tableComponentWithTypes.pleaseAddAnyData')}`
    }
  } else {
    message = `${t('tableComponentWithTypes.unknownCondition')}`
  }

  // const header = tableHeader === headersNameDecks ? headersNameDecks : headersNameCards

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
              {t(`${name.locale}`)}
              {(currentOrderBy === `${name.key}-asc` || currentOrderBy === `${name.key}-desc`) && (
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
    </>
  )
}
