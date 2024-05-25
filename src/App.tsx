import { RouterProvider } from 'react-router-dom'

import { router } from '@/pagesMinin/router/router'

export function App() {
  return (
    <>
      {/*<Layout isAuth>*/}
      <RouterProvider router={router} />
      {/*<Router />*/}
      {/*</Layout>*/}
    </>
  )
}
