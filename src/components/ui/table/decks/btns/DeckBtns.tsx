import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import { DeckProps } from '@/components/pages/decksList1/decks/decks.types'
import { Button } from '@/components/ui/button'

import s from './deckBtns.module.scss'

type Props = {
  disabled: boolean
  item: DeckProps
  showDeleteModal?: () => void
  showUpdateModal?: () => void
}

export const DeckBtns = ({ disabled, item, showDeleteModal, showUpdateModal }: Props) => {
  const showUpdateModalHandler = () => {
    showUpdateModal && showUpdateModal()
  }
  const showDeleteModalHandler = () => {
    showDeleteModal && showDeleteModal()
  }

  return item.userId === item.author.id ? (
    <div className={s.iconBtns}>
      <Button className={s.btn} onClick={showUpdateModalHandler}>
        <Edit2Outline className={s.Edit2Outline} />
      </Button>
      <Button className={s.btn} disabled={disabled}>
        <PlayCircleOutline className={`${s.playCircleOutline} ${disabled && s.disabled}`} />
      </Button>
      <Button className={s.btn} onClick={showDeleteModalHandler}>
        <TrashOutline className={s.TrashOutline} />
      </Button>
    </div>
  ) : (
    <div className={s.iconBtns}>
      <Button className={s.btn} disabled={disabled}>
        <PlayCircleOutline className={`${s.playCircleOutline} ${disabled && s.disabled}`} />
      </Button>
    </div>
  )
}
