import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { DecksPage } from '@/pages/Decks.page'

const privateRoutes: RouteObject[] = [
  {
    // element: <div>HELLO</div>,
    element: <DecksPage />,
    path: '/',
  },
]

const publicRoutes: RouteObject[] = [
  {
    element: <div>Пройди логинизацию, чмо</div>,
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

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
