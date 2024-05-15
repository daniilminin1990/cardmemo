import React from 'react'

import * as Progress from '@radix-ui/react-progress'

import s from './progressBar.module.scss'

const ProgressDemo = () => {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Progress.Root className={s.ProgressRoot} value={progress}>
      <Progress.Indicator
        className={s.ProgressIndicator}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  )
}

export default ProgressDemo
