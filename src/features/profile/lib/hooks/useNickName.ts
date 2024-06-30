import { useTranslation } from 'react-i18next'

import { path } from '@/app/router/path'

export const useNickName = () => {
  const { t } = useTranslation()

  const deckQuery = localStorage.getItem('deckQuery') ? `/${localStorage.getItem('deckQuery')}` : ''

  const backToDecksPage = path.decks + deckQuery

  return {
    backToDecksPage,
    t,
  }
}
