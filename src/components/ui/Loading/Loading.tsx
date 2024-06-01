import { ComponentProps, memo } from 'react'

import clsx from 'clsx'

import s from './loading.module.scss'

import img from '../../../assets/img/Loading.svg'

const Loading = memo(
  ({
    className = s.preloader,
    isLoading,
    type = 'pageLoader',
    ...props
  }: { isLoading?: boolean; type?: 'pageLoader' | 'preloader' } & ComponentProps<'div'>) => {
    const classNameLoading = clsx(type === 'preloader' ? s.preloader : s.pageLoader, className)

    return (
      <div className={classNameLoading} {...props}>
        <img alt={''} src={img} />
      </div>
    )
  }
)

export default Loading
