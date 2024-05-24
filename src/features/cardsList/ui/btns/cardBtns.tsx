import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import { Button } from '@/common/components/button'

import s from './cardBtns.module.scss'

type Props = {
  showDeleteModal: () => void
  showUpdateHandler: () => void
}

export const CardBtns = ({ showDeleteModal, showUpdateHandler }: Props) => {
  const showUpdateModalHandler = () => {
    showUpdateHandler()
  }
  const showDeleteModalHandler = () => {
    showDeleteModal()
  }

  return (
    <div className={s.iconBtns}>
      <Button className={s.btn} onClick={showUpdateModalHandler}>
        <Edit2Outline className={s.Edit2Outline} />
      </Button>
      <Button className={s.btn} onClick={showDeleteModalHandler}>
        <TrashOutline className={s.TrashOutline} />
      </Button>
    </div>
  )
}
