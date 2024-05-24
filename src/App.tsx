import { RouterProvider } from 'react-router-dom'

import { Layout } from '@/pagesMinin/componentsMinin/Layout/Layout'
import { router } from '@/pagesMinin/router/router'

export function App() {
  return (
    <Layout isAuth>
      <RouterProvider router={router} />
    </Layout>
  )
}
