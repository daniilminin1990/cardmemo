import { ComponentPropsWithRef, ElementType, ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
  children: ReactNode
  className?: string
} & ComponentPropsWithRef<'div'>

const CardWithoutRef = <T extends ElementType = 'div'>(props: CardProps<T>, ref: any) => {
  const { as: Component = 'div', ...rest } = props
  const classNames = clsx(s.root, props.className)

  return <Component className={classNames} {...rest} ref={ref} />
}

export const Card = forwardRef(CardWithoutRef)
