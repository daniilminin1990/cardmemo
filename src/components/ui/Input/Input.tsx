import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useId, useState } from 'react'

import EyeOff from '@/assets/icons/svg/EyeOff'
import Typography from '@/components/ui/Typography/Typography'
import clsx from 'clsx'

import s from './Input.module.scss'

import Close from '../../../assets/icons/svg/Close'
import Eye from '../../../assets/icons/svg/Eye'
import Search from '../../../assets/icons/svg/Search'

export type InputProps = {
  callback?: (text: string) => void
  error?: string | undefined
  label?: string
  querySearch?: null | string
} & ComponentPropsWithoutRef<'input'>

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { callback, className, error, id, label, placeholder, querySearch, type, ...restProps } =
    props

  const [isShow, setIsShow] = useState(false)
  const [inputValue, setInputValue] = useState(querySearch || '')

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    props.onChange?.(e)
    setInputValue?.(e.target.value)
  }
  const clearInput = () => {
    setInputValue('')
    if (callback) {
      callback('')
    }
  }
  const isShowChangeHandler = () => {
    setIsShow(!isShow)
  }
  const EyeIcon = isShow ? Eye : EyeOff

  let classNameForInput = ''

  switch (type) {
    case 'search':
      classNameForInput = error
        ? clsx(s.boxInput, s.boxPadding, s.errorSeach)
        : clsx(s.boxInput, s.boxPadding)
      break
    case 'text':
    case 'password':
      classNameForInput = error
        ? clsx(s.boxInput, s.boxPadding, s.errorTextAndPassword)
        : s.boxInput
      break
    default:
      classNameForInput = s.boxInput
  }

  const styleForType = isShow ? 'text' : 'password'

  const generatedId = useId()

  return (
    <div className={clsx(s.box, className)}>
      <Typography as={'label'} className={s.label} htmlFor={id ?? generatedId} variant={'body2'}>
        {type !== 'search' && label}
      </Typography>
      <div className={s.searchClose}>
        {type === 'password' && (
          <EyeIcon className={s.Eye} onClick={isShowChangeHandler} viewBox={'0 0 24 24'} />
        )}
        {type === 'search' && <Search className={s.Search} viewBox={'0 0 24 24'} />}

        <div>
          {type === 'search' && (
            <Close className={s.Close} onClick={clearInput} viewBox={'0 0 24 24'} />
          )}
        </div>

        <input
          {...restProps}
          className={classNameForInput}
          id={id ?? generatedId}
          onChange={handleChange}
          placeholder={placeholder}
          ref={ref}
          type={type === 'password' ? styleForType : type}
          value={inputValue}
        />
      </div>
      {error && <div className={s.errorText}>{error}</div>}
    </div>
  )
})

export default Input
