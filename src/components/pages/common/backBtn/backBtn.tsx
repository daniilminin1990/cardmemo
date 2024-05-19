import ArrowBackOutline from '@/assets/icons/svg/ArrowBackOutline'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'

import s from './backBtn.module.scss'

type Props = {
  goTo: () => void
  name: string
}

export const BackBtn = ({ goTo, name }: Props) => {
  return (
    <Button as={'a'} className={s.backBtn} onClick={goTo}>
      <Typography as={'span'} className={s.text} variant={'body2'}>
        <ArrowBackOutline className={s.backArrow} />
        {name}
      </Typography>
    </Button>
  )
}
