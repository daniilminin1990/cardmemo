import { RouterProvider } from 'react-router-dom'

import Loading from '@/components/ui/Loading/Loading'
import { router } from '@/router/router'

export function App() {
  return (
    <>
      {/*<Layout isAuth>*/}
      <RouterProvider router={router} />
      <Loading isShow />
      {/*<Router />*/}
      {/*</Layout>*/}
    </>
  )
}
