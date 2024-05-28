import { ComponentProps } from 'react'

import s from './loading.module.scss'

import img from '../../../assets/img/Loading.svg'

const Loading = ({ className = s.loader, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={s.loader} {...props}>
      <img alt={''} src={img} />
    </div>
  )
}

export default Loading
