import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

export type CardProps = ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...restProps }, ref) => {
  const classNames = clsx(s.root, className)

  return <div className={classNames} ref={ref} {...restProps}></div>
})
