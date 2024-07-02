import { Outlet } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

import { selectTheme } from '@/app/model'
import { useAppSelector } from '@/app/store/store'
import Header from '@/components/Layout/Header/Header'
import Loading from '@/components/ui/Loading/Loading'
import { useMeQuery } from '@/features/auth/services/auth.service'

import 'react-toastify/dist/ReactToastify.css'

import s from './layout.module.scss'

export const Layout = () => {
  const theme = useAppSelector(selectTheme)

  const { data: meData, isLoading } = useMeQuery()

  if (isLoading) {
    return <Loading type={'preloader'} />
  }

  return (
    <div>
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
        theme={theme === 'moon' ? 'dark' : 'light'}
        transition={Bounce}
      />
    </div>
  )
}
