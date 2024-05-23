import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { ModalAddEditDeck } from '@/pagesMinin/ModalsForTable/ModalAddEditDeck'
import { ModalDeleteDeckMinin } from '@/pagesMinin/ModalsForTable/ModalDeleteDeckMinin'

import s from '@/pagesMinin/Tables/tableSingleRow.module.scss'

import { Deck } from '../../../../services/decks/deck.types'

type Props = {
  item: Deck
}
export const SingleRowDeck = ({ item }: Props) => {
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const updatedAr = new Date(item.updated).toLocaleDateString('ru-RU')

  // ДЛЯ ИЗУЧЕНИЯ (Learn) Перенаправляем пользователя на другую страницу (На круглую кнопку)
  // через хук навигации и используем deckId
  // const navigate = useNavigate()
  // const handleClickNavToCards = () => {
  //   navigate(`/decks/${deck.id} ЧТО ТО ДОПИСАТЬ`)
  // }

  return (
    <Fragment key={item.id}>
      {/*<ModalUpdateDeck item={deck} open={isUpdateModal} setOpen={setIsUpdateModal} />*/}
      <ModalAddEditDeck item={item} open={isUpdateModal} setOpen={setIsUpdateModal} />
      <ModalDeleteDeckMinin item={item} open={isDeleteModal} setIsDeleteModal={setIsDeleteModal} />
      <Table.Row key={item.id}>
        <Table.Cell>
          {/* Переходим по роутингу*/}
          <Typography as={Link} className={s.imgWrapper} to={`/decks/${item.id}`}>
            {item.cover && <img alt={'default card img'} className={s.coverImg} src={item.cover} />}
            {item.name}
          </Typography>
        </Table.Cell>
        <Table.Cell>{item.cardsCount}</Table.Cell>
        <Table.Cell>{updatedAr}</Table.Cell>
        <Table.Cell>{item.author.name}</Table.Cell>
        <Table.Cell>
          {item.userId === item.author.id ? (
            <div className={s.iconBtns}>
              <Button className={s.btn} onClick={() => setIsUpdateModal(true)}>
                <Edit2Outline className={s.Edit2Outline} />
              </Button>
              <Button className={s.btn} disabled={!item.cardsCount}>
                <PlayCircleOutline
                  className={`${s.playCircleOutline} ${item.cardsCount === 0 && s.disabled}`}
                />
              </Button>
              <Button className={s.btn} onClick={() => setIsDeleteModal(true)}>
                <TrashOutline className={s.TrashOutline} />
              </Button>
            </div>
          ) : (
            <div className={s.iconBtns}>
              <Button className={s.btn} disabled={item.cardsCount === 0}>
                <PlayCircleOutline
                  className={`${s.playCircleOutline} ${item.cardsCount === 0 && s.disabled}`}
                />
              </Button>
            </div>
          )}
        </Table.Cell>
      </Table.Row>
    </Fragment>
  )
}
