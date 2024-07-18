import { Link } from 'react-router-dom'

import { path } from '@/app/router/path'
import PrivacyMask from '@/assets/icons/svg/PrivacyMask'
import defaultCard from '@/assets/img/defaultCard.jpg'
import { useSingleRowDeck } from '@/components/TableComponent/lib/hooks/useSingleRowDeck'
import { RowDeckBtns } from '@/components/TableComponent/ui/singleRowDeck/btns/RowDeckBtns'
import Typography from '@/components/ui/Typography/Typography'
import { Table } from '@/components/ui/table'
import { Deck } from '@/services/decks/deck.types'
import clsx from 'clsx'

import s from '@/components/TableComponent/ui/singleRowDeck/SingleRowDeck.module.scss'

type Props = {
  item: Deck
  openDeleteModalHandler: (value: boolean) => void
  openEditModalHandler: (value: boolean) => void
  retrieveDeckItem: (item: Deck) => void
}

export const SingleRowDeck = (props: Props) => {
  const { item, openDeleteModalHandler, openEditModalHandler, retrieveDeckItem } = props
  const { isMine, meData, setDeckQueryHandler, updatedAr } = useSingleRowDeck(item)

  return (
    <Table.Row key={item.id}>
      <Table.Cell className={clsx(s.deckRowCell, item?.cardsCount === 0 && s.disabledCell)}>
        <Typography
          as={Link}
          className={s.imgWrapper}
          onClick={setDeckQueryHandler}
          to={`${path.decks}/${item.id}`}
        >
          <div className={s.wrapperCoverImg}>
            <img
              alt={'default card img'}
              className={clsx(s.coverImg, item?.cover && s.withImg)}
              src={item.cover ? item.cover : defaultCard}
            />
          </div>
          <Typography className={clsx(isMine && s.isMine)} variant={isMine ? 'subtitle1' : 'body1'}>
            {item.name}
          </Typography>
        </Typography>
        <div className={clsx(s.privacyStep, 'step-private-deck')}>
          {item?.isPrivate && <PrivacyMask className={s.privacyIcon} />}
        </div>
      </Table.Cell>
      <Table.Cell>
        <Typography>{item.cardsCount}</Typography>
      </Table.Cell>
      <Table.Cell>
        <Typography>{updatedAr}</Typography>
      </Table.Cell>
      <Table.Cell>
        <Typography>{item.author.name}</Typography>
      </Table.Cell>
      <Table.Cell>
        <RowDeckBtns
          item={item}
          meData={meData}
          openDeleteModalHandler={openDeleteModalHandler}
          openEditModalHandler={openEditModalHandler}
          retrieveDeckItem={retrieveDeckItem}
        />
      </Table.Cell>
    </Table.Row>
  )
}
