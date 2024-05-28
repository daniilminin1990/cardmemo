import { Outlet } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

import Header from '@/components/Layout/Header/Header'
import Loading from '@/components/ui/Loading/Loading'
import { useMeQuery } from '@/services/auth/auth.service'

import 'react-toastify/dist/ReactToastify.css'

import s from './layout.module.scss'

export const Layout = () => {
  const { data: meData, isLoading } = useMeQuery()

  if (isLoading) {
    return <Loading />
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
