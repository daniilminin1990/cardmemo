import { Link } from 'react-router-dom'

import { path } from '@/app/router/path'
import { useTableDeckMobile } from '@/components/TableComponent/lib/hooks/useTableDeckMobile'
import { RowDeckBtns } from '@/components/TableComponent/ui/singleRowDeck/btns/RowDeckBtns'
import Typography from '@/components/ui/Typography/Typography'
import { Table } from '@/components/ui/table'
import { Deck } from '@/services/decks/deck.types'
import clsx from 'clsx'

import s from '@/components/TableComponent/ui/mobile/TableDeckMobile/TableDeckMobile.module.scss'

type Props = {
  item: Deck
  openDeleteModalHandler: (value: boolean) => void
  openEditModalHandler: (value: boolean) => void
  retrieveDeckItem: (item: Deck) => void
}

export const TableDeckMobile = (props: Props) => {
  const { item, openDeleteModalHandler, openEditModalHandler, retrieveDeckItem } = props
  const { cards, createdBy, lastUpdated, meData, name, updatedAr } = useTableDeckMobile({
    item,
    openDeleteModalHandler,
    openEditModalHandler,
    retrieveDeckItem,
  })

  return (
    <div className={s.root}>
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Table.HeadCell
              className={clsx(item?.cardsCount === 0 && s.disabledCell)}
              scope={'row'}
            >
              <Typography as={Link} className={s.nameWrapper} to={`${path.decks}/${item.id}`}>
                {name}
              </Typography>
            </Table.HeadCell>
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
