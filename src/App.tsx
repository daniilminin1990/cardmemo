import { LayoutMinin } from '@/pagesMinin/componentsMinin/LayoutMinin/LayoutMinin'
import { Router } from '@/router'

export function App() {
  return (
    <LayoutMinin isAuth>
      <Router />
    </LayoutMinin>
  )
}
