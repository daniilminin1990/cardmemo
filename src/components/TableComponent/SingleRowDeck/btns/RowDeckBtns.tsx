import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import PrivacyMask from '@/assets/icons/svg/PrivacyMask'
import PrivacyMaskCrossed from '@/assets/icons/svg/PrivacyMaskCrossed'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import { FavoriteBtn } from '@/components/TableComponent/SingleRowDeck/btns/FavoriteBtn'
import { LearnBtn } from '@/components/TableComponent/SingleRowDeck/btns/LearnBtn'
import { Button } from '@/components/ui/button'
import { Deck } from '@/services/decks/deck.types'
import { useUpdateDeckMutation } from '@/services/decks/decks.service'
import clsx from 'clsx'

import s from './RowDeckBtns.module.scss'

type Props = {
  className?: string
  item: Deck
  meData: any
  openDeleteModalHandler: (value: boolean) => void
  openEditModalHandler: (value: boolean) => void
  retrieveDeckItem: (item: Deck) => void
}

export const RowDeckBtns = ({
  className,
  item,
  meData,
  openDeleteModalHandler,
  openEditModalHandler,
  retrieveDeckItem,
}: Props) => {
  const [updateDeck] = useUpdateDeckMutation()

  const updateDeckHandler = () => {
    updateDeck({ id: item.id, isPrivate: !item.isPrivate })
  }
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
        <div className={clsx(s.iconBtns, className)}>
          <Button className={clsx(s.btn, s.private)} onClick={updateDeckHandler}>
            {item?.isPrivate ? (
              <PrivacyMask className={s.privateIcon} />
            ) : (
              <PrivacyMaskCrossed className={s.privateIcon} />
            )}
          </Button>
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
        <div className={clsx(s.iconBtns, className)}>
          <FavoriteBtn item={item} />
          <LearnBtn item={item} />
        </div>
      )}
    </>
  )
}
