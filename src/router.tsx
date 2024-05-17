import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import Header from '@/components/auth/Header/Header'
import { DecksPage } from '@/pages/Decks.page'

const privateRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <DecksPage />,
        path: '/',
      },
      {
        element: <div>Cards</div>,
        path: '/cards',
      },
    ],
    element: <Container />,
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

function Container() {
  return (
    <div
      style={{
        display: 'grid',
        gap: '36px',
        gridTemplateRows: 'auto 1fr',
      }}
    >
      <Header isAuth />
      <div style={{ justifySelf: 'center' }}>
        <Outlet />
      </div>
    </div>
  )
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
