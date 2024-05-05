import { forwardRef, useState } from 'react'
import { ChangeHandler, FieldError } from 'react-hook-form'

import EyeOff from '@/assets/icons/svg/EyeOff'
import clsx from 'clsx'

import s from './Input.module.scss'

import Close from '../../../assets/icons/svg/Close'
import Eye from '../../../assets/icons/svg/Eye'
import Search from '../../../assets/icons/svg/Search'

type inputProps = {
  disabled: boolean
  error: FieldError | undefined
  label?: string
  name: string
  onBlur: ChangeHandler
  onChange: ChangeHandler
  placeholder?: string
  type: 'password' | 'search' | 'text'
}

const Input = forwardRef<HTMLInputElement, inputProps>((props: inputProps, ref) => {
  const { disabled = false, error, label, type, ...restProps } = props

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
          className={classNameForInput}
          {...restProps}
          disabled={disabled}
          name={restProps.name}
          onChange={restProps.onChange}
          placeholder={placeHolder}
          ref={ref}
          type={type === 'password' ? (isShow ? 'text' : 'password') : type}
        />
      </div>
      {error && <span className={s.errorText}>Error!</span>}
    </div>
  )
})

export default Input
