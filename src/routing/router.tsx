import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import ErrorPage from '@/components/pages/auth/ErrorPage/ErrorPage'
import Header from '@/components/pages/auth/Header/Header'
import { PersonalInfo } from '@/components/pages/auth/PersonalInfo/PersonalInfo'
import { CheckEmail } from '@/components/pages/auth/forgot-pass/check-email/checkEmail'
import { ForgotPassword } from '@/components/pages/auth/forgot-pass/forgotPassword'
import { SignIn } from '@/components/pages/auth/sign-in/sign-in'
import SignUp from '@/components/pages/auth/sign-up/Sign-up'
import { CardsList } from '@/components/pages/cardsList/cardsList'
import { Loading } from '@/components/pages/common/loading/loading'
import { DecksList } from '@/components/pages/decksList1/decksList'
import { LearnList } from '@/components/pages/learnList/learnList'
import { useMeQuery } from '@/services/auth/auth.services'

import s from './router.module.scss'

const publicRoutes: RouteObject[] = [
  {
    element: <SignIn />,
    path: '/login',
  },
  { element: <ErrorPage />, path: '*' },
  {
    element: <ForgotPassword />,
    path: '/forgotPassword',
  },
  {
    element: <SignUp />,
    path: '/signUp',
  },
  {
    element: <CheckEmail />,
    path: '/checkEmail/*',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Navigate to={'/decks'} />,
    path: '/',
  },
  {
    element: <DecksList />,
    path: '/decks',
  },
  {
    element: <CardsList />,
    path: '/cards/:id',
  },
  {
    element: <LearnList />,
    path: '/cards/:id/learn',
  },
  {
    element: <PersonalInfo />,
    path: '/profile',
  },
]

export const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

function PrivateRoutes() {
  const { data, isLoading, isSuccess } = useMeQuery()

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
        {isSuccess && data.id ? <Outlet /> : <Navigate to={'/login'} />}
      </main>
    </>
  )
}
export function Router() {
  return <RouterProvider router={router} />
}
