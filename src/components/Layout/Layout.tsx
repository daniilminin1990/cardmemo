import { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

import Header from '@/components/Layout/Header/Header'
import { DatePicker } from '@/components/ui/DatePicker'
import Loading from '@/components/ui/Loading/Loading'
import { UserContext } from '@/components/ui/changeTheme/Context'
import { useMeQuery } from '@/services/auth/auth.service'

import 'react-toastify/dist/ReactToastify.css'

import s from './layout.module.scss'

const MIN_DATE = new Date(2022, 6, 1)
const MAX_DATE = new Date(2024, 8, 0)

export const Layout = () => {
  const context = useContext(UserContext)

  const { data: meData, isLoading } = useMeQuery()

  const [date, setDate] = useState(() => new Date())

  if (isLoading) {
    return <Loading type={'preloader'} />
  }

  return (
    <div>
      <Header data={meData} />
      <main className={s.main}>
        <Outlet />
      </main>
      <div style={{ width: '300px' }}>
        <DatePicker max={MAX_DATE} min={MIN_DATE} onChange={setDate} value={date} />
      </div>
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
