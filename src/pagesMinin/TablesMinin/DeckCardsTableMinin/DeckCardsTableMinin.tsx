import { ArrowIosDownOutline } from '@/assets/icons/svg'
import Typography from '@/components/ui/Typography/Typography'
import { Table } from '@/components/ui/table'
import { SingleRowCardMinin } from '@/pagesMinin/TablesMinin/DeckCardsTableMinin/SingleRowCardMinin'
import { headersNameCards } from '@/pagesMinin/utls/variablesMinin'

import s from '@/pagesMinin/decksPageMinin.module.scss'

import { CardsListResponse } from '../../../../services/decks/deck.types'

type UniversalTableDeckMininType = {
  data?: CardsListResponse
  handleSort?: (key: string) => void
  searchParamsOrderBy?: string
}
export const DeckCardsTableMinin = ({
  data,
  handleSort,
  searchParamsOrderBy,
}: UniversalTableDeckMininType) => {
  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          {headersNameCards.map(name => (
            <Table.HeadCell key={name.key} onClick={() => handleSort?.(name.key)}>
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
          <Table.HeadCell></Table.HeadCell>
        </Table.Row>
      </Table.Head>
      {data && data?.items.length !== 0 ? (
        data?.items.map(card => {
          return (
            <Table.Body key={card.id}>
              <SingleRowCardMinin card={card} key={card.id} />
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
