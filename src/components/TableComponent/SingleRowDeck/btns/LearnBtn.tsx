import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import { Button } from '@/components/ui/button'
import { path } from '@/router/path'
import { Deck } from '@/services/decks/deck.types'

import s from './RowDeckBtns.module.scss'

type Props = {
  item: Deck
}

export const LearnBtn = ({ item }: Props) => {
  return (
    <>
      {item.cardsCount === 0 ? (
        <Button className={s.btn} disabled={item.cardsCount === 0}>
          <PlayCircleOutline className={`${s.playCircleOutline} ${s.disabled}`} />
        </Button>
      ) : (
        <Button as={'a'} className={s.btn} href={`${path.decks}/${item.id}${path.learn}`}>
          <PlayCircleOutline className={s.playCircleOutline} />
        </Button>
      )}
    </>
  )
}
