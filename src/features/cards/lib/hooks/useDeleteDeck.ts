import { path } from '@/router/path'
import { useDeleteDeckMutation } from '@/services/decks/decks.service'
import { useNavigate } from "react-router-dom";

type Props = {
  deckId: string
  setIsDeleteDeckModal: (isDeleteDeckModal: boolean) => void
}

export const useDeleteDeck = ({ deckId, setIsDeleteDeckModal }: Props) => {
  const [deleteDeck] = useDeleteDeckMutation()
  const deckQuery = localStorage.getItem('deckQuery') ? `/${localStorage.getItem('deckQuery')}` : ''
  const navigate = useNavigate()

  const onDeleteDeckHandler = () => {
    deleteDeck({ id: deckId })
    setIsDeleteDeckModal(true)
    if (deckId) {
      navigate(`${path.decks}${deckQuery}`)
    }
  }

  return { onDeleteDeckHandler }
}
