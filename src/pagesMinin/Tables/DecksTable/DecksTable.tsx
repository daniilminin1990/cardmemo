import { ArrowIosDownOutline } from '@/assets/icons/svg'
import Typography from '@/components/ui/Typography/Typography'
import { Table } from '@/components/ui/table'
import { SingleRowDeck } from '@/pagesMinin/Tables/DecksTable/SingleRowDeck'
import { useQueryParams } from '@/pagesMinin/utls/useQueryParams'
import { headersNameCards, headersNameDecks } from '@/pagesMinin/utls/variablesMinin'

import s from './decksTable.module.scss'

import { DecksListResponse } from '../../../../services/decks/deck.types'

type Props = {
  data?: DecksListResponse
  tableHeader: { key: string; title: string }[]
}
export const DecksTable = ({ data, tableHeader }: Props) => {
  const { currentOrderBy, setSortByQuery } = useQueryParams()
  const header = tableHeader === headersNameDecks ? headersNameDecks : headersNameCards

  return (
    <Table.Root className={s.tableRoot}>
      <Table.Head>
        <Table.Row>
          {header.map(name => (
            <Table.HeadCell
              className={s.tableHeadCellDecks}
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
              <SingleRowDeck item={item} key={item.id} />
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
