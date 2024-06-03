import { memo } from 'react'

import clsx from 'clsx'

import s from './loadingBar.module.scss'
type Props = {
  className?: string
}
export const LoadingBar = memo(({ className }: Props): JSX.Element => {
  return (
    <div className={clsx(s.container, className)}>
      <div className={s.progressBar}></div>
    </div>
  )
})
