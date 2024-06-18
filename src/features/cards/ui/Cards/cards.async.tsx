import { lazy } from 'react'

const CardsAsync = lazy(() => import('./Cards'))

export { CardsAsync as CardsPage }
