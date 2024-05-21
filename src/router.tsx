import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { DecksMininPage } from '@/pagesMinin/DecksMinin.page'
import { TestDecks } from '@/pagesMinin/Test/TestDecks'
import { DeckCardsPage } from '@/pagesMinin/featuresMinin/DeckCards.page'

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
        element: <DeckCardsPage />,
        path: '/decks/:deckId',
      },
    ],
    element: <Outlet />,
  },
]

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

export const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />, // <Outlet /> : <Navigate to={'/login'} />
  },
  {
    element: <h1>Залогинься, чмо</h1>,
    path: '/login',
  },
])

export function Router() {
  return <RouterProvider router={router} />
}

// export function Router() {
//   return <RouterProvider router={router} />
// }

// const privateRoutes: RouteObject[] = [
//   {
//     children: [
//       {
//         element: <DecksMininPage />,
//         path: '/',
//       },
//       {
//         element: <TestDecks />,
//         path: '/cards',
//       },
//       {
//         element: <DeckCardsPage />,
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
