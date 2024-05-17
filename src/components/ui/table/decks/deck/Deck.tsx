import { useState } from 'react'

import defaltDeckImg from '@/assets/img/defaultDeckImg.jpg'
import { DeckBtns } from '@/components/pages/decksList1/decks/btns/DeckBtns'
import { DeckProps } from '@/components/pages/decksList1/decks/decks.types'
import { ModalDeleteDeck } from '@/components/pages/decksList1/modal/deleteDeck/ModalDeleteDeck'
import { ModalUpdateDeck } from '@/components/pages/decksList1/modal/updateModal/ModalUpdateDeck'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'

import s from './deck.module.scss'

type Props = {
  item: DeckProps
}

export const Deck = ({ item }: Props) => {
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)

  const showUpdateHandler = () => {
    setIsUpdateModal(true)
  }
  const showDeleteHandler = () => {
    setIsDeleteModal(true)
  }

  return (
    <>
      <ModalUpdateDeck item={item} open={isUpdateModal} setOpen={setIsUpdateModal} />
      <ModalDeleteDeck item={item} open={isDeleteModal} setOpen={setIsDeleteModal} />
      <Table.Row className={s.container} key={item.id}>
        <Table.Cell>
          <Button as={'a'} className={s.nameBlock} fullWidth href={'/'}>
            <img
              alt={'default card img'}
              className={s.defaltDeckImg}
              src={item.cover ?? defaltDeckImg}
            />
            <Typography as={'h3'} variant={'body2'}>
              {item.name}
            </Typography>
          </Button>
        </Table.Cell>
        <Table.Cell>{item.cardsCount}</Table.Cell>
        <Table.Cell>{new Date(item.updated).toLocaleDateString()}</Table.Cell>
        <Table.Cell className={s.authorCell}>{item.author.name}</Table.Cell>
        <Table.Cell>
          <DeckBtns
            disabled={item.cardsCount === 0}
            item={item}
            showDeleteModal={showDeleteHandler}
            showUpdateModal={showUpdateHandler}
          />
        </Table.Cell>
      </Table.Row>
    </>
  )
}
