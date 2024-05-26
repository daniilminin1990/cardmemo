import { Navigate, Outlet, RouteObject, createBrowserRouter } from 'react-router-dom'

import { LearnPage } from '@/Pages/LearnPage/learnPage'
import { path } from '@/router/path'
import { useMeQuery } from '@/services/auth/auth.service'

import { CardsPage } from '../Pages/CardsPage/Cards.page'
import { DecksPage } from '../Pages/DecksPage/Decks.page'
import { SignInPage } from '../Pages/SignInPage/SignIn.page'
import { Layout } from '../components/Layout/Layout'

const privateRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <Navigate to={'/decks'} />,
        path: '/',
      },
      {
        element: <DecksPage />,
        path: '/decks',
      },
      {
        element: <CardsPage />,
        path: '/decks/:deckId',
      },
      {
        element: <LearnPage />,
        path: `${path.decks}/:id${path.learn}`,
      },
    ],
    element: <Outlet />,
  },
]

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/login',
  },
]

function PrivateRoutes() {
  const { isSuccess } = useMeQuery()

  // return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
  return isSuccess ? <Outlet /> : <Navigate to={'/login'} />
}

// function Login() {
//   return <h1>Залогинься, чмо</h1>
// }

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />, // <Outlet /> : <Navigate to={'/login'} />
      },
      ...publicRoutes,
    ],
    element: <Layout />,
    path: '/',
  },
])

// export function Router() {
//   return <RouterProvider router={router} />
// }
//
// const privateRoutes: RouteObject[] = [
//   {
//     children: [
//       {
//         element: <DecksPage />,
//         path: '/',
//       },
//       {
//         element: <TestDecks />,
//         path: '/cards',
//       },
//       {
//         element: <CardsPage />,
//         path: '/decks/:deckId',
//       },
//     ],
//     element: <Container />,
//   },
// ]
//
// const publicRoutes: RouteObject[] = [
//   {
//     element: <Login />,
//     path: '/login',
//   },
// ]
//
// const router = createBrowserRouter([
//   {
//     children: privateRoutes,
//     element: <PrivateRoutes />,
//   },
//   ...publicRoutes,
// ])
//
// export function Router() {
//   return <RouterProvider router={router} />
// }
//
// function Container() {
//   return <Outlet />
// }
//
// function Login() {
//   return <h1>Залогинься, чмо</h1>
// }
//
// function PrivateRoutes() {
//   const isAuthenticated = true
//
//   return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
// }
