import { HTMLProps, ReactNode } from 'react'

import Typography from '@/components/ui/Typography/Typography'
import clsx from 'clsx'

import s from '../pagination.module.scss'

type Props = {
  active?: boolean
  children?: ReactNode
  className?: string
  disabled?: boolean
} & HTMLProps<HTMLAnchorElement>

export const PageLink = ({ active, children, className, disabled, ...props }: Props) => {
  const customClassName = clsx(s.pageLink, className, {
    [s.active]: active,
    [s.disabled]: disabled,
  })

  return (
    <div className={s.pageLinkWrapper}>
      {disabled ? (
        <Typography as={'p'} className={clsx(customClassName, s.pageLink)} variant={'body1'}>
          {children}
        </Typography>
      ) : (
        <Typography
          {...props}
          aria-current={active ? 'page' : undefined}
          as={'a'}
          className={customClassName}
          target={'_self'}
          variant={'link1'}
        >
          {children}
        </Typography>
      )}
    </div>
  )
}
