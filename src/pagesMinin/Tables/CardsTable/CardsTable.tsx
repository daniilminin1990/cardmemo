import { ArrowIosDownOutline } from '@/assets/icons/svg'
import Typography from '@/components/ui/Typography/Typography'
import { Table } from '@/components/ui/table'
import { SingleRowCard } from '@/pagesMinin/Tables/CardsTable/SingleRowCard'
import { headersNameCards } from '@/pagesMinin/utls/variablesMinin'

import s from './CardsTable.module.scss'

import { CardsListResponse } from '../../../../services/cards/cards.types'

type UniversalTableDeckMininType = {
  data?: CardsListResponse
  handleSort?: (key: string) => void
  searchParamsOrderBy?: string
}
export const CardsTable = ({
  data,
  handleSort,
  searchParamsOrderBy,
}: UniversalTableDeckMininType) => {
  return (
    <Table.Root className={s.tableRoot}>
      <Table.Head>
        <Table.Row>
          {headersNameCards.map(name => (
            <Table.HeadCell
              className={s.tableHeadCellCards}
              key={name.key}
              onClick={() => handleSort?.(name.key)}
            >
              <Typography as={'span'} variant={'subtitle2'}>
                {name.title}
                {searchParamsOrderBy?.includes(name.key) && (
                  <ArrowIosDownOutline
                    className={`${s.arrow} ${searchParamsOrderBy?.includes('asc') ? s.rotate : ''}`}
                  />
                )}
              </Typography>
            </Table.HeadCell>
          ))}
          <Table.HeadCell className={s.emptyTableHeadCell}></Table.HeadCell>
        </Table.Row>
      </Table.Head>
      {data && data?.items.length !== 0 ? (
        data?.items.map(card => {
          return (
            <Table.Body key={card.id}>
              <SingleRowCard card={card} key={card.id} />
            </Table.Body>
          )
        })
      ) : (
        <Table.Body>
          <Table.Row>
            <Table.Cell className={s.empty} colSpan={headersNameCards.length + 1}>
              <Typography as={'span'} variant={'body1'}>
                No content with these terms...
              </Typography>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        // <Table.Body>No content with these terms...</Table.Body>
      )}
    </Table.Root>
  )
}
