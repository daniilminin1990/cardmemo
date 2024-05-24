import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { path } from '@/app/routing/path'
import ErrorPage from '@/app/ui/errorPage/errorPage'
import Header from '@/app/ui/header/header'
import { PersonalInfo } from '@/app/ui/personalInfo/personalInfo'
import { Loading } from '@/common/components/loading/loading'
import { useMeQuery } from '@/features/auth/api/authApi'
import { CheckEmail } from '@/features/auth/ui/checkEmail/checkEmail'
import { CreateNewPassword } from '@/features/auth/ui/createNewPassword/createNewPassword'
import { RecoverPassword } from '@/features/auth/ui/recoverPassword/recoverPassword'
import { SignIn } from '@/features/auth/ui/signIn/signIn'
import SignUp from '@/features/auth/ui/signUp/signUp'
import { CardsList } from '@/features/cardsList/ui/cardsList'
import { DecksList } from '@/features/decksList/ui/decksList'
import { LearnList } from '@/features/learnList/learnList'

import s from './router.module.scss'

const publicRoutes: RouteObject[] = [
  {
    element: <SignIn />,
    path: path.login,
  },
  {
    element: <Navigate replace to={path.notFound} />,
    path: '/*',
  },
  {
    element: <RecoverPassword />,
    path: path.recoverPassword,
  },
  {
    element: <SignUp />,
    path: path.signUp,
  },
  {
    element: <CheckEmail />,
    path: `${path.checkEmail}/:email`,
  },
  {
    element: <CreateNewPassword />,
    path: `${path.createNewPassword}/:token`,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Navigate to={path.decks} />,
    path: '/',
  },
  {
    element: <DecksList />,
    path: path.decks,
  },
  {
    element: <CardsList />,
    path: `${path.cards}/:id`,
  },
  {
    element: <LearnList />,
    path: `${path.cards}/:id${path.learn}`,
  },
  {
    element: <PersonalInfo />,
    path: path.profile,
  },
]

const errorRoute: RouteObject = {
  element: <ErrorPage />,
  path: path.notFound,
}

export const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
  errorRoute,
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
        {isSuccess && data.id ? <Outlet /> : <Navigate to={path.login} />}
      </main>
    </>
  )
}
export function Router() {
  return <RouterProvider router={router} />
}
