import { useState } from 'react'
import { Link } from 'react-router-dom'

import { path } from '@/app/routing/path'
import editIcon from '@/assets/icons/edit-2.svg'
import groupIcon from '@/assets/icons/more-vertical-outline.svg'
import playIcon from '@/assets/icons/play-circle.svg'
import deleteIcon from '@/assets/icons/trash.svg'
import defaultDeckImg from '@/assets/img/defaultDeckImg.jpg'
import { DeleteModal } from '@/common/components/deleteModal/deleteModal'
import DropdownMenuDemo from '@/common/components/dropDown/dropDown'
import DropDownItem from '@/common/components/dropDown/dropDownItem'
import Typography from '@/common/components/typography/typography'
import { useNavigation } from '@/common/hooks/useNavigation'
import { useDeleteDeckMutation } from '@/features/decksList/api/decksApi'
import { DeckResponse } from '@/features/decksList/model/decks.types'
import { ModalUpdateDeck } from '@/features/decksList/ui/updateModal/updateDeckModal'

type Props = {
  deck?: DeckResponse
  id: string
}

export const DropDownBtn = ({ deck, id }: Props) => {
  const { goTo } = useNavigation()

  const [deleteDeck] = useDeleteDeckMutation()
  const [isUpdateDeckModal, setIsUpdateDeckModal] = useState(false)
  const [imagePreview, setImagePreview] = useState(defaultDeckImg)

  const [isDeleteModal, setIsDeleteModal] = useState(false)

  const deleteDeckHandler = async () => {
    await deleteDeck({ id: id }).then(() => {
      goTo(path.decks)
    })
  }

  const showModalDeleteDeckHandler = () => {
    setIsDeleteModal(true)
  }
  const showModalUpdateDeckHandler = () => {
    setIsUpdateDeckModal(true)
  }

  return (
    <>
      <DeleteModal
        deleteFn={deleteDeckHandler}
        open={isDeleteModal}
        setOpen={setIsDeleteModal}
        title={'Delete Card'}
      >
        <Typography variant={'subtitle1'}>
          Do you really want to remove this deck ${deck?.name}?
        </Typography>
      </DeleteModal>
      <ModalUpdateDeck
        imagePreview={imagePreview}
        item={deck}
        open={isUpdateDeckModal}
        setImagePreview={setImagePreview}
        setOpen={setIsUpdateDeckModal}
      />
      <DropdownMenuDemo icon={groupIcon} type={'menu'}>
        <div onClick={showModalUpdateDeckHandler}>
          <DropDownItem icon={editIcon} text={'Edit'} />
        </div>
        <Link style={{ textDecoration: 'none' }} to={`${path.cards}/${id}${path.learn}`}>
          <DropDownItem icon={playIcon} text={'Learn'} />
        </Link>
        <div onClick={showModalDeleteDeckHandler}>
          <DropDownItem icon={deleteIcon} text={'Delete'} />
        </div>
      </DropdownMenuDemo>{' '}
    </>
  )
}
