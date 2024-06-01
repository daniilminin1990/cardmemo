import { Provider } from 'react-redux'

import { App } from '@/App'
import Context from '@/components/ui/changeTheme/Context'
import { createRoot } from 'react-dom/client'

import './components/localeSwitcher/i18nConfiguration'
import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import { store } from './services/store'

createRoot(document.getElementById('root') as HTMLElement).render(
  // <StrictMode>
  <Provider store={store}>
    <Context>
      <App />
    </Context>
  </Provider>
  // </StrictMode>
)
