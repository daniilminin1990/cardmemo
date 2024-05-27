import { ElementType } from 'react'

import ArrowBackOutline from '@/assets/icons/svg/ArrowBackOutline'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'

import s from './BackBtn.module.scss'

type Props = {
  as: ElementType | undefined
  name: string
  onClick?: () => void
  path: string
}

export const BackBtn = ({ as, name, onClick, path }: Props) => {
  return (
    <Button as={as} className={s.backBtn} href={as === 'a' ? path : '#'} onClick={onClick}>
      <Typography as={'span'} className={s.text} variant={'body2'}>
        <ArrowBackOutline className={s.backArrow} />
        {name}
      </Typography>
    </Button>
  )
}
