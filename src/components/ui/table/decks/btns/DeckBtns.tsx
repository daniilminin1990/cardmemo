import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import { Button } from '@/components/ui/button'
import { DecksProps } from '@/components/ui/table/decks/Decks'

import s from './deckBtns.module.scss'

type Props = {
  disabled: boolean
  item: DecksProps
}

export const DeckBtns = ({ disabled, item }: Props) => {
  return item.userId === item.author.id ? (
    <div className={s.iconBtns}>
      <Button className={s.btn}>
        <Edit2Outline className={s.Edit2Outline} />
      </Button>
      <Button className={s.btn} disabled={disabled}>
        <PlayCircleOutline className={`${s.playCircleOutline} ${disabled && s.disabled}`} />
      </Button>
      <Button className={s.btn}>
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
