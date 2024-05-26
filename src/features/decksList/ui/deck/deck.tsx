import { useState } from 'react'

import { path } from '@/app/routing/path'
import defaultDeckImg from '@/assets/img/defaultDeckImg.jpg'
import { Button } from '@/common/components/button'
import { DeleteModal } from '@/common/components/deleteModal/deleteModal'
import { Table } from '@/common/components/table/table'
import Typography from '@/common/components/typography/typography'
import { useDeleteDeckMutation } from '@/features/decksList/api/decksApi'
import { DeckResponse } from '@/features/decksList/model/decks.types'
import { DeckBtns } from '@/features/decksList/ui/btns/deckBtns'
import { ModalUpdateDeck } from '@/features/decksList/ui/updateModal/updateDeckModal'

import s from './deck.module.scss'

type Props = {
  item: DeckResponse
}

export const Deck = ({ item }: Props) => {
  const [deleteDeck, {}] = useDeleteDeckMutation()

  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [imagePreview, setImagePreview] = useState(defaultDeckImg)

  const showUpdateHandler = () => {
    item.cover ? setImagePreview(item.cover) : setImagePreview(defaultDeckImg)
    setIsUpdateModal(true)
  }
  const showDeleteHandler = () => {
    setIsDeleteModal(true)
  }
  const deleteDeckHandler = async () => {
    await deleteDeck({ id: item.id })
  }

  return (
    <>
      <ModalUpdateDeck
        imagePreview={imagePreview}
        item={item}
        open={isUpdateModal}
        setImagePreview={setImagePreview}
        setOpen={setIsUpdateModal}
      />
      <DeleteModal
        deleteFn={deleteDeckHandler}
        open={isDeleteModal}
        setOpen={setIsDeleteModal}
        title={'Delete Deck'}
      >
        <Typography variant={'subtitle1'}>Do you really want to remove ${item.name}?</Typography>
        <Typography variant={'subtitle1'}>All cards will be deleted.</Typography>
      </DeleteModal>
      <Table.Row className={s.container} key={item.id}>
        <Table.Cell className={s.name}>
          <Button as={'a'} className={s.nameBlock} fullWidth href={`${path.cards}/${item.id}`}>
            <img
              alt={'default card img'}
              className={s.defaltDeckImg}
              src={item.cover ?? defaultDeckImg}
            />
            <Typography as={'h3'} variant={'body2'}>
              {item.name}
            </Typography>
          </Button>
        </Table.Cell>
        <Table.Cell className={s.cardsCount}>{item.cardsCount}</Table.Cell>
        <Table.Cell className={s.date}>{new Date(item.updated).toLocaleDateString()}</Table.Cell>
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
