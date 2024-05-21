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

import s from '@/pagesMinin/TablesMinin/singleRowDeckMinin.module.scss'

import { Deck } from '../../../../services/decks/deck.types'

type Props = {
  deck: Deck
}
export const SingleRowDeckMinin = ({ deck }: Props) => {
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const updatedAr = new Date(deck.updated).toLocaleDateString('ru-RU')

  // ДЛЯ ИЗУЧЕНИЯ (Learn) Перенаправляем пользователя на другую страницу (На круглую кнопку)
  // через хук навигации и используем deckId
  // const navigate = useNavigate()
  // const handleClickNavToCards = () => {
  //   navigate(`/decks/${deck.id} ЧТО ТО ДОПИСАТЬ`)
  // }

  return (
    <Fragment key={deck.id}>
      {/*<ModalUpdateDeck item={deck} open={isUpdateModal} setOpen={setIsUpdateModal} />*/}
      <ModalAddEditDeck item={deck} open={isUpdateModal} setOpen={setIsUpdateModal} />
      <ModalDeleteDeckMinin item={deck} open={isDeleteModal} setIsDeleteModal={setIsDeleteModal} />
      <Table.Row key={deck.id}>
        <Table.Cell>
          {/* Переходим по роутингу*/}
          <Typography as={Link} className={s.imgWrapper} to={`/decks/${deck.id}`}>
            {deck.cover ? (
              <img alt={'default card img'} className={s.coverImg} src={deck.cover} />
            ) : null}
            {deck.name}
          </Typography>
        </Table.Cell>
        <Table.Cell>{deck.cardsCount}</Table.Cell>
        <Table.Cell>{updatedAr}</Table.Cell>
        <Table.Cell>{deck.author.name}</Table.Cell>
        <Table.Cell>
          {deck.userId === deck.author.id ? (
            <div className={s.iconBtns}>
              <Button className={s.btn} onClick={() => setIsUpdateModal(true)}>
                <Edit2Outline className={s.Edit2Outline} />
              </Button>
              <Button className={s.btn} disabled={!deck.cardsCount}>
                <PlayCircleOutline
                  className={`${s.playCircleOutline} ${deck.cardsCount === 0 && s.disabled}`}
                />
              </Button>
              <Button className={s.btn} onClick={() => setIsDeleteModal(true)}>
                <TrashOutline className={s.TrashOutline} />
              </Button>
            </div>
          ) : (
            <div className={s.iconBtns}>
              <Button className={s.btn} disabled={deck.cardsCount === 0}>
                <PlayCircleOutline
                  className={`${s.playCircleOutline} ${deck.cardsCount === 0 && s.disabled}`}
                />
              </Button>
            </div>
          )}
        </Table.Cell>
      </Table.Row>
    </Fragment>
  )
}
