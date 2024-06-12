import { Link, useLocation } from 'react-router-dom'

import PrivacyMask from '@/assets/icons/svg/PrivacyMask'
// import defaultCard from '@/assets/img/defaultCard.jpg'
import flashCardsDefault2 from '@/assets/img/flashcardsDefault2.png'
import { RowDeckBtns } from '@/components/TableComponent/SingleRowDeck/btns/RowDeckBtns'
import Typography from '@/components/ui/Typography/Typography'
import { Table } from '@/components/ui/table'
import { path } from '@/router/path'
import { useMeQuery } from '@/services/auth/auth.service'
import { Deck } from '@/services/decks/deck.types'
import clsx from 'clsx'

import s from './SingleRowDeck.module.scss'

type Props = {
  item: Deck
  openDeleteModalHandler: (value: boolean) => void
  openEditModalHandler: (value: boolean) => void
  retrieveDeckItem: (item: Deck) => void
}
export const SingleRowDeck = ({
  item,
  openDeleteModalHandler,
  openEditModalHandler,
  retrieveDeckItem,
}: Props) => {
  const { data: meData } = useMeQuery()

  const updatedAr = new Date(item.updated).toLocaleDateString('ru-RU')
  // Сэтаем в локальное хранилище параметры поиска
  const location = useLocation()
  const setDeckQueryHandler = () => {
    localStorage.setItem('deckQuery', location.search)
  }

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
              // className={clsx(s.coverImg, item?.cover ? s.withImg : s.defImg)}
              className={clsx(item?.cover ? s.coverImg : s.defImg)}
              src={item.cover ? item.cover : flashCardsDefault2}
              // src={item.cover ? item.cover : defaultCard}
            />
          </div>
          <Typography>{item.name}</Typography>
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
