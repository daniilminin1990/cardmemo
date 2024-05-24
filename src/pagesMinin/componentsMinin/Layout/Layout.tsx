import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import Header from '@/components/auth/Header/Header'

import s from './layout.module.scss'

import { useMeQuery } from '../../../../services/auth/auth.service'

type Props = {
  isAuth: boolean
  marginTopClass?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<'div'>

// Я хер его знает зачем в forwardRef
export const Layout = forwardRef<ElementRef<'div'>, Props>((props, ref) => {
  const { children, className, isAuth, ...rest } = props

  // ? Тут в Header и в main нужно передать данные от me запроса.
  const { data } = useMeQuery()

  return (
    <div ref={ref} {...rest}>
      <Header isAuth={!!data} />
      <main className={s.main}>{children}</main>
    </div>
  )
})
