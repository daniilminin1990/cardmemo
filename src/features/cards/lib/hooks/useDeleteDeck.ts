import { path } from '@/router/path'
import { router } from '@/router/router'
import { useDeleteDeckMutation } from '@/services/decks/decks.service'

type Props = {
  deckId: string
  setIsDeleteDeckModal: (isDeleteDeckModal: boolean) => void
}

export const useDeleteDeck = ({ deckId, setIsDeleteDeckModal }: Props) => {
  const [deleteDeck] = useDeleteDeckMutation()
  const deckQuery = localStorage.getItem('deckQuery') ? `/${localStorage.getItem('deckQuery')}` : ''

  const onDeleteDeckHandler = () => {
    deleteDeck({ id: deckId })
    setIsDeleteDeckModal(true)
    if (deckId) {
      router.navigate(`${path.decks}${deckQuery}`)
    }
  }

  return { onDeleteDeckHandler }
}
