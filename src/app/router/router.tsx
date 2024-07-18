//import { CardsPage } from '@/features/cards'
import { Suspense } from 'react'
import { Navigate, Outlet, RouteObject, createBrowserRouter } from 'react-router-dom'

import { path } from '@/app/router/path'
import { Layout } from '@/components/Layout/Layout'
import Loading from '@/components/ui/Loading/Loading'
import { useMeQuery } from '@/features/auth/services/auth.service'
import { CheckEmail } from '@/features/auth/ui/CheckEmail/CheckEmail'
import { CreateNewPassword } from '@/features/auth/ui/CreateNewPassword/CreateNewPassword'
//import { CardsPage } from '@/Pages/CardsPage/Cards.page'
import ErrorPage from '@/features/auth/ui/ErrorPage/ErrorPage'
import { ForgotPassword } from '@/features/auth/ui/ForgotPassword/ForgotPassword'
import { SignInPage } from '@/features/auth/ui/SingInPage/SignIn.page'
import SignUp from '@/features/auth/ui/SingUp/SignUp'
import CardsPage from '@/features/cards/ui/Cards/cards.async'
import { DecksPage } from '@/features/decks/ui/Decks.page'
// import { Cards } from '@/features/cards/ui/Cards'
import { LearnPage } from '@/features/learn/ui/LearnPage'
import { ProfilePage } from '@/features/profile/ui/ProfilePage'
import { useGetDecksQuery, useGetMinMaxCardsCountQuery } from '@/services/decks/decks.service'

export const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: `${path.login}`,
  },
  {
    element: <SignUp />,
    path: `${path.signUp}`,
  },

  {
    element: <CreateNewPassword />,
    path: `${path.createNewPassword}/:token`,
  },
  {
    element: <ForgotPassword />,
    path: `${path.recoverPassword}`,
  },
  {
    element: <CheckEmail />,
    path: `${path.checkEmail}/:email`,
  },
  {
    element: <ErrorPage />,
    path: `${path['*']}`,
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
        element: (
          <Suspense fallback={<Loading />}>
            <CardsPage />
          </Suspense>
        ),
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
  const { data: me, isLoading, isSuccess } = useMeQuery()
  const { data: minMaxData, isLoading: isMinMaxLoading } = useGetMinMaxCardsCountQuery()
  const { isLoading: isDecksLoading } = useGetDecksQuery(undefined, {
    skip: !minMaxData && !me,
  })

  if (isLoading || isDecksLoading || isMinMaxLoading) {
    return <Loading />
  }

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
