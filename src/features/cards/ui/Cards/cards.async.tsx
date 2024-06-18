import { lazy } from 'react'

const CardsAsync = lazy(() => import('./components/Cards'))

export { CardsAsync as CardsPage }
