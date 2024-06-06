import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { headersNameDecks } from '@/common/globalVariables'
import { RowDeckBtns } from '@/components/TableComponent/SingleRowDeck/btns/RowDeckBtns'
import Typography from '@/components/ui/Typography/Typography'
import { Table } from '@/components/ui/table'
import { path } from '@/router/path'
import { useMeQuery } from '@/services/auth/auth.service'
import { Deck } from '@/services/decks/deck.types'
import clsx from 'clsx'

import s from './tableDeckMobile.module.scss'

type Props = {
  item: Deck
  openDeleteModalHandler: (value: boolean) => void
  openEditModalHandler: (value: boolean) => void
  retrieveDeckItem: (item: Deck) => void
}

export const TableDeckMobile = ({
  item,
  openDeleteModalHandler,
  openEditModalHandler,
  retrieveDeckItem,
}: Props) => {
  const updatedAr = new Date(item.updated).toLocaleDateString('ru-RU')
  const { data: meData } = useMeQuery()

  const { t } = useTranslation()
  const name = t(`${headersNameDecks[0].locale}`)
  const cards = t(`${headersNameDecks[1].locale}`)
  const lastUpdated = t(`${headersNameDecks[2].locale}`)
  const createdBy = t(`${headersNameDecks[3].locale}`)

  return (
    <div className={s.root}>
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Table.HeadCell scope={'row'}>{name}</Table.HeadCell>
            <Table.Cell className={clsx(item?.cardsCount === 0 && s.disabledCell)}>
              <Typography as={Link} className={s.imgWrapper} to={`${path.decks}/${item.id}`}>
                {item.cover && (
                  <div className={s.wrapperCoverImg}>
                    <img alt={'default card img'} className={s.coverImg} src={item.cover} />
                  </div>
                )}
                {item.name}
              </Typography>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeadCell scope={'row'}>{cards}</Table.HeadCell>
            <Table.Cell>
              <Typography>{item.cardsCount}</Typography>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeadCell scope={'row'}>{lastUpdated}</Table.HeadCell>
            <Table.Cell>
              <Typography>{updatedAr}</Typography>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeadCell scope={'row'}>{createdBy}</Table.HeadCell>
            <Table.Cell>
              <Typography>{item.author.name}</Typography>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>

      <RowDeckBtns
        className={s.rowDeckBtns}
        item={item}
        meData={meData}
        openDeleteModalHandler={openDeleteModalHandler}
        openEditModalHandler={openEditModalHandler}
        retrieveDeckItem={retrieveDeckItem}
      />
    </div>
  )
}
