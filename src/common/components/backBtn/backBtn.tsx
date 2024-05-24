import ArrowBackOutline from '@/assets/icons/svg/ArrowBackOutline'
import { Button } from '@/common/components/button'
import Typography from '@/common/components/typography/typography'

import s from './backBtn.module.scss'

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
