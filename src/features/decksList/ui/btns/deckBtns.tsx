import { path } from '@/app/routing/path'
import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import { Button } from '@/common/components/button'
import { useNavigation } from '@/common/hooks/useNavigation'
import { useMeQuery } from '@/features/auth/api/authApi'
import { DeckResponse } from '@/features/decksList/model/decks.types'

import s from './deckBtns.module.scss'

type Props = {
  disabled: boolean
  item: DeckResponse
  showDeleteModal?: () => void
  showUpdateModal?: () => void
}

export const DeckBtns = ({ disabled, item, showDeleteModal, showUpdateModal }: Props) => {
  const { goTo } = useNavigation()

  const { data } = useMeQuery()

  const showUpdateModalHandler = () => {
    showUpdateModal && showUpdateModal()
  }
  const showDeleteModalHandler = () => {
    showDeleteModal && showDeleteModal()
  }
  const goToLearnHandler = () => {
    goTo(`${path.cards}/${item.id}${path.learn}`)
  }

  return data?.id === item.userId ? (
    <div className={s.iconBtns}>
      <Button className={s.btn} onClick={showUpdateModalHandler}>
        <Edit2Outline className={s.Edit2Outline} />
      </Button>

      <Button className={s.btn} disabled={disabled} onClick={goToLearnHandler}>
        <PlayCircleOutline className={`${s.playCircleOutline} ${disabled && s.disabled}`} />
      </Button>

      <Button className={s.btn} onClick={showDeleteModalHandler}>
        <TrashOutline className={s.TrashOutline} />
      </Button>
    </div>
  ) : (
    <div className={s.iconBtns}>
      <Button className={s.btn} disabled={disabled} onClick={goToLearnHandler}>
        <PlayCircleOutline className={`${s.playCircleOutline} ${disabled && s.disabled}`} />
      </Button>
    </div>
  )
}
