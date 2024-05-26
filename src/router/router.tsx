import { Navigate, Outlet, RouteObject, createBrowserRouter } from 'react-router-dom'

import { CardsPage } from '@/Pages/CardsPage/Cards.page'
import { DecksPage } from '@/Pages/DecksPage/Decks.page'
import { LearnPage } from '@/Pages/LearnPage/learnPage'
import { ProfilePage } from '@/Pages/ProfilePage/ProfilePage'
import { SignInPage } from '@/Pages/SignInPage/SignIn.page'
import { Layout } from '@/components/Layout/Layout'
import { CreateNewPassword } from '@/components/auth/CreateNewPassword/CreateNewPassword'
import ErrorPage from '@/components/auth/ErrorPage/ErrorPage'
import { path } from '@/router/path'
import { useMeQuery } from '@/services/auth/auth.service'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: `${path.login}`,
  },
  {
    element: <ErrorPage />,
    path: `${path['*']}`,
  },
  {
    element: <CreateNewPassword />,
    path: `${path.createNewPassword}/:token`,
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
