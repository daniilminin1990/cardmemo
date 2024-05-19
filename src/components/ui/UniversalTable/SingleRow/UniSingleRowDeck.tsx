import { Fragment, useState } from 'react'

import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { ModalDeleteDeckMinin } from '@/pagesMinin/ModalsForTable/ModalDeleteDeckMinin'
import { ModalUpdateDeck } from '@/pagesMinin/ModalsForTable/ModalUpdateDeck'

import s from '@/pagesMinin/DecksTable/singleRowDeckMinin.module.scss'

import { Deck } from '../../../../../services/decks/deck.types'

// import { Deck } from '../../services/decks/deck.types'

//! ЭТА СТРОКА ТАБЛИЦЫ СДЕЛАНА ТОЛЬКО ДЛЯ DECKS пока еще. КОПИРУЙ И РЕДАКТИРУЙ КАК ТЕБЕ НАДО
// Возможно позже будет рефактор и она будет универсальной. Либо создам еще одну компоненту для строки Cards
type Props = {
  deck: Deck // Тут указываем типизацию для Deck (или для Card)
  onDeleteClick?: (id: string) => void
  onEditClick?: (name: string) => void
}
export const UniSingleRowDeck = ({ deck, onDeleteClick, onEditClick }: Props) => {
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const updatedAr = new Date(deck.updated).toLocaleDateString('ru-RU')

  return (
    <Fragment key={deck.id}>
      <ModalUpdateDeck // Модалка для изменения Deck
        item={deck}
        onEditClick={(name: string) => onEditClick?.(name)}
        open={isUpdateModal}
        setOpen={setIsUpdateModal}
      />
      <ModalDeleteDeckMinin // Модалка для удаления Deck
        item={deck}
        onDeleteClick={onDeleteClick}
        open={isDeleteModal}
        setIsDeleteModal={setIsDeleteModal}
      />
      <Table.Row key={deck.id}>
        <Table.Cell>{deck.name}</Table.Cell>
        <Table.Cell>{deck.cardsCount}</Table.Cell>
        <Table.Cell>{updatedAr}</Table.Cell>
        <Table.Cell>{deck.author.name}</Table.Cell>
        <Table.Cell>
          {deck.userId === deck.author.id ? (
            <div className={s.iconBtns}>
              <Button className={s.btn} onClick={() => setIsUpdateModal(true)}>
                <Edit2Outline className={s.Edit2Outline} />
              </Button>
              <Button className={s.btn} disabled={deck.cardsCount === 0}>
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
