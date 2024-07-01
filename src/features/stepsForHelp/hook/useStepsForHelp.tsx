import { useTranslation } from 'react-i18next'

import l from '@/common/locales/LangPathVariables'

export const useStepsForHelp = () => {
  const { t } = useTranslation()

  const steps = [
    {
      content: t('help.step-go-home'),
      target: '.step-go-home',
    },
    {
      content: t('help.step-select-language'),
      target: '.step-select-language',
    },
    {
      content: t(l.help['step-change-theme']),
      target: '.step-change-theme',
    },
    {
      content: t(l.help['step-profile-drop-down']),
      target: '.step-profile-drop-down',
    },
    {
      content: t(l.help['step-add-new-deck']),
      target: '.step-add-new-deck',
    },
    {
      content: t(l.help['step-search']),
      target: '.step-search',
    },
    {
      content: t(l.help['step-tab-filter']),
      target: '.step-tab-filter',
    },
    {
      content: t(l.help['step-slider-filter']),
      target: '.step-slider-filter',
    },
    {
      content: t(l.help['step-clear-filter']),
      target: '.step-clear-filter',
    },
    {
      content: t(l.help['step-this-is-table']),
      target: '.step-this-is-table',
    },
    {
      content: t(l.help['step-edit-table-deck-btns']),
      target: '.step-edit-table-deck-btns',
    },
    {
      content: t(l.help['step-private-deck']),
      target: '.step-private-deck',
    },
    {
      content: t(l.help['step-pagination']),
      target: '.step-pagination',
    },
  ]

  return {
    steps,
  }
}

export default useStepsForHelp
