import { ComponentPropsWithoutRef, FC } from 'react'

import { clsx } from 'clsx'

import s from '../paginationTest.module.scss'

type Props = {
  active?: boolean
  disabled?: boolean
} & ComponentPropsWithoutRef<'button'>

export const PageLinkTest: FC<Props> = ({ active, children, className, disabled, ...rest }) => {
  const classes = clsx(s.pageLink, disabled && s.disabled, active && s.active, className)

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  )
}
