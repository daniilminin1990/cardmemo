import { Navigate, Outlet, RouteObject, createBrowserRouter } from 'react-router-dom'

import { CheckEmail } from '@/Pages/Auth/CheckEmail/CheckEmail'
import { CreateNewPassword } from '@/Pages/Auth/CreateNewPassword/CreateNewPassword'
import { ForgotPassword } from '@/Pages/Auth/ForgotPassword/ForgotPassword'
import { SignInPage } from '@/Pages/Auth/SignInPage/SignIn.page'
import SignUp from '@/Pages/Auth/SignUp/SignUp'
// import { CardsPage } from '@/Pages/CardsPage/Cards.page'
import { DecksPage } from '@/Pages/DecksPage/Decks.page'
import ErrorPage from '@/Pages/ErrorPage/ErrorPage'
import { Layout } from '@/components/Layout/Layout'
import Loading from '@/components/ui/Loading/Loading'
// import { Cards } from '@/features/cards/ui/Cards'
import { LearnPage } from '@/features/learn/ui/LearnPage'
import { ProfilePage } from '@/features/profile/ui/ProfilePage'
import { path } from '@/router/path'
import { useMeQuery } from '@/services/auth/auth.service'
import { useGetDecksQuery, useGetMinMaxCardsCountQuery } from '@/services/decks/decks.service'
import { Cards } from "@/features/cards";

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
        element: <Cards/>,
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
