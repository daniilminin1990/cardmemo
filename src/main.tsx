import { Provider } from 'react-redux'

import { App } from '@/app/App'
import { store } from '@/app/store/store'
import { createRoot } from 'react-dom/client'

import './common/locales/i18nConfiguration'
import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
