import { Link } from 'react-router-dom'

import { path } from '@/app/router/path'
import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import { Button } from '@/components/ui/button'
import { Deck } from '@/services/decks/deck.types'

import s from '@/components/TableComponent/ui/singleRowDeck/btns/RowDeckBtns.module.scss'

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
        <Button as={Link} className={s.btn} to={`${path.decks}/${item.id}${path.learn}`}>
          <PlayCircleOutline className={s.playCircleOutline} />
        </Button>
      )}
    </>
  )
}
