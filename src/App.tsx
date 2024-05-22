import { RouterProvider } from 'react-router-dom'

import { LayoutMinin } from '@/pagesMinin/componentsMinin/LayoutMinin/LayoutMinin'
import { router } from '@/router'

export function App() {
  return (
    <LayoutMinin isAuth>
      <RouterProvider router={router} />
    </LayoutMinin>
  )
}