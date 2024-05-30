import { ElementType } from 'react'

import ArrowBackOutline from '@/assets/icons/svg/ArrowBackOutline'
import { Button } from '@/components/ui/button'

import s from './BackBtn.module.scss'

type Props = {
  as: ElementType
  name: string
  onClick?: () => void
  path: string
}

export const BackBtn = ({ as, name, onClick, path }: Props) => {
  return (
    <Button as={as} className={s.backBtn} onClick={onClick} to={path}>
      <ArrowBackOutline className={s.backArrow} />
      {name}
    </Button>
  )
}
