import { ReactNode } from 'react'

import { ArrowIosDownOutline } from '@/assets/icons/svg'
import { useTableHeadMobile } from '@/components/TableComponent/lib/hooks/useTableHeadMobile'
import Loading from '@/components/ui/Loading/Loading'
import Typography from '@/components/ui/Typography/Typography'
import { CardResponse } from '@/services/cards/cards.types'
import { Deck } from '@/services/decks/deck.types'

import s from '@/components/TableComponent/ui/mobile/TableHeadMobile/TableHeadMobile.module.scss'

type Props = {
  children: ReactNode
  data?: CardResponse[] | Deck[]
  isFetching?: boolean
  isLoading?: boolean
  tableHeader: { key: string; locale: string; title: string }[]
}

export const TableHeadMobile = (props: Props) => {
  const { children, data, isLoading, tableHeader } = props
  const { currentOrderBy, message, setSortByQuery, t } = useTableHeadMobile({ data })

  return (
    <>
      <div className={s.box}>
        {tableHeader.map(name => (
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
        ))}
      </div>
      {isLoading ? (
        <Loading style={{ height: '50px' }} type={'small'} />
      ) : (
        <>{data && data?.length !== 0 ? children : message}</>
      )}
    </>
  )
}
