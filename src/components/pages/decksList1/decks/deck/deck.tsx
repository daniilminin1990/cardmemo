import { useState } from 'react'

import defaultDeckImg from '@/assets/img/defaultDeckImg.jpg'
import { DeleteModal } from '@/components/pages/common/deleteModal/deleteModal'
import { DeckBtns } from '@/components/pages/decksList1/decks/btns/deckBtns'
import { DeckProps } from '@/components/pages/decksList1/decks/decks.types'
import { ModalUpdateDeck } from '@/components/pages/decksList1/modal/updateModal/updateDeckModal'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { useNavigation } from '@/components/utils/hooks/useNavigate'
import { useDeleteDeckMutation } from '@/services/decks/decks.services'

import s from './deck.module.scss'

type Props = {
  item: DeckProps
}

export const Deck = ({ item }: Props) => {
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [imagePreview, setImagePreview] = useState(defaultDeckImg)
  const { goTo } = useNavigation()

  const [deleteDeck, {}] = useDeleteDeckMutation()

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
        <Table.Cell>
          <Button
            as={'a'}
            className={s.nameBlock}
            fullWidth
            onClick={() => goTo(`/cards/${item.id}`)}
          >
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
        <Table.Cell>{item.cardsCount}</Table.Cell>
        <Table.Cell>{new Date(item.updated).toLocaleDateString()}</Table.Cell>
        <Table.Cell className={s.authorCell}>{item.author.name}</Table.Cell>
        <Table.Cell>
          <DeckBtns
            disabled={item.cardsCount === 0}
            goTo={goTo}
            item={item}
            showDeleteModal={showDeleteHandler}
            showUpdateModal={showUpdateHandler}
          />
        </Table.Cell>
      </Table.Row>
    </>
  )
}
