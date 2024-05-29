// import { StrictMode } from 'react'

import { Suspense } from 'react'
import { Provider } from 'react-redux'

import { App } from '@/App'
import { createRoot } from 'react-dom/client'

import './i18n'
import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import { store } from './services/store'

createRoot(document.getElementById('root') as HTMLElement).render(
  // <StrictMode>
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </Provider>
  // </StrictMode>
)
