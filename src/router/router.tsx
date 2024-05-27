import { Navigate, Outlet, RouteObject, createBrowserRouter } from 'react-router-dom'

import { CreateNewPassword } from '@/Pages/Auth/CreateNewPassword/CreateNewPassword'
import { SignInPage } from '@/Pages/Auth/SignInPage/SignIn.page'
import SignUp from '@/Pages/Auth/SignUp/SignUp'
import { CardsPage } from '@/Pages/CardsPage/Cards.page'
import { DecksPage } from '@/Pages/DecksPage/Decks.page'
import ErrorPage from '@/Pages/ErrorPage/ErrorPage'
import { ForgotPassword } from '@/Pages/ForgotPassword/ForgotPassword'
import { LearnPage } from '@/Pages/LearnPage/learnPage'
import { ProfilePage } from '@/Pages/ProfilePage/ProfilePage'
import { Layout } from '@/components/Layout/Layout'
import { path } from '@/router/path'
import { useMeQuery } from '@/services/auth/auth.service'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: `${path.login}`,
  },
  {
    element: <SignUp />,
    path: `${path.signUp}`,
  },
  {
    element: <ErrorPage />,
    path: `${path['*']}`,
  },
  {
    element: <CreateNewPassword />,
    path: `${path.createNewPassword}/:token`,
  },
  {
    element: <ForgotPassword />,
    path: `${path.recoverPassword}`,
  },
]

const privateRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <Navigate to={`${path.decks}`} />,
        path: path.base,
      },
      {
        element: <DecksPage />,
        path: `${path.decks}`,
      },
      {
        element: <CardsPage />,
        path: `${path.decks}/:deckId`,
      },
      {
        element: <LearnPage />,
        path: `${path.decks}/:deckId${path.learn}`,
      },
      {
        element: <ProfilePage />,
        path: `${path.profile}`,
      },
    ],
  },
]

function PrivateRoutes() {
  const { data: me, isSuccess } = useMeQuery()

  return isSuccess && me?.id ? <Outlet /> : <Navigate to={`${path.login}`} />
}

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
    path: `${path.base}`,
  },
])
