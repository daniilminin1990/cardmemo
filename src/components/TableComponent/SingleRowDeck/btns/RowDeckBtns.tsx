import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import { FavoriteBtn } from '@/components/TableComponent/SingleRowDeck/btns/FavoriteBtn'
import { LearnBtn } from '@/components/TableComponent/SingleRowDeck/btns/LearnBtn'
import { Button } from '@/components/ui/button'
import { Deck } from '@/services/decks/deck.types'

import s from './RowDeckBtns.module.scss'

type Props = {
  item: Deck
  meData: any
  openDeleteModalHandler: (value: boolean) => void
  openEditModalHandler: (value: boolean) => void
  retrieveDeckItem: (item: Deck) => void
}

export const RowDeckBtns = ({
  item,
  meData,
  openDeleteModalHandler,
  openEditModalHandler,
  retrieveDeckItem,
}: Props) => {
  const onDeleteDeckHandler = () => {
    retrieveDeckItem(item)
    openDeleteModalHandler(true)
  }
  const onEditDeckHandler = () => {
    retrieveDeckItem(item)
    openEditModalHandler(true)
  }

  return (
    <>
      {item.userId === meData.id ? (
        <div className={s.iconBtns}>
          <FavoriteBtn item={item} />

          <Button className={s.btn} onClick={onEditDeckHandler}>
            <Edit2Outline className={s.Edit2Outline} />
          </Button>

          <LearnBtn item={item} />

          <Button className={s.btn} onClick={onDeleteDeckHandler}>
            <TrashOutline className={s.TrashOutline} />
          </Button>
        </div>
      ) : (
        <div className={s.iconBtns}>
          <FavoriteBtn item={item} />
          <LearnBtn item={item} />
        </div>
      )}
    </>
  )
}
