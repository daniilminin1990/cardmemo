import { ArrowIosDownOutline } from '@/assets/icons/svg'
import { headersNameCards, headersNameDecks } from '@/common/globalVariables'
import { SingleRowCard } from '@/components/TableComponent/SingleRowCard/SingleRowCard'
import Typography from '@/components/ui/Typography/Typography'
import { Table } from '@/components/ui/table'
import { useQueryParams } from '@/hooks/useQueryParams'
import { CardsListResponse } from '@/services/cards/cards.types'

import s from './CardsTable.module.scss'

type Props = {
  data?: CardsListResponse
  tableHeader: { key: string; title: string }[]
}
export const CardsTable = ({ data, tableHeader }: Props) => {
  const { currentOrderBy, setSortByQuery } = useQueryParams()
  const header = tableHeader === headersNameDecks ? headersNameDecks : headersNameCards

  return (
    <Table.Root className={s.tableRoot}>
      <Table.Head>
        <Table.Row>
          {header.map(name => (
            <Table.HeadCell
              className={s.tableHeadCellCards}
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
          return (
            <Table.Body key={item.id}>
              <SingleRowCard item={item} key={item.id} />
            </Table.Body>
          )
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
        // <Table.Body>No content with these terms...</Table.Body>
      )}
    </Table.Root>
  )
}
