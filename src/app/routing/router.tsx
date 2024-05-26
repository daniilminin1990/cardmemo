import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { path } from '@/app/routing/path'
import ErrorPage from '@/app/ui/errorPage/errorPage'
import { Layout } from '@/app/ui/layout/layout'
import { PersonalInfo } from '@/app/ui/personalInfo/personalInfo'
import { useMeQuery } from '@/features/auth/api/authApi'
import { CheckEmail } from '@/features/auth/ui/checkEmail/checkEmail'
import { CreateNewPassword } from '@/features/auth/ui/createNewPassword/createNewPassword'
import { RecoverPassword } from '@/features/auth/ui/recoverPassword/recoverPassword'
import { SignIn } from '@/features/auth/ui/signIn/signIn'
import SignUp from '@/features/auth/ui/signUp/signUp'
import { CardsList } from '@/features/cardsList/ui/cardsList'
import { DecksList } from '@/features/decksList/ui/decksList'
import { LearnList } from '@/features/learnList/learnList'

const publicRoutes: RouteObject[] = [
  {
    element: <SignIn />,
    path: path.login,
  },
  {
    element: <ErrorPage />,
    path: path['*'],
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
    element: <Navigate to={`${path.decks}`} />,
    path: path.base,
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

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
    path: path.base,
  },
])

function PrivateRoutes() {
  const { data, isSuccess } = useMeQuery()

  return isSuccess && data.id ? <Outlet /> : <Navigate to={`${path.login}`} />
}
export function Router() {
  return <RouterProvider router={router} />
}
