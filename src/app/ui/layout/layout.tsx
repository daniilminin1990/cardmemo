import { Outlet } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

import Header from '@/app/ui/header/header'
import { Loading } from '@/common/components/loading/loading'
import { useMeQuery } from '@/features/auth/api/authApi'

import 'react-toastify/dist/ReactToastify.css'

import s from '@/app/ui/layout/layout.module.scss'

export const Layout = () => {
  const { isLoading } = useMeQuery()

  if (isLoading) {
    return (
      <div className={s.loading}>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <Header isAuth />
      <main className={s.main}>
        <Outlet />
      </main>
      <ToastContainer
        autoClose={5000}
        closeOnClick
        draggable
        hideProgressBar={false}
        pauseOnHover
        position={'bottom-left'}
        theme={'dark'}
        transition={Bounce}
      />
    </>
  )
}
