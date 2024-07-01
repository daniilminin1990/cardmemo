import { useNavigate } from 'react-router-dom'

import { path } from '@/app/router/path'
import { ModalKey, useModal } from '@/common/hooks/useModal'
import { useDeleteDeckMutation } from '@/services/decks/decks.service'

type Props = {
  deckId: string
}

export const useDeleteDeck = ({ deckId }: Props) => {
  const [deleteDeck] = useDeleteDeckMutation()
  const deckQuery = localStorage.getItem('deckQuery') ? `/${localStorage.getItem('deckQuery')}` : ''
  const { setOpen } = useModal(ModalKey.DeleteDeck)
  const navigate = useNavigate()

  const onDeleteDeckHandler = () => {
    deleteDeck({ id: deckId })
    setOpen(false)
    if (deckId) {
      navigate(`${path.decks}${deckQuery}`)
    }
  }

  return { onDeleteDeckHandler }
}
