import { ChangeEvent, useState } from 'react'

import EyeOff from '@/assets/icons/svg/EyeOff'
import clsx from 'clsx'

import s from './Input.module.scss'

import CloseEye from '../../../assets/icons/eye-off.svg'
import Close from '../../../assets/icons/svg/Close'
import Eye from '../../../assets/icons/svg/Eye'
import Search from '../../../assets/icons/svg/Search'

type inputProps = {
  disabled: boolean
  error?: string
  label?: string
  placeholder: string
  type: 'password' | 'search' | 'text'
}

const Input = (props: inputProps) => {
  const { disabled = 'default', error, label, type } = props

  const [tex, setText] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }

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
      <div className={s.label}>{label}</div>
      <div className={s.searchClose}>
        {type === 'password' && (
          <EyeIcon className={s.Eye} onClick={isShowChangeHandler} viewBox={'0 0 24 24'} />
        )}
        {type === 'search' && <Search className={s.Search} viewBox={'0 0 24 24'} />}

        <div onClick={() => setText('')}>
          {type === 'search' && <Close className={s.Close} viewBox={'0 0 24 24'} />}
        </div>

        <input
          className={classNameForInput}
          disabled={!!disabled}
          onBlur={handleBlur}
          onChange={onChangeInputHandler}
          onFocus={handleFocus}
          placeholder={placeHolder}
          type={type === 'password' ? (isShow ? 'text' : 'password') : type}
          value={tex}
        />
      </div>
      {error && <div className={s.errorText}>{error}</div>}
    </div>
  )
}

export default Input
