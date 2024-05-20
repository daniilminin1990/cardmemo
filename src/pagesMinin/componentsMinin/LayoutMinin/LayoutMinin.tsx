import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import Header from '@/components/auth/Header/Header'
import { clsx } from 'clsx'

import s from './layoutMinin.module.scss'

type Props = {
  isAuth: boolean
  marginTopClass?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<'div'>

// Я хер его знает зачем в forwardRef
export const LayoutMinin = forwardRef<ElementRef<'div'>, Props>((props, ref) => {
  const { children, className, isAuth, ...rest } = props
  const classes = clsx()

  console.log(classes)

  return (
    <div ref={ref} {...rest}>
      <Header isAuth={isAuth} />
      <main className={s.main}>{children}</main>
    </div>
  )
})
