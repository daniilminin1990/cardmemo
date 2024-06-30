import { Provider } from 'react-redux'

import { App } from '@/app/App'
import Context from '@/components/ui/changeTheme/Context'
import { createRoot } from 'react-dom/client'

import './styles/index.scss'
import '@/components/ui/LocaleSwitcher/i18nConfiguration'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import { store } from '../src/app/store/store'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Context>
      <App />
    </Context>
  </Provider>
)
