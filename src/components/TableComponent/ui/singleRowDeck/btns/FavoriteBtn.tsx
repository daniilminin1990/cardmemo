import Star from '@/assets/icons/svg/Star'
import StarOutline from '@/assets/icons/svg/StarOutline'
import { Button } from '@/components/ui/button'
import { Deck } from '@/services/decks/deck.types'
import {
  useDeleteFavoriteDeckStatusMutation,
  useSetFavoriteDeckMutation,
} from '@/services/decks/decks.service'

import s from '@/components/TableComponent/ui/singleRowDeck/btns/RowDeckBtns.module.scss'

type Props = {
  item: Deck
}

export const FavoriteBtn = ({ item }: Props) => {
  const [setFavoriteDeck] = useSetFavoriteDeckMutation()
  const [deleteFavoriteDeckStatus] = useDeleteFavoriteDeckStatusMutation()
  const setFavoriteDeckHandler = () => {
    setFavoriteDeck({ id: item.id })
  }
  const deleteFavoriteDeckHandler = () => {
    deleteFavoriteDeckStatus({ id: item.id })
  }

  return item.isFavorite ? (
    <Button className={s.btn} onClick={deleteFavoriteDeckHandler}>
      <Star className={s.starFavorite} />
    </Button>
  ) : (
    <Button className={s.btn} onClick={setFavoriteDeckHandler}>
      <StarOutline className={s.starFavorite} />
    </Button>
  )
}
