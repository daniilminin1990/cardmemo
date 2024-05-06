import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import EyeOff from '@/assets/icons/svg/EyeOff'
import clsx from 'clsx'

import s from './Input.module.scss'

import Close from '../../../assets/icons/svg/Close'
import Eye from '../../../assets/icons/svg/Eye'
import Search from '../../../assets/icons/svg/Search'

export type InputProps = {
  error?: string | undefined
  label?: string
} & ComponentPropsWithoutRef<'input'>

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { error, label, type, ...restProps } = props

  const [isShow, setIsShow] = useState(false)

  const isShowChangeHandler = () => {
    setIsShow(!isShow)
  }
  const EyeIcon = isShow ? Eye : EyeOff

  const classNameForInput =
    type === 'search' && !!error
      ? clsx(s.boxInput, s.boxPadding, s.errorSeach)
      : type === 'text' && !!error
      ? clsx(s.boxInput, s.boxPadding, s.errorTextAndPassword)
      : type === 'password' && !!error
      ? clsx(s.boxInput, s.boxPadding, s.errorTextAndPassword)
      : type === 'search'
      ? clsx(s.boxInput, s.boxPadding)
      : s.boxInput

  const placeHolder = type === 'search' ? 'Input search' : 'Input'

  return (
    <div className={s.box}>
      <div className={s.label}>{type !== 'search' && label}</div>
      <div className={s.searchClose}>
        {type === 'password' && (
          <EyeIcon className={s.Eye} onClick={isShowChangeHandler} viewBox={'0 0 24 24'} />
        )}
        {type === 'search' && <Search className={s.Search} viewBox={'0 0 24 24'} />}

        <div>{type === 'search' && <Close className={s.Close} viewBox={'0 0 24 24'} />}</div>

        <input
          {...restProps}
          className={classNameForInput}
          onChange={restProps.onChange}
          placeholder={placeHolder}
          ref={ref}
          type={type === 'password' ? (isShow ? 'text' : 'password') : type}
        />
      </div>
      {error && <div className={s.errorText}>{error}</div>}
    </div>
  )
})

export default Input
