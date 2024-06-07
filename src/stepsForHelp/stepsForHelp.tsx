import { useTranslation } from 'react-i18next'

export const useStepsForHelp = () => {
  const { t } = useTranslation()

  const steps = [
    {
      content: t('help.my-first-step'),
      target: '.my-first-step',
    },
    {
      content: t('help.my-two-step'),
      target: '.my-two-step',
    },
    {
      content: t('help.my-three-step'),
      target: '.my-three-step',
    },
    {
      content: t('help.my-four-step'),
      target: '.my-four-step',
    },
    {
      content: t('help.my-five-step'),
      target: '.my-five-step',
    },
    {
      content: t('help.my-six-step'),
      target: '.my-six-step',
    },
    {
      content: t('help.my-seven-step'),
      target: '.my-seven-step',
    },
    {
      content: t('help.my-eight-step'),
      target: '.my-eight-step',
    },
    {
      content: t('help.my-nine-step'),
      target: '.my-nine-step',
    },
    {
      content: t('help.my-ten-step'),
      target: '.my-ten-step',
    },
    {
      content: t('help.my-eleven-step'),
      target: '.my-eleven-step',
    },
    {
      content: t('help.my-twelve-step'),
      target: '.my-twelve-step',
    },
    {
      content: t('help.my-fourteen-step'),
      target: '.my-fourteen-step',
    },
  ]

  return {
    steps,
  }
}

export default useStepsForHelp
