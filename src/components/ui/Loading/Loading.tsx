import { ComponentProps, memo } from 'react'

import clsx from 'clsx'

import s from '@/components/ui/Loading/Loading.module.scss'

import img from '../../../assets/img/Loading.svg'

const Loading = memo(
  ({
    className = s.preloader,
    isLoading,
    type = 'pageLoader',
    ...props
  }: {
    isLoading?: boolean
    type?: 'pageLoader' | 'preloader' | 'small'
  } & ComponentProps<'div'>) => {
    const classNames = {
      imgClass: clsx(type === 'small' && s.small),
      loadingClass: clsx(type === 'preloader' ? s.preloader : s.pageLoader, className),
    }

    return (
      <div className={classNames.loadingClass} {...props}>
        <img alt={''} className={classNames.imgClass} src={img} />
      </div>
    )
  }
)

export default Loading
