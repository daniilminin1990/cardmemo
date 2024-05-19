import { ArrowIosDownOutline } from '@/assets/icons/svg'
import Typography from '@/components/ui/Typography/Typography'
import { Table } from '@/components/ui/table'
import { SingleRowDeckMinin } from '@/pagesMinin/DecksTable/SingleRowDeckMinin'
import { headersNameDecks } from '@/pagesMinin/variablesMinin'

import s from '@/pagesMinin/decksPageMinin.module.scss'

import { DecksListResponse } from '../../../services/decks/deck.types'

type UniversalTableDeckMininType = {
  data?: DecksListResponse
  handleSort?: (key: string) => void
  searchParamsOrderBy?: string
}
export const UniversalTableDeckMinin = ({
  data,
  handleSort,
  searchParamsOrderBy,
}: UniversalTableDeckMininType) => {
  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          {headersNameDecks.map(name => (
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
      <Table.Body>
        {data && data?.items.length !== 0 ? (
          data?.items.map(deck => {
            return <SingleRowDeckMinin deck={deck} key={deck.id} />
          })
        ) : (
          <Typography as={'div'} className={s.empty} variant={'body1'}>
            No content with these terms...
          </Typography>
        )}
      </Table.Body>
    </Table.Root>
  )
}
