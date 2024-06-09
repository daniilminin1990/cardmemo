import { useTranslation } from 'react-i18next'

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
      content: t('help.step-change-theme'),
      target: '.step-change-theme',
    },
    {
      content: t('help.step-profile-drop-down'),
      target: '.step-profile-drop-down',
    },
    {
      content: t('help.step-add-new-deck'),
      target: '.step-add-new-deck',
    },
    {
      content: t('help.step-search'),
      target: '.step-search',
    },
    {
      content: t('help.step-tab-filter'),
      target: '.step-tab-filter',
    },
    {
      content: t('help.step-slider-filter'),
      target: '.step-slider-filter',
    },
    {
      content: t('help.step-clear-filter'),
      target: '.step-clear-filter',
    },
    {
      content: t('help.step-this-is-table'),
      target: '.step-this-is-table',
    },
    {
      content: t('help.step-edit-table-deck-btns'),
      target: '.step-edit-table-deck-btns',
    },
    {
      content: t('help.step-private-deck'),
      target: '.step-private-deck',
    },
    {
      content: t('help.step-pagination'),
      target: '.step-pagination',
    },
  ]

  return {
    steps,
  }
}

export default useStepsForHelp
