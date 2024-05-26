import ArrowBackOutline from '@/assets/icons/svg/ArrowBackOutline'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'

import s from './BackBtn.module.scss'

type Props = {
  name: string
  path: string
}

export const BackBtn = ({ name, path }: Props) => {
  return (
    <Button as={'a'} className={s.backBtn} href={path}>
      <Typography as={'span'} className={s.text} variant={'body2'}>
        <ArrowBackOutline className={s.backArrow} />
        {name}
      </Typography>
    </Button>
  )
}
