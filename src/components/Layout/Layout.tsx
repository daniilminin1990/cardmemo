import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@/components/auth/Header/Header'
import { useMeQuery } from '@/services/auth/auth.service'

import s from './layout.module.scss'

type Props = {
  marginTopClass?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<'div'>

// Я хер его знает зачем в forwardRef
export const Layout = forwardRef<ElementRef<'div'>, Props>((props, ref) => {
  const { children, className, ...rest } = props

  // ? Тут в Header и в main нужно передать данные от me запроса.
  const { data: meData, isLoading } = useMeQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div ref={ref} {...rest}>
      <Header data={meData} />
      {/*<main className={s.main}>{children}</main>*/}
      <main className={s.main}>
        {/*<Outlet context={!isError} />*/}
        <Outlet />
      </main>
    </div>
  )
})
