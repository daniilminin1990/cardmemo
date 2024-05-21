import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { DecksMininPage } from '@/pagesMinin/DecksMinin.page'
import { TestDecks } from '@/pagesMinin/Test/TestDecks'
import { AddNewCardForEmpty } from '@/pagesMinin/featuresMinin/AddNewCardForEmpty'

const privateRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <DecksMininPage />,
        path: '/',
      },
      {
        element: <TestDecks />,
        path: '/cards',
      },
      {
        element: <AddNewCardForEmpty />,
        path: '/decks/:deckId',
      },
    ],
    element: <Container />,
  },
]

const publicRoutes: RouteObject[] = [
  {
    element: <Login />,
    path: '/login',
  },
]

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

export function Router() {
  return <RouterProvider router={router} />
}

function Container() {
  return <Outlet />
}

function Login() {
  return <h1>Залогинься, чмо</h1>
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
