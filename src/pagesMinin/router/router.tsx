import { Navigate, Outlet, RouteObject, createBrowserRouter } from 'react-router-dom'

import { CardsPage } from '@/pagesMinin/Cards.page'
import { DecksPage } from '@/pagesMinin/Decks.page'
import { LearnPage } from '@/pagesMinin/Learn.page'
import { SignInPage } from '@/pagesMinin/SignIn.page'

import { useMeQuery } from '../../../services/auth/auth.service'

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
        path: '/decks/:deckId/card',
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
  const { data } = useMeQuery()

  // return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
  return data ? <Outlet /> : <Navigate to={'/login'} />
}

// function Login() {
//   return <h1>Залогинься, чмо</h1>
// }

export const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />, // <Outlet /> : <Navigate to={'/login'} />
  },
  ...publicRoutes,
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
