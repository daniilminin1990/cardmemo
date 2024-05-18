import { Fragment, useState } from 'react'

import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { ModalDeleteDeck } from '@/pages/ModalsForTable/ModalDeleteDeck'
import { ModalUpdateDeck } from '@/pages/ModalsForTable/ModalUpdateDeck'

import s from '@/pages/singleRowDeck.module.scss'

import { Deck } from '../../services/decks/deck.types'

type Props = {
  deck: Deck
}
export const SingleRowDeck = ({ deck }: Props) => {
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const updatedAr = new Date(deck.updated).toLocaleDateString('ru-RU')

  return (
    <Fragment key={deck.id}>
      <ModalUpdateDeck item={deck} open={isUpdateModal} setOpen={setIsUpdateModal} />
      <ModalDeleteDeck item={deck} open={isDeleteModal} setIsDeleteModal={setIsDeleteModal} />
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
