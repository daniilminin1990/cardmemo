import { StrictMode } from 'react'
import { Provider } from 'react-redux'

import { App } from '@/App'
import { store } from '@/services/store'
import { createRoot } from 'react-dom/client'

import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    {/*<BrowserRouter>*/}
    <Provider store={store}>
      <App />
    </Provider>
    {/*</BrowserRouter>*/}
  </StrictMode>
)