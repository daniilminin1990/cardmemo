import { useContext } from 'react'
import { RouterProvider } from 'react-router-dom'

import { UserContext } from '@/components/ui/changeTheme/Context'
import { router } from '@/router/router'
import { clsx } from 'clsx'

import style from '../App.module.scss'

export function App() {
  const context = useContext(UserContext)

  return (
    <div className={context?.theme === 'moon' ? style.wrapper : clsx(style.wrapper, style.sun)}>
      <RouterProvider router={router} />
    </div>
  )
}
