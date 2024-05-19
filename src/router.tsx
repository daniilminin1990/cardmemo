import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import ErrorPage from '@/components/auth/ErrorPage/ErrorPage'
import { Card } from '@/components/pages/cardsList/card/card'
import { CardsList } from '@/components/pages/cardsList/cardsList'
import { DecksList } from '@/components/pages/decksList1/decksList'
import { LearnList } from '@/components/pages/learnList/learnList'

const publicRoutes: RouteObject[] = [
  {
    element: <div>login</div>,
    path: '/login',
  },
  { element: <ErrorPage />, path: '*' },
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
]

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
export function Router() {
  return <RouterProvider router={router} />
}
