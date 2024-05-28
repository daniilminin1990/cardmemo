import { Outlet } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

import Header from '@/components/Layout/Header/Header'
import { useMeQuery } from '@/services/auth/auth.service'

import 'react-toastify/dist/ReactToastify.css'

import s from './layout.module.scss'

export const Layout = () => {
  const { data: meData, isLoading } = useMeQuery()

  if (isLoading) {
    return (
      <div className={s.loading}>
        return <div>Loading...</div>
      </div>
    )
  }

  return (
    <>
      <Header data={meData} />
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
