import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

import { ModalProvider } from '@/common/contexts/ModalProvider/ModalProvider'
import Header from '@/components/Layout/Header/Header'
import Loading from '@/components/ui/Loading/Loading'
import { UserContext } from '@/components/ui/changeTheme/Context'
import { useMeQuery } from '@/services/auth/auth.service'

import 'react-toastify/dist/ReactToastify.css'

import s from './layout.module.scss'

export const Layout = () => {
  const context = useContext(UserContext)

  const { data: meData, isLoading } = useMeQuery()

  if (isLoading) {
    return <Loading type={'preloader'} />
  }

  return (
    <div>
      <ModalProvider>
        <Header data={meData} />
        <main className={s.main}>
          <Outlet />
        </main>
      </ModalProvider>
      <ToastContainer
        autoClose={5000}
        closeOnClick
        draggable
        hideProgressBar={false}
        pauseOnHover
        position={'bottom-left'}
        theme={context?.theme === 'moon' ? 'dark' : 'light'}
        transition={Bounce}
      />
    </div>
  )
}
