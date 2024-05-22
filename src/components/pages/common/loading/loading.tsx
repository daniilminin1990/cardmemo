import * as Progress from '@radix-ui/react-progress'

import s from './loading.module.scss'
export const Loading = () => {
  return (
    <Progress.Root className={s.ProgressRoot}>
      <Progress.Indicator
        className={s.ProgressIndicator}
        style={{ transform: `translateX(-${10}%)` }}
      />
      Loading
    </Progress.Root>
  )
}
