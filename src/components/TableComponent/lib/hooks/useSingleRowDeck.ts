import { useLocation } from 'react-router-dom'

import { useMeQuery } from '@/features/auth/services/auth.service'
import { Deck } from '@/services/decks/deck.types'

export const useSingleRowDeck = (item: Deck) => {
  const { data: meData } = useMeQuery()
  const location = useLocation()

  const updatedAr = new Date(item.updated).toLocaleDateString('ru-RU')

  const setDeckQueryHandler = () => {
    localStorage.setItem('deckQuery', location.search)
  }

  const isMine = item?.author.id === meData?.id

  return {
    isMine,
    meData,
    setDeckQueryHandler,
    updatedAr,
  }
}
