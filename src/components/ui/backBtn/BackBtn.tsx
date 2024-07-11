import { ReactNode, memo } from 'react'
import { Link } from 'react-router-dom'

import ArrowBackOutline from '@/assets/icons/svg/ArrowBackOutline'
import { Button } from '@/components/ui/button'

import s from './BackBtn.module.scss'

type Props = {
  children: ReactNode
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  to: string
}

export const BackBtn = memo(({ children, onClick, to }: Props) => {
  return (
    <Button as={Link} className={s.backBtn} onClick={onClick} to={to}>
      <ArrowBackOutline className={s.backArrow} />
      {children}
    </Button>
  )
})
