import { useTranslation } from 'react-i18next'
import Joyride, { CallBackProps } from 'react-joyride'

import useStepsForHelp from '@/stepsForHelp/stepsForHelp'

type MyJoyRideProps = {
  run: boolean
  setRun: (run: boolean) => void
}
const MyJoyRide = (props: MyJoyRideProps) => {
  const { run, setRun } = props
  const { steps } = useStepsForHelp()
  const { t } = useTranslation()

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { type } = data

    if (type === 'tour:start') {
      setRun(true)
    }
    if (type === 'tour:end') {
      setRun(false)
    }
  }

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      locale={{
        back: t('controlButtons.back'),
        close: t('controlButtons.close'),
        last: t('controlButtons.last'),
        next: t('controlButtons.next'),
        open: t('controlButtons.open'),
        skip: t('controlButtons.skip'),
      }}
      run={run}
      showProgress
      showSkipButton
      steps={steps}
      styles={{
        options: {
          arrowColor: 'var( --color-light-700)',
          backgroundColor: 'var(--color-light-700)',
          overlayColor: 'rgba(0,0,0,0.4)',
          primaryColor: 'var(--color-danger-300)',
          textColor: 'var(--color-dark-700)',
          zIndex: 1000,
        },
      }}
    />
  )
}

export default MyJoyRide
